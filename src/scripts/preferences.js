// Runs before the first paint, even when the bundled site script is unavailable.
(() => {
  let language;
  let theme = "dark";
  try {
    language = localStorage.getItem("sr-language");
    const saved = localStorage.getItem("sr-theme");
    if (["light", "dark", "system"].includes(saved)) theme = saved;
  } catch {
    /* Browsing still works when storage is blocked. */
  }
  const root = document.documentElement;
  root.classList.add("has-js");
  const light =
    theme === "light" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: light)").matches);
  root.dataset.theme = theme;
  root.classList.toggle("light-mode", light);
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const entries = ["/", "/projects", "/experience", "/about", "/contact"];
  // Explicit localized links are shareable and keep their requested language.
  if (!entries.includes(path)) return;
  if (language !== "pt" && language !== "en") {
    language =
      (navigator.languages?.length ? navigator.languages : [navigator.language])
        .map((value) => value.toLowerCase().split("-")[0])
        .find((value) => value === "pt" || value === "en") || "en";
  }
  window.location.replace(
    `/${language}${path === "/" ? "" : path}${window.location.search}${window.location.hash}`,
  );
})();
