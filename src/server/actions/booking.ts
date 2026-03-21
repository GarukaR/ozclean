'use server'

import { prisma } from '@/lib/prisma'
import { validateBookingPrice } from '@/lib/validators'
import { sendBookingConfirmationEmail, sendOwnerNotificationEmail } from '@/lib/resend'
import { createPaymentLink } from '@/lib/square'
import { nanoid } from 'nanoid'

export async function createBookingAndPaymentLink(params: {
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceCode: string
  scheduledAt: string
  addressLine1: string
  addressLine2?: string
  suburb: string
  state: string
  postcode: string
  instructions?: string
  addonIds: string[]
}) {
  try {
    // Validate prices from database
    const { basePrice, addonsTotal, total } = await validateBookingPrice({
      serviceCode: params.serviceCode,
      addonIds: params.addonIds,
    })

    const depositCents = Math.round(total * 0.1) // 10% deposit
    const bookingRef = `SC-${nanoid(8).toUpperCase()}`

    // Get service name for email
    const service = await prisma.service.findUnique({
      where: { code: params.serviceCode },
    })

    if (!service) throw new Error('Service not found')

    // Get add-on details for snapshot
    const addons = await prisma.addon.findMany({
      where: { code: { in: params.addonIds } },
    })

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        status: 'PENDING_PAYMENT',
        paymentStatus: 'UNPAID',
        customerName: params.customerName,
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone,
        service: service.name,
        scheduledAt: new Date(params.scheduledAt),
        addressLine1: params.addressLine1,
        addressLine2: params.addressLine2,
        suburb: params.suburb,
        state: params.state,
        postcode: params.postcode,
        instructions: params.instructions,
        addons: addons.map(a => ({
          code: a.code,
          name: a.name,
          priceCents: a.priceCents,
        })),
        addonsSubtotalCents: addonsTotal,
        totalCents: total,
        depositCents,
      },
    })

    // Format address for emails
    const fullAddress = `${params.addressLine1}${
      params.addressLine2 ? `, ${params.addressLine2}` : ''
    }, ${params.suburb}, ${params.state} ${params.postcode}`

    // Create Square payment link
    const paymentUrl = await createPaymentLink({
      bookingId: booking.id,
      totalCents: total,
      depositCents,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      service: service.name,
      date: new Date(params.scheduledAt).toLocaleDateString('en-AU'),
      time: new Date(params.scheduledAt).toLocaleTimeString('en-AU'),
    })

    if (!paymentUrl) {
      throw new Error('Failed to create payment link')
    }

    return { success: true, paymentUrl, bookingRef: booking.bookingRef, bookingId: booking.id }
  } catch (error) {
    console.error('Booking creation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create booking',
    }
  }
}