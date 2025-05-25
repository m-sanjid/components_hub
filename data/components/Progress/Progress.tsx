"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

export interface ProgressProps {
  value?: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "destructive";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      showValue = false,
      animated = true,
      className,
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={clsx(
            "relative overflow-hidden rounded-full bg-muted",
            {
              "h-1": size === "sm",
              "h-2": size === "md",
              "h-3": size === "lg",
            },
            className
          )}
        >
          <motion.div
            className={clsx("h-full rounded-full", {
              "bg-primary": variant === "default",
              "bg-success": variant === "success",
              "bg-warning": variant === "warning",
              "bg-destructive": variant === "destructive",
            })}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={animated ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
          />
        </div>
        {showValue && (
          <div className="mt-1 text-sm text-muted-foreground text-right">
            {percentage.toFixed(0)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress"; 