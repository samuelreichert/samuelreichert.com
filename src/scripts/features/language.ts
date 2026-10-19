import { isLocale, localizedPath, pageFromPath } from "../../i18n/config";
import { currentLocale, savePreference } from "../browser";

export function syncLanguageLinks(): void {
  const page = pageFromPath(location.pathname);
  const locale = currentLocale();
  document
    .querySelectorAll<HTMLAnchorElement>("[data-language]")
    .forEach((link) => {
      const targetLocale = link.dataset.language;
      if (!isLocale(targetLocale)) return;
      link.href = localizedPath(targetLocale, page);
      if (targetLocale === locale) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
}

export function setupLanguageSwitcher(): void {
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("[data-language]");
    if (!link || !isLocale(link.dataset.language)) return;
    savePreference("sr-language", link.dataset.language);
    link.href = `${link.pathname}${location.search}${location.hash}`;
  });
}
