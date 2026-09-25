// src/lib/seo.ts
// ─── Base site metadata — update once, applies everywhere ────────────────────

export const SITE_NAME = "OzClean";
// www is the primary domain on Vercel (the bare domain redirects to it), so
// canonicals and the sitemap must point here, not at the redirecting apex.
export const SITE_URL = "https://www.ozclean.au";
// Display form of SITE_URL, for places that show the domain as text (e.g. email footers).
export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, "").replace(/^www\./, "");
export const SITE_DESCRIPTION =
  "Airbnb turnover, end of lease, home and commercial cleaning across South East Melbourne. Based in Hampton Park. Vetted staff, eco-friendly products, 100% satisfaction guarantee.";

// Suburbs we actively serve. Feeds the LocalBusiness structured data and page
// copy, so keep it in step with the Google Business Profile service areas.
export const SERVICE_AREAS = [
  "Hampton Park",
  "Narre Warren",
  "Berwick",
  "Cranbourne",
  "Dandenong",
  "Lynbrook",
  "Lyndhurst",
  "Endeavour Hills",
  "Keysborough",
  "Pakenham",
] as const;
export const SERVICE_REGION = "South East Melbourne";

export const BASE_METADATA = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Cleaning Services South East Melbourne`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "cleaning services Melbourne",
    "residential cleaning",
    "commercial cleaning",
    "deep cleaning",
    "end of lease cleaning",
    "bond clean Melbourne",
    "window cleaning",
    "OzClean",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Cleaning Services South East Melbourne`,
    description: SITE_DESCRIPTION,
    // Social images come from the app/opengraph-image.tsx file convention.
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Cleaning Services South East Melbourne`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Helper to generate page-level metadata ───────────────────────────────────
export function generatePageMeta({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  return {
    // Bare title — the root layout's "%s | OzClean" template adds the brand.
    title,
    description,
    alternates: { canonical: path || "/" },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}${path}`,
    },
    twitter: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
// ─── LocalBusiness structured data (rendered once, in the root layout) ────────
// Deliberately no aggregateRating: only add one once it reflects real,
// verifiable reviews (Google + ACCC both penalise unverifiable ratings).
export const BUSINESS_ID = `${SITE_URL}/#business`;

export function localBusinessJsonLd(phone: string, email: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    telephone: phone,
    email,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/logo/oz-clean-logo.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hampton Park",
      addressRegion: "VIC",
      postalCode: "3976",
      addressCountry: "AU",
    },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name: `${name}, VIC` })),
  };
}

// Serialise for a <script type="application/ld+json">, escaping "<" so no
// string value can ever close the script tag early.
export function toJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
