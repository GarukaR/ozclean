import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Config ───────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Services: [
    { label: "Residential Cleaning", href: "/services/residential" },
    { label: "Commercial Cleaning", href: "/services/commercial" },
    { label: "Deep Cleaning", href: "/services/deep-clean" },
    { label: "Move In / Move Out", href: "/services/move" },
    { label: "Window Cleaning", href: "/services/windows" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Pricing", href: "/pricing" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const CONTACT_INFO = [
  { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: Mail, text: "hello@sparkclean.com", href: "mailto:hello@sparkclean.com" },
  { icon: MapPin, text: "Melbourne, VIC, Australia", href: "#" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-brand-text text-white">

      {/* ── Top CTA Banner ── */}
      <div className="bg-brand border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-lg">Ready for a spotless home?</p>
            <p className="text-white/80 text-sm">Book your first clean today — 20% off for new customers.</p>
          </div>
          <Button
            asChild
            className="bg-white text-brand hover:bg-brand-bg font-semibold shrink-0 shadow-lg"
          >
            <Link href="/book">Book Now →</Link>
          </Button>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">SparkClean</span>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Professional cleaning services that leave your space spotless, fresh, and sparkling. Trusted by thousands of homes and businesses.
            </p>

            {/* Contact Info */}
            <ul className="flex flex-col gap-3">
              {CONTACT_INFO.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand/30 flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-3.5 h-3.5 text-brand-accent" />
                    </div>
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-white/60 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/55 hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <Separator className="mt-10 mb-6 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SparkClean. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}