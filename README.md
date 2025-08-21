## Components Hub

Components Hub is a Next.js 15 + React 19 component library and showcase. It provides:

- Reusable UI components built with Tailwind CSS and Radix
- Live demos, props tables, and copyable code snippets
- A public registry for installing components into your app

### Tech Stack

- Next.js 15 App Router
- React 19
- Tailwind CSS v4
- shadcn/ui primitives
- Framer Motion

### Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Project Structure

- `app/`: App Router routes, API endpoints, static pages
- `components/`: UI components and docs widgets
- `content/`: MDX sources for component pages
- `data/`: Source code and demo code for components
- `lib/`: utilities, mdx server, search, email, registry helpers
- `registry/`: installable component registry entries

### Adding a New Component

1. Create MDX under `content/components/<slug>.mdx`
2. Add demo and code under `data/components/{demo,code}/<slug>.tsx`
3. Register in `lib/component-registry.ts` and `lib/constants.ts` if needed
4. Preview at `/components/<slug>`

### Using the Registry

Install a component into another project:

```bash
npx shadcn@latest add https://your-domain.com/r/<component>.json
```

See JSON manifests in `public/r/*.json`.

### Deploy

This app is optimized for Vercel. Build with:

```bash
npm run build
```

### License

MIT — see `LICENSE` file. Component source usage is not permitted for personal and commercial projects.
