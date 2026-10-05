// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adres strony (linki kanoniczne, sitemapa, robots.txt):
// SITE_URL jeśli ustawisz go w Vercelu (np. po podpięciu własnej domeny),
// inaczej produkcyjny adres projektu, który Vercel podaje sam przy buildzie.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

// Statyczny build — Vercel wykrywa Astro automatycznie, adapter nie jest potrzebny.
export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/projekty') })],
  // Podstrony pobierane w tle po najechaniu na link — przejścia są natychmiastowe.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    // Moduł 3D (three.js) jest ładowany leniwie, osobnym chunkiem.
    build: { chunkSizeWarningLimit: 700 },
  },
});
