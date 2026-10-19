# samuelreichert.com

Samuel Reichert’s bilingual portfolio. Static Astro 6 pages, TypeScript, and plain CSS, with no client-side UI framework. The content focuses on professional experience and four independent projects: Flowboard, Poupai, Pocket Clone, and Spotify Playlists.

## Development

Use Node 24 and pnpm.

```bash
pnpm install
pnpm dev
pnpm test
pnpm astro check
pnpm build
pnpm preview
```

The development server uses port 4321. `pnpm build` produces static pages and the Vercel deployment output.

## Languages

- `/en` and `/pt` serve complete English and Brazilian Portuguese pages.
- Each language has `/projects`, `/experience`, `/about`, and `/contact` routes.
- `/` and the original unprefixed routes negotiate the language before first paint: a valid manual choice in `localStorage['sr-language']` wins, followed by the first supported language in `navigator.languages`, then English.
- Explicit `/en/...` and `/pt/...` URLs always retain their requested language, so links can be shared reliably.
- The language control saves the choice and preserves the current page, query string, and fragment. A full page navigation refreshes the persistent header in the new language.
- Without JavaScript, pages remain readable and all language/navigation links work. Unprefixed routes show English. If storage is blocked, explicit localized routes still preserve language during navigation, but the preference cannot survive a new visit to an unprefixed URL.
- Metadata, canonical URLs, `hreflang`, and the sitemap include both languages. The single static 404 document translates its UI on load.

## Code organization

Each layer has one responsibility:

| Location                                     | Responsibility                                                                                                       |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `src/pages/`                                 | Generate public routes and select a view. Legacy entry points reuse the same views.                                  |
| `src/views/`                                 | Compose each page from sections inside the shared layout.                                                            |
| `src/layouts/BaseLayout.astro`               | Document shell, metadata, fonts, header, footer, and navigation lifecycle.                                           |
| `src/components/sections/`                   | Render a section, with a summary or standalone presentation when needed.                                             |
| `src/components/projects/` and `experience/` | Render typed content entries; each project illustration has its own component.                                       |
| `src/content/`                               | Store bilingual project and employment content, validated by `content.config.ts`.                                    |
| `src/data/`                                  | Read and order collections; hold shared contact details and technology lists.                                        |
| `src/i18n/messages/`                         | English and Brazilian Portuguese copy. The Portuguese dictionary must satisfy the English structure at compile time. |
| `src/i18n/config.ts`                         | Pure locale, route, and date helpers.                                                                                |
| `src/scripts/features/`                      | Independent menu, theme, language, clipboard, and 404 behaviors.                                                     |
| `src/scripts/site.ts`                        | Register behaviors once and synchronize them after Astro navigation.                                                 |
| `src/styles/`                                | Design tokens, global primitives, shell styles, and styles owned by each section or illustration.                    |

`src/scripts/preferences.js` is intentionally a small, standalone bootstrap. The layout inlines it before first paint so language negotiation and theme selection do not wait for the main script. Its behavior has dedicated tests.

To update a project or employer, edit its JSON entry. To change interface text, edit the matching key in both language files. To change a page composition, edit its view; no routing or browser behavior changes are needed.

## Content and design

The portfolio uses an immersive black-and-gold palette, locally served typography, and mobile-first layouts. Dark is the default theme; light, dark, and system choices persist in `sr-theme`. All shared design values live in `src/styles/tokens.css`.

`src/assets/samuel.jpg` is the supplied portrait, optimized into responsive WebP images by Astro. Project previews are lightweight CSS illustrations and are labeled accordingly. Pocket Clone and Poupai are marked as in development. Omit `demo` from content entries when no verified live URL exists. Contact details and the existing English CV download live in `src/data/site.ts`.

The original decorative quotes, filters, and unused React islands have been removed. The hero’s gold frames use CSS and optional scroll-driven transforms; no animation library, video background, or canvas renderer is needed. Portrait presentation is isolated in `components/hero/HeroPortrait.astro` and `styles/hero-portrait.css`. Body text and controls use high-contrast colors, and the gold decoration remains separate from reading surfaces. Substantive content is visible without JavaScript; reduced motion disables transitions and entrance animations.

Run `pnpm format` to format the source and `pnpm format:check` to check consistency. Type checking validates content schemas, component props, and translation keys; behavioral tests cover browser preferences and navigation.

## Browser verification

Build first. Install Chromium once, then run the browser suite:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

To use an existing Chrome installation:

```bash
PLAYWRIGHT_CHROMIUM_CHANNEL=chrome pnpm test:e2e
```

The suite starts a production preview on port 4322 and checks language negotiation and persistence, explicit links, mobile menu behavior, themes, clipboard success/failure, disabled storage/JavaScript, reduced motion, 404 recovery, metadata, and overflow at 320, 390, 768, 1000, and 1440 pixels. Axe checks both languages and themes. Test reports stay out of Git.

## Deployment

The existing Vercel adapter and security headers are preserved. Deploy the verified branch through the project’s existing Vercel workflow. Review the local preview before promoting a redesign to production.

## Project sources

Descriptions were checked against the public repositories on 2026-09-09:

- [Flowboard](https://github.com/samuelreichert/flowboard)
- [Poupai](https://github.com/samuelreichert/poupai)
- [Pocket Clone](https://github.com/samuelreichert/pocket-clone)
- [Spotify Playlists](https://github.com/samuelreichert/spotify-playlists-app)

Employment history and contact details are based on the existing portfolio content.
