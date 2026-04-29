import { Resend } from 'resend'
import type { ReactElement } from 'react'
import BookingConfirmation from '@/emails/BookingConfirmation'
import BookingNotification from '@/emails/BookingNotification'
import QuoteRequestReceived from '@/emails/QuoteRequestReceived'
import QuoteRequestNotification from '@/emails/QuoteRequestNotification'
import { render as renderEmail } from '@react-email/render'
import { env, isProduction } from '@/env'
import ContactSubmissionNotification from '@/emails/ContactSubmissionNotification'

if (!env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is missing')
}

const resend = new Resend(env.RESEND_API_KEY)

const defaultDevFrom = 'SparkClean <onboarding@resend.dev>'
const configuredCustomerFrom = env.RESEND_FROM_CUSTOMER ?? env.RESEND_FROM ?? (isProduction ? undefined : defaultDevFrom)
const configuredOwnerFrom = env.RESEND_FROM_OWNER ?? env.RESEND_FROM ?? (isProduction ? undefined : defaultDevFrom)

if (!configuredCustomerFrom || !configuredOwnerFrom) {
  throw new Error('Set RESEND_FROM (or RESEND_FROM_CUSTOMER and RESEND_FROM_OWNER).')
}

const customerFrom: string = configuredCustomerFrom
const ownerFrom: string = configuredOwnerFrom

const devOverrideRecipient = env.RESEND_DEV_TO ?? null
if (devOverrideRecipient) {
  console.warn(`[resend] RESEND_DEV_TO override enabled; all emails will be sent to ${devOverrideRecipient}`)
}

const configuredOwnerInbox = env.BOOKING_NOTIFICATION_EMAIL ?? env.OWNER_EMAIL
if (!devOverrideRecipient && !configuredOwnerInbox) {
  throw new Error('BOOKING_NOTIFICATION_EMAIL (or OWNER_EMAIL) is missing')
}

const ownerInbox: string = configuredOwnerInbox ?? ''

console.info('[resend] Sender configuration', {
  mode: devOverrideRecipient ? 'dev-override' : isProduction ? 'production' : 'development',
  fromCustomer: customerFrom,
  fromOwner: ownerFrom,
  ownerInbox: configuredOwnerInbox ?? '(overridden by RESEND_DEV_TO)',
})

type ResendSendResult = {
  data?: { id?: string } | null
  error?: { name?: string; message?: string } | null
}

type EmailPairParams = {
  customerRecipient: string
  ownerRecipient: string
  customerSubject: string
  ownerSubject: string
  customerTemplate: ReactElement
  ownerTemplate: ReactElement
  logLabel: 'Booking' | 'Quote'
}

function ensureSendSucceeded(result: ResendSendResult, recipient: string) {
  if (result?.error) {
    const details = `${result.error.name ?? 'ResendError'}: ${result.error.message ?? 'Unknown error'}`
    throw new Error(`Resend rejected email for ${recipient}. ${details}`)
  }
}

async function sendEmailPair(params: EmailPairParams) {
  const [customerHtml, ownerHtml, customerText, ownerText] = await Promise.all([
    renderEmail(params.customerTemplate),
    renderEmail(params.ownerTemplate),
    renderEmail(params.customerTemplate, { plainText: true }),
    renderEmail(params.ownerTemplate, { plainText: true }),
  ])

  const [customerResult, ownerResult] = await Promise.all([
    resend.emails.send({
      from: customerFrom,
      to: params.customerRecipient,
      subject: params.customerSubject,
      html: customerHtml,
      text: customerText,
    }),
    resend.emails.send({
      from: ownerFrom,
      to: params.ownerRecipient,
      subject: params.ownerSubject,
      html: ownerHtml,
      text: ownerText,
    }),
  ])

  ensureSendSucceeded(customerResult as ResendSendResult, params.customerRecipient)
  ensureSendSucceeded(ownerResult as ResendSendResult, params.ownerRecipient)

  console.log(`[resend] ${params.logLabel} emails accepted`, {
    customerEmailId: (customerResult as ResendSendResult).data?.id ?? null,
    ownerEmailId: (ownerResult as ResendSendResult).data?.id ?? null,
    toCustomer: params.customerRecipient,
    toOwner: params.ownerRecipient,
  })

  return [customerResult, ownerResult]
}

