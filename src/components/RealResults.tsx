import { Camera } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Service } from "@/lib/services";
import { pairsFor, photosFor } from "@/lib/job-photos";
import BeforeAfterShowcase from "@/components/BeforeAfterShowcase";
import PhotoStrip from "@/components/PhotoStrip";

// Real OzClean job photos for a service page, pulled from lib/job-photos.ts by
// service slug: a before/after slider (if there are pairs), then a one-row
// photo strip. Renders nothing for services without photos yet.
export default function RealResults({ service }: { service: Service }) {
  const pairs = pairsFor(service.slug);
  // Don't repeat the page's own hero photo in the strip
  const photos = photosFor(service.slug).filter((p) => p.src !== service.heroImage);
  if (!pairs.length && !photos.length) return null;

  return (
    <section className="bg-brand-bg py-14 sm:py-20 border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="mb-8 max-w-2xl">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
            <Camera className="w-4 h-4" /> Real Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text leading-tight">
            {pairs.length ? "Before and after, from a real job." : "From our recent jobs."}
          </h2>
          <p className="text-brand-muted mt-3">Photos taken by our team. No stock images.</p>
        </Reveal>

        {pairs.length > 0 && (
          <Reveal className={photos.length ? "mb-10" : ""}>
            <BeforeAfterShowcase pairs={pairs} serviceName={service.title.toLowerCase()} />
          </Reveal>
        )}

        {photos.length > 0 && (
          <Reveal>
            <PhotoStrip photos={photos} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
