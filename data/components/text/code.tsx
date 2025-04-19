const code = `import { useEffect, useState } from "react";
import { motion } from "motion/react";

const Typewriter = ({
  text,
  speed = 50,
  loop = false,
}: {
  text: string;
  speed?: number;
  loop?: boolean;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop) {
      setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 1000);
    }
  }, [index, text, speed, loop]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sm:text-xl md:text-2xl font-mono flex items-center"
    >
      {displayedText}
      <motion.span
        className="inline-block bg-neutral-300 dark:bg-white w-1 h-5 ml-1 "
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </motion.div>
  );
};

export default Typewriter;`;

export default code;
