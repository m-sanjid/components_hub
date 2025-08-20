"use client";

import React from "react";
import { Command, CommandPalette } from "../code/command-pill"; // adjust path if needed
import { Settings, Code, Globe, User, CommandIcon } from "lucide-react";
import { toast } from "sonner";

const dummyCommands: Command[] = [
  {
    id: "profile",
    title: "Open Profile",
    description: "View or edit your profile settings",
    icon: User,
    shortcut: "P",
    action: () => toast("Opened Profile"),
  },
  {
    id: "settings",
    title: "Open Settings",
    description: "Access all app preferences",
    icon: Settings,
    shortcut: "S",
    action: () => toast("Opened Settings"),
  },
  {
    id: "docs",
    title: "Go to Docs",
    description: "Read the official documentation",
    icon: Globe,
    shortcut: "D",
    action: () => window.open("https://example.com/docs", "_blank"),
  },
  {
    id: "new-project",
    title: "Create New Project",
    description: "Start a fresh new project",
    icon: Code,
    shortcut: "N",
    action: () => toast("Creating new project..."),
  },
  {
    id: "command-palette",
    title: "Command Palette",
    description: "Open the command palette",
    icon: CommandIcon,
    shortcut: "C",
    action: () => toast("Opening command palette..."),
  },
];

export default function CommandDemoPage() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Floating Dynamic Island Command Palette */}
      <CommandPalette commands={dummyCommands} />

      <div className="mx-auto max-w-xl pt-40 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          Command Palette Demo
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Press <kbd className="rounded bg-neutral-200 px-1 dark:bg-neutral-700">⌘</kbd> +{" "}
          <kbd className="rounded bg-neutral-200 px-1 dark:bg-neutral-700">J</kbd> or click the
          floating pill above to open.
        </p>
      </div>
    </div>
  );
}
