import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES, bookingWithService } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
import Reveal from "@/components/Reveal";

// ─── Purpose-built compare, not a re-list of the Services grid ────────────────
// OzClean's two specialties are Airbnb/short-term-rental turnovers and
// Move In/Out cleans. Rather than re-showing every service a second time
// (see the removed Compare.tsx), this zooms into just those two so a visitor
// torn between them can tell which one actually fits their situation.
const ROWS: { label: string; airbnb: string; move: string }[] = [
  { label: "Best for", airbnb: "Hosts turning a property between guests", move: "Tenants and landlords at end of lease" },
  { label: "Timing", airbnb: "Same-day or next-day, between bookings", move: "Scheduled 1-2 days before inspection" },
  { label: "Focus", airbnb: "Guest-ready presentation, linen change, restocking", move: "Bond-back checklist, cupboards, fixtures" },
  { label: "Frequency", airbnb: "Every turnover, ongoing", move: "One-off, before you leave" },
];

export default function Specialties() {
  const airbnb = SERVICES.airbnb;
  const move = SERVICES.move;

  return (
    <section className="bg-brand-bg py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <Reveal className="text-center max-w-xl mx-auto mb-12">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Our Specialties
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Airbnb turnover, or{" "}
            <span className="text-brand-accent-dark">moving out?</span>
          </h2>
        </Reveal>

        {/* ── Compact comparison card ── */}
        <Reveal delay={0.1} className="rounded-3xl border border-brand-border bg-brand-surface overflow-hidden shadow-sm">

          {/* Column headers */}
          <div className="grid grid-cols-2 divide-x divide-brand-border border-b border-brand-border">
            {[
              { service: airbnb, badge: "Most Popular" },
              { service: move, badge: "Bond-Back Guarantee" },
            ].map(({ service, badge }) => {
              const Icon = service.icon;
              return (
                <div key={service.slug} className="p-6 sm:p-7 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent-bg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-accent-dark" />
                    </div>
                    <h3 className="font-bold text-brand-text leading-tight">{service.title}</h3>
                  </div>
                  <Badge className="w-fit bg-brand/10 text-brand border-brand/20 text-[10px] font-semibold">
                    {badge}
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Comparison rows */}
          <div className="divide-y divide-brand-border">
            {ROWS.map((row) => (
              <div key={row.label} className="grid grid-cols-2 divide-x divide-brand-border">
                {[row.airbnb, row.move].map((value, i) => (
                  <div key={i} className="p-5 sm:p-6 flex flex-col gap-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-muted">
                      {row.label}
                    </p>
                    <p className="text-sm text-brand-text leading-snug">{value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Price + CTA row */}
          <div className="grid grid-cols-2 divide-x divide-brand-border bg-brand-bg border-t border-brand-border">
            <div className="p-5 sm:p-6 flex flex-col gap-3">
              <p className="text-lg font-black text-brand-text">{airbnb.price}</p>
              <Button asChild size="sm" className="w-full bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-1.5">
                <Link href={bookingWithService(airbnb.slug)}>
                  Book Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
            <div className="p-5 sm:p-6 flex flex-col gap-3">
              <p className="text-lg font-black text-brand-text">{move.price}</p>
              <Button asChild size="sm" variant="outline" className="w-full border-brand-accent-border text-brand-accent-dark hover:bg-brand-accent-bg hover:border-brand-accent font-semibold gap-1.5">
                <Link href={ROUTES.QUOTE}>
                  Get a Free Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
