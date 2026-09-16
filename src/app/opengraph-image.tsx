import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_NAME } from "@/lib/seo";

// Generated at build time and inherited by every route, replacing the /og-image.jpg that was
// referenced in metadata but never existed in /public.
export const alt = `${SITE_NAME} — Professional Cleaning Services Melbourne`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {SITE_NAME}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>
            Professional Cleaning
            <br />
            Services in Melbourne
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.85)" }}>
            {SITE_DESCRIPTION.split(".")[0]}.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.75)" }}>
          {SITE_DOMAIN}
        </div>
      </div>
    ),
    size
  );
}
