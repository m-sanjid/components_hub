import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconSearchOff } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import MotionDiv from "@/components/MotionDiv";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden px-4 pt-28 pb-24 sm:pt-32">
      {/* Background style */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)]",
          "[background-size:48px_48px]",
          "mask-t-from-50% mask-r-from-50% mask-b-to-50% mask-l-from-50%",
          "bg-[#FF6100]/40",
        )}
        aria-hidden
      >
        <div className="absolute inset-0 mix-blend-overlay" />
      </div>

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-primary/5 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm backdrop-blur-md"
        >
          <IconSearchOff className="bg-primary/5 size-6 rounded-md border p-1 backdrop-blur-md" />
          <span className="text-muted-foreground">
            The page you&apos;re looking for can&apos;t be found
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          404
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="text-muted-foreground mx-auto max-w-xl text-lg"
        >
          It seems you&apos;ve ventured off the grid. Head back to the homepage
          or explore our components.
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="flex flex-col items-center gap-2 sm:flex-row"
        >
          <Button asChild size="lg" variant="default" className="group">
            <Link href="/">
              <IconArrowLeft
                size={18}
                className="duration-300 ease-in-out group-hover:-translate-x-2"
              />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="group">
            <Link href="/components">Explore Components</Link>
          </Button>
        </MotionDiv>
      </section>
    </main>
  );
}
