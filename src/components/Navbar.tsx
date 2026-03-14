"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";

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

// ─── Nav links config — edit here to add/remove links ────────────────────────
const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Homepage: transparent until scrolled. All other pages: always solid.
  const isHome = pathname === "/";
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
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            SparkClean
          </span>
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
          <Button asChild variant="ghost" className="text-brand-muted hover:text-brand-text">
            <Link href="/quote">Get a Quote</Link>
          </Button>
          <Button asChild className="bg-brand hover:bg-brand-dark text-white shadow-sm shadow-brand/25">
            <Link href="/book">Book Now</Link>
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
                <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-slate-900">SparkClean</span>
              </div>

              <Separator />

              {/* Mobile Links */}
              <nav className="flex flex-col gap-1 p-4 flex-1">
                {NAV_LINKS.map(({ label, href }) => (
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
                ))}
              </nav>

              <Separator />

              {/* Mobile CTA */}
              <div className="p-4 flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full border-brand-border">
                  <Link href="/quote">Get a Free Quote</Link>
                </Button>
                <Button asChild className="w-full bg-brand hover:bg-brand-dark text-white">
                  <Link href="/book">Book Now</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}