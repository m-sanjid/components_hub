"use client";

import React, { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { ResponsivePreview } from "./ResponsivePreview";
import { IconCode, IconEye } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CopyButtonLabel } from "./CopyButtonLabel";
import { useTheme } from "next-themes";

interface CodePreviewProps {
  code?: string;
  language?: string;
  children?: React.ReactNode;
  componentName?: string;
  responsivePreview?: boolean;
  name?: string;
}

export function CodePreview({
  code: codeProp,
  language = "tsx",
  children: childrenProp,
  componentName,
  responsivePreview = false,
  name,
}: CodePreviewProps) {
  const { resolvedTheme } = useTheme();
  const prismTheme = resolvedTheme === "dark" ? themes.oneDark : themes.github;
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [demoComponent, setDemoComponent] = useState<React.ReactNode>(null);
  const [code, setCode] = useState<string | undefined>(codeProp);

  useEffect(() => {
    if (name) {
      (async () => {
        const res = await fetch(`/api/component-code?name=${name}`);
        if (res.ok) {
          const data = await res.json();
          setCode(data.code);
        } else {
          setCode(undefined);
        }
        try {
          const mod = await import(`../../data/components/demo/${name}.tsx`);
          setDemoComponent(React.createElement(mod.default));
        } catch (e) {
          console.error("Failed to load demo:", e);
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

  const tabs = [
    { id: "preview", label: "Preview", icon: <IconEye className="size-4" /> },
    { id: "code", label: "Code", icon: <IconCode className="size-4" /> },
  ];

  return (
    <div className="group border-border bg-background relative my-8 w-full max-w-4xl overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Tabs Header */}
      <div className="border-border bg-muted/30 border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="bg-primary-foreground flex items-center space-x-1 rounded-[12px] border p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "preview" | "code")}
                className={cn(
                  "relative flex items-center space-x-2 rounded-[4px] p-1 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={`bg-primary/10 z-10 rounded-md border p-1 backdrop-blur-md ${activeTab === tab.id ? "border-neutral-600 bg-white/20 dark:border-neutral-400 dark:bg-black/20" : ""}`}
                >
                  {tab.icon}
                </span>
                <span className="z-10">{tab.label}</span>

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="bg-primary absolute inset-0 z-0 rounded-md backdrop-blur-sm"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Component Name */}
          <div className="text-muted-foreground ml-auto hidden font-mono text-xs sm:block">
            {componentName || name}
          </div>
        </div>
      </div>

      {/* Content Section */}
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
                <div className="from-background to-muted/20 min-h-[200px] bg-gradient-to-br p-4 sm:p-6">
                  <div className="overflow-x-auto">{demoComponent}</div>
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
                <div
                  className={cn(
                    "scrollbar-thin max-h-[600px] overflow-y-auto p-6 text-sm leading-relaxed transition-colors",
                  )}
                >
                  <Highlight
                    theme={prismTheme}
                    code={code?.trim() || ""}
                    language={language}
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre
                        className={`${className} relative mb-80`}
                        style={style}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="mr-6 inline-block w-8 text-right text-xs text-neutral-400 select-none dark:text-neutral-500">
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

                <CopyButtonLabel code={code?.trim() || ""} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
