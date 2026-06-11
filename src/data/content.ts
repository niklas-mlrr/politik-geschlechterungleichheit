// Zentrale Inhalte der Website – aus der Craft-Seite „Inhalte“ übernommen.
//
// QUELLEN-PFLICHT: Jedes faktentragende Item trägt ein Pflichtfeld `quellen: number[]`
// (IDs aus sources.ts). TypeScript erzwingt das strukturell, `scripts/check-sources.mjs`
// prüft es zusätzlich (jede ID existiert, keine Quelle ist verwaist).
//
// Re-Sync-Workflow (Craft -> hier) siehe CLAUDE.md, Abschnitt „Content-Sync“.
// Editorische Rahmen-/Einleitungssätze (`intro`) enthalten bewusst KEINE überprüfbaren
// Einzelfakten – alle belegbaren Aussagen stehen in den quellen-tragenden Items.
//
// Platzhalter-Mechanik (für noch leere Craft-Bereiche): Ein Item mit `quellen: []`
// UND einem Text, der PLATZHALTER_MARKER enthält, wird vom Check als „wartet auf Craft“
// gemeldet statt als Fehler. Aktuell sind alle Sektionen befüllt -> kein Platzhalter aktiv.

export const PLATZHALTER_MARKER = '[Platzhalter]';

// ---------- Schnittstellen ----------
export interface Quote {
  text: string;
  author: string;
  role: string;
  quellen: number[];
}

export interface Steckbrief {
  name: string;
  ort: string; // wird neben dem Ort-Pin angezeigt
  rolle: string;
  zeilen: string[]; // Stichpunkte / Kurzbiografie
  quellen: number[];
  /** Optionales Porträt (public/…). */
  bild?: string;
  bildAlt?: string;
  /** Kurz-Bildnachweis (Autor, Lizenz) – Pflicht, sobald bild gesetzt ist. */
  bildCredit?: string;
}

export interface TimelineEvent {
  jahr: string;
  ort: string;
  titel: string;
  text: string;
  /** Optionales Zitat für das Detail-Panel (interaktiver Zeitstrahl). */
  zitat?: string;
  /** Optionaler Bildpfad (public/…) für das Detail-Panel. */
  bild?: string;
  bildAlt?: string;
  /** Kurz-Bildnachweis (Autor, Lizenz) – Pflicht, sobald bild gesetzt ist. */
  bildCredit?: string;
  quellen: number[];
}

export interface CountryStat {
  land: string;
  platz: number;
  closed: number; // Anteil geschlossener Gender Gap (0..1)
  kurz: string;
  quellen: number[];
}

// Markierter Punkt auf der Weltkarte (Pin -> Infokarte).
export interface MapPunkt {
  iso3: string; // join mit coords aus worldMap.ts (Pin-Position)
  land: string;
  platz: number; // Rang von 148
  closed: number; // Anteil geschlossener Gender Gap (0..1)
  kategorie: 'vorbild' | 'mittel' | 'schlusslicht';
  kurz: string; // 1–2 Sätze für die Infokarte
  quellen: number[];
}

// Aussage-Block mit Titel (Definition-Bereiche, Ursachenmuster, Island-Schwerpunkt).
export interface Aussage {
  titel: string;
  text: string;
  quellen: number[];
}

// Ursachenmuster mit optionalem Foto (Zickzack-Raster der Spitzenländer).
export interface MusterPunkt extends Aussage {
  /** Optionales Foto (public/…); ohne Bild greift der PlaceholderFigure-Fallback. */
  bild?: string;
  bildAlt?: string;
  /** Kurz-Bildnachweis (Autor, Lizenz) – Pflicht, sobald bild gesetzt ist. */
  bildCredit?: string;
}

// Belegte Einzelaussage ohne Titel (Faktenlisten).
export interface Faktum {
  text: string;
  quellen: number[];
}

// ---------- Kernzahlen (strukturfest, CLAUDE.md) ----------
export const kernzahlen = {
  jahreBisGleichstellung: 132,
  weltdurchschnittClosed: 0.685, // 68,5 %
  offenAnteil: 0.315, // 31,5 %
  deutschlandPlatz: 9,
  deutschlandClosed: 0.803,
  quellen: [1] as number[], // WEF GGGR 2025
} as const;

// ---------- Hero ----------
export const hero = {
  kopfzeile: 'Soziale Ungleichheit und Geschlecht',
  claim: 'Internationale Geschlechterungleichheit',
  kernzahl: String(kernzahlen.jahreBisGleichstellung),
  kernzahlEinheit: 'Jahre',
  kernzahlUnterzeile: 'So lange dauert es im aktuellen Tempo noch bis zur globalen Gleichstellung.',
  einstieg:
    'Noch 31,5 % des weltweiten Gender Gap sind offen. Kein einziges Land hat ihn ' +
    'vollständig geschlossen. Diese Seite zeigt, wo die Welt steht und warum.',
  scrollHinweis: 'Weiter scrollen',
};

