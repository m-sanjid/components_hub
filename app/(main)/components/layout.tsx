import React from "react";
import Sidebar from "@/components/Sidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="mx-auto lg:flex max-w-6xl gap-8 px-4 sm:px-6 lg:px-8">
        {/* Sticky sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-16 z-20">
            <Sidebar />
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 min-w-0">{children}</section>
      </main>
    </div>
  );
}
