import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { ALL_SERVICE_AREAS } from "@/lib/service-areas";
import { SERVICES, SERVICE_GROUPS, serviceShortName } from "@/lib/services";
import AreaChecker from "@/components/AreaChecker";
import Reveal from "@/components/Reveal";

export const metadata = generatePageMeta({
  title: "Cleaning Service Areas in South East Melbourne",
  description:
    "OzClean covers 42 suburbs across South East Melbourne from our base in Hampton Park, including Narre Warren, Berwick, Cranbourne, Dandenong, Keysborough and Pakenham. Check your suburb or postcode.",
  path: ROUTES.AREAS,
});

// Suburbs sorted A–Z within each group, so a visitor scanning the list can find theirs.
const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
const CORE = ALL_SERVICE_AREAS.filter((a) => !a.travelCharge).sort(byName);
const TRAVEL = ALL_SERVICE_AREAS.filter((a) => a.travelCharge).sort(byName);

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      {/* ── Hero + checker ── */}
      <section className="bg-brand-bg pt-6 sm:pt-10 pb-12 border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-start">
          <Reveal className="flex flex-col gap-4">
            <h1 className="text-brand text-sm font-semibold uppercase tracking-widest">Areas We Serve</h1>
            <p className="text-4xl sm:text-5xl font-bold text-brand-text leading-tight tracking-tight">
              Cleaning across <span className="text-brand-accent-dark">South East Melbourne.</span>
            </p>
            <p className="text-brand-muted text-lg leading-relaxed">
              We&apos;re based in Hampton Park and cover {ALL_SERVICE_AREAS.length} suburbs, from Dandenong and
              Keysborough out to Berwick, Cranbourne and Pakenham. Type your suburb or postcode to check.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-brand-border bg-brand-surface p-5 sm:p-7 shadow-sm">
            <AreaChecker showAllAreas={false} />
          </Reveal>
        </div>
      </section>

      {/* ── Full suburb list ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-2">Suburbs we cover</h2>
            <p className="text-brand-muted mb-6">No travel charge in any of these suburbs.</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {CORE.map((area) => (
                <li key={area.name} className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface px-3 py-2.5">
                  <MapPin className="w-4 h-4 text-brand-accent-dark shrink-0" />
                  <span className="text-sm font-medium text-brand-text">{area.name}</span>
                  <span className="ml-auto text-xs text-brand-muted">{area.postcode}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-2">Also covered</h2>
            <p className="text-brand-muted mb-6">A small travel charge applies in these suburbs. We&apos;ll include it in your quote.</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {TRAVEL.map((area) => (
                <li key={area.name} className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-bg px-3 py-2.5">
                  <MapPin className="w-4 h-4 text-brand-muted shrink-0" />
                  <span className="text-sm font-medium text-brand-text">{area.name}</span>
                  <span className="ml-auto text-xs text-brand-muted">{area.postcode}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-brand-muted">
              Just outside these areas?{" "}
              <Link href={ROUTES.CONTACT} className="font-semibold text-brand-accent-dark hover:underline underline-offset-2">
                Ask us anyway
              </Link>
              . We sometimes travel further for larger or regular jobs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Services available in every area ── */}
      <section className="bg-brand-surface border-y border-brand-border py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text">Services in every suburb</h2>
            <p className="text-brand-muted mt-2">Every service is available across all the suburbs above.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.id}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-3">{group.label}</h3>
                <ul className="divide-y divide-brand-border border-y border-brand-border">
                  {group.slugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`${ROUTES.SERVICES}/${slug}`}
                        className="group flex items-center justify-between gap-3 py-3 font-medium text-brand-text hover:text-brand-accent-dark transition-colors"
                      >
                        {serviceShortName(SERVICES[slug])}
                        <ArrowRight className="w-4 h-4 text-brand-muted shrink-0 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="bg-gradient-to-r from-[#0C1A2E] to-[#0F766E] rounded-3xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">In our area? Let&apos;s get started.</h2>
              <p className="text-white/70 mt-2">Tell us about your space and we&apos;ll send a clear, upfront quote.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button asChild size="lg" className="h-12 px-7 bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-2">
                <Link href={ROUTES.QUOTE}>Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold">
                <Link href={ROUTES.BOOKING}>Book a Home Clean</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
