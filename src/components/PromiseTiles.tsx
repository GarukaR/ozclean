import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

// ─── Glanceable colour tiles (Why Us on the homepage, Values on About) ──────
// A 2-3 word headline plus an oversized visual (a big bit of text like "24h",
// or a row of icons) so each point lands without reading the small print.
// Tones alternate solid and tinted so the four read as distinct blocks.

export type PromiseTile = {
  headline: string;
  detail: string;
  tone: "accent" | "brand" | "tint-blue" | "tint-teal";
  visual: { kind: "text"; text: string; icon: LucideIcon } | { kind: "icons"; icons: LucideIcon[] };
  watermark: LucideIcon;
};

// Dark mode turns brand/accent into bright mint, where white text fails
// contrast, so solid tiles switch to ink text there.
const SOLID = {
  chip: "bg-white/20 dark:bg-black/10",
  icon: "text-white dark:text-[#0A1220]",
  detail: "text-white/85 dark:text-[#0A1220]/75",
  watermark: "text-white/10 dark:text-black/10",
};

const TONES: Record<PromiseTile["tone"], { tile: string; chip: string; icon: string; detail: string; watermark: string }> = {
  accent: { tile: "bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white dark:text-[#0A1220] border-transparent", ...SOLID },
  brand: { tile: "bg-gradient-to-br from-brand to-brand-dark text-white dark:text-[#0A1220] border-transparent", ...SOLID },
  "tint-blue": {
    tile: "bg-brand/10 text-brand-text border-brand/15",
    chip: "bg-brand-surface shadow-sm",
    icon: "text-brand",
    detail: "text-brand-muted",
    watermark: "text-brand/10",
  },
  "tint-teal": {
    tile: "bg-brand-accent-bg text-brand-text border-brand-accent-border",
    chip: "bg-brand-surface shadow-sm",
    icon: "text-brand-accent-dark",
    detail: "text-brand-muted",
    watermark: "text-brand-accent/15",
  },
};

export default function PromiseTiles({ tiles }: { tiles: PromiseTile[] }) {
  return (
    // 2×2 on phones, a row of 4 on desktop.
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      {tiles.map(({ headline, detail, tone, visual, watermark: Watermark }, index) => {
        const t = TONES[tone];
        return (
          <Reveal
            key={headline}
            delay={index * 0.06}
            className={`group relative overflow-hidden rounded-3xl border p-4 sm:p-6 min-h-[176px] sm:min-h-[230px] flex flex-col justify-between gap-4 ${t.tile}`}
          >
            {/* Oversized faded icon for depth */}
            <Watermark aria-hidden="true" className={`absolute -right-5 -bottom-5 w-28 h-28 sm:w-36 sm:h-36 rotate-[-12deg] ${t.watermark}`} />

            {/* Visual: the part you "get" without reading */}
            <div className="relative" aria-hidden="true">
              {visual.kind === "text" ? (
                <div className="flex items-end gap-2">
                  <span className="text-4xl sm:text-5xl font-black leading-none tracking-tight">{visual.text}</span>
                  <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-0.5 ${t.chip}`}>
                    <visual.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${t.icon} transition-transform duration-500 group-hover:-rotate-180 motion-reduce:group-hover:rotate-0`} />
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {visual.icons.map((Icon, i) => (
                    <span
                      key={i}
                      className={`rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 ${t.chip} ${
                        visual.icons.length === 1 ? "w-12 h-12 sm:w-14 sm:h-14" : "w-10 h-10 sm:w-12 sm:h-12"
                      }`}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <Icon className={`${visual.icons.length === 1 ? "w-6 h-6 sm:w-7 sm:h-7" : "w-5 h-5 sm:w-6 sm:h-6"} ${t.icon}`} />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Words */}
            <div className="relative">
              <h3 className="text-base sm:text-xl font-extrabold leading-tight">{headline}</h3>
              <p className={`mt-1.5 text-[12.5px] sm:text-sm leading-snug ${t.detail}`}>{detail}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
