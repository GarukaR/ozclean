import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES, bookingWithService } from "@/lib/routes";
import { SERVICES, type Service } from "@/lib/services";
import Reveal from "@/components/Reveal";

// ─── Homepage shows a curated subset of the full catalog ──────────────────────
// Source of truth for title/price/description is lib/services.ts (shared with
// the /services listing and /services/[slug] detail pages) so pricing can't
// drift between pages. Window & wheely-bin cleaning are intentionally left off
// this shortlist — see the full catalog at /services.
const HOME_SLUGS = ["airbnb", "move", "residential", "commercial", "deep-clean"] as const;
const FEATURED_SLUG: (typeof HOME_SLUGS)[number] = "airbnb";

function FeaturedCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-brand to-brand-accent p-8 flex flex-col gap-6 overflow-hidden shadow-2xl shadow-brand-accent/25 h-full transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      {/* Background decoration */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative flex flex-col gap-6 h-full">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Badge className="bg-white/20 text-white border-white/20 text-xs font-semibold">
            Most Popular
          </Badge>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
          <p className="text-white/75 text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2.5">
          {service.highlights.map(({ label }) => (
            <li key={label} className="flex items-center gap-2.5 text-sm text-white/85">
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                  <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {label}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto pt-4 border-t border-brand-border flex items-center gap-3 flex-wrap">
          <Button
            asChild
            className="bg-white text-brand-accent-dark hover:bg-brand-accent-bg font-semibold shadow-lg gap-1.5 shrink-0"
          >
            <Link href={ROUTES.QUOTE}>
              Get a Free Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Link
            href={`${ROUTES.SERVICES}/${service.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-white hover:gap-2.5 transition-all duration-200"
          >
            Learn more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="group relative rounded-3xl border border-brand-border bg-brand-bg p-7 flex flex-col gap-5 hover:border-brand-accent/40 hover:shadow-lg hover:shadow-brand-accent/10 hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-all duration-300 overflow-hidden h-full">
      {/* Hover circle */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-brand-accent/5 group-hover:bg-brand-accent/10 transition-colors duration-300 pointer-events-none" />

      <div className="relative flex flex-col gap-4 h-full">
        {/* Icon + Price */}
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-2xl bg-brand-accent-bg flex items-center justify-center">
            <Icon className="w-5 h-5 text-brand-accent-dark" />
          </div>
          <div className="text-right">
            <p className="text-brand-text font-bold text-base leading-none">{service.price}</p>
            <p className="text-brand-muted text-xs mt-1">{service.priceLabel}</p>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-brand-text">{service.title}</h3>
            {service.slug === "move" && (
              <Badge className="bg-brand/10 text-brand border-brand/20 text-[10px] font-semibold">
                Our Specialty
              </Badge>
            )}
          </div>
          <p className="text-brand-muted text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2">
          {service.highlights.map(({ label }) => (
            <li key={label} className="flex items-center gap-2 text-xs text-brand-muted">
              <div className="w-1 h-1 rounded-full bg-brand-accent shrink-0" />
              {label}
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <div className="mt-auto pt-4 border-t border-brand-border flex items-center gap-3 flex-wrap">
          {service.bookable ? (
            <Button asChild size="sm" className="bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-1 h-8 px-3 text-xs">
              <Link href={bookingWithService(service.slug)}>
                Book Now
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline" className="border-brand-accent-border text-brand-accent-dark hover:border-brand-accent hover:bg-brand-accent-bg font-semibold gap-1 h-8 px-3 text-xs">
              <Link href={ROUTES.QUOTE}>
                Get a Free Quote
              </Link>
            </Button>
          )}
          <Link
            href={`${ROUTES.SERVICES}/${service.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-accent-dark hover:gap-2.5 transition-all duration-200"
          >
            Learn more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const homeServices = HOME_SLUGS.map((slug) => SERVICES[slug]);
  const featured = homeServices.find((s) => s.slug === FEATURED_SLUG);
  const regular = homeServices.filter((s) => s.slug !== FEATURED_SLUG);

  return (
    <section className="bg-brand-surface py-16 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
              Services built around{" "}
              <span className="text-brand-accent-dark">your needs.</span>
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark shrink-0 self-start sm:self-auto"
          >
            <Link href={ROUTES.SERVICES}>View all services</Link>
          </Button>
        </Reveal>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {/* Featured card */}
          {featured && (
            <Reveal className="lg:col-span-1 lg:self-stretch">
              <FeaturedCard service={featured} />
            </Reveal>
          )}

          {/* Regular cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr lg:col-span-2">
            {regular.map((service, index) => (
              <Reveal key={service.slug} delay={0.08 + index * 0.08} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 text-center">
          <p className="text-brand-muted text-sm mb-4">
            Not sure which service is right for you?
          </p>
          <Button
            asChild
            className="bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold shadow-md shadow-brand-accent/20 gap-2"
          >
            <Link href={ROUTES.QUOTE}>
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
