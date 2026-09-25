import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Caslon_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BASE_METADATA, localBusinessJsonLd, toJsonLd } from "@/lib/seo";
import { BUSINESS_EMAIL, BUSINESS_PHONE } from "@/lib/business";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Hero headline only — not a sitewide serif.
const libreCaslonDisplay = Libre_Caslon_Display({
  variable: "--font-libre-caslon-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = BASE_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="ozclean-theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${libreCaslonDisplay.variable} antialiased flex flex-col justify-between min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessJsonLd(BUSINESS_PHONE, BUSINESS_EMAIL)) }}
        />
        <Navbar />
        {/* Pages render their own <main>; this is only the floating-pill-navbar offset. */}
        <div className="pt-20 sm:pt-24">{children}</div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
