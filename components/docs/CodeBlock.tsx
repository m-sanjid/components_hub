"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Highlight, themes, Language } from "prism-react-renderer";
import { toast } from "sonner";
import { motion } from "motion/react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface CodeBlockProps {
  className?: string;
  children: string;
}

export const CodeBlock = ({ className = "", children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const language = (className.replace("language-", "") || "tsx") as Language;
  const code = children.trim();

  // Use a default theme during SSR, then switch to correct theme after hydration
  const selectedTheme = !mounted
    ? themes.vsLight
    : theme === "light"
      ? themes.vsLight
      : themes.vsDark;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative mt-4 mb-6 max-h-[500px] overflow-hidden rounded-2xl">
      <motion.button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-white/5 bg-white/40 text-white backdrop-blur-md"
        whileTap={{ scale: 0.95 }}
      >
        {copied ? (
          <IconCheck className="h-4 w-4 text-green-500" />
        ) : (
          <IconCopy className="h-4 w-4" />
        )}
      </motion.button>

      <Highlight code={code} language={language} theme={selectedTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-auto border border-neutral-300 p-4 dark:border-neutral-800`}
            style={style}
          >
            {tokens.map((line, i) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { key: lineKey, ...lineProps } = getLineProps({
                line,
                key: i,
              });
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { key: tokenKey, ...tokenProps } = getTokenProps({
                      token,
                      key,
                    });
                    return <span key={key} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
