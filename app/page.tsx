import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import Working from "@/components/Working";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import ComponentsPreview from "@/components/ComponentsPreview";

export default function LandingPage() {
  return (
    <div
      className={`bg-background text-foreground min-h-screen transition-colors duration-300`}
    >
      <Hero />
      <FeaturesSection />
      <ComponentsPreview />
      <Working />
      <Testimonials />
      <CTA />
    </div>
  );
}
