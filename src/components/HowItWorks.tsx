import Link from "next/link";
import { Phone, FileText, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Steps config ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    step: "01",
    icon: Phone,
    title: "Call Us or Get a Quote",
    description:
      "Not sure what you need? Give us a call or request a free quote. We'll recommend the right service and answer any questions.",
    cta: { label: "Get a Free Quote", href: "/quote" },
    alt: {
      label: "Or browse services first",
      href: "/services",
    },
  },
  {
    step: "02",
    icon: CalendarCheck,
    title: "Book Your Clean",
    description:
      "Pick your service, choose a date and time that suits you, and confirm your booking online in minutes. No phone call required.",
    cta: { label: "Book Now", href: "/book" },
    alt: null,
  },
  {
    step: "03",
    icon: Sparkles,
    title: "We Clean, You Relax",
    description:
      "Our vetted professionals arrive on time and get to work. You'll come back to a spotless, fresh space — guaranteed.",
    cta: null,
    alt: null,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <section className="bg-brand-bg py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Clean your space in{" "}
            <span className="text-brand">3 simple steps.</span>
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            Whether you know exactly what you need or want to chat first —
            getting started takes just a few minutes.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="relative">

          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px">
            <div className="w-full h-full border-t-2 border-dashed border-brand/25" />
            {/* Moving dot animation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-brand animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
            {STEPS.map(({ step, icon: Icon, title, description, cta, alt }, index) => (
              <div key={step} className="relative flex flex-col items-center text-center lg:items-center gap-5">

                {/* Mobile connector */}
                {index < STEPS.length - 1 && (
                  <div className="lg:hidden absolute top-[52px] left-1/2 -translate-x-1/2 w-px h-full border-l-2 border-dashed border-brand/20 -z-10" />
                )}

                {/* Step circle */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-brand/20 shadow-lg shadow-brand/10 flex items-center justify-center group-hover:border-brand transition-colors">
                    <Icon className="w-7 h-7 text-brand" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-brand flex items-center justify-center shadow-md">
                    <span className="text-white text-[10px] font-bold">{step}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className="w-full h-full bg-white rounded-3xl border border-brand-border p-7 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-brand-text">{title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{description}</p>
                  </div>

                  {/* CTAs */}
                  {(cta || alt) && (
                    <div className="pt-2 flex flex-col gap-2 mt-auto">
                      {cta && (
                        <Button
                          asChild
                          className="bg-brand hover:bg-brand-dark text-white font-semibold w-full gap-1.5"
                        >
                          <Link href={cta.href}>
                            {cta.label} <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </Button>
                      )}
                      {alt && (
                        <Link
                          href={alt.href}
                          className="text-xs text-brand-muted hover:text-brand transition-colors text-center"
                        >
                          {alt.label} →
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Step 3 — end result highlight */}
                  {index === STEPS.length - 1 && (
                    <div className="mt-2 rounded-xl bg-brand/8 border border-brand/15 px-4 py-3 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-brand" fill="none" viewBox="0 0 10 10">
                          <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium text-brand">
                        100% satisfaction guarantee — or we re-clean for free
                      </p>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom note ── */}
        <p className="text-center text-brand-muted text-sm mt-12">
          Questions before booking?{" "}
          <Link href="/contact" className="text-brand font-semibold hover:underline underline-offset-2">
            Talk to our team →
          </Link>
        </p>

      </div>
    </section>
  );
}