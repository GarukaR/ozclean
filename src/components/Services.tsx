import Link from "next/link";
import { Building2, Home, Sparkles, ArrowLeftRight, Wind, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Config: Add, remove or edit services here ────────────────────────────────
type Service = {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    features: string[];
    href: string;
    featured: boolean;
    price: string | null;
    priceLabel: string | null;
};

const SERVICES: Service[] = [
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description:
      "Tailored cleaning solutions for offices, retail spaces, and commercial properties. We work around your hours so your business is always at its best.",
    features: ["Office & retail spaces", "After-hours scheduling", "Weekly or daily plans"],
    href: "/services/commercial",
    featured: true, // ← only one card should have featured: true
    price: "From $150",
    priceLabel: "per session",
  },
  {
    icon: Home,
    title: "Residential Cleaning",
    description:
      "Regular home cleaning that keeps every room fresh, tidy, and welcoming. Customised to your home size and preferences.",
    features: ["All rooms covered", "Fortnightly or weekly", "Same cleaner every time"],
    href: "/services/residential",
    featured: false,
    price: "From $80",
    priceLabel: "per visit",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description:
      "A thorough top-to-bottom clean for homes or offices that need extra attention. Perfect for spring cleans or before a big event.",
    features: ["Inside appliances", "Grout & tile scrubbing", "Ceiling to floor"],
    href: "/services/deep-clean",
    featured: false,
    price: "From $200",
    priceLabel: "per session",
  },
  {
    icon: ArrowLeftRight,
    title: "Move In / Move Out",
    description:
      "Leave your old place spotless or start fresh in your new one. We help you meet lease requirements and get your bond back.",
    features: ["Bond clean guarantee", "Landlord approved", "Flexible timing"],
    href: "/services/move",
    featured: false,
    price: "From $180",
    priceLabel: "per property",
  },
  {
    icon: Wind,
    title: "Window Cleaning",
    description:
      "Crystal-clear windows inside and out. We use streak-free techniques for residential and multi-storey commercial buildings.",
    features: ["Inside & outside", "Streak-free finish", "Multi-storey available"],
    href: "/services/windows",
    featured: false,
    price: "From $250",
    priceLabel: "per storey",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="relative rounded-3xl bg-brand p-8 flex flex-col gap-6 overflow-hidden shadow-2xl shadow-brand/30 h-full">
      {/* Background decoration */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative flex flex-col gap-6 h-full">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Badge className="bg-white/20 text-white border-white/20 text-xs font-semibold">
            Most Popular
          </Badge>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
          <p className="text-white/75 text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2.5">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                  <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto pt-6 border-t border-white/20 flex items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-xl leading-none">{service.price}</p>
            <p className="text-white/60 text-xs mt-1">{service.priceLabel}</p>
          </div>
          <Button
            asChild
            className="bg-white text-brand hover:bg-brand-bg font-semibold shadow-lg gap-1.5 shrink-0"
          >
            <Link href={service.href}>
              Get Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="group relative rounded-3xl border border-brand-border bg-brand-bg p-7 flex flex-col gap-5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/8 transition-all duration-300 overflow-hidden h-full">
      {/* Hover circle */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-brand/5 group-hover:bg-brand/10 transition-colors duration-300 pointer-events-none" />

      <div className="relative flex flex-col gap-4 h-full">
        {/* Icon + Price */}
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-2xl bg-brand/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-brand" />
          </div>
          <div className="text-right">
            <p className="text-brand-text font-bold text-base leading-none">{service.price}</p>
            <p className="text-brand-muted text-xs mt-1">{service.priceLabel}</p>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-brand-text">{service.title}</h3>
          <p className="text-brand-muted text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-brand-muted">
              <div className="w-1 h-1 rounded-full bg-brand shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <div className="mt-auto pt-4 border-t border-brand-border">
          <Link
            href={service.href}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all duration-200"
          >
            Learn more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const featured = SERVICES.find((s) => s.featured);
  const regular = SERVICES.filter((s) => !s.featured);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
              Services built around{" "}
              <span className="text-brand">your needs.</span>
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-brand-border text-brand-text hover:border-brand hover:text-brand shrink-0 self-start sm:self-auto"
          >
            <Link href="/services">View all services</Link>
          </Button>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-row-3 lg:grid-cols-3 lg:grid-row-2 gap-6 items-start">
          {/* Featured card — full height left column on large screens */}
          {featured && (
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:self-stretch">
              <FeaturedCard service={featured} />
            </div>
          )}

          {/* Regular cards */}
          {regular.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 text-center">
          <p className="text-brand-muted text-sm mb-4">
            Not sure which service is right for you?
          </p>
          <Button
            asChild
            className="bg-brand hover:bg-brand-dark text-white font-semibold shadow-md shadow-brand/20 gap-2"
          >
            <Link href="/quote">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}