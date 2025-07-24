"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconX, IconMenu, IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.nav
      className={`sticky z-50 mx-auto w-full transition-all duration-300 ${
        scrolled
          ? "top-3 max-w-4xl rounded-full border-b border-neutral-200/50 bg-white/40 px-8 shadow-lg backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-900/40"
          : "top-0 max-w-5xl bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        Logo

        {/* Desktop Navigation */}
        <nav className="hidden items-center md:flex">
          <div
            onMouseLeave={() => setHoveredIdx(null)}
            className="flex items-center gap-1 rounded-xl border border-neutral-200/50 bg-neutral-100/70 p-1 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-800/70"
          >
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                onMouseEnter={() => setHoveredIdx(idx)}
              >
                <motion.span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100"
                  }`}
                >
                  {item.label}
                </motion.span>

                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg border border-neutral-200/50 bg-white shadow-sm dark:border-neutral-600/50 dark:bg-neutral-700 dark:shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {/* Active tab background */}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg border border-neutral-200/50 bg-white shadow-sm dark:border-neutral-600/50 dark:bg-neutral-700"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-white/50 opacity-0 group-hover:opacity-100 dark:bg-neutral-700/50"
                  transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Theme Toggle */}
          {/* <ThemeToggle mounted={mounted} /> */}
          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-700 px-6 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl dark:from-neutral-100 dark:to-neutral-300 dark:text-neutral-900"
            >
              <motion.span className="relative z-10" whileHover={{ y: -1 }}>
                Book a call
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle */}
          {/* <ThemeToggle mounted={mounted} /> */}
          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-neutral-200/50 bg-neutral-100/70 p-2.5 backdrop-blur-sm transition-all duration-200 dark:border-neutral-700/50 dark:bg-neutral-800/70"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <IconX className="h-5 w-5" />
                ) : (
                  <IconMenu className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="border-t border-neutral-200/50 bg-white/95 shadow-lg backdrop-blur-xl dark:border-neutral-800/50 dark:bg-neutral-900/95 md:hidden"
          >
            <nav className="container mx-auto space-y-1 px-4 py-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  className="block w-full rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-700 py-3 text-center text-sm font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl dark:from-neutral-100 dark:to-neutral-300 dark:text-neutral-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a call
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}


//Todo: Theme toggle