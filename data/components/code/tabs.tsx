"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// ---------------- Tabs Context ----------------
interface TabsContextValue {
  activeTab: string;
  onValueChange: (value: string) => void;
  prevIndex: number;
  currentIndex: number;
  tabs: string[];
  orientation: "horizontal" | "vertical";
  registerTab: (value: string) => void;
  tabsId: string;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
}

// ---------------- Tabs Root ----------------
interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  id?: string;
}

export function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
  orientation = "horizontal",
  id,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(value || defaultValue || "");
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [tabs, setTabs] = useState<string[]>([]);

  // Generate unique ID for this tabs instance
  const [tabsId] = useState(
    () => id || `tabs-${Math.random().toString(36).substr(2, 9)}`,
  );

  const currentValue = value || activeTab;
  const currentIndex = tabs.findIndex((tab) => tab === currentValue);

  const handleValueChange = (newValue: string) => {
    setPrevIndex(currentIndex);
    if (!value) {
      setActiveTab(newValue);
    }
    onValueChange?.(newValue);
  };

  const registerTab = (tabValue: string) => {
    setTabs((prev) => {
      if (!prev.includes(tabValue)) {
        return [...prev, tabValue];
      }
      return prev;
    });
  };

  const contextValue: TabsContextValue = {
    activeTab: currentValue,
    onValueChange: handleValueChange,
    prevIndex,
    currentIndex,
    tabs,
    orientation,
    registerTab,
    tabsId,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={cn(
          "w-full",
          orientation === "vertical" && "flex gap-3",
          className,
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ---------------- TabsList ----------------
interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  const { orientation } = useTabsContext();
  return (
    <div
      className={cn(
        "relative mb-4 flex gap-1 rounded-[12px] border bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900",
        orientation === "horizontal" && "flex-row",
        orientation === "vertical" && "w-fit flex-col",
        className,
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {children}
    </div>
  );
}

// ---------------- TabsTrigger ----------------
interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  indicatorClassName?: string;
  disabled?: boolean;
}

export function TabsTrigger({
  children,
  value,
  className,
  indicatorClassName,
  disabled = false,
}: TabsTriggerProps) {
  const { activeTab, onValueChange, tabs, orientation, registerTab } =
    useTabsContext();
  const isActive = activeTab === value;

  const tabsId = useTabsContext().tabsId;

  // Register this tab when component mounts
  useEffect(() => {
    registerTab(value);
  }, [value, registerTab]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIdx = tabs.findIndex((tab) => tab === activeTab);
    if (orientation === "horizontal") {
      if (e.key === "ArrowRight") {
        onValueChange(tabs[(currentIdx + 1) % tabs.length]);
      } else if (e.key === "ArrowLeft") {
        onValueChange(tabs[(currentIdx - 1 + tabs.length) % tabs.length]);
      }
    } else {
      if (e.key === "ArrowDown") {
        onValueChange(tabs[(currentIdx + 1) % tabs.length]);
      } else if (e.key === "ArrowUp") {
        onValueChange(tabs[(currentIdx - 1 + tabs.length) % tabs.length]);
      }
    }
  };

  return (
    <button
      onClick={() => !disabled && onValueChange(value)}
      onKeyDown={handleKeyDown}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-panel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={cn(
        "relative z-10 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none disabled:opacity-50",
        isActive
          ? "text-black dark:text-white"
          : "text-neutral-500 hover:text-black dark:hover:text-white",
        orientation === "vertical" && "w-full text-left",
        className,
      )}
    >
      {/* Indicator with layoutId for smooth transitions */}
      {isActive && (
        <motion.div
          layoutId={tabsId + "-underline"}
          className={cn(
            "absolute inset-0 z-0 rounded-[8px] bg-white shadow-sm dark:bg-black",
            indicatorClassName,
          )}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.3,
          }}
          style={{
            borderRadius: "8px",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

// ---------------- TabsContent ----------------
interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  height?: string;
}

export function TabsContent({
  children,
  value,
  className,
  height = "h-[350px]",
}: TabsContentProps) {
  const { activeTab, prevIndex, tabs } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  const currentIdx = tabs.findIndex((tab) => tab === activeTab);

  return (
    <div
      className={cn(
        "relative w-full overflow-auto rounded-[12px] border bg-white p-4 dark:border-neutral-800 dark:bg-black",
        height,
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeTab}
          id={`tab-panel-${value}`}
          role="tabpanel"
          aria-labelledby={`tab-${value}`}
          initial={{
            opacity: 0,
            x: currentIdx > prevIndex ? 50 : -50,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          }}
          exit={{
            opacity: 0,
            x: currentIdx > prevIndex ? -30 : 30,
            scale: 0.98,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          className="absolute inset-0 w-full p-1"
        >
          <div className="h-full w-full rounded-[8px] border bg-neutral-50 p-2 dark:bg-neutral-900">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
