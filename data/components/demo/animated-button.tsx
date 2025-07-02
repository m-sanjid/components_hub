"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, ReactNode } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";

type AnimatedButtonProps = {
  label: string;
  logo?: ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  external?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
};

export const AnimatedButton = ({
  label,
  logo,
  className,
  to,
  onClick,
  external = false,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
}: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    "my-2 px-3 py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-2";

  const sizeVariants: Record<string, string> = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-lg",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-neutral-200 text-black hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600",
    ghost:
      "bg-transparent text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20",
  };

  return (
    <div>
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={clsx(
          baseStyles,
          variants[variant],
          sizeVariants[size],
          className,
        )}
      >
        <span>{label}</span>

        <div className="relative h-5 w-5">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="initial-arrow"
                initial={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0"
              >
                {logo ? (
                  logo
                ) : (
                  <IconArrowRight className="h-4 w-4 -rotate-45" />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="hover-arrow"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0"
              >
                {logo ? (
                  logo
                ) : (
                  <IconArrowRight className="h-4 w-4 -rotate-45" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
};

const AnimatedButtonDemo = () => {
  return <AnimatedButton label="Click me" />;
};

export default AnimatedButtonDemo;
