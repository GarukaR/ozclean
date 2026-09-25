"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, CheckCircle2, Info, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { SERVICE_AREAS } from "@/lib/seo";
import { ALL_SERVICE_AREAS, searchServiceAreas, type ServiceArea } from "@/lib/service-areas";

// "Do we service your area?" — type a suburb or postcode and get an instant
// answer instead of scanning a 40-suburb list. The full list stays in the
// HTML (collapsed) so the suburb names are still there for search engines.
// "Berwick", "Narre Warren & Narre Warren South", "Cranbourne, Cranbourne North and 3 more"
function formatAreaNames(areas: ServiceArea[]) {
  const names = areas.map((a) => a.name);
  if (names.length <= 2) return names.join(" & ");
  return `${names.slice(0, 2).join(", ")} and ${names.length - 2} more`;
}

export default function AreaChecker({
  showAllAreas = true,
  centerOnMobile = false,
}: {
  showAllAreas?: boolean;
  // Centre the "See all areas" link on phones, for layouts whose heading is centred there.
  centerOnMobile?: boolean;
}) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const result = useMemo(() => searchServiceAreas(query), [query]);

  const pick = (area: ServiceArea) => setQuery(area.name);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Search box ── */}
      <label htmlFor={inputId} className="sr-only">
        Enter your suburb or postcode
      </label>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted pointer-events-none" />
        <input
          id={inputId}
          type="text"
          inputMode="search"
          autoComplete="address-level2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your suburb or postcode"
          className="w-full h-14 rounded-2xl border border-brand-border bg-brand-surface pl-12 pr-4 text-base text-brand-text placeholder:text-brand-muted shadow-sm focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 transition"
        />
      </div>

      {/* ── Result (announced to screen readers as it changes) ── */}
      <div aria-live="polite" className="min-h-0">
        {result.kind === "match" && (
          <div className="rounded-2xl border border-brand-accent-border bg-brand-accent-bg p-5 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-brand-accent-dark shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-brand-text">
                  Yes, we clean in {formatAreaNames(result.areas)} ({result.areas[0].postcode}).
                </p>
                {result.areas.some((a) => a.travelCharge) && (
                  <p className="text-sm text-brand-muted mt-1">
                    A small travel charge applies in this area. We&apos;ll include it in your quote.
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-1.5">
                <Link href={ROUTES.QUOTE}>
                  Get a Free Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold">
                <Link href={ROUTES.BOOKING}>Book a Home Clean</Link>
              </Button>
            </div>
          </div>
        )}

        {result.kind === "suggestions" && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-brand-muted">Did you mean:</p>
            <div className="flex flex-wrap gap-2">
              {result.areas.map((area) => (
                <button
                  key={area.name}
                  type="button"
                  onClick={() => pick(area)}
                  className="rounded-full border border-brand-border bg-brand-surface px-3.5 py-2 text-sm font-medium text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
                >
                  {area.name} <span className="text-brand-muted">{area.postcode}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {result.kind === "none" && (
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-brand-muted shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-brand-text">&ldquo;{result.query}&rdquo; isn&apos;t on our regular list yet.</p>
                <p className="text-sm text-brand-muted mt-1">
                  Get in touch anyway. We sometimes travel further for larger or regular jobs.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-fit border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold gap-1.5">
              <Link href={ROUTES.CONTACT}>
                Ask about your area <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* ── Popular areas (quick picks) ── */}
      {result.kind === "empty" && (
        // Quick picks are a desktop nicety; on phones typing is quicker than scanning chips.
        <div className="hidden sm:flex flex-wrap items-center gap-2">
          <span className="text-sm text-brand-muted mr-1">Popular:</span>
          {SERVICE_AREAS.slice(0, 6).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setQuery(name)}
              className="rounded-full border border-brand-border bg-brand-surface px-3 py-1.5 text-xs font-medium text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* ── Full list, collapsed ── */}
      {showAllAreas && (
        <details className={`group text-sm ${centerOnMobile ? "text-center lg:text-left" : ""}`}>
          <summary className="cursor-pointer list-none inline-flex items-center gap-1.5 font-semibold text-brand-accent-dark hover:underline underline-offset-2">
            <MapPin className="w-4 h-4" />
            See all {ALL_SERVICE_AREAS.length} areas we cover
          </summary>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-brand-text text-left">
            {ALL_SERVICE_AREAS.map((area) => (
              <li key={area.name} className="flex items-baseline gap-1.5">
                <span>{area.name}</span>
                <span className="text-xs text-brand-muted">{area.postcode}</span>
                {area.travelCharge && <span className="text-xs text-brand-muted">*</span>}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-brand-muted text-left">* Travel charge applies.</p>
        </details>
      )}
    </div>
  );
}
