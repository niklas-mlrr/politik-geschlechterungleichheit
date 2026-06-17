# Offene Belege & Quellen-Report

Stand: 11.06.2026 · Voll-Audit aller Aussagen und Quellen (Korrektheit + Seriosität) mit
Konsolidierung der Quellenliste von 34 auf **26 Einträge** (Vorgabe: max. 26, nicht nur WEF).

Grundregel des Projekts: **Jede Aussage auf der Website ist einer Quelle zugeordnet.**
Geprüft per `npm run check:sources` (jedes Item belegt, alle IDs gültig, keine verwaisten
Quellen). Quellen-IDs unten verweisen auf `src/data/sources.ts` (neue Nummerierung 1–26).

---

## 1. Datenkorrekturen aus dem Audit (WICHTIG, an Niklas melden)

- **Kernzahl „132 Jahre“ war falsch.** Der WEF Global Gender Gap Report 2025 nennt
  **123 Jahre** bis zur globalen Parität (132 stammt aus dem Report 2022). Korrigiert in
  Hero/Kernzahlen/Karte. -> [1]
- **Weltdurchschnitt „68,5 %“ war falsch.** GGGR 2025: **68,8 %** geschlossen (68,5 % war
  der Wert von 2024); offener Anteil entsprechend 31,2 %. Korrigiert. -> [1]
- Alle 20 Länder-Ränge und -Werte (Top 10, Mittelfeld-Pins, Bottom 4) wurden einzeln gegen
  die GGGR-2025-Tabelle geprüft: **alle korrekt** (Island 1/92,6 … Pakistan 148/56,7;
  Australien 13, Kanada 32, USA 42, Mongolei 65, Brasilien 72, Japan 118). Bottom-10-Nennung
  (Guinea, DR Kongo, Niger, Algerien, Mali, Ägypten) liegt komplett in Rang 138–144. -> [1]

## 2. Quellen-Konsolidierung 34 -> 26 (Audit 06/2026)

Jede Aussage wurde gegen den Volltext ihrer Quelle geprüft (WebFetch/curl; SZ, Stern, FR,
tagesschau, DLF per Volltext-Extraktion; PDFs per pypdf). Entfernt bzw. ersetzt wurden:

| Alt | Quelle | Grund / Ersatz |
|-----|--------|----------------|
| [2] | WEF „Benchmarking“ | mit dem Report [1] zusammengeführt (gleiche Publikation) |
| [4] | Statista Bottom-Ranking | redundant zu [1]; trug fälschlich die Sudan-Kriegsaussagen -> jetzt tagesschau [3] |
| [8] | RKW-Blog Island | Aussagen (25-MA-Regel, Quote, Lehrplan) stecken in SZ [5] + Stern [6] |
| [12] | bpb Finnland 1906 | bpb-Neuseeland-Artikel [10] belegt Finnland 1906 gleich mit |
| [14] | DLF Einwandererkurse Norwegen | Nebensatz aus Norwegen-Text entfernt (s. Abschnitt 4) |
| [16] | female-resources.de (Blog) | nicht seriös genug; Care-Aussagen -> bpb izpb [14] + KfW [15] |
| [18] | Antidiskriminierungsstelle | Seite passte nicht zur Rollenbilder-Aussage; -> bpb izpb [14] + KfW [15] |
| [21] | literaturfestival berlin | Porträt enthält die Zitate nicht; -> TED-Primärquelle [19] |
| [22] | For Harriet (Blog, http) | nicht seriös; beide Adichie-Zitate stammen wörtlich aus dem TEDx-Talk [19] |
| [26] | bpb Weltfrauentag | deckt die Rückschritte-Aussagen NICHT (geprüft); tagesschau [3] deckt alle |
| [28] | connecticum Karriere-News | nicht seriös, Aussage stand gar nicht im Text; -> RKI [18] |
| [30] | timelines.me | fragwürdige Seite; 1848 -> Landesbildungsserver BW [22], 1945 -> DGVN [23] |
| [31] | Bundestag-Ausstellung | erwähnt Neuseeland nicht (geprüft!); -> bpb Neuseeland 1893 [10] |

