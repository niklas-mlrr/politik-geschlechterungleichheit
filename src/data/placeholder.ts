// Zentrale Platzhalter-Inhalte für das statische Gerüst.
//
// WICHTIG: Die eigentlichen, ausformulierten Inhalte liegen in Craft und werden später
// eingepflegt. Hier steht nur deutscher Platzhalter-Text ("Lorem"-Ersatz).
// AUSNAHME: strukturfeste Kernzahlen aus CLAUDE.md (132 Jahre, Top/Bottom 5, ...) dürfen
// als Demo-Werte erscheinen, da sie das Layout tragen.

const LOREM =
  'Platzhaltertext. An dieser Stelle steht später der ausformulierte Inhalt aus der ' +
  'Recherche. Der Text dient nur dazu, Umbruch, Rhythmus und Lesbarkeit der Sektion ' +
  'beurteilen zu können.';

const LOREM_SHORT = 'Platzhalter. Inhalt folgt aus der Recherche.';

export interface Quote {
  text: string;
  author: string;
  role: string;
  source?: number; // Index in sources.ts
}

export interface Steckbrief {
  name: string;
  ort: string; // wird neben dem Ort-Pin angezeigt
  rolle: string;
  zeilen: string[]; // Stichpunkte / Kurzbiografie
}

export interface TimelineEvent {
  jahr: string;
  ort: string;
  titel: string;
  text: string;
}

export interface CountryStat {
  land: string;
  platz: number;
  closed: number; // Anteil geschlossener Gender Gap (0..1)
  kurz: string;
}

// Markierter Punkt auf der Weltkarte (Pin -> Infokarte).
export interface MapPunkt {
  iso3: string; // join mit coords aus worldMap.ts (Pin-Position)
  land: string;
  platz: number; // Rang von 148
  closed: number; // Anteil geschlossener Gender Gap (0..1)
  kategorie: 'vorbild' | 'schlusslicht';
  kurz: string; // 1–2 Sätze für die Infokarte
}

// ---------- Kernzahlen (strukturfest, CLAUDE.md) ----------
export const kernzahlen = {
  jahreBisGleichstellung: 132,
  weltdurchschnittClosed: 0.685, // 68,5 %
  offenAnteil: 0.315, // 31,5 %
  deutschlandPlatz: 9,
  deutschlandClosed: 0.803,
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
  intro: LOREM,
  bereiche: [
    { titel: 'Wirtschaftliche Teilhabe', text: LOREM },
    { titel: 'Bildung', text: LOREM },
    { titel: 'Gesundheit', text: LOREM },
    { titel: 'Politische Teilhabe', text: LOREM },
    { titel: 'Gesellschaftliche Teilhabe', text: LOREM },
  ],
};

// ---------- Globaler Überblick / Karte ----------
export const karte = {
  intro:
    'Die Weltkarte ist das Herzstück: Vorbilder und Schlusslichter im direkten ' +
    'Vergleich. Tippe einen Punkt an, um Platzierung und Hintergrund des Landes zu sehen.',
  hinweis: 'Punkt antippen für Details',
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
    },
    {
      iso3: 'FIN', land: 'Finnland', platz: 2, closed: 0.879, kategorie: 'vorbild',
      kurz: 'Starke soziale Sicherung und sehr gute Kinderbetreuung ermöglichen eine ' +
        'hohe Frauenerwerbstätigkeit und politische Teilhabe.',
    },
    {
      iso3: 'NOR', land: 'Norwegen', platz: 3, closed: 0.863, kategorie: 'vorbild',
      kurz: '40-%-Frauenquote in Aufsichtsräten sowie großzügige Elternzeit- und ' +
        'Kitasysteme verbinden Beruf und Familie.',
    },
    {
      iso3: 'GBR', land: 'Großbritannien', platz: 4, closed: 0.838, kategorie: 'vorbild',
      kurz: 'Im Ranking gegenüber dem Vorjahr gestiegen; starke Vertretung von Frauen ' +
        'in Politik und Wirtschaft.',
    },
    {
      iso3: 'SWE', land: 'Schweden', platz: 6, closed: 0.817, kategorie: 'vorbild',
      kurz: 'Offiziell feministische Regierungspolitik und geschlechtsneutrale ' +
        'Erziehung in Kitas.',
    },
    {
      iso3: 'NAM', land: 'Namibia', platz: 8, closed: 0.811, kategorie: 'vorbild',
      kurz: 'Einziges Land außerhalb Europas unter den Top 10 – mit hoher politischer ' +
        'Teilhabe von Frauen.',
    },
    {
      iso3: 'DEU', land: 'Deutschland', platz: 9, closed: 0.803, kategorie: 'vorbild',
      kurz: 'Gute Bildungschancen, aber noch Nachholbedarf im Berufsleben und bei ' +
        'Führungspositionen.',
    },
    {
      iso3: 'IRN', land: 'Iran', platz: 145, closed: 0.583, kategorie: 'schlusslicht',
      kurz: 'Gesetzliche und gesellschaftliche Einschränkungen von Frauenrechten: ' +
        'Bewegungsfreiheit, Berufswahl und Bildung sind stark begrenzt.',
    },
    {
      iso3: 'SDN', land: 'Sudan', platz: 146, closed: 0.570, kategorie: 'schlusslicht',
      kurz: 'Bürgerkrieg seit 2023 verschärft die Lage massiv; Frauen sind besonders ' +
        'von sexueller Gewalt und Hunger betroffen.',
    },
    {
      iso3: 'TCD', land: 'Tschad', platz: 147, closed: 0.571, kategorie: 'schlusslicht',
      kurz: 'Armut, Konflikte und Krisen in der Sahelzone; sehr geringe Bildungs- und ' +
        'Teilhabechancen für Mädchen und Frauen.',
    },
    {
      iso3: 'PAK', land: 'Pakistan', platz: 148, closed: 0.567, kategorie: 'schlusslicht',
      kurz: 'Niedrigster Wert weltweit: sehr geringe Frauenerwerbstätigkeit, ' +
        'traditionelle Rollenbilder, eingeschränkte Bildung für Mädchen.',
    },
  ] satisfies MapPunkt[],
};

