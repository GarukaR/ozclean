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

            {/* What Happens Next card */}
            <div className="bg-white rounded-3xl border border-brand-border p-6 flex flex-col gap-4 shadow-sm">
              <p className="font-bold text-brand-text text-sm">What happens next?</p>
              <ol className="flex flex-col gap-3">
                {[
                  { step: "1", title: "Deposit collected today", desc: "A secure payment link is sent to collect payment 100% securely." },
                  { step: "2", title: "Confirmation Email", desc: "You'll receive an email confirmation with your booking details." },
                  { step: "3", title: "We'll contact you via email or call", desc: "We want to ensure everything is set for your clean." },
                  { step: "4", title: "Cleaner arrives on time", desc: "Your vetted cleaner shows up at the agreed time, fully equipped." },
                  { step: "5", title: "Enjoy your sparkling space!", desc: "Sit back and relax while we make your space shine." },
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
