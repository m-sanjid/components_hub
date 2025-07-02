"use client";

import React from "react";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const MotionDiv = ({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string } & MotionProps) => {
  return (
    <AnimatePresence>
      <motion.div {...props} className={cn(className)}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionDiv;
