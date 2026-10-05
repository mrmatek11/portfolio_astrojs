import type { APIRoute } from 'astro';

// robots.txt z adresem sitemapy dopasowanym do aktualnego adresu strony.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
