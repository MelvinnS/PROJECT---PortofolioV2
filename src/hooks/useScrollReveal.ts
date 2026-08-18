import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 *
 * Attaches an IntersectionObserver to the given container ref. Once the
 * container (or its children with [data-sr]) enters the viewport the
 * observer adds the ".sr-visible" class, which triggers the reveal CSS
 * transition defined in index.css.
 *
 * Elements animate once and are never reset.
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>();
 *   <div ref={ref} data-sr="up"> ... </div>
 *
 *   — or for a stagger group —
 *   const ref = useScrollReveal<HTMLDivElement>();
 *   <div ref={ref}>
 *     <div data-sr="up" data-sr-delay="0">...</div>
 *     <div data-sr="up" data-sr-delay="1">...</div>
 *   </div>
 */
export function useScrollReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion at the hook level
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Make everything immediately visible
      if (ref.current) {
        const targets = ref.current.hasAttribute('data-sr')
          ? [ref.current]
          : Array.from(ref.current.querySelectorAll<HTMLElement>('[data-sr]'));
        targets.forEach((el) => el.classList.add('sr-visible'));
      }
      return;
    }

    const root = ref.current;
    if (!root) return;

    const isTarget = root.hasAttribute('data-sr');
    const targets: HTMLElement[] = isTarget
      ? [root]
      : Array.from(root.querySelectorAll<HTMLElement>('[data-sr]'));

    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Apply stagger delay from data-sr-delay attribute (0-based index)
          const delayIdx = parseInt(el.getAttribute('data-sr-delay') ?? '0', 10);
          el.style.transitionDelay = `${delayIdx * 80}ms`;
          el.classList.add('sr-visible');
          io.unobserve(el);
        });
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12,
        ...options,
      }
    );

    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return ref;
}
