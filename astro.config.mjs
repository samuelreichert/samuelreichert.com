// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://samuelreichert.com',
  integrations: [react(), sitemap()],
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'always',
  },
});
