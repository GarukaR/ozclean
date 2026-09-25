import Link from "next/link";
import { Clock, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { getResidentialPricing, type PriceRow } from "@/lib/residential-pricing";
import Reveal from "@/components/Reveal";

// Full hourly / flat-rate / add-on price list, shown on the House Cleaning
// page (moved off the homepage, which now has a slim teaser linking here).
function RateGrid({ rows, accent }: { rows: PriceRow[]; accent?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-px flex-1 ${accent ? "bg-brand-accent-border" : "bg-brand-border"}`}>
      {rows.map(({ label, price }, i) => {
        const spanFull = i === rows.length - 1 && rows.length % 2 !== 0;
        return (
          <div key={label} className={`bg-brand-surface px-5 py-4 flex flex-col gap-1 ${spanFull ? "col-span-2" : ""}`}>
            <p className="text-sm text-brand-muted">{label}</p>
            <p className={`text-2xl font-black ${accent ? "text-brand-accent-dark" : "text-brand-text"}`}>{price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default async function ResidentialPriceTable() {
  const pricing = await getResidentialPricing();
  if (!pricing) return null;

  return (
    <section id="pricing" className="bg-brand-bg py-20 scroll-mt-24 border-b border-brand-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Prices</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            House cleaning prices, <span className="text-brand-accent-dark">upfront.</span>
          </h2>
          <p className="text-brand-muted mt-4">
            Pick a flat rate by number of bedrooms, or pay by the hour for specific jobs. The price you see is the price you pay at checkout.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Flat rate first: it's the simpler choice for most homes. */}
          <Reveal className="rounded-2xl border border-brand-accent-border bg-brand-surface flex flex-col overflow-hidden shadow-sm shadow-brand-accent/10">
            <div className="px-6 pt-6 pb-5 border-b border-brand-accent-border bg-brand-accent-bg/40">
              <div className="flex items-center gap-2 mb-2">
                <Home className="w-5 h-5 text-brand-accent" />
                <h3 className="text-xl font-bold text-brand-text">Flat Rate</h3>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">
                A full clean to our standard checklist. Best for a complete top-to-bottom clean.
              </p>
            </div>
            <RateGrid rows={pricing.flat} accent />
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-brand-border bg-brand-surface flex flex-col overflow-hidden">
            <div className="px-6 pt-6 pb-5 border-b border-brand-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-brand" />
                <h3 className="text-xl font-bold text-brand-text">Hourly</h3>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">
                Your cleaner works through the tasks you choose. Best for specific areas. Minimum 2 hours.
              </p>
            </div>
            <RateGrid rows={pricing.hourly} />
          </Reveal>
        </div>

        {pricing.addons.length > 0 && (
          <div className="mb-10">
            <p className="text-sm font-bold text-brand-text uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand rounded-full inline-block" />
              Optional Add-ons
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pricing.addons.map(({ label, price }) => (
                <div key={label} className="bg-brand-surface border border-brand-border rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                  <span className="text-sm text-brand-text">{label}</span>
                  <span className="text-sm font-bold text-brand shrink-0">{price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-2">
            <Link href={ROUTES.BOOKING}>
              Book a Home Clean <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold">
            <Link href={ROUTES.QUOTE}>Not sure? Get a Free Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
