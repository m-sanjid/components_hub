import React from "react";

export default function CreditsPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Credits</h1>
      <p>
        This project draws inspiration from incredible creators and the
        open-source community. Thank you for your work and generosity.
      </p>
      <ul>
        <li>
          <strong>shadcn/ui</strong> — for the component architecture, CLI, and
          overall philosophy of copy-paste composability.
        </li>
        <li>
          <strong>Aceternity UI (Manupaaji)</strong> — for thoughtful motion,
          aesthetics, and interaction patterns that influenced several
          components.
        </li>
        <li>
          <strong>Open‑source community</strong> — countless ideas, utilities,
          and best practices we build upon every day.
        </li>
      </ul>
      <p>
        If you see your work reflected here and would like a specific mention or
        link update, please reach out on the contact page.
      </p>
    </div>
  );
}
