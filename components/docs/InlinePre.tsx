import React from "react";

const InlinePre = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-primary/10 inline-flex items-center rounded-md px-2 py-1 text-sm font-semibold">
      {children}
    </span>
  );
};

export default InlinePre;