Neu aufgenommen (5): TED/Adichie [19] (Primärquelle), RKI Männergesundheit [18],
Landesbildungsserver BW [22], DGVN Frauenrechte [23] (UN-Charta 1945 + Peking 1995),
bpb Neuseeland 1893 [10]. WEF ist damit nur noch 1 von 26 Quellen; 25 Quellen sind
unabhängig vom WEF (bpb x3, Bundesministerien/-stiftungen, RKI, DGVN, UN Women, Amnesty,
Qualitätsmedien, Primärquellen).

## 3. Volltext-verifizierte Quelle-Aussage-Paare (Auswahl)

- **SZ [5]:** Island 40 % Parlament, Hälfte Minister, Frau in 20 der letzten 50 Jahre an der
  Staatsspitze, 101:57 Studierende. (Text „20 bis 25“ auf belegbare „rund 20“ präzisiert.)
- **Stern [6]:** 40-%-Quote für Führungspositionen, Gleichstellungsprogramme ab 25
  Mitarbeitenden mit 3-Jahres-Prüfung, Gleichberechtigung im Lehrplan Kindergarten–Uni
  (Art. 23 Gleichberechtigungsgesetz).
- **tagesschau [3]:** wörtlich „Kein Land der Welt hat die vollständige rechtliche
  Gleichstellung von Frauen und Männern erreicht“ (UN Women); Fortschritte bis 2020, dann
  Rückschritte; USA-Streichungen finden Nachahmer; sexualisierte Gewalt am schlimmsten in
  Sudan, Haiti, Afghanistan.
- **RKI [18]:** „Lebenserwartung … 77,7 Jahre … fünf Jahre geringer als die der Frauen“;
  „Suizide werden häufiger von Männern verübt“ (alle Altersgruppen); Früherkennungs-/
  Arbeitsunfall-Kapitel.
- **WOZ [8]:** nordische Gleichstellungspolitik früh verankert, empfängliche Sozialstaaten
  (Arbeiter-/Frauenbewegungen), Betreuungsanspruch 1964–1975, ~47 % Frauen in Parlamenten.
- **Böckler [7]:** Kita-Ausbau -> Frauenerwerbstätigkeit, Bildungsreformen ohne finanzielle
  Hürden seit den 1960ern, Abbau von Klassenschranken.
- **DLF [9]:** Schweden „weltweit erste feministische Regierung“, geschlechtsneutrale
  Erziehung in Vorschulen. (Unbelegtes „Querschnittsaufgabe“ umformuliert.)
- **FR [20]:** Lilja Ólafsdóttir (Bauerntochter, erste Geschäftsführerin der Reykjavíker
  Verkehrsbetriebe), 90 %-Streik 1975, Hot-Dog-Zitat (Wortlaut korrigiert: „… servieren
  konnten“), Hildur-Hákonardóttir-Zitat wörtlich.
- **bpb [10]:** Neuseeland 19.09.1893 + Kate Sheppard + Finnland 1906 als erstes Land Europas.
- **DGVN [23]:** UN-Charta 1945 als Meilenstein der Geschlechtergleichstellung; Pekinger
  Aktionsplattform 1995 mit zwölf Themenfeldern (Gewalt, Bildung, Gesundheit, Wirtschaft,
  Macht-/Entscheidungspositionen …).
- **Tagesspiegel [11]:** Norwegen-Quote 2003, nach Übergangsfrist (bis 4 Jahre) 40 % erreicht.
- **Bundesstiftung [13]:** horizontale/vertikale Segregation, schlechtere Bezahlung
  „weiblicher“ Berufe, Pay Gap 2023 = 18 %.
- **bpb Pay Gap [12]:** Ursachen (Branche, Teilzeit, Führung), bereinigter Gap ~7 %,
  wachsender Abstand mit Alter/Erwerbsunterbrechungen.

## 4. Textanpassungen (Aussagen ohne belastbare Quelle entschärft/entfernt)

- **Norwegen:** Nebensatz zu Einwandererkursen entfernt (einzige Quelle dafür [alt 14] fiel
  der 26er-Grenze zum Opfer; Kernaussagen Quote + Vereinbarkeit bleiben belegt).
- **Männer-Box:** „einseitige Wehrpflicht“ entfernt (keine seriöse Quelle im Budget);
  „höhere Suizidrate“ -> RKI-Wortlaut („sterben … deutlich häufiger durch Suizid“);
  „seltener Gesundheitsangebote“ -> „Früherkennungs- und Vorsorgeangebote“ (RKI);
  „Sorgerecht … seltener anerkannt“ -> „viele Väter fühlen sich benachteiligt“ (BMFSFJ ist
  eine Einstellungs-/Perspektiven-Studie, keine Justizstatistik).
