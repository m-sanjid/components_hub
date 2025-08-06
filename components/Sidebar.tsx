"use client";

import {
  IconArrowRight,
  IconHelp,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Components } from "@/types";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { allTemplates } from "@/lib/constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [components, setComponents] = useState<Components[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPath = usePathname();

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

  const renderLink = ({
    slug,
    title,
    index,
    isTemplate = false,
  }: {
    slug: string;
    title: string;
    index: number;
    isTemplate?: boolean;
  }) => {
    const isActive =
      currentPath === `/${isTemplate ? "templates" : "components"}/${slug}`;
    return (
      <motion.li
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        exit={{ x: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        onMouseEnter={() => {
          setIsHovered(true);
          setHoveredIndex(`${index}-${slug}`);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredIndex(null);
        }}
        key={slug}
        className="relative px-1"
      >
        <Link
          href={`/${isTemplate ? "templates" : "components"}/${slug}`}
          className={`relative flex items-center justify-between px-3 py-2 text-sm transition-all duration-200 ${
            isActive
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-primary"
          }`}
          onClick={() => setMobileOpen(false)}
        >
          {/* Active Indicator */}
          {isActive && (
            <motion.div
              layoutId="active-side-link"
              className="bg-primary/5 absolute inset-0 h-full w-full border"
            >
              <div className="relative h-full w-full">
                <div className="bg-primary absolute -top-0.5 -left-0.5 h-1 w-1" />
                <div className="bg-primary absolute -top-0.5 -right-0.5 h-1 w-1" />
                <div className="bg-primary absolute -bottom-0.5 -left-0.5 h-1 w-1" />
                <div className="bg-primary absolute -right-0.5 -bottom-0.5 h-1 w-1" />
              </div>
            </motion.div>
          )}
          <span className="truncate capitalize">{title}</span>
          <AnimatePresence>
            {isHovered && hoveredIndex === `${index}-${slug}` && (
              <motion.span
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-3"
              >
                <IconArrowRight size={16} />
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.li>
    );
  };

  const renderSkeletons = () =>
    Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="bg-muted mx-3 my-3 h-6 animate-pulse rounded-md"
      />
    ));

  const renderSections = () => (
    <div className="scrollbar-hide h-[calc(100vh-12rem)] overflow-x-hidden overflow-y-auto pr-2">
      <Section title="Components">
        {components.map((component, index) =>
          renderLink({
            slug: component.slug || "",
            title: component.title,
            index,
          }),
        )}
      </Section>
      <Section title="Templates">
        {allTemplates.map((template, index) =>
          renderLink({
            slug: template,
            title: template,
            index,
            isTemplate: true,
          }),
        )}
      </Section>
    </div>
  );

  return (
    <div className="relative">
      {/* Mobile Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="hover:bg-accent fixed top-20 z-20 rounded-md p-2 lg:hidden"
      >
        <IconMenu2 size={20} />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex"
          >
            <div className="bg-background relative z-50 w-64 overflow-y-auto p-4 pt-20 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Browse</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:bg-accent hover:text-primary absolute top-2 right-2 rounded p-1"
                >
                  <IconX size={20} />
                </button>
              </div>

              {isLoading ? (
                <ul>{renderSkeletons()}</ul>
              ) : error ? (
                <ErrorNotice />
              ) : (
                <ul>{renderSections()}</ul>
              )}

              <HelpSection />
            </div>
            <div
              className="flex-1 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        className={`bg-background sticky top-20 z-20 hidden h-screen w-64 flex-shrink-0 overflow-hidden border-r py-4 pl-2 shadow-sm lg:block dark:border-neutral-800`}
      >
        {isLoading ? (
          <ul className="h-[calc(100vh-12rem)] pt-10">{renderSkeletons()}</ul>
        ) : error ? (
          <ErrorNotice />
        ) : (
          <ul className="h-[calc(100vh-12rem)]">{renderSections()}</ul>
        )}
        <div className="z-50 mt-auto">
          <HelpSection />
        </div>
      </motion.aside>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-4">
    <h3 className="text-muted-foreground mb-1 px-3 text-xs font-medium tracking-wide uppercase">
      {title}
    </h3>
    <ul className="space-y-1">{children}</ul>
  </div>
);

const ErrorNotice = () => (
  <div className="p-4 text-sm text-red-500">
    Failed to load components. Please try again.
  </div>
);

const HelpSection = () => (
  <div className="text-muted-foreground mt-4 border-t pt-4 text-sm">
    <p className="mb-2">Need help with components?</p>
    <Link
      href="#"
      className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
    >
      <IconHelp size={16} />
      View documentation
    </Link>
  </div>
);

export default Sidebar;
