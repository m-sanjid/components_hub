"use client";

import React from "react";
import { motion } from "motion/react";
import GithubStarButton from "@/data/components/code/github-star-button";

const CTA = () => {
  return (
    <section id="docs" className="mx-auto mb-20 max-w-7xl rounded-2xl py-20">
      <div className="text-center">
        <motion.h2
          className="mb-4 text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          className="mx-auto mb-8 max-w-2xl text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore the docs, browse components, and star the repo to support
          development.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a
            href="/components/installation"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Documentation
          </motion.a>
          <motion.a
            href="/components"
            className="border-primary-foreground hover:bg-primary-foreground/10 rounded-md border bg-neutral-200 px-6 py-3 font-medium transition-colors dark:bg-neutral-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Components
          </motion.a>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GithubStarButton owner="m-sanjid" repo="components_hub" />
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
