import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconCopy } from "@tabler/icons-react";
import AnimatedCheck from "../AnimatedCheck";

export const CopyButtonLabel = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.button
      onClick={copyToClipboard}
      className={cn(
        "bg-primary/10 absolute top-4 right-4 z-10 flex items-center space-x-2 rounded-lg border px-3 py-2 text-xs font-medium backdrop-blur transition-all duration-200 ease-in-out hover:shadow-md",
        copied ? "text-green-600" : "text-muted-foreground hover:text-primary",
      )}
    >
      {copied ? (
        <>
          <AnimatedCheck />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <IconCopy size={14} />
          <span>Copy</span>
        </>
      )}
    </motion.button>
  );
};
