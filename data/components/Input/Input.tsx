"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  inputSize?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      inputSize = "md",
      onFocus,
      onBlur,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const baseClasses =
      "peer w-full transition-all duration-200 focus:outline-none bg-background text-foreground shadow-sm focus:shadow-md";

    const variantClasses = {
      default:
        "bg-white text-neutral-900 placeholder:text-neutral-400",
      primary:
        "bg-primary/10 text-primary placeholder:text-primary/60",
      secondary:
        "bg-secondary/10 text-secondary placeholder:text-secondary/60",
    };

    const sizeClasses = {
      sm: "text-sm px-3 py-2",
      md: "text-base px-4 py-2.5",
      lg: "text-lg px-5 py-3",
    };

    const isFloating = isFocused || (!!value || !!props.defaultValue);

    return (
      <div className="relative w-full">
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <motion.div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none z-10"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {leftIcon}
            </motion.div>
          )}

          {/* Right Icon */}
          {rightIcon && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none z-10"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {rightIcon}
            </motion.div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={clsx(
              baseClasses,
              variantClasses[variant],
              sizeClasses[inputSize],
              "rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary/50 focus:border-primary",
              {
                "pl-10": leftIcon,
                "pr-10": rightIcon,
                "border-red-500 focus:ring-red-400": error,
              },
              className
            )}
            {...props}
          />

          {/* Floating Label */}
          {label && (
            <motion.label
              className={clsx(
                "absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none bg-white px-1 transition-all",
                {
                  "text-sm top-0 translate-y-[-50%] scale-90": isFloating,
                  "left-10": leftIcon,
                  "text-red-500": error,
                }
              )}
              initial={false}
              animate={{
                top: isFloating ? "0.1rem" : "50%",
                left: leftIcon ? "2.5rem" : "1rem",
                fontSize: isFloating ? "0.75rem" : "1rem",
                color: error
                  ? "#ef4444"
                  : isFocused
                  ? "#3b82f6"
                  : "#737373",
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}
        </div>

        {/* Error or Helper Text */}
        <AnimatePresence>
          {error ? (
            <motion.p
              className="mt-1 text-sm text-red-500"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          ) : helperText ? (
            <motion.p
              className="mt-1 text-sm text-neutral-500"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {helperText}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";
