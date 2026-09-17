"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
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
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
        ${scrolled
          ? "bg-white/70 dark:bg-black/40 backdrop-blur-xl backdrop-saturate-150 border-black/5 dark:border-white/10 shadow-sm"
          : "bg-white dark:bg-black border-transparent"
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-3 items-center">

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
          <Button asChild className="bg-brand hover:bg-brand-dark text-white shadow-sm shadow-brand/25">
            <Link href={ROUTES.BOOKING}>Book Now</Link>
          </Button>
        </div>

        {/* ── Mobile: theme toggle + Menu (Sheet) — hidden on desktop ── */}
        <div className="flex md:hidden items-center gap-2 justify-self-end col-start-3">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

          <SheetContent side="right" className="w-72 p-0">
            {/* Required for accessibility */}
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <div className="flex flex-col h-full">
              {/* Sheet Header */}
              <div className="flex items-center gap-2 px-6 py-5">
                <Logo size="sm" />
              </div>

              <Separator />

              {/* Mobile Links */}
              <nav className="flex flex-col gap-1 p-4 flex-1">
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