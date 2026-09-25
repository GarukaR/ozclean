import { RotateCcw, ShieldCheck, Leaf, Baby, PawPrint, Briefcase, Store, KeyRound } from "lucide-react";
import Reveal from "@/components/Reveal";
import PromiseTiles, { type PromiseTile } from "@/components/PromiseTiles";

// Every point is a real commitment — the re-clean guarantee is the same one in
// every service FAQ — with no invented stats.
const TILES: PromiseTile[] = [
  {
    headline: "Free re-clean",
    detail: "Missed a spot? Tell us within 24 hours and we'll fix it, free.",
    tone: "accent",
    visual: { kind: "text", text: "24h", icon: RotateCcw },
    watermark: RotateCcw,
  },
  {
    headline: "Police-checked",
    detail: "Vetted, insured cleaners you can trust with the keys.",
    tone: "tint-blue",
    visual: { kind: "icons", icons: [ShieldCheck] },
    watermark: ShieldCheck,
  },
  {
    headline: "Kid & pet safe",
    detail: "Non-toxic, biodegradable products. No harsh fumes.",
    tone: "tint-teal",
    visual: { kind: "icons", icons: [Baby, PawPrint, Leaf] },
    watermark: Leaf,
  },
  {
    headline: "On your schedule",
    detail: "While you're at work, before your shop opens or between guests.",
    tone: "brand",
    visual: { kind: "icons", icons: [Briefcase, Store, KeyRound] },
    watermark: KeyRound,
  },
];

export default function WhyUs() {
  return (
    <section className="bg-brand-bg py-10 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-xl mx-auto sm:mx-0 mb-6 sm:mb-10 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight tracking-tight">
            Why people choose <span className="text-brand-accent-dark">OzClean.</span>
          </h2>
        </Reveal>
        <PromiseTiles tiles={TILES} />
      </div>
    </section>
  );
}
