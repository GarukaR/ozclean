import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import {
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_HREF,
  BUSINESS_PHONE,
  BUSINESS_PHONE_HREF,
} from "@/lib/business";
import ContactForm from "./ContactForm";
import Reveal from "@/components/Reveal";

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
    sub: "Mon–Sat, 8am–6pm",
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

const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "7:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "9:00 AM – 3:00 PM" },
  { day: "Public Holidays", hours: "By appointment" },
];

const CONNECT_OPTIONS = [
  {
    icon: Phone,
    title: "Call Us",
    desc: "Prefer to talk? Give us a call and we'll sort out your booking or query on the spot.",
    action: `Call ${BUSINESS_PHONE}`,
    href: BUSINESS_PHONE_HREF,
    style: "bg-gradient-to-br from-brand to-brand-accent text-white",
    btnStyle: "bg-white text-brand-accent-dark hover:bg-brand-accent-bg",
  },
  {
    icon: Mail,
    title: "Email Us",
    desc: "Send us an email and we'll get back to you within 2 business hours.",
    action: BUSINESS_EMAIL,
    href: BUSINESS_EMAIL_HREF,
    style: "bg-brand-accent-bg border border-brand-accent-border",
    btnStyle: "bg-brand-accent hover:bg-brand-accent-dark text-white",
  },
  {
    icon: ArrowRight,
    title: "Book Online",
    desc: "Know what you need? Skip the back-and-forth and book your clean directly.",
    action: "Book Now",
    href: ROUTES.BOOKING,
    style: "bg-brand-bg border border-brand-border",
    btnStyle: "bg-brand-accent hover:bg-brand-accent-dark text-white",
  },
];

const SERVICE_AREAS = [
  { name: "Hampton Park", travelCharges: false },
  { name: "Hallam", travelCharges: false },
  { name: "Endeavour Hills", travelCharges: false },
  { name: "Dandenong", travelCharges: false },
  { name: "Dandenong North", travelCharges: false },
  { name: "Noble Park", travelCharges: false },
  { name: "Clyde", travelCharges: false },
  { name: "Clyde North", travelCharges: false },
  { name: "Springvale", travelCharges: false },
  { name: "Springvale South", travelCharges: false },
  { name: "Lynbrook", travelCharges: false },
  { name: "Lyndhurst", travelCharges: false },
  { name: "Keysborough", travelCharges: false },
  { name: "Carrum Downs", travelCharges: false },
  { name: "Brighton East", travelCharges: false },
  { name: "Narre Warren", travelCharges: false },
  { name: "Narre Warren South", travelCharges: false },
  { name: "Cranbourne", travelCharges: false },
  { name: "Cranbourne North", travelCharges: false },
  { name: "Cranbourne East", travelCharges: false },
  { name: "Cranbourne West", travelCharges: false },
  { name: "Junction Village", travelCharges: false },
  { name: "Officer", travelCharges: false },
  { name: "Beaconsfield", travelCharges: false },
  { name: "Pakenham", travelCharges: false },
  { name: "Berwick", travelCharges: false },
  { name: "Huntingdale", travelCharges: true },
  { name: "Clayton", travelCharges: true },
  { name: "Mulgrave", travelCharges: true },
  { name: "Mount Waverley", travelCharges: true },
  { name: "Glen Waverley", travelCharges: true },
  { name: "Rowville", travelCharges: true },
  { name: "Cockatoo", travelCharges: true },
  { name: "Gembrook", travelCharges: true },
  { name: "Emerald", travelCharges: true },
  { name: "Pakenham Upper", travelCharges: true },
  { name: "Seaford", travelCharges: true },
  { name: "Frankston", travelCharges: true },
  { name: "Chelsea", travelCharges: true },
  { name: "Mordialloc", travelCharges: true },
  { name: "Mentone", travelCharges: true },
  { name: "Cheltenham", travelCharges: true },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-bg">

      {/* ── Hero ── */}
      <section className="bg-brand-surface pt-16 pb-16 border-b border-brand-border">
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
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONNECT_OPTIONS.map(({ icon: Icon, title, desc, action, href, style, btnStyle }, index) => {
              const isDarkCard = style.includes("text-white");
              return (
                <Reveal key={title} delay={index * 0.08} className="h-full">
                  <div className={`h-full rounded-3xl p-7 flex flex-col gap-4 hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-transform duration-300 ${style}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkCard ? "bg-white/20" : "bg-brand/10"}`}>
                      <Icon className={`w-5 h-5 ${isDarkCard ? "text-white" : "text-brand"}`} />
                    </div>
                    <div>
                      <p className={`font-bold text-lg ${isDarkCard ? "text-white" : "text-brand-text"}`}>{title}</p>
                      <p className={`text-sm mt-1 leading-relaxed ${isDarkCard ? "text-white/80" : "text-brand-muted"}`}>{desc}</p>
                    </div>
                    <Button asChild className={`w-full font-semibold mt-auto ${btnStyle}`}>
                      <Link href={href}>{action}</Link>
                    </Button>
                  </div>
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
            <h2 className="text-2xl font-bold text-brand-text mb-2">Service Areas</h2>
            <p className="text-brand-muted mb-6">
              We proudly serve the areas listed below. If you&apos;re unsure if we cover your area, just ask!
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SERVICE_AREAS.map(({name, travelCharges}) => (
                <li
                  key={name}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-accent-bg text-brand-text border border-brand-accent-border"
                >
                  <MapPin className="w-4 h-4 text-brand-accent-dark" />
                  <span className="text-sm">{name}</span>
                  {travelCharges && (
                    <span className="text-xs text-brand-muted ml-auto">(Travel Charges Apply)</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
