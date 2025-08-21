"use client";

import { useRef, useState, useEffect } from "react";
import { IconLoader, IconMail, IconSend, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export default function EmailForm() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Request failed");

      toast.success("Thanks! You'll hear from me soon.");
      setEmail("");
      setOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sharedButtonClasses =
    "rounded-md px-3 py-2 text-sm transition-colors duration-150 disabled:opacity-50";

  return (
    <div className="">
      <AnimatePresence mode="popLayout">
        {open ? (
          <motion.div
            layoutId="emailForm"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <motion.div
                layoutId="drop"
                className="text-sm font-semibold tracking-tight"
              >
                Drop your Email
              </motion.div>
              <button
                aria-label="Close email form"
                onClick={() => setOpen(false)}
                className="rounded p-1 text-neutral-500 hover:text-black dark:hover:text-white"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ delay: 0.2, duration: 0.15 }}
              className="text-xs text-neutral-500"
            >
              I&apos;ll get back to you soon.
            </motion.div>

            {/* Input + Send */}
            <div className="flex gap-2">
              <motion.input
                layout
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="you@example.com"
                className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-neutral-500"
              />
              <motion.button
                layout
                layoutId="icon"
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`${sharedButtonClasses} flex items-center gap-1 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200`}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {isSubmitting ? (
                    <motion.span
                      key="loading"
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                      transition={{ delay: 0.2, duration: 0.15 }}
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
                      <span className="hidden text-xs md:block">
                        Sending...
                      </span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                      transition={{ delay: 0.2, duration: 0.15 }}
                    >
                      <IconSend className="h-4 w-4" />
                      <span className="hidden text-xs md:block">Send</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            layoutId="emailForm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={() => {
              setOpen(true);
              setTimeout(() => inputRef.current?.focus(), 150);
            }}
            className={`${sharedButtonClasses} flex items-center justify-center gap-2 border border-black/5 bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700`}
          >
            <motion.span
              layoutId="drop"
              className="text-sm font-semibold tracking-tight"
            >
              Drop your Email
            </motion.span>
            <motion.div layoutId="icon" className="text-sm">
              <IconMail className="h-4 w-4" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
