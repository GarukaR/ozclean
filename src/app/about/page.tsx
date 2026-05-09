import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Heart, Leaf, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

export const metadata = generatePageMeta({
  title: "About Us",
  description: "Meet the OzClean team. Founded in Melbourne in 2019, we deliver trusted, eco-friendly cleaning services to thousands of happy customers.",
  path: "/about",
});

// ─── Page content config ──────────────────────────────────────────────────────
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust & Reliability",
    desc: "We show up on time, every time. Our team is vetted, insured, and held to the highest standards on every job.",
  },
  {
    icon: Heart,
    title: "Care in Everything",
    desc: "We treat every home and business as if it were our own. The details matter — and we never cut corners.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Cleaning",
    desc: "All our products are non-toxic and biodegradable. Clean spaces shouldn't come at the cost of the planet.",
  },
  {
    icon: Star,
    title: "Results That Speak",
    desc: "Over 10,000 cleans and a 4.9-star average rating. Our work earns repeat customers, not just one-off bookings.",
  },
];

const TEAM = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Sarah started OzClean in 2019 after noticing a gap in reliable, eco-friendly cleaning services in Melbourne. She leads the team with a focus on quality and customer care.",
    avatar: "SM",
    avatarBg: "bg-brand/15 text-brand",
  },
  {
    name: "James Okoye",
    role: "Head of Operations",
    bio: "James oversees scheduling, staff training, and quality control. He ensures every clean meets the OzClean standard — no exceptions.",
    avatar: "JO",
    avatarBg: "bg-brand-accent-bg text-brand-accent-dark border border-brand-accent-border",
  },
  {
    name: "Priya Sharma",
    role: "Customer Experience Lead",
    bio: "Priya is the first point of contact for all our customers. She makes sure every booking, query, and concern is handled with care and efficiency.",
    avatar: "PS",
    avatarBg: "bg-brand-accent-bg text-brand-accent-dark border border-brand-accent-border",
  },
];

const SERVICE_AREAS = [
  "Melbourne CBD", "Fitzroy", "Richmond", "South Yarra",
  "St Kilda", "Prahran", "Brunswick", "Collingwood",
  "Docklands", "Southbank", "Carlton", "Northcote",
];

const STATS = [
  { value: "2019", label: "Founded" },
  { value: "500+", label: "Cleans completed" },
  { value: "500+", label: "Happy customers" },
  { value: "4.75★", label: "Average rating" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-brand-bg pt-32 pb-20 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand/8 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <p className="text-brand text-sm font-semibold uppercase tracking-widest">
                  About Us
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Cleaning with{" "}
                <span className="text-brand-accent-dark">purpose.</span>
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed">
                OzClean was built on a simple belief that everyone deserves a clean, healthy space. Since 2019, we&apos;ve been delivering that promise to thousands of homes and businesses across Melbourne.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-brand hover:bg-brand-dark text-white font-semibold gap-2 shadow-lg shadow-brand/25">
                  <Link href={ROUTES.QUOTE}>Get a Quote <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="border-brand-border hover:border-brand text-brand-text font-semibold">
                  <Link href={ROUTES.CONTACT}>Get in Touch</Link>
                </Button>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-brand/10">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="OzClean team at work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-text/20 to-transparent" />
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-brand-border">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-brand-text">{value}</p>
                <p className="text-sm text-brand-muted mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden aspect-square shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                alt="OzClean founder"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-brand text-sm font-semibold uppercase tracking-widest">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
                Started in 2019 with a mop and a mission.
              </h2>
              <div className="flex flex-col gap-4 text-brand-muted text-sm leading-relaxed">
                <p>
                  OzClean started when our founder Sarah Mitchell couldn&apos;t find a cleaning service she could actually trust. After years of unreliable bookings, inconsistent results, and harsh chemicals, she decided to build something better.
                </p>
                <p>
                  What began as a one-woman operation in Fitzroy has grown into a team of 30+ dedicated professionals serving hundreds of homes and businesses across greater Melbourne.
                </p>
                <p>
                  The mission hasn&apos;t changed — deliver spotless results, with people you can trust, using products that are safe for your family and the environment.
                </p>
              </div>
              <Button asChild className="bg-brand hover:bg-brand-dark text-white font-semibold gap-2 w-fit">
                <Link href={ROUTES.SERVICES}>See Our Services <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-brand-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">
              What we stand for.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-3xl border border-brand-border p-7 flex flex-col gap-4 hover:border-brand-accent/40 hover:shadow-md hover:shadow-brand-accent/10 transition-all duration-200">
                <div className="w-11 h-11 rounded-2xl bg-brand-accent-bg border border-brand-accent-border flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-accent-dark" />
                </div>
                <h3 className="font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-white py-20" id="team">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Meet the Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">
              The people behind your clean.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, bio, avatar, avatarBg }) => (
              <div key={name} className="bg-brand-bg rounded-3xl border border-brand-border p-7 flex flex-col gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold ${avatarBg}`}>
                  {avatar}
                </div>
                <div>
                  <p className="font-bold text-brand-text text-lg">{name}</p>
                  <p className="text-brand-accent-dark text-xs font-semibold uppercase tracking-wide mt-0.5">{role}</p>
                </div>
                <p className="text-sm text-brand-muted leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section className="bg-brand-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Where We Operate</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight mb-4">
                Serving greater Melbourne.
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-8">
                We currently service Melbourne&apos;s inner suburbs and CBD. Don&apos;t see your area? Get in touch, we&apos;re expanding regularly.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {SERVICE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="bg-white border border-brand-border text-brand-text text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <Button asChild variant="outline" className="border-brand-accent-border text-brand-accent-dark hover:bg-brand-accent-bg hover:border-brand-accent font-semibold gap-2">
                <Link href="/contact">Check Your Area <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl border border-brand-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201754.59039748546!2d144.7851573!3d-37.9716858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1699999999999"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OzClean service area map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-gradient-to-r from-brand to-brand-accent py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to experience the difference?</h2>
          <p className="text-white/70 text-lg max-w-xl">
            Join thousands of satisfied customers across Melbourne. Book your first clean today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-brand-accent-dark hover:bg-brand-accent-bg font-semibold gap-2 shadow-lg">
              <Link href={ROUTES.BOOKING}>Book a Clean <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="link" className="border-white/30 text-white hover:bg-white/10 font-semibold">
              <Link href={ROUTES.CONTACT}>Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}