"use client";

import { motion, useMotionValue, animate } from "motion/react";
import { useEffect, useState } from "react";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export interface SwipeProps {
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
  className?: string;
}

export function Swipe({
  onConfirm,
  onDismiss,
  confirmText = "Confirmed",
  dismissText = "Dismissed",
  neutralText = "Swipe to act",
  confirmIcon: ConfirmIcon = Check,
  dismissIcon: DismissIcon = X,
  confirmColor = "text-green-500 bg-green-500/10",
  dismissColor = "text-red-500 bg-red-500/10",
  size = "default",
  className,
}: SwipeProps) {
  const x = useMotionValue(0);
  const [status, setStatus] = useState<"none" | "confirmed" | "dismissed">(
    "none",
  );

  const sizeMap = {
    small: { h: "h-10", thumb: "h-8 w-8", text: "text-xs" },
    default: { h: "h-14", thumb: "h-12 w-12", text: "text-sm" },
    large: { h: "h-16", thumb: "h-14 w-14", text: "text-base" },
  };
  const current = sizeMap[size];

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (Math.abs(latest) > 80) {
        if (latest > 80) {
          setStatus("confirmed");
          onConfirm?.();
        } else {
          setStatus("dismissed");
          onDismiss?.();
        }
        animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
        setTimeout(() => setStatus("none"), 1500);
      }
    });
    return () => unsubscribe();
  }, [x, onConfirm, onDismiss]);

  return (
    <div className={clsx("w-full max-w-md", className)}>
      <div
        className={clsx(
          "relative flex items-center overflow-hidden rounded-full border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800",
          current.h,
        )}
      >
        {/* Left Zone */}
        <div
          className={clsx(
            "absolute inset-y-0 left-0 flex w-20 items-center justify-center",
            dismissColor,
          )}
        >
          <DismissIcon className="h-5 w-5" />
        </div>

        {/* Right Zone */}
        <div
          className={clsx(
            "absolute inset-y-0 right-0 flex w-20 items-center justify-center",
            confirmColor,
          )}
        >
          <ConfirmIcon className="h-5 w-5" />
        </div>

        {/* Center Label */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className={clsx(
              "font-medium text-neutral-600 dark:text-neutral-400",
              current.text,
            )}
          >
            {status === "confirmed"
              ? confirmText
              : status === "dismissed"
                ? dismissText
                : neutralText}
          </span>
        </div>

        {/* Thumb */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          style={{ x }}
          whileTap={{ scale: 0.95 }}
          className={clsx(
            "relative z-10 ml-1 flex cursor-grab items-center justify-center rounded-full border bg-white shadow-md active:cursor-grabbing dark:bg-neutral-900",
            current.thumb,
          )}
        >
          {status === "confirmed" ? (
            <ConfirmIcon className="h-5 w-5 text-green-500" />
          ) : status === "dismissed" ? (
            <DismissIcon className="h-5 w-5 text-red-500" />
          ) : (
            <div className="flex items-center gap-1 text-neutral-400">
              <ChevronLeft className="h-3 w-3" />
              <ChevronRight className="h-3 w-3" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
