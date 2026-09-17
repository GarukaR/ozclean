"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { ROUTES } from "@/lib/routes";

// Single real, checkable trust signal — same 4.75/100+ figure used in the
// Testimonials section, rather than a row of unverifiable adjective cards.
const RATING = { value: "4.75 / 5", label: "from 100+ reviews" };

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-fit bg-brand-bg overflow-hidden flex items-center">

      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-accent/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-28 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Content ── */}
          <motion.div
            className="flex flex-col gap-9 items-center md:items-start"
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={container}
          >

            {/* Eyebrow badge */}
            <motion.div variants={item} className="flex">
              <Badge
                className="bg-brand-accent-bg text-brand-accent-dark border-brand-accent-border font-medium px-3 py-1 text-xs tracking-wide uppercase gap-1.5"
                variant="outline"
              >
                <Sparkles className="w-3 h-3" />
                Airbnb Turnover &amp; Move-Out Specialists
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item} className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                A Spotless Space,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-brand-accent-dark">Every Time.</span>
                  {/* Underline accent */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 6C40 2 100 1 198 4"
                      stroke="var(--brand-accent)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.4"
                      initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                    />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p variants={item} className="text-brand-muted text-lg leading-relaxed max-w-md">
              Fast, reliable turnovers for <strong>Airbnb hosts</strong> and bond-back <strong>move-out cleans</strong>, plus commercial and residential cleaning across Hampton Park.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-brand hover:bg-brand-dark text-white font-semibold shadow-lg shadow-brand/25 hover:shadow-brand/40 transition-all duration-200 gap-2 px-6"
              >
                <Link href={ROUTES.BOOKING}>
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-brand-accent-border text-brand-accent-dark hover:bg-brand-accent-bg hover:border-brand-accent font-semibold px-6 transition-all duration-200"
              >
                <Link href={ROUTES.QUOTE}>Get a Free Quote</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right: Image + Floating Cards ── */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >

            {/* Main image container */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
              {/* Image frame with decorative border */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand/20 aspect-[4/5] bg-gradient-to-br from-brand/20 to-brand-accent/20">
                {/* Optimized image using next/image */}
                <Image
                  src="https://images.pexels.com/photos/6195131/pexels-photo-6195131.jpeg"
                  alt="Professional cleaner at work in a bright modern home"
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2E]/20 via-transparent to-brand-accent/10" />
              </div>

              {/* Decorative ring behind image */}
              <div className="absolute -inset-4 rounded-3xl border-2 border-brand-accent/20 -z-10" />

              {/* Rating card */}
              <motion.div
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
                className="absolute bottom-6 -left-5 sm:-left-8 bg-brand-surface rounded-xl shadow-lg shadow-brand-text/10 border border-brand-accent-border px-4 py-3 flex items-center gap-2.5"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="w-px h-6 bg-brand-border" />
                <div>
                  <p className="text-brand-text font-bold text-sm leading-none">{RATING.value}</p>
                  <p className="text-brand-muted text-xs mt-1">{RATING.label}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom wave transition ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 32C240 0 480 64 720 32C960 0 1200 64 1440 32V64H0V32Z"
            fill="var(--brand-bg)"
          />
        </svg>
      </div>

    </section>
  );
}