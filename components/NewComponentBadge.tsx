"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import React from "react";
import { Sparkles } from "lucide-react";

const NewComponentBadge = ({
  href,
  children,
}: {
  href: string;
  children: string;
}) => {
  return (
    <Link href={href}>
      <motion.div
        className="bg-primary/10 inline-flex items-center gap-2 rounded-lg border px-4 py-1.5 text-sm backdrop-blur-md hover:border-[#FF6100]/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -6, scale: 0.8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles size={16} className="animate-pulse text-[#FF6100]" />
        <span className="text-muted-foreground">
          Introducing new
          <span className="text-primary font-semibold">{" " + children}</span>
        </span>
      </motion.div>
    </Link>
  );
};

export default NewComponentBadge;
