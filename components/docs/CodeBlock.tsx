"use client";

import { useState, ReactNode } from "react";
import { Highlight, themes, Language } from "prism-react-renderer";
import { toast } from "sonner";
import { motion } from "motion/react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface CodeBlockProps {
  className?: string;
  children: ReactNode;
}

export const CodeBlock = ({ className = "", children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const language = (className?.replace("language-", "") || "tsx") as Language;
  const code = String(children).trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group bg-muted/30 dark:bg-muted/20 relative my-6 rounded-xl border py-4 pr-3 pl-1 backdrop-blur-sm">
      <motion.button
        onClick={handleCopy}
        className="border-border bg-background text-foreground absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-md border shadow-sm hover:scale-95"
        whileTap={{ scale: 0.9 }}
      >
        {copied ? (
          <IconCheck className="h-4 w-4 text-green-500" />
        ) : (
          <IconCopy className="h-4 w-4" />
        )}
      </motion.button>

      <Highlight
        theme={themes.oneDark}
        code={code?.trim() || ""}
        language={language}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} relative`}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="text-primary/40 mr-6 inline-block w-8 text-right text-xs select-none">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
