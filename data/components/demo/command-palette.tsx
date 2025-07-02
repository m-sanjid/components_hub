// pages/command-demo.tsx or components/CommandDemo.tsx
"use client";

import React from "react";
import { Command, CommandPalette } from "../code/command-palette"; // Replace with correct import path
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
    action: () =>
      window.open("https://example.com/docs", "_blank"),
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
  {
    id: "open-settings",
    title: "Open Settings",
    description: "Access all app preferences",
    icon: Settings,
    shortcut: "S",
    action: () => toast("Opened Settings"),
  },{
    id: "open-settings2",
    title: "Open Settings",
    description: "Access all app preferences",
    icon: Settings,
    shortcut: "S",
    action: () => toast("Opened Settings"),
  },{
    id: "open-settings3",
    title: "Open Settings",
    description: "Access all app preferences",
    icon: Settings,
    shortcut: "S",
    action: () => toast("Opened Settings"),
  },{
    id: "open-settings4",
    title: "Open Settings",
    description: "Access all app preferences",
    icon: Settings,
    shortcut: "S",
    action: () => toast("Opened Settings"),
  },
];

export default function CommandDemoPage() {
  return (
    <div className="bg-white dark:bg-black flex items-center justify-center p-10">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          Command Palette Demo
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Press <kbd className="kbd">⌘</kbd> + <kbd className="kbd">J</kbd> or click the button to open.
        </p>

        <CommandPalette commands={dummyCommands} />
      </div>
    </div>
  );
}
