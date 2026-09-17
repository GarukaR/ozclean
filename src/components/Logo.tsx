import Link from "next/link";
import { ROUTES } from "@/lib/routes";

type LogoProps = {
  /** "sm" for tight spots like the mobile sheet header. */
  size?: "default" | "sm";
  className?: string;
};

// The "O" in OzClean is drawn as one mark: an open ring (a wipe, not a
// closed circle) crossed by a squeegee stroke, same stroke colour as the
// wordmark so it reads as a letterform rather than a separate icon badge.
// Colours are CSS variables, not literals, so light/dark mode need no JS.
export default function Logo({ size = "default", className = "" }: LogoProps) {
  const iconPx = size === "sm" ? 28 : 32;
  const dropWidth = size === "sm" ? 9 : 10;
  const dropHeight = size === "sm" ? 12 : 14;
  // The ring inside the icon's viewBox doesn't reach the edges (it leaves
  // room for the squeegee's blade), so a plain flex gap reads as a bigger
  // gap than intended. Pull the text in to close that built-in dead space,
  // then give the droplet its own small gap back on the other side.
  const iconPullIn = size === "sm" ? -1 : -1.25;

  return (
    <Link
      href={ROUTES.HOME}
      aria-label="OzClean home"
      className={`ozclean-logo group inline-flex items-center shrink-0 ${className}`}
    >
      <svg
        width={iconPx}
        height={iconPx}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ marginRight: iconPullIn }}
      >
        <path
          d="M20.3 12a8.3 8.3 0 1 1-2.7-6.1"
          stroke="var(--brand-text)"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          className="ozclean-logo-shaft"
          d="M8 16 L15.3 8.7"
          stroke="var(--brand-text)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="10.3"
          y="8"
          width="10"
          height="1.4"
          rx="0.6"
          transform="rotate(45 15.3 8.7)"
          fill="var(--brand-accent)"
        />
      </svg>
      <span className="text-brand-text">
        <span className="font-extrabold">z</span>
        <span className="font-medium">Clean</span>
      </span>
      <svg
        width={dropWidth}
        height={dropHeight}
        viewBox="0 0 10 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ transform: "translateY(1px)", marginLeft: 2 }}
      >
        <path
          d="M5 1 C5 1 9 6.5 9 9.3 C9 11.9 7.2 13 5 13 C2.8 13 1 11.9 1 9.3 C1 6.5 5 1 5 1Z"
          fill="var(--brand-accent)"
        />
      </svg>
    </Link>
  );
}
