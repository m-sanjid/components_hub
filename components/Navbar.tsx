"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { SearchDialog } from "./ui/Search";
import { IconMenu, IconComponents, IconTemplate } from "@tabler/icons-react";

const mainNavItems = [
  {
    title: "Components",
    href: "/components",
    icon: <IconComponents className="w-4 h-4" />,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: <IconTemplate className="w-4 h-4" />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const navRect = navRef.current
        ? navRef.current.getBoundingClientRect()
        : { left: 0 };
      setHoverPosition({
        left: rect.left - navRect.left,
        width: rect.width,
      });
      setIsHovered(true);
      toggleDropdown(e.currentTarget.textContent || "");
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      className={`sticky z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "top-4 mx-auto max-w-5xl border rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
          : "top-0 border-b bg-background/95 backdrop-blur"
      }`}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.stopPropagation()}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4 md:px-8 justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Logo />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <nav className="relative flex space-x-1" ref={navRef}>
            {/* Hover Effect */}
            {isHovered && (
              <motion.div
                className="absolute top-0 bottom-0 z-0 bg-primary/10 dark:bg-primary/20 rounded-lg"
                initial={false}
                animate={{
                  left: hoverPosition.left,
                  width: hoverPosition.width,
                  opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            {/* Main Nav Items */}
            {mainNavItems.map((item, idx) => (
              <Link href={item.href} key={idx} passHref>
                <button
                  className={`gap-2 text-sm flex items-center relative z-10 px-4 py-2 ${
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                      ? "text-primary font-medium"
                      : "text-foreground hover:text-primary"
                  }`}
                  onMouseEnter={handleHover}
                >
                  {item.icon}
                  {item.title}
                </button>
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div className="ml-20">
            <SearchDialog
              placeholder="Search components..."
              shortcut="⌘K"
              apiUrl="/api/search"
              componentsApiUrl="/api/components"
            />
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <IconMenu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {mainNavItems.map(({ title, href, icon }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link
                      href={href}
                      className="flex items-center gap-2 w-full"
                    >
                      {icon}
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SearchDialog
                  placeholder="Search..."
                  shortcut="⌘K"
                  apiUrl="/api/search"
                  componentsApiUrl="/api/components"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Theme Toggle */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.nav>
  );
}
