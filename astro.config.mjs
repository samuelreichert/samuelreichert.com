// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const siteUrl = process.env.PUBLIC_SITE_URL?.trim() || 'https://samuelreichert.com';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [react(), sitemap()],
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'always',
  },
});
