import { Rocket, Sparkles, Layers, LayoutGrid, Activity } from "lucide-react";
import { FeatureTabs } from "./FeatureTabs";
import MotionDiv from "./MotionDiv";

const features = [
  {
    title: "Dynamic Layouts",
    description:
      "Fluid grid and stack components that adapt seamlessly to every screen size.",
    icon: LayoutGrid,
  },
  {
    title: "Motion Primitives",
    description:
      "Reusable animation hooks and patterns to speed up your design workflow.",
    icon: Activity,
  },
];

const tabs = [
  {
    value: "Seamless Motion",
    title: "Motion by Default",
    description:
      "Every component comes alive with subtle, production-ready animations baked in.",
    content: (
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <MotionDiv
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="border-border bg-card flex items-start rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="bg-primary/10 text-primary mr-2 items-center justify-center rounded-md p-1">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {feature.description}
                </p>
              </div>
            </MotionDiv>
          );
        })}
      </div>
    ),
    icon: <Rocket className="h-6 w-6" />,
  },
  {
    value: "Modern Aesthetics",
    title: "Beautiful by Design",
    description:
      "Clean, minimal components built with Tailwind CSS and attention to detail.",
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <div className="bg-primary/5 absolute inset-0 backdrop-blur-md" />
        <div className="relative p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-24 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-3 w-5/6 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-3 w-2/3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-3 w-1/2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          </div>
        </div>
      </div>
    ),

    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    value: "Developer Experience",
    title: "Built for Devs",
    description:
      "Fully typed, customizable, and designed to integrate into any modern stack.",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <pre className="font-mono text-sm text-neutral-800 dark:text-neutral-200">
            <code>
              {`// Drop-in animations
<motion.button whileHover={{ scale: 1.05 }}>
  Click Me
</motion.button>

// Fully typed with TypeScript
interface MotionButtonProps {
  whileHover?: MotionProps;
  children: React.ReactNode;
}`}
            </code>
          </pre>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "TypeScript",
            "React 18+",
            "Tailwind CSS",
            "Framer Motion",
            "ESLint",
            "Prettier",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    icon: <Layers className="h-6 w-6" />,
  },
];

export default function FeaturesSection() {
  return (
    <div className="relative overflow-hidden mask-t-from-80% px-2 py-20">
      <div className="absolute -top-40 -left-40 h-100 w-100 bg-radial from-[#FF6100]/30 via-[#FF6100]/20 mask-r-from-10 mask-b-from-10" />
      <FeatureTabs tabs={tabs} />
    </div>
  );
}
