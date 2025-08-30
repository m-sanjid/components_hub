"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function Accordion({
  id,
  title,
  children,
  isOpen = false,
  onToggle,
  className = "",
}: AccordionProps) {
  return (
    <motion.div
      layout="position"
      className={cn(
        "rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
      initial={false}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Header */}
      <motion.button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <span className="text-base font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          className="text-neutral-500 dark:text-neutral-400"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${id}`}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={accordionVariants}
            transition={{
              duration: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98],
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="px-4 pb-4"
            >
              {Array.isArray(children) ? (
                children.map((child, i) => (
                  <motion.div key={i} variants={fadeInUp} className="mb-2">
                    {child}
                  </motion.div>
                ))
              ) : (
                <motion.div variants={fadeInUp}>{children}</motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export interface AccordionGroupProps {
  items: { id: string; title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
  defaultOpen?: string[]; // array of ids to be open initially
  className?: string;
}

export function AccordionGroup({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = "",
}: AccordionGroupProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <Accordion
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openItems.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
}

const accordionVariants: Variants = {
  open: { opacity: 1, height: "auto", marginTop: 0 },
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
};

const staggerChildren: Variants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  hidden: {},
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: "blur(6px)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
