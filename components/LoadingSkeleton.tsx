import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 overflow-hidden rounded-xl shadow-md">
      <div className="w-full rounded-lg border p-6">
        <Skeleton className="h-[10rem] w-full" />
      </div>
      <div className="w-full rounded-lg border p-6">
        <Skeleton className="h-[10rem] w-full" />
      </div>
      <div className="w-full rounded-lg border p-6">
        <Skeleton className="h-[10rem] w-full" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
