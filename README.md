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

- `site.email` — adres e-mail w sekcji Kontakt,
- `projects` — nazwy, kategorie, lata i opcjonalny `url` projektów (`featured: true` = karuzela na stronie głównej),
- `languages`, `about`, `skills`, `experience` itd.

CV: wrzuć plik jako `public/cv.pdf`.

Domena: po podpięciu własnej domeny zmień `site` w `astro.config.mjs`.

## Struktura

```
src/
  data/site.ts            treści
  layouts/Base.astro      <head>, nagłówek, intro
  components/             Header, Intro, StoneBackground, GlyphTile, Logo, StoneFilters
  pages/                  /, /projekty, /o-mnie, /polityka-prywatnosci, 404
  styles/global.css       tokeny kolorów, fonty, wspólne klasy
```

## Deploy na Vercel

1. Vercel → **Add New… → Project** → wybierz to repozytorium.
2. Framework Preset: **Astro** (wykrywany automatycznie), reszta domyślnie.
3. **Deploy**. Każdy push na `main` publikuje nową wersję, push na inne branche tworzy podgląd.
