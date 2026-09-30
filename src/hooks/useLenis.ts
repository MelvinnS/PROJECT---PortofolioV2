import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Site-wide buttery-smooth inertia scroll (Lenis), mounted once in App.tsx.
 * Applies to every route — this is what makes About feel exactly like Home.
 * Respects prefers-reduced-motion by skipping entirely.
 */
export function useLenis() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Let in-page anchor links (data-lenis-scroll, e.g. Navbar's "#projects")
    // use Lenis' own smooth scrollTo instead of the native jump.
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72 });
    };
    document.addEventListener('click', onAnchorClick);

    // Exposed so ScrollToTop (route changes) can also use it — see App.tsx.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
