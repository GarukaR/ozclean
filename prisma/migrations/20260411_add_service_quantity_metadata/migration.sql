-- Add explicit quantity metadata for service validation and pricing rules.
ALTER TABLE "services"
  ADD COLUMN IF NOT EXISTS "pricingUnit" TEXT NOT NULL DEFAULT 'service',
  ADD COLUMN IF NOT EXISTS "minQuantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS "allowDecimalQuantity" BOOLEAN NOT NULL DEFAULT false;
