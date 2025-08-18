"use client";

import { useRef, useState, useEffect, KeyboardEvent } from "react";
import { IconLoader, IconMail, IconSend, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const EmailForm = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKeyDown as any);
    return () => document.removeEventListener("keydown", onKeyDown as any);
  }, [open]);

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      inputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed request");

      toast.success("Thanks! You'll hear from me soon.");
      setEmail("");
      setOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <AnimatePresence mode="popLayout">
      {open ? (
        <motion.div
          layoutId="emailForm"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex items-center justify-between">
            <motion.h3
              layoutId="drop"
              className="text-sm font-medium tracking-tight"
            >
              Drop your Email
            </motion.h3>
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500">
                I’ll get back to you soon.
              </p>
              <button
                aria-label="Close email form"
                onClick={() => setOpen(false)}
                className="rounded p-1 text-neutral-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:hover:text-white"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="you@example.com"
              aria-label="Your email address"
              className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-white dark:focus:ring-white"
            />
            <motion.button
              layout
              ref={buttonRef}
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1 rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    className="flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <IconLoader size={14} />
                    </motion.span>
                    Sending...
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    className="flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <IconSend className="h-4 w-4" />
                    Send
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          layoutId="emailForm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          onClick={() => {
            setOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="flex items-center justify-center gap-2 rounded-lg border border-black/5 bg-white px-3 py-2 shadow hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-black dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:ring-white"
        >
          <motion.span layoutId="drop" className="text-sm">
            Drop your Email
          </motion.span>
          <IconMail className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default EmailForm;
