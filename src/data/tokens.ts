// Design-Tokens als TS-Konstanten (für Stellen, an denen Inline-Styles / JS nötig sind,
// z. B. später Leaflet-Choropleth-Einfärbung). Quelle der Wahrheit für CSS bleibt global.css.

export const palette = {
  sand: '#F1E8DA',
  ink: '#3B2F26',
  subtext: '#8A7A66',
  card: '#E8DAC6',
  ocean: '#E3DDCF',
  clay: '#AE6A52',
  ocker: '#CBA46F',
  sage: '#5C7A6B',
} as const;

// Diverging-Skala für die Weltkarte: niedrige -> hohe Gleichstellung.
export const choropleth = {
  low: '#A8473B', // wenig Gleichstellung (Brick)
  mid: '#CD9A63', // Mitte (Ocker)
  high: '#4F7A66', // viel Gleichstellung (Grün)
} as const;

// Hilfsfunktion: Gender-Gap-Wert (0..1, 1 = vollständig geschlossen) -> Farbe.
// Wird später vom Leaflet-Island genutzt; hier schon bereitgestellt.
export function gapColor(closed: number): string {
  const t = Math.max(0, Math.min(1, closed));
  // Bereich grob am WEF-Spektrum orientiert (ca. 0.55 .. 0.93)
  const norm = Math.max(0, Math.min(1, (t - 0.55) / (0.93 - 0.55)));
  const stops = [
    { p: 0, c: choropleth.low },
    { p: 0.5, c: choropleth.mid },
    { p: 1, c: choropleth.high },
  ];
  const lerp = (a: number, b: number, f: number) => Math.round(a + (b - a) * f);
  const hex = (c: string) => [
    parseInt(c.slice(1, 3), 16),
    parseInt(c.slice(3, 5), 16),
    parseInt(c.slice(5, 7), 16),
  ];
  let lo = stops[0]!;
  let hi = stops[stops.length - 1]!;
  for (let i = 0; i < stops.length - 1; i++) {
    if (norm >= stops[i]!.p && norm <= stops[i + 1]!.p) {
      lo = stops[i]!;
      hi = stops[i + 1]!;
      break;
    }
  }
  const f = hi.p === lo.p ? 0 : (norm - lo.p) / (hi.p - lo.p);
  const [r1, g1, b1] = hex(lo.c);
  const [r2, g2, b2] = hex(hi.c);
  return `rgb(${lerp(r1!, r2!, f)}, ${lerp(g1!, g2!, f)}, ${lerp(b1!, b2!, f)})`;
}
