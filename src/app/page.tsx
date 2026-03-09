import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { generatePageMeta } from "@/lib/seo";

export const metadata = generatePageMeta({
  title: "Professional Cleaning Services Melbourne",
  description: "SparkClean delivers spotless residential and commercial cleaning across Melbourne. Book online in minutes — 100% satisfaction guaranteed.",
  path: "/",
});

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <HowItWorks />
        <Pricing />
        <Testimonials />
      </main>
    </div>
  );
}
