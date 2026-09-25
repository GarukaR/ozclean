import { Phone, Mail, MapPin, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import {
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_HREF,
  BUSINESS_PHONE,
  BUSINESS_PHONE_HREF, BUSINESS_HOURS, BUSINESS_HOURS_SUMMARY } from "@/lib/business";
import ContactForm from "./ContactForm";
import Reveal from "@/components/Reveal";
import AreaChecker from "@/components/AreaChecker";

export const metadata = generatePageMeta({
  title: "Contact Us",
  description: "Get in touch with OzClean. Call, email, or send a message and we'll get back to you within 2 hours.",
  path: "/contact",
});

// ─── Config ───────────────────────────────────────────────────────────────────
const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Phone",
    value: BUSINESS_PHONE,
    href: BUSINESS_PHONE_HREF,
    sub: BUSINESS_HOURS_SUMMARY,
  },
  {
    icon: Mail,
    label: "Email",
    value: BUSINESS_EMAIL,
    href: BUSINESS_EMAIL_HREF,
    sub: "We reply within 2 hours",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Hampton Park, VIC",
    href: "#map",
    sub: "South East Melbourne centered around Hampton Park",
  },
];

const CONNECT_OPTIONS = [
  {
    icon: Phone,
    title: "Call Us",
    desc: "Sort out your booking or query on the spot.",
    action: `Call ${BUSINESS_PHONE}`,
    href: BUSINESS_PHONE_HREF,
    style: "bg-gradient-to-br from-brand to-brand-accent text-white",
    btnStyle: "bg-white text-brand-accent-dark hover:bg-brand-accent-bg",
  },
  {
    icon: Mail,
    title: "Email Us",
    desc: "We reply within 2 business hours.",
    action: BUSINESS_EMAIL,
    href: BUSINESS_EMAIL_HREF,
    style: "bg-brand-accent-bg border border-brand-accent-border",
    btnStyle: "bg-brand-accent hover:bg-brand-accent-dark text-white",
  },
  {
    icon: ArrowRight,
    title: "Book Online",
    desc: "Home cleans can be booked and paid online in a few minutes.",
    action: "Book a Home Clean",
    href: ROUTES.BOOKING,
    style: "bg-brand-bg border border-brand-border",
    btnStyle: "bg-brand-accent hover:bg-brand-accent-dark text-white",
  },
];


// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-bg">

      {/* ── Hero ── */}
      {/* bg-brand-bg (not brand-surface) so this band matches the body
          background the seamless floating navbar sits on — otherwise the
          gap the navbar clears shows as a mismatched color strip above a
          white band. The border-b below still marks where the next
          section begins. */}
      <section className="bg-brand-bg pt-6 sm:pt-10 pb-12 border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Contact Us</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-text leading-tight tracking-tight mb-4">
              We&apos;d love to{" "}
              <span className="text-brand-accent-dark">hear from you.</span>
            </h1>
            <p className="text-brand-muted text-lg leading-relaxed">
              Whether you have a question, want to book a clean, or just want to say hello, we&apos;re here and happy to help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Connect Options ── */}
      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
            {CONNECT_OPTIONS.map(({ icon: Icon, title, desc, action, href, style, btnStyle }, index) => {
              const isDarkCard = style.includes("text-white");
              return (
                <Reveal key={title} delay={index * 0.08} className="h-full">
                  {/* The whole card is the link. Phones get a compact row with a
                      chevron; wider screens get the full card with a button. */}
                  <a
                    href={href}
                    className={`group h-full rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-4 hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-transform duration-300 ${style}`}
                  >
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${isDarkCard ? "bg-white/20" : "bg-brand/10"}`}>
                      <Icon className={`w-5 h-5 ${isDarkCard ? "text-white" : "text-brand"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold sm:text-lg ${isDarkCard ? "text-white" : "text-brand-text"}`}>{title}</p>
                      <p className={`text-sm sm:mt-1 leading-snug sm:leading-relaxed truncate sm:whitespace-normal ${isDarkCard ? "text-white/80" : "text-brand-muted"}`}>
                        <span className="sm:hidden">{action}</span>
                        <span className="hidden sm:inline">{desc}</span>
                      </p>
                    </div>
                    <ChevronRight className={`sm:hidden w-5 h-5 shrink-0 ${isDarkCard ? "text-white/80" : "text-brand-muted"}`} />
                    <span className={`hidden sm:flex h-9 items-center justify-center rounded-md text-sm w-full font-semibold mt-auto transition-colors ${btnStyle}`}>
                      {action}
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Info ── */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Form */}
            <Reveal className="lg:col-span-2 bg-brand-surface rounded-3xl border border-brand-border shadow-sm overflow-hidden">
              <ContactForm />
            </Reveal>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">

              {/* Contact details */}
              <Reveal delay={0.1} className="bg-brand-surface rounded-3xl border border-brand-border p-6 flex flex-col gap-4">
                <p className="font-bold text-brand-text">Contact Details</p>
                <ul className="flex flex-col gap-4">
                  {CONTACT_DETAILS.map(({ icon: Icon, label, value, href, sub }) => (
                    <li key={label}>
                      <a href={href} className="flex items-start gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-brand-accent-bg border border-brand-accent-border flex items-center justify-center shrink-0 group-hover:bg-brand-accent/10 transition-colors">
                          <Icon className="w-4 h-4 text-brand-accent-dark" />
                        </div>
                        <div>
                          <p className="text-xs text-brand-muted">{label}</p>
                          <p className="text-sm font-semibold text-brand-text group-hover:text-brand-accent-dark transition-colors">{value}</p>
                          <p className="text-xs text-brand-muted mt-0.5">{sub}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Business hours */}
              <Reveal delay={0.18} className="bg-brand-surface rounded-3xl border border-brand-border p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-accent-dark" />
                  <p className="font-bold text-brand-text">Business Hours</p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {BUSINESS_HOURS.map(({ day, hours }) => (
                    <li key={day} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-brand-muted">{day}</span>
                      <span className="text-sm font-semibold text-brand-text">{hours}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section id="map" className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="bg-brand-surface rounded-3xl border border-brand-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-brand-text mb-2">Do we cover your area?</h2>
            <p className="text-brand-muted mb-6">
              Type your suburb or postcode. If you&apos;re just outside our list, ask anyway.
            </p>
            <AreaChecker />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
