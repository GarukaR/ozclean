import Image from "next/image";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";

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
