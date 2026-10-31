// Wszystkie treści strony w jednym miejscu.
// Pola w [NAWIASACH] to placeholdery do uzupełnienia.

export const site = {
  name: 'MONOLIT',
  fullName: 'Monolit',
  tagline: 'SUROWA FORMA. PRECYZYJNE WYKONANIE.',
  description:
    'Front-end developer. Strony od projektu w Figmie po wdrożenie, przebudowy na WordPress i PrestaShop, SEO techniczne.',
  role: 'FRONT-END DEVELOPER',
  jobTitle: 'Front-end Developer',
  location: 'ZDALNIE',
  status: 'ZAMKNIĘTY NA PROJEKTY',
  // false = status "zamknięty" (wygaszona kropka bez pulsowania).
  openForWork: false,
  // Sekcja projektów ukryta (nawigacja, karuzela, /projekty). Zmień na true, gdy dodasz realizacje.
  showProjects: false,
  lastUpdate: '10.2026',
  accent: '#c8b89a',
};

export const about = {
  lead: 'Surowa forma. Precyzyjne wykonanie.',
  body: 'Strony budowane od projektu do wdrożenia: mobile-first, szybkie, bezpieczne i łatwe w utrzymaniu.',
};

// Zasady pracy w rozdziałach (strona "O mnie").
export type Chapter = {
  numeral: string;
  years: string;
  place: string;
  title: string;
  role: string;
  story: string;
  points: string[];
};

export const chronicle: Chapter[] = [
  {
    numeral: 'I',
    years: 'ETAP 1',
    place: 'Projekt',
    title: 'Makieta',
    role: 'Figma, mobile-first',
    story: 'Zaczynam od struktury i treści, dopiero potem od ozdób.',
    points: ['Układ i siatka', 'Komponenty wielokrotnego użytku'],
  },
  {
    numeral: 'II',
    years: 'ETAP 2',
    place: 'Kod',
    title: 'Wykonanie',
    role: 'HTML, SCSS, JavaScript, React, Next.js',
    story: 'Czysty, szybki kod bez zbędnych zależności.',
    points: ['Dostępność i semantyka', 'PageSpeed i SEO techniczne'],
  },
  {
    numeral: 'III',
    years: 'ETAP 3',
    place: 'Wdrożenie',
    title: 'Publikacja',
    role: 'Vercel, VPS, SSL/TLS',
    story: 'Domena, serwer, certyfikat i kopie zapasowe — strona oddawana działająca.',
    points: ['Domeny i DNS', 'Backupy i aktualizacje'],
  },
];

export const skillGroups = [
  { name: 'Front-end', items: ['HTML5', 'CSS3', 'SCSS', 'JavaScript', 'RWD', 'mobile-first', 'Bootstrap'] },
  { name: 'Frameworki i narzędzia', items: ['React', 'Next.js', 'Laravel', 'Webpack', 'Git / GitHub'] },
  { name: 'Design', items: ['Figma'] },
  { name: 'Wdrożenia', items: ['Vercel', 'Domeny', 'VPS', 'Apache / Nginx', 'cPanel', 'SSL/TLS'] },
  { name: 'SEO i analityka', items: ['SEO techniczne', 'PageSpeed', 'Search Console', 'Tag Manager', 'GA4'] },
  { name: 'CMS', items: ['WordPress', 'PrestaShop', 'Shopify', 'Shoper', 'Joomla', 'Typo3'] },
  { name: 'Inne', items: ['PHP', 'Python', 'Bash', 'Claude Code'] },
];

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

export const categories = ['OD ZERA', 'PRZEBUDOWY', 'SEO'];

export const projects: Project[] = [
  { name: '[NAZWA PROJEKTU 01]', category: 'OD ZERA', year: '[ROK]', featured: true, glyph: glyphs[0] },
  { name: '[NAZWA PROJEKTU 02]', category: 'PRZEBUDOWY', year: '[ROK]', featured: true, glyph: glyphs[1] },
  { name: '[NAZWA PROJEKTU 03]', category: 'SEO', year: '[ROK]', featured: true, glyph: glyphs[2] },
  { name: '[NAZWA PROJEKTU 04]', category: 'OD ZERA', year: '[ROK]', glyph: glyphs[3] },
  { name: '[NAZWA PROJEKTU 05]', category: 'PRZEBUDOWY', year: '[ROK]', glyph: glyphs[4] },
  { name: '[NAZWA PROJEKTU 06]', category: 'SEO', year: '[ROK]', glyph: glyphs[5] },
];
