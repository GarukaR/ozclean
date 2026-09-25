import { RotateCcw, ShieldCheck, Leaf, CalendarClock } from "lucide-react";
import Reveal from "@/components/Reveal";

// ─── Four plain promises, no stat numbers ────────────────────────────────────
// Each point is something OzClean actually commits to (the re-clean guarantee
// is the same one in every service FAQ), phrased the way a customer would say
// it. Deliberately no percentages or counts we can't back up.
const FEATURES = [
  {
    icon: RotateCcw,
    title: "Not happy? We come back",
    description: "Tell us within 24 hours if anything was missed and we'll return to fix it, free.",
  },
  {
    icon: ShieldCheck,
    title: "Police-checked & insured",
    description: "Every cleaner is police-checked and insured, so you can hand over the keys with confidence.",
  },
  {
    icon: Leaf,
    title: "Safe for kids & pets",
    description: "Non-toxic, biodegradable products that don't leave harsh fumes behind.",
  },
  {
    icon: CalendarClock,
    title: "Fits around you",
    description: "While you're at work, before your shop opens or between guests. We work to your schedule.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-brand-bg py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-xl mx-auto sm:mx-0 mb-8 sm:mb-10 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight tracking-tight">
            Why people choose <span className="text-brand-accent-dark">OzClean.</span>
          </h2>
        </Reveal>

        {/* Centred on phones (short copy reads fine centred), left-aligned grid from sm up. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 sm:gap-y-8">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 0.08} className="flex flex-col items-center text-center sm:items-start sm:text-left gap-2.5 sm:gap-3 border-t border-brand-border pt-6">
              <div className="w-11 h-11 rounded-2xl bg-brand-accent-bg flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-accent-dark" />
              </div>
              <h3 className="text-lg font-bold text-brand-text">{title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed max-w-xs sm:max-w-none">{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
