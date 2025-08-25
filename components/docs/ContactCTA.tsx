"use client";

import React from "react";
import { motion } from "motion/react";

export default function ContactCTA() {
  return (
    <div className="bg-primary/10 my-10 rounded-[28px] border p-1 backdrop-blur-md">
      <section className="mx-auto max-w-6xl rounded-3xl border bg-neutral-50 px-4 py-6 shadow-lg backdrop-blur-xl sm:px-6 dark:bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-[1fr_320px]"
        >
          {/* Left: Text & CTA */}
          <div className="flex max-w-2xl flex-col justify-center">
            <h2 className="text-xl font-bold tracking-tight text-pretty md:text-2xl">
              Build your next big idea with us
            </h2>
            <p className="text-muted-foreground mt-3 text-sm md:text-base">
              From lightning-fast landing pages to fully functional SaaS
              products, we turn your vision into reality. Book a call today and
              let&apos;s make something extraordinary.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <motion.a
                href="https://cal.com/muhammed-sanjid"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="focus-visible:ring-primary inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#FF6100] px-5 text-sm font-medium text-white transition-colors hover:bg-[#FF6100]/90 focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Book a free consultation"
                data-cal-link="muhammed-sanjid"
                data-cal-config='{"layout":"month_view"}'
              >
                Book Free Consultation
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
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
                name: "Alex Chen",
                role: "Founder, StartupX",
                text: "They transformed our idea into a fully functional product in record time. Couldn't be happier!",
              },
              {
                name: "Sarah Kim",
                role: "CTO, Innovate Inc",
                text: "The team's attention to detail and design expertise set our product apart in the market.",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/70"
              >
                <p className="text-muted-foreground text-sm">
                  &ldquo;{testimonial.text}&rdquo;
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
        </motion.div>
      </section>
    </div>
  );
}
