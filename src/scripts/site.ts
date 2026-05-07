let siteInitialized = false;
let revealObserver: IntersectionObserver | null = null;

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
  const navEl = document.querySelector(".nav");
  const navToggleEl = document.querySelector(".nav-toggle");
  if (navEl) navEl.classList.remove("open");
  if (navToggleEl) navToggleEl.setAttribute("aria-expanded", "false");

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
}

document.addEventListener("astro:page-load", initSite);
