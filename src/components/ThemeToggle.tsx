"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export default function ThemeToggle() {
  // Starts undefined so we never render a guess before checking the DOM
  // class the blocking init script already applied — avoids a flash of the
  // wrong icon on load.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  if (isDark === null) {
    return <div className="w-14 h-8 rounded-full bg-brand-border/40" aria-hidden />;
  }

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Private browsing or storage disabled — theme just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-14 h-8 rounded-full border border-brand-border bg-brand-bg transition-colors duration-300 shrink-0 cursor-pointer"
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ease-out ${
          isDark ? "translate-x-6 bg-[#0a1220]" : "translate-x-0 bg-white"
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-brand-accent" strokeWidth={2} />
        ) : (
          <Sun className="w-3.5 h-3.5 text-brand" strokeWidth={2} />
        )}
      </span>
    </button>
  );
}
