(function () {
  const root = document.documentElement;

  // ---------- Theme ----------
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      root.classList.toggle("light-mode");
      const mode = root.classList.contains("light-mode") ? "light" : "dark";
      localStorage.setItem("sr-theme", mode);
      toggle.setAttribute("aria-label",
        mode === "light" ? "Switch to dark mode" : "Switch to light mode");
    });
  }

  // ---------- Header opacity on scroll ----------
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Mobile nav ----------
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      const open = nav.classList.contains("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ---------- Staggered reveal on scroll ----------
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

  // Trigger immediate reveal for above-the-fold elements
  document.querySelectorAll(".reveal-eager").forEach((el, i) => {
    (el as HTMLElement).style.setProperty("--reveal-delay", `${i * 90}ms`);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
  });
})();
