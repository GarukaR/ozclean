import Link from "next/link";
import { Building2, Home, Sparkles, ArrowLeftRight, Wind, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";

export const metadata = generatePageMeta({
  title: "Our Services",
  description: "Residential, commercial, deep cleaning, move in/out, and window cleaning across Melbourne. Starting from $60 — book online today.",
  path: "/services",
});

const SERVICES = [
  {
    icon: Building2,
    title: "Commercial Cleaning",
    desc: "Tailored cleaning for offices, retail spaces, and commercial properties. We work around your hours.",
    price: "From $150",
    href: "/services/commercial",
    highlights: ["After-hours available", "Dedicated team", "Weekly or daily"],
    featured: true,
  },
  {
    icon: Home,
    title: "Residential Cleaning",
    desc: "Regular home cleaning tailored to your schedule. Weekly, fortnightly, or one-off.",
    price: "From $80",
    href: "/services/residential",
    highlights: ["Same cleaner each visit", "Eco-friendly products", "Flexible scheduling"],
    featured: false,
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    desc: "A thorough top-to-bottom clean. Inside appliances, grout lines, every corner.",
    price: "From $200",
    href: "/services/deep-clean",
    highlights: ["Inside all appliances", "Grout & tile scrubbing", "Ideal for spring cleans"],
    featured: false,
  },
  {
    icon: ArrowLeftRight,
    title: "Move In / Move Out",
    desc: "Bond-back ready cleaning for end of lease or moving into a new property.",
    price: "From $180",
    href: "/services/move",
    highlights: ["Bond clean guarantee", "Real estate checklist", "Re-clean guarantee"],
    featured: false,
  },
  {
    icon: Wind,
    title: "Window Cleaning",
    desc: "Streak-free windows inside and out for homes and businesses.",
    price: "From $60",
    href: "/services/windows",
    highlights: ["Streak-free guarantee", "Multi-storey available", "Inside & outside"],
    featured: false,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-bg">

      {/* ── Hero ── */}
      <section className="bg-white pt-32 pb-16 border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Our Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-text leading-tight tracking-tight mb-4">
              Every clean you need,{" "}
              <span className="text-brand">all in one place.</span>
            </h1>
            <p className="text-brand-muted text-lg leading-relaxed mb-6">
              From regular home cleans to full commercial contracts — SparkClean has the right service for every space.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-brand hover:bg-brand-dark text-white font-semibold gap-2">
                <Link href="/book">Book a Service <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-border hover:border-brand text-brand-text font-semibold">
                <Link href="/quote">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services List ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, price, href, highlights, featured }) => (
            <div
              key={title}
              className={`rounded-3xl border p-8 flex flex-col sm:flex-row gap-6 items-start justify-between transition-all duration-200 hover:shadow-lg ${
                featured
                  ? "bg-brand border-brand shadow-lg shadow-brand/20"
                  : "bg-white border-brand-border hover:border-brand/40"
              }`}
            >
              <div className="flex gap-5 items-start flex-1">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${featured ? "bg-white/20" : "bg-brand/10"}`}>
                  <Icon className={`w-6 h-6 ${featured ? "text-white" : "text-brand"}`} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className={`text-xl font-bold ${featured ? "text-white" : "text-brand-text"}`}>{title}</h2>
                    {featured && <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">Most Popular</span>}
                  </div>
                  <p className={`text-sm leading-relaxed max-w-xl ${featured ? "text-white/75" : "text-brand-muted"}`}>{desc}</p>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${featured ? "text-white/70" : "text-brand"}`} />
                        <span className={`text-xs ${featured ? "text-white/80" : "text-brand-text"}`}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
                <div>
                  <p className={`text-2xl font-black ${featured ? "text-white" : "text-brand-text"}`}>{price}</p>
                  <p className={`text-xs ${featured ? "text-white/60" : "text-brand-muted"}`}>per visit</p>
                </div>
                <Button
                  asChild
                  className={`font-semibold gap-1.5 ${featured ? "bg-white text-brand hover:bg-brand-bg" : "bg-brand hover:bg-brand-dark text-white"}`}
                >
                  <Link href={href}>Learn More <ArrowRight className="w-3.5 h-3.5" /></Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-text rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Not sure which service you need?</h3>
              <p className="text-white/60 mt-1 text-sm">Tell us about your space and we&apos;ll recommend the right service.</p>
            </div>
            <Button asChild size="lg" className="bg-brand hover:bg-brand-dark text-white font-semibold gap-2 shrink-0 shadow-lg shadow-brand/30">
              <Link href="/quote">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}