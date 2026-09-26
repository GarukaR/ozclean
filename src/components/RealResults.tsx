import Image from "next/image";
import { Camera } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Service } from "@/lib/services";

// Real OzClean job photos for a service page: before/after pairs, then a small
// gallery. Renders nothing for services without photos yet.
export default function RealResults({ service }: { service: Service }) {
  const pairs = service.beforeAfter ?? [];
  const gallery = service.gallery ?? [];
  if (!pairs.length && !gallery.length) return null;

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
          <div className="flex flex-col gap-4 mb-10">
            {pairs.map(({ before, after, label }) => (
              <Reveal key={label} className="rounded-3xl border border-brand-border bg-brand-surface p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { src: before, tag: "Before" },
                    { src: after, tag: "After" },
                  ].map(({ src, tag }) => (
                    <div key={tag} className="relative aspect-[3/4] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-brand-bg">
                      <Image
                        src={src}
                        alt={`${label}, ${tag.toLowerCase()} our ${service.title.toLowerCase()}`}
                        fill
                        sizes="(min-width: 1024px) 540px, 50vw"
                        className="object-cover"
                      />
                      <span
                        className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${
                          tag === "After" ? "bg-brand-accent text-white dark:text-[#0A1220]" : "bg-black/60 text-white"
                        }`}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 px-1 text-sm font-semibold text-brand-text">{label}</p>
              </Reveal>
            ))}
          </div>
        )}

        {gallery.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {gallery.map(({ src, alt }, index) => (
              <Reveal
                key={src}
                delay={(index % 3) * 0.05}
                className={`relative rounded-2xl overflow-hidden bg-brand-surface ${index === 0 && gallery.length % 2 === 1 ? "col-span-2 lg:col-span-1 aspect-[16/10] lg:aspect-[4/5]" : "aspect-[4/5]"}`}
              >
                <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 360px, 50vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
