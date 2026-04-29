-- Add explicit service-count pricing fields to bookings for easier querying/reporting.
ALTER TABLE "bookings"
  ADD COLUMN IF NOT EXISTS "serviceCount" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS "serviceCountUnit" TEXT NOT NULL DEFAULT 'service',
  ADD COLUMN IF NOT EXISTS "serviceUnitPriceCents" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "serviceSubtotalCents" INTEGER NOT NULL DEFAULT 0;
