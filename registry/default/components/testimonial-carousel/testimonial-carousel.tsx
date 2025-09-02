"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar?: string;
}

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

/* -------------------- Subcomponents -------------------- */

export function TestimonialCard({
  testimonial,
  direction,
  className,
}: {
  testimonial: Testimonial;
  direction: number;
  className?: string;
}) {
  return (
    <motion.div
      key={testimonial.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn("p-4", className)}
    >
      <TestimonialText testimonial={testimonial} />
      <div className="mt-4 flex items-center gap-4">
        {testimonial.avatar ? (
          <TestimonialAvatar testimonial={testimonial} />
        ) : (
          <div className="size-10 rounded-full bg-neutral-800 dark:bg-neutral-200" />
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {testimonial.name}
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {testimonial.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialText({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "leading-relaxed text-neutral-700 dark:text-neutral-300",
        className,
      )}
    >
      &quot; {testimonial.text} &quot;
    </p>
  );
}

export function TestimonialAvatar({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <motion.img
      src={testimonial.avatar}
      alt={testimonial.name}
      className={cn("size-10 rounded-full object-cover", className)}
    />
  );
}

export function TestimonialName({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-semibold text-neutral-900 dark:text-neutral-100",
        className,
      )}
    >
      {testimonial.name}
    </span>
  );
}

export function TestimonialRole({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400",
        className,
      )}
    >
      {testimonial.role}
    </span>
  );
}

export function TestimonialNav({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-end gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrev}
        className="rounded-md border border-neutral-200 bg-white p-2 shadow-md dark:border-neutral-800 dark:bg-neutral-800"
      >
        <IconChevronLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="rounded-md border border-neutral-200 bg-white p-2 shadow-md dark:border-neutral-800 dark:bg-neutral-800"
      >
        <IconChevronRight className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      </motion.button>
    </div>
  );
}

/* -------------------- Main Carousel -------------------- */

export function TestimonialCarousel({
  testimonials,
  className,
}: {
  testimonials: Testimonial[];
  className?: string;
}) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex(([prev]) => [(prev + 1) % testimonials.length, 1]);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, testimonials.length]);

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
      className={cn("relative mx-auto max-w-xl p-6", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="overflow-hidden rounded-md border bg-neutral-50 p-4 text-black dark:bg-neutral-900 dark:text-white">
        <AnimatePresence mode="wait" custom={direction}>
          <TestimonialCard
            testimonial={testimonials[index]}
            direction={direction}
          />
        </AnimatePresence>
      </motion.div>

      <TestimonialNav onPrev={prev} onNext={next} />
    </motion.div>
  );
}
