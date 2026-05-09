import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-expect-error importing global CSS in the app layout
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BASE_METADATA } from "@/lib/seo";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between min-h-screen`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
