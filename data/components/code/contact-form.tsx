"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ------------------
// Context & Provider
// ------------------
interface ContactContextProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isSubmitting: boolean;
  handleBlur: (field: string) => void;
  validateField: (name: string, value: string) => string;
  isFocused: string | null;
  setIsFocused: React.Dispatch<React.SetStateAction<string | null>>;
}

const ContactContext = React.createContext<ContactContextProps | null>(null);
const useContactForm = () => {
  const ctx = React.useContext(ContactContext);
  if (!ctx)
    throw new Error(
      "Contact form components must be used inside <ContactForm />",
    );
  return ctx;
};

// ------------------
// Variants
// ------------------
const labelVariants = {
  default: { y: 30, x: 6, scale: 1 },
  focused: { y: -2, x: 0, scale: 0.85 },
};

const errorVariants: Variants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  visible: { opacity: 1, y: 0, height: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, height: 0, transition: { duration: 0.2 } },
};

const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
  loading: { scale: 1 },
};

const spinnerVariants: Variants = {
  spin: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
};

// ------------------
// Main Form Provider
// ------------------
export function ContactForm({
  children,
  className = "",
  onSubmit,
}: {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (
    data: Record<string, string>,
  ) => Promise<{ success: boolean; message?: string }>;
}) {
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    if (!value?.trim()) return `${name} is required`;
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a valid email";
    return "";
  };

  const handleBlur = (field: string) => {
    setIsFocused(null);
    const error = validateField(field, formData[field]);
    if (error) setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = onSubmit
        ? await onSubmit(formData)
        : { success: true, message: "Message sent successfully" };
      if (response.success) {
        toast.success(response.message || "Message sent successfully!");
        setFormData({});
        setErrors({});
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        formData,
        setFormData,
        errors,
        setErrors,
        isSubmitting,
        handleBlur,
        validateField,
        isFocused,
        setIsFocused,
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "mx-auto max-w-2xl space-y-2 rounded-md border bg-neutral-50 p-4 dark:bg-neutral-900",
          className,
        )}
      >
        {children}
      </motion.form>
    </ContactContext.Provider>
  );
}

// ------------------
// Input Field
// ------------------
export function ContactField({
  name,
  type = "text",
  label,
  placeholder = "",
  className = "",
}: {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  className?: string;
}) {
  const {
    formData,
    setFormData,
    errors,
    isSubmitting,
    handleBlur,
    isFocused,
    setIsFocused,
  } = useContactForm();
  const shouldFloat = isFocused === name || formData[name]?.length > 0;

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        variants={labelVariants}
        animate={shouldFloat ? "focused" : "default"}
        transition={{ duration: 0.3 }}
        className={`pointer-events-none absolute text-sm font-medium ${errors[name]
            ? "text-red-500"
            : shouldFloat
              ? "text-primary"
              : "text-neutral-500"
          }`}
      >
        {label}
      </motion.label>
      <motion.input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name] || ""}
        disabled={isSubmitting}
        onFocus={() => setIsFocused(name)}
        onBlur={() => handleBlur(name)}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, [name]: e.target.value }))
        }
        className={cn(
          "mt-6 w-full rounded-md border bg-white px-4 py-1 dark:bg-neutral-800",
          {
            "border-red-500 focus:ring-red-500": errors[name],
            "focus:ring-primary border-neutral-200 dark:border-neutral-700":
              !errors[name],
            className,
          },
        )}
      />
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-1 text-sm text-red-500"
          >
            {errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------
// Textarea Field
// ------------------
export function ContactTextArea({
  name,
  label,
  placeholder = "",
  className = "",
}: {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}) {
  const {
    formData,
    setFormData,
    errors,
    isSubmitting,
    handleBlur,
    isFocused,
    setIsFocused,
  } = useContactForm();
  const shouldFloat = isFocused === name || formData[name]?.length > 0;

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        variants={labelVariants}
        animate={shouldFloat ? "focused" : "default"}
        className={`pointer-events-none absolute text-sm font-medium ${errors[name]
            ? "text-red-500"
            : shouldFloat
              ? "text-primary"
              : "text-neutral-500"
          }`}
      >
        {label}
      </motion.label>
      <motion.textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={4}
        value={formData[name] || ""}
        disabled={isSubmitting}
        onFocus={() => setIsFocused(name)}
        onBlur={() => handleBlur(name)}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, [name]: e.target.value }))
        }
        className={cn(
          "resize-vertical mt-6 w-full overflow-hidden rounded-lg border bg-white px-4 py-3 dark:bg-neutral-800",
          {
            "border-red-500 focus:ring-red-500": errors[name],
            "focus:ring-primary border-neutral-200 dark:border-neutral-700":
              !errors[name],
            className,
          },
        )}
      />
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-px text-sm text-red-500"
          >
            {errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------
// Submit Button
// ------------------
export function ContactSubmit({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isSubmitting } = useContactForm();
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      variants={buttonVariants}
      initial="idle"
      whileHover={!isSubmitting ? "hover" : "loading"}
      whileTap={!isSubmitting ? "tap" : "loading"}
      className={cn(
        "mt-2 w-full rounded-lg px-6 py-3 text-sm font-medium text-white dark:text-black",
        {
          "cursor-not-allowed bg-neutral-400": isSubmitting,
          "bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90":
            !isSubmitting,
          className,
        },
      )}
    >
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            <motion.div
              variants={spinnerVariants}
              animate="spin"
              className="mr-3 h-5 w-5 rounded-full border-2 border-transparent border-t-white"
            />
            Sending...
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
