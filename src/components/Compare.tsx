import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Services config ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    slug: "residential",
    name: "Residential Cleaning",
    tagline: "Regular home maintenance",
    href: "/quote",
    featured: false,
    badge: null,
    specialties: ["Dust and wipe bedrooms, bathrooms, and shared areas", "Vacuum carpets and mop hard floors", "Clean kitchen surfaces and everyday touchpoints"],
  },
  {
    slug: "deep-clean",
    name: "Airbnb / Short‑Term Rental",
    tagline: "Fast turnarounds for hosts",
    href: "/quote",
    featured: true,
    badge: "Top Pick",
    specialties: ["Reset bedrooms, bathrooms, and living areas", "Sanitise kitchens, sinks, and high-touch spots", "Make the property guest-ready between stays"],
  },
  {
    slug: "move",
    name: "Move In / Move Out",
    tagline: "Bond-back end of lease clean",
    href: "/quote",
    featured: false,
    badge: null,
    specialties: ["Clean cupboards, wardrobes, and storage spaces", "Scrub kitchens, bathrooms, and fixtures", "Tackle detail areas for inspection-ready results"],
  },
];

// ─── Quick comparison rows ────────────────────────────────────────────────────

const QUICK_ROWS: {
  label: string;
  values: [string, string, string];
}[] = [
  { label: "Best for", values: ["Routine upkeep", "Fast host turnarounds", "Vacate / move-out cleans"] },
  { label: "Main strength", values: ["Consistency", "Speed", "Inspection-ready detail"] },
  { label: "Speciality focus", values: ["Same cleaner each visit", "Guest-ready kitchens and bathrooms", "Cupboards, wardrobes and hidden spots"] },
  { label: "Best fit if you want", values: ["Regular maintenance", "Quick resets between bookings", "A bond-back focused clean"] },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Compare() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Compare Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Find the right clean{" "}
            <span className="text-brand">for your needs.</span>
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            Not all cleans are equal. See exactly what&apos;s included in each service
            so you can book with confidence.
          </p>
        </div>

        {/* ── Service highlights ── */}
        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          {SERVICES.map(({ slug, name, tagline, featured, badge, specialties }) => (
            <div
              key={slug}
              className={`rounded-3xl border p-6 shadow-sm ${featured ? "border-brand/20 bg-brand text-white" : "border-brand-border bg-brand-bg"}`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  {badge && (
                    <Badge className={`mb-3 font-semibold px-3 text-[10px] shadow-md ${featured ? "bg-white text-brand border-transparent" : "bg-brand text-white border-transparent"}`}>
                      {badge}
                    </Badge>
                  )}
                  <p className={`font-bold text-lg leading-tight ${featured ? "text-white" : "text-brand-text"}`}>
                    {name}
                  </p>
                  <p className={`mt-1 text-sm leading-relaxed ${featured ? "text-white/75" : "text-brand-muted"}`}>
                    {tagline}
                  </p>
                </div>
                {featured && (
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 pt-1">
                    Most popular
                  </span>
                )}
              </div>

              <ul className="space-y-2">
                <li className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${featured ? "text-white/70" : "text-brand-muted"}`}>
                  Key Tasks
                </li>
                {specialties.map((specialty) => (
                  <li key={specialty} className="flex items-start gap-2 text-sm leading-relaxed">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-white" : "text-brand"}`} strokeWidth={3} />
                    <span className={featured ? "text-white/90" : "text-brand-text"}>{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Compact comparison strip ── */}
        <div className="rounded-3xl border border-brand-border overflow-hidden shadow-sm mb-6">
          <div className="grid grid-cols-4 border-b border-brand-border bg-brand-bg">
            <div className="p-4 sm:p-5 border-r border-brand-border flex items-end">
              <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest">
                Quick compare
              </p>
            </div>

            {SERVICES.map(({ slug, name, featured }, i) => (
              <div
                key={slug}
                className={`p-4 sm:p-5 flex flex-col gap-1 ${featured ? "bg-brand" : "bg-brand-bg"} ${i < SERVICES.length - 1 ? "border-r border-brand-border" : ""}`}
              >
                <p className={`font-bold text-sm ${featured ? "text-white" : "text-brand-text"}`}>
                  {name}
                </p>
                <p className={`text-[11px] leading-snug ${featured ? "text-white/70" : "text-brand-muted"}`}>
                  Specialty-led summary
                </p>
              </div>
            ))}
          </div>

          {QUICK_ROWS.map((row, rowIndex) => (
            <div
              key={row.label}
              className={`grid grid-cols-4 ${rowIndex < QUICK_ROWS.length - 1 ? "border-b border-brand-border/50" : ""}`}
            >
              <div className="px-4 sm:px-5 py-3.5 border-r border-brand-border/50 flex items-center bg-white">
                <span className="text-sm text-brand-text">{row.label}</span>
              </div>

              {row.values.map((value, valueIndex) => (
                <div
                  key={value}
                  className={`px-4 sm:px-5 py-3.5 flex items-center justify-center text-center ${SERVICES[valueIndex].featured ? "bg-brand/[0.05]" : "bg-white"} ${valueIndex < row.values.length - 1 ? "border-r border-brand-border/50" : ""}`}
                >
                  <span className={`text-sm leading-snug ${SERVICES[valueIndex].featured ? "text-brand-text" : "text-brand-muted"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          ))}

          {/* ── Bottom CTA row ── */}
          <div className="grid grid-cols-4 bg-brand-bg border-t border-brand-border">
            <div className="p-5 border-r border-brand-border flex items-center">
              <p className="text-xs text-brand-muted leading-relaxed">
                Not sure which service fits?{" "}
                <Link href="/contact" className="text-brand font-semibold hover:underline underline-offset-2">
                  Ask us →
                </Link>
              </p>
            </div>
            {SERVICES.map(({ slug, href, featured }, i) => (
              <div
                key={slug}
                className={`p-4 flex items-center justify-center
                  ${SERVICES[i].featured ? "bg-brand/[0.05]" : ""}
                  ${i < SERVICES.length - 1 ? "border-r border-brand-border" : ""}
                `}
              >
                <Button
                  asChild
                  size="sm"
                  className={`w-full text-xs font-semibold gap-1
                    ${featured
                      ? "bg-brand hover:bg-brand-dark text-white shadow-md shadow-brand/20"
                      : "bg-white hover:bg-brand-bg border border-brand-border text-brand-text hover:border-brand/40"
                    }`}
                >
                  <Link href={href}>
                    Quote <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}