// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://gleichstellung-weltweit.netlify.app',
  vite: {
    // Cast: @tailwindcss/vite und Astros gebündeltes Vite haben leicht abweichende
    // Plugin-Typen (Version-Mismatch). Funktional unkritisch.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
