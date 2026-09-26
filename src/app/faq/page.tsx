import Link from "next/link";

import { BUSINESS_PHONE_HREF } from "@/lib/business";
import { ChevronDown, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import Reveal from "@/components/Reveal";

export const metadata = generatePageMeta({
  title: "Cleaning FAQs: Booking, Pricing, Services & Areas",
  description: "Answers to common questions about OzClean in South East Melbourne: booking, service areas, medical, strata and carpet cleaning, our cleaners, pricing and our re-clean guarantee.",
  path: "/faq",
});

// ─── Config: add/remove/edit questions here ───────────────────────────────────
const FAQ_CATEGORIES = [
  {
    category: "Booking & Scheduling",
    faqs: [
      {
        q: "How do I book a clean?",
        a: "You can book online through our booking page in just a few minutes: pick your service, choose a date and time, and confirm. You can also call us or request a free quote if you're not sure which service you need.",
      },
      {
        q: "Can I reschedule or cancel my booking?",
        a: "You can reschedule or cancel for free up to 24 hours before your appointment. Just contact us by phone or email and we'll sort it out straight away.",
      },
      {
        q: "How far in advance do I need to book?",
        a: "We recommend booking at least 48 hours in advance. Same-day bookings are available subject to availability, give us a call and we'll do our best.",
      },
      {
        q: "Do you offer recurring bookings?",
        a: "Absolutely. We offer weekly and fortnightly recurring cleans at a discounted rate. You can set this up when booking online or mention it when you call.",
      },
    ],
  },
  {
    category: "Services & Areas",
    faqs: [
      {
        q: "Which suburbs do you cover?",
        a: "We're based in Hampton Park and cover 42 suburbs across South East Melbourne, including Narre Warren, Berwick, Cranbourne, Dandenong, Keysborough and Pakenham. A small travel charge applies in a few outer suburbs. Check your suburb or postcode on our Areas page.",
      },
      {
        q: "Do you clean medical centres and clinics?",
        a: "Yes. We clean GP clinics, dental, physio and allied health practices after hours, using hospital-grade disinfectants and colour-coded cloths. Clinical and sharps waste stays with your licensed waste contractor.",
      },
      {
        q: "Do you clean strata and owners corporation common areas?",
        a: "Yes. We clean lobbies, hallways, stairwells, lifts, bin rooms and car parks on a weekly or fortnightly schedule, and can send your owners corporation manager a photo report after each visit.",
      },
      {
        q: "Do you clean shops and retail stores?",
        a: "Yes. We clean boutiques, shops and showrooms before opening or after closing, including shopfront glass, fitting rooms, counters and floors.",
      },
      {
        q: "Do you do carpet, couch and mattress cleaning?",
        a: "Yes. We steam clean carpets using hot water extraction and deep clean fabric couches and mattresses. Carpet cleaning can be done on the same day as an end of lease clean.",
      },
      {
        q: "Which services can I book online?",
        a: "House cleaning and wheelie bin cleaning can be booked and paid online. For everything else, including Airbnb, end of lease, business and carpet cleaning, request a free quote and we'll get back to you within 2 hours.",
      },
    ],
  },
  {
    category: "Our Cleaners",
    faqs: [
      {
        q: "Are your cleaners vetted and insured?",
        a: "Every OzClean team member is background-checked, fully insured, and completes our in-house training program before their first job.",
      },
      {
        q: "Will I get the same cleaner each visit?",
        a: "On weekly and fortnightly plans, we assign you a dedicated cleaner so they get to know your home and your preferences. For one-off cleans, we assign the best available team member.",
      },
      {
        q: "Do I need to be home when the cleaner arrives?",
        a: "Not necessarily. Many clients provide a key or access code. We handle your home with complete care and professionalism, so you can trust us whether you're home or not.",
      },
    ],
  },
  {
    category: "Products & Equipment",
    faqs: [
      {
        q: "Do you bring your own cleaning products?",
        a: "We bring everything we need, including all equipment and cleaning products. You don't need to supply anything.",
      },
      {
        q: "Are your products safe for children and pets?",
        a: "Absolutely. We use only non-toxic, biodegradable cleaning products that are safe for the whole family including pets.",
      },
      {
        q: "Can I request specific products or brands?",
        a: "If you have specific product preferences or allergies, just let us know when booking and we'll accommodate where possible.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    faqs: [
      {
        q: "How is pricing calculated?",
        a: "Pricing is based on the service type, property size, and frequency. We show starting-from prices on each service page, and you can get an exact quote for your specific property in minutes.",
      },
      {
        q: "Are there any hidden fees?",
        a: "Never. We agree on the price upfront before any work begins. The quote you receive is the price you pay, no surprises.",
      },
      {
        q: "How do I pay?",
        a: "We accept all major credit and debit cards and secure online payment. Payment is collected in full when you complete your booking.",
      },
      {
        q: "Do you offer discounts?",
        a: "We run a few standing offers: 20% off your first clean, a bundle deal (book 3, get the 4th free), and a $30 referral credit for both you and the friend you refer. Mention any of these when you book or request a quote and we'll apply it.",
      },
    ],
  },
  {
    category: "Quality & Guarantee",
    faqs: [
      {
        q: "What is your satisfaction guarantee?",
        a: "If you're not 100% happy with your clean, contact us within 24 hours and we'll return to fix any issues completely free of charge. No arguments, no hassle.",
      },
      {
        q: "What if something is damaged during a clean?",
        a: "All our cleaners are fully insured. In the rare event of accidental damage, contact us and we'll resolve it promptly through our insurance process.",
      },
      {
        q: "Do you offer a bond-back guarantee for move-out cleans?",
        a: "Yes. Our move-out clean is designed to meet real estate inspection standards. If any cleaning item is flagged at your inspection, we'll return to fix it at no cost.",
      },
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const categoryId = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-brand-border rounded-2xl overflow-hidden">
      <summary className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 cursor-pointer list-none hover:bg-brand-bg transition-colors">
        <span className="font-semibold text-brand-text text-sm">{q}</span>
        <ChevronDown className="w-4 h-4 text-brand-muted shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-4 sm:px-6 pb-4 sm:pb-5">
        <p className="text-sm text-brand-muted leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-brand-bg">

      {/* ── Hero ── */}
      {/* bg-brand-bg (not brand-surface) to match the body background the
          seamless floating navbar sits on — avoids a mismatched color strip
          in the navbar's clearance gap above this band. */}
      <section className="bg-brand-bg pt-6 sm:pt-10 pb-12 border-b border-brand-border">
        <Reveal className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-text leading-tight tracking-tight mb-4">
            Frequently asked{" "}
            <span className="text-brand-accent-dark">questions.</span>
          </h1>
          <p className="text-brand-muted text-lg leading-relaxed">
            Everything you need to know about booking, our team, products, and our guarantee. Can&apos;t find your answer? We&apos;re happy to help.
          </p>
          {/* Jump to a category: swipeable row on phones, wraps on desktop */}
          <nav aria-label="FAQ categories" className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex sm:flex-wrap gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FAQ_CATEGORIES.map(({ category }) => (
              <a
                key={category}
                href={`#${categoryId(category)}`}
                className="shrink-0 rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-text hover:border-brand-accent hover:text-brand-accent-dark transition-colors"
              >
                {category}
              </a>
            ))}
          </nav>
        </Reveal>
      </section>

      {/* ── FAQ Categories ── */}
      <section className="py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-12">
          {FAQ_CATEGORIES.map(({ category, faqs }, index) => (
            <Reveal key={category} delay={(index % 3) * 0.08} className="flex flex-col gap-4">
              <h2 id={categoryId(category)} className="scroll-mt-28 text-lg font-bold text-brand-text flex items-center gap-3">
                <span className="w-1 h-5 rounded-full bg-brand-accent inline-block" />
                {category}
              </h2>
              <div className="flex flex-col gap-2">
                {faqs.map((faq) => (
                  <FAQItem key={faq.q} {...faq} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section className="pb-20">
        <Reveal className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-brand to-brand-accent rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Still have a question?</h3>
              <p className="text-white/70 text-sm mt-1">Our team is happy to help, reach out any time.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-white text-brand-accent-dark hover:bg-brand-accent-bg font-semibold gap-2">
                <Link href={BUSINESS_PHONE_HREF}>
                  <Phone className="w-4 h-4" /> Call Us
                </Link>
              </Button>
              <Button asChild variant="link" className="border-white/30 text-white hover:bg-white/10 font-semibold gap-2">
                <Link href="/contact">
                  <MessageSquare className="w-4 h-4" /> Send a Message
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  );
}