"use client";

import { Template } from "@/types";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const DowloadCode = ({ template }: { template: Template }) => {
  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = template.downloadUrl || template.codeUrl || "";
  //   link.download = `${template.title}.zip`;
  //   link.click();
  // };
  return (
    <Button
      className="w-full rounded-md bg-[#FF6100] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FF6100]/90"
      // onClick={handleDownload}
      aria-label={`Download code for ${template.title}`}
    >
<Link target="_blank" href={template.downloadUrl || template.codeUrl || ""}>
      Download Code
</Link>
    </Button>
  );
};
