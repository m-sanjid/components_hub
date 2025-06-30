"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";

const CopyButton = ({ code }: { code: string }) => {
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
      className="bg-primary/10 absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border backdrop-blur-md"
      whileTap={{ scale: 0.95 }}
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
