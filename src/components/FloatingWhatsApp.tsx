import { BUSINESS_WHATSAPP_HREF } from "@/lib/business";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// WhatsApp button pinned bottom-right on every page. globals.css stacks
// back-to-top above it, and on phones lifts it above the service-page CTA bar
// and hides it under multi-step form action bars.
export default function FloatingWhatsApp() {
  return (
    <a
      href={BUSINESS_WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with OzClean on WhatsApp"
      data-floating-whatsapp
      // Same layer as back-to-top: below the navbar pill (z-60) and the mobile drawer (z-40).
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] text-white shadow-lg shadow-black/25 flex items-center justify-center hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 active:scale-95 transition-all"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
