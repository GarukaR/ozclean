import Link from "next/link";
import { CheckCircle2, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

export const metadata = generatePageMeta({
  title: "Booking Confirmed",
  description: "Your OzClean booking is confirmed. We'll be in touch shortly.",
  path: ROUTES.BOOKING_SUCCESS,
});

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <main className="min-h-screen bg-brand-bg flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full">

        {/* Success card */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-xl shadow-brand/8 overflow-hidden">

          {/* Top accent */}
          <div className="h-2 bg-gradient-to-r from-brand to-brand-accent" />

          <div className="p-10 flex flex-col items-center text-center gap-6">

            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-brand" />
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-3xl font-bold text-brand-text tracking-tight">
                You&apos;re booked in! 🎉
              </h1>
              {id && (
                <p className="text-brand-muted text-sm mt-2">
                  Booking reference:{" "}
                  <span className="font-mono font-semibold text-brand-text">{id}</span>
                </p>
              )}
            </div>

            {/* Message */}
            <p className="text-brand-muted text-base leading-relaxed max-w-sm">
              Your payment has been processed and your booking is confirmed. Check your inbox for a confirmation email with all the details.
            </p>

            {/* What happens next */}
            <div className="w-full bg-brand-bg rounded-2xl p-6 flex flex-col gap-4 text-left">
              <p className="text-xs font-bold text-brand-text uppercase tracking-widest">
                What Happens Next
              </p>
              {[
                { icon: Mail, text: "Confirmation email sent to your inbox" },
                { icon: CheckCircle2, text: "Your cleaner arrives at the agreed time, fully equipped" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-brand" />
                  </div>
                  <p className="text-sm text-brand-muted">{text}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <Button asChild className="flex-1 bg-brand hover:bg-brand-dark text-white font-semibold gap-2">
                <Link href={ROUTES.HOME}>
                  Back to Home <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 border-brand-border hover:border-brand">
                <Link href={ROUTES.SERVICES}>Browse Services</Link>
              </Button>
            </div>

            {/* Phone */}
            <a
              href="tel:+61428276935"
              className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Questions? Call +61 428 276 935
            </a>

          </div>
        </div>

      </div>
    </main>
  );
}