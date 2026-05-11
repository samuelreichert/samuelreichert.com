let siteInitialized = false;
let revealObserver: IntersectionObserver | null = null;
let localTimeInterval: number | null = null;
let prefersLightQuery: MediaQueryList | null = null;

type ThemeMode = "dark" | "light" | "system";

const THEME_STORAGE_KEY = "sr-theme";
const THEME_LABELS: Record<ThemeMode, string> = {
  dark: "Switch to light mode",
  light: "Switch to system mode",
  system: "Switch to dark mode",
};

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "dark" || value === "light" || value === "system";
}

function getStoredTheme(): ThemeMode {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(storedTheme) ? storedTheme : "system";
  } catch {
    return "system";
  }
}

function getSystemPrefersLight(): boolean {
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;

  if (theme === "light") {
    root.classList.add("light-mode");
  } else if (theme === "system") {
    root.classList.toggle("light-mode", getSystemPrefersLight());
  } else {
    root.classList.remove("light-mode");
  }

  root.setAttribute("data-theme", theme);
}

function syncThemeToggle(theme: ThemeMode) {
  document.querySelectorAll(".theme-toggle").forEach((toggle) => {
    toggle.setAttribute("aria-label", THEME_LABELS[theme]);
  });
}

function getNextTheme(theme: ThemeMode): ThemeMode {
  if (theme === "dark") return "light";
  if (theme === "light") return "system";
  return "dark";
}

function storeTheme(theme: ThemeMode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Keep the visual theme working even if storage is unavailable.
  }
}

function syncLocalTime() {
  const localTime = document.getElementById("local-time");
  if (!localTime) return;
  const localTimeEl = localTime;

  function tick() {
    try {
      const time = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Amsterdam",
        hour: "2-digit",
        minute: "2-digit",
      });
      localTimeEl.textContent = `${time} local`;
    } catch {
      localTimeEl.textContent = "Amsterdam local";
    }
  }

  tick();
  localTimeInterval = window.setInterval(tick, 30 * 1000);
}

function setMobileNavOpen(open: boolean) {
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");

  nav?.classList.toggle("open", open);
  navToggle?.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const themeToggle = target.closest(".theme-toggle");
  if (themeToggle) {
    const next = getNextTheme(getStoredTheme());
    applyTheme(next);
    storeTheme(next);
    syncThemeToggle(next);
    return;
  }

  const navToggle = target.closest(".nav-toggle");
  if (navToggle) {
    const nav = document.querySelector(".nav");
    setMobileNavOpen(!nav?.classList.contains("open"));
    return;
  }

  if (target.closest(".nav-links a")) {
    setMobileNavOpen(false);
  }
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    setMobileNavOpen(false);
  }
}

function onScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  if (window.scrollY > 12) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}

function onBeforeSwap(event: Event) {
  const newDocument = (event as Event & { newDocument?: Document }).newDocument;
  if (!newDocument) return;

  const root = document.documentElement;
  const nextRoot = newDocument.documentElement;
  const theme = root.getAttribute("data-theme") ?? "system";

  nextRoot.setAttribute("data-theme", theme);
  nextRoot.classList.toggle("light-mode", root.classList.contains("light-mode"));
}

function initSite() {
  const selectedTheme = getStoredTheme();
  applyTheme(selectedTheme);
  syncThemeToggle(selectedTheme);

  // ---------- One-time setup (header persists across navigations) ----------
  if (!siteInitialized) {
    siteInitialized = true;

    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
    document.addEventListener("astro:before-swap", onBeforeSwap);

    prefersLightQuery = window.matchMedia("(prefers-color-scheme: light)");
    prefersLightQuery.addEventListener("change", (e) => {
      if (getStoredTheme() === "system") {
        document.documentElement.classList.toggle("light-mode", e.matches);
        document.documentElement.setAttribute("data-theme", "system");
        syncThemeToggle("system");
      }
    });

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Per-navigation setup ----------
  onScroll();

  if (localTimeInterval) {
    window.clearInterval(localTimeInterval);
    localTimeInterval = null;
  }

  // Close mobile nav on each navigation (header persists, state could be stale)
  setMobileNavOpen(false);

  // Update active nav link (header persists, aria-current won't update automatically)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = (link.getAttribute('href') ?? '').replace(/\/$/, '') || '/';
    if (href === currentPath) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // Disconnect previous reveal observer before re-attaching
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  // Staggered reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          revealObserver?.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => revealObserver!.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // Eager reveals (above the fold)
  document.querySelectorAll(".reveal-eager").forEach((el, i) => {
    (el as HTMLElement).style.setProperty("--reveal-delay", `${i * 90}ms`);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
  });

  syncLocalTime();
}

document.addEventListener("astro:page-load", initSite);
