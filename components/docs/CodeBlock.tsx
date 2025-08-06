"use client";

import { ReactNode } from "react";
import { Highlight, themes, Language } from "prism-react-renderer";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  className?: string;
  children: ReactNode;
}

export const CodeBlock = ({ className = "", children }: CodeBlockProps) => {
  const language = (className?.replace("language-", "") || "tsx") as Language;
  const code = String(children).trim();

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border bg-neutral-800 py-px pr-3 pl-1">
      <CopyButton code={code} />
      <div className="scrollbar-thin overflow-x-auto py-4">
        <Highlight
          theme={themes.oneDark}
          code={code?.trim() || ""}
          language={language}
        >
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} relative py-px`}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="mr-6 inline-block w-8 text-right text-xs text-neutral-400 select-none">
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
