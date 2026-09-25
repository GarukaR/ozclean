import Link from "next/link";
import { Phone, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import Reveal from "@/components/Reveal";

// ─── Steps config ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    icon: Phone,
    title: "Tell us what you need",
    description: "Call us or request a free quote online. We'll recommend the right service for your space.",
  },
  {
    icon: CalendarCheck,
    title: "Get your quote & pick a time",
    description: "We send a clear, upfront price and lock in a time that suits you. Home cleans can be booked online straight away.",
  },
  {
    icon: Sparkles,
    title: "We clean, you relax",
    description: "We turn up on time with everything we need and leave your space spotless.",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

// A vertical timeline on phones (number left, text right) and three columns on
// desktop, with one shared CTA row instead of a button per step — the old
// per-step cards stacked to roughly three screens tall on mobile.
export default function HowItWorks() {
  return (
    <section className="bg-brand-surface py-14 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <Reveal className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight tracking-tight">
            Sorted in <span className="text-brand">3 simple steps.</span>
          </h2>
        </Reveal>

        {/* ── Steps ── */}
        <ol className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 max-w-md mx-auto lg:max-w-none">
          {STEPS.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="relative">
              {/* Connector to the next step: vertical on phones, horizontal on desktop */}
              {index < STEPS.length - 1 && (
                <>
                  <span aria-hidden="true" className="lg:hidden absolute left-6 top-14 bottom-2 border-l-2 border-dashed border-brand/25" />
                  <span aria-hidden="true" className="hidden lg:block absolute top-7 left-[calc(50%+2.75rem)] right-[calc(-50%+0.75rem)] border-t-2 border-dashed border-brand/25" />
                </>
              )}

              <Reveal delay={index * 0.1} className="flex gap-4 pb-8 lg:pb-0 lg:flex-col lg:items-center lg:text-center">
                {/* Icon with step number */}
                <div className="relative z-10 shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-brand-surface border border-brand/15 shadow-sm flex items-center justify-center">
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-brand" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand border-2 border-brand-surface flex items-center justify-center text-white text-[10px] font-bold leading-none">
                    {index + 1}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 pt-1 lg:pt-2">
                  <h3 className="text-lg font-bold text-brand-text">{title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed lg:max-w-xs">{description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* ── One CTA row for all steps ── */}
        <div className="mt-4 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-2">
            <Link href={ROUTES.QUOTE}>
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold">
            <Link href={ROUTES.BOOKING}>Book a Home Clean</Link>
          </Button>
        </div>
        <p className="text-center text-brand-muted text-sm mt-5">
          Questions first?{" "}
          <Link href={ROUTES.CONTACT} className="text-brand font-semibold hover:underline underline-offset-2">
            Talk to our team →
          </Link>
        </p>

      </div>
    </section>
  );
}
