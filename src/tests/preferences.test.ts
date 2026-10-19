import { describe, expect, it, vi } from "vitest";
import source from "../scripts/preferences.js?raw";
function run({
  path = "/",
  languages = ["en-US"],
  stored = null as string | null,
  theme = null as string | null,
  blocked = false,
  search = "",
  hash = "",
  prefersLight = false,
} = {}) {
  const replace = vi.fn();
  const root = document.createElement("html");
  const storage = {
    getItem: (key: string) => {
      if (blocked) throw new Error("Storage disabled");
      return key === "sr-language" ? stored : theme;
    },
  };
  const win = {
    location: { pathname: path, search, hash, replace },
    matchMedia: () => ({ matches: prefersLight }),
  };
  new Function("window", "document", "navigator", "localStorage", source)(
    win,
    { documentElement: root },
    { languages, language: languages[0] || "en" },
    storage,
  );
  return { replace, root };
}
describe("first-visit language selection", () => {
  it.each([
    [["pt-BR"], "/pt"],
    [["pt-PT"], "/pt"],
    [["en-US"], "/en"],
    [["fr-FR", "pt-BR", "en"], "/pt"],
    [["fr-FR", "en", "pt"], "/en"],
    [["nl-NL"], "/en"],
    [[], "/en"],
  ])("uses supported browser preference %j", (languages, expected) => {
    expect(run({ languages }).replace).toHaveBeenCalledWith(expected);
  });
  it("prioritizes an explicit stored choice", () => {
    expect(
      run({ languages: ["pt-BR"], stored: "en" }).replace,
    ).toHaveBeenCalledWith("/en");
  });
  it("ignores an invalid stored value", () => {
    expect(
      run({ languages: ["pt-BR"], stored: "fr" }).replace,
    ).toHaveBeenCalledWith("/pt");
  });
  it("works when storage is blocked", () => {
    expect(
      run({ languages: ["pt-BR"], blocked: true }).replace,
    ).toHaveBeenCalledWith("/pt");
  });
  it("preserves legacy paths, queries, and fragments", () => {
    expect(
      run({
        path: "/experience/",
        languages: ["pt"],
        search: "?from=cv",
        hash: "#contact",
      }).replace,
    ).toHaveBeenCalledWith("/pt/experience?from=cv#contact");
  });
  it.each([
    "/pt",
    "/en",
    "/pt/projects",
    "/en/about/",
    "/unknown",
    "/pt/missing",
  ])("does not redirect explicit or unknown route %s", (path) => {
    expect(
      run({ path, stored: "en", languages: ["pt"] }).replace,
    ).not.toHaveBeenCalled();
  });
});
describe("first-paint appearance", () => {
  it("defaults to the dark design", () =>
    expect(run().root.classList.contains("light-mode")).toBe(false));
  it("honors the saved dark theme", () =>
    expect(run({ theme: "dark" }).root.classList.contains("light-mode")).toBe(
      false,
    ));
  it("supports the system preference", () => {
    const { root } = run({ theme: "system", prefersLight: true });
    expect(root.dataset.theme).toBe("system");
    expect(root.classList.contains("light-mode")).toBe(true);
  });
});
