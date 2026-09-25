import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES, getAllServiceSlugs } from "@/lib/services";
import { ROUTES, bookingWithService } from "@/lib/routes";
import Reveal from "@/components/Reveal";
import { BUSINESS_ID, SERVICE_AREAS, SERVICE_REGION, SITE_URL, toJsonLd } from "@/lib/seo";

// ─── Static params for Next.js static export ─────────────────────────────────
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

// ─── Page metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  const path = `${ROUTES.SERVICES}/${service.slug}`;
  const description = `${service.description} Serving ${SERVICE_AREAS.slice(0, 4).join(", ")} and ${SERVICE_REGION}.`;
  // Bare title — the root layout's "%s | OzClean" template adds the brand.
  return {
    title: service.seoTitle,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${service.seoTitle} | OzClean`, description, url: `${SITE_URL}${path}` },
  };
}
// ─────────────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-brand-border rounded-2xl overflow-hidden">
      <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-brand-bg transition-colors">
        <span className="font-semibold text-brand-text text-sm">{q}</span>
        <ChevronDown className="w-4 h-4 text-brand-muted shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-5">
        <p className="text-sm text-brand-muted leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug];

  // Show 404 if slug doesn't exist in config
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.seoTitle,
            serviceType: service.title,
            description: service.description,
            url: `${SITE_URL}${ROUTES.SERVICES}/${service.slug}`,
            provider: { "@id": BUSINESS_ID },
            areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name: `${name}, VIC` })),
          }),
        }}
      />
      {/* ── Hero ── */}
      {/* No overflow-hidden here — CSS only lets one axis clip independently
          if you accept the other one silently becoming "auto" (which still
          clips), so a same-axis fix isn't possible. Instead both glows sit
          flush at right-0/left-0 with width capped at 88vw, so neither can
          exceed the viewport on narrow screens — nothing needs clipping,
          and the top glow's negative top offset can bleed upward past this
          section's edge into the navbar's clearance gap, fading out
          naturally instead of being hard-cropped at a seam. The bottom
          glow bleeding past this section's bottom edge is simply painted
          over by the next section's own background. */}
      <section className="bg-brand-bg pt-32 pb-20 relative">
        <div className="absolute -top-32 right-0 w-[min(600px,88vw)] h-[min(600px,88vw)] rounded-full bg-brand/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-0 w-[min(420px,88vw)] h-[min(420px,88vw)] rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <Reveal className="flex flex-col gap-6">
              {/* The keyword-led name is the real <h1> (what Google reads as the
                  page topic); the big tagline below is display copy. */}
              <h1 className="w-fit">
                <Badge className="bg-brand-accent-bg text-brand-accent-dark border-brand-accent-border w-fit gap-1.5 whitespace-normal text-left">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {service.seoTitle}
                </Badge>
              </h1>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                {service.tagline.split(".")[0]}.{" "}
                {service.tagline.split(".")[1] && (
                  <span className="text-brand-accent-dark">
                    {service.tagline.split(".")[1].trim()}.
                  </span>
                )}
              </p>
                <p className="text-brand-muted text-lg leading-relaxed max-w-md">
                {service.description}
              </p>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-2">
                {service.highlights.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 bg-brand-surface border border-brand-border rounded-full px-3 py-1.5"
                  >
                    <span>{icon}</span>
                    <span className="text-xs font-medium text-brand-text">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                {service.bookable && (
                  <Button
                    asChild
                    size="lg"
                      className="bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-2 shadow-lg shadow-brand-accent/25"
                  >
                    <Link href={bookingWithService(service.slug)}>
                      Book Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                )}

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                    className="border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold"
                >
                  <Link href={ROUTES.QUOTE}>Get a Free Quote</Link>
                </Button>
              </div>
            </Reveal>

            {/* Right — image */}
            <Reveal delay={0.15} className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-brand/15">
              <Image
                src={service.heroImage}
                alt={`${service.title} by OzClean in ${SERVICE_REGION}`}
                className="object-cover"
                fill
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="bg-brand-surface py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
                What&apos;s Included
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight mb-8">
                Everything covered,
                <br />
                nothing missed.
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span className="text-sm text-brand-text">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Pricing card */}
            <Reveal delay={0.15} className="bg-gradient-to-br from-brand to-brand-accent rounded-3xl p-8 flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
              <div className="relative flex flex-col gap-4">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                  Pricing
                </p>
                <div>
                  <p className="text-4xl font-black text-white">
                    {service.price}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {service.priceLabel}
                  </p>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">
                  {service.priceNote}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="bg-brand-bg py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
              FAQs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">
              Common questions.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-3">
            {service.faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={(index % 4) * 0.06}>
                <FAQItem {...faq} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-brand-muted text-sm mb-3">
              Still have questions?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-brand-accent text-brand-accent-dark hover:bg-brand-accent-bg gap-2"
            >
              <Link href="/contact">
                <Phone className="w-3.5 h-3.5" /> Contact our team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="bg-brand-surface py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-brand-muted uppercase tracking-widest mb-6">
            Related Services
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {service.related.map(({ slug, title, desc }, index) => (
              <Reveal key={slug} delay={index * 0.08}>
                <Link
                  href={`/services/${slug}`}
                  className="group bg-brand-bg rounded-2xl border border-brand-border p-5 hover:border-brand-accent/40 hover:shadow-md hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-all duration-300 flex flex-col gap-2"
                >
                  <p className="font-semibold text-brand-text group-hover:text-brand-accent-dark transition-colors">
                    {title}
                  </p>
                  <p className="text-sm text-brand-muted">{desc}</p>
                  <span className="text-xs text-brand font-semibold mt-1 flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
