import Link from "next/link";
import { Check, X, Minus, ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Services config ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    slug:     "residential",
    name:     "General Cleaning",
    tagline:  "Regular home maintenance",
    href:     "/quote",
    featured: false,
    badge:    null,
  },
  {
    slug:     "deep-clean",
    name:     "Deep Cleaning",
    tagline:  "Complete top-to-bottom reset",
    href:     "/quote",
    featured: true,
    badge:    "Most Thorough",
  },
  {
    slug:     "move",
    name:     "Move In / Move Out",
    tagline:  "Bond-back end of lease clean",
    href:     "/quote",
    featured: false,
    badge:    null,
  },
];

// ─── Comparison rows ──────────────────────────────────────────────────────────
// true  = included  → green check
// false = excluded  → grey ✕
// null  = on request → dash

type RowValue = boolean | null;

const COMPARISON_ROWS: {
  group:  string;
  label:  string;
  values: [RowValue, RowValue, RowValue];
}[] = [
  // ── Standard tasks ──
  { group: "Standard Tasks",     label: "All bedrooms cleaned & dusted",        values: [true,  true,  true]  },
  { group: "Standard Tasks",     label: "Kitchen surfaces, sink & stovetop",    values: [false,  true,  true]  },
  { group: "Standard Tasks",     label: "Bathrooms & toilets scrubbed",         values: [true,  true,  true]  },
  { group: "Standard Tasks",     label: "Vacuuming all floors & rugs",          values: [true,  true,  true]  },
  { group: "Standard Tasks",     label: "Mopping all hard floors",              values: [true,  true,  true]  },
  { group: "Standard Tasks",     label: "Mirrors & glass surfaces",             values: [true,  true,  true]  },
  { group: "Standard Tasks",     label: "Bins emptied throughout",              values: [true,  true,  true]  },
  { group: "Standard Tasks",     label: "Light dusting of surfaces",            values: [true,  true,  true]  },
  // ── Deep cleaning ──
  { group: "Deep Cleaning",      label: "Inside oven & microwave",              values: [false, true,  true]  },
  { group: "Deep Cleaning",      label: "Inside fridge",                        values: [false, true,  true]  },
  { group: "Deep Cleaning",      label: "Behind & under appliances",            values: [false, true,  false] },
  { group: "Deep Cleaning",      label: "Grout lines scrubbed & treated",       values: [false, true,  true]  },
  { group: "Deep Cleaning",      label: "Skirting boards top to bottom",        values: [false, true,  true]  },
  { group: "Deep Cleaning",      label: "Window sills & tracks",                values: [false, true,  true]  },
  { group: "Deep Cleaning",      label: "Ceiling fans & light fittings",        values: [false, true,  false] },
  { group: "Deep Cleaning",      label: "Walls spot-cleaned",                   values: [false, true,  true]  },
  { group: "Deep Cleaning",      label: "All vents & exhaust fans",             values: [false, true,  false] },
  // ── Move specific ──
  { group: "Move In / Move Out", label: "Inside all cupboards & wardrobes",     values: [false, true,  true]  },
  { group: "Move In / Move Out", label: "Rubbish removed from property",        values: [false, false, true]  },
  { group: "Move In / Move Out", label: "Real estate checklist followed",       values: [false, false, true]  },
  { group: "Move In / Move Out", label: "Bond-back guarantee",                  values: [false, false, true]  },
  { group: "Move In / Move Out", label: "Free re-clean if inspection fails",    values: [false, false, true]  },
  // ── Scheduling ──
  { group: "Scheduling",         label: "One-off booking available",            values: [true,  true,  true]  },
  { group: "Scheduling",         label: "Weekly / fortnightly recurring",       values: [true,  false, false] },
  { group: "Scheduling",         label: "Same cleaner each visit",              values: [true,  null,  null]  },
];

// ─────────────────────────────────────────────────────────────────────────────

// Group comparison rows by category
function groupRows(rows: typeof COMPARISON_ROWS) {
  const result: { name: string; rows: typeof COMPARISON_ROWS }[] = [];
  let current: { name: string; rows: typeof COMPARISON_ROWS } | null = null;
  for (const row of rows) {
    if (!current || current.name !== row.group) {
      current = { name: row.group, rows: [] };
      result.push(current);
    }
    current.rows.push(row);
  }
  return result;
}

function ValueIcon({ value }: { value: RowValue }) {
  if (value === true) {
    return (
      <div className="w-5 h-5 rounded-full bg-brand/15 flex items-center justify-center mx-auto">
        <Check className="w-3 h-3 text-brand" strokeWidth={3} />
      </div>
    );
  }
  if (value === null) {
    return (
      <div className="flex flex-col items-center gap-0.5 mx-auto">
        <Minus className="w-3.5 h-3.5 text-brand-muted/40" strokeWidth={2} />
        <span className="text-[9px] text-brand-muted/50 leading-none whitespace-nowrap">on request</span>
      </div>
    );
  }
  return <X className="w-3.5 h-3.5 text-brand-muted/30 mx-auto" strokeWidth={2.5} />;
}

