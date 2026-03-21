import { Resend } from 'resend'
import BookingConfirmation from '@/emails/BookingConfirmation'
import BookingNotification from '@/emails/BookingNotification'
import { render } from '@react-email/components'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is missing')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingConfirmationEmail(params: {
  customerEmail: string
  customerName: string
  bookingRef: string
  service: string
  scheduledAt: Date
  address: string
  totalCents: number
  depositCents: number
}) {
  try {
    const totalAmount = `$${(params.totalCents / 100).toFixed(2)}`
    const depositAmount = `$${(params.depositCents / 100).toFixed(2)}`
    const balanceDue = `$${((params.totalCents - params.depositCents) / 100).toFixed(2)}`

    const dateStr = params.scheduledAt.toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const timeStr = params.scheduledAt.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    const emailHtml = await render(
      BookingConfirmation({
        customerName: params.customerName,
        service: params.service,
        date: dateStr,
        time: timeStr,
        address: params.address,
        depositAmount,
        totalAmount,
        balanceDue,
        bookingId: params.bookingRef,
      })
    )

    return await resend.emails.send({
      from: 'bookings@ausclean.com.au',
      to: params.customerEmail,
      subject: `Booking Confirmed - ${params.bookingRef}`,
      html: emailHtml,
    })
  } catch (error) {
    console.error('Customer email error:', error)
    throw error
  }
}

export async function sendOwnerNotificationEmail(params: {
  bookingRef: string
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  scheduledAt: Date
  address: string
  totalCents: number
  depositCents: number
}) {
  try {
    const totalAmount = `$${(params.totalCents / 100).toFixed(2)}`
    const depositAmount = `$${(params.depositCents / 100).toFixed(2)}`
    const balanceDue = `$${((params.totalCents - params.depositCents) / 100).toFixed(2)}`

    const dateStr = params.scheduledAt.toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const timeStr = params.scheduledAt.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    const emailHtml = await render(
      BookingNotification({
        customerName: params.customerName,
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone,
        service: params.service,
        date: dateStr,
        time: timeStr,
        address: params.address,
        depositAmount,
        totalAmount,
        balanceDue,
        bookingId: params.bookingRef,
        squarePaymentId: '', // Will be set after payment
      })
    )

    return await resend.emails.send({
      from: 'bookings@ausclean.com.au',
      to: process.env.OWNER_EMAIL || 'owner@ausclean.com.au',
      subject: `New Booking - ${params.bookingRef}`,
      html: emailHtml,
    })
  } catch (error) {
    console.error('Owner notification error:', error)
    throw error
  }
}