// ---------- Vorbilder ----------
export const vorbilder = {
  intro: LOREM,
  laender: [
    { land: 'Island', platz: 1, closed: 0.926, kurz: LOREM_SHORT },
    { land: 'Finnland', platz: 2, closed: 0.879, kurz: LOREM_SHORT },
    { land: 'Norwegen', platz: 3, closed: 0.863, kurz: LOREM_SHORT },
    { land: 'Schweden', platz: 5, closed: 0.817, kurz: LOREM_SHORT },
  ] satisfies CountryStat[],
};

// ---------- Schlusslichter ----------
export const schlusslichter = {
  intro: LOREM,
  laender: [
    { land: 'Pakistan', platz: 148, closed: 0.567, kurz: LOREM_SHORT },
    { land: 'Sudan', platz: 147, closed: 0.57, kurz: LOREM_SHORT },
    { land: 'Tschad', platz: 146, closed: 0.571, kurz: LOREM_SHORT },
    { land: 'Iran', platz: 145, closed: 0.583, kurz: LOREM_SHORT },
  ] satisfies CountryStat[],
};

// ---------- Ursachenmuster ----------
export const ursachen = {
  intro: LOREM,
  muster: [
    { titel: 'Gemeinsamkeit eins', text: LOREM },
    { titel: 'Gemeinsamkeit zwei', text: LOREM },
    { titel: 'Gemeinsamkeit drei', text: LOREM },
  ],
};

// ---------- Zeitstrahl ----------
export const zeitstrahl = {
  intro: LOREM,
  ereignisse: [
    { jahr: '19XX', ort: 'Ort', titel: 'Ereignis-Platzhalter', text: LOREM },
    { jahr: '19XX', ort: 'Ort', titel: 'Ereignis-Platzhalter', text: LOREM },
    { jahr: '20XX', ort: 'Ort', titel: 'Ereignis-Platzhalter', text: LOREM },
    { jahr: '20XX', ort: 'Ort', titel: 'Ereignis-Platzhalter', text: LOREM },
  ] satisfies TimelineEvent[],
};

// ---------- Stimmen ----------
export const stimmen = {
  intro: LOREM,
  grossesZitat: {
    text:
      'Hier steht später ein starkes, vollflächiges Zitat. Bis dahin füllt dieser ' +
      'Platzhalter die Sektion, damit Typografie und Wirkung beurteilbar sind.',
    author: 'Platzhalter Person',
    role: 'Rolle / Kontext',
  } satisfies Quote,
  biografien: [
    {
      name: 'Platzhalter Person',
      ort: 'Island',
      rolle: 'Rolle / Kontext',
      zeilen: [LOREM_SHORT, LOREM_SHORT, LOREM_SHORT],
    },
    {
      name: 'Platzhalter Person',
      ort: 'Australien',
      rolle: 'Rolle / Kontext',
      zeilen: [LOREM_SHORT, LOREM_SHORT, LOREM_SHORT],
    },
  ] satisfies Steckbrief[],
  weitereZitate: [
    { text: LOREM_SHORT, author: 'Platzhalter Person', role: 'Rolle' },
    { text: LOREM_SHORT, author: 'Platzhalter Person', role: 'Rolle' },
  ] satisfies Quote[],
};

// ---------- Quellen & Methodik ----------
export const quellenMethodik = {
  methodik: LOREM,
};
