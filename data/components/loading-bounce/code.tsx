const code = `import { motion } from "motion/react";

const LoadingBounce = ({ text }: { text: string }) => {
  return (
    <div className="w-full my-20 flex flex-col gap-4 justify-center items-center">
      <motion.div
        className="flex gap-2"
        initial="start"
        animate="end"
        variants={{
          end: {
            transition: {
              staggerChildren: 0.4,
            },
          },
        }}
      >
        {[1, 2, 3, 4].map((_, index) => (
          <motion.div
            key={index}
            variants={{
              start: { y: 0 },
              end: {
                y: [0, -30, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror" as const,
                  ease: "easeInOut",
                },
              },
            }}
            className="w-2 h-8 bg-neutral-800 dark:bg-neutral-300"
          />
        ))}
      </motion.div>
      <motion.div>
        <motion.h1
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl md:text-4xl"
        >
          {text}
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default LoadingBounce;
`;

export default code;
