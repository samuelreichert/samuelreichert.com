import { setupTheme, syncTheme } from "./features/theme";
import { setupNavigation, syncNavigation } from "./features/navigation";
import { setupLanguageSwitcher, syncLanguageLinks } from "./features/language";
import { setupClipboard, resetClipboardFeedback } from "./features/clipboard";
import { localizeNotFound } from "./features/not-found";

let siteInitialized = false;

function initSite(): void {
  if (!siteInitialized) {
    siteInitialized = true;
    setupTheme();
    setupNavigation();
    setupLanguageSwitcher();
    setupClipboard();
  }

  // The header persists across Astro navigations; synchronize it with each new page.
  document.documentElement.classList.add("has-js");
  localizeNotFound();
  syncTheme();
  syncNavigation();
  syncLanguageLinks();
  resetClipboardFeedback();
}

document.addEventListener("astro:page-load", initSite);
