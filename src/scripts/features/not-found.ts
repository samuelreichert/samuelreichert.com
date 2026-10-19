import {
  copy,
  isLocale,
  isPage,
  localizedPath,
  preferredLocale,
} from "../../i18n";
import { readPreference } from "../browser";

export function localizeNotFound(): void {
  const title = document.querySelector("[data-not-found-title]");
  if (!title) return;

  // Static hosting serves one 404 document, including for unknown localized URLs.
  const requestedLocale = location.pathname.split("/")[1];
  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : preferredLocale(readPreference("sr-language"), navigator.languages);
  const messages = copy[locale];
  document.documentElement.lang = messages.locale;
  title.textContent = messages.notFound;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", messages.notFoundBody);

  const body = document.querySelector("[data-not-found-body]");
  if (body) body.textContent = messages.notFoundBody;
  const home = document.querySelector<HTMLAnchorElement>(
    "[data-not-found-home]",
  );
  if (home) {
    home.textContent = messages.backHome;
    home.href = localizedPath(locale);
  }

  document.querySelectorAll<HTMLAnchorElement>(".nav a").forEach((link) => {
    const page = link.pathname.split("/").pop() ?? "";
    if (!isPage(page)) return;
    link.href = localizedPath(locale, page);
    link.textContent = messages.nav[page];
  });
  const brand = document.querySelector<HTMLAnchorElement>(".brand");
  if (brand) {
    brand.href = localizedPath(locale);
    brand.setAttribute("aria-label", `Samuel Reichert · ${messages.nav[""]}`);
  }

  const role = document.querySelector(".brand-name span");
  if (role) role.textContent = messages.role;
  const skip = document.querySelector(".skip-link");
  if (skip) skip.textContent = messages.skip;
  document
    .querySelector(".nav")
    ?.setAttribute("aria-label", messages.navigation);
  document
    .querySelector(".language-switch")
    ?.setAttribute("aria-label", messages.language);
  const footerNote = document.querySelector(".site-footer p");
  if (footerNote) footerNote.textContent = messages.footerNote;
  document
    .querySelector(".back-top")
    ?.setAttribute("aria-label", messages.backTop);
}
