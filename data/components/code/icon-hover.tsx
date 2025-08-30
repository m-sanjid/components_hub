import React from "react";
import { cn } from "@/lib/utils";
import { TablerIcon } from "@tabler/icons-react";

interface IconHoverProps {
  icon: TablerIcon;
  className?: string;
  size?: number;
  iconClassName?: string;
}

const IconHover: React.FC<IconHoverProps> = ({ icon: Icon, className, size = 5, iconClassName }) => {
  return (
    <div
      className={cn(
        "bg-primary/10 rotate perspective-1000 relative flex items-center justify-center rounded-[8px] border p-2 shadow-md transition-transform duration-300 transform-3d group-hover/icon:scale-105 group-hover/icon:rotate-x-6 group-hover/icon:rotate-y-6",
        `size-${size+2}`,
        className,
      )}
    >
      <div className="inset-0.5 rounded-[6px] absolute z-20 border opacity-0 group-hover/icon:opacity-100 scale-50 group-hover/icon:scale-100 duration-300  ease-in-out"/>

      <Icon
      stroke="1"
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
