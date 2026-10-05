// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Statyczny build — Vercel wykrywa Astro automatycznie, adapter nie jest potrzebny.
export default defineConfig({
  // Podmień na docelową domenę po podpięciu jej w Vercelu.
  site: 'https://wirkus.vercel.app',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/projekty') })],
  // Podstrony pobierane w tle po najechaniu na link — przejścia są natychmiastowe.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    // Moduł 3D (three.js) jest ładowany leniwie, osobnym chunkiem.
    build: { chunkSizeWarningLimit: 700 },
  },
});
