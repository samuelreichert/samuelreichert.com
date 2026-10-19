import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = ["", "/projects", "/experience", "/about", "/contact"];
async function ready(page: Page) {
  await expect(page.locator("html")).toHaveClass(/has-js/);
}
test("detects pt-BR, keeps manual selection and the current page, and remembers it on a new visit", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "pt-BR" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/pt$/);
  await ready(page);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Experiência", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt\/experience$/);
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/experience$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", { name: "A decade of building." }),
  ).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL(/\/en\/experience$/);
  const state = await context.storageState();
  await context.close();
  const nextVisit = await browser.newContext({
    locale: "pt-BR",
    storageState: state,
  });
  const returning = await nextVisit.newPage();
  await returning.goto("/projects?source=cv#contact");
  await expect(returning).toHaveURL(/\/en\/projects\?source=cv#contact$/);
  await nextVisit.close();
});
test("keeps explicit localized links even when the browser prefers another language", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "en-US" });
  const page = await context.newPage();
  await page.goto("/pt/about");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Quem está por trás do código.",
  );
  await context.close();
});
test("language switching preserves query and fragment after client navigation", async ({
  page,
}) => {
  await page.goto("/en");
  await ready(page);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/projects$/);
  await page.evaluate(() =>
    history.replaceState({}, "", "?source=portfolio#contact"),
  );
  await page
    .getByRole("link", { name: "Português do Brasil", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt\/projects\?source=portfolio#contact$/);
});
test("mobile menu supports Escape, navigation, and an updated active link", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/pt");
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Abrir menu", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("navigation")).toBeHidden();
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Sobre", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt\/about$/);
  await expect(page.getByRole("navigation")).toBeHidden();
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Sobre", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});
test("theme survives navigation, language changes, and reloads", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("sr-theme"))
      localStorage.setItem("sr-theme", "light");
  });
  await page.goto("/en");
  await page
    .getByRole("button", { name: "Change color theme: Dark", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("html")).not.toHaveClass(/light-mode/);
  await page
    .getByRole("link", { name: "Português do Brasil", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt\/about$/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("button", {
      name: "Alterar tema de cores: Sistema",
      exact: true,
    })
    .click();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveClass(/light-mode/);
});
test("copy email reports success and provides a usable email link", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/pt/contact");
  await page
    .getByRole("button", { name: "Copiar endereço de e-mail", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("E-mail copiado");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "samuelreichertt@gmail.com",
  );
  await expect(
    page.getByRole("link", { name: "samuelreichertt@gmail.com" }),
  ).toHaveAttribute("href", "mailto:samuelreichertt@gmail.com");
});
test("clipboard failure is translated and leaves a working fallback", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("Denied")) },
    }),
  );
  await page.goto("/pt/contact");
  await page
    .getByRole("button", { name: "Copiar endereço de e-mail", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText(
    "Não foi possível copiar. Use o link de e-mail.",
  );
});
test("blocked browser storage still allows reading, language switching, and themes", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "pt-BR" });
  await context.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Blocked");
      },
    }),
  );
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/pt$/);
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);
  await page
    .getByRole("button", { name: "Change color theme: System", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
  await context.close();
});
for (const locale of ["en", "pt"]) {
  for (const width of [320, 390, 768, 1000, 1440]) {
    test(`${locale} pages fit ${width}px screens`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const route of routes) {
        await page.goto(`/${locale}${route}`);
        await ready(page);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () =>
              document.documentElement.scrollWidth <=
              document.documentElement.clientWidth,
          ),
          route,
        ).toBe(true);
        if (locale === "pt" && route === "" && [390, 1440].includes(width)) {
          await page.screenshot({
            path: test.info().outputPath("home.png"),
            animations: "disabled",
          });
        }
      }
      expect(errors).toEqual([]);
    });
  }
  test(`${locale} content and navigation work without JavaScript`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto(`/${locale}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation")).toBeVisible();
    await page.getByRole("navigation").getByRole("link").first().click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/projects$`));
    await expect(
      page.getByRole("heading", { name: "Flowboard", exact: true }),
    ).toBeVisible();
    await context.close();
  });
  for (const theme of ["light", "dark"]) {
    test(`${locale} ${theme} pages pass accessibility checks`, async ({
      page,
    }) => {
      await page.addInitScript(
        (value) => localStorage.setItem("sr-theme", value),
        theme,
      );
      await page.setViewportSize({ width: 390, height: 844 });
      for (const route of routes) {
        await page.goto(`/${locale}${route}`);
        await ready(page);
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(result.violations, `${locale}${route} ${theme}`).toEqual([]);
      }
    });
  }
  test(`${locale} pages publish their own metadata and alternate language links`, async ({
    page,
  }) => {
    for (const route of routes) {
      await page.goto(`/${locale}${route}`);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        locale === "pt" ? "pt-BR" : "en",
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://samuelreichert.com/${locale}${route}`,
      );
      await expect(page.locator('link[hreflang="pt-BR"]')).toHaveAttribute(
        "href",
        `https://samuelreichert.com/pt${route}`,
      );
    }
  });
}
test("reduced motion keeps all content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pt");
  await ready(page);
  expect(
    await page
      .getByRole("heading", { level: 1 })
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect(page.locator(".hero-copy")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-profile")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".portrait-orbits")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(
    page.getByRole("heading", { name: "Flowboard", exact: true }),
  ).toBeVisible();
});
test("keyboard users can skip navigation and reach the primary action", async ({
  page,
}) => {
  await page.goto("/pt");
  await ready(page);
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", {
    name: "Pular para o conteúdo",
    exact: true,
  });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.keyboard.press("Tab");
  const primaryAction = page
    .getByRole("link", { name: "Conheça meu trabalho", exact: true })
    .first();
  await expect(primaryAction).toBeFocused();
  await expect(primaryAction).toBeInViewport();
  await expect(primaryAction).toHaveCSS("outline-style", "solid");
  await expect(primaryAction).toHaveCSS("outline-width", "3px");
});
test("unknown Portuguese URLs have a translated 404 and recovery link", async ({
  page,
}) => {
  const response = await page.goto("/pt/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Página não encontrada.",
  );
  await page
    .getByRole("link", { name: "Voltar ao início", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt$/);
});
