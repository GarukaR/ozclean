import Link from "next/link";
import Image from "next/image";
import { ArrowRight, AlarmClock, Clock, Heart, House, Leaf, MapPin, Receipt, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { ALL_SERVICE_AREAS } from "@/lib/service-areas";
import Reveal from "@/components/Reveal";
import AreaChecker from "@/components/AreaChecker";
import PromiseTiles, { type PromiseTile } from "@/components/PromiseTiles";

export const metadata = generatePageMeta({
  title: "About Us",
  description:
    "Meet OzClean, a local cleaning team based in Hampton Park. Airbnb turnovers, bond-back end of lease cleans, and home and business cleaning across South East Melbourne.",
  path: "/about",
});

// ─── Page content config ──────────────────────────────────────────────────────
// Values are promises we can keep, deliberately different from the homepage
// "Why us" tiles, and with no counts or ratings we can't back up.
const VALUES: PromiseTile[] = [
  {
    headline: "Always on time",
    detail: "We turn up when we say we will. If anything changes, you hear from us first.",
    tone: "accent",
    visual: { kind: "icons", icons: [AlarmClock] },
    watermark: Clock,
  },
  {
    headline: "Treated like ours",
    detail: "Every home and business gets the care we'd want in our own.",
    tone: "tint-blue",
    visual: { kind: "icons", icons: [Heart, House] },
    watermark: Heart,
  },
  {
    headline: "Planet-friendly",
    detail: "Non-toxic, biodegradable products. Clean without the chemical cost.",
    tone: "tint-teal",
    visual: { kind: "icons", icons: [Leaf, Recycle] },
    watermark: Leaf,
  },
  {
    headline: "Honest pricing",
    detail: "Clear, upfront quotes. No surprise extras on the day.",
    tone: "brand",
    visual: { kind: "text", text: "$", icon: Receipt },
    watermark: Receipt,
  },
];

const TEAM = [
  {
    name: "Kevin M",
    role: "Founder",
    bio: "Kevin started OzClean after one too many unreliable cleaners. He still leads the team with a focus on quality and looking after every customer.",
    avatar: "KM",
    avatarBg: "bg-gradient-to-br from-brand to-brand-dark text-white dark:text-[#0A1220]",
  },
  {
    name: "Ushi",
    role: "Customer Experience Lead",
    bio: "Ushi is your first point of contact, making sure every booking, question and concern is handled quickly and with care.",
    avatar: "US",
    avatarBg: "bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white dark:text-[#0A1220]",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero + story (merged: one photo-and-text block instead of two) ── */}
      {/* No overflow-hidden here: the glow is capped at 88vw so it never exceeds
          the viewport, and its negative top offset can bleed into the navbar's
          clearance gap instead of being hard-cropped at a seam. */}
      <section className="bg-brand-bg pt-6 sm:pt-10 pb-14 sm:pb-20 relative">
        <div className="absolute -top-32 right-0 w-[min(500px,88vw)] h-[min(500px,88vw)] rounded-full bg-brand/8 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <Reveal className="flex flex-col gap-5">
              <p className="text-brand text-sm font-semibold uppercase tracking-widest">About Us</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Cleaning with <span className="text-brand-accent-dark">purpose.</span>
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed">
                OzClean started in Hampton Park after one too many unreliable cleaners. Today we&apos;re a small local team
                specialising in fast Airbnb turnovers and bond-back end of lease cleans, plus home and business cleaning
                across South East Melbourne.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 px-7 bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-2 shadow-lg shadow-brand-accent/35">
                  <Link href={ROUTES.QUOTE}>Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold">
                  <Link href={ROUTES.SERVICES}>See Our Services</Link>
                </Button>
              </div>
            </Reveal>

            {/* Photo with a liquid-glass panel, same treatment as the service pages */}
            <Reveal delay={0.15} className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-brand/15">
              <Image
                src="https://images.pexels.com/photos/6195951/pexels-photo-6195951.jpeg"
                alt="OzClean cleaner at work in a Melbourne home"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 rounded-2xl border border-white/25 bg-gradient-to-br from-white/20 via-[#0C1A2E]/30 to-[#0F766E]/40 backdrop-blur-xl backdrop-saturate-150 px-4 py-3.5 sm:px-5 sm:py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-10px_rgba(0,0,0,0.45)] [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-bold leading-tight">Based in Hampton Park</p>
                  <p className="text-xs sm:text-sm text-white/80">
                    Serving {ALL_SERVICE_AREAS.length} suburbs across South East Melbourne
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-brand-surface py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">What we stand for.</h2>
          </Reveal>
          <PromiseTiles tiles={VALUES} />
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-brand-bg py-12 sm:py-20" id="team">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Meet the Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">The people behind your clean.</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {TEAM.map(({ name, role, bio, avatar, avatarBg }, index) => (
              <Reveal key={name} delay={index * 0.1} className="h-full">
                <div className="h-full bg-brand-surface rounded-3xl border border-brand-border p-5 sm:p-7 flex gap-4 sm:flex-col hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-transform duration-300">
                  <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-lg font-bold shadow-md ${avatarBg}`}>
                    {avatar}
                  </div>
                  <div className="flex flex-col gap-1.5 sm:gap-3">
                    <div>
                      <p className="font-bold text-brand-text text-lg leading-tight">{name}</p>
                      <p className="text-brand-accent-dark text-xs font-semibold uppercase tracking-wide mt-0.5">{role}</p>
                    </div>
                    <p className="text-sm text-brand-muted leading-relaxed">{bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service areas: checker + map ── */}
      <section className="bg-brand-surface py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Reveal>
              <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3 text-center lg:text-left">Where We Operate</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight mb-6 text-center lg:text-left">
                Do we clean in your area?
              </h2>
              <AreaChecker centerOnMobile />
            </Reveal>
            <Reveal delay={0.15} className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl border border-brand-border">
              <iframe
                src="https://www.google.com/maps?q=Hampton+Park+VIC+3976+Australia&z=11&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "260px" }}
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
      <section className="bg-gradient-to-r from-brand to-brand-accent py-12 sm:py-16">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-4 sm:gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready for a spotless result?</h2>
          <p className="text-white/80 text-base sm:text-lg max-w-xl">
            Tell us about your space and we&apos;ll send a clear, upfront quote.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-7 bg-white text-brand-accent-dark hover:bg-brand-accent-bg font-semibold gap-2 shadow-lg">
              <Link href={ROUTES.QUOTE}>Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="link" className="text-white font-semibold">
              <Link href={ROUTES.BOOKING}>Book a Home Clean</Link>
            </Button>
          </div>
        </Reveal>
      </section>

    </main>
  );
}
