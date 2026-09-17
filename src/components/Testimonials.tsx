"use client";

import { Star, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";

type Testimonial = {
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  avatar: string;
  avatarBg: string;
};
// ─── Testimonials data ────────────────────────────────────────────────────────
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mathias Maurer",
    location: "Berwick, VIC",
    service: "Residential Cleaning",
    rating: 5,
    text: "Our house has never looked better. Always on time, thorough, easy to deal with.",
    avatar: "MM",
    avatarBg: "bg-brand/10 text-brand",
  },
  {
    name: "Shiya Okoye",
    location: "Dandenong, VIC",
    service: "Commercial Cleaning",
    rating: 5,
    text: "Weekly office cleans for over a year now. Professional, discreet, consistent.",
    avatar: "SO",
    avatarBg: "bg-brand-accent-bg text-brand-accent-dark",
  },
  {
    name: "Jatin Sharma",
    location: "Cranbourne, VIC",
    service: "Deep Cleaning",
    rating: 4,
    text: "Booked before a big family event. Every corner, the grout, inside the oven. Genuinely spotless.",
    avatar: "JS",
    avatarBg: "bg-brand-bg text-brand-dark",
  },
  {
    name: "Tom & Lisa Berry",
    location: "Hampton Park, VIC",
    service: "Move Out Clean",
    rating: 5,
    text: "Got our full bond back. Landlord inspection went perfectly, stress-free start to finish.",
    avatar: "TB",
    avatarBg: "bg-brand-accent/10 text-brand-accent-dark",
  },
  {
    name: "Priya Fernando",
    location: "Noble Park, VIC",
    service: "Airbnb Cleaning",
    rating: 5,
    text: "Turnaround speed is everything with two listings. Guest-ready within hours of checkout, every time.",
    avatar: "PF",
    avatarBg: "bg-brand/10 text-brand-dark",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-80 shrink-0 bg-brand-surface rounded-3xl border border-brand-border p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-brand/30 hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-all duration-300">

      {/* Quote icon + Stars */}
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center">
          <Quote className="w-4 h-4 text-brand fill-brand" />
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      {/* Review text */}
      <p className="text-brand-text text-sm leading-relaxed flex-1">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-3 border-t border-brand-border">
        {/* Avatar */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${testimonial.avatarBg}`}>
          {testimonial.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-brand-text truncate">{testimonial.name}</p>
          <p className="text-xs text-brand-muted truncate">{testimonial.location}</p>
        </div>
        <div className="shrink-0">
          <span className="text-[10px] font-medium text-brand bg-brand/8 border border-brand/15 px-2 py-1 rounded-full whitespace-nowrap">
            {testimonial.service}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const duplicated = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-brand-bg py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">

        {/* ── Section Header ── */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Loved by{" "}
            <span className="text-brand">Victorians</span>
            {""}.
          </h2>

          {/* Overall rating */}
          <div className="mt-6 inline-flex items-center gap-3 bg-brand-surface border border-brand-border rounded-2xl px-5 py-3 shadow-sm">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="w-px h-5 bg-brand-border" />
            <p className="text-sm font-bold text-brand-text">4.75 / 5</p>
            <div className="w-px h-5 bg-brand-border" />
            <p className="text-sm text-brand-muted">100+ reviews</p>
          </div>
        </Reveal>
      </div>

      {/* ── Single scrolling row ── */}
      <div className="overflow-hidden">
        <div
          className="flex gap-5 w-max animate-scroll-left"
          style={{ "--scroll-speed": "50s" } as React.CSSProperties}
        >
          {duplicated.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left var(--scroll-speed, 50s) linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
}