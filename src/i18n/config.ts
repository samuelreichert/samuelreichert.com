export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const pages = [
  "",
  "projects",
  "experience",
  "about",
  "contact",
] as const;
export type Page = (typeof pages)[number];

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "pt";
}

export function isPage(value: string): value is Page {
  return pages.some((page) => page === value);
}

export function localizedPath(locale: Locale, page: Page = "") {
  return `/${locale}${page ? `/${page}` : ""}`;
}

export function pageFromPath(pathname: string): Page {
  const [first, second = ""] = pathname.split("/").filter(Boolean);
  const page = isLocale(first) ? second : (first ?? "");
  return isPage(page) ? page : "";
}

export function preferredLocale(
  stored: unknown,
  languages: readonly string[],
): Locale {
  if (isLocale(stored)) return stored;
  for (const language of languages) {
    const locale = language.toLowerCase().split("-")[0];
    if (isLocale(locale)) return locale;
  }
  return "en";
}

export function formatDate(date: string, locale: Locale) {
  if (date === "Present") return locale === "pt" ? "Atual" : "Present";
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}-01T12:00:00Z`));
}
