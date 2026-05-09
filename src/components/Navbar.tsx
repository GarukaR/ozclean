"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { SERVICES } from "@/lib/services";

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
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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

const HOME_SERVICE_SLUGS = new Set(["residential", "deep-clean", "move"]);

const GROUPED_SERVICE_LINKS = {
  home: SERVICE_LINKS.filter((service) => HOME_SERVICE_SLUGS.has(service.slug)),
  specialty: SERVICE_LINKS.filter((service) => !HOME_SERVICE_SLUGS.has(service.slug)),
};
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isServicesPath = pathname === ROUTES.SERVICES || pathname.startsWith(`${ROUTES.SERVICES}/`);

  // Homepage: transparent until scrolled. All other pages: always solid.
  const isHome = pathname === ROUTES.HOME;
  const showBg = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    onScroll(); // Check scroll position on mount

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${showBg
          ? "bg-white/90 backdrop-blur-md border-b border-brand-border shadow-sm"
          : "bg-transparent"
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo/logo5.svg"
            alt="Oz Clean"
            width={32}
            height={32}
            className="w-8 h-8 bg-transparent rounded-full p-1"
            priority
          />
          <span className="font-bold text-brand-dark">Oz<span className="font-bold text-brand">CLEAN</span></span>
        </Link>

        {/* ── Desktop Nav (hidden on mobile) ── */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map(({ label, href }) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink
                  asChild
                  className={`
                    ${navigationMenuTriggerStyle()}
                    ${pathname === href || pathname.startsWith(href + "/")
                      ? "text-brand font-semibold"
                      : ""
                    }
                  `}
                >
                  <Link href={href}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* ── Desktop CTAs ── */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild className="bg-brand-accent hover:bg-brand-accent-dark text-white shadow-sm shadow-brand-accent/25">
            <Link href={ROUTES.QUOTE}>Get a Quote</Link>
          </Button>
          <Button asChild className="bg-brand hover:bg-brand-dark text-white shadow-sm shadow-brand/25">
            <Link href={ROUTES.BOOKING}>Book Now</Link>
          </Button>
        </div>

        {/* ── Mobile Menu (Sheet) — hidden on desktop ── */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
                <Image
                  src="/logo/logo5.svg"
                  alt="Oz Clean"
                  width={28}
                  height={28}
                  className="w-7 h-7 bg-transparent rounded-full p-1"
                />
                <span className="font-bold text-brand-dark">Oz<span className="font-bold text-brand">CLEAN</span></span>

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
                                Home Cleaning
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

                            <div className="mt-1 px-3">
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand/70">
                                Specialty Cleaning
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
    </header>
  );
}