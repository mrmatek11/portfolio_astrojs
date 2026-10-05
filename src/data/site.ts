// Wszystkie treści strony w jednym miejscu.
// Pola w [NAWIASACH] to placeholdery do uzupełnienia.

export const site = {
  name: 'WIRKUS',
  fullName: 'Mateusz Wirkus',
  tagline: 'SUROWA FORMA. PRECYZYJNE WYKONANIE.',
  description:
    'Mateusz Wirkus — front-end developer z Torunia. Strony od projektu w Figmie po wdrożenie, przebudowy na WordPress i PrestaShop, SEO techniczne i PageSpeed.',
  role: 'FRONT-END DEVELOPER',
  jobTitle: 'Front-end Developer',
  location: 'TORUŃ · ZDALNIE',
  status: 'OTWARTY NA PROJEKTY',
  email: 'mateuszwirkus1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/wirkusm/',
  github: 'https://github.com/mrmatek11',
  // Wersja do druku / PDF generowana ze strony /cv.
  cv: '/cv',
  lastUpdate: '10.2026',
  accent: '#c8b89a',
};

export const about = {
  lead: 'Ponad 500 stron przeszło przez moje ręce. Część zbudowałem od zera, resztę rozebrałem i złożyłem lepiej.',
  body: 'Front-end developer z blisko 4-letnim doświadczeniem komercyjnym. Projektuję w Figmie, koduję mobile-first w HTML, SCSS i JavaScript, pracuję w React i Next.js, wdrażam na Vercel. Znam też drugą stronę — domeny, serwery, certyfikaty i SEO — więc strona nie kończy się u mnie na makiecie.',
};

// Liczby z CV — animowane na stronie "O mnie" (każda liczba w napisie odlicza od zera).
export const stats = [
  { value: '~4', unit: 'LATA', label: 'doświadczenia komercyjnego' },
  { value: '15–20', unit: 'STRON', label: 'zbudowanych od zera w agencji' },
  { value: '500–600', unit: 'STRON', label: 'przebudowanych lub poprawionych' },
  { value: '6', unit: 'CMS', label: 'w codziennej pracy' },
];

// Kronika — historia zawodowa opowiedziana rozdziałami (strona "O mnie").
export type Chapter = {
  numeral: string;
  years: string;
  place: string;
  title: string;
  role: string;
  story: string;
  points: string[];
  tags: string[];
  glyph: string;
};

