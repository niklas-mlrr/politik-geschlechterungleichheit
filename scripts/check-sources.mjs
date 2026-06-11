// Build-Check: Quellen-Pflicht für content.ts.
//
// Prüft:
//   (a) jedes faktentragende Item hat quellen.length > 0  ODER  ist als Platzhalter
//       markiert (Text enthält PLATZHALTER_MARKER) -> dann "wartet auf Craft".
//   (b) jede referenzierte Quellen-ID existiert in sources.ts.
//   (c) keine Quelle in sources.ts ist verwaist (wird nirgends referenziert).
//
// Start: `npm run check:sources` (nutzt Node-eigenes TS-Type-Stripping, Node >= 22.6).

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const content = await import(resolve(here, '../src/data/content.ts'));
const { sources } = await import(resolve(here, '../src/data/sources.ts'));

const MARKER = content.PLATZHALTER_MARKER ?? '[Platzhalter]';
const validIds = new Set(sources.map((s) => s.id));

const referenced = new Set();
const items = []; // { label, quellen, text }
const errors = [];
const warnings = [];

// Kurzes, sprechendes Label für ein Item finden.
function labelOf(obj, fallback) {
  return (
    obj.titel || obj.land || obj.name || obj.author ||
    (typeof obj.text === 'string' ? obj.text.slice(0, 48) + '…' : '') ||
    fallback
  );
}

// Rekursiv durch alle Exporte laufen und quellen/introQuelle einsammeln.
function walk(value, path) {
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${i}]`));
    return;
  }
  if (value && typeof value === 'object') {
    if (Array.isArray(value.quellen)) {
      const text = [value.text, value.kurz, value.titel, value.name, value.author]
        .filter((t) => typeof t === 'string')
        .join(' ');
      items.push({ label: labelOf(value, path), quellen: value.quellen, text, path });
      value.quellen.forEach((id) => referenced.add(id));
    }
    // Einzelne ID-Verweise (z. B. definition.introQuelle).
    if (typeof value.introQuelle === 'number') referenced.add(value.introQuelle);

    for (const [k, v] of Object.entries(value)) {
      if (k === 'quellen') continue;
      walk(v, `${path}.${k}`);
    }
  }
}

for (const [name, value] of Object.entries(content)) {
  if (name === 'PLATZHALTER_MARKER') continue;
  walk(value, name);
}

// (a) + (b)
for (const item of items) {
  if (item.quellen.length === 0) {
    if (item.text.includes(MARKER)) {
      warnings.push(`wartet auf Craft: ${item.path} (${item.label})`);
    } else {
      errors.push(`ohne Quelle: ${item.path} (${item.label})`);
    }
  }
  for (const id of item.quellen) {
    if (!validIds.has(id)) {
      errors.push(`unbekannte Quellen-ID [${id}] in ${item.path} (${item.label})`);
    }
  }
}

// (c) verwaiste Quellen
for (const s of sources) {
  if (!referenced.has(s.id)) {
    errors.push(`verwaiste Quelle [${s.id}] (${s.kurz}) – nirgends referenziert`);
  }
}

// Ausgabe
console.log(`Quellen-Check: ${items.length} Items, ${sources.length} Quellen, ` +
  `${referenced.size} davon referenziert.`);

if (warnings.length) {
  console.log(`\n⏳ Wartet auf Craft (${warnings.length}):`);
  warnings.forEach((w) => console.log('   - ' + w));
}

if (errors.length) {
  console.error(`\n❌ Fehler (${errors.length}):`);
  errors.forEach((e) => console.error('   - ' + e));
  process.exit(1);
}

console.log('\n✅ Alle Items belegt, alle IDs gültig, keine verwaisten Quellen.');
