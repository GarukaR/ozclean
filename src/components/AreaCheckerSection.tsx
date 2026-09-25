import { MapPin } from "lucide-react";
import AreaChecker from "@/components/AreaChecker";
import Reveal from "@/components/Reveal";

// Full-width "Do we service your area?" band (homepage, /services).
export default function AreaCheckerSection({ className = "bg-brand-bg" }: { className?: string }) {
  return (
    <section className={`${className} py-14 sm:py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-14 items-start">
          {/* Intro centred on phones, left-aligned beside the checker on desktop. */}
          <div className="text-center lg:text-left">
            <div className="w-11 h-11 rounded-2xl bg-brand-accent-bg flex items-center justify-center mb-4 mx-auto lg:mx-0">
              <MapPin className="w-5 h-5 text-brand-accent-dark" />
            </div>
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Service Areas</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight tracking-tight">
              Do we clean <span className="text-brand-accent-dark">in your area?</span>
            </h2>
            {/* Hidden on phones to keep the section short; the checker says it all. */}
            <p className="hidden sm:block text-brand-muted mt-4 leading-relaxed max-w-md sm:mx-auto lg:mx-0">
              Based in Hampton Park, we cover South East Melbourne from Dandenong and Keysborough out to Berwick, Cranbourne and Pakenham.
            </p>
          </div>
          <AreaChecker centerOnMobile />
        </Reveal>
      </div>
    </section>
  );
}
