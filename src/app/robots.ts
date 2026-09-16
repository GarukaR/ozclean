import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Transactional endpoints and the post-payment page have no search value.
      disallow: ["/api/", "/booking/success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
