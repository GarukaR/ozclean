"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

// ─── One-row photo strip + full-screen viewer ────────────────────────────────
// However many job photos a page has, they take a single swipeable row;
// tapping one opens a viewer (arrows, swipe, Esc to close). Keeps pages short
// as more photos are added.

export default function PhotoStrip({ photos }: { photos: { src: string; alt: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * t.clientWidth * 0.8, behavior: "smooth" });
  };

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length]
  );

  // Keyboard + scroll lock while the viewer is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-brand-text">
          {photos.length} photo{photos.length === 1 ? "" : "s"} from real jobs
          <span className="font-normal text-brand-muted"> · tap to enlarge</span>
        </p>
        {photos.length > 3 && (
          <div className="hidden sm:flex gap-2">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll photos left" className="w-9 h-9 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-text hover:border-brand-accent">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll photos right" className="w-9 h-9 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-text hover:border-brand-accent">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Single row; bleeds to the screen edge on phones so the next photo peeks in */}
      <div
        ref={trackRef}
        className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2.5 sm:gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Enlarge photo: ${photo.alt}`}
            className="group relative shrink-0 snap-start w-[38%] sm:w-[23%] lg:w-[18%] aspect-[3/4] rounded-2xl overflow-hidden bg-brand-surface border border-brand-border"
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 220px, 40vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/45 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Expand className="w-3.5 h-3.5" />
            </span>
          </button>
        ))}
      </div>

      {/* ── Viewer ── */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="relative w-full max-w-3xl h-[78vh]" onClick={(e) => e.stopPropagation()}>
            <Image key={photos[open].src} src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" className="object-contain" priority />
          </div>
          <p className="absolute bottom-5 inset-x-4 text-center text-sm text-white/85">
            {photos[open].alt} <span className="text-white/50">· {open + 1} / {photos.length}</span>
          </p>
          <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
          {photos.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
