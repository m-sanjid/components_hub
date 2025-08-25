import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils"; // optional if you use clsx/cn helper

const Logo = () => {
  return (
    <Link
      href="/"
      className={cn(
        "relative flex items-center text-sm tracking-tight transition-colors duration-200 ease-in-out hover:text-[#FF6100] md:text-base",
      )}
      aria-label="Velnor Home"
    >
      Velnor
      <span
        className={cn(
          "ml-2 rounded-[4px] bg-[#FF6100] px-1 py-px text-xs font-medium text-white",
          "absolute -top-2 -right-9",
        )}
      >
        beta
      </span>
    </Link>
  );
};

export default Logo;
