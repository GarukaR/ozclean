-- Migration: add partial unique index to prevent duplicate bookings for the same scheduledAt
-- This creates a unique index only for bookings that are not cancelled, so cancelled bookings
-- do not block reuse of the same timestamp.

CREATE UNIQUE INDEX IF NOT EXISTS "unique_booking_scheduledat_not_cancelled"
ON "Booking" ("scheduledAt")
WHERE "status" <> 'CANCELLED';
