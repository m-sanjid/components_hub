"use client";

import * as React from "react";
import { useConfig } from "@/hooks/use-config";
import CopyButton from "@/components/docs/CopyButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconTerminal } from "@tabler/icons-react";

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}) {
  const [config, setConfig] = useConfig();

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    };
  }, [__npm__, __pnpm__, __yarn__, __bun__]);

  return (
    <div className="relative overflow-x-auto rounded-xl border">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-2 py-1 md:px-3">
          <div className="bg-primary/10 hidden rounded-md border p-1 backdrop-blur-md sm:block">
            <IconTerminal className="size-4" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="border-transparent data-[state=active]:border-[#FF6100]"
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        <div className="scrollbar-hide overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent
                key={key}
                value={key}
                className="mt-0 border-none pt-0"
              >
                <pre>
                  <code
                    className="relative font-mono text-sm leading-none"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
      <CopyButton code={tabs[packageManager] || ""} />
    </div>
  );
}
