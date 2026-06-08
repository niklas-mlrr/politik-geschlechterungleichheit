# Projekt: Gleichstellung weltweit (Politik 12.2)

Interaktive Website zum Thema internationale Geschlechtergerechtigkeit.
Schulprojekt, Gymnasium 12. Klasse (Niklas), Fach Politik. Datenbasis: WEF Global Gender Gap Report 2025.

## Status

- Phase: Konzept + Design abgeschlossen, Umsetzung noch nicht begonnen.
- `index.html` ist nur ein Platzhalter-Stub, noch keine echte Implementierung.
- Designrichtung festgelegt: Warm Humanist (siehe unten).

## Quelle der Wahrheit (Inhalte)

Die ausformulierten Inhalte, Quellen und das Brainstorming liegen in Craft, nicht im Repo.

- Craft-Space: Schule (`76e544fe-b21f-6923-67ef-f235023507de`)
- Hauptseite Block-ID: `B9476D40-654B-4EA4-9051-29E1BD19F3D2` ("12.2 - Soziale Ungleichheit und Geschlecht")
- Unterseite Brainstorming: `50189309-BADE-41A8-B352-FC3308CC2BDE` (enthält Original-Brainstorming + überarbeitetes Konzept von Claude Code)
- Unterseite Inhalte: `EDF2F61A-1BCB-4201-996A-430495FAD68F` (Länderdaten, Top/Bottom, globale Zahlen, Zitate, Quellen)
- Zugriff über `/craft`-Skill bzw. `mcp__craft_schule__*` Tools.

## Designentscheidung

Aus 5 Designvorschlägen wurde Variante 04 "Warm Humanist" gewählt.
-> Empathisch und ruhig, passend zum Thema (Biografien, persönliche Geschichten).
Die Farbpalette wurde auf Wunsch entsättigt (vorher zu knallig).

### Finale Farbpalette (Warm Humanist, gedämpft)

| Rolle | Hex |
|-------|-----|
| Sand / Seitenhintergrund | `#F1E8DA` |
| Ink / Text | `#3B2F26` |
| Subtext | `#8A7A66` |
| Akzent (Terrakotta/Clay) | `#AE6A52` |
| Sekundär (Ocker) | `#CBA46F` |
| Akzent 2 (Salbei-Grün) | `#5C7A6B` |
| Card-Oberfläche | `#E8DAC6` |
| Ozean (Karte) | `#E3DDCF` |

### Choropleth-Skala (Karte)

Diverging, niedriger Gender Gap -> hoher Gender Gap:
- niedrig `#A8473B` (Brick) -> mitte `#CD9A63` (Ocker) -> hoch `#4F7A66` (Grün)
- Bedeutung: rot = wenig Gleichstellung, grün = viel.

### Typografie

- Display / Überschriften: Serif Bold (im Mockup DejaVu Serif; final z.B. eine echte Serif wie Fraunces / Playfair)
- Fließtext: Sans (DejaVu Sans; final z.B. Inter)

## Geplanter Tech-Stack

- Framework: Astro (statisch, JS nur per Island wo nötig — "0 KB JS" gilt nur für statische Sektionen)
- Karte: KEINE Leaflet/Choropleth mehr. Grobe stilisierte Weltkarte (1 SVG-Landpfad) +
  ~11 antippbare Pins (Vorbilder/Schlusslichter) -> geteilte Infokarte via kleiner Vanilla-JS-Insel.
  Siehe Abschnitt "Karten-/Daten-Hinweise".
- Charts: Chart.js (anklickbare Balken/Punkte)
- Scroll-Animationen: GSAP ScrollTrigger; `prefers-reduced-motion` respektieren
- Styling: Tailwind CSS
- Hosting: Netlify
- Touch-first / iPad-optimiert; Parallax auf Touch reduzieren

## Seitenstruktur (Scrollytelling, roter Faden)

1. Hero -> Claim + Kernzahl "132 Jahre bis zur globalen Gleichstellung"
2. Definition Geschlechterungleichheit (typische Bereiche als aufklappbare Boxen)
3. Globaler Überblick -> interaktive Weltkarte (Herzstück)
4. Vorbilder -> Island + Skandinavien, warum sie vorne liegen
5. Schlusslichter -> Pakistan, Sudan, Tschad, Iran mit Ursachen
6. Ursachenmuster -> Gemeinsamkeiten der Spitzenländer
7. Zeitstrahl -> Schlüsselereignisse
8. Stimmen -> Zitate + kurze Biografien
9. Quellen + Methodik

Quellen jeweils als Hover-/Klick-Tooltip am Verweis (Lesefluss erhalten).

## Schlüsseldaten (WEF Global Gender Gap Report 2025)

