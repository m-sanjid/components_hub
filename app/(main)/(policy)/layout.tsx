import ContactCTA from "@/components/docs/ContactCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policy",
  description:
    "Browse high-quality, responsive, accessible templates with live previews and instant copy.",
  alternates: { canonical: "/policy" },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl gap-8 px-4 sm:px-6 lg:flex lg:px-8">
        {/* Main content */}
        <section className="min-w-0 flex-1">
          <div className="mx-auto max-w-2xl">{children}</div>
          <ContactCTA />
        </section>
      </main>
    </div>
  );
}
