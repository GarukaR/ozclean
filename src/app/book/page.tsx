import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { generatePageMeta } from "@/lib/seo";
import BookingForm from "./BookingForm";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata = generatePageMeta({
  title: "Book a Clean",
  description: "Book your SparkClean service online in minutes. Choose your service, pick a date and time, and we'll confirm within 2 hours.",
  path: "/book",
});

const TIER_MAP: Record<string, { label: string; service: string }> = {
  essential: { label: "Essential Plan", service: "Essential Plan" },
  standard: { label: "Standard Plan", service: "Standard Plan" },
  premium: { label: "Premium Plan", service: "Premium Plan" },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier: tierParam } = await searchParams;
  const tier = TIER_MAP[tierParam ?? ""] ?? null;
  return (
    <main className="min-h-screen bg-brand-bg pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Back link ── */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>

        {/* ── Page header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-white" />
            </div>
            <p className="text-brand text-sm font-semibold uppercase tracking-widest">
              Book a Clean
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-text tracking-tight">
            Let&apos;s get your space sparkling.
          </h1>
          <p className="text-brand-muted mt-2 text-base leading-relaxed">
            Fill in the details below and we&apos;ll confirm your booking within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Form ── */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-brand-border shadow-sm overflow-hidden">
            <BookingForm tierLabel={tier?.label} preselectedService={tier?.service} />
          </div>

          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-5">


            {/* Booking Fee card */}
            <div className="bg-white rounded-3xl border-2 border-brand/30 p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand/6 pointer-events-none" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-brand" />
                </div>
                <p className="font-bold text-brand-text text-sm">Secure Your Booking</p>
              </div>
              <div className="bg-brand-bg rounded-2xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-brand-muted">Due today</p>
                  <p className="text-xl font-black text-brand-text">10% deposit</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-brand-muted">Balance due</p>
                  <p className="text-sm font-bold text-brand-text">24hrs before</p>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5">
                {[
                  { icon: CheckCircle2, text: "Deposit credited to your total — not an extra charge" },
                  { icon: CheckCircle2, text: "Balance payment link sent 24hrs before your clean" },
                  { icon: CheckCircle2, text: "100% refunded if cancelled 48hrs before" },
                  { icon: CheckCircle2, text: "Reserves your time slot exclusively" },
                  { icon: Lock, text: "Secure payment via encrypted checkout" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-2">
                    <Icon className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                    <span className="text-xs text-brand-muted leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-1.5 border-t border-brand-border pt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <p className="text-xs text-emerald-600 font-medium">Protected by SparkClean&apos;s booking guarantee</p>
              </div>
            </div>

            {/* What Happens Next card */}
            <div className="bg-white rounded-3xl border border-brand-border p-6 flex flex-col gap-4 shadow-sm">
              <p className="font-bold text-brand-text text-sm">What happens next?</p>
              <ol className="flex flex-col gap-3">
                {[
                  { step: "1", title: "We confirm within 2hrs", desc: "You'll receive an email confirmation with your booking details." },
                  { step: "2", title: "Deposit collected today", desc: "A secure payment link is sent to collect your 10% deposit." },
                  { step: "3", title: "Balance due 24hrs before", desc: "We send a payment link for the remaining 90% the day before your clean." },
                  { step: "4", title: "Cleaner arrives on time", desc: "Your vetted cleaner shows up at the agreed time, fully equipped." },
                ].map(({ step, title, desc }) => (
                  <li key={step} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand/10 text-brand text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {step}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brand-text">{title}</p>
                      <p className="text-xs text-brand-muted leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href="tel:+61391234567"
                className="flex items-center gap-2 bg-brand-bg rounded-xl px-4 py-3 hover:bg-brand/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <div>
                  <p className="text-xs text-brand-muted">Prefer to call?</p>
                  <p className="text-sm font-semibold text-brand-text">+61 3 9123 4567</p>
                </div>
              </a>
            </div>

            {/* Quote link */}
            <p className="text-center text-xs text-brand-muted">
              Not ready to book?{" "}
              <Link href="/quote" className="text-brand font-semibold hover:underline underline-offset-2">
                Get a free quote instead →
              </Link>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
