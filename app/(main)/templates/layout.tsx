import ContactCTA from "@/components/docs/ContactCTA";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Browse high-quality, responsive, accessible templates with live previews and instant copy.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl gap-8 px-4 sm:px-6 lg:flex lg:px-8">
        {/* Sticky sidebar */}
        <aside className="shrink-0 lg:w-64">
          <div className="sticky top-16 z-20">
            <Sidebar />
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">{children}
        <ContactCTA/>
        </section>
      </main>
    </div>
  );
}
