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
      component.tags.includes(currentTab)
    );
  };

  const handleLike = (componentId: number) => {
    setVisibleComponent((prev) =>
      prev === componentId ? null : componentId
    );
  };

  return (
    <section id="components" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Browse Our <span className="text-primary">Components</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
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
            className="mt-8 max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={20}
            />
            <input
              type="text"
              placeholder="Search components..."
              className="w-full py-3 pl-10 pr-4 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-card dark:text-foreground transition-all duration-300"
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
                  className={`px-4 py-2 rounded-full text-sm ${
                    currentTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent/5 hover:bg-accent/10 text-muted-foreground"
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              )
            )}
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="bg-card rounded-lg shadow-md overflow-hidden group"
                onMouseEnter={() => setVisibleComponent(component.id)}
                onMouseLeave={() => setVisibleComponent(null)}
              >
                <div className="relative">
                  <img
                    src={component.image}
                    alt={component.name}
                    className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex gap-2 flex-wrap">
                        {component.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/80 text-primary-foreground text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
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
                      className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 group"
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
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
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
