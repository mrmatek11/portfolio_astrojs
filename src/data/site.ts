// Wszystkie treści strony w jednym miejscu.
// Pola w [NAWIASACH] to placeholdery do uzupełnienia.

export const site = {
  name: 'WIRKUS',
  fullName: 'Mateusz Wirkus',
  tagline: 'SUROWA FORMA. PRECYZYJNE WYKONANIE.',
  description:
    'Mateusz Wirkus, front-end developer z Torunia. Strony od projektu w Figmie po wdrożenie, przebudowy na WordPress i PrestaShop, SEO techniczne.',
  role: 'FRONT-END DEVELOPER',
  jobTitle: 'Front-end Developer',
  location: 'TORUŃ · ZDALNIE',
  status: 'ZAMKNIĘTY NA PROJEKTY',
  // false = status "zamknięty" (wygaszona kropka bez pulsowania).
  openForWork: false,
  // Sekcja projektów ukryta (nawigacja, karuzela, /projekty). Zmień na true, gdy dodasz realizacje.
  showProjects: false,
  email: 'mateuszwirkus1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/wirkusm/',
  github: 'https://github.com/mrmatek11',
  // Wersja do druku / PDF generowana ze strony /cv.
  cv: '/cv',
  lastUpdate: '10.2026',
  accent: '#c8b89a',
};

export const about = {
  lead: 'Robię strony od projektu do wdrożenia. W agencji przebudowałem ich kilkaset.',
  body: 'Front-end developer, prawie 4 lata komercyjnie. Projektuję w Figmie, koduję mobile-first w HTML, SCSS i JavaScript, pracuję w React i Next.js. Ogarniam też domeny, serwery, certyfikaty i SEO, więc stronę oddaję działającą, a nie tylko zakodowaną.',
};

// Kronika: historia zawodowa w rozdziałach (strona "O mnie").
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
    years: '2018–2022',
    place: 'Bytów',
    title: 'Technikum',
    role: 'Technik informatyk, ZSP Bytów',
    story:
      'Sieci, systemy operacyjne, bazy danych i pierwsze strony pisane od zera w notatniku. Tu złapałem, że strona to nie tylko to, co widać w przeglądarce.',
    points: ['Kwalifikacje INF.02 i INF.03', 'Sieci, grafika, bazy danych, pierwsze strony WWW'],
  },
  {
    numeral: 'II',
    years: '2022–2024',
    place: 'Bytów',
    title: 'Pierwsza praca',
    role: 'Front-end Developer i Administrator IT, Szkolenia Ekspert',
    story:
      'Dwie role naraz. Landing page sprzedażowe i newslettery HTML, a obok certyfikaty SSL, aktualizacje i backupy. Od początku robiłem i kod, i to, na czym on stoi.',
    points: [
      'Strony i landing page sprzedażowe (HTML5, CSS3, Bootstrap)',
      'Newslettery HTML i kampanie mailingowe',
      'Zmiany i poprawki na stronie firmowej w CMS Typo3',
      'Certyfikaty SSL, aktualizacje i backupy',
    ],
  },
  {
    numeral: 'III',
    years: '2024–dziś',
    place: 'Zdalnie',
    title: 'Freelance',
    role: 'Freelance Web Developer, Interpaste.dev',
    story:
      'Własni klienci. Zbieram wymagania, wyceniam, wdrażam w terminie, prowadzę kilka zleceń naraz. Domena, VPS, SSL i backupy są po mojej stronie.',
    points: [
      'Strony w Next.js, WordPress i Laravel; Next.js wdrażany na Vercel',
      'Domeny, serwery VPS (Apache / Nginx, cPanel), SSL/TLS, backupy',
      'Hardening i aktualizacje wdrożonych stron WordPress',
    ],
  },
  {
    numeral: 'IV',
    years: '2025–dziś',
    place: 'WSKZ',
    title: 'Cyberbezpieczeństwo',
    role: 'Studia licencjackie, WSKZ',
    story:
      'Stawiam serwery i zabezpieczam strony, więc chcę rozumieć, jak się je atakuje. Studiuję cyberbezpieczeństwo, w 2026 zrobiłem certyfikat Google.',
    points: ['Cyberbezpieczeństwo, studia licencjackie (WSKZ)', 'Google Foundations of Cybersecurity (2026)'],
  },
  {
    numeral: 'V',
    years: '2026–dziś',
    place: 'Toruń',
    title: 'Agencja',
    role: 'Web Developer / Webmaster, Pikseo',
    story:
      'Zespół web i SEO. 15–20 stron od zera, od makiety w Figmie po wdrożenie, i 500–600 istniejących przebudowanych albo poprawionych na WordPressie, PrestaShopie, Shopify i Shoperze. Do tego SEO, PageSpeed, własne wtyczki i motywy.',
    points: [
      '15–20 stron od zera: Figma, mobile-first (HTML, SCSS, JS), wdrożenie',
      '500–600 przebudowanych lub zmodyfikowanych stron na różnych CMS, praca na ticketach',
      'Monitoring, diagnoza i naprawa błędów w kodzie, motywach i wtyczkach',
      'SEO i PageSpeed; Google Search Console, Tag Manager, GA4',
      'Własne wtyczki, motywy i funkcje na zamówienie (PHP, JavaScript)',
    ],
  },
];

// Doświadczenie w skrócie (CV, dane strukturalne).
export const experience = [
  {
    period: '02.2026 – OBECNIE',
    role: 'Web Developer / Webmaster',
    company: 'Pikseo',
    location: 'Toruń',
    note: 'Zespół web i SEO w agencji, projekty marketingowe dla klientów.',
    points: chronicle[4].points.concat('Praca z Claude Code; automatyzacja powtarzalnych zadań skryptami Python'),
  },
  {
    period: '08.2024 – OBECNIE',
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
    period: '12.2022 – 07.2024',
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
  { school: 'Cyberbezpieczeństwo, studia licencjackie', place: 'Wyższa Szkoła Kształcenia Zawodowego (WSKZ)', period: '10.2025 – OBECNIE' },
  { school: 'Technik informatyk (INF.02, INF.03)', place: 'Zespół Szkół Ponadpodstawowych, Bytów', period: '2018–2022' },
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
