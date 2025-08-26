"use client";

import React, { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { CopyButtonLabel } from "./CopyButtonLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ExampleShowcaseProps {
  name: string;
  language?: string;
  title?: string;
}

export function ExampleShowcase({
  name,
  language = "tsx",
  title,
}: ExampleShowcaseProps) {
  const { resolvedTheme } = useTheme();
  const prismTheme =
    resolvedTheme === "dark" ? themes.oneDark : themes.oneLight;
  const [demoComponent, setDemoComponent] = useState<React.ReactNode>(null);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const mod = await import(`../../data/components/examples/${name}.tsx`);
        setDemoComponent(React.createElement(mod.default));

        const res = await fetch(`/api/example-code?name=${name}`);
        if (res.ok) {
          const data = await res.json();
          setCode(data.code || "");
        } else {
          setCode("// Failed to load code");
        }
      } catch (err) {
        console.error("Error loading demo:", err);
        setDemoComponent(
          <div className="text-red-500">Demo not available</div>,
        );
        setCode("// Demo not available");
      }
    })();
  }, [name]);

  return (
    <div className="group relative my-4 w-full max-w-2xl overflow-hidden">
      {title && <h3>{title}</h3>}
      <Tabs defaultValue="preview">
        <TabsList className="absolute top-14 right-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">{demoComponent}</TabsContent>
        <TabsContent value="code">
          <div key="code" className="relative mt-12 p-2">
            <Highlight theme={prismTheme} code={code} language={language}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} max-h-[400px] overflow-y-auto rounded-lg p-4 text-sm`}
                  style={style}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className="mr-4 inline-block w-6 text-right text-xs text-neutral-400 select-none dark:text-neutral-500">
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
            <CopyButtonLabel code={code.trim()} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
