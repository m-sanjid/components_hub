"use client";

import { forwardRef, useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

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

    return (
      <div ref={ref} className={clsx("w-full", className)}>
        <div className="relative">
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={clsx(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  tab.disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:text-foreground/80",
                  activeTab === tab.value
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => handleTabChange(tab.value)}
                disabled={tab.disabled}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tabs.find((tab) => tab.value === activeTab)?.content}
        </motion.div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs"; 