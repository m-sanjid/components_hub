import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import CTA from "@/components/CTA";

export default function LandingPage() {
  return (
    <div className="bg-background">
      <Hero />
      <FeaturesSection />
      <CTA />
    </div>
  );
}
