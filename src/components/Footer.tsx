import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, CircleFadingPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// ─── Config ───────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Services: [
    { label: "Residential Cleaning", href: "/services/residential" },
    { label: "Commercial Cleaning", href: "/services/commercial" },
    { label: "Deep Cleaning", href: "/services/deep-clean" },
    { label: "Move In / Move Out", href: "/services/move" },
    { label: "Window Cleaning", href: "/services/windows" },
    { label: "Wheely Bin Cleaning", href: "/services/wheely-bin" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Get a Quote", href: "/quote" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://www.facebook.com/share/1BypuKhcK9/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/ozclean.au?igsh=MTN5Mzg0b20xZ3Vvdw==", label: "Instagram" },
  { icon: CircleFadingPlus, href: "https://www.tiktok.com/@oz.clean.au?_r=1&_t=ZS-96DcjiQnrcr", label: "TikTok" },
];

const CONTACT_INFO = [
  { icon: Phone, text: "+61 428 276 935", href: "tel:+61428276935" },
  { icon: Mail, text: "ozclean.au@gmail.com", href: "mailto:ozclean.au@gmail.com" },
  { icon: MapPin, text: "Melbourne, VIC, Australia", href: "#" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-brand-text text-white">
      {/* Footer banner place - currently commented out*/}
      {/* <CTA_banner /> */}

      {/* ── Main Footer Grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image
                src="/logo/logo5.png"
                alt="Oz Clean"
                width={32}
                height={32}
                className="w-8 h-8"
                priority
              />
              <span className="font-bold text-brand-dark">Oz<span className="font-bold text-brand">CLEAN</span></span>
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
          <p>© {new Date().getFullYear()} OzClean. All rights reserved.</p>
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