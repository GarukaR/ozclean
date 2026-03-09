import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generatePageMeta } from "@/lib/seo";

export const metadata = generatePageMeta({
  title: "Sitemap",
  description: "A full list of all pages on the SparkClean website.",
  path: "/sitemap",
});

const SITEMAP = [
  {
    category: "Main Pages",
    links: [
      { label: "Home", href: "/", desc: "SparkClean homepage" },
      { label: "About Us", href: "/about", desc: "Our story, team, and values" },
      { label: "Contact", href: "/contact", desc: "Get in touch with our team" },
      { label: "FAQ", href: "/faq", desc: "Frequently asked questions" },
    ],
  },
  {
    category: "Services",
    links: [
      { label: "All Services", href: "/services", desc: "Overview of everything we offer" },
      { label: "Commercial Cleaning", href: "/services/commercial", desc: "Office and business cleaning" },
      { label: "Residential Cleaning", href: "/services/residential", desc: "Regular home cleaning" },
      { label: "Deep Cleaning", href: "/services/deep-clean", desc: "Thorough top-to-bottom clean" },
      { label: "Move In / Move Out", href: "/services/move", desc: "End of lease and bond cleans" },
      { label: "Window Cleaning", href: "/services/windows", desc: "Streak-free window cleaning" },
    ],
  },
  {
    category: "Booking",
    links: [
      { label: "Book a Clean", href: "/book", desc: "Book your service online" },
      { label: "Get a Free Quote", href: "/quote", desc: "Request a personalised quote" },
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
      <section className="bg-white pt-32 pb-16 border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Sitemap</p>
          <h1 className="text-4xl font-bold text-brand-text mb-3">All Pages</h1>
          <p className="text-brand-muted">A full list of every page on the SparkClean website.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {SITEMAP.map(({ category, links }) => (
              <div key={category} className="flex flex-col gap-4">
                <h2 className="text-sm font-bold text-brand-text uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-brand inline-block" />
                  {category}
                </h2>
                <ul className="flex flex-col gap-2">
                  {links.map(({ label, href, desc }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group flex items-start justify-between gap-4 bg-white border border-brand-border rounded-xl px-4 py-3 hover:border-brand/40 hover:shadow-sm transition-all duration-200"
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}