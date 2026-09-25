import Link from "next/link";
import { ArrowRight, Home, KeyRound, Briefcase, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
import Reveal from "@/components/Reveal";

// ─── Compact catalogue, not a second card grid ───────────────────────────────
// The Specialties carousel already sells the headline services with photos, so
// this is a plain grouped link list: it catches everything else (house, deep,
// window, bin cleaning...) in a fraction of the height, and gives every service
// page a link from the homepage.
const GROUPS: { label: string; icon: LucideIcon; slugs: string[] }[] = [
  {
    label: "For homes",
    icon: Home,
    slugs: ["residential", "deep-clean", "windows", "wheely-bin"],
  },
  {
    label: "For hosts & tenants",
    icon: KeyRound,
    slugs: ["airbnb", "move", "carpet-cleaning", "upholstery-cleaning", "mattress-cleaning"],
  },
  {
    label: "For businesses",
    icon: Briefcase,
    slugs: ["commercial", "retail-cleaning", "medical-centre-cleaning", "strata-cleaning"],
  },
];

// Keyword-led names ("End of Lease", "Wheelie Bin") without the region
// suffix, so the list uses the same words people search with.
function shortName(slug: string) {
  return SERVICES[slug].seoTitle.replace(/ in South East Melbourne$/, "");
}

export default function AllServices() {
  return (
    <section className="bg-brand-bg py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
              All Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight tracking-tight">
              Everything we clean,{" "}
              <span className="text-brand-accent-dark">in one place.</span>
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

        {/* ── Grouped links ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {GROUPS.map(({ label, icon: Icon, slugs }, index) => (
            <Reveal key={label} delay={index * 0.08}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-accent-bg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-brand-accent-dark" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-muted">{label}</h3>
              </div>
              <ul className="divide-y divide-brand-border border-y border-brand-border">
                {slugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`${ROUTES.SERVICES}/${slug}`}
                      className="group flex items-center justify-between gap-3 py-3.5 text-brand-text font-medium hover:text-brand-accent-dark transition-colors"
                    >
                      {shortName(slug)}
                      <ArrowRight className="w-4 h-4 text-brand-muted shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-accent-dark motion-reduce:group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <p className="mt-10 text-center text-sm text-brand-muted">
          Not sure which service you need?{" "}
          <Link href={ROUTES.QUOTE} className="font-semibold text-brand-accent-dark hover:underline">
            Tell us about your space and we&apos;ll recommend one.
          </Link>
        </p>
      </div>
    </section>
  );
}
