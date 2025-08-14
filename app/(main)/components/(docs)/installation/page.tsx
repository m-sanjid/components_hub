import { CodeBlockCommand } from "@/components/docs/CodeBlockCommand";

export default function InstallationPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Installation</h1>
      <p>
        Get up and running quickly. These steps assume a Next.js app. If you
        already have Next.js and Tailwind CSS configured, jump straight to the
        CLI step.
      </p>

      <h3>1. Create a new Next.js app (optional)</h3>
      <CodeBlockCommand
        __pnpm__="pnpm create next-app@latest"
        __npm__="npm create next-app@latest"
        __yarn__="yarn create next-app"
        __bun__="bun create next"
      />

      <h3>2. Initialize shadcn/ui</h3>
      <p>
        This sets up <code>components.json</code>, installs dependencies, and
        configures paths. Accept the prompts or adjust as needed.
      </p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest init"
        __npm__="npx shadcn@latest init"
        __yarn__="yarn dlx shadcn@latest init"
        __bun__="bunx shadcn@latest init"
      />

      <h3>Recommended answers for this project</h3>
      <ul>
        <li>
          Style: <strong>new-york</strong>
        </li>
        <li>
          Use TypeScript RSC: <strong>Yes</strong>
        </li>
        <li>
          CSS file: <code>app/globals.css</code>
        </li>
        <li>
          Base color: <strong>neutral</strong>
        </li>
        <li>
          Aliases: <code>components</code> → <code>@/components</code>,{" "}
          <code>utils</code> → <code>@/lib/utils</code>, <code>ui</code> →{" "}
          <code>@/components/ui</code>, <code>lib</code> → <code>@/lib</code>,{" "}
          <code>hooks</code> → <code>@/hooks</code>
        </li>
      </ul>

      <h3>3. Add a component from the official registry (optional)</h3>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest add button card"
        __npm__="npx shadcn@latest add button card"
        __yarn__="yarn dlx shadcn@latest add button card"
        __bun__="bunx shadcn@latest add button card"
      />

      <h3>4. Add components from this hub (custom registry)</h3>
      <p>
        You can install components from this project using the shadcn CLI by
        referencing our registry item URLs. During local development:
      </p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest add http://localhost:3000/r/tabs.json"
        __npm__="npx shadcn@latest add http://localhost:3000/r/tabs.json"
        __yarn__="yarn dlx shadcn@latest add http://localhost:3000/r/tabs.json"
        __bun__="bunx shadcn@latest add http://localhost:3000/r/tabs.json"
      />
      <p>When deployed, replace the URL with your domain, for example:</p>
      <CodeBlockCommand
        __pnpm__="pnpm dlx shadcn@latest add https://your-domain.com/r/tabs.json"
        __npm__="npx shadcn@latest add https://your-domain.com/r/tabs.json"
        __yarn__="yarn dlx shadcn@latest add https://your-domain.com/r/tabs.json"
        __bun__="bunx shadcn@latest add https://your-domain.com/r/tabs.json"
      />

      <h3>That&apos;s it</h3>
      <p>
        Your components will be placed into <code>components/ui</code> and any
        extra files declared by the registry will be added to the right targets.
        Explore the sidebar to browse and install more.
      </p>
    </div>
  );
}
