# Style Organization Rules

These rules apply to all UI work in this project.

## No Inline Styles

- Do not use inline `style` attributes in Astro, React, or HTML markup.
- Put all visual styling in CSS files.
- If a dynamic value is unavoidable, prefer a class, data attribute, CSS custom property set at a narrow boundary, or an existing component API before considering inline styles.

## No Styles In Astro Pages

- Do not add `<style>` blocks to `.astro` pages or components.
- Page styles must live in separate files under `src/styles/`.
- Import the relevant stylesheet from the page or layout.
- Keep Astro files focused on structure, content, and component composition.

## Global CSS Versus Page CSS

- Global CSS is for resets, defaults, design tokens consumption, and reusable primitives shared across pages.
- Shared CSS belongs in `src/styles/base.css` or another clearly named global stylesheet imported by the layout.
- Page CSS is for page-specific layout, composition, and visuals only.
- Keep page CSS as small as possible by reusing shared classes and CSS custom properties.
- If two or more pages need the same styling pattern, promote it to shared CSS instead of duplicating it.
- Prefer configurable shared classes using CSS custom properties, for example `--section-head-size`, over page-specific selector overrides.

## Current Shared Style Flow

- `src/styles/tokens.css`: design tokens only.
- `src/styles/base.css`: resets, typography defaults, layout primitives, shared components, buttons, cards, tags, page hero styles, and shared animation helpers.
- `src/styles/<page>.css`: only styles unique to that page.

Before adding new page CSS, check whether an existing shared primitive already solves the problem.