// ---------- Definition ----------
export const definition = {
  intro:
    'Geschlechterungleichheit bedeutet, dass Frauen, Männer und nicht-binäre Menschen ' +
    'nicht die gleichen Chancen, Ressourcen oder Anerkennung haben. Oft geht es dabei nicht ' +
    'um einzelne Benachteiligungen, sondern um strukturelle Muster: Regeln, Rollenbilder und ' +
    'Erwartungen wirken über lange Zeit weiter und zeigen sich in Bildung, Beruf, Einkommen ' +
    'und politischer Repräsentation. Gleichstellung heißt deshalb nicht nur „gleiche Regeln ' +
    'auf dem Papier“, sondern gleiche Chancen im echten Leben. Die folgenden Bereiche zeigen, ' +
    'wo Ungleichheit besonders sichtbar wird.',
  introQuelle: 19, // bpb: Ungleichheiten zwischen Frauen und Männern
  bereiche: [
    {
      titel: 'Lohnunterschiede',
      text:
        'Frauen verdienen im Schnitt oft weniger als Männer, auch bei vergleichbarer ' +
        'Arbeit oder ähnlicher Qualifikation. In Deutschland liegt der unbereinigte Gender ' +
        'Pay Gap seit Jahren bei rund 18 Prozent. Ein Teil davon erklärt sich durch Branche, ' +
        'Teilzeit und seltenere Führungspositionen; doch selbst bei gleicher Tätigkeit bleibt ' +
        'eine Lücke. Über ein ganzes Erwerbsleben summiert sie sich zu deutlich geringeren ' +
        'Einkommen und später zu niedrigeren Renten.',
      quellen: [15],
    },
    {
      titel: 'Care-Arbeit',
      text:
        'Frauen übernehmen weltweit häufiger unbezahlte Haus- und Sorgearbeit, etwa ' +
        'Kinderbetreuung und die Pflege von Angehörigen. Für diese Ungleichverteilung gibt ' +
        'es einen eigenen Begriff: den Gender Care Gap. Wer viel unbezahlte Sorgearbeit ' +
        'leistet, hat weniger Zeit für bezahlte Arbeit, Weiterbildung oder politisches ' +
        'Engagement. So verstärkt die Care-Lücke die Lohn- und Aufstiegslücke zusätzlich.',
      quellen: [16],
    },
    {
      titel: 'Karrierechancen',
      text:
        'In vielen Branchen sind Führungspositionen stärker mit Männern besetzt, je höher ' +
        'die Ebene, desto seltener Frauen. Der Arbeitsmarkt ist zudem stark nach Geschlecht ' +
        'aufgeteilt: Frauen und Männer arbeiten oft in verschiedenen Berufen, wobei „typisch ' +
        'weibliche“ Tätigkeiten häufig schlechter bezahlt sind. Diese Aufteilung, horizontal ' +
        'zwischen den Berufen, vertikal entlang der Hierarchie, hält Unterschiede bei ' +
        'Einkommen und Einfluss dauerhaft aufrecht.',
      quellen: [17],
    },
    {
      titel: 'Gewalt und Sicherheit',
      text:
        'Geschlechtsspezifische Gewalt bleibt in vielen Ländern ein zentrales Problem und ' +
        'schränkt die Sicherheit im Alltag ein. Sie reicht von häuslicher und sexualisierter ' +
        'Gewalt über Belästigung im öffentlichen Raum bis zu Anfeindungen im Netz. Schon die ' +
        'Angst davor verändert das Verhalten Betroffener, welche Wege sie meiden oder welche ' +
        'Chancen sie nicht wahrnehmen. Damit ist Gewalt nicht nur ein individuelles, sondern ' +
        'ein gesellschaftliches Gleichstellungsproblem.',
      quellen: [19],
    },
    {
      titel: 'Rollenbilder',
      text:
        'Traditionelle Vorstellungen davon, was „typisch weiblich“ oder „typisch männlich“ ' +
        'sei, bremsen Gleichstellung oft aus. Sie prägen schon früh, welche Spielzeuge, ' +
        'Schulfächer und Berufe als passend gelten. Im Erwachsenenleben beeinflussen sie, wer ' +
        'Sorgearbeit übernimmt und wer Karriere macht. Weil solche Bilder als „normal“ ' +
        'erscheinen, wirken sie besonders hartnäckig und werden unbewusst weitergegeben.',
      quellen: [18],
    },
    {
      titel: 'Ursachen und Folgen',
      text:
        'Hinter den einzelnen Bereichen stehen gemeinsame Ursachen: soziale Normen, ' +
        'Machtverhältnisse und geschlechtsspezifische Vorurteile, die über Generationen ' +
        'weiterwirken. Selbst dort, wo formale Gleichberechtigung längst gilt, bleibt die ' +
        'tatsächliche Gleichstellung oft zurück. Die Folgen reichen von geringerem Einkommen ' +
        'über schlechtere Gesundheit bis zu weniger politischer Teilhabe. Das schwächt nicht ' +
        'nur einzelne Menschen, sondern Gesellschaft und Wirtschaft insgesamt, weil Talente ' +
        'ungleich genutzt werden.',
      quellen: [20, 19],
    },
    {
      titel: 'Ungleichheit trifft auch Männer',
      text:
        'Gleichstellung betrifft nicht nur Frauen. Männer leben im Schnitt rund fünf Jahre ' +
        'kürzer, nehmen seltener Gesundheitsangebote wahr und haben eine deutlich höhere ' +
        'Suizidrate. Jungen schneiden in der Schule im Mittel schlechter ab, und bei ' +
        'Sorgerechtsfragen werden Väter seltener als Hauptbezugsperson anerkannt. Hinzu ' +
        'kommen die vielerorts einseitige Wehrpflicht, gefährlichere Berufe und, gerade in ' +
        'gleichberechtigteren Ländern, ein hoher Leistungsdruck. Gleichstellung bedeutet ' +
        'daher nicht, Nachteile bloß umzuverteilen, sondern starre Rollenerwartungen für alle ' +
        'Geschlechter zu lockern.',
      quellen: [27, 28, 29],
    },
  ] satisfies Aussage[],
};

