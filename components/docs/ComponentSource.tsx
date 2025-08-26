import fs from "node:fs/promises";
import path from "node:path";
import * as React from "react";

import { HighlightCode } from "@/components/docs/HighlightCode";
import { getRegistryItemSource } from "@/lib/component-registry";
import { cn } from "@/lib/utils";
import { CodeCollapsibleWrapper } from "@/components/docs/CollapsibleWrapper";
import { getIconForLanguageExtension } from "@/components/docs/Iconsss";

export async function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
}) {
  if (!name && !src) return null;

  let code: string | undefined;

  if (name) {
    const item = await getRegistryItemSource(name);
    code = item?.code;
  }

  if (src) {
    const file = await fs.readFile(path.join(process.cwd(), src), "utf-8");
    code = file;
  }

  if (!code) return null;

  const lang = (language ?? title?.split(".").pop() ?? "tsx").toLowerCase();

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode code={code} language={lang} title={title} />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper
      className={cn("max-w-full overflow-x-auto p-0", className)}
    >
      <ComponentCode code={code} language={lang} title={title} />
    </CodeCollapsibleWrapper>
  );
}

function ComponentCode({
  code,
  language,
  title,
}: {
  code: string;
  language: string;
  title?: string;
}) {
  return (
    <figure data-rehype-pretty-code-figure="" className="">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground bg-primary/5 [&_svg]:text-code-foreground my-2 flex w-fit max-w-[calc(100%-2rem)] items-center gap-2 overflow-auto rounded-md px-2 py-1 backdrop-blur-xl [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <HighlightCode className={`language-${language}`}>{code}</HighlightCode>
    </figure>
  );
}
