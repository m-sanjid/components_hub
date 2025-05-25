"use client";

import { forwardRef, useState, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  variant?: "default" | "flat" | "glass" | "outline" | "pill" | "solid";
  color?: "primary" | "success" | "danger" | "neutral";
  label?: string;
  srLabel?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      size = "md",
      disabled = false,
      className,
      variant = "default",
      color = "primary",
      label,
      srLabel,
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => setIsChecked(checked), [checked]);

    const handleToggle = () => {
      if (disabled) return;
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange?.(newValue);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    };

    const sizeMap = {
      sm: { container: "w-9 h-5", knob: "w-4 h-4", translate: "20px" },
      md: { container: "w-12 h-6", knob: "w-5 h-5", translate: "26px" },
      lg: { container: "w-16 h-9", knob: "w-7 h-7", translate: "36px" },
    };

    const colorMap = {
      primary: "bg-blue-500",
      success: "bg-green-500",
      danger: "bg-red-500",
      neutral: "bg-gray-400",
    };

    const variants: Record<string, string> = {
      default: "bg-gray-200 dark:bg-gray-700",
      flat: "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600",
      glass: "bg-white/20 dark:bg-white/10 backdrop-blur-md shadow-inner",
      outline: "border border-gray-400 dark:border-gray-600 bg-transparent",
      pill: "bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700",
      solid: isChecked
        ? colorMap[color]
        : "bg-gray-300 dark:bg-gray-700",
    };

    const knobBase =
      "absolute rounded-full bg-white dark:bg-gray-100 shadow-md ring-1 ring-black/5 dark:ring-white/10";

    return (
      <div className="flex items-center gap-2">
        {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-label={srLabel}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={clsx(
            "relative inline-flex items-center rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            sizeMap[size].container,
            variants[variant],
            {
              "opacity-50 cursor-not-allowed": disabled,
              "cursor-pointer": !disabled,
            },
            className
          )}
        >
          <motion.div
            className={clsx(knobBase, sizeMap[size].knob)}
            animate={{
              x: isChecked ? sizeMap[size].translate : "2px",
              scale: 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          />
        </button>
      </div>
    );
  }
);

Switch.displayName = "Switch";
