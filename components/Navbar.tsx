"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { IconTemplate, IconCircleDashed, IconMenu2 } from "@tabler/icons-react";
import { CommandPalette } from "./Cmdk";
import { cn } from "@/lib/utils";
import IconHover from "./IconHover";

const mainNavItems = [
  {
    title: "Components",
    href: "/components",
    icon: IconCircleDashed,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: IconTemplate,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
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
      setIsHovered(e.currentTarget.textContent || "");
      toggleDropdown(e.currentTarget.textContent || "");
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
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
          ? "bg-background/95 supports-[backdrop-filter]:bg-background/80 top-0 mx-auto max-w-6xl border-b border-[#FF6100]/20 shadow-lg backdrop-blur md:top-3 md:rounded-2xl md:border"
          : "bg-background/95 top-0 mx-auto w-full max-w-[100rem] backdrop-blur"
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
                className="absolute top-0 bottom-0 z-0 rounded-lg bg-[#FF6100]"
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
                  className={cn(
                    "group/icon relative z-10 flex items-center gap-2 px-4 py-2 text-sm transition-all duration-200 ease-in-out",
                    pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                      ? "font-semibold"
                      : "font-normal",
                    isHovered === item.title ? "text-white" : "",
                  )}
                  onMouseEnter={handleHover}
                >
                  <IconHover
                    icon={item.icon}
                    className={cn(
                      "bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-sm",
                      isHovered === item.title
                        ? "border-white/5 text-white"
                        : "",
                    )}
                  />
                  {item.title}
                </button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="mr-4 flex w-full justify-end md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="bg-primary/5 relative flex size-8 shrink-0 items-center justify-center rounded-md border p-1 backdrop-blur-sm"
                aria-label="Open navigation menu"
              >
                <IconMenu2 className="size-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 md:hidden">
              <DropdownMenuGroup>
                {mainNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="flex w-full items-center gap-2"
                    >
                      <item.icon />
                      {item.title}
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
