import { ImageResponse } from "next/og";

// Same ring + squeegee mark as the navbar logo, simplified (no separate
// blade rectangle) since a favicon renders even smaller than the navbar
// and the extra detail would just blur together at 16-32px.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.3 12a8.3 8.3 0 1 1-2.7-6.1"
            stroke="#16AC98"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M8 16 L15.3 8.7"
            stroke="#16AC98"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
