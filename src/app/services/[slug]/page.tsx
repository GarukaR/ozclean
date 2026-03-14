import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES, getAllServiceSlugs } from "@/lib/services";

// ─── Static params for Next.js static export ─────────────────────────────────
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

// ─── Page metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  return {
    title: `${service.title} | SparkClean`,
    description: service.description,
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES[slug];

  // Show 404 if slug doesn't exist in config
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-brand-bg pt-32 pb-20 overflow-hidden relative">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand/8 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <div className="flex flex-col gap-6">
              <Badge className="bg-brand/10 text-brand border-brand/20 w-fit gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {service.title}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                {service.tagline.split(".")[0]}.{" "}
                {service.tagline.split(".")[1] && (
                  <span className="text-brand">{service.tagline.split(".")[1].trim()}.</span>
                )}
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed max-w-md">
                {service.description}
              </p>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-2">
                {service.highlights.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 bg-white border border-brand-border rounded-full px-3 py-1.5"
                  >
                    <span>{icon}</span>
                    <span className="text-xs font-medium text-brand-text">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand hover:bg-brand-dark text-white font-semibold gap-2 shadow-lg shadow-brand/25"
                >
                  <Link href={`/book?service=${service.slug}`}>
                    Book Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-brand-border text-brand-text hover:border-brand hover:text-brand font-semibold"
                >
                  <Link href="/quote">Get a Free Quote</Link>
                </Button>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-brand/15">
              <Image
                src={service.heroImage}
                alt={service.title}
                className="object-cover"
                fill
              />
              {/* Floating price card */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-brand-border">
                <p className="text-2xl font-black text-brand-text leading-none">{service.price}</p>
                <p className="text-xs text-brand-muted mt-1">{service.priceLabel}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
                What&apos;s Included
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight mb-8">
                Everything covered,<br />nothing missed.
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span className="text-sm text-brand-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing card */}
            <div className="bg-brand rounded-3xl p-8 flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
              <div className="relative flex flex-col gap-4">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                  Pricing
                </p>
                <div>
                  <p className="text-4xl font-black text-white">{service.price}</p>
                  <p className="text-white/60 text-sm mt-1">{service.priceLabel}</p>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">{service.priceNote}</p>
                <div className="h-px bg-white/20" />
                <ul className="flex flex-col gap-2.5">
                  {service.highlights.map(({ icon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-sm text-white/90">
                      <span>{icon}</span> {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="bg-brand-bg py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">FAQs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">
              Common questions.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {service.faqs.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-brand-muted text-sm mb-3">Still have questions?</p>
            <Button
              asChild
              variant="outline"
              className="border-brand text-brand hover:bg-brand/5 gap-2"
            >
              <Link href="/contact">
                <Phone className="w-3.5 h-3.5" /> Contact our team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-brand-muted uppercase tracking-widest mb-6">
            Related Services
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {service.related.map(({ slug, title, desc }) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="group bg-brand-bg rounded-2xl border border-brand-border p-5 hover:border-brand/40 hover:shadow-md transition-all duration-200 flex flex-col gap-2"
              >
                <p className="font-semibold text-brand-text group-hover:text-brand transition-colors">
                  {title}
                </p>
                <p className="text-sm text-brand-muted">{desc}</p>
                <span className="text-xs text-brand font-semibold mt-1 flex items-center gap-1">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}