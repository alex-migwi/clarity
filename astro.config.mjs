// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // Source from packages/core (monorepo structure)
  srcDir: './src',
  
  site: process.env.PUBLIC_SITE_URL || 'https://alex-migwi.github.io/clarity-docs',
  base: process.env.PUBLIC_BASE_PATH || '/clarity-docs/',
  output: 'server', // Use server mode for middleware to work
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [],
  markdown: {
    syntaxHighlight: 'shiki',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});