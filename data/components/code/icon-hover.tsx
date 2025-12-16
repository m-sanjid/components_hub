import React, { type ComponentType } from "react";
import { cn } from "@/lib/utils";
import type { IconProps } from "@tabler/icons-react";

interface IconHoverProps {
  icon: ComponentType<IconProps>;
  className?: string;
  size?: number;
  iconClassName?: string;
}

const IconHover: React.FC<IconHoverProps> = ({
  icon: Icon,
  className,
  size = 5,
  iconClassName,
}) => {
  return (
    <div
      className={cn(
        "bg-primary/10 rotate perspective-1000 relative flex items-center justify-center rounded-[8px] border p-1 shadow-md transition-transform duration-300 transform-3d group-hover/icon:scale-105 group-hover/icon:rotate-x-6 group-hover/icon:rotate-y-6",
        `size-${size + 1}`,
        className,
      )}
    >
      <div className="absolute inset-0.5 z-20 scale-50 rounded-[6px] border border-neutral-300 opacity-0 duration-300 ease-in-out group-hover/icon:scale-100 group-hover/icon:opacity-100 dark:border-neutral-200" />

      <Icon
        stroke={1}
        className={cn(
          `size-${size} transition-transform duration-300 ease-out`,
          "rotate-x-45 -rotate-z-45 group-hover/icon:scale-110 group-hover/icon:rotate-x-0 group-hover/icon:rotate-y-0 group-hover/icon:rotate-z-0",
          iconClassName,
        )}
      />
    </div>
  );
};

export default IconHover;
