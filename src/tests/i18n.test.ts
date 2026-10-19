import { describe, expect, it } from "vitest";
import {
  copy,
  formatDate,
  locales,
  pages,
  localizedPath,
  pageFromPath,
  preferredLocale,
} from "../i18n";

it("provides matching translation keys and navigation in both languages", () => {
  expect(Object.keys(copy.en).sort()).toEqual(Object.keys(copy.pt).sort());
  for (const locale of locales)
    for (const page of pages) expect(copy[locale].nav[page]).toBeTruthy();
});
it("formats experience dates without a timezone-dependent month shift", () => {
  expect(formatDate("2023-04", "en")).toBe("Apr 2023");
  expect(formatDate("2023-04", "pt")).toContain("abr");
  expect(formatDate("Present", "pt")).toBe("Atual");
});

describe("localized routing", () => {
  it.each([
    ["/", ""],
    ["/pt", ""],
    ["/en/projects/", "projects"],
    ["/pt/experience", "experience"],
    ["/contact", "contact"],
    ["/pt/unknown", ""],
  ] as const)("resolves the page in %s", (path, expected) => {
    expect(pageFromPath(path)).toBe(expected);
  });

  it("round-trips every supported page in both languages", () => {
    for (const locale of locales) {
      for (const page of pages) {
        expect(pageFromPath(localizedPath(locale, page))).toBe(page);
      }
    }
  });
});

describe("locale preference resolution", () => {
  it.each([
    ["en", ["pt-BR"], "en"],
    ["pt", ["en-GB"], "pt"],
    ["invalid", ["nl-NL", "PT-BR", "en"], "pt"],
    [null, ["en-GB", "pt-BR"], "en"],
    [null, ["nl-NL"], "en"],
    [undefined, [], "en"],
  ] as const)(
    "resolves %s with browser languages %j",
    (stored, languages, expected) => {
      expect(preferredLocale(stored, languages)).toBe(expected);
    },
  );
});
