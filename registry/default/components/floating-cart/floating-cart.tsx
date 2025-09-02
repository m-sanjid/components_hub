"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

type CartItem = {
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
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 30,
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
  exit: { opacity: 0, y: -10 },
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
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className={cn("fixed right-16 bottom-16 z-50", className)}
      ref={cartRef}
    >
      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`text-secondary relative flex h-14 w-14 items-center justify-center rounded-full transition ${
          isOpen ? "pointer-events-none opacity-0" : "bg-primary shadow-lg"
        }`}
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
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
              className="bg-secondary absolute right-0 bottom-20 z-50 flex max-h-[75vh] w-80 flex-col overflow-hidden rounded-xl border shadow-xl md:w-96"
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="text-primary flex items-center gap-2 text-lg font-semibold">
                  <IconShoppingCart className="h-5 w-5" />
                  Your Cart ({itemCount})
                </div>
                <motion.button
                  whileTap={{ rotate: 90, scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close cart"
                  className="text-muted-foreground hover:text-primary"
                >
                  <IconX className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center">
                    Your cart is empty.
                  </div>
                ) : (
                  <ul
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="space-y-4"
                  >
                    <AnimatePresence>
                      {cartItems.map((item, i) => (
                        <motion.li
                          onMouseEnter={() => setHoveredIndex(i)}
                          key={item.id}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="flex items-center gap-3"
                        >
                          <div
                            className={cn(
                              "relative overflow-hidden rounded-2xl transition-all duration-200 ease-in-out",
                              hoveredIndex === i ? "translate-x-2" : "",
                            )}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded object-cover"
                            />
                          </div>
                          <div
                            className={
                              "relative flex-1 rounded-2xl px-4 py-2 transition-all duration-200 ease-in-out"
                            }
                          >
                            {hoveredIndex === i && (
                              <motion.div
                                layoutId="hover-cart-item"
                                className="bg-primary/10 pointer-events-none absolute inset-0 z-10 rounded-md"
                              />
                            )}
                            <div className="text-primary z-20 font-medium">
                              {item.name}
                            </div>
                            <div className="z-20 mt-1 flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                ${item.price.toFixed(2)}
                              </span>
                              <div className="z-20 flex items-center overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="text-muted-foreground hover:text-primary flex h-6 w-6 items-center justify-center hover:bg-neutral-50 hover:dark:bg-neutral-800"
                                  aria-label="Decrease"
                                >
                                  <IconMinus className="h-3 w-3" />
                                </button>
                                <span className="text-muted-foreground px-2">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="text-muted-foreground hover:text-primary flex h-6 w-6 items-center justify-center hover:bg-neutral-50 hover:dark:bg-neutral-800"
                                  aria-label="Increase"
                                >
                                  <IconPlus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <div className="z-20 mt-2 flex items-center justify-between">
                              <span className="text-primary font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
                                aria-label="Remove item"
                              >
                                <IconTrash className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="bg-secondary border-t p-4">
                  <div className="mb-3 flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={onViewCart}
                      className="bg-accent rounded-md border border-neutral-300 px-4 py-2 text-center font-medium text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-600"
                    >
                      View Cart
                    </button>
                    <button
                      onClick={onCheckout}
                      className="bg-primary text-secondary rounded-md px-4 py-2 text-center font-medium transition"
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
