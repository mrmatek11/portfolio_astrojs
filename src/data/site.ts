// Wszystkie treści strony w jednym miejscu.
// Pola w [NAWIASACH] to placeholdery do uzupełnienia.

export const site = {
  name: 'WIRKUS',
  fullName: 'Mateusz Wirkus',
  tagline: 'SUROWA FORMA. PRECYZYJNE WYKONANIE.',
  description:
    'Mateusz Wirkus — webmaster, SEO i web developer. Strony internetowe, sklepy i optymalizacja pod wyszukiwarki.',
  role: 'WEBMASTER · SEO · WEB DEV',
  location: 'TORUŃ, POLSKA',
  status: 'OTWARTY NA PROJEKTY',
  email: '[TWÓJ@EMAIL.PL]',
  linkedin: 'https://www.linkedin.com/in/wirkusm/',
  // Wrzuć plik do public/cv.pdf i zostaw tę ścieżkę.
  cv: '/cv.pdf',
  lastUpdate: '09.2026',
  accent: '#c8b89a',
};

export const about = {
  lead: 'Tworzę, utrzymuję i pozycjonuję strony internetowe — od firmowych wizytówek po sklepy e‑commerce.',
  body: 'Na co dzień pracuję w dziale SEO w Pikseo i realizuję strony dla firmy oraz klientów. Łączę zaplecze administratora IT z pracą developera, a obecnie rozwijam się w kierunku cyberbezpieczeństwa.',
};

export const experience = [
  { period: '2026 — OBECNIE', role: 'Webmaster / SEO', company: 'Pikseo · Toruń' },
  { period: '2024 — 2026', role: 'Web Developer', company: 'interpaste.dev · freelance' },
  { period: '2022 — 2024', role: 'IT Specialist', company: 'Ekspert Roman Podłużny · Bytów' },
];

export const skills = [
  'SEO',
  'WordPress',
  'PrestaShop',
  'Shoper',
  'Joomla',
  'PHP',
  'Next.js',
  'React',
  'Astro',
  'HTML / CSS',
  'Cybersecurity',
  'SIEM',
  'Sieci komputerowe',
  'Wsparcie IT',
];

export const education = [
  { school: 'WSKZ — Cyberbezpieczeństwo (lic.)', period: '2025 — OBECNIE' },
  { school: 'ZSP Bytów — Technik informatyk', period: '2017 — 2022' },
];

export const certificates = [
  { name: 'Foundations of Cybersecurity — Google', year: '2026' },
  { name: 'Specjalista sieci i systemów operacyjnych', year: '2022' },
];

export const languages = 'POLSKI · ANGIELSKI [POZIOM]';

export const recommendation = {
  quote:
    'Consistently impressed me with his strong technical skills and dedication to our team’s success. A reliable and knowledgeable professional.',
  author: 'Szkolenia Ekspert',
};

// Glify rysowane w "kamieniu" — każdy projekt dostaje jeden kształt.
const glyphs = [
  'M25 35 L55 105 L70 60 L85 105 L115 35',
  'M20 70 A50 50 0 1 1 120 70 A50 50 0 1 1 20 70 M70 40 V100',
  'M30 110 L70 30 L110 110 M48 76 H92',
  'M70 20 V120 M30 50 L110 90 M110 50 L30 90',
  'M25 110 Q70 10 115 110 M45 110 V84 M95 110 V84',
  'M40 30 L100 70 L40 110 M100 30 V110',
];

export type Project = {
  name: string;
  category: string;
  year: string;
  url?: string;
  featured?: boolean;
  glyph: string;
};

export const categories = ['STRONY WWW', 'E-COMMERCE', 'SEO'];

export const projects: Project[] = [
  { name: '[NAZWA PROJEKTU 01]', category: 'STRONY WWW', year: '[ROK]', featured: true, glyph: glyphs[0] },
  { name: '[NAZWA PROJEKTU 02]', category: 'E-COMMERCE', year: '[ROK]', featured: true, glyph: glyphs[1] },
  { name: '[NAZWA PROJEKTU 03]', category: 'SEO', year: '[ROK]', featured: true, glyph: glyphs[2] },
  { name: '[NAZWA PROJEKTU 04]', category: 'STRONY WWW', year: '[ROK]', glyph: glyphs[3] },
  { name: '[NAZWA PROJEKTU 05]', category: 'E-COMMERCE', year: '[ROK]', glyph: glyphs[4] },
  { name: '[NAZWA PROJEKTU 06]', category: 'SEO', year: '[ROK]', glyph: glyphs[5] },
];
