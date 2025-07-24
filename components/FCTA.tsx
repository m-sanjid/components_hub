"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

declare global {
  interface Window {
    Cal?: {
      showPopup: (options: { url: string }) => void;
    };
  }
}

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  // Cal.com embed script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);

    const onScroll = () => setIsVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (window.Cal) {
      window.Cal.showPopup({ url: "https://cal.com/your-username" }); // replace this
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg ring-1 ring-neutral-700/30 transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
        >
          <Calendar className="h-4 w-4" />
          Book a Call
        </motion.button>
      )}
    </AnimatePresence>
  );
}
