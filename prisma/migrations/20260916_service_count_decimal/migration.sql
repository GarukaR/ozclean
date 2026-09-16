-- Services priced per hour allow fractional quantities (allowDecimalQuantity), and pricing is
-- already calculated from the fractional count. Storing the count as INTEGER rounded it, so a
-- 2.5 hour booking was charged for 2.5 hours but recorded and emailed as 3 hours.

ALTER TABLE "bookings"
  ALTER COLUMN "serviceCount" TYPE DOUBLE PRECISION;