// ---------- Globaler Überblick / Karte ----------
export const karte = {
  intro:
    'Die Weltkarte ist das Herzstück: Vorbilder und Schlusslichter im direkten Vergleich. ' +
    'Die Farbe eines Punktes zeigt, wie weit der Gender Gap geschlossen ist, von Rot ' +
    '(wenig) bis Grün (viel). Tippe einen Punkt an, um Platzierung und Hintergrund eines ' +
    'Landes zu sehen.',
  hinweis: 'Punkt antippen für Details',
  // Globale Eckdaten (Craft: „Globale Zahlen und Fakten“), als belegte Faktenliste.
  fakten: [
    { text: 'Kein Land hat bisher vollständige Gleichstellung erreicht.', quellen: [1] },
    {
      text: 'Weltweit sind im Schnitt erst 68,5 % des Gender Gap geschlossen, ein Drittel bleibt offen.',
      quellen: [1],
    },
    {
      text: 'Im aktuellen Tempo dauert es noch rund 132 Jahre, bis die globale Geschlechterkluft geschlossen ist.',
      quellen: [1],
    },
    {
      text: 'Europa hat weltweit den kleinsten Gender Gap; acht der Top 10 liegen in Europa.',
      quellen: [1, 2],
    },
  ] satisfies Faktum[],
  legende: {
    low: 'weniger geschlossen',
    high: 'mehr geschlossen',
    titel: 'Anteil geschlossener Gender Gap',
  },
  // Kuratierte Pins (Werte: WEF Global Gender Gap Report 2025; Texte: Craft-Recherche).
  punkte: [
    {
      iso3: 'ISL', land: 'Island', platz: 1, closed: 0.926, kategorie: 'vorbild',
      kurz: 'Seit 16 Jahren Platz 1. Gesetzliche Frauenquoten, Gleichstellung ab dem ' +
        'Kindergarten im Lehrplan, sehr hohe politische Teilhabe.',
      quellen: [1, 6, 7],
    },
    {
      iso3: 'FIN', land: 'Finnland', platz: 2, closed: 0.879, kategorie: 'vorbild',
      kurz: 'Starke soziale Sicherung und sehr gute Kinderbetreuung ermöglichen eine ' +
        'hohe Frauenerwerbstätigkeit und politische Teilhabe.',
      quellen: [1, 9],
    },
    {
      iso3: 'NOR', land: 'Norwegen', platz: 3, closed: 0.863, kategorie: 'vorbild',
      kurz: '40-%-Frauenquote in Aufsichtsräten sowie großzügige Elternzeit- und ' +
        'Kitasysteme verbinden Beruf und Familie.',
      quellen: [1, 13],
    },
    {
      iso3: 'GBR', land: 'Großbritannien', platz: 4, closed: 0.838, kategorie: 'vorbild',
      kurz: 'Im Ranking gegenüber dem Vorjahr gestiegen; starke Vertretung von Frauen ' +
        'in Politik und Wirtschaft.',
      quellen: [1, 3],
    },
    {
      iso3: 'SWE', land: 'Schweden', platz: 6, closed: 0.817, kategorie: 'vorbild',
      kurz: 'Offiziell feministische Regierungspolitik und geschlechtsneutrale ' +
        'Erziehung in Kitas.',
      quellen: [1, 11],
    },
    {
      iso3: 'NAM', land: 'Namibia', platz: 8, closed: 0.811, kategorie: 'vorbild',
      kurz: 'Einziges Land außerhalb Europas unter den Top 10, mit hoher politischer ' +
        'Teilhabe von Frauen.',
      quellen: [1, 3],
    },
    {
      iso3: 'DEU', land: 'Deutschland', platz: 9, closed: 0.803, kategorie: 'vorbild',
      kurz: 'Gute Bildungschancen, aber noch Nachholbedarf im Berufsleben und bei ' +
        'Führungspositionen.',
      quellen: [1],
    },
    {
      iso3: 'CAN', land: 'Kanada', platz: 32, closed: 0.767, kategorie: 'mittel',
      kurz: 'Vorderes Mittelfeld: gute Bildungs- und Erwerbsteilhabe, bei der ' +
        'politischen Repräsentation von Frauen aber noch Luft nach oben.',
      quellen: [1],
    },
    {
      iso3: 'USA', land: 'USA', platz: 42, closed: 0.756, kategorie: 'mittel',
      kurz: 'Nahezu geschlossene Bildungs- und Gesundheitslücke, aber schwache ' +
        'politische Teilhabe von Frauen drückt den Gesamtwert.',
      quellen: [1],
    },
    {
      iso3: 'BRA', land: 'Brasilien', platz: 72, closed: 0.720, kategorie: 'mittel',
      kurz: 'Mittelfeld Südamerikas: Fortschritte bei der politischen Teilhabe, ' +
        'aber große wirtschaftliche und regionale Unterschiede.',
      quellen: [1],
    },
    {
      iso3: 'MNG', land: 'Mongolei', platz: 65, closed: 0.728, kategorie: 'mittel',
      kurz: 'In Zentralasien vergleichsweise weit vorn und hat den Gap zuletzt ' +
        'spürbar verkleinert, vor allem bei der wirtschaftlichen Teilhabe.',
      quellen: [1],
    },
    {
      iso3: 'JPN', land: 'Japan', platz: 118, closed: 0.666, kategorie: 'mittel',
      kurz: 'Schlusslicht der G7: trotz hoher Bildung sehr wenige Frauen in ' +
        'Politik und Führungspositionen.',
      quellen: [1],
    },
    {
      iso3: 'AUS', land: 'Australien', platz: 13, closed: 0.792, kategorie: 'mittel',
      kurz: 'Deutliche Fortschritte bei der wirtschaftlichen und politischen Teilhabe ' +
        'von Frauen heben das Land auf Rang 13.',
      quellen: [1],
    },
    {
      iso3: 'IRN', land: 'Iran', platz: 145, closed: 0.583, kategorie: 'schlusslicht',
      kurz: 'Gesetzliche und gesellschaftliche Einschränkungen von Frauenrechten: ' +
        'Bewegungsfreiheit, Berufswahl und Bildung sind stark begrenzt.',
      quellen: [1],
    },
    {
      iso3: 'SDN', land: 'Sudan', platz: 147, closed: 0.570, kategorie: 'schlusslicht',
      kurz: 'Bürgerkrieg seit 2023 verschärft die Lage massiv; Frauen sind besonders ' +
        'von sexueller Gewalt und Hunger betroffen.',
      quellen: [1, 4],
    },
    {
      iso3: 'TCD', land: 'Tschad', platz: 146, closed: 0.571, kategorie: 'schlusslicht',
      kurz: 'Armut, Konflikte und Krisen in der Sahelzone; sehr geringe Bildungs- und ' +
        'Teilhabechancen für Mädchen und Frauen.',
      quellen: [1, 5],
    },
    {
      iso3: 'PAK', land: 'Pakistan', platz: 148, closed: 0.567, kategorie: 'schlusslicht',
      kurz: 'Niedrigster Wert weltweit: sehr geringe Frauenerwerbstätigkeit, ' +
        'traditionelle Rollenbilder, eingeschränkte Bildung für Mädchen.',
      quellen: [1, 3],
    },
  ] satisfies MapPunkt[],
};

