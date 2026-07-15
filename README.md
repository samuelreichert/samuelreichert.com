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

## Environment

Copy `.env.example` to `.env.local` for local overrides. On Vercel, configure these in Project Settings → Environment Variables:

- `PUBLIC_RESUME_URL`: URL used by the CV button on the contact page.
- `PUBLIC_SITE_URL`: canonical production URL used by SEO metadata and sitemap generation.

## Editing content

- Experience entries: `src/content/experience/*.json`
- Project entries: `src/content/projects/*.json`
- Site metadata + nav: `src/data/site.ts`
- Resume PDF: defaults to the Google Docs export URL in `siteConfig.resumeUrl`, and can be overridden with `PUBLIC_RESUME_URL`

## Deploy

Connected to Vercel. Pushes to `main` deploy automatically. The Vercel adapter is wired in `astro.config.mjs`; no extra config files are required.
