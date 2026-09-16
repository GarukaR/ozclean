import type { Prisma } from '@prisma/client'

import { prisma } from './prisma'

/**
 * How long an unpaid booking may hold its time slot before the slot is released back to other
 * customers. A booking row is created before the customer is sent to Square, so an abandoned
 * checkout would otherwise block that slot permanently.
 */
export const PENDING_BOOKING_TTL_MINUTES = 30

type BookingClient = Prisma.TransactionClient | typeof prisma

export function getPendingBookingCutoff(now: Date = new Date()): Date {
  return new Date(now.getTime() - PENDING_BOOKING_TTL_MINUTES * 60_000)
}

/**
 * Cancels unpaid bookings that have been holding a slot for longer than the TTL, which frees the
 * slot for the partial unique index and for availability queries. Returns how many were released.
 */
export async function releaseExpiredPendingBookings(
  client: BookingClient = prisma,
  scheduledAt?: Date | Date[],
): Promise<number> {
  const scheduledAtFilter = Array.isArray(scheduledAt) ? { in: scheduledAt } : scheduledAt

  const { count } = await client.booking.updateMany({
    where: {
      status: 'PENDING_PAYMENT',
      paymentStatus: 'UNPAID',
      createdAt: { lt: getPendingBookingCutoff() },
      ...(scheduledAt ? { scheduledAt: scheduledAtFilter } : {}),
    },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date(),
    },
  })

  if (count > 0) {
    console.log(`[booking-holds] Released ${count} expired pending booking(s)`)
  }

  return count
}