// ---------- Vorbilder ----------
export const vorbilder = {
  intro:
    'An der Spitze steht eine Gruppe von Ländern, die den Gender Gap am weitesten ' +
    'geschlossen haben, angeführt von Island und den nordischen Staaten. Der Großteil der ' +
    'Spitzengruppe liegt in Europa, doch vollständig geschlossen hat die Lücke bislang kein ' +
    'Land. Was die Vorreiter verbindet, zeigt der nächste Abschnitt.',
  laender: [
    {
      land: 'Island', platz: 1, closed: 0.926,
      kurz: 'Seit 16 Jahren in Folge Platz 1 und einziges Land, das mehr als 90 % seines ' +
        'Gender Gap geschlossen hat. Hohe politische Teilhabe, gesetzliche Quoten und eine ' +
        'breit gelebte Akzeptanz greifen hier ineinander.',
      quellen: [1, 6],
    },
    {
      land: 'Finnland', platz: 2, closed: 0.879,
      kurz: 'Hohe politische Teilhabe, starke soziale Sicherung und sehr gute ' +
        'Kinderbetreuung ermöglichen eine hohe Frauenerwerbstätigkeit. Schon 1906 führte ' +
        'Finnland als erstes Land Europas das volle Frauenwahlrecht ein.',
      quellen: [1, 12],
    },
    {
      land: 'Norwegen', platz: 3, closed: 0.863,
      kurz: 'Seit 2003/2008 gesetzliche 40-%-Frauenquote in Aufsichtsräten und ein ' +
        'großzügiges Elternzeit- und Kitasystem; Integrationskurse vermitteln Zugewanderten ' +
        'die Gleichberechtigung der Geschlechter.',
      quellen: [1, 13, 14],
    },
    {
      land: 'Schweden', platz: 6, closed: 0.817,
      kurz: 'Offiziell feministische Regierungspolitik und geschlechtsneutrale Erziehung ' +
        'in Kitas. Gleichstellung gilt als Querschnittsaufgabe, die in nahezu alle ' +
        'Politikfelder hineinwirkt.',
      quellen: [1, 11],
    },
  ] satisfies CountryStat[],
  // Island als Schwerpunkt-Beispiel (Craft: detaillierte Fakten).
  islandFakten: [
    {
      titel: 'Politik',
      text:
        'Rund 40 % der Parlamentssitze und etwa die Hälfte der Ministerposten sind mit ' +
        'Frauen besetzt. In 20 bis 25 der letzten 50 Jahre stand zudem eine Frau an der ' +
        'Staatsspitze. Dass Frauen mitregieren, ist in Island also kein Ausnahmefall, ' +
        'sondern Normalität.',
      quellen: [6, 7],
    },
    {
      titel: 'Bildung',
      text:
        'Frauen sind im Hochschulbereich klar in der Mehrheit, auf 101 studierende Frauen ' +
        'kommen nur 57 Männer, also rund 64 % Frauen. Diese hohe Bildungsbeteiligung ' +
        'verschafft Frauen gute Startchancen im Beruf. Inzwischen sorgt sie sogar für ' +
        'Debatten, wie man mehr junge Männer für ein Studium gewinnt.',
      quellen: [7, 8],
    },
    {
      titel: 'Gesetze',
      text:
        'Eine gesetzliche 40-%-Quote schreibt den Frauenanteil in Führungsgremien vor. ' +
        'Unternehmen ab 25 Mitarbeitenden müssen Gleichstellungsprogramme einführen und ' +
        'regelmäßig überprüfen lassen. Gleichberechtigung ist damit nicht nur ein Appell, ' +
        'sondern eine verbindliche Pflicht.',
      quellen: [6, 8],
    },
    {
      titel: 'Gesellschaft',
      text:
        'Gleichberechtigung ist vom Kindergarten bis zur Universität Teil des Lehrplans. So ' +
        'wächst sie als Selbstverständlichkeit heran und ist gesellschaftlich breit ' +
        'akzeptiert, nicht nur auf dem Papier. Dazu kommt eine lange Tradition der ' +
        'Frauenerwerbstätigkeit, an die jede Generation anknüpft.',
      quellen: [6, 7],
    },
  ] satisfies Aussage[],
  // Übrige Top-10-Länder kompakt (Reihenfolge nach Rang).
  weitere: [
    {
      land: 'Großbritannien', platz: 4, closed: 0.838,
      kurz: 'Im Ranking gegenüber dem Vorjahr gestiegen.',
      quellen: [1, 3],
    },
    {
      land: 'Neuseeland', platz: 5, closed: 0.827,
      kurz: 'Lange Tradition von Frauen in Führungspositionen.',
      quellen: [1, 3],
    },
    {
      land: 'Republik Moldau', platz: 7, closed: 0.813,
      kurz: 'Neu unter den Top 10, nach oben geklettert.',
      quellen: [1, 3],
    },
    {
      land: 'Namibia', platz: 8, closed: 0.811,
      kurz: 'Einziges Land außerhalb Europas in den Top 10.',
      quellen: [1, 3],
    },
    {
      land: 'Deutschland', platz: 9, closed: 0.803,
      kurz: 'Gute Bildungschancen, Nachholbedarf im Berufsleben.',
      quellen: [1],
    },
    {
      land: 'Irland', platz: 10, closed: 0.801,
      kurz: 'Starkes Engagement für Gleichstellungspolitik.',
      quellen: [1],
    },
  ] satisfies CountryStat[],
};

