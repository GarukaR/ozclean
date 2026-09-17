import { Zap, CalendarClock, Leaf, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    title: "Fast & Reliable Service",
    description: "On time, every time, without cutting corners.",
    stat: "98%",
    statLabel: "On-time arrival rate",
    accent: "bg-brand/10 text-brand",
  },
  {
    icon: CalendarClock,
    title: "Flexible Scheduling",
    description: "Early mornings, evenings, weekends. Book and reschedule online anytime.",
    stat: "Easy and Quick",
    statLabel: "Booking available",
    accent: "bg-brand-accent/10 text-brand-accent",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    description: "Non-toxic, biodegradable products, safe for family and pets.",
    stat: "100%",
    statLabel: "Non-toxic products",
    accent: "bg-brand-accent-bg text-brand-accent",
  },
  {
    icon: ShieldCheck,
    title: "Insured & Vetted Staff",
    description: "Police-checked, fully insured, and trained to our standards.",
    stat: "Punctual & Friendly",
    statLabel: "Verified professionals",
    accent: "bg-brand/10 text-brand",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-brand-surface py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <Reveal className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Cleaning you can{" "}
            <span className="text-brand-accent-dark">count on,</span>
            <br />every single visit.
          </h2>
        </Reveal>

        {/* ── Feature List ── */}
        {/* Divided list rather than another card grid — Services and HowItWorks
            below already own the bordered-card visual language. */}
        <div className="divide-y divide-brand-border border-t border-brand-border">
          {FEATURES.map(({ icon: Icon, title, description, stat, statLabel, accent }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="group py-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${accent}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-brand-text">{title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed max-w-2xl">{description}</p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <p className="text-2xl font-bold text-brand-text leading-none">{stat}</p>
                  <p className="text-xs text-brand-muted mt-1">{statLabel}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}