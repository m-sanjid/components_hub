"use client";

import { IconArrowRight, IconHelp, IconLoader2 } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Components } from "@/types";
import { motion } from "motion/react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
  currentSlug?: string;
}

const Sidebar = ({ className, currentSlug }: SidebarProps) => {
  const [components, setComponents] = useState<Components[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadSnippets() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/components");
        if (!res.ok) throw new Error("Failed to fetch components");
        const data = await res.json();
        setComponents(data);
      } catch (err) {
        console.error("Failed to load snippets:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    loadSnippets();
  }, []);

  return (
    <motion.aside
      className={`sticky top-14 z-20 hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto bg-white md:block dark:bg-neutral-900 ${className}`}
    >
      <div className="flex h-full flex-col border-r border-neutral-200 bg-inherit dark:border-neutral-800">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Components
          </h2>
        </div>

        <nav className="flex-grow overflow-y-auto py-2">
          {isLoading ? (
            <div className="flex h-20 items-center justify-center text-neutral-500">
              <IconLoader2 className="mr-2 animate-spin" size={18} />
              <span>Loading components...</span>
            </div>
          ) : error ? (
            <div className="p-4 text-sm text-red-500">
              Failed to load components. Please try again.
            </div>
          ) : components.length === 0 ? (
            <div className="p-4 text-sm text-neutral-500">
              No components found.
            </div>
          ) : (
            <motion.ul className="space-y-1 px-3">
              {components.map((component, index) => {
                const isActive = component.slug === currentSlug;

                return (
                  <motion.li
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    exit={{ x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    onMouseEnter={() => {
                      setIsHovered(true);
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                      setHoveredIndex(null);
                    }}
                    key={component.slug}
                  >
                    <Link
                      href={`/components/${component.slug}`}
                      className={`transition-duration-300 flex rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive ? "text-primary font-bold" : ""
                      } ${isHovered && hoveredIndex === index ? "text-primary" : "text-muted-foreground"}`}
                    >
                      <span className="truncate">{component.title}</span>
                      {isHovered && hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-3"
                        >
                          <IconArrowRight size={16} />
                        </motion.div>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </nav>

        <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <p className="mb-2">Need help with components?</p>
            <Link
              href="#"
              className="flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              <IconHelp size={16} className="mr-1 flex-shrink-0" />
              <span className="truncate">View documentation</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
