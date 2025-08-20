"use client";

import React from "react";

type HeadingItem = { id: string; text: string; level: number };

function slugify(text: string) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s'?]/g, "-");
}

export function OnThisPage({ rootId = "docs-content" }: { rootId?: string }) {
  const [headings, setHeadings] = React.useState<HeadingItem[]>([]);

  React.useEffect(() => {
    const root = document.getElementById(rootId) || document.body;
    if (!root) return;
    const nodes = Array.from(
      root.querySelectorAll("h2, h3"),
    ) as HTMLHeadingElement[];
    const items: HeadingItem[] = nodes.map((el) => {
      if (!el.id) {
        el.id = slugify(el.textContent || "");
      }
      const level = el.tagName.toLowerCase() === "h3" ? 3 : 2;
      return { id: el.id, text: el.textContent || "", level };
    });
    setHeadings(items);
  }, [rootId]);

  if (headings.length === 0) return null;

  return (
    <nav
      className="bg-card sticky top-24 max-h-[70vh] overflow-y-auto rounded-lg border p-4 text-sm"
      aria-label="On this page"
    >
      <h2 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
        On this page
      </h2>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : undefined}>
            <a
              href={`#${h.id}`}
              className="hover:text-primary text-foreground/80"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t pt-4">
        <a
          href="/contact"
          className="hover:bg-primary/10 inline-flex w-full items-center justify-center rounded-md border px-3 py-2 text-xs font-medium"
        >
          Need help? Contact us
        </a>
      </div>
    </nav>
  );
}
