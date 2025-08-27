import React from "react";
import { CodeBlockCommand } from "@/components/docs/CodeBlockCommand";

export default function CliDocsPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
      <h1>Shadcn CLI</h1>
      <p>
        The <strong>Shadcn CLI</strong> helps you initialize your project and
        add components directly from the official registry or from{" "}
        <code>ui.sanjid.shop</code> via registry item URLs.
      </p>

      <h2>Install / Run</h2>
      <p>Run the CLI with your preferred package manager:</p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest --help"
        __npm__="npx shadcn@latest --help"
        __yarn__="yarn dlx shadcn@latest --help"
        __bun__="bunx shadcn@latest --help"
      />

      <h2>Initialize your project</h2>
      <p>
        This will create a <code>components.json</code> file and install the
        required dependencies for your project.
      </p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest init"
        __npm__="npx shadcn@latest init"
        __yarn__="yarn dlx shadcn@latest init"
        __bun__="bunx shadcn@latest init"
      />

      <h2>Add components from the official registry</h2>
      <p>Example: adding multiple components in a single command:</p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest add button card tabs"
        __npm__="npx shadcn@latest add button card tabs"
        __yarn__="yarn dlx shadcn@latest add button card tabs"
        __bun__="bunx shadcn@latest add button card tabs"
      />

      <h2>
        Add components from <code>ui.sanjid.shop</code>
      </h2>
      <p>
        You can install components from this hub by pointing the CLI to the
        registry item JSON.
      </p>

      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest add https://ui.sanjid.shop/r/tabs.json"
        __npm__="npx shadcn@latest add https://ui.sanjid.shop/r/tabs.json"
        __yarn__="yarn dlx shadcn@latest add https://ui.sanjid.shop/r/tabs.json"
        __bun__="bunx shadcn@latest add https://ui.sanjid.shop/r/tabs.json"
      />

      <h2>Notes</h2>
      <ul>
        <li>
          You can pass multiple items in one command or run the command
          repeatedly for different items.
        </li>
        <li>
          The CLI will place files into the correct targets (e.g.{" "}
          <code>components/ui</code>, <code>pages</code>, <code>hooks</code>, or{" "}
          <code>lib</code>) as defined by the registry item.
        </li>
      </ul>

      <h4 className="pt-4">
        Thanks to{" "}
        <a
          href="https://x.com/shadcn"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn
        </a>
      </h4>
      <p>Without shadcn CLI, this would not be possible.</p>
    </div>
  );
}
