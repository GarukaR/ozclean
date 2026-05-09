import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { generatePageMeta } from "@/lib/seo";
import Compare from "@/components/Compare";
import Pricing from "@/components/Pricing";

export const metadata = generatePageMeta({
  title: "Professional Cleaning Services Melbourne",
  description: "OzClean delivers spotless residential and commercial cleaning across Melbourne. Book online in minutes — 100% satisfaction guaranteed.",
  path: "/",
});

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Pricing />
        <HowItWorks />
        <Compare />
        <Testimonials />
      </main>
    </div>
  );
}
