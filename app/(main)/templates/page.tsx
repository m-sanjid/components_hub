"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { templates } from "@/lib/constants";
import Link from "next/link";
import { IconArrowRight, IconExternalLink } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const filteredTemplates = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return templates.filter((t) => {
      const matchesSearch =
        !normalizedSearch ||
        t.title.toLowerCase().includes(normalizedSearch) ||
        t.description.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category === "All" || t.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const categories = useMemo(
    () => ["All", ...new Set(templates.map((t) => t.category))],
    [],
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-2 text-4xl font-bold">UI Library Templates</h1>
        <p className="text-muted-foreground">
          Browse high-quality templates with live previews & instant copy.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.05 }}
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "cursor-pointer rounded-[6px] border px-2 py-px text-sm transition-colors",
                category === cat
                  ? "bg-[#FF6100] font-semibold text-white"
                  : "hover:bg-primary/10 bg-primary/5 text-primary",
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mt-6 w-full sm:w-80">
          <Search className="text-muted-foreground bg-primary/10 absolute top-2 left-2 size-5 rounded-[6px] border p-1" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="pl-8"
          />
        </div>

        <p className="text-muted-foreground mt-3 text-sm">
          {filteredTemplates.length} result
          {filteredTemplates.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Template List */}
      <div className="mx-auto max-w-6xl px-4 pb-24">
        {filteredTemplates.length === 0 ? (
          <div className="text-muted-foreground text-center">
            No templates found.
          </div>
        ) : (
          <ul
            className="divide-border border-border bg-card/30 divide-y rounded-[28px] border"
            role="list"
          >
            <AnimatePresence>
              {filteredTemplates.map((template) => (
                <motion.li
                  key={template.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.2 }}
                  className="group p-2 transition-colors duration-200"
                >
                  <article className="bg-primary/5 hover:bg-primary/10 grid gap-4 rounded-[20px] p-3 backdrop-blur-md sm:grid-cols-[minmax(200px,260px)_1fr]">
                    {/* Thumbnail */}
                    <Link href={`/templates/${template.id}`}>
                      <div className="relative aspect-video w-full overflow-hidden rounded-[12px] border bg-white dark:bg-black">
                        <Image
                          src={template.screenshots?.[0] ?? template.image}
                          alt={template.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 260px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    {/* Content */}
                    <div className="flex flex-col justify-between gap-3">
                      <Link href={`/templates/${template.id}`}>
                        <header>
                          <h2 className="truncate text-lg font-semibold">
                            {template.title}
                          </h2>
                          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                            {template.description}
                          </p>
                        </header>
                      </Link>

                      {/* Tags */}
                      <Link href={`/templates/${template.id}`}>
                        <div className="flex flex-wrap gap-2">
                          {template.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="bg-primary/5 text-primary rounded-[6px] border px-2 py-0.5 text-[10px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {template.previewUrl && (
                          <Link
                            href={template.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-primary/5 text-primary inline-flex items-center rounded-md border px-2 py-1 text-xs"
                            >
                              Live preview
                              <IconExternalLink className="ml-1 h-4 w-4" />
                            </motion.div>
                          </Link>
                        )}
                        <Link href={`/templates/${template.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary/5 text-primary inline-flex items-center rounded-md border px-2 py-1 text-xs"
                          >
                            View details
                            <IconArrowRight className="ml-1 h-4 w-4" />
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
