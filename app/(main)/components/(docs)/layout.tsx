import React from "react";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
  title: {
    default: "Components Docs",
    template: "%s | Components Docs",
  },
  description:
    "Documentation for installation, CLI usage, and credits for the Components Hub.",
};

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[620px_1fr]">
        {/* Main content */}
        <div
          id="docs-content"
          className="prose prose-neutral dark:prose-invert max-w-none"
        >
          {children}
        </div>
        {/* Sidebar Navigation */}
        <aside className="hidden space-y-4 md:block">
          <nav
            className="bg-card sticky top-20 self-start rounded-lg border p-4"
            aria-label="Documentation navigation"
          >
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="hover:text-primary"
                  href="/components/installation"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/components/cli">
                  CLI
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/components/credits">
                  Credits
                </Link>
              </li>
            </ul>
            <div className="mt-4 border-t pt-4">
              <a
                href="/contact"
                className="hover:bg-primary/10 inline-flex w-full items-center justify-center rounded-md border px-3 py-2 text-xs font-medium"
              >
                Need help? Contact us
              </a>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default DocsLayout;
