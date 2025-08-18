"use client";

import { JSX, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

type Platform = "github" | "linkedin" | "twitter" | "email";

interface SocialLinksProps {
  profiles?: Partial<Record<Platform, string>>;
  showTooltip?: boolean;
  size?: number;
}

const PLATFORM_META: Record<Platform, {
  name: string;
  icon: (size: number) => JSX.Element;
  color: string;
}> = {
  github: {
    name: "GitHub",
    icon: (size) => <IconBrandGithub size={size} />,
    color: "#000000",
  },
  twitter: {
    name: "Twitter",
    icon: (size) => <IconBrandX size={size} />,
    color: "#000000",
  },
  linkedin: {
    name: "LinkedIn",
    icon: (size) => <IconBrandLinkedin size={size} />,
    color: "#0B66C2",
  },
  email: {
    name: "Email",
    icon: (size) => <IconMail size={size} />,
    color: "#EA4335",
  },
};

export default function SocialLinks({
  profiles = {
    github: "https://github.com/m-sanjid",
    twitter: "https://x.com/sanjid357",
    linkedin: "https://linkedin.com/in/muhammedsanjid1",
    email: "mailto:sanjid.dev@gmail.com",
  },
  showTooltip = true,
  size = 20,
}: SocialLinksProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeLinks = Object.entries(profiles).map(([key, url]) => {
    const platform = key as Platform;
    const meta = PLATFORM_META[platform];
    return {
      ...meta,
      url,
    };
  });

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {activeLinks.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative"
        >
          <Link href={item.url!} target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: item.color,
                color: "#ffffff",
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="rounded-full bg-black/10 p-3 backdrop-blur-sm transition-all hover:shadow-lg dark:bg-white/10"
            >
              {item.icon(size)}
            </motion.div>
          </Link>

          <AnimatePresence>
            {showTooltip && hoverIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: -5, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded-md bg-black px-3 py-1 text-xs text-white shadow-md backdrop-blur-sm dark:bg-white dark:text-black"
              >
                {item.name}
                <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
