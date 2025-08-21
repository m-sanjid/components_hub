import React from "react";
import { Icons } from "@/components/docs/icons";

export const Shadcn = () => {
  return (
    <div className="flex items-center gap-2">
      <Icons.shadcn className="bg-primary/10 size-6 rounded-md border border-white/10 p-1 backdrop-blur-md" />
      <span>CLI</span>
    </div>
  );
};
