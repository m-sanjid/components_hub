"use client";

import { useState, useEffect, useRef } from "react";
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
}

export function Tabs({ tabs, defaultValue, onValueChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0].value);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    onValueChange?.(activeTab);
  }, [activeTab]);

  const activeRect = tabRefs.current[activeTab]?.getBoundingClientRect();

  return (
    <div className={clsx("w-full", className)}>
      {/* Tab List */}
      <div className="relative flex gap-1 overflow-x-auto rounded-lg border bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            ref={(el) => {
              if (el) {
                tabRefs.current[tab.value] = el;
              }
            }}
            onClick={() => setActiveTab(tab.value)}
            className={clsx(
              "relative z-10 whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.value
                ? "text-black dark:text-white"
                : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}

        {/* Animated Indicator */}
        <AnimatePresence>
          {activeRect && (
            <motion.div
              layout
              className="absolute bottom-0 z-0 h-[2px] rounded bg-black dark:bg-white"
              style={{
                left: activeRect.left - tabRefs.current[tabs[0].value]!.getBoundingClientRect().left,
                width: activeRect.width,
              }}
              layoutId="tab-indicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <AnimatePresence mode="wait" initial={false}>
          {tabs.map(
            (tab) =>
              tab.value === activeTab && (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
