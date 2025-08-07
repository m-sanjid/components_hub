import fs from "node:fs/promises";
import path from "node:path";
import * as React from "react";

import { HighlightCode } from "@/components/docs/HighlightCode";
import { getRegistryItem } from "@/lib/component-registry";
import { cn } from "@/lib/utils";
import { CodeCollapsibleWrapper } from "@/components/docs/CollapsibleWrapper";
import CopyButton from "@/components/docs/CopyButton";
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
    const item = await getRegistryItem(name);
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
      className={cn("max-w-full overflow-x-auto p-2 sm:p-0", className)}
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
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex max-w-[calc(100%-2rem)] items-center gap-2 overflow-auto [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton
        className="bg-primary/10 border-neutral-300 hover:text-primary dark:border-neutral-600"
        code={code}
      />
      <HighlightCode className={`language-${language}`}>
        {code}
      </HighlightCode>
    </figure>
  );
}
