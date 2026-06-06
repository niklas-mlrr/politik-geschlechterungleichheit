// Platzhalter-Quellenliste. Wird von SourceTooltip (inline [n]) und der Quellen-Sektion genutzt.
// Reihenfolge = Quellen-Nummer. Echte Quellen folgen aus der Craft-Inhalte-Card.

export interface Source {
  id: number;
  kurz: string; // Anzeige im Tooltip
  voll: string; // vollständige Angabe in der Quellen-Sektion
  url?: string;
}

export const sources: Source[] = [
  {
    id: 1,
    kurz: 'WEF, Global Gender Gap Report 2025',
    voll: 'World Economic Forum: Global Gender Gap Report 2025.',
    url: 'https://www.weforum.org/',
  },
  {
    id: 2,
    kurz: 'Platzhalter-Quelle',
    voll: 'Platzhalter. Vollständige Quellenangabe folgt aus der Recherche.',
  },
  {
    id: 3,
    kurz: 'Platzhalter-Quelle',
    voll: 'Platzhalter. Vollständige Quellenangabe folgt aus der Recherche.',
  },
];

export function getSource(id: number): Source | undefined {
  return sources.find((s) => s.id === id);
}
