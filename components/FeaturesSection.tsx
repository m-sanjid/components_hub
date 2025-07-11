"use client";

import {
  IconAccessible,
  IconBrandGithub,
  IconCode,
  IconZodiacPisces,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { Package, Smartphone } from "lucide-react";
import React from "react";

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-accent/5 px-4 py-20">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Our Components?
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Fully customizable, lightweight, and designed with accessibility in
            mind. Our components help you build faster without sacrificing
            quality.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <motion.div
            className="bg-card rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-primary mb-4">
              <Package size={36} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Customizable</h3>
            <p className="text-muted-foreground">
              Easily theme and style each component to match your design system
              and brand guidelines.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-card rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-primary mb-4">
              <Smartphone size={36} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Responsive</h3>
            <p className="text-muted-foreground">
              Mobile-first, fully responsive components that look great on any
              device or screen size.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-card rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-primary mb-4">
              <IconAccessible size={36} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Accessible</h3>
            <p className="text-muted-foreground">
              Built with accessibility in mind with full ARIA support and
              keyboard navigation.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className="bg-card rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-primary mb-4">
              <IconZodiacPisces size={36} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Performance</h3>
            <p className="text-muted-foreground">
              Optimized for fast loading times and minimal JavaScript with
              tree-shaking support.
            </p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div
            className="bg-card rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-primary mb-4">
              <IconCode size={36} />
            </div>
            <h3 className="mb-2 text-xl font-bold">TypeScript-First</h3>
            <p className="text-muted-foreground">
              Fully typed components with excellent TypeScript support for
              better developer experience.
            </p>
          </motion.div>

          {/* Feature 6 */}
          <motion.div
            className="bg-card rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-primary mb-4">
              <IconBrandGithub size={36} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Open Source</h3>
            <p className="text-muted-foreground">
              Free to use, open-source, and regularly maintained by our
              dedicated community.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