- Weltweiter Durchschnitt: 68,5% geschlossen -> noch ein Drittel offen.
- Tempo: noch ca. 132 Jahre bis zur globalen Schließung.
- Kein Land hat den Gap vollständig geschlossen; 8 der Top 10 in Europa.
- Top 5: Island 92,6 / Finnland 87,9 / Norwegen 86,3 / Großbritannien 83,8 / Schweden 81,7
- Bottom 5: Pakistan 56,7 / Sudan 57,0 / Tschad 57,1 / Iran 58,3 / (Algerien ~64)
- Deutschland: Platz 9, 80,3%.

## Repo-Struktur

- `index.html` -> Platzhalter-Stub (noch zu ersetzen)
- `mockup_warm_map.png` -> aktives Deliverable: großes Detail-Mockup (1640x2680) mit echter Choropleth-Weltkarte
- `design/` -> archivierte Designexploration (5 Boards: Mockup + Palette + Typo)
  - `design_04_warm_CHOSEN.png` = gewählte Richtung (gedämpfte Palette)
  - weitere: 01 Liquid Glass, 02 Editorial, 03 Dark Data, 05 Nordic Minimal (verworfen, via Skript reproduzierbar)
- `scripts/gen_designs.py` -> erzeugt die 5 Design-Boards (Pillow). Schreibt aktuell nach `/tmp/`.
- `scripts/gen_map_mockup.py` -> altes Karten-Mockup -> `mockup_warm_map.png` (nur Design-Referenz)
- `scripts/gen_map_svg.py` -> erzeugt `src/data/worldMap.ts` (Live-Karte: Landpfad + Pin-Coords)
- `data/world.geo.json` -> Welt-GeoJSON, 180 Länder, ISO3-IDs (Quelle: johan/world.geo.json)
- `src/components/sections/WorldMap.astro` -> umgesetzte interaktive Karte (Pins + Infokarte)

## Karten-/Daten-Hinweise (wichtig)

Umgesetzte Karte (statt Choropleth): grobe Land-Silhouette + Pins.

- `scripts/gen_map_svg.py` -> `src/data/world.geo.json`-Quelle wird equirektangular projiziert
  (Bounds wie Mockup: `LAT_T=83, LAT_B=-56, LON_L=-169, LON_R=190`, Antarktis aus) und als
  `src/data/worldMap.ts` ausgegeben: `viewBox`, `landPath` (alle Länder als EIN Pfad, eine
  Füllung, keine Grenzen), `project(lon,lat)`, `coords` (projizierte Centroids der Pin-Länder).
  Neu erzeugen: `python3 scripts/gen_map_svg.py`. `worldMap.ts` ist generiert -> nicht von Hand editieren.
- Pin-Inhalte stehen in `src/data/placeholder.ts` (`karte.punkte: MapPunkt[]`, 11 Länder = 7 Vorbilder
  + 4 Schlusslichter, Werte WEF 2025, Texte aus Craft). Join Pin<->Position über `iso3` ⇄ `coords`.
- `WorldMap.astro`: Inline-SVG + server-gerenderte `.pin`-Buttons (Position in %); kleine JS-Insel
  am `data-island="map"`-Hook befüllt/positioniert eine geteilte `.ci-card`. `gapColor()` färbt den
  Balken. Ohne JS / unter 48rem bleibt die `CountryCard`-Liste sichtbar (a11y-Fallback, `<noscript>`).
- Kein voller 148-Länder-Datensatz nötig (keine Flächeneinfärbung mehr). Weitere Pins: ISO3 in
  `gen_map_svg.py` (`PIN_ISO`) + Eintrag in `karte.punkte` ergänzen, Skript neu laufen lassen.
- `gen_map_mockup.py` (altes Choropleth-Mockup) bleibt nur als Design-Referenz, ist nicht mehr die Quelle.

## Umgebung / Rendering

- Headless VPS, kein Browser, kein KI-Bildgenerator.
- Bilder werden mit Python Pillow + numpy gezeichnet (echte Verläufe, Glas-Effekt, DejaVu-Fonts unter `/usr/share/fonts/truetype/dejavu/`).
- ImageMagick `convert` nur zum Zuschneiden/Prüfen; interner SVG-Renderer ist unbrauchbar (verliert Verläufe).

## Konventionen (Antwortstil Niklas)

- Deutsch, knapp, Stichpunkte, "->" für Konsequenzen/Erläuterungen.
- Keine Emojis, kein LaTeX im Terminal.

## Nächste Schritte (offen)

- Astro-Projekt aufsetzen, `index.html`-Stub ersetzen.
- Vollständige WEF-Werte für alle Länder beschaffen.
- Leere Inhaltsabschnitte in Craft füllen: zeitliche Entwicklung, konkrete Länderentwicklungen, kurze Personengeschichten, weitere Zitate.
- Echte Web-Fonts (Serif Display + Sans) festlegen.
