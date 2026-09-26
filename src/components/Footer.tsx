import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/Logo";
import {
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_HREF,
  BUSINESS_PHONE,
  BUSINESS_PHONE_HREF,
  BUSINESS_ABN,
} from "@/lib/business";

// Lucide has no TikTok glyph — this is the real TikTok mark, not a placeholder shape.
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.9-.8-1.47-1.94-1.6-3.22h-3.03v13.44c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1-2.72-2.72c0-1.5 1.22-2.72 2.72-2.72.28 0 .55.04.8.12v-3.09a5.8 5.8 0 0 0-.8-.06 5.75 5.75 0 0 0-5.75 5.75A5.75 5.75 0 0 0 9.25 22a5.75 5.75 0 0 0 5.75-5.75V9.01a8.2 8.2 0 0 0 4.8 1.54V7.52a5.13 5.13 0 0 1-3.2-1.7Z" />
    </svg>
  );
}

// ─── Config ───────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  "Popular Services": [
    { label: "Airbnb Cleaning", href: "/services/airbnb" },
    { label: "End of Lease Cleaning", href: "/services/move" },
    { label: "Retail & Shop Cleaning", href: "/services/retail-cleaning" },
    { label: "Medical Centre Cleaning", href: "/services/medical-centre-cleaning" },
    { label: "Strata & Common Areas", href: "/services/strata-cleaning" },
    { label: "Carpet, Couch & Mattress", href: "/services/carpet-cleaning" },
    { label: "All Services", href: "/services" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Areas We Serve", href: "/areas" },
    { label: "FAQ", href: "/faq" },
    { label: "Get a Free Quote", href: "/quote" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://www.facebook.com/share/1BypuKhcK9/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/ozclean.au?igsh=MTN5Mzg0b20xZ3Vvdw==", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@oz.clean.au?_r=1&_t=ZS-96DcjiQnrcr", label: "TikTok" },
];

const CREATOR_GITHUB_URL = "https://github.com/GarukaR";

const CONTACT_INFO = [
  { icon: Phone, text: BUSINESS_PHONE, href: BUSINESS_PHONE_HREF },
  { icon: Mail, text: BUSINESS_EMAIL, href: BUSINESS_EMAIL_HREF },
  { icon: MapPin, text: "Hampton Park, VIC, Australia", href: "#" },
];
// ─────────────────────────────────────────────────────────────────────────────

function FooterColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide uppercase">{heading}</h4>
      <ul className="flex flex-col gap-2 sm:gap-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-white/55 hover:text-white transition-colors hover:translate-x-0.5 inline-block py-0.5"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Footer is a fixed near-black anchor band, independent of the site's light/dark theme toggle.
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* ── Main Footer Grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Phones: brand block full width, then two link columns side by side
            (services | company + support). Desktop: five columns. */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-10">

          {/* Brand Column */}
          <div className="col-span-2 flex flex-col gap-4 sm:gap-5">
            {/* Logo — pinned to a light colour here since the footer stays a
                fixed dark band regardless of the site's light/dark toggle,
                whereas the logo's stroke colour otherwise follows that toggle. */}
            <div className="flex items-center justify-between gap-4">
              <div style={{ "--brand-text": "#ffffff" } as React.CSSProperties}>
                <Logo />
              </div>
              {/* Socials sit beside the logo on phones to save a row */}
              <div className="flex items-center gap-2 lg:hidden">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-white/60" />
                  </a>
                ))}
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Airbnb, end of lease, home and business cleaning across South East Melbourne. Based in Hampton Park.
            </p>

            {/* Contact Info */}
            <ul className="flex flex-col gap-2 sm:gap-3">
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

            {/* Social Links (desktop; phones show them beside the logo) */}
            <div className="hidden lg:flex items-center gap-2">
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
          <FooterColumn heading="Popular Services" links={FOOTER_LINKS["Popular Services"]} />
          {/* Company + Support share one column on phones; separate columns on desktop */}
          <div className="flex flex-col gap-8 lg:contents">
            <FooterColumn heading="Company" links={FOOTER_LINKS.Company} />
            <FooterColumn heading="Support" links={FOOTER_LINKS.Support} />
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <Separator className="mt-8 sm:mt-10 mb-5 sm:mb-6 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p>© {new Date().getFullYear()} OzClean · ABN {BUSINESS_ABN}</p>
            <a
              href={CREATOR_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-white/60 transition-colors hover:bg-brand-accent hover:text-[#06231e]"
            >
              <Github className="w-3.5 h-3.5 shrink-0" />
              Site built by GarukaR
            </a>
          </div>
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