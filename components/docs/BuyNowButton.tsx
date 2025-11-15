"use client";

import React from "react";
import Link from "next/link";
import { Template } from "@/types";

const BuyNowButton = ({ template }: { template: Template }) => {
  return (
    <button className="w-full rounded-md bg-[#FF6100] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FF6100]/90">
      <Link
        target="_blank"
        href={template.downloadUrl || template.codeUrl || ""}
      >
        Buy Now {template.price ? `$${template.price.toFixed(2)}` : "Free"}
      </Link>
    </button>
  );
};

export default BuyNowButton;
