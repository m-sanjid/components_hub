"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

export interface BadgeProps extends Omit<HTMLMotionProps<"span">, "onDrag"> {
  variant?: "default" | "outline" | "destructive" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  pulse?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      variant = "default",
      size = "md",
      rounded = true,
      pulse = false,
      ...props
    },
    ref
  ) => {
    return (
      <motion.span
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center font-medium",
          {
            // Variants
            "bg-primary text-primary-foreground": variant === "default",
            "border border-border bg-background": variant === "outline",
            "bg-destructive text-destructive-foreground": variant === "destructive",
            "bg-success text-success-foreground": variant === "success",
            "bg-warning text-warning-foreground": variant === "warning",
            // Sizes
            "text-xs px-2 py-0.5": size === "sm",
            "text-sm px-2.5 py-0.5": size === "md",
            "text-base px-3 py-1": size === "lg",
            // Other
            "rounded-full": rounded,
            "rounded-md": !rounded,
          },
          className
        )}
        animate={pulse ? {
          scale: [1, 1.05, 1],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : undefined}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = "Badge"; 