// ---------- Schlusslichter ----------
export const schlusslichter = {
  intro:
    'Am anderen Ende der Skala stehen Länder, in denen Gleichstellung kaum vorankommt. ' +
    'Oft wirken hier mehrere Belastungen zusammen: Armut, Konflikte und stark ' +
    'eingeschränkte Rechte von Frauen. Wo diese Faktoren zusammentreffen, geraten Mädchen ' +
    'und Frauen besonders unter Druck.',
  laender: [
    {
      land: 'Pakistan', platz: 148, closed: 0.567,
      kurz: 'Niedrigster Wert weltweit: sehr geringe Frauenerwerbstätigkeit, traditionelle ' +
        'Rollenbilder und für viele Mädchen ein eingeschränkter Schulbesuch. Gerade in ' +
        'ländlichen Regionen ist der Zugang zu Bildung und Arbeit besonders begrenzt.',
      quellen: [1, 3],
    },
    {
      land: 'Sudan', platz: 147, closed: 0.570,
      kurz: 'Der Bürgerkrieg seit 2023 verschärft die Lage massiv. Frauen sind besonders ' +
        'von sexueller Gewalt und akuter Hungergefahr betroffen, während Schutzstrukturen ' +
        'weitgehend zusammengebrochen sind.',
      quellen: [1, 4],
    },
    {
      land: 'Tschad', platz: 146, closed: 0.571,
      kurz: 'Armut, Konflikte und Krisen in der Sahelzone treffen Mädchen und Frauen ' +
        'besonders hart. Terror, Dürren und Überschwemmungen verschärfen die ohnehin ' +
        'geringen Bildungs- und Teilhabechancen weiter.',
      quellen: [1, 5],
    },
    {
      land: 'Iran', platz: 145, closed: 0.583,
      kurz: 'Gesetzliche und gesellschaftliche Vorgaben begrenzen Bewegungsfreiheit, ' +
        'Berufswahl und Bildung von Frauen stark. Verstärkt wird das durch traditionelle ' +
        'Rollenbilder und strenge politische Kontrolle.',
      quellen: [1],
    },
  ] satisfies CountryStat[],
  // Bottom-10-Kontext + gemeinsame Muster (Craft).
  bottom10: {
    text:
      'Auch die übrigen Länder am Tabellenende, darunter Guinea, die DR Kongo, Niger, ' +
      'Algerien, Mali und Ägypten, eint ein ähnliches Bild. Meist treffen mehrere ' +
      'Belastungen zusammen, die sich gegenseitig verstärken.',
    quellen: [1, 3],
  } satisfies Faktum,
  gemeinsam: [
    { text: 'Hohe Armut und gewaltsame Konflikte, die Familien und staatliche Strukturen zerstören.', quellen: [1, 3] },
    { text: 'Schwache Rechtssicherheit und wenig Schutz vor Gewalt gegen Frauen.', quellen: [1, 3] },
    { text: 'Geringe Bildungsbeteiligung von Mädchen, oft schon ab der Grundschule.', quellen: [1, 3] },
    { text: 'Sehr geringe politische Teilhabe und kaum Frauen in Entscheidungspositionen.', quellen: [1, 3] },
  ] satisfies Faktum[],
};

