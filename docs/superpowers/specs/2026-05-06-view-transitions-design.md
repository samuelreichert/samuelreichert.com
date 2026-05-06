# View Transitions Design

**Date:** 2026-05-06
**Status:** Approved

## Overview

Add Astro View Transitions (sequential fade + drift) to samuelreichert.com. `ClientRouter` is already imported. This spec covers the animation behaviour, script re-initialization, and exact file changes required.

## Animation Behaviour

### Exit (`::view-transition-old(root)`)
- `opacity`: 1 → 0
- `transform`: `translateY(0)` → `translateY(-12px)`
- Duration: 400ms
- Easing: `--ease-in-out` (`cubic-bezier(.65,.05,.25,1)`)

### Enter (`::view-transition-new(root)`)
- `opacity`: 0 → 1
- `transform`: `translateY(12px)` → `translateY(0)`
- Duration: 550ms
- Easing: `--ease-out` (`cubic-bezier(.2,.7,.2,1)`)
- Delay: 380ms (enter begins just as exit finishes — sequential, not overlap)

### Feel
Exhale → brief pause → inhale. Matches the existing `.reveal` animation DNA (same `translateY` + opacity pattern, same easing tokens). Total perceived duration ~930ms.

## Header Persistence

`transition:persist` on the `<header>` element in `BaseLayout.astro`. The sticky blurred header with gold underline survives navigation unchanged — no flash, no re-render.

## Reduced Motion

`base.css` already has:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}
```
This covers `::view-transition-*` animations automatically. No additional work needed.

## Script Re-initialization

`site.ts` runs once on first page load. After client-side navigation, `astro:page-load` fires but the script does not re-run, breaking:
- Reveal animations (IntersectionObserver not re-attached)
- Scroll handler (`.scrolled` class on header)
- Mobile nav toggle
- Theme toggle click binding

Fix: extract all logic into `initSite()`, call it on both `DOMContentLoaded` and `astro:page-load`.

The inline theme script in `BaseLayout.astro` `<head>` reads `localStorage` on every navigation — no change needed.

## Files Changed

| File | Change |
|---|---|
| `src/layouts/BaseLayout.astro` | Add `transition:persist` to `<header>`, add `<style>` block with `::view-transition-*` rules and `@keyframes` |
| `src/scripts/site.ts` | Wrap all logic in `initSite()`, add `document.addEventListener('astro:page-load', initSite)` |
| `src/styles/global.css` | No change — transition CSS lives in BaseLayout to keep it co-located with `ClientRouter` |

No new files. No changes to page content or components.

## Out of Scope

- Named element morphing (`transition:name`) — fragile when elements differ across pages
- Gold curtain / custom overlay — saved for a future enhancement
- Per-page transition variants — all pages use the same animation
