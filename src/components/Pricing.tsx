"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Home, ChevronUp, ChevronDown, Tag, Users, Gift, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Hourly rates ─────────────────────────────────────────────────────────────
const HOURLY_RATES = [
  { label: "One-off",     price: "$60/hr" },
  { label: "Weekly",      price: "$50/hr" },
  { label: "Fortnightly", price: "$55/hr" },
  { label: "Monthly",     price: "$55/hr" },
];

const HOURLY_PERFECT_FOR =
  "Cleaning specific areas of your home, quick and flexible cleaning sessions.";

const HOURLY_MORE = `Our hourly service is time-based — your cleaner will perform any cleaning task you direct them to, working as efficiently as possible while maintaining quality. This is ideal if you need specific areas cleaned such as bathrooms, kitchen, or living areas. You provide the checklist or we can suggest one. Minimum booking is 2 hours.`;

// ─── Flat rate prices ─────────────────────────────────────────────────────────
const FLAT_RATES = [
  { label: "1 bedroom", price: "$150" },
  { label: "2 bedrooms", price: "$175" },
  { label: "3 bedrooms", price: "$205" },
  { label: "3 bedrooms - 2 storey", price: "$220" },
  { label: "4 bedrooms", price: "$250" },
  { label: "4 bedrooms - 2 storey", price: "$280" },
];

const FLAT_PERFECT_FOR =
  "A full clean of your entire home. Our satisfaction guarantee applies.";

const FLAT_MORE = `The flat-rate option is perfect for having your entire home professionally cleaned from top to bottom. Pricing is based on the number of bedrooms in your home and our team will complete a full general clean following our detailed checklist. Additional services such as inside oven, fridge, and window cleaning can be added on. If your home hasn't had a deep or thorough clean in over a month, we recommend booking a deep clean first for the best results.`;

// ─── Add-ons ──────────────────────────────────────────────────────────────────
const ADD_ONS = [
  { label: "Inside oven",            price: "+$45" },
  { label: "Inside fridge",          price: "+$35" },
  { label: "Interior windows",       price: "+$60" },
  { label: "Exterior windows",       price: "+$80" },
  { label: "Balcony / outdoor area", price: "+$50" },
  { label: "Garage",                 price: "+$65" },
  { label: "Flyscreen cleaning",     price: "+$40" },
  { label: "Carpet steam clean",     price: "From $80" },
];

