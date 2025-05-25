"use client"

import * as React from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { IconComponents, IconLoader2, IconSearch, IconTemplate } from "@tabler/icons-react"

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
  const [open, setOpen] = React.useState(false)
  const [components, setComponents] = React.useState<ComponentData[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        window.location.href = "/components"
      }
      if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        window.location.href = "/templates"
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

const fetchComponents = async () => {
  setIsLoading(true)
  const res = await fetch("/api/components")
  const data = await res.json()
  setComponents(data)
  setIsLoading(false)
}

React.useEffect(() => {
  fetchComponents()
}, [])

  return (
    <>
      <div className="text-sm text-muted-foreground border-2 px-4 py-2 border-muted rounded-full flex items-center gap-2 cursor-pointer" onClick={()=>{setOpen(true)}} >
      <IconSearch strokeWidth={2} size={16} />
      <span>Search Components...</span>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem>
              <IconComponents />
              <span>Components</span>
              <CommandShortcut className="text-xs bg-black/10 px-1 rounded backdrop-blur-md border">⌘J</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconTemplate />
              <span>Templates</span>
              <CommandShortcut className="text-xs bg-black/10 px-1 rounded backdrop-blur-md border">⌘L</CommandShortcut>
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
                <IconComponents />
                <span>No components found</span>
              </CommandItem>
            ) : (
              components.map((component) => (
                <CommandItem key={component.id} onSelect={()=>{setOpen(false); window.location.href = "/components/"+component.slug}}>
                  <IconComponents />
                  <span>{component.title}</span> 
                  
                </CommandItem>
            )))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
