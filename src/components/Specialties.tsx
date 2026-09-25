"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/routes";
import { SERVICES, type Service } from "@/lib/services";
import Reveal from "@/components/Reveal";

// ─── Swipeable specialties row ────────────────────────────────────────────────
// The two founding specialties (Airbnb turnovers, end of lease) lead, followed
// by the business and upholstery services the owner wants visitors to spot
// fast. Native CSS scroll-snap does the swiping, so there's no carousel
// library, touch works out of the box, and every card is in the server HTML
// for search engines. Arrows and dots are progressive extras on top.
type Card = {
  service: Service;
  badge?: string;
  title?: string;
  description?: string;
  // Extra service pages a combined card links to (carpet / couch / mattress).
  alsoLinks?: { label: string; slug: string }[];
};

const CARDS: Card[] = [
  { service: SERVICES.airbnb, badge: "Most Popular" },
  { service: SERVICES.move, badge: "Bond-Back Guarantee", title: "End of Lease Cleaning" },
  { service: SERVICES["retail-cleaning"], badge: "New" },
  { service: SERVICES["medical-centre-cleaning"], badge: "New" },
  { service: SERVICES["strata-cleaning"], badge: "New", title: "Strata, Office & Common Areas" },
  {
    service: SERVICES["carpet-cleaning"],
    badge: "New",
    title: "Carpet, Couch & Mattress",
    description: "Hot water extraction for carpets, fabric couches and mattresses.",
    alsoLinks: [
      { label: "Couch", slug: "upholstery-cleaning" },
      { label: "Mattress", slug: "mattress-cleaning" },
    ],
  },
];

function SpecialtyCard({ card }: { card: Card }) {
  const { service } = card;
  const Icon = service.icon;
  const href = `${ROUTES.SERVICES}/${service.slug}`;

  return (
    <article className="group h-full rounded-3xl border border-brand-border bg-brand-surface overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:shadow-brand-accent/10 transition-shadow duration-300">
      {/* Photo */}
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-brand-bg" tabIndex={-1} aria-hidden="true">
        <Image
          src={service.heroImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 85vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        {card.badge && (
          <Badge className="absolute top-3 left-3 bg-white/90 text-brand-accent-dark border-white/60 text-[10px] font-semibold backdrop-blur-sm">
            {card.badge}
          </Badge>
        )}
      </Link>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-accent-bg flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-brand-accent-dark" />
          </div>
          <h3 className="font-bold text-brand-text leading-tight text-lg">
            <Link href={href} className="hover:text-brand-accent-dark transition-colors">
              {card.title ?? service.title}
            </Link>
          </h3>
        </div>

        <p className="text-sm text-brand-muted leading-relaxed">{card.description ?? service.description}</p>

        <ul className="flex flex-col gap-2">
          {service.highlights.map(({ label }) => (
            <li key={label} className="flex items-center gap-2 text-xs text-brand-muted">
              <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0" />
              {label}
            </li>
          ))}
        </ul>

        {card.alsoLinks && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-brand-muted">Also:</span>
            {card.alsoLinks.map(({ label, slug }) => (
              <Link
                key={slug}
                href={`${ROUTES.SERVICES}/${slug}`}
                className="rounded-full border border-brand-border px-2.5 py-1 font-medium text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* CTA row — every specialty is quote-only */}
        <div className="mt-auto pt-4 border-t border-brand-border flex items-center gap-3 flex-wrap">
          <Button asChild className="h-10 bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-1.5">
            <Link href={`${ROUTES.QUOTE}?service=${service.slug}`}>
              Get a Free Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Link
            href={href}
            className="flex items-center gap-1.5 py-2.5 text-sm font-semibold text-brand-accent-dark hover:gap-2.5 transition-all duration-200"
          >
            Learn more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Specialties() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Number of distinct scroll stops: one per card on phones, fewer on wider
  // screens where several cards are visible at once.
  const [stops, setStops] = useState(CARDS.length);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const cardStep = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const syncState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardStep();
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const stopCount = step ? Math.max(1, Math.round((track.scrollWidth - track.clientWidth) / step) + 1) : CARDS.length;
    setStops(stopCount);
    if (end) setActive(stopCount - 1);
    else if (step) setActive(Math.min(stopCount - 1, Math.round(track.scrollLeft / step)));
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(end);
  }, [cardStep]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // ResizeObserver also fires once on observe, which sets the initial
    // number of stops for this screen width.
    const resizeObserver = new ResizeObserver(syncState);
    resizeObserver.observe(track);
    track.addEventListener("scroll", syncState, { passive: true });
    return () => {
      resizeObserver.disconnect();
      track.removeEventListener("scroll", syncState);
    };
  }, [syncState]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: index * cardStep(), behavior: reduce ? "auto" : "smooth" });
  };

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * cardStep(), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="bg-brand-bg pt-10 pb-16 sm:py-24 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header + arrows ── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
              Our Specialties
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
              Specialist cleaning for{" "}
              <span className="text-brand-accent-dark">hosts, homes & businesses.</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Previous specialties"
              className="w-11 h-11 rounded-full border border-brand-border bg-brand-surface text-brand-text flex items-center justify-center hover:border-brand-accent hover:text-brand-accent-dark disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label="Next specialties"
              className="w-11 h-11 rounded-full border border-brand-border bg-brand-surface text-brand-text flex items-center justify-center hover:border-brand-accent hover:text-brand-accent-dark disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>

        {/* ── Track ──
            Bleeds to the screen edge on mobile (-mx-4 / px-4) so the next
            card peeks in from the right, which is what tells people to swipe. */}
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Our specialty cleaning services"
          tabIndex={0}
          className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50 rounded-3xl"
        >
          {CARDS.map((card, index) => (
            <div
              key={card.service.slug}
              className="snap-start shrink-0 w-[85%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              aria-label={`${index + 1} of ${CARDS.length}`}
              role="group"
              aria-roledescription="slide"
            >
              <SpecialtyCard card={card} />
            </div>
          ))}
        </div>

        {/* ── Dots ── */}
        <div className="mt-6 flex justify-center gap-2">
          {CARDS.slice(0, stops).map((card, index) => (
            <button
              key={card.service.slug}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Scroll to ${card.title ?? card.service.title}`}
              aria-current={index === active}
              className={`h-2 rounded-full transition-all duration-300 ${index === active ? "w-6 bg-brand-accent" : "w-2 bg-brand-border hover:bg-brand-muted"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
