"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconX, IconMenu, IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export function Navbar({
  navItems = NavItems,
}: {
  navItems?: { href: string; label: string }[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.nav
      className={`sticky z-50 mx-auto w-full transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/80 top-3 max-w-4xl rounded-2xl border px-6 shadow-md backdrop-blur-lg"
          : "top-0 max-w-6xl bg-white dark:bg-black"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        {/* change to / while using  */}
        <Link href="" className="text-foreground text-lg font-bold">
          Logo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center md:flex">
          <div
            onMouseLeave={() => setHoveredIdx(null)}
            className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-100 p-1 backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800"
          >
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-lg px-4 py-2 text-sm font-medium transition-all"
                onMouseEnter={() => setHoveredIdx(idx)}
              >
                <motion.span
                  className={`relative z-10 ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {item.label}
                </motion.span>

                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="hover-pill"
                    className="absolute inset-0 rounded-lg bg-white dark:bg-black"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {isActive(item.href) && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-black"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle mounted={mounted} />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#"
              className="rounded-[12px] bg-black px-4 py-2 text-sm font-medium dark:bg-white"
            >
              <span className="text-white dark:text-black">Sign In</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle mounted={mounted} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border-border bg-muted/50 rounded-xl border p-2.5 backdrop-blur-sm transition-all"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="border-border bg-background/95 border-t shadow-lg backdrop-blur-xl md:hidden"
          >
            <nav className="container mx-auto space-y-1 px-4 py-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                      isActive(item.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                className="pt-4"
              >
                <Link
                  href="#"
                  className="rounded-[12px] bg-white px-4 py-2 text-sm font-medium dark:bg-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* --- Theme Toggle --- */
const ThemeToggle = ({ mounted }: { mounted: boolean }) => {
  const { theme, setTheme } = useTheme();
  if (!mounted) return null;

  return (
    <motion.button
      layout
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-[12px] border border-neutral-300 bg-black/10 p-2.5 backdrop-blur-sm transition-all dark:border-neutral-700 dark:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <IconMoon className="size-4" />
      ) : (
        <IconSun className="size-4" />
      )}
    </motion.button>
  );
};

const NavItems = [
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];
