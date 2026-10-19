// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://samuelreichert.com",
  integrations: [
    sitemap({
      filter: (page) => /\/(en|pt)(\/|$)/.test(new URL(page).pathname),
      i18n: { defaultLocale: "en", locales: { en: "en", pt: "pt-BR" } },
    }),
  ],
  output: "static",
  adapter: vercel(),
  trailingSlash: "never",
  build: {
    inlineStylesheets: "auto",
  },
});
