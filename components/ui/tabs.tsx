"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const TabsContext = React.createContext<string>("");

const TabsRoot = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ ...props }, ref) => {
  const uniqueId = React.useId();
  return (
    <TabsContext.Provider value={uniqueId}>
      <TabsPrimitive.Root ref={ref} {...props} />
    </TabsContext.Provider>
  );
});
TabsRoot.displayName = "Tabs";

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-start p-1 text-zinc-900 dark:text-zinc-50",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    classNameIndicator?: string;
  }
>(({ className, children, classNameIndicator, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = React.useState(false);
  const tabsId = React.useContext(TabsContext);

  React.useEffect(() => {
    const element = triggerRef.current;
    if (element) {
      setIsActive(element.dataset.state === "active");

      const observer = new MutationObserver(() => {
        setIsActive(element.dataset.state === "active");
      });

      observer.observe(element, { attributes: true });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <TabsPrimitive.Trigger
      ref={(node) => {
        // forward ref properly
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;
        triggerRef.current = node;
      }}
      className={cn(
        "ring-offset-background group relative m-1 inline-flex h-8 items-center justify-center rounded-[8px] bg-transparent px-4 py-1 text-sm font-medium whitespace-nowrap text-zinc-500 transition-none focus-visible:ring-2 focus-visible:ring-[#FF6100] focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-semibold data-[state=active]:text-white dark:text-zinc-500 dark:data-[state=active]:font-semibold dark:data-[state=active]:text-white",
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layout
          className="absolute inset-0 flex w-full justify-center"
          transition={{
            type: "spring",
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
          layoutId={`underline-${tabsId}`}
        >
          <div
            className={cn(
              "absolute inset-0 h-full w-full rounded-[10px] bg-[#FF6100]",
              classNameIndicator,
            )}
          />
        </motion.div>
      )}
      <div className="z-40">{children}</div>
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "focus-visible:ring-ring relative mt-2 rounded-md ring-offset-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent };
