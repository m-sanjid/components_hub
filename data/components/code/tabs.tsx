"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  height?: string; // optional fixed height
}

export function Tabs({
  tabs,
  defaultValue,
  onValueChange,
  className,
  height = "h-[300px]", // default fixed height
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0].value);
  const [prevIndex, setPrevIndex] = useState<number>(0);

  const currentIndex = tabs.findIndex((t) => t.value === activeTab);

  const handleTabChange = (newValue: string) => {
    setPrevIndex(currentIndex);
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") {
      const next = (currentIndex + 1) % tabs.length;
      handleTabChange(tabs[next].value);
    } else if (e.key === "ArrowLeft") {
      const prev = (currentIndex - 1 + tabs.length) % tabs.length;
      handleTabChange(tabs[prev].value);
    }
  };

  return (
    <div className={clsx("w-full space-y-2", className)}>
      {/* Tabs Header */}
      <div
        className="relative grid grid-cols-2 md:grid-cols-3 gap-1 rounded-[12px] border bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            onKeyDown={handleKeyDown}
            role="tab"
            aria-selected={activeTab === tab.value}
            aria-controls={`tab-panel-${tab.value}`}
            id={`tab-${tab.value}`}
            tabIndex={activeTab === tab.value ? 0 : -1}
            className={clsx(
              "relative z-10 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none",
              activeTab === tab.value
                ? "text-black dark:text-white"
                : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white",
            )}
          >
            {activeTab === tab.value && (
              <motion.div
                layoutId="tab-underline"
                className="absolute inset-0 z-0 rounded-[8px] bg-neutral-100 dark:bg-neutral-800"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Fixed Height Tab Content Container */}
      <div
        className={clsx(
          "relative w-full overflow-hidden rounded-[12px] border bg-white p-4 dark:border-neutral-800 dark:bg-black",
          height,
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeTab}
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            initial={{
              opacity: 0,
              x: currentIndex > prevIndex ? 50 : -50,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            }}
            exit={{
              opacity: 0,
              x: currentIndex > prevIndex ? -30 : 30,
              scale: 0.98,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 w-full p-1"
          >
            <div className="h-full w-full bg-neutral-50 dark:bg-neutral-900 rounded-[8px] border p-2">
              {tabs.find((t) => t.value === activeTab)?.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
