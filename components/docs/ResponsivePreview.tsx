"use client";

import {
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceDesktop,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useEventListener } from "usehooks-ts";
import { cn } from "@/lib/utils";

interface ResponsivePreviewProps {
  children: React.ReactNode;
}

const viewports = {
  mobile: {
    name: "Mobile",
    width: 375,
    height: 667,
    icon: <IconDeviceMobile className="h-4 w-4" />,
  },
  tablet: {
    name: "Tablet",
    width: 768,
    height: 1024,
    icon: <IconDeviceTablet className="h-4 w-4" />,
  },
  desktop: {
    name: "Desktop",
    width: 1280,
    height: 800,
    icon: <IconDeviceDesktop className="h-4 w-4" />,
  },
};

type ViewportKey = keyof typeof viewports;

export function ResponsivePreview({ children }: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<ViewportKey>("desktop");
  const [customSize, setCustomSize] = useState(viewports.desktop);
  const [isMaximized, setIsMaximized] = useState(false);
  const [resizing, setResizing] = useState(false);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setResizing(true);
  };

  const stopResizing = () => setResizing(false);

  const onResize = useCallback((e: MouseEvent) => {
    if (!resizing) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newWidth = e.clientX - rect.left;
    const newHeight = e.clientY - rect.top;
    setCustomSize({
      ...customSize,
      width: Math.max(320, newWidth),
      height: Math.max(300, newHeight),
    });
  }, [resizing, customSize]);

  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", onResize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", onResize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resizing, onResize]);

  useEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMaximized) {
      setIsMaximized(false);
    }
  });

  const activeSize = customSize;

  return (
    <div className="relative my-6 space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-2">
        {(Object.keys(viewports) as ViewportKey[]).map((key) => {
          const isActive = key === viewport;
          return (
            <button
              key={key}
              onClick={() => {
                setViewport(key);
                setCustomSize(viewports[key]);
              }}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/50"
                }`}
            >
              {viewports[key].icon}
              <span className="hidden sm:inline">{viewports[key].name}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsMaximized(true)}
          className="text-muted-foreground hover:bg-muted ml-auto rounded-md p-2"
        >
          <IconMaximize className="h-4 w-4" />
        </button>
      </div>

      {/* Normal Preview Container */}
      <div
        ref={containerRef}
        className="bg-background relative mx-auto overflow-hidden rounded-md border p-4 shadow"
        style={{
          width: activeSize.width,
          height: activeSize.height,
        }}
      >
        <div
          className={cn(
            "h-full w-full bg-white dark:bg-zinc-900",
            viewport === "mobile" ? "grid grid-cols-1" : "",
          )}
        >
          {children}
        </div>

        {/* Resize Handle */}
        <div
          onMouseDown={startResizing}
          className="bg-muted absolute right-0 bottom-0 h-4 w-4 cursor-nwse-resize"
          title="Resize"
        />
      </div>

      {/* Maximize Modal */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-80 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-background relative overflow-hidden rounded-md border p-4 shadow-2xl"
              style={{ width: customSize.width, height: customSize.height }}
            >
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() => setIsMaximized(false)}
                  className="text-muted-foreground hover:bg-muted rounded-md p-2"
                >
                  <IconMinimize className="h-4 w-4" />
                </button>
              </div>
              <div className="h-full w-full overflow-auto bg-white dark:bg-zinc-900">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
