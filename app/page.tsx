import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import CTA from "@/components/CTA";
import Script from "next/script";

export default function LandingPage() {
  return (
    <div className="bg-background">
      <Script id="ld-json-organization" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Components Hub",
          url: "https://ui.sanjid.shop",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://ui.sanjid.shop/api/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </Script>
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="sr-only">
          Components Hub
        </h1>
        <Hero />
      </section>
      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Key features
        </h2>
        <FeaturesSection />
      </section>
      <section aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only">
          Get started
        </h2>
        <CTA />
      </section>
    </div>
  );
}
