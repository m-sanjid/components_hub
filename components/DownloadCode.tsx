import { Template } from "@/types";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const DowloadCode = ({ template }: { template: Template }) => {
  return (
    <Button
      className="w-full rounded-md bg-[#FF6100] px-4 py-2 font-semibold text-white hover:bg-[#FF6100]/90"
      aria-label={`Download code for ${template.title}`}
      asChild
    >
      <Link
        target="_blank"
        href={template.downloadUrl || template.codeUrl || ""}
      >
        Download Code
      </Link>
    </Button>
  );
};
