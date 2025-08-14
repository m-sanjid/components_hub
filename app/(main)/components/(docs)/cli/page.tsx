import React from "react";
import { CodeBlockCommand } from "@/components/docs/CodeBlockCommand";

export default function CliDocsPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>shadcn CLI</h1>
      <p>
        Use the shadcn CLI to initialize your project and add components from
        the official registry or from this hub via registry item URLs.
      </p>

      <h3>Install / Run</h3>
      <p>Run the CLI with your preferred package manager:</p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest --help"
        __npm__="npx shadcn@latest --help"
        __yarn__="yarn dlx shadcn@latest --help"
        __bun__="bunx shadcn@latest --help"
      />

      <h3>Initialize your project</h3>
      <p>
        This sets up <code>components.json</code> and installs required deps.
      </p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest init"
        __npm__="npx shadcn@latest init"
        __yarn__="yarn dlx shadcn@latest init"
        __bun__="bunx shadcn@latest init"
      />

      <h3>Add components from the official registry</h3>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest add button card tabs"
        __npm__="npx shadcn@latest add button card tabs"
        __yarn__="yarn dlx shadcn@latest add button card tabs"
        __bun__="bunx shadcn@latest add button card tabs"
      />

      <h3>Add components from this hub (custom registry)</h3>
      <p>Point the CLI to our registry item JSON. During local development:</p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest add http://localhost:3000/r/tabs.json"
        __npm__="npx shadcn@latest add http://localhost:3000/r/tabs.json"
        __yarn__="yarn dlx shadcn@latest add http://localhost:3000/r/tabs.json"
        __bun__="bunx shadcn@latest add http://localhost:3000/r/tabs.json"
      />
      <p>When deployed, replace with your domain:</p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest add https://your-domain.com/r/tabs.json"
        __npm__="npx shadcn@latest add https://your-domain.com/r/tabs.json"
        __yarn__="yarn dlx shadcn@latest add https://your-domain.com/r/tabs.json"
        __bun__="bunx shadcn@latest add https://your-domain.com/r/tabs.json"
      />

      <h3>Notes</h3>
      <ul>
        <li>
          You can pass multiple items in one command or run the command
          repeatedly for different items.
        </li>
        <li>
          The CLI will place files into the correct targets (e.g.{" "}
          <code>components/ui</code>, pages, hooks, or lib) as defined by the
          registry item.
        </li>
      </ul>
    </div>
  );
}
