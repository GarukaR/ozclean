"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
import { BUSINESS_PHONE, BUSINESS_PHONE_HREF } from "@/lib/business";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

// ─── Nav links config — edit here to add/remove links ────────────────────────
const NAV_LINKS = [
  { label: "Services", href: ROUTES.SERVICES },
  { label: "About", href: ROUTES.ABOUT },
  { label: "Contact", href: ROUTES.CONTACT },
];

// Mobile menu shows six popular services as tiles plus "All services", not
// the whole 13-item catalogue (which made the drawer longer than the screen).
// Light version of the Why Us tile styling: the two specialties are solid,
// the rest softly tinted, so the menu stays quick to scan.
const TILE_TONES = {
  // Ink text in dark mode, where the accent becomes bright mint.
  solid: { tile: "bg-gradient-to-br from-brand-accent to-brand-accent-dark border-transparent", chip: "bg-white/20 dark:bg-black/10", icon: "text-white dark:text-[#0A1220]", label: "text-white dark:text-[#0A1220]" },
  blue: { tile: "bg-brand/10 border-brand/15", chip: "bg-brand-surface", icon: "text-brand", label: "text-brand-text" },
  teal: { tile: "bg-brand-accent-bg border-brand-accent-border", chip: "bg-brand-surface", icon: "text-brand-accent-dark", label: "text-brand-text" },
} as const;

const POPULAR_SERVICES = (
  [
    { slug: "airbnb", label: "Airbnb", tone: "solid" },
    { slug: "move", label: "End of Lease", tone: "solid" },
    { slug: "residential", label: "House Cleaning", tone: "blue" },
    { slug: "commercial", label: "Office", tone: "teal" },
    { slug: "strata-cleaning", label: "Strata", tone: "teal" },
    { slug: "carpet-cleaning", label: "Carpet & Couch", tone: "blue" },
  ] as const
).map(({ slug, label, tone }) => ({ label, href: `${ROUTES.SERVICES}/${slug}`, icon: SERVICES[slug].icon, tone: TILE_TONES[tone] }));

