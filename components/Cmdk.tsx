"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type DialogProps } from "@radix-ui/react-dialog"
import * as iconsReact from "@tabler/icons-react"
import { CornerDownLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { allTemplates } from "@/lib/constants"

interface ComponentData {
  id: string
  title: string
  description?: string
  category: string
  slug: string
  tags?: string[]
  preview?: string
}

export function CommandMenu({
  ...props
}: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [components, setComponents] = React.useState<ComponentData[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

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
    setIsLoading(true)
    try {
      const res = await fetch("/api/components")
      const data = await res.json()
      // Ensure data is an array before setting
      if (Array.isArray(data)) {
        setComponents(data)
      } else {
        setComponents([])
      }
    } catch (error) {
      console.error("Failed to fetch components:", error)
      setComponents([])
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (open) {
      fetchComponents()
    }
  }, [open])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground shadow-derek flex cursor-pointer items-center gap-2 rounded-lg border px-2 py-1 text-xs transition-all duration-200 ease-in-out hover:border-[#FF6100] md:px-3 md:py-2"
          onClick={() => setOpen(true)}
          {...props}
        >
          <iconsReact.IconSearch
            strokeWidth={2}
            size={16}
            className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md"
          />
          <span className="hidden md:inline">Search </span>
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="**:data-[slot=dialog-close]:hidden rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command
          className="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:h-9! **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border"
        >
          <div className="relative">
            <CommandInput placeholder="Search documentation..." />
            {isLoading && (
              <div className="pointer-events-none absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center justify-center">
                <iconsReact.IconLoader2 className="text-muted-foreground size-4 animate-spin" />
              </div>
            )}
          </div>
          <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
            <CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
              {isLoading ? "Searching..." : "No results found."}
            </CommandEmpty>

            <CommandGroup
              heading="Navigation"
              className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
            >
              <CommandMenuStyledItem
                onSelect={() => runCommand(() => router.push("/components"))}
              >
                <iconsReact.IconComponents className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
                Components
                <CommandShortcut className="rounded border bg-black/10 px-1 text-[10px] tracking-tight backdrop-blur-md">
                  ⌘J I
                </CommandShortcut>
              </CommandMenuStyledItem>
              <CommandMenuStyledItem
                onSelect={() => runCommand(() => router.push("/templates"))}
              >
                <iconsReact.IconTemplate className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
                Templates
                <CommandShortcut className="rounded border bg-black/10 px-1 text-[10px] tracking-tight backdrop-blur-md">
                  ⌘J L
                </CommandShortcut>
              </CommandMenuStyledItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup
              heading="Components"
              className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
            >
              {!isLoading && components.map((component) => (
                <CommandMenuStyledItem
                  key={component.slug}
                  value={component.title}
                  onSelect={() => runCommand(() => router.push(`/components/${component.slug}`))}
                >
                  <iconsReact.IconComponents className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
                  {component.title}
                </CommandMenuStyledItem>
              ))}
            </CommandGroup>

            <CommandGroup
              heading="Templates"
              className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
            >
              {allTemplates.map((template) => (
                <CommandMenuStyledItem
                  key={template.id}
                  value={template.title}
                  onSelect={() => runCommand(() => router.push(`/templates/${template.id}`))}
                >
                  <iconsReact.IconTemplate className="bg-primary/10 size-6 rounded-md border p-1 backdrop-blur-md" />
                  {template.title}
                </CommandMenuStyledItem>
              ))}
            </CommandGroup>

          </CommandList>
        </Command>
        <div className="text-muted-foreground absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-2">
            <CommandMenuKbd>
              <CornerDownLeftIcon />
            </CommandMenuKbd>{" "}
            Open
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CommandMenuStyledItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof CommandItem>) {
  return (
    <CommandItem
      className={cn(
        "data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent px-3! font-medium",
        className
      )}
      {...props}
    >
      {children}
    </CommandItem>
  )
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}