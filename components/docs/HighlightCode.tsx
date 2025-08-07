"use client";

import React, { useEffect, useState } from "react";
import { Highlight, themes, Language } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { CodeBlockCommand } from "./CodeBlockCommand";
import CopyButton from "./CopyButton";

export interface HighlightCodeProps {
  className?: string;
  children: React.ReactNode;
}

export const HighlightCode = ({
  className = "",
  children,
}: HighlightCodeProps) => {

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
    <div className="group relative my-6 overflow-hidden rounded-lg border bg-neutral-50 dark:bg-neutral-800 py-px pr-3 pl-1 transition-colors duration-300">
      <CopyButton code={code} />
      <div className="scrollbar-thin overflow-x-auto py-4">
        <Highlight theme={themes.oneDark} code={code} language={language}>
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} relative py-px`}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="mr-6 inline-block w-8 text-right text-xs text-neutral-400 dark:text-neutral-500 select-none">
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
