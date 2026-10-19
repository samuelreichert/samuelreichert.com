import type { Locale } from "../i18n/config";

type PreferenceKey = "sr-language" | "sr-theme";

export function currentLocale(): Locale {
  return document.documentElement.lang.startsWith("pt") ? "pt" : "en";
}

export function readPreference(key: PreferenceKey): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function savePreference(key: PreferenceKey, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The current page remains usable when the browser blocks persistent storage.
  }
}
