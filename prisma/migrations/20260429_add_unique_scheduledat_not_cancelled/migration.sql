-- Migration: add partial unique index to prevent duplicate bookings for the same scheduledAt.
-- The index covers only bookings that are not cancelled, so cancelled bookings do not block
-- reuse of the same timestamp.
--
-- NOTE: the Booking model is mapped to the "bookings" table (@@map); an earlier version of this
-- migration referenced "Booking" and therefore never applied.

-- 1. Release time slots still held by abandoned, unpaid checkouts. A booking row is created
--    before the customer reaches Square, so these would otherwise hold a slot forever and also
--    block the unique index below. This mirrors PENDING_BOOKING_TTL_MINUTES in src/lib/booking-holds.ts.
UPDATE "bookings"
SET "status" = 'CANCELLED',
    "cancelledAt" = NOW()
WHERE "status" = 'PENDING_PAYMENT'
  AND "paymentStatus" = 'UNPAID'
  AND "createdAt" < NOW() - INTERVAL '30 minutes';

-- 2. Remove April 2026 sandbox test bookings that double-booked three slots. These are Square
--    sandbox payments made against mailinator.com addresses during development and would block
--    the unique index. No-op on a fresh database.
DELETE FROM "bookings"
WHERE "status" <> 'CANCELLED'
  AND "scheduledAt" IN (
    TIMESTAMPTZ '2026-04-10 23:00:00+00',
    TIMESTAMPTZ '2026-04-11 02:00:00+00',
    TIMESTAMPTZ '2026-04-11 05:00:00+00'
  );

-- 3. Enforce one active booking per time slot.
CREATE UNIQUE INDEX IF NOT EXISTS "unique_booking_scheduledat_not_cancelled"
ON "bookings" ("scheduledAt")
WHERE "status" <> 'CANCELLED';
