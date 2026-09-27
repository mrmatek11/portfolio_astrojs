// @ts-check
import { defineConfig } from 'astro/config';

// Statyczny build — Vercel wykrywa Astro automatycznie, adapter nie jest potrzebny.
export default defineConfig({
  // Podmień na docelową domenę po podpięciu jej w Vercelu.
  site: 'https://wirkus.vercel.app',
  trailingSlash: 'ignore',
});
