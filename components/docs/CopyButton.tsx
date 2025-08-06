"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CopyButton = ({
  code,
  className,
}: {
  code: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <motion.button
      onClick={handleCopy}
      className={cn(
        "group absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-600 bg-white/10 text-neutral-400 backdrop-blur-md transition-colors duration-200 ease-in-out hover:text-neutral-50",
        className,
      )}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      {copied ? (
        <IconCheck className="h-4 w-4 text-green-500" />
      ) : (
        <IconCopy className="h-4 w-4" />
      )}
    </motion.button>
  );
};

export default CopyButton;
