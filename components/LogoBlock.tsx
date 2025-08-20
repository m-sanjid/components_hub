"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconBrandNextjs, IconBrandTailwind } from "@tabler/icons-react";
import { Icons } from "./docs/icons";

const icons = [
  <IconBrandNextjs strokeWidth={1.5} />,
  <IconBrandTailwind strokeWidth={1.5} />,
  <Icons.shadcn className="size-6" />,
  <Icons.motion className="size-6" />,
];

const LogoBlock = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-6">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.96 }}
          className="bg-primary/5 rounded-xl border p-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#FF6100]/40 hover:shadow-md"
        >
          {Icon}
        </motion.div>
      ))}
    </div>
  );
};

export default LogoBlock;