export const chronicle: Chapter[] = [
  {
    numeral: 'I',
    years: '2018 — 2022',
    place: 'Bytów',
    title: 'Pierwsze nacięcia',
    role: 'Technik informatyk · ZSP Bytów',
    story:
      'Wszystko zaczęło się w technikum. Sieci, systemy operacyjne, bazy danych — i pierwsze strony pisane od pustego pliku. Tam nauczyłem się, że internet to nie tylko to, co widać w przeglądarce, ale też wszystko, co pracuje pod spodem.',
    points: ['Kwalifikacje INF.02 i INF.03', 'Projektowanie sieci, grafika, bazy danych i pierwsze strony WWW'],
    tags: ['HTML', 'CSS', 'Sieci', 'Systemy'],
    glyph: 'M30 110 L70 30 L110 110 M48 76 H92',
  },
  {
    numeral: 'II',
    years: '2022 — 2024',
    place: 'Bytów',
    title: 'Dwa fronty',
    role: 'Front-end Developer i Administrator IT · Szkolenia Ekspert',
    story:
      'Pierwsza praca od razu na dwóch frontach. Rano landing page sprzedażowy i newsletter HTML, po południu certyfikaty SSL, aktualizacje i backupy. Kod i infrastruktura od początku szły u mnie w parze.',
    points: [
      'Strony i landing page sprzedażowe (HTML5, CSS3, Bootstrap)',
      'Newslettery HTML i kampanie mailingowe',
      'Zmiany i poprawki na stronie firmowej w CMS Typo3',
      'Certyfikaty SSL, aktualizacje i backupy',
    ],
    tags: ['HTML5', 'CSS3', 'Bootstrap', 'Typo3', 'SSL'],
    glyph: 'M70 20 V120 M30 50 L110 90 M110 50 L30 90',
  },
  {
    numeral: 'III',
    years: '2024 — obecnie',
    place: 'Zdalnie',
    title: 'Własny warsztat',
    role: 'Freelance Web Developer · Interpaste.dev',
    story:
      'Potem własna marka i własni klienci. Zbieram wymagania, wyceniam, wdrażam w terminie i raportuję postępy — kilka zleceń naraz. Strona nie kończy się na kodzie: domena, VPS, SSL, backupy i zabezpieczenia też są po mojej stronie.',
    points: [
      'Strony w Next.js, WordPress i Laravel; projekty Next.js wdrażane na Vercel',
      'Domeny, serwery VPS (Apache / Nginx, cPanel), SSL/TLS, backupy',
      'Hardening i aktualizacje wdrożonych stron WordPress',
    ],
    tags: ['Next.js', 'React', 'Laravel', 'WordPress', 'Vercel', 'VPS'],
    glyph: 'M40 30 L100 70 L40 110 M100 30 V110',
  },
  {
    numeral: 'IV',
    years: '2025 — obecnie',
    place: 'WSKZ',
    title: 'Druga strona muru',
    role: 'Cyberbezpieczeństwo · studia licencjackie',
    story:
      'Skoro stawiam serwery i zabezpieczam strony, chcę rozumieć też tych, którzy próbują je przełamać. Studiuję cyberbezpieczeństwo, a w 2026 dorzuciłem certyfikat Google Foundations of Cybersecurity.',
    points: ['Studia licencjackie — Cyberbezpieczeństwo, WSKZ', 'Google — Foundations of Cybersecurity (2026)'],
    tags: ['Security', 'SIEM', 'Hardening'],
    glyph: 'M70 25 A45 45 0 1 0 70.1 25 M70 50 V90',
  },
  {
    numeral: 'V',
    years: '2026 — obecnie',
    place: 'Toruń',
    title: 'Skala',
    role: 'Web Developer / Webmaster · Pikseo',
    story:
      'Agencja to inna skala. 15–20 stron od zera — od makiety w Figmie po wdrożenie — i 500–600 istniejących, które przebudowałem albo poprawiłem na WordPressie, PrestaShopie, Shopify czy Shoperze. Do tego SEO, PageSpeed, własne wtyczki i motywy. Przy kodzie pracuję z Claude Code, a powtarzalne zadania oddaję skryptom w Pythonie.',
    points: [
      '15–20 stron od zera: Figma → mobile-first (HTML, SCSS, JS) → wdrożenie',
      '500–600 przebudowanych lub zmodyfikowanych stron na wielu CMS, praca na ticketach',
      'Monitoring, diagnoza i naprawa błędów w kodzie, motywach i wtyczkach',
      'SEO i PageSpeed; Google Search Console, Tag Manager, GA4',
      'Własne wtyczki, motywy i funkcje na zamówienie (PHP, JavaScript)',
    ],
    tags: ['Figma', 'SCSS', 'JavaScript', 'PHP', 'SEO', 'GA4', 'Python'],
    glyph: 'M25 35 L55 105 L70 60 L85 105 L115 35',
  },
];

// Doświadczenie w skrócie (CV, dane strukturalne).
export const experience = [
  {
    period: '02.2026 — OBECNIE',
    role: 'Web Developer / Webmaster',
    company: 'Pikseo',
    location: 'Toruń',
    note: 'Zespół web i SEO w agencji, projekty marketingowe dla klientów.',
    points: chronicle[4].points.concat('Praca z Claude Code; automatyzacja powtarzalnych zadań skryptami Python'),
  },
  {
    period: '08.2024 — OBECNIE',
    role: 'Freelance Web Developer',
    company: 'Interpaste.dev',
    location: 'Zdalnie',
    note: '',
    points: [
      'Strony w Next.js, WordPress i Laravel według wymagań klienta; projekty Next.js wdrażane na Vercel',
      'Kilka zleceń równolegle: wymagania, wycena, wdrożenie w terminie, raportowanie postępów',
      'Domeny, serwery VPS (Apache / Nginx, cPanel), certyfikaty SSL/TLS i backupy',
      'Zabezpieczanie stron WordPress: aktualizacje, hardening, dokumentacja zmian',
    ],
  },
  {
    period: '12.2022 — 07.2024',
    role: 'Front-end Developer i Administrator IT',
    company: 'Szkolenia Ekspert',
    location: 'Bytów',
    note: '',
    points: chronicle[1].points,
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

export const education = [
  { school: 'Cyberbezpieczeństwo, studia licencjackie', place: 'Wyższa Szkoła Kształcenia Zawodowego (WSKZ)', period: '10.2025 — OBECNIE' },
  { school: 'Technik informatyk (INF.02, INF.03)', place: 'Zespół Szkół Ponadpodstawowych, Bytów', period: '2018 — 2022' },
];

export const certificates = [{ name: 'Foundations of Cybersecurity', issuer: 'Google', year: '2026' }];

export const languages = [
  { name: 'Polski', level: 'ojczysty' },
  { name: 'Angielski', level: 'B2' },
];

export const recommendation = {
  quote:
    'Consistently impressed me with his strong technical skills and dedication to our team’s success. A reliable and knowledgeable professional.',
  author: 'Szkolenia Ekspert',
};

export const gdpr =
  'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).';

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
