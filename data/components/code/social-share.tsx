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

const PLATFORM_META: Record<
  Platform,
  {
    name: string;
    icon: (size: number) => JSX.Element;
    color: string;
  }
> = {
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
    twitter: "https://x.com/dev_sanjid",
    linkedin: "https://linkedin.com/in/muhammedsanjid1",
    email: "mailto:muhammeddsanjid@gmail.com",
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
    <div
      onMouseLeave={() => setHoverIndex(null)}
      className="mt-6 flex flex-wrap justify-center gap-3"
    >
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
              className="rounded-lg bg-neutral-200 dark:bg-neutral-800 p-3 backdrop-blur-sm transition-all hover:shadow-lg"
            >
              {item.icon(size)}
            </motion.div>
          </Link>

          <AnimatePresence>
            {showTooltip && hoverIndex === index && (
              <motion.div
                layoutId="hover-tooltip"
                className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded-md bg-black px-3 py-1 text-xs text-white shadow-md backdrop-blur-sm dark:bg-white dark:text-black"
              >
                <motion.span
                  initial={{ y: -10, filter: "blur(2px)" }}
                  animate={{ y: 0, filter: "blur(0px)" }}
                  exit={{ y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.1 }}
                >
                  {item.name}
                </motion.span>
                <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
