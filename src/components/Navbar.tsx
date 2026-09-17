"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
import { BUSINESS_PHONE, BUSINESS_PHONE_HREF } from "@/lib/business";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Nav links config — edit here to add/remove links ────────────────────────
const NAV_LINKS = [
  { label: "Services", href: ROUTES.SERVICES },
  { label: "About", href: ROUTES.ABOUT },
  { label: "Contact", href: ROUTES.CONTACT },
];

const SERVICE_LINKS = Object.values(SERVICES).map(({ slug, title }) => ({
  slug,
  label: title,
  href: `${ROUTES.SERVICES}/${slug}`,
}));

// Airbnb turnovers and Move In/Out are the two services OzClean is built
// around — group them together in the mobile menu so that framing carries
// through the nav, not just the homepage.
const SPECIALTY_SLUGS = new Set(["airbnb", "move"]);

const GROUPED_SERVICE_LINKS = {
  specialty: SERVICE_LINKS.filter((service) => SPECIALTY_SLUGS.has(service.slug)),
  home: SERVICE_LINKS.filter((service) => !SPECIALTY_SLUGS.has(service.slug)),
};
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isServicesPath = pathname === ROUTES.SERVICES || pathname.startsWith(`${ROUTES.SERVICES}/`);

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
            // Narrower than the shadcn default so a visible slice of the
            // page — including the logo, which stays on the pill above —
            // always remains in view instead of the drawer swallowing most
            // of the screen. Capped both ends: min-width keeps the
            // accordion's longer service names from wrapping awkwardly on
            // small phones, max-width stops it stretching too wide on
            // larger ones.
            className="w-[66%] min-w-[248px] max-w-[320px] p-0"
            showCloseButton={false}
          >
            {/* Required for accessibility */}
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Top padding clears the floating navbar pill, which sits
                above this drawer (z-60 vs z-40) rather than a logo header
                repeated inside the drawer itself. */}
            <div className="flex flex-col h-full pt-24 sm:pt-28">
              {/* Mobile Links */}
              <nav className="flex flex-col gap-1 px-4 pb-2">
                {NAV_LINKS.map(({ label, href }) => (
                  label === "Services" ? (
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue={isServicesPath ? "mobile-services" : undefined}
                      key={label}
                      className="px-1"
                    >
                      <AccordionItem value="mobile-services" className="border-0">
                        <AccordionTrigger
                          className={`
                            px-3 py-3 rounded-lg text-sm font-semibold no-underline hover:no-underline
                            ${(pathname === href || pathname.startsWith(href + "/"))
                              ? "bg-brand/10 text-brand"
                              : "text-brand-text hover:text-brand hover:bg-brand/5"
                            }
                          `}
                        >
                          Services
                        </AccordionTrigger>
                        <AccordionContent className="pb-1">
                          <div className="mt-1 ml-2 pl-3 border-l border-brand/15 flex flex-col gap-2">
                            <SheetClose asChild>
                              <Link
                                href={ROUTES.SERVICES}
                                className={`
                                  px-3 py-2 rounded-md text-sm transition-colors
                                  ${pathname === ROUTES.SERVICES
                                    ? "bg-brand/10 text-brand font-semibold"
                                    : "text-brand-text/90 hover:text-brand hover:bg-brand/5"
                                  }
                                `}
                              >
                                All services
                              </Link>
                            </SheetClose>

                            <div className="mt-1 px-3">
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand/70">
                                Our Specialties
                              </p>
                              <div className="mt-1 flex flex-col gap-1">
                                {GROUPED_SERVICE_LINKS.specialty.map(({ label: serviceLabel, href: serviceHref }) => (
                                  <SheetClose asChild key={serviceHref}>
                                    <Link
                                      href={serviceHref}
                                      className={`
                                        px-3 py-2 rounded-md text-sm transition-colors
                                        ${(pathname === serviceHref || pathname.startsWith(serviceHref + "/"))
                                          ? "bg-brand/10 text-brand font-semibold"
                                          : "text-brand-text/90 hover:text-brand hover:bg-brand/5"
                                        }
                                      `}
                                    >
                                      {serviceLabel}
                                    </Link>
                                  </SheetClose>
                                ))}
                              </div>
                            </div>

                            <div className="mt-1 px-3">
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand/70">
                                Other Services
                              </p>
                              <div className="mt-1 flex flex-col gap-1">
                                {GROUPED_SERVICE_LINKS.home.map(({ label: serviceLabel, href: serviceHref }) => (
                                  <SheetClose asChild key={serviceHref}>
                                    <Link
                                      href={serviceHref}
                                      className={`
                                        px-3 py-2 rounded-md text-sm transition-colors
                                        ${(pathname === serviceHref || pathname.startsWith(serviceHref + "/"))
                                          ? "bg-brand/10 text-brand font-semibold"
                                          : "text-brand-text/90 hover:text-brand hover:bg-brand/5"
                                        }
                                      `}
                                    >
                                      {serviceLabel}
                                    </Link>
                                  </SheetClose>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <SheetClose asChild key={label}>
                      <Link
                        href={href}
                        className={`
                          px-4 py-3 rounded-lg text-sm font-medium transition-colors
                          ${pathname === href || pathname.startsWith(href + "/")
                            ? "bg-brand/10 text-brand font-semibold"
                            : "text-brand-text hover:text-brand hover:bg-brand/5"
                          }
                        `}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  )
                ))}
              </nav>

              {/* Fills what used to be dead space below a short link list
                  with content a visitor actually wants mid-decision: a
                  direct call option instead of an empty void before the
                  CTAs. */}
              <div className="flex-1 flex flex-col justify-end px-4 py-4">
                <a
                  href={BUSINESS_PHONE_HREF}
                  className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-bg px-4 py-3 transition-colors hover:border-brand-accent"
                >
                  <span className="w-9 h-9 rounded-full bg-brand-accent-bg flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-brand-accent-dark" />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                      Call us
                    </span>
                    <span className="text-sm font-semibold text-brand-text truncate">
                      {BUSINESS_PHONE}
                    </span>
                  </span>
                </a>
              </div>

              <Separator />

              {/* Mobile CTA */}
              <div className="p-4 flex flex-col gap-2">
                <Button asChild className="w-full bg-brand-accent hover:bg-brand-accent-dark text-white shadow-sm shadow-brand-accent/25">
                  <Link href={ROUTES.QUOTE}>Get a Free Quote</Link>
                </Button>
                <Button asChild className="w-full bg-brand hover:bg-brand-dark text-white">
                  <Link href={ROUTES.BOOKING}>Book Now</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}