"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // optional helper

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Product Designer",
    text: "This library has completely transformed the way we build UI. The animations feel premium and smooth.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "David Kim",
    role: "Full Stack Developer",
    text: "I love how reusable and consistent the components are. Saved us weeks of dev time.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "UX Researcher",
    text: "The attention to detail in animations and responsiveness is simply top-notch.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  }),
};

export function TestimonialCarousel() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay every 5s
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex(([prev]) => [(prev + 1) % testimonials.length, 1]);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const next = () =>
    setIndex(([prev]) => [(prev + 1) % testimonials.length, 1]);
  const prev = () =>
    setIndex(([prev]) => [
      (prev - 1 + testimonials.length) % testimonials.length,
      -1,
    ]);

  return (
    <motion.div
      layout
      className="relative mx-auto max-w-xl p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        className="overflow-hidden rounded-md border bg-neutral-50 p-4 text-black dark:bg-neutral-900 dark:text-white"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={testimonials[index].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80) prev();
              else if (info.offset.x < -80) next();
            }}
            className={cn("p-2 md:p-4")}
          >
            <motion.p
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="leading-relaxed text-neutral-700 dark:text-neutral-300"
            >
              &quot; {testimonials[index].text} &quot;
            </motion.p>
            <div className="mt-4 flex items-center gap-4">
              <motion.img
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, delay: 0.1, ease: "easeInOut" }}
                src={testimonials[index].avatar}
                alt={testimonials[index].name}
                className="size-10 rounded-full object-cover"
              />
              <motion.div
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, delay: 0.1, ease: "easeInOut" }}
              >
                <motion.h3
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2, delay: 0.1, ease: "easeInOut" }}
                  className="font-semibold text-neutral-900 dark:text-neutral-100"
                >
                  {testimonials[index].name}
                </motion.h3>
                <motion.p
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                >
                  {testimonials[index].role}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation buttons at bottom center */}
      <div className="mt-4 flex items-center justify-end gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          className="rounded-md border border-neutral-200 bg-white p-2 shadow-md transition hover:scale-105 dark:border-neutral-800 dark:bg-neutral-800"
        >
          <ChevronLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          className="rounded-md border border-neutral-200 bg-white p-2 shadow-md transition hover:scale-105 dark:border-neutral-800 dark:bg-neutral-800"
        >
          <ChevronRight className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        </motion.button>
      </div>
    </motion.div>
  );
}
