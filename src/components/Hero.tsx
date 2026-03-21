"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import CTA_banner from "./CTA_banner";

// ─── Trust badge data ─────────────────────────────────────────────────────────
// const TRUST_BADGES = [
//   {
//     icon: Star,
//     text: "4.75/5 rating",
//     sub: "from 500+ reviews",
//     filled: true,
//   },
//   {
//     icon: CalendarCheck,
//     text: "7+ years",
//     sub: "in business",
//     filled: false,
//   },
//   {
//     icon: ShieldCheck,
//     text: "100% guarantee",
//     sub: "or we re-clean free",
//     filled: false,
//   },
// ];

// ─── Floating stat cards that appear over the image ───────────────────────────
const STAT_CARDS = [
  {
    value: "500+",
    label: "Homes Cleaned",
    position: "top-6 -left-5 sm:-left-10",
    delay: "animation-delay-300",
  },
  {
    value: "⭐ 4.9",
    label: "Average Rating",
    position: "bottom-16 -left-5 sm:-left-10",
    delay: "animation-delay-500",
  },
  {
    value: "Same Day",
    label: "Booking Available",
    position: "top-1/2 -right-5 sm:-right-10 -translate-y-1/2",
    delay: "animation-delay-700",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-bg overflow-hidden flex items-center">

      {/* ── Background decorative blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-accent/10 blur-3xl" />
        
        {/* CTA Banner */}
        <CTA_banner />
        
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #0EA5E9 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-28 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="flex flex-col gap-7 animate-fade-in-up items-center md:items-start">

            {/* Eyebrow badge */}
            <div className="flex">
              <Badge
                className="bg-brand-accent-bg text-brand-accent-dark border-brand-accent-border font-medium px-3 py-1 text-xs tracking-wide uppercase gap-1.5"
                variant="outline"
              >
                <Sparkles className="w-3 h-3" />
                Professional Cleaning Services
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-2">
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
                    <path
                      d="M2 6C40 2 100 1 198 4"
                      stroke="#14B8A6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.4"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-brand-muted text-lg leading-relaxed max-w-md">
              Trusted commercial and residential cleaning for homes and businesses across Melbourne.
              We handle the mess — you enjoy the results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-brand hover:bg-brand-dark text-white font-semibold shadow-lg shadow-brand/25 hover:shadow-brand/40 transition-all duration-200 gap-2 px-6"
              >
                <Link href="/book">
                  Book a Clean
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-brand-accent-border text-brand-accent-dark hover:bg-brand-accent-bg hover:border-brand-accent font-semibold px-6 transition-all duration-200"
              >
                <Link href="/quote">Get a Free Quote</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            {/* <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
              {TRUST_BADGES.map(({ icon: Icon, text, sub, filled }) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <Icon
                      className={`w-4 h-4 ${filled ? "fill-brand text-brand" : "text-brand"}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-text leading-none">{text}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* ── Right: Image + Floating Cards ── */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Main image container */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
              {/* Image frame with decorative border */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand/20 aspect-[4/5] bg-gradient-to-br from-brand/20 to-brand-accent/20">
                {/* Optimized image using next/image */}
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                  alt="Professional cleaner at work in a bright modern home"
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/20 via-transparent to-brand-accent/10" />
              </div>

              {/* Decorative ring behind image */}
              <div className="absolute -inset-4 rounded-3xl border-2 border-brand-accent/20 -z-10" />
              <div className="absolute -inset-8 rounded-3xl border border-brand/8 -z-10" />

              {/* Floating Stat Cards */}
              {STAT_CARDS.map(({ value, label, position }) => (
                <div
                  key={label}
                  className={`absolute ${position} bg-white rounded-xl shadow-lg shadow-brand-text/10 border border-brand-accent-border px-4 py-3 min-w-[130px]`}
                >
                  <p className="text-brand-text font-bold text-sm leading-none">{value}</p>
                  <p className="text-brand-accent-dark text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

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
            fill="white"
          />
        </svg>
      </div>

    </section>
  );
}