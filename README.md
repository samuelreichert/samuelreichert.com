# samuelreichert.com

Personal portfolio for Samuel Reichert. Built with Astro, React, and TypeScript.

## Stack

- Astro 6 (static output) + Vercel adapter
- React 19 (one client island: `CopyEmailButton`)
- TypeScript (strict)
- Content Collections for experience and projects
- pnpm
- vitest + @testing-library/react

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm test         # vitest
pnpm astro check  # typecheck + collection schema
pnpm build        # static + Vercel output
```

## Editing content

- Experience entries: `src/content/experience/*.json`
- Project entries: `src/content/projects/*.json`
- Site metadata + nav: `src/data/site.ts`
- Resume PDF: drop the file at `public/resume.pdf` (replaces the empty placeholder)

## Deploy

Connected to Vercel. Pushes to `main` deploy automatically. The Vercel adapter is wired in `astro.config.mjs`; no extra config files are required.
