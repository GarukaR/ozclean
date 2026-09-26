import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generatePageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { ROUTES } from "@/lib/routes";
import Reveal from "@/components/Reveal";

export const metadata = generatePageMeta({
  title: "Sitemap",
  description: "A full list of all pages on the OzClean website.",
  path: "/sitemap",
});

const SITEMAP = [
  {
    category: "Main Pages",
    links: [
      { label: "Home", href: ROUTES.HOME, desc: "OzClean homepage" },
      { label: "About Us", href: ROUTES.ABOUT, desc: "Our story, team, and values" },
      { label: "Contact", href: ROUTES.CONTACT, desc: "Get in touch with our team" },
      { label: "FAQ", href: "/faq", desc: "Frequently asked questions" },
    ],
  },
  {
    category: "Services",
    links: [
      { label: "All Services", href: ROUTES.SERVICES, desc: "Overview of everything we offer" },
      { label: "Areas We Serve", href: ROUTES.AREAS, desc: "Suburbs we cover across South East Melbourne" },
      ...Object.values(SERVICES).map(({ slug, title, description }) => ({
        label: title,
        href: `${ROUTES.SERVICES}/${slug}`,
        desc: description,
      })),
    ],
  },
  {
    category: "Booking",
    links: [
      { label: "Book a Clean", href: ROUTES.BOOKING, desc: "Book your service online" },
      { label: "Get a Free Quote", href: ROUTES.QUOTE, desc: "Request a personalised quote" },
    ],
  },
  {
    category: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy", desc: "How we handle your data" },
      { label: "Terms of Service", href: "/terms", desc: "Our terms and conditions" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      {/* bg-brand-bg (not brand-surface) to match the body background the
          seamless floating navbar sits on — avoids a mismatched color strip
          in the navbar's clearance gap above this band. */}
      <section className="bg-brand-bg pt-6 sm:pt-10 pb-12 border-b border-brand-border">
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Sitemap</p>
          <h1 className="text-4xl font-bold text-brand-text mb-3">All Pages</h1>
          <p className="text-brand-muted">A full list of every page on the OzClean website.</p>
        </Reveal>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {SITEMAP.map(({ category, links }, index) => (
              <Reveal key={category} delay={(index % 2) * 0.1} className="flex flex-col gap-4">
                <h2 className="text-sm font-bold text-brand-text uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-brand inline-block" />
                  {category}
                </h2>
                <ul className="flex flex-col gap-2">
                  {links.map(({ label, href, desc }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group flex items-start justify-between gap-4 bg-brand-surface border border-brand-border rounded-xl px-4 py-3 hover:border-brand/40 hover:shadow-sm transition-all duration-200"
                      >
                        <div>
                          <p className="text-sm font-semibold text-brand-text group-hover:text-brand transition-colors">{label}</p>
                          <p className="text-xs text-brand-muted mt-0.5">{desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand shrink-0 mt-0.5 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}