// Konsolidierte, tatsächlich genutzte Quellenliste der Website.
//
// WICHTIG: Die IDs hier sind STABIL und unabhängig von den Craft-Quellennummern
// (die sich verschieben, sobald die Craft-Seite wächst). Jeder Eintrag vermerkt im
// Kommentar seine Craft-Herkunft. Genutzt von SourceTooltip (inline [n]) und der
// Quellen-Sektion (#quelle-n). Regel: nur Quellen, die mind. eine Aussage belegen.

export interface Source {
  id: number;
  kurz: string; // Anzeige im Tooltip
  voll: string; // vollständige Angabe in der Quellen-Sektion
  url?: string;
}

export const sources: Source[] = [
  // ---- Haupt-Datenquelle: WEF Global Gender Gap Report 2025 ----
  {
    id: 1, // Craft [21]
    kurz: 'WEF, Global Gender Gap Report 2025',
    voll: 'World Economic Forum: Global Gender Gap Report 2025.',
    url: 'https://www.weforum.org/publications/global-gender-gap-report-2025/',
  },
  {
    id: 2, // Craft [20]
    kurz: 'WEF 2025, Benchmarking gender gaps',
    voll: 'World Economic Forum: Global Gender Gap Report 2025, Benchmarking gender gaps, 2025 (Methodik, Subindizes, Ranglisten).',
    url: 'https://www.weforum.org/publications/global-gender-gap-report-2025/in-full/benchmarking-gender-gaps-2025/',
  },
  {
    id: 3, // Craft [2]
    kurz: 'Indian Express, Top/Bottom 10 (GGGR 2025)',
    voll: 'The Indian Express: Top and bottom 10 countries in WEF Global Gender Gap Index 2025.',
    url: 'https://indianexpress.com/article/trending/top-10-listing/top-bottom-10-countries-in-wef-global-gender-gap-index-2025-india-rank-10061927/',
  },
  {
    id: 4, // Craft [10]
    kurz: 'Statista, Länder mit dem größten Gender Gap 2025',
    voll: 'Statista: Länder mit dem größten Gender Gap 2025.',
    url: 'https://de.statista.com/statistik/daten/studie/1325161/umfrage/laender-mit-dem-groessten-gender-gap/',
  },
  {
    id: 5, // Craft [12]
    kurz: 'BMZ, Länderseite Tschad',
    voll: 'Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung (BMZ): Tschad.',
    url: 'https://www.bmz.de/de/laender/tschad',
  },

  // ---- Vorbilder / Skandinavien / Island ----
  {
    id: 6, // Craft [5]
    kurz: 'Süddeutsche Zeitung, „Islands Frauen als Vorbilder“',
    voll: 'Süddeutsche Zeitung: Gleichstellungsbericht des Weltwirtschaftsforums, Islands Frauen als Vorbilder.',
    url: 'https://www.sueddeutsche.de/panorama/gleichstellungsbericht-des-weltwirtschaftsforums-islands-frauen-als-vorbilder-1.1803763',
  },
  {
    id: 7, // Craft [6]
    kurz: 'Stern, „Was wir von Island lernen können“',
    voll: 'Stern: Island, Das können wir in Sachen Gleichberechtigung lernen.',
    url: 'https://www.stern.de/neon/wilde-welt/gesellschaft/damenwahl/island--das-koennen-wir-in-sachen-gleichberechtigung-lernen-8532184.html',
  },
  {
    id: 8, // Craft (Spitzenländer [8])
    kurz: 'RKW Kompetenzzentrum, berufliche Gleichberechtigung in Island',
    voll: 'RKW Kompetenzzentrum: Der Blick über den Tellerrand, Island, das Land in dem berufliche Gleichberechtigung funktioniert.',
    url: 'https://www.rkw-kompetenzzentrum.de/fachkraeftesicherung/blog-1/der-blick-ueber-den-tellerrand-island-das-land-in-dem-berufliche-gleichberechtigung-funktioniert/',
  },
  {
    id: 9, // Craft [7]
    kurz: 'Hans-Böckler-Stiftung, „Warum Skandinavien sozialer ist“',
    voll: 'Hans-Böckler-Stiftung (Böckler Impuls): Warum Skandinavien sozialer ist.',
    url: 'https://www.boeckler.de/de/boeckler-impuls-warum-skandinavien-sozialer-ist-7998.htm',
  },
  {
    id: 10, // Craft (Spitzenländer [4])
    kurz: 'WOZ, Nordische Gleichstellungspolitik',
    voll: 'WOZ Die Wochenzeitung: Nordische Gleichstellungspolitik, Günstige Umstände, ergriffene Chancen.',
    url: 'https://www.woz.ch/1951/nordische-gleichstellungspolitik/guenstige-umstaende-ergriffene-chancen',
  },
  {
    id: 11, // Craft [9]
    kurz: 'Deutschlandfunk, Gleichberechtigung in Schweden',
    voll: 'Deutschlandfunk: Gleichberechtigung in Schweden, Gelobtes Land oder nur schöner Schein?',
    url: 'https://www.deutschlandfunk.de/gleichberechtigung-in-schweden-gelobtes-land-oder-nur-100.html',
  },
  {
    id: 12, // Craft (International / Finnland)
    kurz: 'bpb, Frauenwahlrecht in Finnland 1906',
    voll: 'Bundeszentrale für politische Bildung (bpb): Vor 115 Jahren, Frauen in Finnland dürfen wählen.',
    url: 'https://www.bpb.de/kurz-knapp/hintergrund-aktuell/336789/vor-115-jahren-frauen-in-finnland-duerfen-waehlen/',
  },
  {
    id: 13, // Nachrecherche (Craft: „allgemein bekanntes Fakt“ -> belegt)
    kurz: 'Tagesspiegel, Frauenquote in Norwegen',
    voll: 'Der Tagesspiegel: Frauenquote in Norwegen, 40 % in Aufsichtsräten börsennotierter Unternehmen (Gesetz seit 2003/2008).',
    url: 'https://www.tagesspiegel.de/wirtschaft/frauenquote-in-norwegen-willkommen-im-club/10999770.html',
  },
  {
    id: 14, // Craft (International / Norwegen)
    kurz: 'Deutschlandfunk, Einwandererkurse in Norwegen',
    voll: 'Deutschlandfunk: Einwandererkurse in Norwegen, Frauen respektieren lernen.',
    url: 'https://www.deutschlandfunk.de/einwandererkurse-in-norwegen-frauen-respektieren-lernen-100.html',
  },

  // ---- Definition / „Generelles“ (Craft: nur Link-Pool, hier den Aussagen zugeordnet) ----
  {
    id: 15, // Craft Generelles-Pool
    kurz: 'bpb, Gender Pay Gap',
    voll: 'Bundeszentrale für politische Bildung (bpb): Geschlechterungleichheiten, Gender Pay Gap.',
    url: 'https://www.bpb.de/themen/arbeit/arbeitsmarktpolitik/318555/geschlechterungleichheiten-gender-pay-gap/',
  },
  {
    id: 16, // Craft Generelles-Pool
    kurz: 'female-resources.de, Gender Care Gap',
    voll: 'female-resources.de: Gender Care Gap, Ursachen und Auswirkungen.',
    url: 'https://female-resources.de/gender-care-gap-ursachen-und-auswirkungen/',
  },
  {
    id: 17, // Craft Generelles-Pool
    kurz: 'Bundesstiftung Gleichstellung, Geschlechtersegregation',
    voll: 'Bundesstiftung Gleichstellung: Geschlechtersegregation am Arbeitsmarkt.',
    url: 'https://www.bundesstiftung-gleichstellung.de/wissen/themenfelder/geschlechtersegregation-am-arbeitsmarkt/',
  },
  {
    id: 18, // Craft Generelles-Pool
    kurz: 'Antidiskriminierungsstelle, Gleichbehandlung im Arbeitsleben',
    voll: 'Antidiskriminierungsstelle des Bundes: Gleichbehandlung der Geschlechter im Arbeitsleben.',
    url: 'https://www.antidiskriminierungsstelle.de/DE/ueber-diskriminierung/lebensbereiche/arbeitsleben/gleichbehandlung-der-geschlechter/gleichbehandlung-der-geschlechter-node.html',
  },
  {
    id: 19, // Craft Generelles-Pool
    kurz: 'bpb, Ungleichheiten zwischen Frauen und Männern',
    voll: 'Bundeszentrale für politische Bildung (bpb): Ungleichheiten zwischen Frauen und Männern (Sozialer Wandel in Deutschland).',
    url: 'https://www.bpb.de/shop/zeitschriften/izpb/sozialer-wandel-in-deutschland-324/198038/ungleichheiten-zwischen-frauen-und-maennern/',
  },
  {
    id: 20, // Craft Generelles-Pool
    kurz: 'KfW Entwicklungsbank, Gender-Ungleichheit',
    voll: 'KfW Entwicklungsbank: Gender-Ungleichheit (Ökonomische Kurzanalyse).',
    url: 'https://www.kfw-entwicklungsbank.de/PDF/Download-Center/PDF-Dokumente-Development-Research/2020_05_15_EK_Gender-Ungleichheit_DE.pdf',
  },

  // ---- Stimmen / Zitate ----
  {
    id: 21, // Craft (Mögliche Zitate)
    kurz: 'internationales literaturfestival berlin, C. N. Adichie',
    voll: 'internationales literaturfestival berlin: Chimamanda Ngozi Adichie (Autorenporträt).',
    url: 'https://literaturfestival.com/authors/chimamanda-adichie/',
  },
  {
    id: 22, // Craft (Mögliche Zitate)
    kurz: 'For Harriet, Zitate von C. N. Adichie',
    voll: 'For Harriet: 10 Essential Quotes from Feminist Icon Chimamanda Ngozi Adichie.',
    url: 'http://theculture.forharriet.com/2015/09/10-life-giving-quotes-from-feminist.html',
  },
  {
    id: 23, // Craft (Mögliche Zitate / Rotsocken)
    kurz: 'Frankfurter Rundschau, Islands Frauenstreik 1975',
    voll: 'Frankfurter Rundschau: Islands Frauenstreik setzt bis heute Zeichen für Gleichstellung („Ohne Frauen geht es nicht“).',
    url: 'https://www.fr.de/panorama/islands-frauenstreik-setzt-bis-heute-zeichen-fuer-gleichstellung-94001543.html',
  },
  {
    id: 24, // Craft (Mögliche Zitate / Lindgren)
    kurz: 'Frauenkultur Leipzig, Zitate von Frauen',
    voll: 'Frauenkultur Leipzig: Zitate von Frauen (u. a. Astrid Lindgren).',
    url: 'https://www.frauenkultur-leipzig.de/angebote/aktuelle-projekte/zitate-von-frauen/',
  },

  // ---- Rückschritte / aktuelle Entwicklung ----
  {
    id: 25, // Craft (Rückschritte)
    kurz: 'tagesschau.de, UN Women zu Frauenrechten',
    voll: 'tagesschau.de: UN Women, Kein Land der Welt hat die rechtliche Gleichstellung erreicht.',
    url: 'https://www.tagesschau.de/ausland/amerika/un-frauenrechte-100.html',
  },
  {
    id: 26, // Craft (Rückschritte)
    kurz: 'bpb, Weltfrauentag und Geschlechterungleichheit',
    voll: 'Bundeszentrale für politische Bildung (bpb): Weltfrauentag und Geschlechterungleichheit.',
    url: 'https://www.bpb.de/kurz-knapp/hintergrund-aktuell/560091/weltfrauentag-und-geschlechterungleichheit/',
  },

  // ---- Ungleichheit gegenüber Männern ----
  {
    id: 27, // Craft (Männer [1])
    kurz: 'SRF, Gleichberechtigung erhöht Druck auf Männer',
    voll: 'SRF Wissen: Geschlechterklischees, je gleichberechtigter, desto mehr Druck für Männer.',
    url: 'https://www.srf.ch/wissen/mensch/geschlechterklischees-je-gleichberechtigter-desto-mehr-druck-fuer-maenner',
  },
  {
    id: 28, // Craft (Männer [2])
    kurz: 'connecticum, Diskriminierung von Männern am Arbeitsplatz',
    voll: 'connecticum Karriere-News: 20 Prozent der Männer fühlen sich am Arbeitsplatz diskriminiert.',
    url: 'https://www.connecticum.de/karriere-news/20-prozent-der-maenner-fuehlen-sich-am-arbeitsplatz-diskriminiert.article.1018.html',
  },
  {
    id: 29, // Craft (Männer [11])
    kurz: 'BMFSFJ, Männer-Perspektiven',
    voll: 'Bundesministerium für Familie, Senioren, Frauen und Jugend (BMFSFJ): Männer-Perspektiven, auf dem Weg zu mehr Gleichstellung.',
    url: 'https://www.bmbfsfj.bund.de/resource/blob/115580/5a9685148523d2a4ef12258d060528cd/maenner-perspektiven-auf-dem-weg-zu-mehr-gleichstellung-data.pdf',
  },

  // ---- Zeitstrahl ----
  {
    id: 30, // Craft (Zeitstrahl [1])
    kurz: 'timelines.me, Women’s Rights: A Global Timeline',
    voll: 'timelines.me: Women’s Rights, A Global Timeline.',
    url: 'https://timelines.me/editorial/women-s-rights-a-global-timeline',
  },
  {
    id: 31, // Craft (Zeitstrahl [5])
    kurz: 'Deutscher Bundestag, Einführung des Frauenwahlrechts',
    voll: 'Deutscher Bundestag: Einführungsdaten des Frauenwahlrechts in europäischen Ländern.',
    url: 'https://www.bundestag.de/besuche/ausstellungen/pol_parl/frauenwahlrecht/einfuehrung-246998',
  },
  {
    id: 32, // Craft (Zeitstrahl [8])
    kurz: 'UN Women Deutschland, SDG 5',
    voll: 'UN Women Deutschland: SDG 5, Gleichstellung der Geschlechter.',
    url: 'https://unwomen.de/sdg-5-gleichstellung-der-geschlechter/',
  },
  {
    id: 33, // Craft (MeToo [1])
    kurz: '„Gemeinsam gegen Sexismus“, #MeToo',
    voll: 'Bündnis „Gemeinsam gegen Sexismus“: Glossar, #MeToo.',
    url: 'https://gemeinsam-gegen-sexismus.de/glossar-posts/metoo/',
  },
  {
    id: 34, // Craft (Iran [2])
    kurz: 'Amnesty International, Iran „Frau, Leben, Freiheit“',
    voll: 'Amnesty International: Iran, Repression, ziviler Widerstand und „Frau, Leben, Freiheit“.',
    url: 'https://www.amnesty.de/informieren/amnesty-journal/iran-repression-ziviler-widerstand-frauen-leben-freiheit',
  },
];

export function getSource(id: number): Source | undefined {
  return sources.find((s) => s.id === id);
}
