"use client";

import { forwardRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  className?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      size = "md",
      showCloseButton = true,
      className,
    },
    ref
  ) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={ref}
                className={clsx(
                  "relative bg-background rounded-lg shadow-lg",
                  {
                    "max-w-sm": size === "sm",
                    "max-w-md": size === "md",
                    "max-w-lg": size === "lg",
                    "max-w-xl": size === "xl",
                  },
                  className
                )}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(title || description || showCloseButton) && (
                  <div className="flex items-center justify-between p-6 border-b">
                    <div className="space-y-1">
                      {title && (
                        <motion.h3
                          className="text-lg font-semibold"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {title}
                        </motion.h3>
                      )}
                      {description && (
                        <motion.p
                          className="text-sm text-muted-foreground"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {description}
                        </motion.p>
                      )}
                    </div>
                    {showCloseButton && (
                      <motion.button
                        className="rounded-full p-1 hover:bg-accent hover:text-accent-foreground"
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <IconX className="h-4 w-4" />
                      </motion.button>
                    )}
                  </div>
                )}
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = "Modal"; 