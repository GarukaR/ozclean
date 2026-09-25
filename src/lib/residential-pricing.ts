import { prisma } from "@/lib/prisma";

// Residential prices live in the booking catalogue (services / addons tables),
// so the website shows exactly what checkout charges. Read on the server so
// the prices are in the page HTML for search engines, not fetched afterwards.

export type PriceRow = { label: string; price: string };

export type ResidentialPricing = {
  hourly: PriceRow[];
  flat: PriceRow[];
  addons: PriceRow[];
  fromFlatCents: number | null;
  fromHourlyCents: number | null;
};

const dollars = (cents: number) => `$${(cents / 100).toFixed(0)}`;

// Returns null if the catalogue can't be reached, so a database hiccup hides
// the price table instead of breaking the page (or the build).
export async function getResidentialPricing(): Promise<ResidentialPricing | null> {
  try {
    const [services, addons] = await Promise.all([
      prisma.service.findMany({ where: { isActive: true }, orderBy: { basePriceCents: "asc" } }),
      prisma.addon.findMany({ where: { isActive: true }, orderBy: { priceCents: "asc" } }),
    ]);

    // Most-frequent plan first, one-off last (price order would put Monthly before Fortnightly).
    const FREQUENCY_ORDER = ["weekly", "fortnightly", "monthly", "one-off"];
    const frequencyRank = (name: string) => {
      const i = FREQUENCY_ORDER.findIndex((f) => name.toLowerCase().includes(f));
      return i === -1 ? FREQUENCY_ORDER.length : i;
    };
    const hourlyServices = services
      .filter((s) => ["hour", "hr"].includes(s.pricingUnit.trim().toLowerCase()))
      .sort((a, b) => frequencyRank(a.name) - frequencyRank(b.name));
    const flatServices = services.filter((s) => s.pricingUnit.trim().toLowerCase() === "service");

    return {
      hourly: hourlyServices.map((s) => ({
        label: s.name.replace("Hourly Cleaning", "").replace(/[()]/g, "").trim() || s.name,
        price: `${dollars(s.basePriceCents)}/hr`,
      })),
      flat: flatServices.map((s) => ({
        label: s.name.replace("Apartment/House Cleaning", "").trim(),
        price: dollars(s.basePriceCents),
      })),
      addons: addons.map((a) => ({ label: a.name, price: `+${dollars(a.priceCents)}` })),
      fromFlatCents: flatServices[0]?.basePriceCents ?? null,
      fromHourlyCents: hourlyServices.length ? Math.min(...hourlyServices.map((s) => s.basePriceCents)) : null,
    };
  } catch (error) {
    console.error("[residential-pricing] Failed to load catalogue:", error);
    return null;
  }
}

export const formatFrom = (cents: number | null, suffix = "") => (cents == null ? null : `${dollars(cents)}${suffix}`);
