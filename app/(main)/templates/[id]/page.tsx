"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconHeart, IconShare, IconDownload, IconCode, IconEye, IconStar } from "@tabler/icons-react";
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
        className="container mx-auto px-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={slideInFromLeft(0.2)}
      >
        <Link 
          href="/templates"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <IconArrowLeft className="w-5 h-5 mr-2" />
          Back to Templates
        </Link>
      </motion.div>

      {/* Template Header */}
      <motion.section 
        className="container mx-auto px-4 mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Template Preview */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden bg-card border border-border"
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
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                  {template.category}
                </span>
                <span className="text-white/80 text-sm">
                  {template.rating} <IconStar className="w-4 h-4 inline-block" /> ({template.reviews} reviews)
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{template.title}</h1>
              <p className="text-white/80 line-clamp-2">{template.description}</p>
            </div>
          </motion.div>

          {/* Template Info */}
          <motion.div 
            className="space-y-6"
            variants={slideInFromRight(0.2)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={handleLike}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconHeart className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} />
                </motion.button>
                <motion.button
                  className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconShare className="w-6 h-6" />
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
                  className="bg-secondary text-foreground text-sm px-3 py-1 rounded-full"
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
                className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconDownload className="w-5 h-5" />
                Download Template
              </motion.button>
              <motion.button
                className="w-full bg-secondary text-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconEye className="w-5 h-5" />
                Live Preview
              </motion.button>
              <motion.button
                className="w-full border border-border py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-secondary/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconCode className="w-5 h-5" />
                View Source Code
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Tabs Navigation */}
      <motion.section 
        className="container mx-auto px-4 mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <div className="border-b border-border">
          <div className="flex gap-8">
            {["overview", "features", "requirements", "screenshots"].map((tab) => (
              <motion.button
                key={tab}
                className={`pb-4 font-medium capitalize ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ y: -2 }}
              >
                {tab}
              </motion.button>
            ))}
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
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground mb-6">{template.description}</p>
              <p className="text-muted-foreground">
                This template is perfect for building modern web applications with a focus on user experience and performance.
                It includes all the necessary components and features to get started quickly.
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
              <h2 className="text-2xl font-bold mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
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
              <h2 className="text-2xl font-bold mb-6">Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.requirements.map((requirement, index) => (
                  <motion.div
                    key={requirement}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
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
              <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {template.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
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