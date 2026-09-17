import { ImageResponse } from "next/og";

// Same ring + squeegee mark as the navbar logo, in the same two-tone
// navy/teal as the full mark (a single-color teal version made the blade
// blend into the shaft with nothing to separate them). The blade is
// centered on the shaft's end point so the handle passes through the
// middle of the crossbar rather than reading as a hammer head.
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
            stroke="#0C1A2E"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M8 16 L15.3 8.7"
            stroke="#0C1A2E"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <rect
            x="9.8"
            y="7.7"
            width="11"
            height="2"
            rx="0.8"
            transform="rotate(45 15.3 8.7)"
            fill="#16AC98"
          />
        </svg>
      </div>
    ),
    size
  );
}
