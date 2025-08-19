"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function GithubStarButton({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const [stars, setStars] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
        );
        if (!res.ok) return;
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch (err) {
        console.error("Failed to fetch stars:", err);
      }
    }
    fetchStars();
  }, [owner, repo]);

  function formatStars(num: number) {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  }

  return (
    <motion.a
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={`https://github.com/${owner}/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-2 rounded-lg border bg-neutral-900 px-5 py-2.5 shadow-md transition-all duration-300 hover:shadow-lg"
    >
      {/* Animated star */}
      <HoverStar isHovered={isHovered} />

      <span className={cn("font-medium tracking-tight text-neutral-300", isHovered ? "text-white" : "")}>Star us on</span>
        <IconBrandGithub className="size-5" strokeWidth={1.8} />

      {/* Star count */}
      {stars !== null && (
        <motion.span
          key={stars} // ensures animation runs on change
          initial={{ opacity: 0, y: -6, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="ml-2 rounded-md bg-yellow-500/5 border border-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-500"
        >
          {formatStars(stars)}
        </motion.span>
      )}
    </motion.a>
  );
}

const HoverStar = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={isHovered ? "oklch(92.4% 0.12 95.746)" : "white"}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      stroke={isHovered ? "oklch(85.2% 0.199 91.936)" : "white"}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow"
    >
      <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        animate={{ pathLength: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867
           l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1
           l-5 4.867l1.179 6.873z"
      />
    </motion.svg>
  );
};
