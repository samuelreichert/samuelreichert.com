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
| UI components | Astro components; no client UI framework |
| Language | TypeScript (strict mode) |
| Styling | Vanilla CSS — design tokens, no Tailwind, no CSS-in-JS |
| Content | Astro Content Collections (JSON files in `src/content/`) |
| Testing | Vitest + Playwright + axe-core |
| Deployment | Vercel (static) |
| Node | 24 (see `.nvmrc`) |

## Design System

Immersive dark-and-gold editorial aesthetic, designed for mobile first. All visual decisions flow from `src/styles/tokens.css`.

- **Fonts**: `Cormorant Garamond` (display/serif), `Jost` (sans) — both from Google Fonts
- **Colors**: Near-black (`#0C0C0B`), warm off-white (`#F6F3EB`), and gold (`#C9A84C`); use `--accent-text` for accessible gold text
- **Dark/light mode**: toggled via `html.light-mode` class + `data-theme` attribute
- **Easing**: `--ease-out: cubic-bezier(.2,.7,.2,1)` · `--ease-in-out: cubic-bezier(.65,.05,.25,1)`
- **Default theme**: Dark; light, dark, and system preferences persist in `sr-theme`
- **Projects**: Static illustrated previews, explicitly labeled as illustrations; keep decorative effects separate from readable content
- **Motion**: Subtle entrance and scroll-driven decorative transforms only; no scroll hijacking or autoplay loops. Content must remain visible without JavaScript and with reduced motion
- **Contrast**: Keep body text at WCAG AA contrast or better. Use solid text colors; light effects belong behind decorative elements, never behind paragraphs

Never introduce external UI libraries, component frameworks, or utility CSS classes.

Additional style organization rules live in `.agents/rules/style-organization.md` and must be followed for all UI work.

## View Transitions

Site uses Astro `ClientRouter` (client-side navigation). Key rules:

- `<Header transition:persist />` — header persists across navigations, never re-renders
- `site.ts` re-initialises via `astro:page-load` (fires on initial load + every navigation)
- One-time setup (theme toggle, mobile nav) guarded by `siteInitialized` flag
- Per-navigation: reset the mobile menu and clipboard feedback; synchronize active links, locale controls, and theme
- Keep each browser behavior in `src/scripts/features/`; `site.ts` only coordinates lifecycle setup
- Language switches use full navigations to refresh the persisted header in the new locale

## Languages

- Complete English and Brazilian Portuguese pages live under `/en` and `/pt`.
- Unprefixed routes choose saved `sr-language`, then the first supported browser language, then English.
- Explicit locale URLs always keep their requested language; switching language preserves the page, query, and fragment.
- Keep both translations in content JSON and `src/i18n/messages/{en,pt}.ts`; do not mix languages in visible interface text.

## Content Collections

Schema defined in `src/content.config.ts`.

- `experience/` — JSON, `demo` field is `url().optional()` — **omit the field entirely** when no URL exists; never set `"demo": ""`
- `projects/` — same rule for `demo`

## File Conventions

- Pages: `src/pages/[locale]/[...page].astro`; original unprefixed pages remain as language-negotiating entry points
- Layouts: `src/layouts/BaseLayout.astro` (single layout, wraps all pages)
- Views: `src/views/` — compose sections; keep route generation in `src/pages/`
- Components: `src/components/` — `.astro`; do not add a client framework for simple interactions
- Styles: separate CSS files under `src/styles/`; do not use inline styles or `<style>` blocks in Astro pages/components
- Scripts: `src/scripts/site.ts` — lifecycle coordinator; browser behaviors live in `src/scripts/features/`
- Bootstrap: `src/scripts/preferences.js` — standalone, inline language/theme selection before first paint
- Tests: `src/tests/` — Vitest + jsdom; `tests/e2e/` — Playwright against the production preview

## Git & Commits

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) for all commit messages.

- Always create commits in logical, small chunks that are readable and easy for human review. Do not stage everything into one broad commit and ship it.
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
