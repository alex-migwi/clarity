// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://alex-migwi.github.io/clarity-docs',
  base: process.env.PUBLIC_BASE_PATH || '/clarity-docs/',
  integrations: [],
  markdown: {
    syntaxHighlight: {
      excludeLangs: ['mermaid'],
    },
    rehypePlugins: [
      [rehypeMermaid, {
        strategy: 'img-svg', 
      }],
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});