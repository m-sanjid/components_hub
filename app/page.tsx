import Hero from "@/components/Hero";
import ComponentShowcase from "@/components/ComponentShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import CTA from "@/components/CTA";

export default function LandingPage() {
  return (
    <div className="bg-background">
      <Hero />
      <ComponentShowcase />
      <FeaturesSection />
      <CTA />
    </div>
  );
}
