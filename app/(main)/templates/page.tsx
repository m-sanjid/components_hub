"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { IconArrowRight, IconSearch, IconFilter } from "@tabler/icons-react";
import { fadeIn, slideInFromBottom, staggerContainer } from "@/lib/animations";
import { categories, templates } from "@/lib/constants";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const featuredTemplates = templates.filter((template) => template.featured);

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.section
        className="container mx-auto mb-16 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={slideInFromBottom(0.2)}
        >
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Ready-to-Use Templates
          </h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Start your project with our professionally designed templates built
            with our components.
          </p>

          {/* Search Bar */}
          <div className="relative mx-auto mb-12 max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IconSearch className="text-muted-foreground h-5 w-5" />
            </div>
            <motion.input
              type="text"
              placeholder="Search templates..."
              className="border-border bg-card focus:ring-primary/20 focus:border-primary block w-full rounded-lg border py-3 pr-4 pl-10 transition-all outline-none focus:ring-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Templates */}
      {featuredTemplates.length > 0 && (
        <motion.section
          className="container mx-auto mb-16 px-4 transition-all duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <h2 className="mb-8 text-2xl font-bold">Featured Templates</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                className="group transition-all duration-300"
                variants={fadeIn(0.1 * index)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/templates/${template.id}`}>
                  <div className="relative mb-4 h-56 overflow-hidden rounded-xl">
                    {/* <Image 
                      src={template.image} 
                      alt={template.title} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="bg-primary text-secondary mb-2 inline-block rounded-full px-2 py-1 text-xs font-medium">
                        {template.category}
                      </span>
                      <h3 className="mb-2 text-xl font-bold">
                        {template.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Categories and Filters */}
      <motion.section
        className="container mx-auto mb-12 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold">All Templates</h2>

          <button
            className="bg-secondary text-foreground hover:bg-secondary/80 flex items-center gap-2 rounded-lg px-4 py-2 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <IconFilter className="h-5 w-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <motion.div
            className="bg-card border-border mb-8 rounded-xl border p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="mb-4 font-medium">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* Templates Grid */}
      <motion.section
        className="container mx-auto mb-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        {filteredTemplates.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
          >
            {filteredTemplates.map((template, index) => (
              <TemplateCard
                key={template.id}
                template={template}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div className="py-12 text-center" variants={fadeIn()}>
            <h3 className="mb-2 text-xl font-medium">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </motion.div>
        )}
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="container mx-auto mb-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.div
          className="bg-primary/90 overflow-hidden rounded-3xl"
          variants={slideInFromBottom(0.2)}
        >
          <div className="px-8 py-16 text-center md:p-16">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl dark:text-black">
              Need a Custom Template?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 dark:text-black/90">
              Our team can help you build a custom template tailored to your
              specific requirements.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-secondary hover:bg-secondary/80 inline-block rounded-lg px-8 py-3 font-medium"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

interface TemplateCardProps {
  template: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    tags: string[];
  };
  index: number;
}

function TemplateCard({ template, index }: TemplateCardProps) {
  return (
    <motion.div
      className="group bg-card border-border overflow-hidden rounded-xl border transition-all duration-300 hover:px-2"
      variants={fadeIn(0.1 * index)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/templates/${template.id}`}>
        <div className="relative h-48 overflow-hidden">
          {/* <Image 
            src={template.image} 
            alt={template.title} 
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          /> */}
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
              {template.category}
            </span>
          </div>
          <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
            {template.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {template.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary rounded-full px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-primary inline-flex items-center text-sm font-medium">
            View Template
            <IconArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
