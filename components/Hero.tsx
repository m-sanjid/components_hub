"use client";

import { motion } from "motion/react";
import React from "react";
import { ArrowRight, Code, Package } from "lucide-react";


const Hero = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 dark:from-accent/10 dark:to-primary/10 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Background animated shapes */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
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
        className="absolute bottom-20 left-10 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
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

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2 space-y-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-black/90 to-black/70 dark:from-white/90 dark:via-white/90 dark:to-white/80">
                Build Beautiful Interfaces
              </span>{" "}
              with <span className="text-primary inline-block">S ui</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground"
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
                className="group px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 overflow-hidden relative"
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
                  className="absolute inset-0 bg-primary/90"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />
              </motion.a>
              <motion.a
                href="/components"
                className="group px-6 py-3 border border-border rounded-lg font-medium flex items-center gap-2 hover:border-primary transition-colors relative overflow-hidden"
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
              className="pt-4 flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full bg-accent border-2 border-background flex items-center justify-center text-xs font-bold"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">5,000+</span>{" "}
                developers using our components
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-card p-6 rounded-lg shadow-xl relative"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                Live preview
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
              <motion.img
                src="/api/placeholder/600/400"
                alt="UI Components Preview"
                className="w-full h-auto rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Floating element animations */}
              <motion.div
                className="absolute -right-6 -bottom-6 bg-primary text-primary-foreground p-3 rounded-lg shadow-lg"
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
