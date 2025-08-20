"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Code, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NewComponentBadge from "./NewComponentBadge";
import { TestimonialCarousel } from "@/data/components/code/testimonial-carousel";
import { Tabs } from "@/data/components/code/tabs";
import EmailForm from "@/data/components/code/email-form";
import LogoBlock from "./LogoBlock";
import GithubStarButton from "@/data/components/code/github-star-button";

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
  return (
    <section className="relative overflow-hidden mask-t-from-90% mask-b-from-90%">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(to_right,rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.2)_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)]",
            "[background-size:4px_48px]",
            "mask-t-from-70% mask-r-from-50% mask-b-to-50% mask-l-from-50%",
            "bg-[#FF6100]/40",
          )}
        />
        <motion.div
          className="bg-primary/10 absolute -top-24 -right-24 h-60 w-60 rounded-full blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, -22, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        />
        <motion.div
          className="bg-primary/10 absolute -bottom-28 -left-16 h-80 w-80 rounded-full blur-3xl"
          animate={{ x: [0, -16, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        />
      </div>

      {/* Grid layout: 2 cols */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-12"
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
            className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Design with intention.
            <br />
            <span className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
              Build with precision.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp(0.2)}
            className="text-muted-foreground max-w-lg text-lg sm:text-xl"
          >
            A motion-first component library for modern React apps. Crafted with
            TypeScript, TailwindCSS, and Framer Motion.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeInUp(0.3)}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              className="group relative bg-[#FF6100] text-white transition-transform hover:scale-[1.02] hover:bg-[#FF6100]/80 active:scale-[0.98]"
              asChild
            >
              <Link href="/components">
                <span className="from-primary/20 to-primary/0 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
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
              className="group transition-transform hover:scale-[1.02] active:scale-[0.98]"
              asChild
            >
              <Link href="/components/installation">
                <Code size={20} className="mr-2" />
                View Docs
                <ArrowRight
                  size={20}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </motion.div>

          {/* Logos */}
          <motion.div variants={fadeInUp(0.5)}>
            <LogoBlock />
          </motion.div>
        </div>

        {/* RIGHT: Interactive Tabs */}
        <motion.div variants={fadeInUp(0.6)} className="space-y-6">
          {/* Stats */}
          <motion.div
            variants={fadeInUp(0.4)}
            className="grid grid-cols-2 gap-4 pt-6"
          >
            <div className="bg-background/70 rounded-xl border px-4 py-3 backdrop-blur-sm transition hover:border-[#FF6100]/50 hover:shadow-md">
              <div className="text-foreground text-2xl font-semibold">10+</div>
              <div className="text-xs">Production-ready components</div>
            </div>
            <div className="bg-background/70 rounded-xl border px-4 py-3 backdrop-blur-sm transition hover:border-[#FF6100]/50 hover:shadow-md">
              <div className="text-foreground text-2xl font-semibold">5+</div>
              <div className="text-xs">Starter templates</div>
            </div>
          </motion.div>
          <Tabs
            tabs={[
              {
                value: "testimonial-carousel",
                label: "Testimonials",
                content: <TestimonialCarousel />,
              },
              {
                value: "email-form",
                label: "Email Form",
                content: <EmailForm />,
              },
              {
                value: "star",
                label: "Star Button",
                content: (
                  <div className="flex h-full items-center justify-center p-4">
                    <GithubStarButton owner="m-sanjid" repo="components_hub" />,
                  </div>
                ),
              },
            ]}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
