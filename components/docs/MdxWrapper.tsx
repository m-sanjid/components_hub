import { cn } from "@/lib/utils";

export function MDXWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <article
        className={cn(
          "prose dark:prose-invert",
          "prose-lg",
          "prose-headings:font-semibold prose-headings:tracking-tight",
          "prose-a:text-primary hover:prose-a:text-primary/80",
          "prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:rounded-lg prose-pre:p-4",
          "prose-img:rounded-lg prose-img:shadow-md",
        )}
      >
        {children}
      </article>
    </div>
  );
}
