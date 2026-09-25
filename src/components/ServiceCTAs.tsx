import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES, bookingWithService } from "@/lib/routes";
import { BUSINESS_PHONE, BUSINESS_PHONE_HREF } from "@/lib/business";
import type { Service } from "@/lib/services";

// ─── Calls to action for a service page ──────────────────────────────────────
// Primary = the one thing we want next: "Book Now" for bookable services,
// "Get a Free Quote" for quote-only ones. It's a solid, glowing button so it
// can't be mistaken for a secondary link. Secondary = a quote (bookable) or a
// phone call (quote-only), since calling converts well for local services.

export function primaryAction(service: Service) {
  return service.bookable
    ? { label: "Book Now", href: bookingWithService(service.slug) }
    : { label: "Get a Free Quote", href: ROUTES.QUOTE };
}

export const PRIMARY_CTA_CLASS =
  "bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold gap-2 shadow-lg shadow-brand-accent/35 hover:shadow-xl hover:shadow-brand-accent/40 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all";

export default function ServiceCTAs({ service, size = "lg" }: { service: Service; size?: "lg" | "default" }) {
  const primary = primaryAction(service);
  const tall = size === "lg" ? "h-12 px-7 text-base" : "";

  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size={size} className={`${PRIMARY_CTA_CLASS} ${tall}`}>
        <Link href={primary.href}>
          {primary.label} <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
      {service.bookable ? (
        <Button asChild size={size} variant="outline" className={`border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold ${tall}`}>
          <Link href={ROUTES.QUOTE}>Get a Free Quote</Link>
        </Button>
      ) : (
        <Button asChild size={size} variant="outline" className={`border-brand-accent-border text-brand-text hover:border-brand-accent hover:text-brand-accent-dark font-semibold gap-2 ${tall}`}>
          <a href={BUSINESS_PHONE_HREF}>
            <Phone className="w-4 h-4" /> Call {BUSINESS_PHONE}
          </a>
        </Button>
      )}
    </div>
  );
}
