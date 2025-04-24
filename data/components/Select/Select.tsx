"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import clsx from "clsx";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  helperText,
  disabled = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={clsx("relative", className)} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label}
        </label>
      )}
      <div
        className={clsx(
          "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg border bg-background",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          error
            ? "border-destructive focus:ring-destructive"
            : "border-input focus:ring-primary",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={clsx(!selectedOption && "text-muted-foreground")}>
          {selectedOption?.label || placeholder}
        </span>
        <IconChevronDown
          className={clsx(
            "h-4 w-4 transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={clsx(
                  "px-3 py-2 text-sm cursor-pointer",
                  "hover:bg-accent hover:text-accent-foreground",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  option.value === value && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  if (!option.disabled) {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }
                }}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {(error || helperText) && (
        <p
          className={clsx(
            "mt-1 text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
} 