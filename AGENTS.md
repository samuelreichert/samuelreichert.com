@/Users/sreichert/.codex/RTK.md

---

# samuelreichert.com — AI Rules & Project Context

This is the canonical project instruction file for all coding agents. Keep project rules here; compatibility files such as `CLAUDE.md` should only import this file.

## Package Manager

**Always use pnpm.** Never use npm or yarn.

```bash
pnpm install       # install deps
pnpm add <pkg>     # add dependency
pnpm add -D <pkg>  # add dev dependency
pnpm dev           # start dev server
pnpm build         # production build
pnpm test          # run tests
```

`package-lock.json` must not exist. If it appears, delete it.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Astro 6 (static output, Vercel adapter) |
| UI components | React 19 (islands only — sparingly) |
| Language | TypeScript (strict mode) |
| Styling | Vanilla CSS — design tokens, no Tailwind, no CSS-in-JS |
| Content | Astro Content Collections (JSON files in `src/content/`) |
| Testing | Vitest + Testing Library |
| Deployment | Vercel (static) |
| Node | 24 (see `.nvmrc`) |

## Design System

Luxury dark-gold aesthetic. All visual decisions flow from `src/styles/tokens.css`.

- **Fonts**: `Cormorant Garamond` (display/serif), `Jost` (sans) — both from Google Fonts
- **Colors**: Black base (`#000`), gold accent (`#C9A84C`), warm off-white text (`#F5F2EA`)
- **Dark/light mode**: toggled via `html.light-mode` class + `data-theme` attribute
- **Easing**: `--ease-out: cubic-bezier(.2,.7,.2,1)` · `--ease-in-out: cubic-bezier(.65,.05,.25,1)`
- **Cards**: `.lux-card` — grain overlay, gold shimmer border on hover, lift transform
- **Reveals**: `.reveal` (IntersectionObserver, scroll-triggered) · `.reveal-eager` (above-fold, double-rAF)

Never introduce external UI libraries, component frameworks, or utility CSS classes. All styles are co-located in the page/component or in `src/styles/`.

## View Transitions

Site uses Astro `ClientRouter` (client-side navigation). Key rules:

- `<Header transition:persist />` — header persists across navigations, never re-renders
- `site.ts` re-initialises via `astro:page-load` (fires on initial load + every navigation)
- One-time setup (theme toggle, scroll handler, mobile nav) guarded by `siteInitialized` flag
- Per-navigation: reset mobile nav state, update `aria-current` on nav links, re-attach IntersectionObserver
- `revealObserver` is a module-level ref — always disconnect before re-creating on navigation

## Content Collections

Schema defined in `src/content.config.ts`.

- `experience/` — JSON, `demo` field is `url().optional()` — **omit the field entirely** when no URL exists; never set `"demo": ""`
- `projects/` — same rule for `demo`

## File Conventions

- Pages: `src/pages/*.astro`
- Layouts: `src/layouts/BaseLayout.astro` (single layout, wraps all pages)
- Components: `src/components/` — `.astro` preferred, `.tsx` only for interactive islands
- Styles: scoped `<style>` in components/pages; global-only in `src/styles/` or `<style is:global>` in BaseLayout
- Scripts: `src/scripts/site.ts` — DOM event logic, re-runs on `astro:page-load`
- Tests: `src/tests/` — Vitest + jsdom

## Git & Commits

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for all commit messages.

- Format: `<type>[optional scope]: <description>`
- Use `feat:` for new features and `fix:` for bug fixes.
- Use other clear types when appropriate, such as `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, or `chore:`.
- Mark breaking changes with `!` before the colon, for example `feat(api)!: change response shape`, or with a `BREAKING CHANGE:` footer.

## What to Avoid

- `npm` or `yarn` commands — use `pnpm`
- External CSS frameworks (Tailwind, Bootstrap, styled-components)
- Adding React components for non-interactive content — use `.astro`
- Empty string values for URL fields in content JSON — omit the key
- Inline `transition:persist` on anything except `<Header />` unless specifically designed
- Scoped `<style>` for `::view-transition-*` pseudo-elements — they need `is:global`
- Committing `.vercel/`, `dist/`, `node_modules/`, `package-lock.json`

## Commands

```bash
pnpm dev          # http://localhost:4321
pnpm build        # production build → dist/
pnpm preview      # preview production build locally
pnpm test         # vitest run (CI mode)
pnpm test:watch   # vitest watch mode
pnpm astro check  # TypeScript + Astro type check
```
