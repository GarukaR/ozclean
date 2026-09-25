import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import AreaCheckerSection from "@/components/AreaCheckerSection";
import Specialties from "@/components/Specialties";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { generatePageMeta } from "@/lib/seo";
import PricingTeaser from "@/components/PricingTeaser";

// Price strip reads the booking catalogue; refresh hourly so price changes show up.
export const revalidate = 3600;

export const metadata = generatePageMeta({
  // The "%s | OzClean" template only applies to child routes, so the home
  // page carries the brand itself.
  title: "Airbnb & End of Lease Cleaning South East Melbourne | OzClean",
  description: "OzClean specialises in Airbnb turnover cleans and bond-back end of lease cleaning across Hampton Park, Narre Warren, Berwick, Cranbourne and South East Melbourne, plus home and commercial cleaning. Free quotes, 100% satisfaction guaranteed.",
  path: "/",
});

export default function Home() {
  return (
    <div>
      <main>
        {/* What we do (specialties) → how it works → why us → price → do we
            cover you → proof. Sections alternate bg / surface from here down.
            The full catalogue lives on /services. */}
        <Hero />
        <Specialties />
        <HowItWorks />
        <WhyUs />
        <PricingTeaser />
        <AreaCheckerSection />
        <Testimonials />
      </main>
    </div>
  );
}
