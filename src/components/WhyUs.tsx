import { Zap, CalendarClock, Leaf, ShieldCheck } from "lucide-react";

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    title: "Fast & Reliable Service",
    description:
      "We show up on time, every time. Our trained professionals work efficiently without cutting corners — your space is spotless before you know it.",
    stat: "98%",
    statLabel: "On-time arrival rate",
    accent: "bg-brand/10 text-brand",
  },
  {
    icon: CalendarClock,
    title: "Flexible Scheduling",
    description:
      "Early morning, evenings, weekends — we work around your life. Book online in minutes and reschedule anytime, no hassle.",
    stat: "Same day",
    statLabel: "Booking available",
    accent: "bg-brand-accent/10 text-brand-accent",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    description:
      "We use only non-toxic, biodegradable cleaning products that are safe for your family, pets, and the planet. Clean home, clean conscience.",
    stat: "100%",
    statLabel: "Non-toxic products",
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Insured & Vetted Staff",
    description:
      "Every cleaner is background-checked, fully insured, and trained to our high standards. You can trust who we send into your home or office.",
    stat: "5-star",
    statLabel: "Verified professionals",
    accent: "bg-brand/10 text-brand",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <div className="max-w-2xl mb-16">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Why SparkClean
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Cleaning you can{" "}
            <span className="text-brand">count on,</span>
            <br />every single visit.
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            We built SparkClean around the things that matter most to our customers —
            reliability, safety, and results that speak for themselves.
          </p>
        </div>

        {/* ── Feature Blocks Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, stat, statLabel, accent }, index) => (
            <div
              key={title}
              className={`
                group relative rounded-3xl border border-brand-border bg-brand-bg p-8
                hover:border-brand/40 hover:shadow-xl hover:shadow-brand/8
                transition-all duration-300 overflow-hidden
                ${index === 0 ? "sm:row-span-1" : ""}
              `}
            >
              {/* Subtle background circle on hover */}
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-brand/5 group-hover:bg-brand/10 transition-colors duration-300 pointer-events-none" />

              <div className="relative flex flex-col gap-5 h-full">

                {/* Icon + Stat row */}
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-brand-text leading-none">{stat}</p>
                    <p className="text-xs text-brand-muted mt-1">{statLabel}</p>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-brand-text">{title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{description}</p>
                </div>

                {/* Bottom accent line */}
                <div className="mt-auto pt-5 border-t border-brand-border">
                  <div className="w-8 h-1 rounded-full bg-brand group-hover:w-16 transition-all duration-300" />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Social Proof Strip ── */}
        <div className="mt-12 rounded-2xl bg-brand px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-8">
            {[
              { value: "500+", label: "Cleans completed" },
              { value: "7 years", label: "In the industry" },
              { value: "500+", label: "Happy customers" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center sm:text-left">
                <p className="text-white font-bold text-2xl leading-none">{value}</p>
                <p className="text-white/70 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-4 py-2.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-white font-semibold text-sm ml-1">4.75 / 5</span>
          </div>
        </div>

      </div>
    </section>
  );
}