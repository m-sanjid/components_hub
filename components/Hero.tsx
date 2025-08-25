"use client";

import { motion, Variants, useReducedMotion } from "motion/react";
import { ArrowRight, Code, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NewComponentBadge from "./NewComponentBadge";
import LogoBlock from "./LogoBlock";
import ShowTabs from "./ShowTabs";

// Variants
const fadeInUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
});

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden mask-t-from-90% mask-b-from-90%"
      aria-label="Hero Section: Components Overview"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(to_right,rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.2)_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)]",
            "[background-size:4px_48px]",
            "mask-t-from-40% mask-r-from-40% mask-b-to-50% mask-l-from-30%",
            "bg-[#FF6100]",
          )}
        />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="bg-primary/10 absolute -top-24 -right-24 h-60 w-60 rounded-full blur-3xl"
              animate={{ x: [0, 18, 0], y: [0, -22, 0] }}
              transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <motion.div
              className="bg-primary/10 absolute -bottom-28 -left-16 h-80 w-80 rounded-full blur-3xl"
              animate={{ x: [0, -16, 0], y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
              aria-hidden="true"
            />
          </>
        )}
      </div>

      {/* Grid layout: responsive */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:px-12"
      >
        {/* LEFT: Text & CTAs */}
        <div className="flex flex-col gap-6 text-left">
          <motion.div variants={fadeInUp()}>
            <NewComponentBadge href="/components/testimonial-carousel">
              Testimonial Carousel
            </NewComponentBadge>
          </motion.div>

          <motion.h1
            variants={fadeInUp(0.1)}
            className="text-3xl leading-snug font-bold tracking-tight text-pretty sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Components
            <br />
            <span className="from-primary via-primary/80 rounded-lg bg-[#FF6100] px-2 font-semibold text-white">
              That Flow.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp(0.2)}
            className="text-muted-foreground max-w-full text-base sm:max-w-lg sm:text-lg"
          >
            Bring your UI to life with motion-first React components.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeInUp(0.3)}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="group relative w-full bg-[#FF6100] font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-[#FF6100]/80 active:scale-[0.98] sm:w-auto"
              asChild
            >
              <Link href="/components" aria-label="Browse Components">
                <Package size={20} className="mr-1" />
                Browse Components
                <ArrowRight
                  size={20}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group w-full transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              asChild
            >
              <Link
                href="/components/installation"
                aria-label="View Documentation"
              >
                <Code size={20} className="mr-2" />
                View Docs
                <ArrowRight
                  size={20}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp(0.5)}>
            <LogoBlock />
          </motion.div>
        </div>

        {/* RIGHT: Interactive Tabs & Stats */}
        <motion.div
          variants={fadeInUp(0.6)}
          className="flex flex-col gap-6 overflow-x-auto sm:overflow-x-visible"
        >
          <motion.div
            variants={fadeInUp(0.4)}
            className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2"
          >
            <div className="bg-background/70 w-full rounded-xl border px-4 py-3 backdrop-blur-sm transition hover:border-[#FF6100]/50 hover:shadow-md">
              <div className="text-foreground text-2xl font-semibold">10+</div>
              <div className="text-xs">Production-ready components</div>
            </div>
            <div className="bg-background/70 w-full rounded-xl border px-4 py-3 backdrop-blur-sm transition hover:border-[#FF6100]/50 hover:shadow-md">
              <div className="text-foreground text-2xl font-semibold">5+</div>
              <div className="text-xs">Starter templates</div>
            </div>
          </motion.div>

          <ShowTabs />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
