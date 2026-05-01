"use client";

import { Star, Quote } from "lucide-react";

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
    name: "Sarah Mitchell",
    location: "Fitzroy, VIC",
    service: "Residential Cleaning",
    rating: 5,
    text: "SparkClean has been a game changer for our family. The team is always on time, thorough, and our house has never looked better. Highly recommend the Standard plan!",
    avatar: "SM",
    avatarBg: "bg-brand/10 text-brand",
  },
  {
    name: "James Okoye",
    location: "CBD, Melbourne",
    service: "Commercial Cleaning",
    rating: 5,
    text: "We use SparkClean for our office every week. Professional, discreet, and the results are consistently excellent. Our team loves coming into a clean workspace on Monday mornings.",
    avatar: "JO",
    avatarBg: "bg-brand-accent-bg text-brand-accent-dark",
  },
  {
    name: "Priya Sharma",
    location: "Richmond, VIC",
    service: "Deep Cleaning",
    rating: 5,
    text: "Booked the deep clean before a big family event and I was blown away. They got into every corner — the grout, inside the oven, behind the fridge. Absolutely spotless.",
    avatar: "PS",
    avatarBg: "bg-brand-bg text-brand-dark",
  },
  {
    name: "Tom & Lisa Berry",
    location: "St Kilda, VIC",
    service: "Move Out Clean",
    rating: 5,
    text: "Got our full bond back thanks to SparkClean. The landlord inspection went perfectly. Worth every cent — stress-free and professional from start to finish.",
    avatar: "TB",
    avatarBg: "bg-brand-accent/10 text-brand-accent-dark",
  },
  {
    name: "Angela Nguyen",
    location: "Southbank, VIC",
    service: "Window Cleaning",
    rating: 5,
    text: "My apartment has floor-to-ceiling windows and I'd been putting off getting them cleaned for months. SparkClean did an incredible job — streak-free and so fast.",
    avatar: "AN",
    avatarBg: "bg-brand/10 text-brand-dark",
  },
  {
    name: "David Park",
    location: "Docklands, VIC",
    service: "Commercial Cleaning",
    rating: 5,
    text: "Running a café means cleanliness is everything. SparkClean comes in after close and the place is immaculate every morning. Reliable, thorough, and great value.",
    avatar: "DP",
    avatarBg: "bg-brand-bg text-brand",
  },
  {
    name: "Megan Torres",
    location: "Brunswick, VIC",
    service: "Residential Cleaning",
    rating: 5,
    text: "I've tried three other cleaning services before SparkClean. None of them came close. Same cleaner every visit, always remembers my preferences. Genuinely impressed.",
    avatar: "MT",
    avatarBg: "bg-brand-accent-bg text-brand-accent",
  },
  {
    name: "Chris Halliday",
    location: "Prahran, VIC",
    service: "Deep Cleaning",
    rating: 5,
    text: "Moved into a place that hadn't been cleaned properly in years. SparkClean transformed it in one session. I couldn't believe it was the same apartment.",
    avatar: "CH",
    avatarBg: "bg-brand/10 text-brand-dark",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-80 shrink-0 bg-white rounded-3xl border border-brand-border p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300">

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
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Loved by{" "}
            <span className="text-brand">Victorians</span>
            {""}.
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            Don&apos;t just take our word for it, here&apos;s what our customers say
            about their OzClean experience.
          </p>

          {/* Overall rating */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white border border-brand-border rounded-2xl px-5 py-3 shadow-sm">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="w-px h-5 bg-brand-border" />
            <p className="text-sm font-bold text-brand-text">4.75 / 5</p>
            <div className="w-px h-5 bg-brand-border" />
            <p className="text-sm text-brand-muted">500+ reviews</p>
          </div>
        </div>
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