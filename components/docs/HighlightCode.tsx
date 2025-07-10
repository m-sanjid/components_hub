"use client";

import React, { useEffect, useState } from "react";
import { Highlight, themes, Language, PrismTheme } from "prism-react-renderer";
import { useTheme } from "next-themes";

export function HighlightCode({
  code,
  language = "tsx",
}: {
  code: string;
  language?: Language;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedTheme = !mounted
    ? themes.vsLight
    : theme === "light"
      ? themes.vsLight
      : themes.vsDark;

  // Custom command transformation logic
  const commandProps: Record<string, string> = {};
  if (code.startsWith("npm install")) {
    commandProps["__npm__"] = code;
    commandProps["__yarn__"] = code.replace("npm install", "yarn add");
    commandProps["__pnpm__"] = code.replace("npm install", "pnpm add");
    commandProps["__bun__"] = code.replace("npm install", "bun add");
  } else if (code.startsWith("npx create-")) {
    commandProps["__npm__"] = code;
    commandProps["__yarn__"] = code.replace("npx create-", "yarn create ");
    commandProps["__pnpm__"] = code.replace("npx create-", "pnpm create ");
    commandProps["__bun__"] = code.replace("npx", "bunx --bun");
  } else if (code.startsWith("npm create")) {
    commandProps["__npm__"] = code;
    commandProps["__yarn__"] = code.replace("npm create", "yarn create");
    commandProps["__pnpm__"] = code.replace("npm create", "pnpm create");
    commandProps["__bun__"] = code.replace("npm create", "bun create");
  } else if (code.startsWith("npx")) {
    commandProps["__npm__"] = code;
    commandProps["__yarn__"] = code.replace("npx", "yarn");
    commandProps["__pnpm__"] = code.replace("npx", "pnpm dlx");
    commandProps["__bun__"] = code.replace("npx", "bunx --bun");
  } else if (code.startsWith("npm run")) {
    commandProps["__npm__"] = code;
    commandProps["__yarn__"] = code.replace("npm run", "yarn");
    commandProps["__pnpm__"] = code.replace("npm run", "pnpm");
    commandProps["__bun__"] = code.replace("npm run", "bun");
  }

  return (
    <div
      className="overflow-x-auto rounded-lg bg-neutral-900 p-2 text-xs sm:p-4 sm:text-sm"
      {...commandProps}
    >
      <Highlight
        code={code.trim()}
        language={language}
        theme={selectedTheme as PrismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto rounded-lg p-2 sm:p-4`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
