// src/lib/seo.ts
// ─── Base site metadata — update once, applies everywhere ────────────────────

export const SITE_NAME = "SparkClean";
export const SITE_URL = "https://www.sparkclean.com.au"; // update when live
export const SITE_DESCRIPTION =
  "Professional residential and commercial cleaning services across Melbourne. Vetted staff, eco-friendly products, 100% satisfaction guarantee.";

export const BASE_METADATA = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Professional Cleaning Services Melbourne`,
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
    "SparkClean",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Professional Cleaning Services Melbourne`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg", // add a 1200x630 image to /public
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Professional Cleaning Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Professional Cleaning Services Melbourne`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
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
    title,
    description,
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