'use server'

import { prisma } from '@/lib/prisma'
import { validateBookingPrice } from '@/lib/validators'
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
  serviceCount?: number
  serviceCountUnit?: string
}) {
  try {
    // Validate prices from database
    const { addonsTotal, total, serviceSubtotal, serviceCount } = await validateBookingPrice({
      serviceCode: params.serviceCode,
      addonIds: params.addonIds,
      serviceCount: params.serviceCount,
    })

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

    const addonsSnapshot = {
      serviceSelection: {
        count: serviceCount,
        unitLabel: params.serviceCountUnit ?? 'service',
        unitPriceCents: service.basePriceCents,
        subtotalCents: serviceSubtotal,
      },
      addons: addons.map((a) => ({
        code: a.code,
        name: a.name,
        unitPriceCents: a.priceCents,
        quantity: 1,
        lineTotalCents: a.priceCents,
      })),
    }

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
        addons: addonsSnapshot,
        serviceCount,
        serviceCountUnit: params.serviceCountUnit ?? 'service',
        serviceUnitPriceCents: service.basePriceCents,
        serviceSubtotalCents: serviceSubtotal,
        addonsSubtotalCents: addonsTotal,
        totalCents: total,
        totalPaidCents: 0,
      },
    })

    // Create Square payment link
    const paymentUrl = await createPaymentLink({
      bookingId: booking.id,
      totalCents: total,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      service: service.name,
      serviceCount,
      serviceCountUnit: params.serviceCountUnit ?? 'service',
      serviceUnitPriceCents: service.basePriceCents,
      addons: addons.map((addon) => ({
        name: addon.name,
        priceCents: addon.priceCents,
      })),
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