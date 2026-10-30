import { useEffect } from 'react';

/* Site-wide animated backdrop: slow drifting light, a faint silk wave, and a soft glow that
   follows the pointer. Purely decorative, sits behind everything, respects reduced-motion. */
export default function BgFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(hover: hover)').matches) return undefined;
    const root = document.documentElement;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
        // per-card glow
        const card = e.target.closest?.('.pcard .pimg, .val, .cat, .c-tile, .how-step');
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--px', `${e.clientX - r.left}px`);
          card.style.setProperty('--py', `${e.clientY - r.top}px`);
        }
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bgfx" aria-hidden="true">
      <i className="orb o1" />
      <i className="orb o2" />
      <i className="orb o3" />
      <svg className="bg-wave" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path d="M0 620 C 240 540, 420 760, 720 640 S 1200 480, 1440 600" />
        <path d="M0 680 C 260 600, 460 820, 760 700 S 1220 540, 1440 660" />
      </svg>
      <i className="spot" />
    </div>
  );
}
