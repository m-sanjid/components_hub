"use client";

import React from "react";
import { motion } from "motion/react";

const Working = () => {
  return (
    <section className="py-20 px-4 bg-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get up and running with our UI library in just three simple steps.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            className="bg-card p-6 rounded-lg shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl absolute -top-6 left-6">
              1
            </div>
            <h3 className="text-xl font-bold mt-6 mb-4">Install the library</h3>
            <div className="bg-accent/5 p-4 rounded mb-4 font-mono text-sm overflow-x-auto">
              <code>npm install components-ui</code>
            </div>
            <p className="text-muted-foreground">
              Add our package to your project using npm or yarn.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="bg-card p-6 rounded-lg shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl absolute -top-6 left-6">
              2
            </div>
            <h3 className="text-xl font-bold mt-6 mb-4">Choose a component</h3>
            <div className="bg-accent/5 p-4 rounded mb-4 font-mono text-sm overflow-x-auto">
              <code>import {"{ Button }"} from 'components-ui'</code>
            </div>
            <p className="text-muted-foreground">
              Import the components you need in your project.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="bg-card p-6 rounded-lg shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl absolute -top-6 left-6">
              3
            </div>
            <h3 className="text-xl font-bold mt-6 mb-4">
              Customize to fit your needs
            </h3>
            <div className="bg-accent/5 p-4 rounded mb-4 font-mono text-sm overflow-x-auto">
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
