// Zentrale Scroll-Animationen (GSAP ScrollTrigger), einmal in Base.astro geladen.
//
// Robustheit: ausschließlich gsap.from()/gsap.to() ohne vorab per CSS verstecktes
// Markup. Lädt oder läuft GSAP nicht, bleibt der gesamte Inhalt sichtbar.
//
// prefers-reduced-motion: via gsap.matchMedia() -> bei "reduce" passiert nichts,
// alle Inhalte stehen statisch da. Parallax nur bei feinem Zeiger (Desktop),
// auf Touch (pointer: coarse) bewusst weggelassen (iPad-optimiert).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ---------- Quellen-Anker: Sprungziel vor dem Scroll fixieren ----------
// Quellen-Links (#quelle-N) führen in die Quellen-Sektion. Ist deren Reveal noch
// nicht ausgelöst (Klick von weit oben), steht der Inhalt um y:28 versetzt da.
// iOS Safari berechnet das Ziel inkl. dieses Transforms und scrollt zu weit; der
// Reveal entfernt die 28px erst danach -> "zu weit heruntergescrollt". Daher den
// Reveal der umschließenden Sektion synchron abschließen, BEVOR der native Sprung
// die Zielposition berechnet. Greift für statische wie dynamisch erzeugte Links.
document.addEventListener('click', (e) => {
  const target = e.target as Element | null;
  const link = target?.closest?.('a[href^="#quelle-"]');
  if (!link) return;
  const id = link.getAttribute('href')!.slice(1);
  const dest = document.getElementById(id);
  const revealNode = dest?.closest<HTMLElement>('[data-reveal]');
  if (!revealNode) return;
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === revealNode) st.animation?.progress(1);
  });
  gsap.set(revealNode, { clearProps: 'opacity,transform' });
});

const mm = gsap.matchMedia();

mm.add(
  {
    motion: '(prefers-reduced-motion: no-preference)',
    fine: '(pointer: fine)',
  },
  (ctx) => {
    const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
    if (!motion) return; // Reduced Motion -> keine Animationen.

    // ---------- Section-Reveals ----------
    // Jede markierte Sektion blendet beim Scroll-in sanft ein (einmalig).
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((node) => {
      gsap.from(node, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%',
          once: true,
        },
      });
    });

    // ---------- Hero-Parallax (nur Desktop / feiner Zeiger) ----------
    if (fine) {
      gsap.to('.hero-kernzahl', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  },
);
