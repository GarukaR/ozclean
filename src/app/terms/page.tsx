import { generatePageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = generatePageMeta({
  title: "Terms of Service",
  description: "SparkClean's terms of service — the rules and conditions that apply when using our cleaning services.",
  path: "/terms",
});

const LAST_UPDATED = "1 November 2024";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content: `By booking a service with SparkClean, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time, and continued use of our services constitutes acceptance of any changes.`,
  },
  {
    title: "Booking & Confirmation",
    content: `All bookings are subject to availability and are confirmed only upon receipt of a booking confirmation from SparkClean. We reserve the right to decline any booking at our discretion. It is your responsibility to ensure that access to the property is available at the agreed time.`,
  },
  {
    title: "Cancellation & Rescheduling",
    content: `You may cancel or reschedule your booking free of charge up to 24 hours before the scheduled appointment. Cancellations made within 24 hours of the appointment may incur a cancellation fee of up to 50% of the booking value. No-shows will be charged the full booking amount.`,
  },
  {
    title: "Service Guarantee",
    content: `We stand behind the quality of our work. If you are not satisfied with any aspect of your clean, please contact us within 24 hours of the service and we will return to rectify the issue at no additional charge. This guarantee does not apply to issues reported after 24 hours of service completion.`,
  },
  {
    title: "Your Responsibilities",
    content: `You agree to provide a safe working environment for our team, ensure access to the property at the agreed time, secure or remove fragile, valuable, or sentimental items before the clean, and inform us of any known hazards or special requirements at the property.`,
  },
  {
    title: "Liability",
    content: `SparkClean is fully insured for public liability. In the event of accidental damage caused by our team, our liability is limited to the cost of repair or replacement of the damaged item at current market value. We are not liable for pre-existing damage, normal wear and tear, or damage resulting from items that were not secured or were improperly stored.`,
  },
  {
    title: "Payment",
    content: `Payment is due upon completion of the service unless otherwise agreed in writing. For recurring bookings, payment is processed after each completed clean. All prices are in Australian Dollars (AUD) and include GST. We reserve the right to change our pricing at any time, with notice provided to existing recurring customers.`,
  },
  {
    title: "Privacy",
    content: `Your use of our services is also governed by our Privacy Policy, which is incorporated into these terms by reference. By using our services, you consent to the collection and use of your information as described in our Privacy Policy.`,
  },
  {
    title: "Governing Law",
    content: `These terms are governed by the laws of Victoria, Australia. Any disputes arising from these terms or your use of our services will be subject to the exclusive jurisdiction of the courts of Victoria.`,
  },
  {
    title: "Contact",
    content: `If you have any questions about these terms, please contact us at legal@sparkclean.com.au or call +61 3 9123 4567.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <section className="bg-white pt-32 pb-16 border-b border-brand-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-brand-text mb-3">Terms of Service</h1>
          <p className="text-brand-muted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
          <p className="text-brand-muted text-sm leading-relaxed">
            Please read these Terms of Service carefully before using SparkClean&apos;s services. These terms constitute a legally binding agreement between you and SparkClean ABN 00 000 000 000.
          </p>

          {SECTIONS.map(({ title, content }) => (
            <div key={title} className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-brand-text">{title}</h2>
              <p className="text-brand-muted text-sm leading-relaxed">{content}</p>
            </div>
          ))}

          <div className="pt-6 border-t border-brand-border flex flex-wrap gap-4 text-xs text-brand-muted">
            <Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-brand transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}