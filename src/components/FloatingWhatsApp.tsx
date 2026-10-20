import { BUSINESS_WHATSAPP_HREF } from "@/lib/business";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// Phone-only WhatsApp button pinned bottom-right on every page. globals.css
// lifts it above the service-page CTA bar, hides it under multi-step form
// action bars, and stacks back-to-top above it.
export default function FloatingWhatsApp() {
  return (
    <a
      href={BUSINESS_WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with OzClean on WhatsApp"
      data-floating-whatsapp
      // Same layer as back-to-top: below the navbar pill (z-60) and the mobile drawer (z-40).
      className="md:hidden fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 flex items-center justify-center active:scale-95 transition-transform"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
