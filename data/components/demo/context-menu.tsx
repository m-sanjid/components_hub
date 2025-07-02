"use client";

import { ContextMenu } from "../code/context-menu";
import { FileText, Folder, Trash, Edit, Copy, Share } from "lucide-react";

export default function ContextMenuDemo() {
  const items = [
    {
      id: "open",
      label: "Open",
      icon: FileText,
      shortcut: "⌘O",
      onClick: () => console.log("Open"),
    },
    {
      id: "edit",
      label: "Edit",
      icon: Edit,
      shortcut: "⌘E",
      onClick: () => console.log("Edit"),
    },
    {
      id: "share",
      label: "Share",
      icon: Share,
      submenu: [
        {
          id: "copy-link",
          label: "Copy Link",
          icon: Copy,
          shortcut: "⌘C",
          onClick: () => console.log("Copy Link"),
        },
        {
          id: "email",
          label: "Email",
          icon: FileText,
          onClick: () => console.log("Email"),
        },
      ],
    },
    {
      id: "move",
      label: "Move to",
      icon: Folder,
      submenu: [
        {
          id: "folder-1",
          label: "Folder 1",
          onClick: () => console.log("Move to Folder 1"),
        },
        {
          id: "folder-2",
          label: "Folder 2",
          onClick: () => console.log("Move to Folder 2"),
        },
      ],
    },
    {
      id: "delete",
      label: "Delete",
      icon: Trash,
      shortcut: "⌫",
      onClick: () => console.log("Delete"),
    },
  ];

  return (
    <div className="h-[400px] w-full rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
      <p className="text-sm text-neutral-500">
        Right-click anywhere in this area to see the context menu
      </p>
      <ContextMenu items={items} />
    </div>
  );
}
