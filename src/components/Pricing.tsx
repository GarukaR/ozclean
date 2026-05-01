"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Clock, Home, ChevronUp, ChevronDown, Tag, Users, Gift, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_PROMO_OFFERS } from "@/lib/services";
import { ROUTES } from "@/lib/routes";

type ApiServiceOption = {
  id: string;
  code: string;
  name: string;
  basePriceCents: number;
};

type ApiAddonOption = {
  id: string;
  code: string;
  name: string;
  priceCents: number;
};

const HOURLY_PERFECT_FOR =
  "Cleaning specific areas of your home, quick and flexible cleaning sessions.";

const HOURLY_MORE = `Our hourly service is time-based — your cleaner will perform any cleaning task you direct them to, working as efficiently as possible while maintaining quality. This is ideal if you need specific areas cleaned such as bathrooms, kitchen, or living areas. You provide the checklist or we can suggest one. Minimum booking is 2 hours.`;

const FLAT_PERFECT_FOR =
  "A full clean of your entire home. Our satisfaction guarantee applies.";

const FLAT_MORE = `The flat-rate option is perfect for having your entire home professionally cleaned from top to bottom. Pricing is based on the number of bedrooms in your home and our team will complete a full general clean following our detailed checklist. Additional services such as inside oven, fridge, and window cleaning can be added on. If your home hasn't had a deep or thorough clean in over a month, we recommend booking a deep clean first for the best results.`;

// ─────────────────────────────────────────────────────────────────────────────

const PROMO_ICONS = {
  sparkles: Sparkles,
  gift: Gift,
  users: Users,
  sun: Sun,
};

export default function Pricing() {
  const [hourlyOpen, setHourlyOpen] = useState(false);
  const [flatOpen, setFlatOpen]     = useState(false);
  const [services, setServices] = useState<ApiServiceOption[]>([]);
  const [addons, setAddons] = useState<ApiAddonOption[]>([]);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadCatalog() {
      setCatalogError(null);
      try {
        const [servicesRes, addonsRes] = await Promise.all([
          fetch("/api/services", { cache: "no-store" }),
          fetch("/api/addons", { cache: "no-store" }),
        ]);

        if (!servicesRes.ok || !addonsRes.ok) {
          throw new Error("Unable to load pricing data");
        }

        const [servicesData, addonsData] = await Promise.all([
          servicesRes.json() as Promise<{ services?: ApiServiceOption[] }>,
          addonsRes.json() as Promise<{ addons?: ApiAddonOption[] }>,
        ]);

        if (!mounted) return;
        setServices(servicesData.services ?? []);
        setAddons(addonsData.addons ?? []);
      } catch (error) {
        console.error("[Pricing] Failed to load pricing catalog:", error);
        if (!mounted) return;
        setCatalogError("Live pricing is temporarily unavailable. Please refresh shortly.");
      }
    }

    void loadCatalog();
    return () => {
      mounted = false;
    };
  }, []);

  const { hourlyRates, flatRates } = useMemo(() => {
    const hourly = services
      .filter((service) => service.code.includes("/hr"))
      .map((service) => {
        const label = service.name.replace("Hourly Cleaning", "").replace(/[()]/g, "").trim() || service.name;
        const price = `$${(service.basePriceCents / 100).toFixed(0)}/hr`;
        return { label, price };
      });

    const flat = services
      .filter((service) => !service.code.includes("/session"))
      .map((service) => ({
        label: service.name.replace("Apartment/House Cleaning", "").trim(),
        price: `$${(service.basePriceCents / 100).toFixed(0)}`,
      }));

    return { hourlyRates: hourly, flatRates: flat };
  }, [services]);

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
                <h3 className="text-xl font-bold text-brand-text">Hourly Cleaning</h3>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">
                Charged by the hour. Your cleaner follows tasks you provide or our standard
                checklist — giving you full control. Minimum 2 hours.
              </p>
            </div>

            {/* Rate grid */}
            <div className="grid grid-cols-2 gap-px bg-brand-border flex-1">
              {hourlyRates.map(({ label, price }) => (
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
            <div className="mx-6 my-5 rounded-xl bg-brand-bg border border-brand-border px-4 py-3">
              <p className="text-xs font-bold text-brand uppercase tracking-wide mb-1">
                Perfect For
              </p>
              <p className="text-sm text-brand-text leading-relaxed">{HOURLY_PERFECT_FOR}</p>
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
                <Link href={ROUTES.BOOKING}>Book Now</Link>
              </Button>
            </div>
          </div>

          {/* ── Flat Rate Panel ── */}
          <div className="rounded-2xl border border-brand-accent-border bg-white flex flex-col overflow-hidden shadow-sm shadow-brand-accent/10">
            {/* Panel header */}
            <div className="px-7 pt-7 pb-5 border-b border-brand-accent-border bg-brand-accent-bg/40">
              <div className="flex items-center gap-2 mb-3">
                <Home className="w-5 h-5 text-brand-accent" />
                <h3 className="text-xl font-bold text-brand-text">Flat-Rate Cleaning</h3>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">
                Your cleaner follows our full checklist covering all aspects of general cleaning
                to SparkClean standards — no surprises on the price.
              </p>
            </div>

            {/* Price grid */}
            <div className="grid grid-cols-2 gap-px bg-brand-accent-border flex-1">
              {flatRates.map(({ label, price }, i) => {
                // 5 bed spans full width on last odd item
                const isLast = i === flatRates.length - 1;
                const isOdd  = flatRates.length % 2 !== 0;
                return (
                  <div
                    key={label}
                    className={`bg-white px-6 py-5 flex flex-col gap-1
                      ${isLast && isOdd ? "col-span-2" : ""}`}
                  >
                    <p className="text-sm text-brand-muted">{label}</p>
                    <p className="text-3xl font-black text-brand-accent-dark">{price}</p>
                  </div>
                );
              })}
            </div>

            {/* Perfect for */}
            <div className="mx-6 my-5 rounded-xl bg-brand-accent-bg border border-brand-accent-border px-4 py-3">
              <p className="text-xs font-bold text-brand-accent-dark uppercase tracking-wide mb-1">
                Perfect For
              </p>
              <p className="text-sm text-brand-text leading-relaxed">{FLAT_PERFECT_FOR}</p>
            </div>

            {/* Read more toggle */}
            <div className="px-6 pb-2">
              <button
                onClick={() => setFlatOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm text-brand-accent-dark font-semibold hover:underline underline-offset-2 mb-3"
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
                className="w-full bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold h-11 shadow-md shadow-brand-accent/20"
              >
                <Link href={ROUTES.BOOKING}>Book Now</Link>
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
            {addons.map(({ id, name, priceCents }) => (
              <div
                key={id}
                className="bg-brand-bg border border-brand-border rounded-xl px-4 py-3 flex items-center justify-between gap-2 hover:border-brand/40 transition-colors"
              >
                <span className="text-sm text-brand-text">{name}</span>
                <span className="text-sm font-bold text-brand shrink-0">+${(priceCents / 100).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-muted mt-3">
            Add-ons can be selected when booking online or mentioned when requesting a quote.
          </p>
          {catalogError && (
            <p className="text-xs text-red-600 mt-2">{catalogError}</p>
          )}
        </div>

      </div>
    </section>
  );
}