"use client";

import { forwardRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import clsx from "clsx";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      label,
      error,
      helperText,
      disabled = false,
      className,
    },
    ref
  ) => {
    return (
      <div className={clsx("flex flex-col gap-1", className)}>
        <label
          className={clsx(
            "flex items-center gap-2 cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          <motion.div
            className={clsx(
              "flex items-center justify-center w-5 h-5 rounded border",
              "transition-colors",
              checked
                ? "bg-primary border-primary"
                : "bg-background border-input",
              error
                ? "border-destructive"
                : "hover:border-primary focus:border-primary",
              disabled && "opacity-50"
            )}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {checked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconCheck className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {label && (
            <span
              className={clsx(
                "text-sm",
                error ? "text-destructive" : "text-foreground"
              )}
            >
              {label}
            </span>
          )}
        </label>
        {(error || helperText) && (
          <p
            className={clsx(
              "text-sm",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox"; 