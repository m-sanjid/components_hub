"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { IconSearch, IconBook, IconCode, IconPalette, IconArrowRight, IconChevronRight } from "@tabler/icons-react";
import { fadeIn, slideInFromBottom, slideInFromLeft, slideInFromRight, staggerContainer } from "@/lib/animations";

const documentationCategories = [
  {
    title: "Getting Started",
    icon: <IconBook className="w-6 h-6" />,
    description: "Learn the basics of using our component library",
    links: [
      { title: "Introduction", href: "/documentation/introduction" },
      { title: "Installation", href: "/documentation/installation" },
      { title: "Usage", href: "/documentation/usage" },
      { title: "Configuration", href: "/documentation/configuration" },
    ],
  },
  {
    title: "Components",
    icon: <IconCode className="w-6 h-6" />,
    description: "Explore our extensive collection of UI components",
    links: [
      { title: "Buttons", href: "/components/buttons" },
      { title: "Forms", href: "/components/forms" },
      { title: "Navigation", href: "/components/navigation" },
      { title: "Layout", href: "/components/layout" },
      { title: "Feedback", href: "/components/feedback" },
    ],
  },
  {
    title: "Theming",
    icon: <IconPalette className="w-6 h-6" />,
    description: "Customize the look and feel of your components",
    links: [
      { title: "Theme Configuration", href: "/documentation/theming" },
      { title: "Color System", href: "/documentation/colors" },
      { title: "Typography", href: "/documentation/typography" },
      { title: "Dark Mode", href: "/documentation/dark-mode" },
    ],
  },
  {
    title: "Guides",
    icon: <IconBook className="w-6 h-6" />,
    description: "Step-by-step tutorials for common use cases",
    links: [
      { title: "Building a Dashboard", href: "/guides/dashboard" },
      { title: "Creating a Form", href: "/guides/form" },
      { title: "Authentication UI", href: "/guides/authentication" },
      { title: "Responsive Design", href: "/guides/responsive" },
    ],
  },
];

const popularDocs = [
  { title: "Getting Started", href: "/documentation/introduction", category: "Basics" },
  { title: "Button Component", href: "/components/buttons", category: "Components" },
  { title: "Form Validation", href: "/guides/form-validation", category: "Guides" },
  { title: "Theming Guide", href: "/documentation/theming", category: "Customization" },
  { title: "Animation Examples", href: "/guides/animations", category: "Advanced" },
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Everything you need to know about using our component library.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-muted-foreground" />
            </div>
            <motion.input
              type="text"
              placeholder="Search documentation..."
              className="block w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </motion.div>
      </motion.section>
      
      {/* Popular Documentation */}
      <motion.section 
        className="container mx-auto px-4 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.div 
          className="bg-card border border-border rounded-xl p-8"
          variants={slideInFromBottom(0.2)}
        >
          <h2 className="text-2xl font-bold mb-6">Popular Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDocs.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.05) }}
                whileHover={{ y: -3 }}
              >
                <Link 
                  href={doc.href}
                  className="block p-4 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="text-xs font-medium text-primary/70 block mb-1">
                    {doc.category}
                  </span>
                  <span className="font-medium flex items-center">
                    {doc.title}
                    <IconChevronRight className="ml-1 w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
      
      {/* Documentation Categories */}
      <motion.section 
        className="container mx-auto px-4 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
        >
          {documentationCategories.map((category, index) => (
            <motion.div 
              key={category.title}
              className="bg-card border border-border rounded-xl overflow-hidden"
              variants={
                index % 2 === 0 
                  ? slideInFromLeft(0.2) 
                  : slideInFromRight(0.2)
              }
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-8">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {category.links.map((link, idx) => (
                    <motion.li 
                      key={link.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.05) }}
                    >
                      <Link 
                        href={link.href}
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <IconChevronRight className="mr-2 w-4 h-4 text-primary" />
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                <Link 
                  href={`/documentation/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  View all {category.title.toLowerCase()}
                  <IconArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      
      {/* Documentation Example */}
      <motion.section 
        className="container mx-auto px-4 py-16 bg-primary/5 rounded-3xl mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideInFromLeft(0.2)}>
            <h2 className="text-3xl font-bold mb-6">Comprehensive Documentation</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our documentation includes detailed API references, code examples, and interactive demos to help you get the most out of our components.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Each component is thoroughly documented with props, variants, and usage guidelines to ensure you can implement them quickly and correctly.
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link 
                href="/documentation/introduction"
                className="text-primary font-medium inline-flex items-center"
              >
                Get started with our documentation
                <IconArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-card border border-border rounded-xl overflow-hidden"
            variants={slideInFromRight(0.4)}
          >
            <div className="border-b border-border px-6 py-4 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-sm text-muted-foreground">Button.tsx</div>
            </div>
            <pre className="p-6 text-sm overflow-x-auto">
              <code className="language-tsx">
{`import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };`}
              </code>
            </pre>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Video Tutorials */}
      <motion.section 
        className="container mx-auto px-4 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.div 
          className="text-center mb-12"
          variants={slideInFromBottom(0.1)}
        >
          <h2 className="text-3xl font-bold mb-4">Video Tutorials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn by watching our step-by-step video guides on how to use our components.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <VideoCard 
            title="Getting Started with Components Hub"
            duration="12:34"
            thumbnail="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            href="/tutorials/getting-started"
            delay={0.1}
          />
          <VideoCard 
            title="Building a Dashboard UI"
            duration="18:22"
            thumbnail="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            href="/tutorials/dashboard"
            delay={0.2}
          />
          <VideoCard 
            title="Advanced Component Customization"
            duration="15:47"
            thumbnail="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            href="/tutorials/customization"
            delay={0.3}
          />
        </div>
        
        <motion.div 
          className="text-center mt-10"
          variants={slideInFromBottom(0.4)}
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link 
            href="/tutorials"
            className="inline-flex items-center text-primary font-medium"
          >
            View all tutorials
            <IconArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
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
          className="bg-primary rounded-3xl overflow-hidden"
          variants={slideInFromBottom(0.2)}
        >
          <div className="px-8 py-16 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need help with implementation?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to assist you with any questions or challenges you may face.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-medium inline-block"
                >
                  Contact Support
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="https://github.com/components-hub"
                  className="bg-transparent text-white border border-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium inline-block"
                >
                  GitHub Repository
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

interface VideoCardProps {
  title: string;
  duration: string;
  thumbnail: string;
  href: string;
  delay: number;
}

function VideoCard({ title, duration, thumbnail, href, delay }: VideoCardProps) {
  return (
    <motion.div 
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href}>
        <div className="relative rounded-xl overflow-hidden mb-4">
          <div 
            className="aspect-video bg-cover bg-center rounded-xl overflow-hidden"
            style={{ backgroundImage: `url(${thumbnail})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
              </motion.div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
          </div>
        </div>
        <h3 className="font-medium group-hover:text-primary transition-colors">{title}</h3>
      </Link>
    </motion.div>
  );
}