// ---------- Ursachenmuster (Was die Spitzenländer gemeinsam haben) ----------
export const ursachen = {
  intro:
    'Die Spitzenländer sind nicht zufällig vorn. Hinter ihren Ergebnissen stehen ähnliche, ' +
    'über Jahrzehnte verfolgte politische Entscheidungen. Vier Muster tauchen bei den ' +
    'Vorreitern immer wieder auf und greifen ineinander.',
  muster: [
    {
      titel: 'Gleichstellungspolitik seit den 1960ern',
      text:
        'In den nordischen Ländern war Gleichberechtigung früher als anderswo ein ' +
        'politisches Ziel und Teil der Staatsräson. Getragen wurde sie von starken ' +
        'Sozialstaaten, die für Forderungen aus der Zivilgesellschaft, etwa Arbeiter-, ' +
        'Bäuerinnen- und Frauenbewegungen, empfänglich waren. So wurde Gleichstellung nicht ' +
        'als kurzlebiges Einzelthema, sondern als dauerhafte Aufgabe der Politik verankert.',
      bild: '/images/muster/gleichstellungspolitik.jpg',
      bildAlt: 'Frauen demonstrieren beim Frauenstreik im Zentrum von Reykjavík',
      bildCredit: 'Magnus Fröderberg/norden.org, CC BY 2.5 dk',
      quellen: [9, 10],
    },
    {
      titel: 'Kitaplätze und Vereinbarkeit',
      text:
        'Ein massiver Ausbau der Kinderbetreuung macht Beruf und Familie vereinbar und ' +
        'ermöglicht eine hohe Frauenerwerbstätigkeit. Wo verlässliche, bezahlbare Betreuung ' +
        'selbstverständlich ist, müssen sich vor allem Mütter seltener zwischen Kind und ' +
        'Karriere entscheiden. Großzügige Elternzeit, die auch Väter nutzen, verteilt die ' +
        'Sorgearbeit zusätzlich gleichmäßiger.',
      bild: '/images/muster/kitaplaetze.jpg',
      bildAlt: 'Kindergartenkinder in Norwegen am Nationalfeiertag',
      bildCredit: 'Ingvar Kjøllesdal, CC BY 2.0',
      quellen: [9, 10],
    },
    {
      titel: 'Bildung ohne finanzielle Hürden',
      text:
        'Schulen und Hochschulen ohne große finanzielle Hürden senken Klassenschranken und ' +
        'öffnen Mädchen wie Jungen den Zugang zu Bildung. Gute Bildung ist die Grundlage für ' +
        'eigenes Einkommen, wirtschaftliche Unabhängigkeit und politische Teilhabe. In den ' +
        'Spitzenländern erreichen Frauen deshalb häufig sehr hohe Bildungsabschlüsse.',
      bild: '/images/muster/bildung.jpg',
      bildAlt: 'Mathematik-Vorlesung an einer finnischen Universität in Espoo',
      bildCredit: 'Tungsten, gemeinfrei',
      quellen: [9, 10],
    },
    {
      titel: 'Frauen in Politik und Führung',
      text:
        'In allen vier nordischen Spitzenländern sitzen über 40 % Frauen im Parlament. Wo ' +
        'Frauen mitentscheiden, finden Themen wie Vereinbarkeit, Gewaltschutz und gleiche ' +
        'Bezahlung leichter den Weg in die Gesetzgebung. Entscheidend ist dabei systematische ' +
        'Politik über Jahrzehnte statt einzelner Leuchtturm-Maßnahmen.',
      bild: '/images/muster/frauen-politik.jpg',
      bildAlt:
        'Vigdís Finnbogadóttir, Islands Präsidentin und erste demokratisch gewählte ' +
        'Staatspräsidentin der Welt',
      bildCredit: 'Rob Croes / Anefo, CC BY-SA 3.0 nl',
      quellen: [6, 10],
    },
  ] satisfies MusterPunkt[],
};

// ---------- Zeitstrahl ----------
export const zeitstrahl = {
  intro:
    'Frauenrechte sind über fast zwei Jahrhunderte erkämpft worden, mit großen ' +
    'Meilensteinen, aber auch mit Rückschlägen bis in die Gegenwart. Die Stationen reichen ' +
    'von den ersten Forderungen nach Wahlrecht bis zu aktuellen Debatten. Tippe einen Knoten ' +
    'an, um mehr zu erfahren.',
  ereignisse: [
    {
      jahr: '1848', ort: 'Seneca Falls, USA', titel: 'Seneca-Falls-Konvention',
      text:
        'Beim ersten großen Frauenrechts-Treffen wurde erstmals systematisch gefordert, ' +
        'dass Frauen dieselben politischen und gesellschaftlichen Rechte erhalten wie Männer. ' +
        'Die dort verabschiedete Erklärung gilt als Geburtsstunde der organisierten ' +
        'Frauenbewegung und prägte deren Forderungen für Jahrzehnte.',
      bild: '/images/menschen/stanton.jpg',
      bildAlt: 'Elizabeth Cady Stanton, Mitorganisatorin der Seneca-Falls-Konvention',
      bildCredit: 'unbekannt, gemeinfrei',
      quellen: [30],
    },
    {
      jahr: '1893', ort: 'Neuseeland', titel: 'Erstes nationales Frauenwahlrecht',
      text:
        'Neuseeland war der erste selbstverwaltete Staat, in dem Frauen bei nationalen ' +
        'Wahlen abstimmen durften, ein Meilenstein zuerst im pazifischen Raum, nicht in ' +
        'Europa. Er zeigte, dass politische Gleichberechtigung machbar ist, und wurde zum ' +
        'Vorbild für Bewegungen in anderen Ländern.',
      bild: '/images/menschen/sheppard.jpg',
      bildAlt: 'Kate Sheppard, Anführerin der neuseeländischen Frauenwahlrechtsbewegung',
      bildCredit: 'H. H. Clifford, gemeinfrei',
      quellen: [31],
    },
    {
      jahr: '1906', ort: 'Finnland', titel: 'Volles Frauenwahlrecht in Europa',
      text:
        'Finnland war das erste Land Europas mit aktivem und passivem Frauenwahlrecht: ' +
        'Frauen durften nun nicht nur wählen, sondern auch selbst gewählt werden.',
      quellen: [12, 31],
    },
    {
      jahr: '1945', ort: 'weltweit', titel: 'UN-Charta: Gleichheit der Geschlechter',
      text:
        'Mit der UN-Charta wurde die Gleichberechtigung von Frauen und Männern als ' +
        'internationales Prinzip festgeschrieben, die Frage wurde endgültig ein weltweites ' +
        'Thema. Damit lag erstmals eine völkerrechtliche Grundlage vor, auf die sich spätere ' +
        'Abkommen und Frauenrechtsbewegungen berufen konnten.',
      quellen: [30],
    },
    {
      jahr: '1995', ort: 'Peking', titel: 'Pekinger Weltfrauenkonferenz',
      text:
        'Die Konferenz gilt als globaler Wendepunkt: Gewalt, Bildung, Gesundheit, politische ' +
        'Teilhabe und wirtschaftliche Gleichstellung wurden als zentrale internationale Aufgaben festgelegt.',
      quellen: [32],
    },
    {
      jahr: '2015', ort: 'Vereinte Nationen', titel: 'Agenda 2030 und SDG 5',
      text:
        'Mit den UN-Nachhaltigkeitszielen wurde Geschlechtergleichheit (SDG 5) ein eigenes ' +
        'globales Entwicklungsziel, Gleichstellung gehört seitdem offiziell zur Politik aller ' +
        'Staaten, nicht nur zu einzelnen nationalen Reformen. Bis 2030 sollen alle Länder ' +
        'messbare Fortschritte erzielen; der jährliche Gender Gap Report macht sie vergleichbar.',
      quellen: [32],
    },
    {
      jahr: '2017', ort: 'weltweit', titel: '#MeToo',
      text:
        'Der bereits 2006 von Tarana Burke geprägte Slogan „Me too“ verbreitete sich 2017 ' +
        'massiv und wurde zum Meilenstein für die Sichtbarkeit sexueller Gewalt und von ' +
        'Alltagssexismus, vor allem für Frauen, aber auch Männer ansprechend.',
      bild: '/images/menschen/burke.jpg',
      bildAlt: 'Tarana Burke, Begründerin der „Me too“-Bewegung',
      bildCredit: 'B.Monét Fennell, CC BY-SA 3.0',
      quellen: [33],
    },
    {
      jahr: '2022', ort: 'Iran', titel: '„Frau, Leben, Freiheit“',
      text:
        'Nach dem Tod von Jina Mahsa Amini in Polizeigewahrsam begann eine landesweite ' +
        'Protestwelle gegen Zwangsverschleierung und Diskriminierung. Das Regime reagierte ' +
        'mit massiver Gewalt, doch die Bewegung schuf weltweit Aufmerksamkeit.',
      zitat: 'Frau, Leben, Freiheit',
      bild: '/images/menschen/iran-2022.jpg',
      bildAlt: 'Solidaritätsprotest „Frau, Leben, Freiheit“ nach dem Tod von Jina Mahsa Amini',
      bildCredit: 'Matt Hrkac, CC BY 2.0',
      quellen: [34],
    },
    {
      jahr: 'seit 2020', ort: 'weltweit', titel: 'Rückschritte bei den Frauenrechten',
      text:
        'Nach Jahren des Fortschritts gibt es wieder Rückschritte: Länder schränken per ' +
        'Gesetz Frauenrechte ein, das Streichen von Gleichstellungsprogrammen in den USA wird ' +
        'vielerorts nachgeahmt, und Konflikte etwa im Sudan, in Haiti und Afghanistan ' +
        'verschärfen sexualisierte Gewalt gegen Frauen und Mädchen.',
      zitat:
        'Kein Land der Welt hat die vollständige rechtliche Gleichstellung von Frauen und ' +
        'Männern erreicht.',
      quellen: [25, 26],
    },
  ] satisfies TimelineEvent[],
};

