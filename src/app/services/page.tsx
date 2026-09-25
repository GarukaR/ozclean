import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { SERVICES, SERVICE_GROUPS, serviceShortName } from "@/lib/services";
import AreaCheckerSection from "@/components/AreaCheckerSection";
import Reveal from "@/components/Reveal";

export const metadata = generatePageMeta({
  title: "Cleaning Services South East Melbourne",
  description: "Airbnb, end of lease, retail, medical centre, strata, office, carpet, couch, mattress and house cleaning across Hampton Park, Berwick, Cranbourne and South East Melbourne. Free quotes.",
  path: ROUTES.SERVICES,
});

// Same lib/services.ts data as the individual service pages, so pricing and
// descriptions can never drift between pages.

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-bg">

      {/* ── Hero ── */}
      {/* bg-brand-bg (not brand-surface) to match the body background the
          seamless floating navbar sits on — avoids a mismatched color strip
          in the navbar's clearance gap above this band. */}
      <section className="bg-brand-bg pt-6 sm:pt-10 pb-12 border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            {/* Keyword-led <h1>; the big line below is display copy. */}
            <h1 className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
              Cleaning Services in South East Melbourne
            </h1>
            <p className="text-4xl sm:text-5xl font-bold text-brand-text leading-tight tracking-tight mb-4">
              Every clean you need,{" "}
              <span className="text-brand-accent-dark">all in one place.</span>
            </p>
            <p className="text-brand-muted text-lg leading-relaxed mb-6">
              From Airbnb turnovers and bond-back cleans to offices, clinics and carpets. Jump to what you need:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {SERVICE_GROUPS.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
                >
                  {group.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-2">
                <Link href={ROUTES.QUOTE}>Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-accent-border hover:border-brand-accent text-brand-text font-semibold">
                <Link href={ROUTES.BOOKING}>Book a Home Clean</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Services, grouped by who they're for ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-12">
          {SERVICE_GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-28">
              <Reveal className="mb-4 max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-text">{group.label}</h2>
                <p className="text-brand-muted text-sm sm:text-base mt-1.5">{group.blurb}</p>
              </Reveal>
              {/* Compact rows: the whole card links to the service page, which
                  carries the Quote / Book buttons. Keeps the page short. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {group.slugs.map((slug, index) => {
                  const service = SERVICES[slug];
                  const Icon = service.icon;
                  return (
                    <Reveal key={slug} delay={(index % 3) * 0.05} className="h-full">
                      <Link
                        href={`${ROUTES.SERVICES}/${slug}`}
                        className="group h-full rounded-2xl border border-brand-border bg-brand-surface p-3.5 sm:p-4 flex items-start gap-3 sm:gap-3.5 hover:border-brand-accent/50 hover:shadow-md transition-all duration-200"
                      >
                        <span className="w-10 h-10 rounded-xl bg-brand-accent-bg flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-brand-accent-dark" />
                        </span>
                        <span className="flex-1 min-w-0 flex flex-col gap-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-bold text-brand-text leading-snug group-hover:text-brand-accent-dark transition-colors">
                              {serviceShortName(service)}
                            </span>
                            <ArrowRight className="w-4 h-4 text-brand-muted shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-accent-dark" />
                          </span>
                          <span className="text-sm text-brand-muted leading-snug line-clamp-1 sm:line-clamp-2">{service.description}</span>
                          <span className="text-xs font-semibold text-brand-accent-dark mt-0.5">
                            {service.bookable ? `${service.price} · Book online` : service.price}
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AreaCheckerSection className="bg-brand-surface border-y border-brand-border" />

      {/* ── Bottom CTA ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Fixed dark gradient band, independent of the light/dark theme toggle (same reasoning as Footer). */}
          <Reveal className="bg-gradient-to-r from-[#0C1A2E] to-[#0F766E] rounded-3xl px-6 sm:px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-2xl font-bold text-white">Not sure which service you need?</h3>
              <p className="text-white/60 mt-1 text-sm">Tell us about your space and we&apos;ll recommend the right service.</p>
            </div>
            <Button asChild size="lg" className="bg-white text-brand-accent-dark hover:bg-brand-accent-bg font-semibold gap-2 shrink-0 shadow-lg shadow-brand-accent/25">
              <Link href={ROUTES.QUOTE}>Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
