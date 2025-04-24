"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

export interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
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
            type="radio"
            value={value}
            checked={checked}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="sr-only"
          />
          <motion.div
            className={clsx(
              "flex items-center justify-center w-5 h-5 rounded-full border",
              "transition-colors",
              checked
                ? "border-primary"
                : "border-input",
              error
                ? "border-destructive"
                : "hover:border-primary focus:border-primary",
              disabled && "opacity-50"
            )}
            whileTap={{ scale: 0.95 }}
          >
            {checked && (
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-primary"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              />
            )}
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

Radio.displayName = "Radio"; 