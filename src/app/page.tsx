import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Specialties from "@/components/Specialties";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { generatePageMeta } from "@/lib/seo";
import Pricing from "@/components/Pricing";

export const metadata = generatePageMeta({
  title: "OzClean | Airbnb Turnover & Move-Out Cleaning Specialists Melbourne",
  description: "OzClean specialises in Airbnb turnover cleans and bond-back move-out cleaning across Melbourne, plus residential and commercial services. Book online in minutes, 100% satisfaction guaranteed.",
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
