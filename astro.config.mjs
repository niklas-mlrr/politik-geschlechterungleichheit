// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://gleichstellung-weltweit.netlify.app',

  // Astro Fonts API (stabil ab v6). Ersetzt die @fontsource-@imports in global.css.
  // Vorteil gegen FOUT: Astro hostet die Schrift selbst, preloaded die kritische
  // Datei und erzeugt einen METRISCH ANGEPASSTEN Fallback (optimizedFallbacks)
  // -> beim Font-Swap kein sichtbarer Größen-/Stil-Sprung mehr.
  // Provider `npm` zieht aus den bereits installierten @fontsource-Paketen
  // (kein Netzwerk-Fetch beim Build).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Playfair Display',
      cssVariable: '--font-playfair',
      weights: [400, 600, 700, 900],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
      optimizedFallbacks: true,
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Source Sans 3',
      cssVariable: '--font-source-sans',
      weights: [400, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      optimizedFallbacks: true,
    },
  ],

  vite: {
    // Cast: @tailwindcss/vite und Astros gebündeltes Vite haben leicht abweichende
    // Plugin-Typen (Version-Mismatch). Funktional unkritisch.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
