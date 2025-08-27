import React from "react";
import Link from "next/link";

export default function CreditsPage() {
  return (
    <section className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold">Credits</h1>
      <p>
        This project is made possible thanks to the creativity and generosity of
        the open-source community and inspiring creators. Your work shapes and
        uplifts this project.
      </p>

      <h2>Special Thanks</h2>
      <ul className="space-y-2">
        <li>
          <strong>
            shadcn/ui |{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/shadcn"
            >
              Shadcn
            </a>
          </strong>
          <span className="block">
            Component architecture, CLI, and the{" "}
            <em>copy-paste composability</em> philosophy.
          </span>
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            Visit site
          </Link>
        </li>
        <li>
          <strong>
            Aceternity UI |{" "}
            <a
              href="https://x.com/mannupaaji"
              target="_blank"
              rel="noopener noreferrer"
            >
              Manu Arora
            </a>
          </strong>
          <span className="block">
            Motion principles, aesthetics, and interaction patterns that
            inspired several components.
          </span>
          <Link
            href="https://ui.aceternity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            Visit site
          </Link>
        </li>
        <li>
          <strong>Open-source community</strong> — Countless utilities, ideas,
          and best practices that form the foundation of modern development.
        </li>
      </ul>

      <h2>Contributions & Updates</h2>
      <p>
        If you notice your work reflected here and would like a dedicated
        mention, updated link, or credit adjustment, please{" "}
        <Link href="/contact" className="text-primary underline">
          reach out via the contact page
        </Link>
        .
      </p>
    </section>
  );
}
