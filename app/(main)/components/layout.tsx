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
      <main className="mx-auto lg:flex max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
        {/* Sticky sidebar */}
        <aside className="lg:w-64 shrink-0">
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
