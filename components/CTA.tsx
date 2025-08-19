"use client";

import React from "react";
import { motion } from "motion/react";
import { IconBrandGithub } from "@tabler/icons-react";

const CTA = () => {
  return (
    <section
      id="docs"
      className="mx-auto mb-20 max-w-7xl rounded-2xl py-20"
    >
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
          Explore the docs, browse components, and star the repo to support development.
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Documentation
          </motion.a>
          <motion.a
            href="/components"
            className="border-primary-foreground hover:bg-primary-foreground/10 rounded-lg border px-6 py-3 font-medium transition-colors"
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
          <motion.a
            href="https://github.com/m-sanjid/components_hub"
            className="bg-primary/10 hover:bg-primary/20 inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors"
            whileHover={{ scale: 0.99 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconBrandGithub size={20} />
            Star us on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
