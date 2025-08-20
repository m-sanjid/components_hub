import React from "react";
import Sidebar from "@/components/Sidebar";
import ContactCTA from "@/components/docs/ContactCTA";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl gap-2 px-2 lg:flex">
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
