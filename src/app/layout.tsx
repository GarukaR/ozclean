import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BASE_METADATA } from "@/lib/seo";
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between min-h-screen`}>
        <Navbar />
        {/* Pages render their own <main>; this is only the fixed-navbar offset. */}
        <div className="pt-16">{children}</div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
