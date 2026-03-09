import { generatePageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = generatePageMeta({
  title: "Privacy Policy",
  description: "SparkClean's privacy policy — how we collect, use, and protect your personal information.",
  path: "/privacy",
});

const LAST_UPDATED = "1 November 2024";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us when you book a service, request a quote, or contact us. This includes your name, email address, phone number, and property address. We may also collect information about how you use our website through cookies and analytics tools.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to process and manage your bookings, communicate with you about your appointments, send service confirmations and reminders, respond to your enquiries, and improve our services. We do not sell your personal information to third parties.`,
  },
  {
    title: "Sharing Your Information",
    content: `We may share your information with our cleaning team members to fulfill your booking, and with trusted third-party service providers who help us operate our business (such as payment processors and email platforms). All third parties are required to keep your information confidential and use it only for the purposes we specify.`,
  },
  {
    title: "Data Security",
    content: `We take reasonable measures to protect your personal information from unauthorised access, use, or disclosure. All payment processing is handled by secure, PCI-compliant payment providers. We never store your full credit card details on our systems.`,
  },
  {
    title: "Cookies",
    content: `Our website uses cookies to improve your browsing experience and help us understand how visitors use our site. You can disable cookies in your browser settings, though this may affect some functionality of our website.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal information at any time. You may also opt out of marketing communications by clicking the unsubscribe link in any email we send, or by contacting us directly. To exercise any of these rights, please contact us at privacy@sparkclean.com.au.`,
  },
  {
    title: "Retention",
    content: `We retain your personal information for as long as necessary to provide our services and comply with our legal obligations. When your information is no longer needed, we securely delete or anonymise it.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time. When we do, we will update the date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this privacy policy or how we handle your personal information, please contact us at privacy@sparkclean.com.au or call us on +61 3 9123 4567.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <section className="bg-white pt-32 pb-16 border-b border-brand-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-brand-text mb-3">Privacy Policy</h1>
          <p className="text-brand-muted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
          <p className="text-brand-muted text-sm leading-relaxed">
            SparkClean (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our services or visit our website.
          </p>

          {SECTIONS.map(({ title, content }) => (
            <div key={title} className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-brand-text">{title}</h2>
              <p className="text-brand-muted text-sm leading-relaxed">{content}</p>
            </div>
          ))}

          <div className="pt-6 border-t border-brand-border flex flex-wrap gap-4 text-xs text-brand-muted">
            <Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-brand transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}