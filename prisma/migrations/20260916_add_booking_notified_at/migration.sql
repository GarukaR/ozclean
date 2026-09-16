-- Records when booking confirmation emails were successfully sent, so a webhook retry can
-- re-send them instead of being short-circuited by the duplicate-payment guard.
ALTER TABLE "bookings"
  ADD COLUMN IF NOT EXISTS "notifiedAt" TIMESTAMP(3);

-- Bookings confirmed before this column existed were already emailed.
UPDATE "bookings" SET "notifiedAt" = "confirmedAt" WHERE "confirmedAt" IS NOT NULL;
