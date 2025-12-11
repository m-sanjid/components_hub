"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface FloatingCartProps {
  className?: string;
  items?: CartItem[];
  onViewCart?: () => void;
  onCheckout?: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.4 },
  exit: { opacity: 0 },
};

const drawerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
  exit: { opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" },
};

export function FloatingCartWidget({
  className,
  items = [],
  onViewCart,
  onCheckout,
}: FloatingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const cartRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sync items prop with internal state
  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const updateQuantity = useCallback((id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div
      className={cn("fixed right-4 bottom-4 z-50 md:right-8 md:bottom-8", className)}
      ref={cartRef}
    >
      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          isOpen
            ? "bg-secondary text-primary rotate-90 scale-0 opacity-0"
            : "bg-primary text-primary-foreground scale-100 opacity-100"
        )}
        aria-label="Open cart"
      >
        <IconShoppingCart className="h-6 w-6" />
        {itemCount > 0 && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
          >
            {itemCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
              className="absolute right-0 bottom-20 z-50 flex max-h-[80vh] w-[90vw] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl sm:w-96"
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <IconShoppingCart className="h-5 w-5" />
                  Your Cart ({itemCount})
                </div>
                <motion.button
                  whileTap={{ rotate: 90, scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close cart"
                  className="rounded-full p-1 hover:bg-muted"
                >
                  <IconX className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <IconShoppingCart className="mb-4 h-12 w-12 opacity-20" />
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  <ul
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="space-y-4"
                  >
                    <AnimatePresence mode="popLayout">
                      {cartItems.map((item, i) => (
                        <motion.li
                          layout
                          onMouseEnter={() => setHoveredIndex(i)}
                          key={item.id}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="relative flex items-center gap-3 rounded-xl bg-card p-2"
                        >
                          <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-muted">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col gap-1">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="line-clamp-1 text-sm font-medium">
                                {item.name}
                              </h4>
                              <motion.button
                                whileHover={{ scale: 1.1, color: "#ef4444" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground transition-colors hover:text-red-500"
                                aria-label="Remove item"
                              >
                                <IconTrash className="h-4 w-4" />
                              </motion.button>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">
                                ${item.price.toFixed(2)}
                              </span>
                              <div className="flex items-center gap-2 rounded-md border bg-background p-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted"
                                  aria-label="Decrease"
                                >
                                  <IconMinus className="h-3 w-3" />
                                </button>
                                <span className="min-w-[1.5rem] text-center text-xs font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted"
                                  aria-label="Increase"
                                >
                                  <IconPlus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {hoveredIndex === i && (
                            <motion.div
                              layoutId="hover-cart-item"
                              className="absolute inset-0 -z-10 rounded-xl bg-muted/50"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t bg-background p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-lg font-bold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={onViewCart}
                      className="rounded-lg border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      View Cart
                    </button>
                    <button
                      onClick={onCheckout}
                      className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
