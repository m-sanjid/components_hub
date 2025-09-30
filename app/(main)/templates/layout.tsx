import ContactCTA from "@/components/docs/ContactCTA";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { generateDefaultOGImage } from "@/lib/og-image";

export const metadata: Metadata = {
  title: "UI Library Templates | Velnor UI",
  description:
    "Browse high-quality templates with live previews & instant copy",
  openGraph: {
    title: "UI Library Templates | Velnor UI",
    description:
      "Browse high-quality templates with live previews & instant copy",
    images: [
      {
        url: generateDefaultOGImage(
          "UI Library Templates | Velnor UI",
          "Browse high-quality templates with live previews & instant copy",
        ),
        width: 1200,
        height: 630,
        alt: "UI Library Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Library Templates",
    description:
      "Browse high-quality templates with live previews & instant copy",
    images: [
      generateDefaultOGImage(
        "UI Library Templates",
        "Browse high-quality templates with live previews & instant copy",
      ),
    ],
  },
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
        <section className="min-w-0 flex-1">
          {children}
          <ContactCTA />
        </section>
      </main>
    </div>
  );
}
