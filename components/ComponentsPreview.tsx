"use client";

import { components } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Heart, Search } from "lucide-react";
import React, { useState } from "react";

const ComponentsPreview = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const [visibleComponent, setVisibleComponent] = useState<number | null>(null);

  const filteredComponents = () => {
    if (currentTab === "all") return components;
    return components.filter((component) =>
      component.tags.includes(currentTab),
    );
  };

  const handleLike = (componentId: number) => {
    setVisibleComponent((prev) => (prev === componentId ? null : componentId));
  };

  return (
    <section id="components" className="px-4 py-24">
      <div className="container mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Browse Our <span className="text-primary">Components</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            A curated selection of components designed to streamline your
            development process. All components are fully customizable and
            responsive.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="relative mx-auto mt-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Search
              className="text-muted-foreground absolute top-3 left-3"
              size={20}
            />
            <input
              type="text"
              placeholder="Search components..."
              className="border-border focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground w-full rounded-lg border py-3 pr-4 pl-10 transition-all duration-300 focus:ring-2"
            />
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {["all", "UI", "Layout", "Data", "Interactive", "Input"].map(
              (tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setCurrentTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    currentTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent/5 hover:bg-accent/10 text-muted-foreground"
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ),
            )}
          </motion.div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredComponents().map((component) => (
              <motion.div
                key={component.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="bg-card group overflow-hidden rounded-lg shadow-md"
                onMouseEnter={() => setVisibleComponent(component.id)}
                onMouseLeave={() => setVisibleComponent(null)}
              >
                <div className="relative">
                  <img
                    src={component.image}
                    alt={component.name}
                    className="h-48 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="from-background/70 absolute inset-0 flex items-end bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="w-full p-4">
                      <div className="flex flex-wrap gap-2">
                        {component.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary/80 text-primary-foreground rounded-full px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
                    {component.name}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: visibleComponent === component.id ? 1 : 0,
                        scale: visibleComponent === component.id ? 1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <Heart
                        onClick={() => handleLike(component.id)}
                        size={16}
                        className="text-destructive fill-destructive"
                      />
                    </motion.div>
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {component.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <motion.a
                      href="#"
                      className="text-primary hover:text-primary/80 group flex items-center gap-1 font-medium"
                      whileHover={{ x: 3 }}
                    >
                      View Docs
                      <motion.div
                        animate={
                          visibleComponent === component.id
                            ? { x: [0, 5, 0] }
                            : { x: 0 }
                        }
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="group-hover:ml-1"
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </motion.a>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 transition-colors"
                      onClick={() => {
                        if (visibleComponent === component.id) {
                          setVisibleComponent(null);
                        } else {
                          setVisibleComponent(component.id);
                        }
                      }}
                    >
                      {visibleComponent === component.id ? "Hide" : "Show"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ComponentsPreview;
