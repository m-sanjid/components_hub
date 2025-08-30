"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Search, X } from "lucide-react";

export interface Command {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  commands: Command[];
  placeholder?: string;
  onClose?: () => void;
  className?: string;
}

export function CommandPalette({
  commands,
  placeholder = "Type a command...",
  onClose,
  className = "",
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()),
  );

  const closePalette = () => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
    onClose?.();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }
      if (!isOpen) return;

      if (e.key === "Escape") closePalette();

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0,
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1,
        );
      }

      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        closePalette();
      }
    },
    [isOpen, filteredCommands, selectedIndex],
  );

  // Scroll selected item into view
  useEffect(() => {
    const el = itemRefs.current[selectedIndex];
    if (el && containerRef.current) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, isOpen]);

  return (
    <LayoutGroup>
      {/* Compact trigger pill */}
      <motion.div
        layoutId="command-palette"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-1/2 z-50 flex h-10 w-48 -translate-x-1/2 cursor-pointer items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 shadow-md dark:border-neutral-700 dark:bg-neutral-900"
      >
        <motion.div layoutId="searchIcon">
          <Search className="h-4 w-4 text-neutral-500" />
        </motion.div>
        <motion.span
          layoutId="placeholder"
          className="text-sm text-neutral-600 dark:text-neutral-300"
        >
          Search...
        </motion.span>
        <motion.kbd
          layoutId="shortcut"
          initial={{ opacity: 0, scale: 0.97, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.97, filter: "blur(5px)" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="ml-auto rounded bg-neutral-200 px-2 py-0.5 text-xs dark:bg-neutral-700"
        >
          ⌘ J
        </motion.kbd>
      </motion.div>

      {/* Palette overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="command-palette-wrapper"
            className="fixed inset-0 z-[60] flex items-start justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closePalette}
            />

            {/* Expanded Palette */}
            <motion.div
              layoutId="command-palette"
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              className={`relative top-20 w-full max-w-xl rounded-2xl border bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
            >
              {/* Input */}
              <div className="flex items-center gap-2 border-b border-neutral-200 p-4 dark:border-neutral-700">
                <motion.div layoutId="searchIcon">
                  <Search className="h-5 w-5 text-neutral-400" />
                </motion.div>
                <motion.input
                  layoutId="placeholder"
                  autoFocus
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white"
                />
                <motion.button
                  onClick={closePalette}
                  className="rounded p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="h-5 w-5 text-neutral-400" />
                </motion.button>
              </div>

              {/* Commands */}
              <div
                ref={containerRef}
                className="max-h-80 overflow-y-auto scroll-smooth p-1"
              >
                {filteredCommands.length === 0 ? (
                  <div className="p-4 text-center text-sm text-neutral-500">
                    No results found
                  </div>
                ) : (
                  filteredCommands.map((command, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={command.id}
                        ref={(el) => {
                          if (el) itemRefs.current[index] = el;
                        }}
                        onClick={() => {
                          command.action();
                          closePalette();
                        }}
                        className={`flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors ${
                          isSelected
                            ? "bg-neutral-100 dark:bg-neutral-800"
                            : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                        }`}
                      >
                        {command.icon && (
                          <command.icon className="h-5 w-5 text-neutral-400" />
                        )}
                        <div className="flex-1 text-left">
                          <div className="font-medium text-neutral-900 dark:text-white">
                            {command.title}
                          </div>
                          {command.description && (
                            <div className="text-xs text-neutral-500">
                              {command.description}
                            </div>
                          )}
                        </div>
                        {command.shortcut && (
                          <kbd className="rounded border bg-neutral-100 px-2 py-0.5 text-xs dark:border-neutral-700 dark:bg-neutral-800">
                            {command.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
