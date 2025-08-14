"use client";

import React from "react";
import { Highlight, themes, Language } from "prism-react-renderer";
import { CodeBlockCommand } from "./CodeBlockCommand";
import CopyButton from "./CopyButton";
import { useTheme } from "next-themes";

export interface HighlightCodeProps {
  className?: string;
  children: React.ReactNode;
}

export const HighlightCode = ({
  className = "",
  children,
}: HighlightCodeProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const language = (className?.replace("language-", "") || "tsx") as Language;
  const code = typeof children === "string" ? children.trim() : "";

  const isCommand = (cmd: string) =>
    /^npm (install|run|create)|^npx(?! --)|^bun|^pnpm/.test(cmd.trim());

  const generateCommandVariants = (cmd: string): Record<string, string> => {
    if (cmd.startsWith("npm install")) {
      return {
        __npm__: cmd,
        __yarn__: cmd.replace("npm install", "yarn add"),
        __pnpm__: cmd.replace("npm install", "pnpm add"),
        __bun__: cmd.replace("npm install", "bun add"),
      };
    } else if (cmd.startsWith("npm create")) {
      return {
        __npm__: cmd,
        __yarn__: cmd.replace("npm create", "yarn create"),
        __pnpm__: cmd.replace("npm create", "pnpm create"),
        __bun__: cmd.replace("npm create", "bun create"),
      };
    } else if (cmd.startsWith("npx create-")) {
      return {
        __npm__: cmd,
        __yarn__: cmd.replace("npx create-", "yarn create "),
        __pnpm__: cmd.replace("npx create-", "pnpm create "),
        __bun__: cmd.replace("npx", "bunx --bun"),
      };
    } else if (cmd.startsWith("npx")) {
      return {
        __npm__: cmd,
        __yarn__: cmd.replace("npx", "yarn"),
        __pnpm__: cmd.replace("npx", "pnpm dlx"),
        __bun__: cmd.replace("npx", "bunx --bun"),
      };
    } else if (cmd.startsWith("npm run")) {
      return {
        __npm__: cmd,
        __yarn__: cmd.replace("npm run", "yarn"),
        __pnpm__: cmd.replace("npm run", "pnpm"),
        __bun__: cmd.replace("npm run", "bun"),
      };
    }

    return {};
  };

  // CLI command variant block
  if (language === "bash" && isCommand(code)) {
    const variants = generateCommandVariants(code);
    return <CodeBlockCommand {...variants} />;
  }

  return (
    <div className="group relative overflow-hidden max-w-4xl mr-auto">
      <CopyButton code={code} className="absolute top-3 right-3" />
      <div className="scrollbar-thin overflow-x-auto">
        <Highlight
          theme={
            !mounted
              ? themes.oneLight
              : resolvedTheme === "dark"
                ? themes.oneDark
                : themes.oneLight
          }
          code={code}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} relative`}
              style={style}
              aria-label={`Code snippet in ${language}`}
              tabIndex={0}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="mr-4 inline-block w-8 text-right text-xs text-neutral-400 select-none dark:text-neutral-500">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