export default function Compare() {
  const groups = groupRows(COMPARISON_ROWS);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Compare Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight tracking-tight">
            Find the right clean{" "}
            <span className="text-brand">for your needs.</span>
          </h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            Not all cleans are equal. See exactly what&apos;s included in each service
            so you can book with confidence.
          </p>
        </div>

        {/* ── Comparison Table ── */}
        <div className="rounded-3xl border border-brand-border overflow-hidden shadow-sm mb-6">

          {/* ── Service header columns ── */}
          <div className="grid grid-cols-4 border-b border-brand-border">

            {/* Top-left label cell */}
            <div className="p-5 bg-brand-bg border-r border-brand-border flex items-end">
              <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest">
                What&apos;s included
              </p>
            </div>

            {/* Service columns */}
            {SERVICES.map(({ slug, name, tagline, href, featured, badge }, i) => (
              <div
                key={slug}
                className={`p-5 flex flex-col gap-3 relative pt-8
                  ${featured ? "bg-brand" : "bg-brand-bg"}
                  ${i < SERVICES.length - 1 ? "border-r border-brand-border" : ""}
                `}
              >
                {badge && (
                  <div className="absolute top-3 inset-x-0 flex justify-center -translate-y-1/2">
                    <Badge className={`font-semibold px-3 text-[10px] shadow-md
                      ${featured
                        ? "bg-white text-brand border-brand/20 shadow-brand/20"
                        : "bg-brand text-white border-transparent shadow-brand/15"
                      }`}>
                      {badge}
                    </Badge>
                  </div>
                )}

                <div>
                  <p className={`font-bold text-sm ${featured ? "text-white" : "text-brand-text"}`}>
                    {name}
                  </p>
                  <p className={`text-xs mt-0.5 leading-snug ${featured ? "text-white/65" : "text-brand-muted"}`}>
                    {tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Grouped comparison rows ── */}
          {groups.map(({ name: groupName, rows }, gi) => (
            <div key={groupName}>

              {/* Group heading */}
              <div className="grid grid-cols-4 bg-brand-text/[0.03] border-b border-brand-border">
                <div className="col-span-4 px-5 py-2.5 flex items-center gap-2">
                  <span className="w-1 h-3.5 rounded-full bg-brand inline-block shrink-0" />
                  <span className="text-[11px] font-bold text-brand-text uppercase tracking-widest">
                    {groupName}
                  </span>
                </div>
              </div>

              {/* Feature rows */}
              {rows.map(({ label, values }, ri) => {
                const isLast = gi === groups.length - 1 && ri === rows.length - 1;
                return (
                  <div
                    key={label}
                    className={`grid grid-cols-4 hover:bg-brand-bg/60 transition-colors duration-150
                      ${!isLast ? "border-b border-brand-border/50" : ""}`}
                  >
                    {/* Label */}
                    <div className="px-5 py-3.5 flex items-center border-r border-brand-border/50">
                      <span className="text-sm text-brand-text">{label}</span>
                    </div>

                    {/* Value cells */}
                    {values.map((val, vi) => (
                      <div
                        key={vi}
                        className={`px-4 py-3.5 flex items-center justify-center
                          ${SERVICES[vi].featured ? "bg-brand/[0.05]" : ""}
                          ${vi < values.length - 1 ? "border-r border-brand-border/50" : ""}
                        `}
                      >
                        <ValueIcon value={val} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}

          {/* ── Bottom CTA row ── */}
          <div className="grid grid-cols-4 bg-brand-bg border-t border-brand-border">
            <div className="p-5 border-r border-brand-border flex items-center">
              <p className="text-xs text-brand-muted leading-relaxed">
                Not sure which service fits?{" "}
                <Link href="/contact" className="text-brand font-semibold hover:underline underline-offset-2">
                  Ask us →
                </Link>
              </p>
            </div>
            {SERVICES.map(({ slug, href, featured }, i) => (
              <div
                key={slug}
                className={`p-4 flex items-center justify-center
                  ${SERVICES[i].featured ? "bg-brand/[0.05]" : ""}
                  ${i < SERVICES.length - 1 ? "border-r border-brand-border" : ""}
                `}
              >
                <Button
                  asChild
                  size="sm"
                  className={`w-full text-xs font-semibold gap-1
                    ${featured
                      ? "bg-brand hover:bg-brand-dark text-white shadow-md shadow-brand/20"
                      : "bg-white hover:bg-brand-bg border border-brand-border text-brand-text hover:border-brand/40"
                    }`}
                >
                  <Link href={href}>
                    Quote Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16 text-xs text-brand-muted">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-brand/15 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-brand" strokeWidth={3} />
            </div>
            Included
          </div>
          <div className="flex items-center gap-1.5">
            <Minus className="w-3.5 h-3.5 text-brand-muted/40 shrink-0" />
            Available on request
          </div>
          <div className="flex items-center gap-1.5">
            <X className="w-3.5 h-3.5 text-brand-muted/30 shrink-0" />
            Not included
          </div>
        </div>
      </div>
    </section>
  );
}