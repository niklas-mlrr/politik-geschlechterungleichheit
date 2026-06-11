// Konsolidierte, tatsächlich genutzte Quellenliste der Website (max. 26 Einträge).
//
// WICHTIG: Die IDs hier sind STABIL und unabhängig von den Craft-Quellennummern
// (die sich verschieben, sobald die Craft-Seite wächst). Genutzt von SourceTooltip
// (inline [n]) und der Quellen-Sektion (#quelle-n). Regel: nur Quellen, die mind.
// eine Aussage belegen; eine Quelle darf (und soll) mehrere Aussagen belegen.
//
// Quellen-Audit 06/2026: alle Einträge inhaltlich gegen die belegten Aussagen
// geprüft (siehe OFFENE_BELEGE.md); schwache Quellen (Blogs, Listicles ohne
// Belegkraft) wurden durch institutionelle bzw. Primärquellen ersetzt.

export interface Source {
  id: number;
  kurz: string; // Anzeige im Tooltip
  voll: string; // vollständige Angabe in der Quellen-Sektion
  url?: string;
}

export const sources: Source[] = [
  // ---- Haupt-Datenquelle ----
  {
    id: 1, // Craft [21] + [20] (Report und Benchmarking-Kapitel zusammengeführt)
    kurz: 'WEF, Global Gender Gap Report 2025',
    voll:
      'World Economic Forum: Global Gender Gap Report 2025 (inkl. Kapitel „Benchmarking gender gaps“: Methodik, Subindizes, Ranglisten aller 148 Länder).',
    url: 'https://www.weforum.org/publications/global-gender-gap-report-2025/',
  },
  {
    id: 2, // Craft [2]
    kurz: 'Indian Express, Top/Bottom 10 (GGGR 2025)',
    voll: 'The Indian Express: Top and bottom 10 countries in WEF Global Gender Gap Index 2025.',
    url: 'https://indianexpress.com/article/trending/top-10-listing/top-bottom-10-countries-in-wef-global-gender-gap-index-2025-india-rank-10061927/',
  },
  {
    id: 3, // Craft (Rückschritte); belegt zusätzlich Sudan/Haiti/Afghanistan + Gewalt-Daten
    kurz: 'tagesschau.de, UN beklagen Rückschritte bei Frauenrechten',
    voll:
      'tagesschau.de: UN beklagen Rückschritte bei Frauenrechten (UN-Women-Report zum Weltfrauentag, März 2026).',
    url: 'https://www.tagesschau.de/ausland/amerika/un-frauenrechte-100.html',
  },
  {
    id: 4, // Craft [12]
    kurz: 'BMZ, Länderseite Tschad',
    voll: 'Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung (BMZ): Tschad.',
    url: 'https://www.bmz.de/de/laender/tschad',
  },

  // ---- Vorbilder / Skandinavien / Island ----
  {
    id: 5, // Craft [5]
    kurz: 'Süddeutsche Zeitung, „Islands Frauen als Vorbilder“',
    voll: 'Süddeutsche Zeitung: Gleichstellungsbericht des Weltwirtschaftsforums, Islands Frauen als Vorbilder.',
    url: 'https://www.sueddeutsche.de/panorama/gleichstellungsbericht-des-weltwirtschaftsforums-islands-frauen-als-vorbilder-1.1803763',
  },
  {
    id: 6, // Craft [6]
    kurz: 'Stern, „Was wir von Island lernen können“',
    voll: 'Stern: Island, Das können wir in Sachen Gleichberechtigung lernen.',
    url: 'https://www.stern.de/neon/wilde-welt/gesellschaft/damenwahl/island--das-koennen-wir-in-sachen-gleichberechtigung-lernen-8532184.html',
  },
  {
    id: 7, // Craft [7]
    kurz: 'Hans-Böckler-Stiftung, „Warum Skandinavien sozialer ist“',
    voll: 'Hans-Böckler-Stiftung (Böckler Impuls): Warum Skandinavien sozialer ist.',
    url: 'https://www.boeckler.de/de/boeckler-impuls-warum-skandinavien-sozialer-ist-7998.htm',
  },
  {
    id: 8, // Craft (Spitzenländer [4])
    kurz: 'WOZ, Nordische Gleichstellungspolitik',
    voll: 'WOZ Die Wochenzeitung: Nordische Gleichstellungspolitik, Günstige Umstände, ergriffene Chancen.',
    url: 'https://www.woz.ch/1951/nordische-gleichstellungspolitik/guenstige-umstaende-ergriffene-chancen',
  },
  {
    id: 9, // Craft [9]
    kurz: 'Deutschlandfunk, Gleichberechtigung in Schweden',
    voll: 'Deutschlandfunk: Gleichberechtigung in Schweden, Gelobtes Land oder nur schöner Schein?',
    url: 'https://www.deutschlandfunk.de/gleichberechtigung-in-schweden-gelobtes-land-oder-nur-100.html',
  },
  {
    id: 10, // Nachrecherche (ersetzt Bundestag-Ausstellungsseite + separate Finnland-Quelle)
    kurz: 'bpb, Frauenwahlrecht in Neuseeland 1893',
    voll:
      'Bundeszentrale für politische Bildung (bpb): 19.09.1893, Frauenwahlrecht in Neuseeland (Hintergrund aktuell; auch zu Finnland 1906 als erstem Land Europas).',
    url: 'https://www.bpb.de/kurz-knapp/hintergrund-aktuell/540805/19-09-1893-frauenwahlrecht-in-neuseeland/',
  },
  {
    id: 11, // Nachrecherche (Craft: „allgemein bekanntes Fakt“ -> belegt)
    kurz: 'Tagesspiegel, Frauenquote in Norwegen',
    voll: 'Der Tagesspiegel: Frauenquote in Norwegen, 40 % in Aufsichtsräten börsennotierter Unternehmen (Gesetz seit 2003, voll wirksam ab 2008).',
    url: 'https://www.tagesspiegel.de/wirtschaft/frauenquote-in-norwegen-willkommen-im-club/10999770.html',
  },

  // ---- Definition / Bereiche der Ungleichheit ----
  {
    id: 12, // Craft Generelles-Pool
    kurz: 'bpb, Gender Pay Gap',
    voll: 'Bundeszentrale für politische Bildung (bpb): Geschlechterungleichheiten, Gender Pay Gap.',
    url: 'https://www.bpb.de/themen/arbeit/arbeitsmarktpolitik/318555/geschlechterungleichheiten-gender-pay-gap/',
  },
  {
    id: 13, // Craft Generelles-Pool
    kurz: 'Bundesstiftung Gleichstellung, Geschlechtersegregation',
    voll: 'Bundesstiftung Gleichstellung: Geschlechtersegregation am Arbeitsmarkt.',
    url: 'https://www.bundesstiftung-gleichstellung.de/wissen/themenfelder/geschlechtersegregation-am-arbeitsmarkt/',
  },
  {
    id: 14, // Craft Generelles-Pool
    kurz: 'bpb, Ungleichheiten zwischen Frauen und Männern',
    voll: 'Bundeszentrale für politische Bildung (bpb): Ungleichheiten zwischen Frauen und Männern (Sozialer Wandel in Deutschland).',
    url: 'https://www.bpb.de/shop/zeitschriften/izpb/sozialer-wandel-in-deutschland-324/198038/ungleichheiten-zwischen-frauen-und-maennern/',
  },
  {
    id: 15, // Craft Generelles-Pool
    kurz: 'KfW Entwicklungsbank, Gender-Ungleichheit',
    voll: 'KfW Entwicklungsbank: Gender-Ungleichheit (Entwicklungspolitik Kompakt Nr. 5, 2020).',
    url: 'https://www.kfw-entwicklungsbank.de/PDF/Download-Center/PDF-Dokumente-Development-Research/2020_05_15_EK_Gender-Ungleichheit_DE.pdf',
  },

  // ---- Ungleichheit gegenüber Männern ----
  {
    id: 16, // Craft (Männer [1])
    kurz: 'SRF, Gleichberechtigung erhöht Druck auf Männer',
    voll: 'SRF Wissen: Geschlechterklischees, je gleichberechtigter, desto mehr Druck für Männer.',
    url: 'https://www.srf.ch/wissen/mensch/geschlechterklischees-je-gleichberechtigter-desto-mehr-druck-fuer-maenner',
  },
  {
    id: 17, // Craft (Männer [11])
    kurz: 'BMFSFJ, Männer-Perspektiven',
    voll: 'Bundesministerium für Familie, Senioren, Frauen und Jugend (BMFSFJ): Männer-Perspektiven, auf dem Weg zu mehr Gleichstellung.',
    url: 'https://www.bmbfsfj.bund.de/resource/blob/115580/5a9685148523d2a4ef12258d060528cd/maenner-perspektiven-auf-dem-weg-zu-mehr-gleichstellung-data.pdf',
  },
  {
    id: 18, // Nachrecherche (ersetzt connecticum-Karriere-News; amtliche Gesundheitsdaten)
    kurz: 'RKI, Gesundheitliche Lage der Männer',
    voll:
      'Robert Koch-Institut: Gesundheitliche Lage der Männer in Deutschland, Kapitel 2 „Wie geht es Männern?“ (Gesundheitsberichterstattung des Bundes, 2014).',
    url: 'https://www.rki.de/DE/Themen/Gesundheit-und-Gesellschaft/Gesundheitliche-Einflussfaktoren-A-Z/M/Maennergesundheit/maennerbericht/kapitel_2_wie_geht_es.pdf?__blob=publicationFile&v=1',
  },

  // ---- Stimmen / Zitate ----
  {
    id: 19, // Primärquelle (ersetzt For-Harriet-Blog + Autorenporträt)
    kurz: 'Adichie, „We Should All Be Feminists“ (TEDx 2012)',
    voll:
      'Chimamanda Ngozi Adichie: We Should All Be Feminists. TEDxEuston 2012 (2014 als Essay erschienen); Originalzitate: „Gender as it functions today is a grave injustice“, „Culture does not make people. People make culture“.',
    url: 'https://www.ted.com/talks/chimamanda_ngozi_adichie_we_should_all_be_feminists',
  },
  {
    id: 20, // Craft (Mögliche Zitate / Rotsocken)
    kurz: 'Frankfurter Rundschau, Islands Frauenstreik 1975',
    voll: 'Frankfurter Rundschau: Islands Frauenstreik setzt bis heute Zeichen für Gleichstellung („Ohne Frauen geht es nicht“).',
    url: 'https://www.fr.de/panorama/islands-frauenstreik-setzt-bis-heute-zeichen-fuer-gleichstellung-94001543.html',
  },
  {
    id: 21, // Craft (Mögliche Zitate / Lindgren)
    kurz: 'Frauenkultur Leipzig, Zitate von Frauen',
    voll: 'Frauenkultur Leipzig: Zitate von Frauen (u. a. Astrid Lindgren, Zitat 33).',
    url: 'https://www.frauenkultur-leipzig.de/angebote/aktuelle-projekte/zitate-von-frauen/',
  },

  // ---- Zeitstrahl ----
  {
    id: 22, // Nachrecherche (ersetzt timelines.me)
    kurz: 'Landesbildungsserver BW, Frauenemanzipation in den USA',
    voll:
      'Landesbildungsserver Baden-Württemberg: Der Weg der US-amerikanischen Frau zu mehr Gleichberechtigung (Seneca-Falls-Konvention 1848, Declaration of Sentiments).',
    url: 'https://www.schule-bw.de/faecher-und-schularten/gesellschaftswissenschaftliche-und-philosophische-faecher/geschichte/unterricht/11-12/3-4-1-2/usa/frauenemanzipation-usa',
  },
  {
    id: 23, // Nachrecherche (ersetzt timelines.me; UN-Charta 1945 + Peking 1995)
    kurz: 'DGVN, Frauenrechte bei den Vereinten Nationen',
    voll:
      'Deutsche Gesellschaft für die Vereinten Nationen (DGVN): Frauenrechte (UN-Charta 1945, CEDAW, Pekinger Erklärung und Aktionsplattform 1995).',
    url: 'https://menschenrechte-durchsetzen.dgvn.de/menschenrechte/frauenrechte',
  },
  {
    id: 24, // Craft (Zeitstrahl [8])
    kurz: 'UN Women Deutschland, SDG 5',
    voll: 'UN Women Deutschland: SDG 5, Gleichstellung der Geschlechter.',
    url: 'https://unwomen.de/sdg-5-gleichstellung-der-geschlechter/',
  },
  {
    id: 25, // Craft (MeToo [1])
    kurz: '„Gemeinsam gegen Sexismus“, #MeToo',
    voll: 'Bündnis „Gemeinsam gegen Sexismus“: Glossar, #MeToo.',
    url: 'https://gemeinsam-gegen-sexismus.de/glossar-posts/metoo/',
  },
  {
    id: 26, // Craft (Iran [2])
    kurz: 'Amnesty International, Iran „Frau, Leben, Freiheit“',
    voll: 'Amnesty International: Iran, Repression, ziviler Widerstand und „Frau, Leben, Freiheit“.',
    url: 'https://www.amnesty.de/informieren/amnesty-journal/iran-repression-ziviler-widerstand-frauen-leben-freiheit',
  },
];

export function getSource(id: number): Source | undefined {
  return sources.find((s) => s.id === id);
}
