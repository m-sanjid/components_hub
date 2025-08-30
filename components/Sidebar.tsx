"use client";

import {
  IconArrowRight,
  IconBrandX,
  IconCircleDashed,
  IconFileDescription,
  IconMenu2,
  IconPhone,
  IconTemplate,
  IconX,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Components } from "@/types";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "next-view-transitions";
import { templates } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { ProgressiveBlur } from "./motion-primitives/progressive-blur";

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
    icon,
    link,
  }: {
    slug?: string;
    title: string;
    index: number;
    isTemplate?: boolean;
    icon?: React.ReactNode;
    link?: string;
  }) => {
    const isActive =
      currentPath ===
      `${link || `/${isTemplate ? "templates" : "components"}/${slug}`}`;
    const href = link || `/${isTemplate ? "templates" : "components"}/${slug}`;
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
          href={href}
          className={`relative flex items-center justify-start gap-2 px-3 py-2 text-sm transition-all duration-200 ${
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
              className="absolute inset-0 h-full w-full border bg-[#FF6100]/5"
            >
              <div className="relative h-full w-full">
                <div className="absolute -top-0.5 -left-0.5 h-1 w-1 bg-[#FF6100]" />
                <div className="absolute -top-0.5 -right-0.5 h-1 w-1 bg-[#FF6100]" />
                <div className="absolute -bottom-0.5 -left-0.5 h-1 w-1 bg-[#FF6100]" />
                <div className="absolute -right-0.5 -bottom-0.5 h-1 w-1 bg-[#FF6100]" />
              </div>
            </motion.div>
          )}
          {icon}
          <span className="truncate capitalize">{title}</span>
          <AnimatePresence>
            {isHovered && hoveredIndex === `${index}-${slug}` && (
              <motion.span
                layoutId="hover-side-indicator"
                className="absolute right-3 text-[#FF6100]"
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
    Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="bg-muted mx-3 my-3 h-6 animate-pulse" />
    ));

  const renderSections = () => (
    <div className="scrollbar-hide h-[calc(100vh-12rem)] overflow-x-hidden overflow-y-auto py-4 pr-2">
      <Section title="Installation">
        {renderLink({
          slug: "installation",
          title: "Installation",
          index: 0,
          icon: (
            <IconFileDescription className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
          ),
        })}
        {renderLink({
          slug: "cli",
          title: "shadcn CLI",
          index: 1,
          icon: (
            <IconFileDescription className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
          ),
        })}
        {renderLink({
          slug: "credits",
          title: "Credits",
          index: 2,
          icon: (
            <IconFileDescription className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
          ),
        })}
      </Section>
      <Section title="navigation">
        {renderLink({
          link: "/components",
          title: "Components",
          index: 0,
          icon: (
            <IconCircleDashed className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
          ),
        })}
        {renderLink({
          link: "/templates",
          title: "Templates",
          index: 1,
          icon: (
            <IconTemplate className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
          ),
        })}
      </Section>
      <Section title="Components">
        {components.map((component, index) =>
          renderLink({
            slug: component.slug || "",
            title: component.title,
            index,
            icon: (
              <IconCircleDashed className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
            ),
          }),
        )}
      </Section>
      <Section title="Templates">
        {templates.map((t, index) =>
          renderLink({
            slug: String(t.id),
            title: t.title,
            index,
            isTemplate: true,
            icon: (
              <IconTemplate className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
            ),
          }),
        )}
      </Section>
    </div>
  );

  return (
    <div className="scrollbar-hide relative">
      <ProgressiveBlur
        direction="top"
        blurIntensity={0.5}
        className="absolute top-0 z-50 h-8 w-full"
      />
      {/* Mobile Button */}
      <AnimatePresence mode="popLayout">
        {!mobileOpen && (
          <motion.button
            layoutId="mobile-button"
            aria-label="Open mobile menu"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            transition={{ delay: 0.2, duration: 0.2, ease: "easeInOut" }}
            onClick={() => setMobileOpen(true)}
            className="hover:bg-accent bg-primary/10 fixed top-18 z-50 flex size-8 shrink-0 items-center justify-center rounded-md border backdrop-blur-md md:top-22 lg:hidden"
          >
            <IconMenu2 className="size-5" />
          </motion.button>
        )}

        {/* Mobile Drawer */}
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="scrollbar-hide fixed inset-0 z-40 flex"
          >
            <div className="bg-background relative z-50 w-64 overflow-y-auto p-4 pt-24 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Browse</h2>
                <motion.button
                  layoutId="mobile-button"
                  aria-label="Close mobile menu"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ delay: 0.2, duration: 0.2, ease: "easeInOut" }}
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:bg-accent hover:text-primary absolute top-20 right-2 rounded p-2"
                >
                  <IconX size={20} />
                </motion.button>
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
        className={`bg-background sticky top-20 z-20 hidden h-screen w-64 flex-shrink-0 overflow-hidden border-r py-4 pt-4 pl-2 lg:block dark:border-neutral-800`}
      >
        {isLoading ? (
          <ul className="h-[calc(100vh-12rem)] pt-10">{renderSkeletons()}</ul>
        ) : error ? (
          <ErrorNotice />
        ) : (
          <ul className="h-[calc(100vh-12rem)]">{renderSections()}</ul>
        )}
        <div className="relative">
          <ProgressiveBlur className="pointer-events-none absolute bottom-0 z-50 h-4 w-full" />
        </div>
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
    <h3 className="text-muted-foreground mb-1 px-3 text-xs font-bold tracking-wide uppercase">
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
  <div className="space-y-2 border-t pt-4 text-sm">
    <p className="text-muted-foreground mb-2">Need help with components?</p>
    <Link
      aria-label="Contact Us"
      href="/contact"
      className="flex items-center gap-1 hover:underline"
    >
      <IconPhone className="bg-primary/20 text-primary h-6 w-6 rounded-md border p-1 backdrop-blur-md" />
      Contact Us
    </Link>
    <Link
      aria-label="Follow for updates"
      href="https://x.com/dev_sanjid"
      className="flex items-center gap-1 hover:underline"
    >
      <IconBrandX className="bg-primary/20 text-primary h-6 w-6 rounded-md border p-1 backdrop-blur-md" />
      Follow for updates
    </Link>
  </div>
);

export default Sidebar;
