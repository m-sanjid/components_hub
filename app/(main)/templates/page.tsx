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
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredTemplates = templates.filter((template) => template.featured);

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.section
        className="container mx-auto px-4 mb-16"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={slideInFromBottom(0.2)}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Ready-to-Use Templates
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start your project with our professionally designed templates built
            with our components.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-muted-foreground" />
            </div>
            <motion.input
              type="text"
              placeholder="Search templates..."
              className="block w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
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
          className="container mx-auto px-4 mb-16 transition-all duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <h2 className="text-2xl font-bold mb-8">Featured Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                className="group transition-all duration-300"
                variants={fadeIn(0.1 * index)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/templates/${template.id}`}>
                  <div className="relative h-56 rounded-xl overflow-hidden mb-4">
                    {/* <Image 
                      src={template.image} 
                      alt={template.title} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="inline-block bg-primary text-xs text-secondary font-medium px-2 py-1 rounded-full mb-2">
                        {template.category}
                      </span>
                      <h3 className="text-xl font-bold mb-2">
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
        className="container mx-auto px-4 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <h2 className="text-2xl font-bold">All Templates</h2>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <IconFilter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <motion.div
            className="bg-card border border-border rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
        className="container mx-auto px-4 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        {filteredTemplates.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          <motion.div className="text-center py-12" variants={fadeIn()}>
            <h3 className="text-xl font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </motion.div>
        )}
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="container mx-auto px-4 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.div
          className="bg-primary/90 rounded-3xl overflow-hidden"
          variants={slideInFromBottom(0.2)}
        >
          <div className="px-8 py-16 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-6">
              Need a Custom Template?
            </h2>
            <p className="text-white/90 dark:text-black/90 text-lg mb-8 max-w-2xl mx-auto">
              Our team can help you build a custom template tailored to your
              specific requirements.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-secondary hover:bg-secondary/80 px-8 py-3 rounded-lg font-medium inline-block"
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
      className="group bg-card border border-border rounded-xl overflow-hidden hover:px-2 transition-all duration-300"
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
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
              {template.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {template.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {template.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-primary font-medium inline-flex items-center text-sm">
            View Template
            <IconArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
