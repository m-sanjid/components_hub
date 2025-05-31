"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  IconCalendar,
  IconUser,
  IconArrowRight,
  IconSearch,
} from "@tabler/icons-react";
import {
  fadeIn,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  staggerContainer,
} from "@/lib/animations";

const blogCategories = [
  "All",
  "Tutorials",
  "Design",
  "Development",
  "UI/UX",
  "Accessibility",
  "Performance",
];

const blogPosts = [
  {
    id: 1,
    title: "Building Accessible Components: Best Practices",
    excerpt:
      "Learn how to create components that are accessible to all users, including those with disabilities.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "April 10, 2025",
    author: "Sarah Chen",
    category: "Accessibility",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Optimizing Component Performance in React",
    excerpt:
      "Discover techniques to improve the performance of your React components for a smoother user experience.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "April 5, 2025",
    author: "Michael Rodriguez",
    category: "Performance",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Creating Beautiful Micro-Interactions with Framer Motion",
    excerpt:
      "Learn how to enhance your UI with subtle animations and micro-interactions that delight users.",
    image:
      "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "March 28, 2025",
    author: "Alex Johnson",
    category: "UI/UX",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 4,
    title: "The Future of Component Libraries in 2025",
    excerpt:
      "Explore emerging trends and technologies that will shape the future of component libraries.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "March 22, 2025",
    author: "Emily Taylor",
    category: "Development",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Designing Consistent Component Systems",
    excerpt:
      "Learn how to create a cohesive design system that ensures consistency across your application.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "March 15, 2025",
    author: "Sarah Chen",
    category: "Design",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Building a Dashboard UI with Our Components",
    excerpt:
      "Step-by-step tutorial on how to create a beautiful dashboard using our component library.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "March 8, 2025",
    author: "Michael Rodriguez",
    category: "Tutorials",
    readTime: "12 min read",
    featured: false,
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

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
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Blog</h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Insights, tutorials, and updates from our team of experts.
          </p>
        </motion.div>
      </motion.section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <motion.section
          className="container mx-auto mb-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <h2 className="mb-8 text-2xl font-bold">Featured Articles</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="group"
                variants={
                  index === 0 ? slideInFromLeft(0.3) : slideInFromRight(0.3)
                }
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative mb-4 h-64 overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="bg-primary mb-2 inline-block rounded-full px-2 py-1 text-xs font-medium text-white">
                        {post.category}
                      </span>
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm text-white/80">
                        <IconCalendar className="mr-1 h-4 w-4" />
                        <span className="mr-4">{post.date}</span>
                        <IconUser className="mr-1 h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Search and Filter */}
      <motion.section
        className="container mx-auto mb-12 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* Categories */}
          <motion.div
            className="flex flex-wrap gap-2"
            variants={staggerContainer}
          >
            {blogCategories.map((category, index) => (
              <motion.button
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
                onClick={() => setSelectedCategory(category)}
                variants={fadeIn(0.1 * index)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            className="relative w-full md:w-64"
            variants={slideInFromRight(0.3)}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IconSearch className="text-muted-foreground h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="border-border bg-card focus:ring-primary/20 focus:border-primary block w-full rounded-lg border py-2 pr-4 pl-10 text-sm transition-all outline-none focus:ring-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts */}
      <motion.section
        className="container mx-auto mb-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        {filteredPosts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
          >
            {filteredPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div className="py-12 text-center" variants={fadeIn()}>
            <h3 className="mb-2 text-xl font-medium">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </motion.div>
        )}
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="bg-primary/5 container mx-auto mb-20 rounded-3xl px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={slideInFromBottom(0.2)}>
            <h2 className="mb-4 text-3xl font-bold">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Get the latest articles, tutorials, and updates delivered straight
              to your inbox.
            </p>
          </motion.div>

          <motion.form
            className="flex flex-col gap-4 sm:flex-row"
            variants={slideInFromBottom(0.3)}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="border-border focus:ring-primary/20 focus:border-primary flex-1 rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2"
              required
            />
            <motion.button
              type="submit"
              className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 font-medium text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </motion.form>

          <motion.p
            className="text-muted-foreground mt-4 text-sm"
            variants={slideInFromBottom(0.4)}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}

interface BlogPostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
  };
  index: number;
}

function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <motion.div
      className="group"
      variants={fadeIn(0.1 * index)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/blog/${post.id}`}>
        <div className="relative mb-4 h-48 overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
              {post.category}
            </span>
            <span className="text-muted-foreground text-xs">
              {post.readTime}
            </span>
          </div>
          <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center text-sm">
              <IconCalendar className="mr-1 h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <span className="text-primary inline-flex items-center text-sm font-medium">
              Read more
              <IconArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