// ---------- Stimmen ----------
export const stimmen = {
  intro:
    'Hinter den Zahlen stehen Menschen: Schriftstellerinnen, Aktivistinnen und Frauen, ' +
    'die Geschichte geschrieben haben. Ihre Worte machen greifbar, was Statistiken nur ' +
    'andeuten: dass es um Würde, Selbstbestimmung und Anerkennung im Alltag geht.',
  grossesZitat: {
    text: 'Geschlecht, wie es heute funktioniert, ist eine schwere Ungerechtigkeit.',
    author: 'Chimamanda Ngozi Adichie',
    role: 'Schriftstellerin, Nigeria (*1977)',
    quellen: [21, 22],
  } satisfies Quote,
  biografien: [
    {
      name: 'Chimamanda Ngozi Adichie',
      ort: 'Nigeria',
      rolle: 'Schriftstellerin (*1977)',
      zeilen: [
        'Eine der einflussreichsten Stimmen der internationalen Frauenbewegung.',
        'Ihr Essay „We Should All Be Feminists“ prägte die Debatte weltweit.',
        '„Kultur macht keine Menschen. Menschen machen Kultur.“',
      ],
      bild: '/images/menschen/adichie.jpg',
      bildAlt: 'Porträt von Chimamanda Ngozi Adichie',
      bildCredit: 'Wikimedia Foundation, CC0',
      quellen: [21, 22],
    },
    {
      name: 'Lilja Ólafsdóttir',
      ort: 'Island',
      rolle: 'Mitorganisatorin des Frauenstreiks 1975',
      zeilen: [
        'Bauerntochter und erste Geschäftsführerin der Reykjavíker Verkehrsbetriebe.',
        'Am Streiktag legten rund 90 % der isländischen Frauen die Arbeit nieder.',
        '„Die Hot Dogs waren ausverkauft, weil die Männer nicht wussten, was sie den ' +
          'Kindern sonst servieren sollten.“',
      ],
      bild: '/images/menschen/lilja.jpg',
      bildAlt: 'Porträt von Lilja Ólafsdóttir, Mitorganisatorin des isländischen Frauenstreiks 1975',
      bildCredit: 'Art Bicnick / Reykjavík Grapevine',
      quellen: [23],
    },
  ] satisfies Steckbrief[],
  weitereZitate: [
    {
      text: 'Wir haben nichts gefordert, sondern einfach eine Tatsache bewiesen: Frauen haben Bedeutung.',
      author: 'Hildur Hákonardóttir',
      role: 'Mitorganisatorin des isländischen Frauenstreiks 1975',
      quellen: [23],
    },
    {
      text:
        'Pippi verkörpert meine eigene kindliche Sehnsucht danach, einen Menschen zu treffen, ' +
        'der Macht besitzt, aber sie nicht missbraucht.',
      author: 'Astrid Lindgren',
      role: 'Schriftstellerin, Schweden',
      quellen: [24],
    },
  ] satisfies Quote[],
};

