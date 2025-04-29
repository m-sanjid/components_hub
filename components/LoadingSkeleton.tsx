import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="rounded-xl shadow-md overflow-hidden max-w-3xl mx-auto w-full space-y-8">
      <div className="p-6 w-full border rounded-lg">
        <Skeleton className="h-[10rem] w-full" />
      </div>
      <div className="p-6 w-full border rounded-lg">
        <Skeleton className="h-[10rem] w-full" />
      </div>
      <div className="p-6 w-full border rounded-lg">
        <Skeleton className="h-[10rem] w-full" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
