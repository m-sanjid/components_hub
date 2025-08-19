"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";
import { Tabs } from "@/components/ui/tabs";

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [config, setConfig] = useConfig();

  const installationType = React.useMemo(() => {
    return config.installationType || "cli";
  }, [config]);

  return (
    <Tabs
      value={installationType}
      onValueChange={(value) =>
        setConfig({ ...config, installationType: value as "cli" | "manual" })
      }
      className="relative mt-4 w-full max-w-full overflow-x-auto"
    >
      {children}
    </Tabs>
  );
}
