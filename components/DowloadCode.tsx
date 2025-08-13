"use client"

import { Template } from "@/types";
import React from "react";
import { Button } from "./ui/button";

export const DowloadCode = ({ template }: { template: Template }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = template.downloadUrl || template.codeUrl || "";
    link.download = `${template.title}.zip`;
    link.click();
  };
  return (
    <Button
      className="rounded-md bg-[#FF6100] hover:bg-[#FF6100]/90 text-white px-4 py-2 text-sm w-full font-semibold"
      onClick={handleDownload}
      aria-label={`Download code for ${template.title}`}
    >
      Download Code
    </Button>
  );
};
