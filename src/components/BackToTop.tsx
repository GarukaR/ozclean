"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Floating "back to top" button, shown once the visitor is a screen or so down.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Back to top"
      data-back-to-top
      tabIndex={visible ? 0 : -1}
      // Below the navbar pill (z-60) and the mobile drawer (z-40).
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 w-12 h-12 rounded-full bg-brand-text text-brand-bg shadow-lg shadow-black/20 flex items-center justify-center hover:bg-brand-accent-dark hover:text-white transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
