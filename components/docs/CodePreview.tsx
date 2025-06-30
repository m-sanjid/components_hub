"use client";

import React, { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { PropsTable } from "./PropsTable";
import { ResponsivePreview } from "./ResponsivePreview";
import { IconCode, IconCopy, IconEye, IconSettings } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import AnimatedCheck from "../AnimatedCheck";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface CodePreviewProps {
  code?: string;
  language?: string;
  children?: React.ReactNode;
  componentName?: string;
  props?: any[];
  responsivePreview?: boolean;
  name?: string;
}

export function CodePreview({
  code: codeProp,
  language = "tsx",
  children: childrenProp,
  componentName,
  props,
  responsivePreview = false,
  name,
}: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "props">(
    "preview",
  );
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [demoComponent, setDemoComponent] = useState<React.ReactNode>(null);
  const [code, setCode] = useState<string | undefined>(codeProp);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (name) {
      // Fetch code from API route
      (async () => {
        const res = await fetch(`/api/component-code?name=${name}`);
        if (res.ok) {
          const data = await res.json();
          setCode(data.code);
        } else {
          setCode(undefined);
        }
        try {
          // Import the demo from the demo directory using the name
          const mod = await import(`../../data/components/demo/${name}.tsx`);
          setDemoComponent(React.createElement(mod.default));
        } catch (e) {
          setDemoComponent(
            <div className="text-red-500">Demo not available</div>,
          );
        }
      })();
    } else {
      setCode(codeProp);
      setDemoComponent(childrenProp);
    }
  }, [name, codeProp, childrenProp]);

  const selectedTheme = !mounted
    ? themes.vsLight
    : theme === "light"
      ? themes.vsLight
      : themes.vsDark;

  const copyToClipboard = async () => {
    try {
      if (code) {
        await navigator.clipboard.writeText(code.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const tabs = [
    { id: "preview", label: "Preview", icon: <IconEye size={16} /> },
    { id: "code", label: "Code", icon: <IconCode size={16} /> },
    ...(props?.length
      ? [{ id: "props", label: "Props", icon: <IconSettings size={16} /> }]
      : []),
  ];

  return (
    <div className="group border-border bg-background relative my-8 w-full max-w-4xl overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Tabs Header */}
      <div className="border-border bg-muted/30 border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "preview" | "code" | "props")
                }
                className={cn(
                  "relative flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="z-50">{tab.icon}</span>
                <span className="z-50">{tab.label}</span>

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="bg-primary/5 absolute inset-0 z-0 rounded-md backdrop-blur-sm"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Component Name */}
          <div className="text-muted-foreground ml-auto font-mono text-xs">
            {componentName || name}
          </div>
        </div>
      </div>

      {/* Content Section with Animated Presence */}
      <div className="relative h-full min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              {responsivePreview ? (
                <ResponsivePreview>
                  <div className="min-h-[200px] p-6">{demoComponent}</div>
                </ResponsivePreview>
              ) : (
                <div className="from-background to-muted/20 min-h-[200px] bg-gradient-to-br p-8">
                  <div className="mx-auto">{demoComponent}</div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full"
            >
              <div className="relative h-full">
                <div className="scrollbar-thin h-[600px] overflow-auto bg-neutral-800 p-6 text-sm leading-relaxed">
                  <Highlight
                    theme={selectedTheme}
                    code={code?.trim() || ""}
                    language={language as any}
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre className={`${className} relative`}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="mr-6 inline-block w-8 text-right text-xs text-white/40 select-none">
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

                <motion.button
                  onClick={copyToClipboard}
                  className={cn(
                    "border-border bg-background/80 absolute top-4 right-4 z-10 flex items-center space-x-2 rounded-lg border px-3 py-2 text-xs font-medium backdrop-blur transition-all hover:shadow-md",
                    copied
                      ? "text-green-600"
                      : "text-muted-foreground hover:text-foreground",
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
              </div>
            </motion.div>
          )}

          {activeTab === "props" && props && (
            <motion.div
              key="props"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full overflow-y-auto p-6"
            >
              <div className="mb-4">
                <h3 className="text-foreground text-lg font-semibold">
                  Component Props
                </h3>
                <p className="text-muted-foreground text-sm">
                  Configure the properties for {componentName || name}
                </p>
              </div>
              <div className="border-border bg-background rounded-lg border p-4">
                <PropsTable props={props} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
