import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { CodeBlockCommand } from "./CodeBlockCommand";
import { CodePreview } from "./CodePreview";
import { ComponentSource } from "./ComponentSource";
import { getIconForLanguageExtension } from "./Iconsss";
import { CodeTabs } from "./CodeTabs";
import { PropsTable } from "./PropsTable";
import { TemplateCard } from "./TemplateCard";
import { TemplateShowcase } from "./TemplateShowcase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HighlightCode } from "./HighlightCode";
import { Shadcn } from "./Shadcn";

const generateId = (text: React.ReactNode) =>
  text
    ?.toString()
    .replace(/[\s'?]/g, "-")
    .toLowerCase() || "";

export const mdxComponents = {
  // ——— CODE BLOCKS ———
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => (
    <pre
      className={cn(
        "scrollbar-hide min-w-0 overflow-x-auto outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  ),

  // code: CodeBlock,
  code: HighlightCode,

  // ——— HEADINGS ———
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-28 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, children, ...props }: React.ComponentProps<"h2">) => (
    <h2 id={generateId(children)} className={cn("", className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => (
    <h3
      id={generateId(children)}
      className={cn(
        "font-heading mt-8 scroll-m-28 text-base font-semibold tracking-tight sm:text-xl *:[code]:text-xl",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn(
        "font-heading mt-8 scroll-m-28 text-base font-medium tracking-tight sm:text-lg",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "bg-primary/10 mt-8 w-fit scroll-m-28 rounded-md px-2 py-1 text-sm font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-8 scroll-m-28 text-base font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  ),

  // ——— TEXT ———
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn("leading-relaxed [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a className={cn("font-medium", className)} {...props} />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("font-medium", className)} {...props} />
  ),

  // ——— LISTS ———
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),

  // ——— BLOCK ELEMENTS ———
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  hr: (props: React.ComponentProps<"hr">) => (
    <hr className="my-4 md:my-8" {...props} />
  ),

  // ——— TABLES ———
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          "relative w-full overflow-hidden border-none text-sm",
          className,
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
      className={cn("last:border-b-none m-0 border-b", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),

  // ——— FIGURES ———
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => (
    <figure className={cn(className)} {...props} />
  ),
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"figcaption">) => {
    const icon =
      "data-language" in props && typeof props["data-language"] === "string"
        ? getIconForLanguageExtension(props["data-language"])
        : null;

    return (
      <figcaption
        className={cn(
          "text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
          className,
        )}
        {...props}
      >
        {icon}
        {children}
      </figcaption>
    );
  },

  // ——— IMAGES ———
  img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
    //eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      className={cn("mt-6 rounded-md border", className)}
      src={src as string}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ""}
      {...props}
    />
  ),

  // ——— CUSTOM COMPONENTS ———
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "justify-start gap-4 rounded-none bg-transparent sm:px-2 md:px-0",
        className,
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger className={cn("", className)} {...props} />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative max-w-[720px] [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6",
        className,
      )}
      {...props}
    />
  ),
  Tab: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div className={cn(className)} {...props} />
  ),

  // ——— STEP BLOCKS ———
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h4
      className={cn(
        "font-heading mt-4 scroll-m-32 text-xl font-medium tracking-tight md:mt-8",
        className,
      )}
      {...props}
    />
  ),
  Steps: (props: React.ComponentProps<"div">) => (
    <div
      className="[&>h3]:step steps mb-6 [counter-reset:step] md:mb-12 *:[h3]:first:!mt-0"
      {...props}
    />
  ),

  // ——— REUSABLE COMPONENTS ———
  CodePreview,
  CodeTabs,
  CodeBlockCommand,
  ComponentSource,
  PropsTable,
  TemplateCard,
  TemplateShowcase,
  Shadcn,
};
