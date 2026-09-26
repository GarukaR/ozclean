import { ROUTES } from "@/lib/routes";
import { getAllServiceSlugs } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";

// Next's app/sitemap.ts convention would claim the /sitemap route, which is already the
// human-readable sitemap page, so the XML feed is served from its own route handler.

type SitemapEntry = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const ENTRIES: SitemapEntry[] = [
  { path: ROUTES.HOME, changeFrequency: "weekly", priority: 1.0 },
  { path: ROUTES.SERVICES, changeFrequency: "monthly", priority: 0.9 },
  { path: ROUTES.AREAS, changeFrequency: "monthly", priority: 0.8 },
  { path: ROUTES.BOOKING, changeFrequency: "monthly", priority: 0.9 },
  { path: ROUTES.QUOTE, changeFrequency: "monthly", priority: 0.8 },
  { path: ROUTES.ABOUT, changeFrequency: "yearly", priority: 0.6 },
  { path: ROUTES.CONTACT, changeFrequency: "yearly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/sitemap", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  ...getAllServiceSlugs().map((slug) => ({
    path: `${ROUTES.SERVICES}/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
];

export function GET() {
  const lastModified = new Date().toISOString();

  const urls = ENTRIES.map(
    ({ path, changeFrequency, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
