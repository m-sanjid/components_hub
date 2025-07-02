"use client";

import React from "react";
import { motion } from "motion/react";

const Working = () => {
  return (
    <section className="bg-accent/5 px-4 py-20">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get up and running with our UI library in just three simple steps.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <motion.div
            className="bg-card relative rounded-lg p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-primary text-primary-foreground absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
              1
            </div>
            <h3 className="mt-6 mb-4 text-xl font-bold">Install the library</h3>
            <div className="bg-accent/5 mb-4 overflow-x-auto rounded p-4 font-mono text-sm">
              <code>npm install components-ui</code>
            </div>
            <p className="text-muted-foreground">
              Add our package to your project using npm or yarn.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="bg-card relative rounded-lg p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-primary text-primary-foreground absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
              2
            </div>
            <h3 className="mt-6 mb-4 text-xl font-bold">Choose a component</h3>
            <div className="bg-accent/5 mb-4 overflow-x-auto rounded p-4 font-mono text-sm">
              <code>import {"{ Button }"} from &quot;components-ui&quot;</code>
            </div>
            <p className="text-muted-foreground">
              Import the components you need in your project.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="bg-card relative rounded-lg p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-primary text-primary-foreground absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
              3
            </div>
            <h3 className="mt-6 mb-4 text-xl font-bold">
              Customize to fit your needs
            </h3>
            <div className="bg-accent/5 mb-4 overflow-x-auto rounded p-4 font-mono text-sm">
              <code>
                {"<Button variant='primary' size='lg'>Get Started</Button>"}
              </code>
            </div>
            <p className="text-muted-foreground">
              Use props to customize the appearance and behavior of components.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Working;
