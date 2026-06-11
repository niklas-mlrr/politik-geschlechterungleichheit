# BUILD_SPEC – Arbeitsanweisung für Section-Komponenten (Phase 1)

Dieses Dokument ist der **verbindliche Vertrag** für alle Section-Subagents.
Es beschreibt die geteilte API (Primitives, Daten, Tokens) und die Stil-Regeln.
Lies es vollständig, bevor du eine Sektion baust.

## Goldene Regeln (Konflikt-Vermeidung)

- Du baust **ausschließlich** die dir zugewiesenen Dateien in `src/components/sections/`.
- Du **änderst NICHTS** an: `package.json`, `astro.config.mjs`, `tsconfig.json`,
  `src/styles/global.css`, `src/layouts/`, `src/pages/`, `src/data/`, `src/components/ui/`.
- Daten und Primitives werden **nur importiert/konsumiert**, nie verändert.
- Fehlt dir ein Feature in einem Primitive: nutze einen Platzhalter oder lokales Markup,
  ändere NICHT das Primitive.
- Kein `npm install`, keine Config-Änderung.

## Tech-Kontext

- Astro 5 + Tailwind v4 (Utilities verfügbar) + scoped `<style>` in `.astro`-Dateien.
- **Statisches Gerüst**: KEIN Leaflet/Chart.js/GSAP einbauen. Interaktive Teile nur als
  `DataPlaceholder` (siehe unten). Native Interaktivität ohne JS (z. B. `<details>`) ist ok.
- TypeScript ist strict. `npm run check` muss fehlerfrei bleiben.

## Design-Tokens (Warm Humanist)

Als Tailwind-Utilities und CSS-Variablen verfügbar (Quelle: `src/styles/global.css`):

| Rolle | CSS-Var | Tailwind |
|-------|---------|----------|
| Seitenhintergrund (Sand) | `--color-sand` | `bg-sand` |
| Text (Ink) | `--color-ink` | `text-ink` |
| Subtext | `--color-subtext` | `text-subtext` |
| Card-Oberfläche | `--color-card` | `bg-card` |
| Karten-Wasser | `--color-ocean` | `bg-ocean` |
| Akzent Terrakotta | `--color-clay` | `bg-clay` / `text-clay` |
| Sekundär Ocker | `--color-ocker` | `text-ocker` |
| Akzent Salbei-Grün | `--color-sage` | `bg-sage` / `text-sage` |
| Display-Font | `--font-display` | `font-display` (Playfair Display) |
| Text-Font | `--font-sans` | `font-sans` (Source Sans 3) |

Choropleth-Skala (nur Karte/Charts): `--color-gap-low` / `-mid` / `-high`.
**Keine hartkodierten Hex-Farben** in Komponenten – immer Tokens nutzen.

## Geteilte Primitives (`src/components/ui/`)

Importpfad-Beispiel aus `sections/`: `import Section from '../ui/Section.astro';`

- **Section.astro** – Sektions-Wrapper. Props: `id` (Pflicht), `eyebrow?`, `title?`,
  `intro?`, `surface?: 'sand'|'card'`, `wide?: boolean`. Inhalt via `<slot/>`.
  → JEDE Sektion MUSS in eine `<Section id="...">` gewrappt sein (für Anker-Nav).
- **AccordionBox.astro** – aufklappbar (`<details>`). Props: `title`, `open?`. Inhalt via slot.
- **SteckbriefCard.astro** – Personen-/Länderkarte. Props: `name`, `ort`, `rolle?`, `zeilen?: string[]`.
- **CountryCard.astro** – Ranking-Karte mit Balken. Props: `land`, `platz`, `closed` (0..1), `kurz?`.
- **QuoteBlock.astro** – Zitat. Props: `text`, `author?`, `role?`, `variant?: 'default'|'hero'`.
- **MediaGrid.astro** – responsives Raster (Slot). Props: `columns?: 2|3`.
- **PlaceholderFigure.astro** – Bild-Platzhalter. Props: `ratio?`, `label?`.
- **DataPlaceholder.astro** – Container für spätere JS-Inseln. Props: `island: 'map'|'chart'|'timeline'`,
  `label`, `ratio?`, `hint?`. → Für Karte/Charts/Zeitstrahl-Interaktivität verwenden.
- **SourceTooltip.astro** – Inline-Quellverweis. Props: `id` (Zahl aus `sources.ts`).
  Nutzung im Text: `Aussage<SourceTooltip id={1} />`.

## Daten (`src/data/`)

- **content.ts** – alle Texte/Objekte je Sektion (named exports: `hero`, `definition`,
  `karte`, `vorbilder`, `schlusslichter`, `ursachen`, `zeitstrahl`,
  `stimmen`, `quellenMethodik`, `kernzahlen`). Typen: `Quote`, `Steckbrief`,
  `TimelineEvent`, `CountryStat`, `MapPunkt`, `Aussage`, `Faktum`. **Immer von hier importieren**,
  keine Texte hartkodieren. Jedes faktentragende Item hat ein Pflichtfeld `quellen: number[]`
  (IDs aus `sources.ts`); `npm run check:sources` erzwingt die Belegpflicht.
- **sources.ts** – `sources[]`, `getSource(id)`. Für Quellen-Sektion + SourceTooltip.
- **tokens.ts** – `palette`, `choropleth`, `gapColor(closed)` (für farbige Balken/Inline-Styles).

## Sektions-IDs (für die Anker-Navigation – exakt so verwenden)

`hero`, `definition`, `karte`, `vorbilder`, `schlusslichter`, `ursachen`,
`zeitstrahl`, `stimmen`, `quellen`

## Stil-Regeln

- Deutsch, ruhig, empathisch (Thema: Biografien, persönliche Geschichten).
- Display/Überschriften: `font-display`; Fließtext: `font-sans` (Body erbt ihn bereits).
- Touch-first / responsive: mobil 1-spaltig, ab `min-width: 48rem` mehrspaltig (MediaGrid macht das).
- A11y: sinnvolle Heading-Hierarchie (Section setzt `h2`, darunter `h3`/`h4`),
  `alt`/`aria-label` wo nötig, ausreichend Kontrast.
- Scoped `<style>` pro Komponente bevorzugt; Tailwind-Utilities für Layout ok.
- Keine echten Fotos, keine erfundenen Inhalte – nur belegte Inhalte aus `content.ts`.

## Definition of Done je Sektion

- In `<Section id="...">` gewrappt, richtige ID.
- Nutzt Primitives + `content.ts` statt eigener Texte/Karten, wo möglich.
- Responsive, a11y-sauber, nur Tokens (keine Hex-Werte).
- `npm run check` bleibt fehlerfrei; Komponente rendert eigenständig.