export type BookingEmailPayload = {
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  date: string
  time: string
  address: string
  instructions?: string
  paidAmount: string
  serviceAmount: string
  serviceCount: number
  serviceCountUnit: string
  addonsTotal: string
  totalAmount: string
  addons: { name: string; quantity: number; unitPrice: string; lineTotal: string }[]
  bookingId: string
  squarePaymentId: string
}

export type QuoteEmailPayload = {
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  service: string
  message: string
}

export type ContactEmailPayload = {
  customerName: string
  customerEmail: string
  customerPhone?: string
  message: string
}

export async function sendBookingEmails(payload: BookingEmailPayload) {
  const customerRecipient = devOverrideRecipient ?? payload.customerEmail
  const ownerRecipient = devOverrideRecipient ?? ownerInbox
  const subjectPrefix = isProduction ? '' : '[DEV] '

  const customerTemplate = BookingConfirmation({
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerPhone: payload.customerPhone,
    service: payload.service,
    date: payload.date,
    time: payload.time,
    address: payload.address,
    instructions: payload.instructions,
    paidAmount: payload.paidAmount,
    serviceAmount: payload.serviceAmount,
    serviceCount: payload.serviceCount,
    serviceCountUnit: payload.serviceCountUnit,
    addonsTotal: payload.addonsTotal,
    totalAmount: payload.totalAmount,
    addons: payload.addons,
    bookingId: payload.bookingId,
    squarePaymentId: payload.squarePaymentId,
  })

  const ownerTemplate = BookingNotification({
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerPhone: payload.customerPhone,
    service: payload.service,
    date: payload.date,
    time: payload.time,
    address: payload.address,
    instructions: payload.instructions,
    paidAmount: payload.paidAmount,
    serviceAmount: payload.serviceAmount,
    serviceCount: payload.serviceCount,
    serviceCountUnit: payload.serviceCountUnit,
    addonsTotal: payload.addonsTotal,
    totalAmount: payload.totalAmount,
    addons: payload.addons,
    bookingId: payload.bookingId,
    squarePaymentId: payload.squarePaymentId,
  })

  return sendEmailPair({
    customerRecipient,
    ownerRecipient,
    customerSubject: `${subjectPrefix}SparkClean Booking Confirmed — ${payload.service} on ${payload.date}`,
    ownerSubject: `${subjectPrefix}New SparkClean Booking — ${payload.customerName} · ${payload.service} · ${payload.date}`,
    customerTemplate,
    ownerTemplate,
    logLabel: 'Booking',
  })
}

export async function sendQuoteEmails(payload: QuoteEmailPayload) {
  const customerRecipient = devOverrideRecipient ?? payload.customerEmail
  const ownerRecipient = devOverrideRecipient ?? ownerInbox
  const subjectPrefix = isProduction ? '' : '[DEV] '

  const customerTemplate = QuoteRequestReceived({
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerPhone: payload.customerPhone,
    address: payload.address,
    service: payload.service,
    message: payload.message,
  })

  const ownerTemplate = QuoteRequestNotification({
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerPhone: payload.customerPhone,
    address: payload.address,
    service: payload.service,
    message: payload.message,
  })

  return sendEmailPair({
    customerRecipient,
    ownerRecipient,
    customerSubject: `${subjectPrefix}SparkClean Quote Request Received — ${payload.service}`,
    ownerSubject: `${subjectPrefix}New SparkClean Quote Request — ${payload.customerName} · ${payload.service}`,
    customerTemplate,
    ownerTemplate,
    logLabel: 'Quote',
  })
}

export async function sendContactSubmissionEmail(payload: ContactEmailPayload) {
  const ownerRecipient = devOverrideRecipient ?? ownerInbox
  const subjectPrefix = isProduction ? '' : '[DEV] '

  const ownerTemplate = ContactSubmissionNotification({
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerPhone: payload.customerPhone,
    message: payload.message,
  })

  const [ownerHtml, ownerText] = await Promise.all([
    renderEmail(ownerTemplate),
    renderEmail(ownerTemplate, { plainText: true }),
  ])

  const ownerResult = await resend.emails.send({
    from: ownerFrom,
    to: ownerRecipient,
    subject: `${subjectPrefix}New SparkClean Contact Message — ${payload.customerName}`,
    html: ownerHtml,
    text: ownerText,
  })

  ensureSendSucceeded(ownerResult as ResendSendResult, ownerRecipient)

  console.log('[resend] Contact email accepted', {
    ownerEmailId: (ownerResult as ResendSendResult).data?.id ?? null,
    fromCustomerEmail: payload.customerEmail,
    toOwner: ownerRecipient,
  })

  return ownerResult
}