# Wirkus — Portfolio

Portfolio w [Astro](https://astro.build), statyczny build pod darmowy plan Vercel.

## Uruchomienie

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # wynik w dist/
npm run preview
```

## Gdzie co zmieniać

Wszystkie treści są w **`src/data/site.ts`** — pola w `[NAWIASACH]` to placeholdery:

- `projects` — nazwy, kategorie, lata i opcjonalny `url` projektów (`featured: true` = karuzela na stronie głównej),
- `languages`, `about`, `skills`, `experience` itd.

CV: strona `/cv` generowana z tych samych danych — przycisk „POBIERZ PDF” otwiera druk (Zapisz jako PDF) w jasnym układzie A4.

Kronika na stronie „O mnie” (`chronicle` w `site.ts`) — historia w rozdziałach; każdy rozdział ma tytuł, rolę, krótką historię i punkty.

Adres strony: brany automatycznie z Vercela (`VERCEL_PROJECT_PRODUCTION_URL`). Po podpięciu własnej domeny dodaj w Vercelu zmienną środowiskową `SITE_URL`, np. `https://twojadomena.pl`.

## Tło 3D

Kamienny dysk na stronie głównej (`src/scripts/stone-disc.ts`) jest w pełni proceduralny — bez modeli i tekstur do pobrania:

- mapa wysokości (pierścienie, runy, glify projektów, rysy, pęknięcia) rysowana na canvasie przy starcie,
- siatka biegunowa z displacementem + bump map, światło podąża za kursorem,
- three.js ładowany leniwie (`requestIdleCallback`), osobny chunk ~130 KB gzip,
- limit DPR 1.5 i automatyczne obniżanie rozdzielczości przy słabych klatkach,
- pauza w tle karty, statyczna klatka przy `prefers-reduced-motion`,
- brak WebGL / tryb oszczędzania danych → zostaje lekkie tło SVG.

Glify w tarczy pochodzą z `projects[].glyph` w `site.ts`. Podgląd czasów generowania: `/?debug` (konsola).

## Struktura

```
src/
  data/site.ts            treści
  layouts/Base.astro      <head>, nagłówek, intro
  components/             Header, Intro, StoneBackground, GlyphTile, Logo, StoneFilters
  scripts/                stone-disc.ts (3D)
  pages/                  /, /projekty, /o-mnie (kronika), /cv, /polityka-prywatnosci, 404
  styles/global.css       tokeny kolorów, fonty, wspólne klasy
```

## Deploy na Vercel

1. Vercel → **Add New… → Project** → wybierz to repozytorium.
2. Framework Preset: **Astro** (wykrywany automatycznie), reszta domyślnie.
3. **Deploy**. Każdy push na `main` publikuje nową wersję, push na inne branche tworzy podgląd.