// ─── Promos ───────────────────────────────────────────────────────────────────
const PROMOS = [
  {
    icon: Sparkles,
    label: "First Clean",
    deal: "20% off",
    description: "New customers get 20% off their first booking.",
    code: "FIRST20",
    color: "bg-brand/10 text-brand border-brand/20",
    iconBg: "bg-brand/15",
  },
  {
    icon: Gift,
    label: "Bundle Deal",
    deal: "Book 3, Get 1 Free",
    description: "Book any 3 cleans and get the 4th completely free.",
    code: "BUNDLE4",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Users,
    label: "Referral",
    deal: "$30 credit",
    description: "Refer a friend — both of you get $30 off your next clean.",
    code: "REFER30",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    iconBg: "bg-violet-100",
  },
  {
    icon: Sun,
    label: "Spring Special",
    deal: "15% off deep cleans",
    description: "Book a deep clean this spring and save 15%. Limited slots.",
    code: "SPRING15",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [hourlyOpen, setHourlyOpen] = useState(false);
  const [flatOpen, setFlatOpen]     = useState(false);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Affordable general cleaning prices{" "}
            <span className="text-brand">made simple.</span>
          </h2>
          <p className="mt-4 text-brand-muted text-base leading-relaxed max-w-xl mx-auto">
            <strong>Get flexible prices of general house/apt cleaning service</strong> — know exactly what you&apos;re paying for.
            Both hourly and flat-rate options available so you can pick what works best for you.
          </p>
        </div>

        {/* ── Two panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          {/* ── Hourly Panel ── */}
          <div className="rounded-2xl border border-brand-border bg-white flex flex-col overflow-hidden">
            {/* Panel header */}
            <div className="px-7 pt-7 pb-5 border-b border-brand-border">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-brand" />
                <h3 className="text-xl font-bold text-brand-text">Hourly House Cleaning</h3>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">
                Charged by the hour. Your cleaner follows tasks you provide or our standard
                checklist — giving you full control. Minimum 2 hours.
              </p>
            </div>

            {/* Rate grid */}
            <div className="grid grid-cols-2 gap-px bg-brand-border flex-1">
              {HOURLY_RATES.map(({ label, price }) => (
                <div
                  key={label}
                  className="bg-white px-6 py-5 flex flex-col gap-1"
                >
                  <p className="text-sm text-brand-muted">{label}</p>
                  <p className="text-3xl font-black text-brand-text">{price}</p>
                </div>
              ))}
            </div>

            {/* Perfect for */}
            <div className="mx-6 my-5 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">
                Perfect For
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">{HOURLY_PERFECT_FOR}</p>
            </div>

            {/* Read more toggle */}
            <div className="px-6 pb-2">
              <button
                onClick={() => setHourlyOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline underline-offset-2 mb-3"
              >
                {hourlyOpen ? "Read less" : "Read more"}
                {hourlyOpen
                  ? <ChevronUp className="w-3.5 h-3.5" />
                  : <ChevronDown className="w-3.5 h-3.5" />
                }
              </button>
              {hourlyOpen && (
                <p className="text-sm text-brand-muted leading-relaxed mb-4">
                  {HOURLY_MORE}
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="px-6 pb-7 mt-auto">
              <Button
                asChild
                className="w-full bg-brand hover:bg-brand-dark text-white font-semibold h-11 shadow-md shadow-brand/20"
              >
                <Link href="/quote">Get a Quote</Link>
              </Button>
            </div>
          </div>

          {/* ── Flat Rate Panel ── */}
          <div className="rounded-2xl border border-emerald-200 bg-white flex flex-col overflow-hidden">
            {/* Panel header */}
            <div className="px-7 pt-7 pb-5 border-b border-emerald-100">
              <div className="flex items-center gap-2 mb-3">
                <Home className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-bold text-brand-text">Flat-Rate House Cleaning</h3>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">
                Your cleaner follows our full checklist covering all aspects of general cleaning
                to SparkClean standards — no surprises on the price.
              </p>
            </div>

            {/* Price grid */}
            <div className="grid grid-cols-2 gap-px bg-emerald-100 flex-1">
              {FLAT_RATES.map(({ label, price }, i) => {
                // 5 bed spans full width on last odd item
                const isLast = i === FLAT_RATES.length - 1;
                const isOdd  = FLAT_RATES.length % 2 !== 0;
                return (
                  <div
                    key={label}
                    className={`bg-white px-6 py-5 flex flex-col gap-1
                      ${isLast && isOdd ? "col-span-2" : ""}`}
                  >
                    <p className="text-sm text-brand-muted">{label}</p>
                    <p className="text-3xl font-black text-emerald-600">{price}</p>
                  </div>
                );
              })}
            </div>

            {/* Perfect for */}
            <div className="mx-6 my-5 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">
                Perfect For
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">{FLAT_PERFECT_FOR}</p>
            </div>

            {/* Read more toggle */}
            <div className="px-6 pb-2">
              <button
                onClick={() => setFlatOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm text-emerald-600 font-semibold hover:underline underline-offset-2 mb-3"
              >
                {flatOpen ? "Read less" : "Read more"}
                {flatOpen
                  ? <ChevronUp className="w-3.5 h-3.5" />
                  : <ChevronDown className="w-3.5 h-3.5" />
                }
              </button>
              {flatOpen && (
                <p className="text-sm text-brand-muted leading-relaxed mb-4">
                  {FLAT_MORE}
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="px-6 pb-7 mt-auto">
              <Button
                asChild
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 shadow-md shadow-emerald-600/20"
              >
                <Link href="/quote">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Add-ons ── */}
        <div className="mb-14">
          <p className="text-sm font-bold text-brand-text uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-brand rounded-full inline-block" />
            Optional Add-ons
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ADD_ONS.map(({ label, price }) => (
              <div
                key={label}
                className="bg-brand-bg border border-brand-border rounded-xl px-4 py-3 flex items-center justify-between gap-2 hover:border-brand/40 transition-colors"
              >
                <span className="text-sm text-brand-text">{label}</span>
                <span className="text-sm font-bold text-brand shrink-0">{price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-muted mt-3">
            Add-ons can be selected when booking online or mentioned when requesting a quote.
          </p>
        </div>

        {/* ── Promos ── */}
        <div>
          <p className="text-sm font-bold text-brand-text uppercase tracking-widest mb-5 flex items-center gap-2">
            <Tag className="w-4 h-4 text-brand" />
            Current Offers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMOS.map(({ icon: Icon, label, deal, description, code, color, iconBg }) => (
              <div
                key={code}
                className={`rounded-2xl border p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200 ${color}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{label}</span>
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight">{deal}</p>
                  <p className="text-xs opacity-75 leading-relaxed mt-1">{description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-current/10 pt-3">
                  <code className="text-xs font-mono font-bold tracking-widest opacity-80 bg-white/40 px-2 py-1 rounded-md">
                    {code}
                  </code>
                  <Link
                    href="/book"
                    className="text-xs font-semibold hover:underline underline-offset-2 opacity-90"
                  >
                    Claim →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}