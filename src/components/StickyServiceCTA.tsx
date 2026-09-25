"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BUSINESS_PHONE_HREF } from "@/lib/business";

// Phone-only bar pinned to the bottom of service pages once the hero's own
// buttons have scrolled away, so the next step is always one tap away.
// globals.css pads the page bottom and lifts the back-to-top button while
// this is on the page (body:has([data-sticky-cta])).
export default function StickyServiceCTA({ label, href }: { label: string; href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-sticky-cta
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-brand-border bg-brand-surface/95 backdrop-blur-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-2 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href={href}
        tabIndex={visible ? 0 : -1}
        className="flex-1 h-12 rounded-xl bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/30"
      >
        {label} <ArrowRight className="w-4 h-4" />
      </Link>
      <a
        href={BUSINESS_PHONE_HREF}
        tabIndex={visible ? 0 : -1}
        aria-label="Call OzClean"
        className="w-12 h-12 rounded-xl border border-brand-accent-border text-brand-accent-dark flex items-center justify-center"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
