# Gleichstellung weltweit

Interaktive Scrollytelling-Website zum Thema internationale Geschlechtergerechtigkeit
(Schulprojekt Politik 12.2). Datenbasis: **WEF Global Gender Gap Report 2025**.

Erzählt einen roten Faden von der globalen Kernzahl über eine interaktive Weltkarte,
Vorbild- und Schlusslicht-Länder, Ursachen und Zeitstrahl bis zu Stimmen und Quellen.

## Stack

- [Astro 6](https://astro.build) (statisch/SSG) · TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`, Design-Tokens als `@theme` in `src/styles/global.css`)
- Fonts self-hosted via `@fontsource` (Playfair Display + Source Sans 3)
- Weltkarte: grobe SVG-Silhouette + antippbare Pins (Vanilla-JS-Insel), kein Leaflet
- Hosting: Netlify (`netlify.toml`)

## Entwicklung

```bash
npm install
npm run dev            # Dev-Server (localhost)
npm run dev -- --host  # im LAN/Tailscale erreichbar
npm run build          # statischer Build -> dist/
npm run check          # astro check (TypeScript-Diagnostik)
```

Voraussetzung: Node >= 22.12.0.

## Struktur (Kurzüberblick)

- `src/pages/index.astro` — komponiert alle Sektionen im roten Faden
- `src/components/sections/` — die 9 Sektionen
- `src/components/ui/` — geteilte UI-Primitives
- `src/data/` — alle Texte/Daten zentral (`placeholder.ts`, `sources.ts`, `tokens.ts`,
  `worldMap.ts` = generiert)
- `scripts/gen_map_svg.py` — erzeugt `src/data/worldMap.ts` aus `data/world.geo.json`

> Inhalte sind aktuell überwiegend Platzhalter; die ausformulierten Texte/Quellen
> werden zentral in `src/data/` eingepflegt. Architektur- und Konzeptdetails: siehe
> `CLAUDE.md` und `BUILD_SPEC.md`.
