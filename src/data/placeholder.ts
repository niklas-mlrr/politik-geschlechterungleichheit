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
  kernzahl: '132',
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
    'Die Weltkarte ist das Herzstück: jedes Land eingefärbt nach dem Anteil des ' +
    'geschlossenen Gender Gap, von Rot (wenig) bis Grün (viel).',
  legende: {
    low: 'wenig Gleichstellung',
    mid: 'Mittelfeld',
    high: 'viel Gleichstellung',
  },
  islandHinweis: LOREM_SHORT,
};

// ---------- Daten / Charts ----------
export const charts = {
  intro: LOREM,
  balkenTitel: 'Top & Bottom 10 – Anteil geschlossener Gender Gap',
  linieTitel: 'Islands Entwicklung über die Jahre',
  projektionTitel: 'Der verbleibende Weg bis zur globalen Schließung',
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

// ---------- Rückschritte ----------
export const rueckschritte = {
  intro: LOREM,
  punkte: [
    { titel: 'Rückschritt-Platzhalter', text: LOREM },
    { titel: 'Rückschritt-Platzhalter', text: LOREM },
  ],
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