- **Lohnunterschiede:** „seit Jahren bei rund 18 %“ -> „aktuell bei rund 18 %“ (Bundesstiftung:
  18 % für 2023; bpb nennt für 2019 noch 20 %); Renten-Halbsatz entfernt (nicht in Quelle).
- **Island/Bildung:** Satz über „Debatten, wie man mehr junge Männer gewinnt“ entfernt (in
  keiner Quelle); **Island/Gesellschaft:** unbelegte „lange Tradition der
  Frauenerwerbstätigkeit“ durch belegten Frauenstreik-1975-Bezug ersetzt [20].
- **Sudan:** „Bürgerkrieg seit 2023“ + „Hungergefahr“ -> UN-belegte Formulierung (Krieg/
  humanitäre Notlage, drastische Zunahme sexualisierter Gewalt) [3].
- **Iran:** „Berufswahl und Bildung stark begrenzt“ -> belegbare Aussagen
  (Verschleierungspflicht, Repression der Proteste 2022, ziviler Widerstand) [1, 26].
- **Brasilien-Pin:** „regionale Unterschiede“ -> WEF-gestützte Subindex-Aussage.
- **#MeToo:** „auch Männer ansprechend“ entfernt (nicht in Quelle); Formulierung an Glossar
  angepasst (millionenfacher Hashtag, vor allem Frauen betroffen).
- **Adichie-Bio:** Zeilen auf TED-belegbare Fakten umgestellt (TEDx 2012, Essay 2014);
  beide Zitate sind Originalzitate aus dem Talk („Gender as it functions today is a grave
  injustice“ / „Culture does not make people. People make culture“).
- **Neuseeland (weitere Top 10):** unbelegte „lange Tradition von Frauen in
  Führungspositionen“ -> „führte 1893 als erstes Land das Frauenwahlrecht ein“ [10];
  **Irland:** unbelegtes „starkes Engagement“ -> neutrale WEF-Aussage.

## 5. Wartet auf Craft (noch leere bzw. dünne Bereiche)

Unverändert offen; sobald befüllt, via Re-Sync-Workflow (CLAUDE.md) einpflegen. Die Seite
läuft **ohne Platzhalter**:

- **„Konkrete pos./neg. Entwicklungen in bestimmten Ländern“** (Craft leer). Zielstruktur:
  zusätzliche `CountryStat`/`Aussage`-Einträge in `vorbilder`/`schlusslichter`.
- **„Konkrete Geschichten von einzelnen Personen“** (Craft leer). Zielstruktur: weitere
  `Steckbrief`-Einträge in `stimmen.biografien`.

## 6. Link-Erreichbarkeit (Stand 11.06.2026, nach Konsolidierung)

Alle 26 Quellen-URLs per `curl` geprüft: **24x `200 OK`, keine toten Links.**

- **WEF [1]** und **WEF Benchmarking [2]** liefern automatisierten Anfragen `403` (Bot-Schutz),
  im Browser normal erreichbar; Inhalte zusätzlich per WebSearch/Drittquellen verifiziert.
- 06/2026: Quelle [2] war zuletzt ein Indian-Express-Listicle (unserös). Ersetzt durch das
  WEF-Primärkapitel „Benchmarking gender gaps, 2025“, das dieselbe Top/Bottom-10-Rangliste
  belegt. Hinweis: [2] und [1] verweisen damit auf dieselbe Publikation (zwei Kapitel/Unterseiten).

## 7. Bekannte Restpunkte

- Begriff „Gender Care Gap“ wird in [14]/[15] nicht wörtlich benutzt (die belegten Aussagen
  zur Ungleichverteilung schon). Optional: Destatis-/BMFSFJ-Care-Gap-Seite, falls die
  26er-Grenze einmal gelockert wird.
- BMFSFJ-PDF [17] ist eine Einstellungsstudie; Männer-Box-Formulierung wurde entsprechend
  vorsichtig gehalten.
- Bildnachweise unverändert; Adichie-Foto (Guardian) bleibt wie gehabt rechtlich nicht
  abgesichert (bewusste Entscheidung, in content.ts dokumentiert).
