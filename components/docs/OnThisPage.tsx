"use client";

import { IconBrandX } from "@tabler/icons-react";
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      history.replaceState(null, "", `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav
      className="bg-card sticky top-26 max-h-[70vh] overflow-y-auto rounded-lg border p-4 text-sm"
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
              onClick={(e) => handleClick(e, h.id)}
              className="hover:text-primary text-foreground/80 cursor-pointer"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-2 border-t pt-4">
        <a
          href="/contact"
          className="hover:bg-primary/10 inline-flex w-full items-center justify-center rounded-md border px-3 py-2 text-xs font-medium"
        >
          Need help? Contact us
        </a>
        <a
          href="https://x.com/dev_sanjid"
          className="hover:bg-primary/10 inline-flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-medium"
        >
          <IconBrandX className="bg-primary/20 text-primary h-6 w-6 rounded-md border p-1 backdrop-blur-md" />
          Follow for updates
        </a>
      </div>
    </nav>
  );
}
