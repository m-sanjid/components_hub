"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowLeft,
  IconHeart,
  IconShare,
  IconDownload,
  IconCode,
  IconEye,
  IconStar,
} from "@tabler/icons-react";
import { fadeIn, slideInFromLeft, slideInFromRight } from "@/lib/animations";
import { template } from "@/lib/constants";

export default function TemplateDetailsPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen py-12">
      {/* Back Navigation */}
      <motion.div
        className="container mx-auto mb-8 px-4"
        initial="hidden"
        animate="visible"
        variants={slideInFromLeft(0.2)}
      >
        <Link
          href="/templates"
          className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
        >
          <IconArrowLeft className="mr-2 h-5 w-5" />
          Back to Templates
        </Link>
      </motion.div>

      {/* Template Header */}
      <motion.section
        className="container mx-auto mb-12 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Template Preview */}
          <motion.div
            className="bg-card border-border relative overflow-hidden rounded-2xl border"
            variants={slideInFromLeft(0.2)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-[400px]">
              <Image
                src={template.screenshots[selectedImage]}
                alt={template.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="absolute right-0 bottom-0 left-0 p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                  {template.category}
                </span>
                <span className="text-sm text-white/80">
                  {template.rating}{" "}
                  <IconStar className="inline-block h-4 w-4" /> (
                  {template.reviews} reviews)
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold text-white">
                {template.title}
              </h1>
              <p className="line-clamp-2 text-white/80">
                {template.description}
              </p>
            </div>
          </motion.div>

          {/* Template Info */}
          <motion.div className="space-y-6" variants={slideInFromRight(0.2)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button
                  className={`rounded-full p-2 transition-colors ${
                    isLiked
                      ? "text-red-500"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={handleLike}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconHeart
                    className="h-6 w-6"
                    fill={isLiked ? "currentColor" : "none"}
                  />
                </motion.button>
                <motion.button
                  className="text-muted-foreground hover:text-foreground rounded-full p-2 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconShare className="h-6 w-6" />
                </motion.button>
              </div>
              <motion.div
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ${template.price}
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="bg-secondary text-foreground rounded-full px-3 py-1 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="space-y-4">
              <motion.button
                className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium text-white transition-colors dark:text-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconDownload className="h-5 w-5" />
                Download Template
              </motion.button>
              <motion.button
                className="bg-secondary text-foreground hover:bg-secondary/80 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconEye className="h-5 w-5" />
                Live Preview
              </motion.button>
              <motion.button
                className="border-border hover:bg-secondary/50 flex w-full items-center justify-center gap-2 rounded-lg border py-3 font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconCode className="h-5 w-5" />
                View Source Code
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Tabs Navigation */}
      <motion.section
        className="container mx-auto mb-12 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <div className="border-border border-b">
          <div className="flex gap-8">
            {["overview", "features", "requirements", "screenshots"].map(
              (tab) => (
                <motion.button
                  key={tab}
                  className={`pb-4 font-medium capitalize ${
                    activeTab === tab
                      ? "text-primary border-primary border-b-2"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ y: -2 }}
                >
                  {tab}
                </motion.button>
              ),
            )}
          </div>
        </div>
      </motion.section>

      {/* Tab Content */}
      <motion.section
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="prose max-w-none"
            >
              <h2 className="mb-4 text-2xl font-bold">Overview</h2>
              <p className="text-muted-foreground mb-6">
                {template.description}
              </p>
              <p className="text-muted-foreground">
                This template is perfect for building modern web applications
                with a focus on user experience and performance. It includes all
                the necessary components and features to get started quickly.
              </p>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="mb-6 text-2xl font-bold">Features</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {template.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="bg-card border-border flex items-center gap-3 rounded-lg border p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-primary h-2 w-2 rounded-full" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "requirements" && (
            <motion.div
              key="requirements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="mb-6 text-2xl font-bold">Requirements</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {template.requirements.map((requirement, index) => (
                  <motion.div
                    key={requirement}
                    className="bg-card border-border flex items-center gap-3 rounded-lg border p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-primary h-2 w-2 rounded-full" />
                    <span>{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "screenshots" && (
            <motion.div
              key="screenshots"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="mb-6 text-2xl font-bold">Screenshots</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {template.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}
