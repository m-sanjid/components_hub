import React from "react";
import { FeatureTabs } from "../code/features-tabs";

const FeaturesTabsDemo = () => {
  const tabs = [
    {
      value: "design",
      title: "Polished UI",
      description: "Beautiful defaults with subtle motion",
      content: (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Design System Ready</h4>
          <p className="text-muted-foreground text-sm">
            Tailwind-first, accessible, theme-aware.
          </p>
        </div>
      ),
    },
    {
      value: "performance",
      title: "Fast",
      description: "Optimized motion with spring transitions",
      content: (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Smooth Animations</h4>
          <p className="text-muted-foreground text-sm">
            Zero jank with Motion One spring physics.
          </p>
        </div>
      ),
    },
    {
      value: "integration",
      title: "Easy Integrations",
      description: "Drop-in API with sensible props",
      content: (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Headless API</h4>
          <p className="text-muted-foreground text-sm">
            Render anything inside each tab panel.
          </p>
        </div>
      ),
    },
  ];

  return <FeatureTabs tabs={tabs} height="min-h-[420px]" />;
};

export default FeaturesTabsDemo;
