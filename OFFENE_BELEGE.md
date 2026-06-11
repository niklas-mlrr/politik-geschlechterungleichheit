# Offene Belege & Quellen-Report

Stand: 11.06.2026 · erstellt beim Einpflegen der Craft-Inhalte (`src/data/content.ts`).

Grundregel des Projekts: **Jede Aussage auf der Website ist einer Quelle zugeordnet.**
Geprüft per `npm run check:sources` (jedes Item belegt, alle IDs gültig, keine verwaisten
Quellen). Quellen-IDs unten verweisen auf `src/data/sources.ts`.

---

## 1. Weggelassen (von der Craft-Seite NICHT übernommen)

Bewusst nicht auf die Website übernommen, um sie informativ, aber nicht überladen zu halten
(bzw. weil nicht sinnvoll einbindbar / nicht als Foto nutzbar):

- **Bild „Sustainable Development Goals“ (UN-Plakat)** und **Pressefoto des finnischen
  Kabinetts (Sanna Marin u. a.)** aus der Craft-Seite. Grund: Das Design nutzt bewusst keine
  externen/urheberrechtlich geschützten Fotos (Pillow-/Token-Design, siehe CLAUDE.md). Der
  Inhalt der Bilder (SDG 5, hoher Frauenanteil in Regierungen) ist textlich abgedeckt
  (Zeitstrahl 2015 bzw. Ursachen-Muster „Frauen in Politik und Führung“).
- **Detail-Aufzählung der Spitzenländer-Vorstandsquoten** (Schweden 41,4 %, Frankreich 46,1 %)
  aus „Was haben die Spitzenländer gemeinsam?“. Grund: zu kleinteilig für die Seite; das Muster
  „Frauen in Politik und Führung“ trägt die Aussage bereits.
- **Mehrere Rotsocken-Zitate** (Gerður Óskarsdóttir, Guðrún Hallgrímsdóttir). Grund: Reduktion
  auf zwei prägnante Island-Stimmen (Lilja Ólafsdóttir als Steckbrief, Hildur Hákonardóttir als
  Zitat), um die Stimmen-Sektion ruhig zu halten.
- **Craft-Notiz „Punkt 3 Fehler noch“** und unfertige Listenpunkte – reine Arbeitsnotizen.

## 2. Belegt per Nachrecherche (in Craft nachtragenswert)

In Craft stand hier keine Aussage-zu-Quelle-Zuordnung; per WebSearch belegt und auf der Seite
mit Quelle versehen:

- **Norwegen, 40-%-Aufsichtsratsquote** – in Craft als „allgemein bekanntes Fakt“ markiert.
  Belegt: Gesetz seit 2003 (Vollwirkung 2008), 40 % in Aufsichtsräten börsennotierter
  Unternehmen. -> Quelle [13] (Tagesspiegel).
- **Island, Bildung 101:57 Studierende** – entspricht rund 64 % Frauen im Hochschulbereich
  (EU-/Statista-Daten bestätigen die Größenordnung). -> Quellen [7][8].
- **Island, 40-%-Quote per Gesetz / Gleichstellung im Lehrplan** – bestätigt (Quotengesetz 2010,
  Gleichstellung curricular verankert). -> Quellen [6][7][8].
- **Definition / „Generelles“** – in Craft nur unsortierter Link-Pool. Jeder Bereich wurde der
  thematisch passenden Institutionsquelle aus dem Pool zugeordnet: Lohn -> bpb [15],
  Care -> female-resources [16], Karriere -> Bundesstiftung Gleichstellung [17],
  Rollenbilder -> Antidiskriminierungsstelle [18], Gewalt/Folgen -> bpb [19], Ursachen -> KfW [20].
  Hinweis: thematische Zuordnung aus dem Craft-Pool, nicht je Satz wörtlich gegengeprüft.

## 3. Datenkonflikte + Auflösung

Maßgeblich ist der WEF Global Gender Gap Report 2025 [1][2]; Korrekturen wurden **nur im Repo**
vorgenommen. Craft ist reine Eingabequelle (kein Rück-Sync), die Craft-Seite bleibt bewusst
unverändert – dieser Abschnitt ist nur Audit-Trail:

- **Sudan vs. Tschad (Rang):** Craft schreibt „Sudan Platz 146 / Tschad Platz 147“, was den
  eigenen Werten widerspricht (Sudan 57,0 % < Tschad 57,1 % => Sudan ist schlechter platziert).
  Korrekt und übernommen: **Sudan = 147 (57,0 %)**, **Tschad = 146 (57,1 %)**.
- **Schweden vs. Neuseeland (Rang):** Craft/Repo bestätigt: **Neuseeland = Platz 5 (82,7 %)**,
  **Schweden = Platz 6 (81,7 %)**. (In einer früheren Craft-Fassung vertauscht.)
- **Republik Moldau (Platz 7):** in Craft nicht erwähnt, gehört laut WEF 2025 in die Top 10;
  in der „Weitere Top 10“-Liste ergänzt. -> [1][3].
- **Gesamtzahl Länder:** 148 (Pakistan = letzter Platz 148). Eine WebSearch-Zusammenfassung nannte
  fälschlich „Ägypten 149.“ – Artefakt; maßgeblich bleibt 148 (bestätigt u. a. DAWN/Indian Express).

## 4. Mittelfeld-Länder auf der Karte (nicht aus Craft)

Die „mittel“-Pins (Kanada, USA, Brasilien, Mongolei, Japan, Australien) dienen der Einordnung
des Mittelfelds und stammen nicht aus Craft. Werte/Ränge aus WEF 2025 [1] (Australien Rang 13 /
79,2 %, Japan 66,6 %, Brasilien Rang 72 / 72,0 %, Mongolei 72,8 % – per WebSearch bestätigt;
Kanada/USA plausibel aus WEF). Unbelegte Detail-Behauptungen wurden entfernt bzw. entschärft
(z. B. „+20 Plätze“, „Russland fehlt mangels Daten“), die kurzen Beschreibungen sind WEF-gestützt.

## 5. Wartet auf Craft (noch leere bzw. dünne Bereiche)

Diese Craft-Bereiche sind noch leer oder unvollständig; sobald befüllt, via Re-Sync-Workflow
(CLAUDE.md) einpflegen. Aktuell läuft die Seite **ohne Platzhalter** – diese Punkte sind
optionale Erweiterungen, kein Fehlbestand:

- **„Konkrete pos./neg. Entwicklungen in bestimmten Ländern“** (Craft leer). Zielstruktur:
  zusätzliche `CountryStat`/`Aussage`-Einträge in `vorbilder`/`schlusslichter`.
- **„Konkrete Geschichten von einzelnen Personen“** (Craft leer). Zielstruktur: weitere
  `Steckbrief`-Einträge in `stimmen.biografien`. (Adichie + Lilja Ólafsdóttir sind bereits
  aus den vorhandenen Craft-Zitaten gebildet.)

## 6. Link-Erreichbarkeit (Stand 11.06.2026)

Alle 34 Quellen-URLs per `curl` geprüft. **Keine toten Links.** Hinweise:

- **WEF [1][2]** und **Indian Express [3]** liefern automatisierten Anfragen `403` (Bot-Schutz),
  im Browser normal erreichbar; Inhalt zusätzlich per WebSearch verifiziert.
- **Statista [4]** antwortet mit `302` (Consent-Redirect) – im Browser normal erreichbar.
- Alle übrigen Quellen: `200 OK`.
