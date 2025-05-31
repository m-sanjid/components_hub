"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AnimatedAccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultOpen?: string[];
  className?: string;
}

export function AnimatedAccordion({
  items,
  type = "single",
  defaultOpen = [],
  className = "",
}: AnimatedAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(id) ? [] : [id]);
    } else {
      setOpenItems(
        openItems.includes(id)
          ? openItems.filter((item) => item !== id)
          : [...openItems, id]
      );
    }
  };

  const contentVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 400,
          damping: 40,
          duration: 0.3,
        },
        opacity: {
          duration: 0.25,
          delay: 0.05,
        },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          type: "spring",
          stiffness: 400,
          damping: 40,
          duration: 0.25,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.3,
              ease: "easeOut"
            }}
            className="group"
          >
            <div className={`overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-all duration-200 ${
              isOpen 
                ? 'rounded-t-lg border-b-0 bg-neutral-50 dark:bg-neutral-800' 
                : 'rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}>
              <motion.button
                onClick={() => !item.disabled && toggleItem(item.id)}
                disabled={item.disabled}
                whileHover={!item.disabled ? { x: 2 } : undefined}
                whileTap={!item.disabled ? { scale: 0.995 } : undefined}
                className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${
                  item.disabled 
                    ? "cursor-not-allowed opacity-40" 
                    : "cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <div className={`transition-colors duration-200 ${
                      isOpen ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {item.icon}
                    </div>
                  )}
                  <span className={`font-medium transition-colors duration-200 ${
                    isOpen ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {item.title}
                  </span>
                </div>
                
                <motion.div
                  animate={{
                    rotate: isOpen ? 180 : 0,
                  }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                  className={`transition-colors duration-200 ${
                    isOpen ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </motion.button>
            </div>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={contentVariants}
                  className="overflow-hidden"
                >
                  <div className="border-x border-b px-4 pb-4 pt-3 rounded-b-lg">
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {item.content}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}