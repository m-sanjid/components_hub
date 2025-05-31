"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { PropTable } from "./PropsTable";
import { ResponsivePreview } from "./ResponsivePreview";
import { CodeBlockWrapper } from "../CodeBlock";
import { IconCode, IconCopy, IconEye, IconSettings } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import AnimatedCheck from "../AnimatedCheck";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface EnhancedCodePreviewProps {
  code: string;
  language?: string;
  children: React.ReactNode;
  componentName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any[];
  responsivePreview?: boolean;
}

export function EnhancedCodePreview({
  code,
  language = "tsx",
  children,
  componentName,
  props,
  responsivePreview = false,
}: EnhancedCodePreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "props">(
    "preview",
  );
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const previewId = `preview-${componentName.toLowerCase()}`;

  const tabs = [
    { id: "preview", label: "Preview", icon: <IconEye size={16} /> },
    { id: "code", label: "Code", icon: <IconCode size={16} /> },
    ...(props && props.length > 0
      ? [{ id: "props", label: "Props", icon: <IconSettings size={16} /> }]
      : []),
  ];

  return (
    <div className="group border-border bg-background my-8 w-full max-w-5xl overflow-auto rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="border-border bg-muted/30 border-b">
        <div className="flex items-center">
          <div className="flex items-center space-x-1 p-1">
            {tabs.map((tab) => (
              <AnimatePresence mode="wait" key={tab.id}>
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "relative flex items-center space-x-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                    activeTab === tab.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="z-10 text-xs opacity-70">{tab.icon}</span>
                  <span className="z-10">{tab.label}</span>

                  {/* Animate active tab underline */}
                  {activeTab === tab.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-primary absolute -inset-1 z-0 rounded-t-2xl"
                    />
                  )}
                </button>
              </AnimatePresence>
            ))}
          </div>

          {/* Component Title */}
          <div className="ml-auto flex items-center space-x-2 px-4">
            <div className="bg-border h-4 w-px" />
            <div className="text-muted-foreground font-mono text-xs">
              {componentName}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10">
        {/* Preview Tab */}
        {activeTab === "preview" && (
          <div className="transition-all duration-300 ease-in-out">
            {responsivePreview ? (
              <ResponsivePreview>
                <div id={previewId} className="min-h-[200px] p-6">
                  {children}
                </div>
              </ResponsivePreview>
            ) : (
              <div
                id={previewId}
                className="from-background to-muted/20 min-h-[200px] bg-gradient-to-br p-8"
              >
                <div className="mx-auto">{children}</div>
              </div>
            )}
          </div>
        )}

        {/* Code Tab */}
        {activeTab === "code" && (
          <div className="transition-all duration-300 ease-in-out">
            <div className="relative">
              <div className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent max-h-[600px] overflow-auto">
                <CodeBlockWrapper>
                  <Highlight
                    theme={theme === "dark" ? themes.vsDark : themes.github}
                    code={code.trim()}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    language={language as any}
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre
                        className={`${className} overflow-auto p-6 text-sm leading-relaxed`}
                        style={{
                          ...style,
                          backgroundColor:
                            theme === "dark"
                              ? "hsl(var(--muted))"
                              : "hsl(var(--muted)/0.3)",
                        }}
                      >
                        {tokens.map((line, i) => (
                          <div
                            key={i}
                            {...getLineProps({ line })}
                            className="hover:bg-muted/30 -mx-2 rounded px-2 transition-colors duration-150"
                          >
                            <span className="text-muted-foreground mr-6 inline-block w-8 text-right text-xs select-none">
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
                </CodeBlockWrapper>
              </div>

              {/* Enhanced Copy Button */}
              <motion.button
                onClick={copyToClipboard}
                className={`border-border bg-background/80 hover:bg-background absolute top-4 right-4 flex items-center space-x-2 rounded-lg border px-3 py-2 text-xs font-medium backdrop-blur-sm transition-all duration-200 hover:shadow-md ${copied ? "text-green-600" : "text-muted-foreground hover:text-foreground"} `}
              >
                {copied ? (
                  <motion.div
                    layoutId="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <AnimatedCheck />
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      Copied!
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.div
                    layoutId="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <IconCopy className="h-3 w-3" />
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      Copy
                    </motion.span>
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        )}

        {/* Props Tab */}
        {activeTab === "props" && props && (
          <div className="transition-all duration-300 ease-in-out">
            <div className="bg-muted/20 p-6">
              <div className="mb-4">
                <h3 className="text-foreground text-lg font-semibold">
                  Component Props
                </h3>
                <p className="text-muted-foreground text-sm">
                  Configure the properties for {componentName}
                </p>
              </div>
              <div className="border-border bg-background rounded-lg border p-4">
                <PropTable props={props} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-border bg-muted/30 border-t px-4 py-2">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <span>Language: {language.toUpperCase()}</span>
            <span>Lines: {code.trim().split("\n").length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Ready</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
