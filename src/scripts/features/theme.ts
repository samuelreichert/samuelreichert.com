import { copy } from "../../i18n";
import { currentLocale, savePreference } from "../browser";

type Theme = "light" | "dark" | "system";
const systemThemeQuery = "(prefers-color-scheme: light)";
const nextTheme = { light: "dark", dark: "system", system: "light" } as const;

function selectedTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "system" ? value : "dark";
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const isLight =
    theme === "light" ||
    (theme === "system" && window.matchMedia(systemThemeQuery).matches);
  root.dataset.theme = theme;
  root.classList.toggle("light-mode", isLight);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isLight ? "#f5f2ea" : "#0c0c0b");

  const messages = copy[currentLocale()];
  const label = `${messages.theme}: ${messages[nextTheme[theme]]}`;
  const button = document.querySelector<HTMLButtonElement>(".theme-toggle");
  button?.setAttribute("aria-label", label);
  button?.setAttribute("title", label);
}

export function syncTheme(): void {
  applyTheme(selectedTheme());
}

export function setupTheme(): void {
  document.addEventListener("click", (event) => {
    if (
      !(event.target instanceof Element) ||
      !event.target.closest(".theme-toggle")
    )
      return;
    const theme = nextTheme[selectedTheme()];
    applyTheme(theme);
    savePreference("sr-theme", theme);
  });

  window.matchMedia(systemThemeQuery).addEventListener("change", () => {
    if (selectedTheme() === "system") syncTheme();
  });

  document.addEventListener("astro:before-swap", (event) => {
    const nextDocument = (event as Event & { newDocument: Document })
      .newDocument;
    nextDocument.documentElement.dataset.theme = selectedTheme();
    nextDocument.documentElement.classList.toggle(
      "light-mode",
      document.documentElement.classList.contains("light-mode"),
    );
    nextDocument.documentElement.classList.add("has-js");
  });
}
