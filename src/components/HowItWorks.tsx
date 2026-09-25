"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Phone, CalendarCheck, Sparkles, ArrowRight, Check } from "lucide-react";
import { ROUTES } from "@/lib/routes";

// ─── How it works: three steps that *show* what happens ──────────────────────
// Each step has a tiny animated scene (a chat bubble, a quote ticking off, a
// sparkle) so the flow is understood at a glance. Everything plays once as
// the section scrolls into view, staggered like a progress tracker, and is
// static for visitors who prefer reduced motion.

const EASE = [0.16, 1, 0.3, 1] as const;
const STEP_DELAY = 0.9; // seconds between steps (leaves time for each arrow to draw)

const STEPS = [
  {
    icon: Phone,
    title: "Tell us what you need",
    description: "Call us or request a free quote online. We'll recommend the right service for your space.",
    short: "Call or request a free quote online.",
  },
  {
    icon: CalendarCheck,
    title: "Get your quote & pick a time",
    description: "We send a clear, upfront price and lock in a time that suits you. Home cleans can be booked online straight away.",
    short: "A clear, upfront price and a time that suits you.",
  },
  {
    icon: Sparkles,
    title: "We clean, you relax",
    description: "We turn up on time with everything we need and leave your space spotless.",
    short: "We turn up on time and leave it spotless.",
  },
];

// ── Mini scenes ──────────────────────────────────────────────────────────────

function ChatScene({ delay, reduce }: { delay: number; reduce: boolean }) {
  return (
    <div className="relative h-9 sm:h-10 flex items-center justify-center">
      {/* Typing dots, replaced by the message */}
      {!reduce && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex gap-1 rounded-2xl rounded-bl-md bg-brand-bg border border-brand-border px-3 py-2.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay, times: [0, 0.1, 0.85, 1] }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-brand-muted"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.6, repeat: 2, delay: delay + i * 0.12 }}
            />
          ))}
        </motion.div>
      )}
      <motion.div
        className="rounded-2xl rounded-bl-md bg-brand text-white text-xs sm:text-[13px] font-medium px-3 py-2 shadow-sm"
        initial={reduce ? false : { opacity: 0, y: 6, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: reduce ? 0 : delay + 1.2, ease: EASE }}
      >
        3-bed end of lease clean in Berwick?
      </motion.div>
    </div>
  );
}

function QuoteScene({ delay, reduce }: { delay: number; reduce: boolean }) {
  const lines = ["Upfront price", "Tue 9:00am booked"];
  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
      {lines.map((line, i) => (
        <motion.span
          key={line}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent-bg border border-brand-accent-border px-2.5 py-1 text-xs sm:text-[13px] font-medium text-brand-text"
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: reduce ? 0 : delay + 0.25 + i * 0.35, ease: EASE }}
        >
          <motion.span
            className="w-4 h-4 rounded-full bg-brand-accent text-white flex items-center justify-center"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 500, damping: 18, delay: reduce ? 0 : delay + 0.45 + i * 0.35 }}
          >
            <Check className="w-2.5 h-2.5" strokeWidth={3} />
          </motion.span>
          {line}
        </motion.span>
      ))}
    </div>
  );
}

function SparkleScene({ delay, reduce }: { delay: number; reduce: boolean }) {
  // Little burst of sparkles around the label
  const bursts = [
    { x: -6, y: -10, s: 0.7 },
    { x: 18, y: -14, s: 0.5 },
    { x: 34, y: 8, s: 0.6 },
  ];
  return (
    <div className="relative inline-flex">
      <motion.span
        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-accent to-brand px-3 py-1.5 text-xs sm:text-[13px] font-semibold text-white dark:text-[#0A1220] shadow-sm shadow-brand-accent/30"
        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 380, damping: 16, delay: reduce ? 0 : delay + 0.3 }}
      >
        <Sparkles className="w-3.5 h-3.5" /> Spotless, guaranteed
      </motion.span>
      {!reduce &&
        bursts.map((b, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute left-0 top-0 text-brand-accent"
            style={{ x: b.x, y: b.y }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: [0, 1, 0], scale: [0, b.s, 0], rotate: [0, 45, 90] }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + 0.55 + i * 0.12 }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.span>
        ))}
    </div>
  );
}

const SCENES = [ChatScene, QuoteScene, SparkleScene];

// ── Hand-drawn loopy arrows between steps ────────────────────────────────────
// Stroke draws itself (pathLength 0 → 1), then the arrowhead flicks on.

