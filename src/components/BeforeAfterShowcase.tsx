"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

// ─── Before / after comparison slider ────────────────────────────────────────
// Both photos are stacked; the "before" is clipped to the left of a draggable
// divider. Drag (mouse or touch), click anywhere, or use the arrow keys on the
// handle. Vertical page scrolling keeps working on phones (touch-action pan-y).
// Several pairs switch via thumbnails / arrows. The handle sweeps once when it
// first scrolls into view so people discover it's interactive.

export type BeforeAfterPair = { before: string; after: string; label: string };

export default function BeforeAfterShowcase({ pairs, serviceName }: { pairs: BeforeAfterPair[]; serviceName: string }) {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(50); // % of width showing "before"
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(frameRef, { once: true, amount: 0.6 });
  const hinted = useRef(false);

  const pair = pairs[index];

  // One-time "you can drag this" sweep
  useEffect(() => {
    if (!inView || reduce || hinted.current) return;
    hinted.current = true;
    const controls = animate(50, [50, 22, 78, 50], {
      duration: 2.2,
      ease: "easeInOut",
      onUpdate: (v) => setPos(v),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const posFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const go = (next: number) => {
    setIndex((next + pairs.length) % pairs.length);
    setPos(50);
  };

  return (
    <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 lg:gap-8 items-center">
      {/* ── Slider ── */}
      <div>
        <div
          ref={frameRef}
          className={`relative aspect-square sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden rounded-3xl bg-brand-surface border border-brand-border shadow-xl shadow-brand/10 select-none ${dragging ? "cursor-grabbing" : "cursor-ew-resize"}`}
          style={{ touchAction: "pan-y" }}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setDragging(true);
            posFromClientX(e.clientX);
          }}
          onPointerMove={(e) => dragging && posFromClientX(e.clientX)}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
        >
          {/* After (base layer) */}
          <Image
            key={`a-${pair.after}`}
            src={pair.after}
            alt={`${pair.label} after our ${serviceName}`}
            fill
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover pointer-events-none"
            draggable={false}
          />
          {/* Before (clipped to the left of the divider) */}
          <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image
              key={`b-${pair.before}`}
              src={pair.before}
              alt={`${pair.label} before our ${serviceName}`}
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover"
              draggable={false}
            />
          </div>

          {/* Corner tags fade as the divider approaches them */}
          <span
            className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity"
            style={{ opacity: pos < 12 ? 0 : 1 }}
          >
            Before
          </span>
          <span
            className="absolute top-3 right-3 rounded-full bg-brand-accent px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white dark:text-[#0A1220] transition-opacity"
            style={{ opacity: pos > 88 ? 0 : 1 }}
          >
            After
          </span>

          {/* Divider + handle */}
          <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -translate-x-1/2 w-[3px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
            <button
              type="button"
              role="slider"
              aria-label={`Compare before and after: ${pair.label}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% before`}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
                if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
                if (e.key === "Home") setPos(0);
                if (e.key === "End") setPos(100);
              }}
              className="pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-brand-text shadow-lg shadow-black/25 ring-4 ring-white/40 flex items-center justify-center focus:outline-none focus-visible:ring-brand-accent"
            >
              <MoveHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-brand-muted lg:hidden">Drag the handle to compare</p>
      </div>

      {/* ── Pair picker ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
              {index + 1} / {pairs.length}
            </p>
            <p className="text-xl font-bold text-brand-text leading-tight mt-1">{pair.label}</p>
          </div>
          {pairs.length > 1 && (
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous before and after"
                className="w-11 h-11 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next before and after"
                className="w-11 h-11 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {pairs.length > 1 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {pairs.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${p.label}`}
                aria-pressed={i === index}
                className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  i === index ? "border-brand-accent ring-4 ring-brand-accent/20" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* Split thumbnail: before on the left half, after on the right */}
                <Image src={p.after} alt="" fill sizes="160px" className="object-cover" />
                <div className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>
                  <Image src={p.before} alt="" fill sizes="160px" className="object-cover" />
                </div>
                <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/90" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-5 text-left text-[11px] font-semibold text-white leading-tight">
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        )}

        <p className="hidden lg:block text-sm text-brand-muted">Drag the handle across the photo to compare before and after.</p>
      </div>
    </div>
  );
}
