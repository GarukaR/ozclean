import Link from "next/link";
import { Check, Sparkles, ArrowRight, Tag, Users, Gift, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Tier pricing ─────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Essential",
    price: "From $99",
    period: "per visit",
    description: "Perfect for small homes or light maintenance cleans.",
    features: [
      "Up to 2 bedrooms",
      "Kitchen & bathrooms",
      "Vacuuming & mopping",
      "Surface wipe-downs",
      "Fortnightly scheduling",
    ],
    excluded: ["Deep cleaning", "Window cleaning"],
    cta: { label: "Get Started", href: "/book?tier=essential" },
    featured: false,
    badge: null,
  },
  {
    name: "Standard",
    price: "From $159",
    period: "per visit",
    description: "Our most popular plan — great value for families and regular cleans.",
    features: [
      "Up to 4 bedrooms",
      "Full kitchen & bathrooms",
      "Vacuuming, mopping & dusting",
      "Inside appliances",
      "Weekly or fortnightly",
      "Same cleaner every visit",
    ],
    excluded: ["Window cleaning"],
    cta: { label: "Book Standard", href: "/book?tier=standard" },
    featured: true,
    badge: "Best Value",
  },
  {
    name: "Premium",
    price: "From $249",
    period: "per visit",
    description: "Everything included — the full SparkClean experience for your home or office.",
    features: [
      "Unlimited bedrooms",
      "Deep clean included",
      "Window cleaning",
      "Inside all appliances",
      "Priority scheduling",
      "Dedicated cleaner",
      "Satisfaction guarantee",
    ],
    excluded: [],
    cta: { label: "Go Premium", href: "/book?tier=premium" },
    featured: false,
    badge: null,
  },
];

// ─── Individual services ──────────────────────────────────────────────────────
const INDIVIDUAL = [
  { name: "Residential Clean", price: "From $80" },
  { name: "Commercial Clean", price: "From $150" },
  { name: "Deep Clean", price: "From $200" },
  { name: "Move In / Move Out", price: "From $180" },
  { name: "Window Cleaning", price: "From $60" },
];

// ─── Promotions ───────────────────────────────────────────────────────────────
const PROMOS = [
  {
    icon: Sparkles,
    label: "First Clean",
    deal: "20% off",
    description: "New customers get 20% off their first booking.",
    code: "FIRST20",
    color: "bg-brand/10 text-brand border-brand/20",
    iconBg: "bg-brand/15",
  },
  {
    icon: Gift,
    label: "Bundle Deal",
    deal: "Book 3, Get 1 Free",
    description: "Book any 3 cleans and get the 4th one completely free.",
    code: "BUNDLE4",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Users,
    label: "Referral Offer",
    deal: "$30 credit",
    description: "Refer a friend and both of you get $30 off your next clean.",
    code: "REFER30",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    iconBg: "bg-violet-100",
  },
  {
    icon: Sun,
    label: "Seasonal Promo",
    deal: "Spring special",
    description: "Book a deep clean this spring and save 15% — limited slots.",
    code: "SPRING15",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Pricing() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Pricing & Offers
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Simple pricing,{" "}
            <span className="text-brand">no surprises.</span>
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            Choose a plan that suits your needs or book individual services.
            Our bundles are priced to give you more for less.
          </p>
        </div>

        {/* ── Tier Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch mb-8">
          {TIERS.map(({ name, price, period, description, features, excluded, cta, featured, badge }) => (
            <div
              key={name}
              className={`
                relative rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 h-full
                ${featured
                  ? "bg-brand shadow-2xl shadow-brand/30 scale-[1.03]"
                  : "bg-brand-bg border border-brand-border hover:border-brand/40 hover:shadow-lg hover:shadow-brand/8"
                }
              `}
            >
              {/* Badge */}
              {badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-white text-brand border-brand/20 font-semibold px-4 shadow-md shadow-brand/20">
                    {badge}
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col gap-1.5">
                <h3 className={`text-lg font-bold ${featured ? "text-white" : "text-brand-text"}`}>
                  {name}
                </h3>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-3xl font-bold ${featured ? "text-white" : "text-brand-text"}`}>
                    {price}
                  </span>
                  <span className={`text-sm ${featured ? "text-white/70" : "text-brand-muted"}`}>
                    {period}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${featured ? "text-white/75" : "text-brand-muted"}`}>
                  {description}
                </p>
              </div>

              {/* Divider */}
              <div className={`h-px ${featured ? "bg-white/20" : "bg-brand-border"}`} />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${featured ? "bg-white/25" : "bg-brand/15"}`}>
                      <Check className={`w-2.5 h-2.5 ${featured ? "text-white" : "text-brand"}`} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${featured ? "text-white/90" : "text-brand-text"}`}>{f}</span>
                  </li>
                ))}
                {excluded.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 opacity-40">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gray-200">
                      <span className="text-gray-400 text-[10px] font-bold leading-none">✕</span>
                    </div>
                    <span className={`text-sm line-through ${featured ? "text-white/60" : "text-brand-muted"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className={`w-full font-semibold gap-1.5 mt-auto ${
                  featured
                    ? "bg-white text-brand hover:bg-brand-bg shadow-lg"
                    : "bg-brand hover:bg-brand-dark text-white shadow-md shadow-brand/20"
                }`}
              >
                <Link href={cta.href}>
                  {cta.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* ── Individual Services Strip ── */}
        <div className="rounded-2xl border border-brand-border bg-brand-bg px-6 py-5 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-brand-text">Prefer to book individually?</p>
              <p className="text-xs text-brand-muted mt-0.5">Pick only what you need — no commitment required.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {INDIVIDUAL.map(({ name, price }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 bg-white border border-brand-border rounded-xl px-3 py-2"
                >
                  <span className="text-xs font-medium text-brand-text">{name}</span>
                  <span className="text-xs font-bold text-brand">{price}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="border-brand text-brand hover:bg-brand/5 shrink-0 text-sm font-semibold"
            >
              <Link href="/services">View All →</Link>
            </Button>
          </div>
        </div>

        {/* ── Promotions ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Tag className="w-4 h-4 text-brand" />
            <p className="text-sm font-semibold text-brand-text uppercase tracking-widest">
              Current Offers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMOS.map(({ icon: Icon, label, deal, description, code, color, iconBg }) => (
              <div
                key={code}
                className={`rounded-2xl border p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200 ${color}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{label}</span>
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight">{deal}</p>
                  <p className="text-xs opacity-75 leading-relaxed mt-1">{description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-current/10 pt-3">
                  <code className="text-xs font-mono font-bold tracking-widest opacity-80 bg-white/40 px-2 py-1 rounded-md">
                    {code}
                  </code>
                  <Link
                    href="/book"
                    className="text-xs font-semibold hover:underline underline-offset-2 opacity-90"
                  >
                    Claim →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}