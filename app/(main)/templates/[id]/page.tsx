"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { template } from "@/lib/constants";
import {
  IconCode,
  IconEye,
  IconFileDownload,
  IconSearch,
} from "@tabler/icons-react";
import AnimatedButton from "@/data/components/animated-button/AnimatedButton";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const slideVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TemplateDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsImageFullscreen(true);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "requirements", label: "Requirements" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-neutral-900">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, black 2px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          {/* Back Button */}
          <motion.button
            className="group mb-8 flex items-center gap-2 text-neutral-600 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            variants={itemVariants}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="h-5 w-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Templates
          </motion.button>

          <div className="grid items-start gap-16 lg:grid-cols-2">
            {/* Template Preview */}
            <motion.div variants={slideVariants} className="space-y-6">
              <motion.div
                className="group relative cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleImageClick(selectedImage)}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 shadow-2xl dark:bg-neutral-800">
                  <img
                    src={template.screenshots[selectedImage]}
                    alt={template.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 p-2 backdrop-blur-sm dark:bg-black/90">
                      <IconSearch />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-3">
                {template.screenshots.map((screenshot, index) => (
                  <motion.button
                    key={index}
                    className={`relative aspect-[4/3] w-20 overflow-hidden rounded-lg transition-all duration-200 ${
                      selectedImage === index
                        ? "ring-2 ring-neutral-900 dark:ring-white"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={screenshot}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Template Info */}
            <motion.div variants={slideVariants} className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                    {template.category}
                  </span>
                </div>

                <h1 className="text-4xl leading-tight font-bold text-neutral-900 lg:text-5xl dark:text-white">
                  {template.title}
                </h1>

                <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {template.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Price and Actions */}
              <div className="space-y-6">
                <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                  ${template.price}
                </div>

                {/* Action Buttons */}
                {/* TODO:- Add download functionality */}
                <div className="w-full space-y-3">
                  <motion.button
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-4 font-semibold text-white transition-colors duration-200 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconFileDownload />
                    Download Template
                  </motion.button>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <AnimatedButton
                      external
                      variant="secondary"
                      size="lg"
                      to={template.previewUrl}
                      label="Preview"
                      logo={<IconEye />}
                    />
                    <AnimatedButton
                      external
                      variant="secondary"
                      size="lg"
                      to={template.codeUrl}
                      label="Code"
                      logo={<IconCode />}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex w-max gap-1 rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            layoutId="tabContent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="max-w-4xl space-y-8">
                <div>
                  <h2 className="mb-6 text-3xl font-bold text-neutral-900 dark:text-white">
                    Template Overview
                  </h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="mb-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {template.description}
                    </p>
                    <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
                      This template is meticulously crafted for modern web
                      applications, focusing on user experience, performance,
                      and maintainability. It provides a solid foundation with
                      all necessary components and features to accelerate your
                      development process while ensuring scalability and best
                      practices.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="max-w-6xl">
                <h2 className="mb-8 text-3xl font-bold text-neutral-900 dark:text-white">
                  Key Features
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {template.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="group rounded-xl bg-neutral-50 p-6 transition-all duration-300 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-neutral-900 transition-transform duration-200 group-hover:scale-125 dark:bg-white" />
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {feature}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "requirements" && (
              <div className="max-w-4xl">
                <h2 className="mb-8 text-3xl font-bold text-neutral-900 dark:text-white">
                  System Requirements
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {template.requirements.map((requirement, index) => (
                    <motion.div
                      key={requirement}
                      className="flex items-center gap-4 rounded-xl bg-neutral-50 p-6 dark:bg-neutral-800"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <svg
                          className="h-5 w-5 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {requirement}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="max-w-6xl">
                <h2 className="mb-8 text-3xl font-bold text-neutral-900 dark:text-white">
                  Template Gallery
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {template.screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={screenshot}
                        alt={`Gallery image ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="rounded-full bg-white/90 p-2 backdrop-blur-sm dark:bg-black/90">
                          <svg
                            className="h-4 w-4 text-neutral-700 dark:text-neutral-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isImageFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageFullscreen(false)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-5xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={template.screenshots[selectedImage]}
                alt={`Fullscreen view ${selectedImage + 1}`}
                className="h-full w-full rounded-lg object-contain"
              />
              <button
                className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                onClick={() => setIsImageFullscreen(false)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
