"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  delay?: number;
  className?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, position = "top", delay = 0, className }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
    };

    const arrowClasses = {
      top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45",
      right: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
      bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
      left: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45",
    };

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay }}
              className={clsx(
                "absolute z-50 whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
                positionClasses[position],
                className
              )}
            >
              {content}
              <div
                className={clsx(
                  "absolute h-2 w-2 bg-popover",
                  arrowClasses[position]
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
