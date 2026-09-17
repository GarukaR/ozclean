import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Leaf, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import Reveal from "@/components/Reveal";

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
    desc: "We treat every home and business as if it were our own. The details matter, and we never cut corners.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Cleaning",
    desc: "All our products are non-toxic and biodegradable. Clean spaces shouldn't come at the cost of the planet.",
  },
  {
    icon: Star,
    title: "Results That Speak",
    desc: "1,000+ cleans and a 4.75-star average rating. Our work earns repeat customers, not just one-off bookings.",
  },
];

const TEAM = [
  {
    name: "Kevin M",
    role: "Founder & CEO",
    bio: "Kevin started OzClean in 2019 after noticing a gap in reliable, eco-friendly cleaning services in Melbourne. He leads the team with a focus on quality and customer care.",
    avatar: "KM",
    avatarBg: "bg-brand/15 text-brand",
  },
  {
    name: "Ushi",
    role: "Customer Experience Lead",
    bio: "Ushi is the first point of contact for all our customers. She makes sure every booking, query, and concern is handled with care and efficiency.",
    avatar: "US",
    avatarBg: "bg-brand-accent-bg text-brand-accent-dark border border-brand-accent-border",
  },
];

// Shortened list of service areas (simple list of names).
// Includes Hampton Park and nearby suburbs.
const SERVICE_AREAS = [
  "Hampton Park",
  "Hallam",
  "Endeavour Hills",
  "Dandenong",
  "Noble Park",
  "Keysborough",
  "Springvale",
  "Cranbourne",
  "Narre Warren",
  "Berwick",
];

const STATS = [
  { value: "2019", label: "Founded" },
  { value: "1000+", label: "Cleans completed" },
  { value: "100+", label: "Happy customers" },
  { value: "4.75★", label: "Average rating" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-brand-bg pt-16 pb-20 relative overflow-hidden">
        {/* top-0, not a negative offset — a negative top gets hard-cropped
            by this section's own overflow-hidden right at its top edge,
            which reads as a seam against the plain (glow-less) navbar
            clearance gap directly above. Fully inside the section, the
            blur fades out on its own with no crop line. */}
        <div className="absolute top-0 -right-32 w-[500px] h-[500px] rounded-full bg-brand/8 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="flex flex-col gap-6">
              <p className="text-brand text-sm font-semibold uppercase tracking-widest">
                About Us
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Cleaning with{" "}
                <span className="text-brand-accent-dark">purpose.</span>
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed">
                OzClean was built on a simple belief that everyone deserves a clean, healthy space. Since 2019, we&apos;ve specialised in fast Airbnb turnovers and bond-back move-out cleans, alongside residential and commercial services across Melbourne.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-brand hover:bg-brand-dark text-white font-semibold gap-2 shadow-lg shadow-brand/25">
                  <Link href={ROUTES.QUOTE}>Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild variant="outline" className="border-brand-border hover:border-brand text-brand-text font-semibold">
                  <Link href={ROUTES.CONTACT}>Get in Touch</Link>
                </Button>
              </div>
            </Reveal>

            {/* Hero image */}
            <Reveal delay={0.15} className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-brand/10">
              <Image
                src="https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg"
                alt="OzClean cleaner at work in a Melbourne home"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2E]/20 to-transparent" />
            </Reveal>
          </div>

          {/* Stats strip */}
          <Reveal delay={0.2} className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-brand-border">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-brand-text">{value}</p>
                <p className="text-sm text-brand-muted mt-1">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-brand-surface py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="relative rounded-3xl overflow-hidden aspect-square shadow-xl">
              <Image
                src="https://images.pexels.com/photos/6195131/pexels-photo-6195131.jpeg"
                alt="OzClean cleaner tidying a bright modern home"
                fill
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col gap-5">
              <p className="text-brand text-sm font-semibold uppercase tracking-widest">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
                Started in 2019 with a mop and a mission.
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed">
                <strong>Kevin</strong> started OzClean in Hampton Park after one too many unreliable cleaners. What began as a one-man operation is now a small, trusted team serving homes and businesses across Melbourne.
              </p>
              <Button asChild className="bg-brand hover:bg-brand-dark text-white font-semibold gap-2 w-fit">
                <Link href={ROUTES.SERVICES}>See Our Services <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-brand-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">
              What we stand for.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }, index) => (
              <Reveal key={title} delay={index * 0.08} className="h-full">
                <div className="h-full bg-brand-surface rounded-3xl border border-brand-border p-7 flex flex-col gap-4 hover:border-brand-accent/40 hover:shadow-md hover:shadow-brand-accent/10 hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-all duration-300">
                  <div className="w-11 h-11 rounded-2xl bg-brand-accent-bg border border-brand-accent-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-accent-dark" />
                  </div>
                  <h3 className="font-bold text-brand-text">{title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-brand-surface py-20" id="team">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Meet the Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">
              The people behind your clean.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, bio, avatar, avatarBg }, index) => (
              <Reveal key={name} delay={index * 0.1} className="h-full">
                <div className="h-full bg-brand-bg rounded-3xl border border-brand-border p-7 flex flex-col gap-4 hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-transform duration-300">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold ${avatarBg}`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="font-bold text-brand-text text-lg">{name}</p>
                    <p className="text-brand-accent-dark text-xs font-semibold uppercase tracking-wide mt-0.5">{role}</p>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed">{bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section className="bg-brand-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Where We Operate</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight mb-4">
                Serving South-East Melbourne.
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-8">
                Don&apos;t see your area? Get in touch, we&apos;re expanding regularly.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {SERVICE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="bg-brand-surface border border-brand-border text-brand-text text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <Button asChild variant="outline" className="border-brand-accent-border text-brand-accent-dark hover:bg-brand-accent-bg hover:border-brand-accent font-semibold gap-2">
                <Link href="/contact">Check Your Area <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </Reveal>
            <Reveal delay={0.15} className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl border border-brand-border">
              <iframe
                src="https://www.google.com/maps?q=Hampton+Park+VIC+3976+Australia&z=12&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OzClean service area map"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-gradient-to-r from-brand to-brand-accent py-16">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to experience the difference?</h2>
          <p className="text-white/70 text-lg max-w-xl">
            Join thousands of satisfied customers across Melbourne. Book your first clean today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-brand-accent-dark hover:bg-brand-accent-bg font-semibold gap-2 shadow-lg">
              <Link href={ROUTES.BOOKING}>Book Now <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="link" className="border-white/30 text-white hover:bg-white/10 font-semibold">
              <Link href={ROUTES.CONTACT}>Contact Us</Link>
            </Button>
          </div>
        </Reveal>
      </section>

    </main>
  );
}