function DrawnArrow({
  d,
  head,
  viewBox,
  className,
  delay,
  reduce,
}: {
  d: string;
  head: string;
  viewBox: string;
  className: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <svg aria-hidden="true" viewBox={viewBox} fill="none" className={`text-brand-accent ${className}`}>
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ pathLength: { duration: 0.8, delay, ease: "easeInOut" }, opacity: { duration: 0.1, delay } }}
      />
      <motion.path
        d={head}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.2, delay: reduce ? 0 : delay + 0.75 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

// Vertical (phones): swoops down one side with a twirl, ending by the next icon.
const V_ARROW = {
  viewBox: "0 0 100 72",
  d: "M92 4 C 44 0, 12 18, 22 36 C 30 50, 52 42, 44 30 C 36 20, 16 40, 30 54 C 42 64, 62 66, 86 62",
  head: "M76 55 L87 62 L76 69",
};
// Horizontal (desktop): loops across to the next column.
const H_ARROW = {
  viewBox: "0 0 200 56",
  d: "M4 34 C 38 6, 78 4, 96 22 C 110 38, 86 48, 84 32 C 82 14, 132 6, 188 28",
  head: "M176 18 L189 29 L175 35",
};

// ── Section ──────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const reduce = !!useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * STEP_DELAY, ease: EASE } }),
  };

  return (
    <section className="bg-brand-surface py-10 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-7 sm:mb-10 lg:mb-14"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight tracking-tight">
            Sorted in <span className="text-brand">3 simple steps.</span>
          </h2>
        </motion.div>

        {/* ── Steps ── */}
        <ol className="relative grid grid-cols-1 lg:grid-cols-3 lg:gap-8 max-w-md mx-auto lg:max-w-none">
          {STEPS.map(({ icon: Icon, title, description, short }, index) => {
            const Scene = SCENES[index];
            const delay = index * STEP_DELAY;
            const hasNext = index < STEPS.length - 1;
            // Arrows alternate sides on phones, like a hand-drawn zigzag.
            const leftSide = index % 2 === 0;
            return (
              <li key={title} className="relative">
                <motion.div
                  className="flex flex-col items-center text-center gap-3"
                  custom={index}
                  variants={fadeUp}
                  initial={reduce ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  {/* Icon badge that pops in, with its step number */}
                  <motion.div
                    className="relative z-10 shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-brand-accent to-brand text-white dark:text-[#0A1220] shadow-lg shadow-brand-accent/30 flex items-center justify-center"
                    initial={reduce ? false : { scale: 0.6, rotate: -8 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 14, delay }}
                  >
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-text text-brand-surface border-2 border-brand-surface flex items-center justify-center text-[10px] font-bold leading-none">
                      {index + 1}
                    </span>
                  </motion.div>

                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-brand-text leading-snug">{title}</h3>
                    {/* The scene carries the message, so phones skip the text;
                        larger screens get one short line. The full description stays
                        in the page for screen readers and search engines. */}
                    <p className="hidden sm:block text-brand-muted text-sm leading-snug lg:max-w-xs">{short}</p>
                    <p className="sr-only">{description}</p>
                    <div className="mt-0.5 sm:mt-1" aria-hidden="true">
                      <Scene delay={delay} reduce={reduce} />
                    </div>
                  </div>
                </motion.div>

                {hasNext && (
                  <>
                    {/* Phones: arrow in the gap below, curling down one side */}
                    <div className="lg:hidden relative h-14 my-1">
                      <DrawnArrow
                        {...V_ARROW}
                        delay={delay + 0.45}
                        reduce={reduce}
                        className={`absolute top-0 w-[78px] h-14 ${leftSide ? "right-1/2 mr-3" : "left-1/2 ml-3 -scale-x-100"}`}
                      />
                    </div>
                    {/* Desktop: arrow looping across to the next column */}
                    <DrawnArrow
                      {...H_ARROW}
                      delay={delay + 0.45}
                      reduce={reduce}
                      className="hidden lg:block absolute top-0 left-[calc(50%+3rem)] w-[calc(100%-4rem)] max-w-[220px] h-14"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>

        {/* One-line nudge instead of a button row: the hero, navbar and the price
            strip right after this already carry the Quote / Book buttons. */}
        <p className="text-center text-brand-muted text-sm mt-6 lg:mt-10">
          Ready for step 1?{" "}
          <Link href={ROUTES.QUOTE} className="inline-flex items-center gap-1 text-brand-accent-dark font-semibold hover:underline underline-offset-2">
            Get a free quote <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>

      </div>
    </section>
  );
}
