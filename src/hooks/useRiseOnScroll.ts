import { useEffect } from 'react';
import { onPageReady } from './onPageReady';

/**
 * Scroll reveal "naik dari bawah ke atas" (tanpa scale / blur / bounce).
 * Setiap elemen dengan atribut `data-rise` mulai tersembunyi & agak di bawah,
 * lalu naik halus ke posisi aslinya (sekali saja) saat masuk viewport.
 * Stagger lewat style={{ '--rise-delay': '120ms' }}.
 * Animasinya ada di AboutPage.css.
 */
export function useRiseOnScroll() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;

    const start = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-rise]'));
      if (els.length === 0) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion || typeof IntersectionObserver === 'undefined') {
        els.forEach((el) => el.classList.add('is-risen'));
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-risen');
            io?.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      els.forEach((el) => io!.observe(el));
    };

    const cancelWait = onPageReady(start);
    return () => {
      cancelWait();
      io?.disconnect();
    };
  }, []);
}
