#!/usr/bin/env python3
"""Erzeugt eine grobe, stilisierte Weltkarte als TS-Modul für die Astro-Seite.

Liest data/world.geo.json (180 Länder, ISO3 als feature.id) und projiziert alle
Landflächen equirektangular in einen kompakten SVG-Pfad. Zusätzlich werden die
projizierten Mittelpunkte (Centroids) der kuratierten Pin-Länder ausgegeben, damit
die Pins exakt zur Karte passen.

Bounds bewusst identisch zum Detail-Mockup (scripts/gen_map_mockup.py): Antarktis
ausgeblendet, gleicher Bildausschnitt.

Aufruf:  python3 scripts/gen_map_svg.py
Ausgabe: src/data/worldMap.ts
"""
import json
import os

# --- Projektion (gleiche Bounds wie gen_map_mockup.py) ---
LAT_T, LAT_B = 83.0, -56.0
LON_L, LON_R = -169.0, 190.0
VB_W = 1000.0
VB_H = round(VB_W * (LAT_T - LAT_B) / (LON_R - LON_L), 1)  # ~387.2

# Mindest-Bewegung in viewBox-Einheiten, ab der ein Punkt behalten wird ("grob").
SIMPLIFY = 1.1
# Polygone (Inseln) kleiner als diese Fläche (vB-Einheiten^2) weglassen.
MIN_AREA = 3.0

# Kuratierte Pin-Länder (ISO3) -> Centroid wird projiziert ausgegeben.
PIN_ISO = ["ISL", "FIN", "NOR", "GBR", "SWE", "NAM", "DEU",
           "IRN", "SDN", "TCD", "PAK",
           # Mittelfeld / geografische Streuung (Amerika, Asien, Ozeanien)
           "USA", "CAN", "BRA", "MNG", "JPN", "AUS"]

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, "data", "world.geo.json")
OUT = os.path.join(ROOT, "src", "data", "worldMap.ts")


def project(lon, lat):
    x = (lon - LON_L) / (LON_R - LON_L) * VB_W
    y = (LAT_T - lat) / (LAT_T - LAT_B) * VB_H
    return x, y


def ring_area(pts):
    """Shoelace-Fläche (vorzeichenlos) eines projizierten Rings."""
    a = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        a += x1 * y2 - x2 * y1
    return abs(a) / 2.0


def ring_centroid(pts):
    """Flächen-Centroid eines projizierten Rings."""
    cx = cy = a = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        cross = x1 * y2 - x2 * y1
        a += cross
        cx += (x1 + x2) * cross
        cy += (y1 + y2) * cross
    a *= 0.5
    if abs(a) < 1e-9:
        # Degeneriert -> einfacher Mittelwert.
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        return sum(xs) / len(xs), sum(ys) / len(ys)
    return cx / (6 * a), cy / (6 * a)


def simplify(pts):
    """Grobe Vereinfachung: Punkte mit zu kleiner Bewegung verwerfen."""
    if len(pts) < 4:
        return pts
    out = [pts[0]]
    for p in pts[1:-1]:
        lx, ly = out[-1]
        if abs(p[0] - lx) + abs(p[1] - ly) >= SIMPLIFY:
            out.append(p)
    out.append(pts[-1])
    return out


def fmt(v):
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s


def ring_to_subpath(ring):
    pts = [project(lon, lat) for lon, lat in ring]
    if ring_area(pts) < MIN_AREA:
        return None
    pts = simplify(pts)
    d = f"M{fmt(pts[0][0])} {fmt(pts[0][1])}"
    for x, y in pts[1:]:
        d += f"L{fmt(x)} {fmt(y)}"
    return d + "Z"


def polygons(geom):
    """Liefert alle äußeren Ringe (Löcher ignorieren wir für die grobe Optik)."""
    if geom["type"] == "Polygon":
        yield geom["coordinates"][0]
    elif geom["type"] == "MultiPolygon":
        for poly in geom["coordinates"]:
            yield poly[0]


def main():
    data = json.load(open(SRC))
    subpaths = []
    centroids = {}

    for feat in data["features"]:
        iso = feat["id"]
        geom = feat["geometry"]
        rings = list(polygons(geom))

        for ring in rings:
            sp = ring_to_subpath(ring)
            if sp:
                subpaths.append(sp)

        if iso in PIN_ISO:
            # Centroid des flächengrößten Rings (robust gegen Außengebiete).
            best, best_area = None, -1.0
            for ring in rings:
                pts = [project(lon, lat) for lon, lat in ring]
                a = ring_area(pts)
                if a > best_area:
                    best_area, best = a, pts
            cx, cy = ring_centroid(best)
            centroids[iso] = (round(cx, 1), round(cy, 1))

    missing = [i for i in PIN_ISO if i not in centroids]
    if missing:
        raise SystemExit(f"Centroid fehlt für: {missing}")

    land_path = "".join(subpaths)
    coords_lines = ",\n".join(
        f'  {iso}: {{ x: {centroids[iso][0]}, y: {centroids[iso][1]} }}'
        for iso in PIN_ISO
    )

    ts = f"""// AUTO-GENERIERT von scripts/gen_map_svg.py – NICHT von Hand bearbeiten.
// Grobe, stilisierte Weltkarte (equirektangular, Antarktis ausgeblendet).
// Quelle: data/world.geo.json. Neu erzeugen: python3 scripts/gen_map_svg.py

export const viewBox = "0 0 {fmt(VB_W)} {fmt(VB_H)}";

// Projektions-Bounds (für Pin-Positionen identisch zur Karte).
export const bounds = {{ latT: {LAT_T}, latB: {LAT_B}, lonL: {LON_L}, lonR: {LON_R} }} as const;

/** lon/lat -> Punkt im viewBox-Koordinatensystem. */
export function project(lon: number, lat: number): {{ x: number; y: number }} {{
  return {{
    x: ((lon - bounds.lonL) / (bounds.lonR - bounds.lonL)) * {fmt(VB_W)},
    y: ((bounds.latT - lat) / (bounds.latT - bounds.latB)) * {fmt(VB_H)},
  }};
}}

// Alle Landflächen als ein zusammengesetzter Pfad (eine Füllung, keine Grenzen).
export const landPath =
  "{land_path}";

// Projizierte Mittelpunkte der kuratierten Pin-Länder (viewBox-Koordinaten).
export const coords: Record<string, {{ x: number; y: number }}> = {{
{coords_lines},
}};
"""

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        f.write(ts)

    print(f"OK -> {os.path.relpath(OUT, ROOT)}")
    print(f"  viewBox 0 0 {fmt(VB_W)} {fmt(VB_H)}")
    print(f"  subpaths: {len(subpaths)}  landPath chars: {len(land_path)}")
    print(f"  pins: {len(centroids)} ({', '.join(PIN_ISO)})")


if __name__ == "__main__":
    main()
