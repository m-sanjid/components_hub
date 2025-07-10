"use client";

import React from "react";
import { motion } from "motion/react";
import { TemplateCard } from "./TemplateCard";
import { Template } from "@/lib/get-templates";

interface TemplateShowcaseProps {
  templates: Template[];
  title?: string;
  description?: string;
  featured?: boolean;
}

export function TemplateShowcase({
  templates,
  title = "Templates",
  description = "Explore our collection of professional templates",
  featured = false,
}: TemplateShowcaseProps) {
  const displayTemplates = featured
    ? templates.filter((t) => t.featured)
    : templates;

  return (
    <div className="my-8">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayTemplates.map((template, index) => (
          <motion.div
            key={template.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TemplateCard {...template} />
          </motion.div>
        ))}
      </div>

      {displayTemplates.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No templates found.</p>
        </div>
      )}
    </div>
  );
}
