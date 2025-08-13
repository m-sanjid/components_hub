"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

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
      window.Cal.showPopup({ url: "https://cal.com/your-username" }); // replace with your Cal.com URL
    }
  };

  return (
    <div className="my-10 p-1 rounded-[28px] bg-primary/10 backdrop-blur-md border">

    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mx-auto max-w-6xl rounded-3xl border bg-neutral-50 dark:bg-neutral-950 px-6 py-12 shadow-lg backdrop-blur-xl md:px-12"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        {/* Left: Text & CTA */}
        <div className="flex max-w-2xl flex-col justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-pretty md:text-4xl">
            Build your next big idea with us
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg">
            From lightning-fast landing pages to fully functional SaaS products,
            we turn your vision into reality. Book a call today and let’s make
            something extraordinary.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <motion.button
              onClick={openCalModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="focus-visible:ring-primary inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#FF6100] px-5 text-sm font-medium text-white transition-colors hover:bg-[#FF6100]/90 focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Book a free consultation"
            >
              Book Free Consultation
            </motion.button>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#FF6100]/40 bg-[#FF6100]/5 px-5 text-sm font-medium transition-colors hover:border-[#FF6100]/50 hover:bg-[#FF6100]/30"
            >
              Contact Us
            </motion.a>
          </div>
        </div>

        {/* Right: Testimonials */}
        <div className="flex flex-col gap-4">
          {[
            {
              name: "Jane Doe",
              role: "Founder, StartupX",
              text: "They transformed our idea into a fully functional product in record time. Couldn’t be happier!",
            },
            {
              name: "John Smith",
              role: "CTO, Innovate Inc",
              text: "The team’s attention to detail and design expertise set our product apart in the market.",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-neutral-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/70"
            >
              <p className="text-muted-foreground text-sm">
                “{testimonial.text}”
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="from-primary to-primary/60 h-8 w-8 rounded-full bg-gradient-to-br" />
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
    </div>
  );
}
