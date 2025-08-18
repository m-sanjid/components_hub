"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  IconComponents,
  IconLoader2,
  IconSearch,
  IconTemplate,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ComponentData {
  id: string;
  title: string;
  description?: string;
  category: string;
  slug: string;
  tags?: string[];
  preview?: string;
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [components, setComponents] = React.useState<ComponentData[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const router = useRouter();
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) return;
      
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "j") {
          e.preventDefault();
          const handleNextKey = (nextEvent: KeyboardEvent) => {
            if (nextEvent.key === "i") {
              nextEvent.preventDefault();
              router.push("/components");
            } else if (nextEvent.key === "l") {
              nextEvent.preventDefault();
              router.push("/templates");
            }
            document.removeEventListener("keydown", handleNextKey);
          };
          document.addEventListener("keydown", handleNextKey, { once: true });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, router]);

  const fetchComponents = async () => {
    setIsLoading(true);
    const res = await fetch("/api/components");
    const data = await res.json();
    setComponents(data);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchComponents();
  }, []);
  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      <div
        className="text-muted-foreground shadow-derek flex cursor-pointer items-center gap-2 rounded-lg border hover:border-[#FF6100] transition-all duration-200 ease-in-out px-2 py-1 sm:px-4 sm:py-2 text-xs"
        onClick={() => {
          setOpen(true);
        }}
      >
        <IconSearch
          strokeWidth={2}
          size={16}
          className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md"
        />
        <span className="hidden sm:inline">Search Components...</span>
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => {
                navigate("/components");
              }}
            >
              <IconComponents className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
              <span>Components</span>
              <CommandShortcut className="rounded border bg-black/10 px-1 text-[10px] tracking-tight backdrop-blur-md">
                ⌘J I
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate("/templates");
              }}
            >
              <IconTemplate className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
              <span>Templates</span>
              <CommandShortcut className="rounded border bg-black/10 px-1 text-[10px] tracking-tight backdrop-blur-md">
                ⌘J L
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Components">
            {isLoading ? (
              <CommandItem>
                <IconLoader2 className="animate-spin" />
                <span>Loading...</span>
              </CommandItem>
            ) : components.length === 0 ? (
              <CommandItem>
                <IconComponents className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
                <span>No components found</span>
              </CommandItem>
            ) : (
              components.map((component, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    navigate("/components/" + component.slug);
                  }}
                >
                  <IconComponents className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
                  <span>{component.title}</span>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
