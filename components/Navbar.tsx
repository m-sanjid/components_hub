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
import { IconTemplate, IconCircleDashed, IconMenu2 } from "@tabler/icons-react";
import { CommandPalette } from "./Cmdk";

const mainNavItems = [
  {
    title: "Components",
    href: "/components",
    icon: (
      <IconCircleDashed className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
    ),
  },
  {
    title: "Templates",
    href: "/templates",
    icon: (
      <IconTemplate className="bg-primary/5 text-muted-foreground hover:text-primary size-6 rounded-md border p-1 backdrop-blur-sm" />
    ),
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
      className={`sticky z-50 w-full transition-all duration-400 ease-in-out ${
        isScrolled
          ? "bg-background/95 supports-[backdrop-filter]:bg-background/80 top-0 md:top-3 mx-auto max-w-6xl md:rounded-2xl border shadow-lg backdrop-blur"
          : "bg-background/95 top-0 mx-auto max-w-7xl backdrop-blur"
      }`}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
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
                className="bg-primary/10 dark:bg-primary/20 absolute top-0 bottom-0 z-0 rounded-lg"
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
                  className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm ${
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
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <IconMenu2 className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 md:hidden">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {mainNavItems.map(({ title, href, icon }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link
                      href={href}
                      className="flex w-full items-center gap-2"
                    >
                      {icon}
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