// ---------- Quellen & Methodik ----------
export const quellenMethodik = {
  methodik:
    'Die zentralen Kennzahlen dieser Seite stammen aus dem Global Gender Gap Report 2025 ' +
    'des World Economic Forum. Der Index misst den Abstand zwischen Frauen und Männern in ' +
    'vier Bereichen, wirtschaftliche Teilhabe, Bildung, Gesundheit und politische Teilhabe, ' +
    'und drückt ihn als Anteil des geschlossenen Gender Gap von 0 bis 100 % aus (100 % = ' +
    'volle Gleichstellung). 2025 wurden 148 Länder erfasst. Ergänzend werden für einzelne ' +
    'Aussagen weitere, jeweils am Verweis genannte Quellen herangezogen.',
  quellen: [2] as number[],
};

// ---------- Bildnachweise ----------
// Vollständige Lizenz-/Urheberangaben zu den auf der Seite verwendeten Fotos.
// Alle Bilder von Wikimedia Commons, frei lizenziert (CC bzw. gemeinfrei). Für die
// CC-BY/BY-SA-Bilder werden Urheber + Lizenz inline (figcaption) und hier mit Link genannt;
// die Auflösung wurde verändert (skaliert/zugeschnitten).
export interface Bildnachweis {
  motiv: string;
  autor: string;
  lizenz: string;
  lizenzUrl?: string;
  quelleUrl: string; // Commons-Dateiseite
}

export const bildnachweise: Bildnachweis[] = [
  {
    motiv: 'Chimamanda Ngozi Adichie (Stimmen)',
    autor: 'Wikimedia Foundation',
    lizenz: 'CC0 (gemeinfrei)',
    lizenzUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    quelleUrl:
      "https://commons.wikimedia.org/wiki/File:Chimamanda_Ngozi_Adichie_for_Women's_History_Month.jpg",
  },
  {
    motiv: 'Elizabeth Cady Stanton (Zeitstrahl 1848)',
    autor: 'unbekannt',
    lizenz: 'gemeinfrei',
    quelleUrl: 'https://commons.wikimedia.org/wiki/File:Elizabeth_Stanton.jpg',
  },
  {
    motiv: 'Kate Sheppard (Zeitstrahl 1893)',
    autor: 'H. H. Clifford',
    lizenz: 'gemeinfrei',
    quelleUrl: 'https://commons.wikimedia.org/wiki/File:Mrs._K._W._Sheppard_(cropped).jpg',
  },
  {
    motiv: 'Tarana Burke (Zeitstrahl 2017, #MeToo)',
    autor: 'Brittany „B.Monét“ Fennell',
    lizenz: 'CC BY-SA 3.0',
    lizenzUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    quelleUrl: "https://commons.wikimedia.org/wiki/File:Tarana_Burke_from_She's_Revolutionary.jpg",
  },
  {
    motiv: 'Solidaritätsprotest „Frau, Leben, Freiheit“ (Zeitstrahl 2022)',
    autor: 'Matt Hrkac',
    lizenz: 'CC BY 2.0',
    lizenzUrl: 'https://creativecommons.org/licenses/by/2.0/',
    quelleUrl:
      'https://commons.wikimedia.org/wiki/File:Solidarity_with_the_people_of_Iran_(52394248943).jpg',
  },
  {
    motiv: 'Lilja Ólafsdóttir (Stimmen)',
    autor: 'Art Bicnick / Reykjavík Grapevine',
    lizenz: 'urheberrechtlich geschützt, Nutzung nur für dieses Schulprojekt',
    quelleUrl:
      'https://grapevine.is/mag/feature/2025/10/10/fifty-years-later-push-for-equality-continues-remembering-the-strike-that-stopped-the-nation/',
  },
  {
    motiv: 'Frauenstreik in Reykjavík (Muster: Gleichstellungspolitik)',
    autor: 'Magnus Fröderberg/norden.org',
    lizenz: 'CC BY 2.5 dk',
    lizenzUrl: 'https://creativecommons.org/licenses/by/2.5/dk/',
    quelleUrl: 'https://commons.wikimedia.org/wiki/File:Kvinnostrejk_i_Reykjavik_(2).jpg',
  },
  {
    motiv: 'Kindergartenkinder in Norwegen (Muster: Kitaplätze und Vereinbarkeit)',
    autor: 'Ingvar Kjøllesdal',
    lizenz: 'CC BY 2.0',
    lizenzUrl: 'https://creativecommons.org/licenses/by/2.0/',
    quelleUrl: 'https://commons.wikimedia.org/wiki/File:Barnehage_p%C3%A5_lasteplanet.jpg',
  },
  {
    motiv: 'Vorlesung an einer finnischen Universität (Muster: Bildung)',
    autor: 'Tungsten',
    lizenz: 'gemeinfrei',
    quelleUrl:
      'https://commons.wikimedia.org/wiki/File:Mathematics_lecture_at_the_Helsinki_University_of_Technology.jpg',
  },
  {
    motiv: 'Vigdís Finnbogadóttir (Muster: Frauen in Politik und Führung)',
    autor: 'Rob Croes / Anefo',
    lizenz: 'CC BY-SA 3.0 nl',
    lizenzUrl: 'https://creativecommons.org/licenses/by-sa/3.0/nl/',
    quelleUrl: 'https://commons.wikimedia.org/wiki/File:Vigdis_Finnbogadottir_(1985).jpg',
  },
];
