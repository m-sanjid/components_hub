"use client";

import React from "react";
import { motion } from "motion/react";
import { IconArrowRight, IconEye, IconCode, IconDownload } from "@tabler/icons-react";
import Link from "next/link";

interface TemplateCardProps {
  title: string;
  description: string;
  category: string;
  price: number;
  featured?: boolean;
  tags: string[];
  screenshots: string[];
  previewUrl: string;
  codeUrl: string;
  features: string[];
  requirements: string[];
}

export function TemplateCard({
  title,
  description,
  category,
  price,
  featured = false,
  tags,
  screenshots,
  previewUrl,
  codeUrl,
  features,
  requirements,
}: TemplateCardProps) {
  return (
    <motion.div
      className="group bg-card border-border overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Template Preview */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        {screenshots[0] && (
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        )}
        <div className="absolute top-4 left-4">
          {featured && (
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs font-medium">
            ${price}
          </span>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
            {category}
          </span>
        </div>
        
        <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-secondary rounded-full px-2 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="bg-secondary rounded-full px-2 py-1 text-xs">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <IconEye className="h-4 w-4" />
            Preview
          </Link>
          
          <Link
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <IconCode className="h-4 w-4" />
            Code
          </Link>
        </div>

        {/* Download Button */}
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
          <IconDownload className="h-4 w-4" />
          Download Template
          <IconArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
} 