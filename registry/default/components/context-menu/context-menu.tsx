"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronRight } from "@tabler/icons-react";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
  submenu?: ContextMenuItem[];
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  onClose?: () => void;
  className?: string;
}

export function ContextMenu({
  items,
  onClose,
  className = "",
}: ContextMenuProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      setPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [onClose]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    if (item.submenu) {
      setActiveSubmenu(item.id);
    } else {
      item.onClick?.();
      onClose?.();
    }
  };

  const renderSubmenu = (item: ContextMenuItem) => {
    if (!item.submenu) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        className="absolute top-0 left-full z-50 min-w-[200px] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
      >
        {item.submenu.map((subItem) => (
          <button
            key={subItem.id}
            onClick={() => handleItemClick(subItem)}
            disabled={subItem.disabled}
            className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${
              subItem.disabled
                ? "cursor-not-allowed text-neutral-400"
                : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            }`}
          >
            {subItem.icon && (
              <subItem.icon className="h-4 w-4 text-neutral-400" />
            )}
            <span className="flex-1 text-left">{subItem.label}</span>
            {subItem.shortcut && (
              <kbd className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs dark:border-neutral-700 dark:bg-neutral-800">
                {subItem.shortcut}
              </kbd>
            )}
          </button>
        ))}
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
        }}
        className={`z-50 min-w-[200px] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
      >
        {items.map((item) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${
                item.disabled
                  ? "cursor-not-allowed text-neutral-400"
                  : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              {item.icon && <item.icon className="h-4 w-4 text-neutral-400" />}
              <span className="flex-1 text-left">{item.label}</span>
              {item.shortcut && (
                <kbd className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs dark:border-neutral-700 dark:bg-neutral-800">
                  {item.shortcut}
                </kbd>
              )}
              {item.submenu && (
                <IconChevronRight className="h-4 w-4 text-neutral-400" />
              )}
            </button>
            {activeSubmenu === item.id && renderSubmenu(item)}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
