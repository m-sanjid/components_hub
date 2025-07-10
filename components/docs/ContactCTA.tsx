"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    Cal?: {
      showPopup: (options: { url: string }) => void;
    };
  }
}

export default function ContactCTA() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openCalModal = () => {
    if (typeof window !== "undefined" && window.Cal) {
      window.Cal.showPopup({ url: "https://cal.com/your-username" }); // replace with your URL
    }
  };

  return (
    <section className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-br from-neutral-100 to-white px-8 py-12 shadow-xl dark:from-neutral-900 dark:to-black dark:text-white">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight font-bold">
            Let’s build something exceptional together.
          </h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-400">
            Need a high-performance web app, landing page, or SaaS MVP? Schedule
            a quick call and let’s discuss how we can help.
          </p>
        </div>
        <button
          onClick={openCalModal}
          className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          Book Free Consultation
        </button>
      </div>
    </section>
  );
}
