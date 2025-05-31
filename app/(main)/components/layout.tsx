import React from "react";
import Sidebar from "@/components/Sidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
        <main className="mx-auto flex max-w-7xl gap-4 px-4 sm:px-6 lg:px-8">
          <div className="w-64">
            <Sidebar />
          </div>
          <div className="flex-1">{children}</div>
        </main>
    </div>
  );
}