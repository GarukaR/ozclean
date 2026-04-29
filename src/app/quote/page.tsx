import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import QuoteForm from "./QuoteForm";

export const metadata = generatePageMeta({
  title: "Get a Free Quote",
  description: "Request a free, no-obligation quote from SparkClean. Tell us about your space and we'll get back to you with a personalised price within 2 hours.",
  path: "/quote",
});

const WHAT_HAPPENS = [
  "We review your request within 2 hours",
  "We send a personalised quote to your email",
  "You approve and we schedule your clean",
];

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-brand-bg pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

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
              <FileText className="w-4 h-4 text-white" />
            </div>
            <p className="text-brand text-sm font-semibold uppercase tracking-widest">
              Free Quote
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-text tracking-tight">
            Get a free, no-obligation quote.
          </h1>
          <p className="text-brand-muted mt-2 text-base leading-relaxed">
            Tell us about your space and what you need — we&apos;ll get back to you with a personalised price.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Form ── */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-brand-border shadow-sm overflow-hidden">
            <QuoteForm />
          </div>

          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-5">
            {/* What happens next */}
            <div className="bg-white rounded-3xl border border-brand-border p-6 flex flex-col gap-4 shadow-sm">
              <p className="text-sm font-bold text-brand-text">What happens next?</p>
              <ol className="flex flex-col gap-4">
                {WHAT_HAPPENS.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm text-brand-muted leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Already know what you want */}
            <div className="bg-brand rounded-3xl p-6 flex flex-col gap-3">
              <p className="text-white font-bold text-sm">Ready to book directly?</p>
              <p className="text-white/75 text-xs leading-relaxed">
                Skip the quote and go straight to booking if you already know what you need.
              </p>
              <Button
                asChild
                className="bg-white text-brand hover:bg-brand-bg font-semibold text-sm w-full"
              >
                <Link href={ROUTES.BOOKING}>Book a Clean →</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
