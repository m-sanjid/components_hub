"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconSearchOff } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden px-4 pt-28 pb-24 sm:pt-32">
      {/* Background style */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 10%, hsl(var(--primary)/0.10) 0%, transparent 60%), radial-gradient(40% 30% at 80% 20%, hsl(var(--accent)/0.10) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(41, 40, 40, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(39, 36, 36, 0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-primary/5 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm backdrop-blur-md"
        >
          <IconSearchOff className="bg-primary/5 size-6 rounded-md border p-1 backdrop-blur-md" />
          <span className="text-muted-foreground">
            The page you&apos;re looking for can&apos;t be found
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="text-muted-foreground mx-auto max-w-xl text-lg"
        >
          It seems you&apos;ve ventured off the grid. Head back to the homepage
          or explore our components.
        </motion.p>

        <motion.div
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
        </motion.div>
      </section>
    </main>
  );
}
