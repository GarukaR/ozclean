'use server'

import { Prisma } from '@prisma/client'
import { getScheduledAtForSlot } from '@/lib/booking-slots'
import { prisma } from '@/lib/prisma'
import { validateBookingPrice } from '@/lib/validators'
import { createPaymentLink } from '@/lib/square'
import { nanoid } from 'nanoid'
import { utcToZonedTime } from 'date-fns-tz'
import { format } from 'date-fns'

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
    const scheduledAt = getScheduledAtForSlot(
      params.scheduledAt.slice(0, 10),
      params.scheduledAt.slice(11, 16)
    )

    // Disallow same-day bookings server-side as a last-resort guard
    const nowSydney = utcToZonedTime(new Date(), 'Australia/Sydney');
    const todaySydney = format(nowSydney, 'yyyy-MM-dd');
    const requestedDate = params.scheduledAt.slice(0, 10);
    if (requestedDate <= todaySydney) {
      return {
        success: false,
        error: 'Bookings must be made at least one day in advance.',
      }
    }

    const bookingData = await prisma.$transaction(async (tx) => {
      const existingBooking = await tx.booking.findFirst({
        where: {
          scheduledAt,
          status: {
            not: 'CANCELLED',
          },
        },
        select: { id: true },
      })

      if (existingBooking) {
        throw new Error('Selected time slot is no longer available. Please choose another time.')
      }

      const service = await tx.service.findUnique({
        where: { code: params.serviceCode },
      })

      if (!service) throw new Error('Service not found')

      const addons = await tx.addon.findMany({
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

      const booking = await tx.booking.create({
        data: {
          bookingRef,
          status: 'PENDING_PAYMENT',
          paymentStatus: 'UNPAID',
          customerName: params.customerName,
          customerEmail: params.customerEmail,
          customerPhone: params.customerPhone,
          service: service.name,
          scheduledAt,
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

      return { booking, service, addons }
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    })

    // Create Square payment link
    const paymentUrl = await createPaymentLink({
      bookingId: bookingData.booking.id,
      totalCents: total,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      service: bookingData.service.name,
      serviceCount,
      serviceCountUnit: params.serviceCountUnit ?? 'service',
      serviceUnitPriceCents: bookingData.service.basePriceCents,
      addons: bookingData.addons.map((addon) => ({
        name: addon.name,
        priceCents: addon.priceCents,
      })),
      date: scheduledAt.toLocaleDateString('en-AU'),
      time: scheduledAt.toLocaleTimeString('en-AU'),
    })

    if (!paymentUrl) {
      throw new Error('Failed to create payment link')
    }

    return {
      success: true,
      paymentUrl,
      bookingRef: bookingData.booking.bookingRef,
      bookingId: bookingData.booking.id,
    }
  } catch (error) {
    // Handle Prisma unique constraint (race) errors defensively
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 = Unique constraint failed
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Selected time slot is no longer available. Please choose another time.',
        }
      }
    }

    const errorMessage = error instanceof Error ? error.message : 'Failed to create booking'

    if (
      errorMessage.includes('Selected time slot is no longer available') ||
      errorMessage.includes('write conflict') ||
      errorMessage.includes('deadlock')
    ) {
      return {
        success: false,
        error: 'Selected time slot is no longer available. Please choose another time.',
      }
    }

    console.error('Booking creation error:', error)
    return {
      success: false,
      error: errorMessage,
    }
  }
}