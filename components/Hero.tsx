"use client";

import { motion } from "motion/react";
import React from "react";
import { ArrowRight, Code, Package } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <motion.div
        className="from-accent/20 to-primary/20 dark:from-accent/10 dark:to-primary/10 absolute inset-0 z-0 bg-gradient-to-br"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Background animated shapes */}
      <motion.div
        className="bg-primary/20 absolute top-20 right-10 h-64 w-64 rounded-full opacity-20 mix-blend-multiply blur-xl filter dark:opacity-10"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="bg-accent/20 absolute bottom-20 left-10 h-80 w-80 rounded-full opacity-20 mix-blend-multiply blur-xl filter dark:opacity-10"
        animate={{
          x: [0, -20, 0],
          y: [0, 40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <motion.div
            className="space-y-6 md:w-1/2"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl leading-tight font-bold md:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-black via-black/90 to-black/70 bg-clip-text text-transparent dark:from-white/90 dark:via-white/90 dark:to-white/80">
                Build Beautiful Interfaces
              </span>{" "}
              with <span className="text-primary inline-block">S ui</span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Ready-to-use, customizable components for your next web project.
              Engineered for performance, accessibility, and design flexibility.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <motion.a
                href="/login"
                className="group bg-primary text-primary-foreground relative flex items-center gap-2 overflow-hidden rounded-lg px-6 py-3 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight size={18} />
                </motion.div>
                <motion.div
                  className="bg-primary/90 absolute inset-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />
              </motion.a>
              <motion.a
                href="/components"
                className="group border-border hover:border-primary relative flex items-center gap-2 overflow-hidden rounded-lg border px-6 py-3 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Browse Components</span>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                >
                  <Package size={18} />
                </motion.div>
              </motion.a>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-accent border-background flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
              </div>
              <div className="text-muted-foreground text-sm">
                <span className="text-foreground font-bold">5,000+</span>{" "}
                developers using our components
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-8 md:mt-0 md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-card relative rounded-lg p-6 shadow-xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-primary text-primary-foreground absolute -top-2 -left-2 rounded-md px-3 py-1 text-sm font-medium">
                Live preview
              </div>
              <div className="mb-3 flex gap-2">
                <div className="bg-destructive h-3 w-3 rounded-full"></div>
                <div className="bg-warning h-3 w-3 rounded-full"></div>
                <div className="bg-success h-3 w-3 rounded-full"></div>
              </div>
              <motion.img
                src="/api/placeholder/600/400"
                alt="UI Components Preview"
                className="h-auto w-full rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Floating element animations */}
              <motion.div
                className="bg-primary text-primary-foreground absolute -right-6 -bottom-6 rounded-lg p-3 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Code size={24} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
