import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Specialties from "@/components/Specialties";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { generatePageMeta } from "@/lib/seo";
import Pricing from "@/components/Pricing";

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
        <Hero />
        <Specialties />
        <WhyUs />
        <Services />
        <Pricing />
        <HowItWorks />
        <Testimonials />
      </main>
    </div>
  );
}