const MOBILE_PAGE_LINKS = [
  { label: "About", href: ROUTES.ABOUT },
  { label: "Contact", href: ROUTES.CONTACT },
  { label: "FAQ", href: "/faq" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    onScroll(); // Check scroll position on mount

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // z-60 keeps the pill stacked above the mobile Sheet's overlay/content
    // (both z-40, see SheetOverlay/SheetContent className overrides below)
    // so the drawer appears to slide out from underneath the pill instead
    // of its corner overlapping and covering it.
    <header className="fixed top-0 left-0 right-0 z-[60] px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`
          pointer-events-auto max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 grid grid-cols-3 items-center
          rounded-full border transition-all duration-500
          ${scrolled || open
            // Liquid glass: a translucent, blurred material — not a solid
            // brand-colored card — so it reads as frosted glass sitting
            // over whatever scrolls beneath it, the way iOS/macOS chrome
            // does. White tint in light mode, dark tint in dark mode.
            // Also applied while the mobile drawer is open — the drawer sits
            // just behind this pill (z-40 vs z-60), so an opaque/glass pill
            // is what actually masks it; a transparent pill would let the
            // drawer's own panel bleed through right behind the logo/links.
            ? "bg-white/70 dark:bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 border-white/60 dark:border-white/10 shadow-lg shadow-black/10"
            // At rest: no card at all — logo/links sit directly on the
            // page background so the strip behind the nav blends seamlessly
            // into the hero instead of floating a visible pill on top of it.
            : "bg-transparent border-transparent shadow-none"
          }
        `}
      >

        {/* ── Logo ── */}
        <Logo className="justify-self-start" />

        {/* ── Desktop Nav (hidden on mobile) — centered ── */}
        {/* Plain links, not shadcn's NavigationMenu — its default trigger
            style bakes in a bg-background pill that reads as a button
            floating over the navbar. An underline affordance keeps these
            visibly clickable while staying flush with the navbar itself. */}
        <nav className="hidden md:flex items-center gap-8 justify-self-center">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={label}
                href={href}
                className={`
                  relative py-2 text-sm transition-colors
                  after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand after:transition-transform after:duration-300 after:origin-left
                  ${active
                    ? "text-brand font-semibold after:scale-x-100"
                    : "font-medium text-brand-text/80 hover:text-brand after:scale-x-0 hover:after:scale-x-100"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop CTAs ── */}
        <div className="hidden md:flex items-center gap-3 justify-self-end">
          <ThemeToggle />
          <Button asChild className="bg-brand-accent hover:bg-brand-accent-dark text-white shadow-sm shadow-brand-accent/25">
            <Link href={ROUTES.QUOTE}>Get a Free Quote</Link>
          </Button>
          <Button asChild className="bg-brand-text hover:bg-brand-text/90 text-brand-bg shadow-sm shadow-brand-text/20">
            <Link href={ROUTES.BOOKING}>Book Now</Link>
          </Button>
        </div>

        {/* ── Mobile: theme toggle + Menu (Sheet) — hidden on desktop ── */}
        <div className="flex md:hidden items-center gap-2 justify-self-end col-start-3">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            {/* One button drives both states: it doubles as the drawer's
                close control (via SheetTrigger, which toggles the open
                Sheet), so there's no separate X inside the panel. */}
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span className="relative w-5 h-5 block">
                  <Menu
                    className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                      open ? "opacity-0 rotate-45 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                      open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-75"
                    }`}
                  />
                </span>
              </Button>
            </SheetTrigger>

          <SheetContent
            side="right"
            // Wide enough for a 2-column tile grid while still leaving a
            // slice of the page visible beside it.
            className="w-[82%] max-w-[360px] p-0"
            showCloseButton={false}
          >
            {/* Required for accessibility */}
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Top padding clears the floating navbar pill, which sits
                above this drawer (z-60 vs z-40). The middle scrolls on short
                screens; the CTAs stay pinned at the bottom. */}
            <div className="flex flex-col h-full pt-20 sm:pt-24">
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-4">

                {/* Popular services */}
                <div className="flex items-center justify-between mb-2 px-1">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-muted">Popular services</p>
                  <SheetClose asChild>
                    <Link href={ROUTES.SERVICES} className="text-xs font-semibold text-brand-accent-dark hover:underline underline-offset-2">
                      All services →
                    </Link>
                  </SheetClose>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {POPULAR_SERVICES.map(({ label, href, icon: Icon, tone }) => {
                    const active = pathname === href;
                    return (
                      <SheetClose asChild key={href}>
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          className={`flex flex-col gap-2 rounded-2xl border px-3 py-3 transition-transform active:scale-[0.97] ${tone.tile} ${
                            active ? "ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-surface" : ""
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${tone.chip}`}>
                            <Icon className={`w-4 h-4 ${tone.icon}`} />
                          </span>
                          <span className={`text-sm font-bold leading-tight ${tone.label}`}>{label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>

                {/* Other pages */}
                <nav className="mt-5 flex flex-col border-t border-brand-border">
                  {MOBILE_PAGE_LINKS.map(({ label, href }) => {
                    const active = pathname === href;
                    return (
                      <SheetClose asChild key={href}>
                        <Link
                          href={href}
                          className={`flex items-center justify-between px-1 py-3.5 border-b border-brand-border text-sm font-semibold transition-colors ${
                            active ? "text-brand" : "text-brand-text hover:text-brand"
                          }`}
                        >
                          {label}
                          <ChevronRight className="w-4 h-4 text-brand-muted" />
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Call card */}
                <a
                  href={BUSINESS_PHONE_HREF}
                  className="mt-5 flex items-center gap-3 rounded-xl border border-brand-border bg-brand-bg px-4 py-3 transition-colors hover:border-brand-accent"
                >
                  <span className="w-9 h-9 rounded-full bg-brand-accent-bg flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-brand-accent-dark" />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">Call us</span>
                    <span className="text-sm font-semibold text-brand-text truncate">{BUSINESS_PHONE}</span>
                  </span>
                </a>
              </div>

              {/* Pinned CTAs */}
              <div className="p-4 border-t border-brand-border flex flex-col gap-2">
                <SheetClose asChild>
                  <Button asChild className="w-full bg-brand-accent hover:bg-brand-accent-dark text-white shadow-sm shadow-brand-accent/25">
                    <Link href={ROUTES.QUOTE}>Get a Free Quote</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="outline" className="w-full border-brand-accent-border text-brand-text">
                    <Link href={ROUTES.BOOKING}>Book a Home Clean</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}