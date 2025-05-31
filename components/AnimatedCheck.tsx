import { motion } from "motion/react";

const AnimatedCheck = () => {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M5 13l4 4L19 7"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: 0.6,
              delay: 0.1,
              ease: "easeInOut",
            },
          },
        }}
      />
    </motion.svg>
  );
};

export default AnimatedCheck;
