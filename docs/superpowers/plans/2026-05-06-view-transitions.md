# View Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add sequential fade+drift Astro view transitions — content exits up+fades, pauses, enters from below+fades — with the sticky header persisting across navigations.

**Architecture:** `ClientRouter` is already imported in `BaseLayout.astro`. Two changes: (1) refactor `site.ts` to re-initialize per navigation via `astro:page-load`; (2) add `transition:persist` on `<Header>` and `::view-transition-*` CSS in `BaseLayout.astro`.

**Tech Stack:** Astro View Transitions (`astro:transitions`), CSS `@keyframes`, `::view-transition-old/new` pseudo-elements.

---

## File Map

| File | Change |
|---|---|
| `src/scripts/site.ts` | Extract IIFE into `initSite()`, split one-time setup from per-navigation setup, listen to `astro:page-load` |
| `src/layouts/BaseLayout.astro` | Add `transition:persist` to `<Header />`, add `<style is:global>` with `@keyframes` + `::view-transition-*` rules |

---

### Task 1: Refactor site.ts for per-navigation re-init

**Files:**
- Modify: `src/scripts/site.ts`

**Context:** Astro's `ClientRouter` does not re-execute already-imported modules on client-side navigation. The existing IIFE runs once and never again. After navigation, reveal animations, the scroll handler, and mobile nav all break. Fix: move everything into `initSite()`, call it on `astro:page-load` (which fires on initial load AND every subsequent navigation).

One-time setup (theme toggle, scroll handler, OS preference watcher) must be guarded with a flag — the header persists via `transition:persist` so its listeners would accumulate if re-attached every navigation.

- [ ] **Step 1: Replace site.ts content**

Replace the entire file with:

```typescript
let siteInitialized = false;

function initSite() {
  const root = document.documentElement;

  // ---------- One-time setup (header persists across navigations) ----------
  if (!siteInitialized) {
    siteInitialized = true;

    // Theme (dark → light → system → dark)
    function applyTheme(theme: string) {
      if (theme === "light") {
        root.classList.add("light-mode");
      } else if (theme === "system") {
        root.classList.toggle("light-mode", window.matchMedia("(prefers-color-scheme: light)").matches);
      } else {
        root.classList.remove("light-mode");
      }
      root.setAttribute("data-theme", theme);
    }

    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "system";
        const next = current === "dark" ? "light" : current === "light" ? "system" : "dark";
        applyTheme(next);
        localStorage.setItem("sr-theme", next);
        const labels: Record<string, string> = {
          dark: "Switch to light mode",
          light: "Switch to system mode",
          system: "Switch to dark mode",
        };
        toggle.setAttribute("aria-label", labels[next]);
      });
    }

    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
      if ((localStorage.getItem("sr-theme") || "system") === "system") {
        root.classList.toggle("light-mode", e.matches);
      }
    });

    // Header scroll opacity
    const header = document.querySelector(".site-header");
    if (header) {
      const onScroll = () => {
        if (window.scrollY > 12) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Mobile nav toggle
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    if (navToggle && nav) {
      navToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        const open = nav.classList.contains("open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  // ---------- Per-navigation setup ----------

  // Close mobile nav on each navigation (header persists, state could be stale)
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  if (nav) nav.classList.remove("open");
  if (navToggle) navToggle.setAttribute("aria-expanded", "false");

  // Staggered reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // Eager reveals (above the fold)
  document.querySelectorAll(".reveal-eager").forEach((el, i) => {
    (el as HTMLElement).style.setProperty("--reveal-delay", `${i * 90}ms`);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
  });
}

document.addEventListener("astro:page-load", initSite);
```

- [ ] **Step 2: Verify the build compiles**

```bash
cd /Users/sreichert/Projects/Samuel/web/samuelreichert.com && npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/scripts/site.ts
git commit -m "refactor: re-init site script on astro:page-load for view transitions"
```

---

### Task 2: Add transition:persist and view transition CSS

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

**Context:** `transition:persist` on `<Header />` keeps the sticky nav alive across navigations. The `::view-transition-old(root)` and `::view-transition-new(root)` pseudo-elements target the outgoing and incoming page snapshots respectively. The `is:global` style attribute is required — scoped styles don't apply to pseudo-elements.

Easing values match the design tokens:
- `--ease-out`: `cubic-bezier(.2,.7,.2,1)` — used on enter (decelerate into position)
- `--ease-in-out`: `cubic-bezier(.65,.05,.25,1)` — used on exit (accelerate out)

The 380ms delay on enter means it starts just before the 400ms exit finishes — a brief overlap that prevents a hard black gap while still feeling sequential.

- [ ] **Step 1: Add `transition:persist` to the Header component**

In `src/layouts/BaseLayout.astro`, change:

```astro
    <Header />
```

to:

```astro
    <Header transition:persist />
```

- [ ] **Step 2: Add view transition styles**

In `src/layouts/BaseLayout.astro`, add this block immediately before the closing `</html>` tag:

```astro
<style is:global>
  @keyframes vt-exit {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-12px); }
  }

  @keyframes vt-enter {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  ::view-transition-old(root) {
    animation: vt-exit 400ms cubic-bezier(.65,.05,.25,1) both;
  }

  ::view-transition-new(root) {
    animation: vt-enter 550ms cubic-bezier(.2,.7,.2,1) 380ms both;
  }
</style>
```

- [ ] **Step 3: Verify the build compiles**

```bash
cd /Users/sreichert/Projects/Samuel/web/samuelreichert.com && npm run build 2>&1 | tail -20
```

Expected: no errors, build succeeds.

- [ ] **Step 4: Start dev server and manually verify**

```bash
cd /Users/sreichert/Projects/Samuel/web/samuelreichert.com && npm run dev
```

Open `http://localhost:4321` and navigate between pages. Verify:
- Content fades out with upward drift on exit
- Brief pause, then content fades in from below
- Header stays fixed — no flash or re-render during navigation
- Mobile nav closes on each navigation
- Reveal animations fire fresh on each new page
- Theme toggle still works after navigating away and back

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add sequential fade+drift view transitions with persistent header"
```
