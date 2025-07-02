"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";

// Base SwipeToConfirm component with customization options
export function SwipeToConfirm({
  onConfirm,
  onDismiss,
  confirmText = "Confirm",
  dismissText = "Dismiss",
  neutralText = "Swipe to action",
  confirmIcon: ConfirmIcon = Check,
  dismissIcon: DismissIcon = X,
  confirmColor = "green",
  dismissColor = "red",
  size = "default",
}: {
  onConfirm?: () => void;
  onDismiss?: () => void;
  confirmText?: string;
  dismissText?: string;
  neutralText?: string;
  confirmIcon?: React.ComponentType<{ className?: string }>;
  dismissIcon?: React.ComponentType<{ className?: string }>;
  confirmColor?: string;
  dismissColor?: string;
  size?: "small" | "default" | "large";
}) {
  const x = useMotionValue(0);
  const [confirmed, setConfirmed] = useState("none");
  const [isDragging, setIsDragging] = useState(false);

  const sizeClasses: Record<
    string,
    { container: string; thumb: string; width: string }
  > = {
    small: { container: "h-10", thumb: "h-8 w-8", width: "w-16" },
    default: { container: "h-14", thumb: "h-12 w-12", width: "w-20" },
    large: { container: "h-16", thumb: "h-14 w-14", width: "w-24" },
  };

  const currentSize = sizeClasses[size];

  const opacity = useTransform(
    x,
    [-150, -50, 0, 50, 150],
    [0.6, 0.8, 1, 0.8, 0.6],
  );
  const scale = useTransform(x, [-150, 0, 150], [0.95, 1, 0.95]);
  const leftIndicatorOpacity = useTransform(x, [-100, -30, 0], [1, 0.3, 0]);
  const rightIndicatorOpacity = useTransform(x, [0, 30, 100], [0, 0.3, 1]);
  const leftIndicatorScale = useTransform(x, [-120, -60, 0], [1.2, 1, 0.8]);
  const rightIndicatorScale = useTransform(x, [0, 60, 120], [0.8, 1, 1.2]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (Math.abs(latest) > 80 && !isDragging) {
        if (latest > 80) {
          setConfirmed("confirmed");
          onConfirm?.();
        } else if (latest < -80) {
          setConfirmed("dismissed");
          onDismiss?.();
        }
        animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
        setTimeout(() => setConfirmed("none"), 2000);
      }
    });
    return () => unsubscribe();
  }, [x, isDragging, onConfirm, onDismiss]);

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(x.get()) < 80) {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  const getColorClasses = (color: string, type: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      green: {
        bg: "bg-green-500/10 dark:bg-green-500/20",
        text: "text-green-500",
      },
      red: { bg: "bg-red-500/10 dark:bg-red-500/20", text: "text-red-500" },
      blue: { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-500" },
      purple: {
        bg: "bg-purple-500/10 dark:bg-purple-500/20",
        text: "text-purple-500",
      },
      orange: {
        bg: "bg-orange-500/10 dark:bg-orange-500/20",
        text: "text-orange-500",
      },
      pink: { bg: "bg-pink-500/10 dark:bg-pink-500/20", text: "text-pink-500" },
    };
    return colors[color as keyof typeof colors]?.[type as keyof typeof colors.green] || colors.green[type as keyof typeof colors.green];
  };

  return (
    <div className="relative">
      <div
        className={`relative ${currentSize.container} overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 transition-colors duration-300 dark:border-neutral-700 dark:bg-neutral-800`}
      >
        {/* Left Action Zone */}
        <motion.div
          style={{ opacity: leftIndicatorOpacity }}
          className={`absolute top-0 left-0 flex ${currentSize.container} ${currentSize.width} items-center justify-center rounded-l-full ${getColorClasses(dismissColor, "bg")}`}
        >
          <motion.div style={{ scale: leftIndicatorScale }}>
            <DismissIcon
              className={`h-5 w-5 ${getColorClasses(dismissColor, "text")}`}
            />
          </motion.div>
        </motion.div>

        {/* Right Action Zone */}
        <motion.div
          style={{ opacity: rightIndicatorOpacity }}
          className={`absolute top-0 right-0 flex ${currentSize.container} ${currentSize.width} items-center justify-center rounded-r-full ${getColorClasses(confirmColor, "bg")}`}
        >
          <motion.div style={{ scale: rightIndicatorScale }}>
            <ConfirmIcon
              className={`h-5 w-5 ${getColorClasses(confirmColor, "text")}`}
            />
          </motion.div>
        </motion.div>

        {/* Draggable Element */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.2}
          style={{ x, opacity, scale }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.95 }}
          className={`absolute top-1 left-1 flex ${currentSize.thumb} cursor-grab items-center justify-center rounded-full border border-neutral-200 bg-white shadow-lg transition-colors duration-300 active:cursor-grabbing dark:border-neutral-700 dark:bg-neutral-900`}
        >
          {confirmed === "confirmed" ? (
            <ConfirmIcon
              className={`h-5 w-5 ${getColorClasses(confirmColor, "text")}`}
            />
          ) : confirmed === "dismissed" ? (
            <DismissIcon
              className={`h-5 w-5 ${getColorClasses(dismissColor, "text")}`}
            />
          ) : (
            <div className="flex items-center">
              <ChevronLeft className="h-3 w-3 text-neutral-400 dark:text-neutral-500" />
              <ChevronRight className="h-3 w-3 text-neutral-400 dark:text-neutral-500" />
            </div>
          )}
        </motion.div>

        {/* Center Text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.span
            animate={{
              opacity: Math.abs(x.get()) > 30 ? 0.3 : 1,
              scale: Math.abs(x.get()) > 30 ? 0.9 : 1,
            }}
            className="text-sm font-medium text-neutral-600 select-none dark:text-neutral-400"
          >
            {confirmed === "confirmed"
              ? `${confirmText}!`
              : confirmed === "dismissed"
                ? `${dismissText}!`
                : isDragging && Math.abs(x.get()) > 40
                  ? x.get() > 0
                    ? `Release to ${confirmText.toLowerCase()}`
                    : `Release to ${dismissText.toLowerCase()}`
                  : neutralText}
          </motion.span>
        </div>
      </div>
    </div>
  );
}