"use client";

import React from "react";
import { motion } from "motion/react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const CTA = () => {
  return (
    <section
      id="docs"
      className="mb-20 py-20 px-4 bg-primary text-primary-foreground rounded-2xl"
    >
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          className="text-xl max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore our full documentation and start building with ease.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a
            href="/docs"
            className="px-6 py-3 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Documentation
          </motion.a>
          <motion.a
            href="/components"
            className="px-6 py-3 border border-primary-foreground rounded-lg hover:bg-primary-foreground/10 transition-colors font-medium"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
            whileHover={{ scale: 0.99 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconBrandGithub size={20} />
            Star us on GitHub
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Alert className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 max-w-2xl mx-auto">
            <AlertTitle>New version available!</AlertTitle>
            <AlertDescription>
              We've just released v2.0 with new components and improved
              performance.
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
