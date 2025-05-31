"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
export interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultValue, className, onValueChange }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

    const handleTabChange = (value: string) => {
      if (tabs.find((tab) => tab.value === value)?.disabled) return;
      setActiveTab(value);
      onValueChange?.(value);
    };

    const tabIndicatorTransition = {
      type: "spring",
      stiffness: 500,
      damping: 30,
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <div className="relative overflow-hidden">
          <div className="border-border relative flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  "focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  tab.disabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:text-foreground/90 cursor-pointer",
                  activeTab === tab.value
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
                onClick={() => handleTabChange(tab.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTabChange(tab.value);
                  }
                }}
                disabled={tab.disabled}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="tab-underline"
                    className="bg-primary absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
                    transition={tabIndicatorTransition}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              {tabs.find((tab) => tab.value === activeTab)?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  },
);

Tabs.displayName = "Tabs";
