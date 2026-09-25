"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-brand-bg pt-2 pb-8 sm:pb-10">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        {/* ── "Lens capsule": photo held in an oversized rounded shape ──
            Taller than the original cut, so the hero carries more visual
            weight and the page doesn't need a big empty gap afterward to
            feel intentional before Specialties starts. */}
        <motion.div
          className="relative h-[440px] sm:h-[520px] md:h-[600px] rounded-[60px] md:rounded-[260px] overflow-hidden bg-brand-text"
          initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <Image
            src="https://images.pexels.com/photos/6195131/pexels-photo-6195131.jpeg"
            alt="Professional cleaner at work in a bright modern home"
            fill
            priority
            className="object-cover"
          />

          {/* Spotlight vignette centered on the copy, layered under the
              usual top-to-bottom scrim — boosts contrast behind the text
              without darkening the whole photo. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(56% 46% at 50% 52%, rgba(6,13,24,0.5) 0%, rgba(6,13,24,0) 72%), linear-gradient(180deg, rgba(6,13,24,0.28) 0%, rgba(6,13,24,0.1) 30%, rgba(6,13,24,0.5) 100%)",
            }}
          />

          {/* ── Content ── */}
          <motion.div
            className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-5 px-6 sm:px-12"
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={container}
          >
            {/* Keyword-led <h1> for search; the big serif line below is display copy. */}
            <motion.h1 variants={item}>
              <Badge
                className="bg-white/10 text-white border-white/25 font-medium px-3 py-1 text-xs tracking-wide uppercase backdrop-blur-sm whitespace-normal text-center"
                variant="outline"
              >
                Airbnb &amp; End of Lease Cleaning · South East Melbourne
              </Badge>
            </motion.h1>

            <motion.p
              variants={item}
              className="font-[family-name:var(--font-libre-caslon-display)] font-normal text-white leading-[1.1] text-3xl sm:text-4xl md:text-5xl text-balance"
            >
              A Spotless Space,
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 italic px-1">Every Time.</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-[6%] -inset-x-[6%] bg-brand-accent rounded-lg -z-0"
                  style={{ transformOrigin: "left center" }}
                  initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.55, delay: 0.75, ease: [0.65, 0, 0.35, 1] }}
                />
              </span>
            </motion.p>

            <motion.p variants={item} className="text-white/85 text-base sm:text-lg leading-relaxed max-w-md">
              Fast Airbnb turnovers and bond-back move-out cleans across Melbourne.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mt-1">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold shadow-lg shadow-black/20 gap-2 px-6"
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
                className="rounded-full bg-white/5 hover:bg-white/15 text-white border-white/40 font-semibold px-6 backdrop-blur-sm"
              >
                <Link href={ROUTES.QUOTE}>Get a Free Quote</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
