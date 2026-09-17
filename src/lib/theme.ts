// Shared between the blocking init script (layout.tsx) and ThemeToggle.tsx.
// Keep these in sync with each other and with the inline script text below.
export const THEME_STORAGE_KEY = "ozclean-theme";
export const DARK_START_HOUR = 19; // 7pm
export const DARK_END_HOUR = 6; // 6am

export function isDarkHour(hour: number): boolean {
  return hour >= DARK_START_HOUR || hour < DARK_END_HOUR;
}

// Runs before hydration so the site never flashes the wrong theme.
// Prefers the visitor's own device clock; only falls back to Melbourne time
// (the business's own timezone) if the device clock is unreadable.
export const THEME_INIT_SCRIPT = `(function() {
  try {
    var KEY = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(KEY);
    var theme;
    if (stored === "light" || stored === "dark") {
      theme = stored;
    } else {
      var hour;
      try {
        hour = new Date().getHours();
      } catch (e) {
        hour = parseInt(
          new Intl.DateTimeFormat("en-AU", {
            timeZone: "Australia/Melbourne",
            hour: "numeric",
            hour12: false,
          }).format(new Date()),
          10
        );
      }
      theme = (hour >= ${DARK_START_HOUR} || hour < ${DARK_END_HOUR}) ? "dark" : "light";
    }
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {}
})();`;
