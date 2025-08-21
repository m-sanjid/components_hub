import React from "react";
import MotionDiv from "./MotionDiv";
import { IconTerminal2 } from "@tabler/icons-react";
import {
  MotionLogo,
  NextLogo,
  ReactLogo,
  ShadcnLogo,
  TailwindLogo,
  TypeScriptLogo,
} from "./docs/LogoImages";

const TechStack = ({ techStack }: { techStack: string[] }) => {
  // icon map
  const iconMap: Record<string, React.ElementType> = {
    "next.js": NextLogo,
    react: ReactLogo,
    typescript: TypeScriptLogo,
    "tailwind css": TailwindLogo,
    motion: MotionLogo,
    shadcn: ShadcnLogo,
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-4 text-xl font-semibold">Tech Stack</h2>
      <MotionDiv
        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-start gap-4 divide-x-2 p-2"
      >
        {techStack?.map((tech) => {
          const Icon = iconMap[tech.toLowerCase()] || IconTerminal2; // fallback icon

          return (
            <div key={tech} className="inline-flex gap-2 pr-3">
              <Icon className="bg-primary/5 size-6 rounded-md border p-1 backdrop-blur-md" />

              {/* Title + description */}
              <h3 className="font-semibold">{tech}</h3>
            </div>
          );
        })}
      </MotionDiv>
    </section>
  );
};

export default TechStack;
