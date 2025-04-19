"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { IconMenu, IconStar, IconX } from "@tabler/icons-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/blog", label: "Blog" },
  { path: "/snippets", label: "Snippets" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    setHoverPosition({ left: offsetLeft, width: offsetWidth });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full">
      <nav
        className={`w-full z-50 ${
          isScrolled
            ? "rounded-lg bg-neutral-200/80 dark:bg-black/80 backdrop-blur-xl mx-10 max-w-4xl duration-300 ease-in-out px-10"
            : "max-w-7xl"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between h-16">
            <IconStar size={20} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 relative">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  onMouseEnter={handleHover}
                  className="transition-colors z-20 hover:text-primary relative py-1 px-2 rounded-lg text-primary font-medium cursor-pointer"
                >
                  {item.label}
                </div>
              ))}

              <ThemeToggle />

              {/* Hover underline or background effect */}
              {isHovered && (
                <motion.div
                  className="absolute bottom-0 h-8 bg-black/10 dark:bg-white/20 rounded-lg z-10"
                  initial={false}
                  animate={{
                    left: hoverPosition.left,
                    width: hoverPosition.width,
                    opacity: 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <IconX size={20} /> : <IconMenu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full animate-fade-in bg-background z-40">
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item) => (
                  <div
                    key={item.path}
                    className="block py-2 text-primary font-medium"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
