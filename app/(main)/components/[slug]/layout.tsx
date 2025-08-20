import React from "react";

export const metadata = {
  title: "Component Detail",
  description: "Component Detail",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-5xl">{children}</div>;
};

export default Layout;
