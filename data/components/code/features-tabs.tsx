"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

interface Tab {
  value: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

interface FeatureTabsProps {
  tabs: Tab[];
  sectionTitle?: string;
  sectionSubtitle?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  height?: string;
  autoplay?: boolean;
  interval?: number;
}

export function FeatureTabs({
  tabs,
  sectionTitle,
  sectionSubtitle,
  defaultValue,
  onValueChange,
  className,
  height = "min-h-[500px]",
  autoplay = true,
  interval = 5000,
}: FeatureTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0].value);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentIndex = tabs.findIndex((t) => t.value === activeTab);

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  const nextTab = () => {
    const next = (currentIndex + 1) % tabs.length;
    handleTabChange(tabs[next].value);
  };

  // autoplay
  useEffect(() => {
    if (!autoplay || isHovered) return;
    timerRef.current = setInterval(() => {
      nextTab();
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, isHovered, currentIndex]);

  const activeFeature = tabs.find((t) => t.value === activeTab);

  return (
    <section
      className={clsx(
        "relative mx-auto my-4 w-full max-w-5xl border bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-black",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* corner line decor */}
      <div className="absolute -top-0 -left-10 h-1 w-10 border-t-[0.2px] border-dashed border-neutral-300 mask-l-from-50% dark:border-neutral-600"></div>
      <div className="absolute -top-10 left-0 h-10 w-1 border-l-[0.2px] border-dashed border-neutral-300 mask-t-from-50% dark:border-neutral-600"></div>
      <div className="absolute -right-10 bottom-0 h-1 w-10 border-b-[0.2px] border-dashed border-neutral-300 mask-r-from-50% dark:border-neutral-600"></div>
      <div className="absolute right-0 -bottom-10 h-10 w-1 border-r-[0.2px] border-dashed border-neutral-300 mask-b-from-50% dark:border-neutral-600"></div>

      {/* Section Heading - full width */}
      <div className="w-full px-8 pt-8 lg:px-12">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {sectionTitle ?? "Powerful Features"}
        </h2>
        <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
          {sectionSubtitle ??
            "Explore the key capabilities designed to make your workflow seamless."}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="p-4">
        <div className="grid grid-cols-1 items-stretch gap-8 overflow-hidden border p-4 lg:grid-cols-3">
          {/* Sidebar Navigation */}
          <div className="flex flex-col justify-between space-y-6">
            <div
              className="flex w-fit flex-row flex-wrap gap-2 bg-black/5 p-1 lg:w-full lg:flex-col lg:gap-4 dark:bg-white/5"
              role="tablist"
            >
              {tabs.map((tab, i) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  role="tab"
                  aria-selected={activeTab === tab.value}
                  aria-controls={`tab-panel-${tab.value}`}
                  id={`tab-${tab.value}`}
                  tabIndex={activeTab === tab.value ? 0 : -1}
                  className={clsx(
                    "relative rounded-md px-3 py-2 text-start text-sm font-medium transition-colors focus:outline-none lg:py-6 lg:text-base",
                  )}
                >
                  {activeTab === tab.value && (
                    <motion.div
                      layoutId="active-features"
                      className="absolute inset-0 bg-neutral-900 dark:bg-neutral-100"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  <motion.span
                    layout
                    className={clsx(
                      "relative z-10 ml-1",
                      activeTab === tab.value
                        ? "text-primary-foreground font-semibold"
                        : "text-muted-foreground",
                    )}
                    animate={
                      activeTab === tab.value
                        ? { scale: 1.05, letterSpacing: "0.02em" }
                        : { scale: 1, letterSpacing: "0em" }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <span className="relative z-10 font-medium">{i + 1}. </span>
                    {tab.value}
                  </motion.span>
                </button>
              ))}
            </div>

            {/* Active Tab Info */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {activeFeature?.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {activeFeature?.description}
              </p>
            </div>
          </div>

          {/* Feature Preview - full span */}
          <div
            className={clsx(
              "relative flex w-full items-center justify-center overflow-hidden border bg-white/80 shadow-md lg:col-span-2 dark:border-neutral-800 dark:bg-neutral-950/50",
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
                  y: 30,
                  filter: "blur(8px)",
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 250,
                    damping: 28,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  filter: "blur(8px)",
                  scale: 0.97,
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                }}
                className="absolute inset-0 flex items-center justify-center p-6"
              >
                {activeFeature?.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
