import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { formatFrom, getResidentialPricing } from "@/lib/residential-pricing";
import Reveal from "@/components/Reveal";

// Slim homepage price strip. The full hourly / flat-rate / add-on table lives
// on the House Cleaning page (#pricing); this just surfaces the "from" prices
// the owner wants visible and routes people there or straight to booking.
export default async function PricingTeaser() {
  const pricing = await getResidentialPricing();
  const fromFlat = formatFrom(pricing?.fromFlatCents ?? null);
  const fromHourly = formatFrom(pricing?.fromHourlyCents ?? null, "/hr");

  return (
    <section className="bg-brand-surface py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="rounded-3xl border border-brand-accent-border bg-brand-accent-bg/40 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="flex-1 max-w-xl">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">House Cleaning Prices</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-tight">
              Simple, upfront prices for home cleans.
            </h2>
            <p className="text-brand-muted mt-3 leading-relaxed">
              Choose a flat rate by number of bedrooms or pay by the hour, then book online in a few minutes.
            </p>
          </div>

          {(fromFlat || fromHourly) && (
            <div className="flex gap-3 sm:gap-4">
              {fromFlat && (
                <div className="rounded-2xl bg-brand-surface border border-brand-accent-border px-5 py-4 min-w-[8.5rem]">
                  <p className="text-xs text-brand-muted">Flat rate from</p>
                  <p className="text-3xl font-black text-brand-accent-dark leading-tight">{fromFlat}</p>
                </div>
              )}
              {fromHourly && (
                <div className="rounded-2xl bg-brand-surface border border-brand-border px-5 py-4 min-w-[8.5rem]">
                  <p className="text-xs text-brand-muted">Hourly from</p>
                  <p className="text-3xl font-black text-brand-text leading-tight">{fromHourly}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Button asChild className="bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-2">
              <Link href={ROUTES.BOOKING}>
                Book a Home Clean <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold">
              <Link href={`${ROUTES.SERVICES}/residential#pricing`}>See all prices</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
