import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageTransition.css';

/* ── Pengaturan (ubah di sini kalau mau lebih cepat / lambat) ── */
const COLUMNS = 5;
const COL_DURATION = 350; // ms — lama satu kolom bergerak
const COL_STAGGER = 70; // ms — jeda antar kolom (kiri duluan)
const HOLD = 280; // ms — layar hitam bertahan sebelum terbuka
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

const CLOSED = 'inset(0 0 100% 0)'; // kolom tersembunyi
const OPEN = 'inset(0 0 0 0)'; // kolom menutup penuh
const REVEALED = 'inset(100% 0 0 0)'; // kolom sudah terbuka (menyusut ke bawah)

interface TransitionApi {
  /** Pindah halaman dengan animasi transisi. */
  go: (to: string) => void;
}

const TransitionContext = createContext<TransitionApi>({ go: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const nextFrames = (n: number) =>
  new Promise<void>((r) => {
    const step = (left: number) => (left <= 0 ? r() : requestAnimationFrame(() => step(left - 1)));
    step(n);
  });

function labelFor(to: string): string {
  const url = new URL(to, window.location.origin);
  if (url.hash) return url.hash.slice(1);
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'home';
  if (parts[0] === 'projects' && parts[1]) return 'project';
  return parts[0];
}

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const busy = useRef(false);

  const go = useCallback(
    async (to: string) => {
      const url = new URL(to, window.location.origin);
      const samePage =
        url.pathname === window.location.pathname && url.search === window.location.search;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Halaman sama (mis. hanya ganti #hash) atau reduced-motion -> tanpa transisi
      if (samePage || reduceMotion || !rootRef.current) {
        navigate(to);
        return;
      }
      if (busy.current) return;
      busy.current = true;

      const root = rootRef.current;
      const label = labelRef.current!;
      const cols = colRefs.current.filter(Boolean) as HTMLDivElement[];
      label.textContent = labelFor(to);
      root.dataset.active = 'true';
      document.documentElement.dataset.ptBusy = '1';

      // 1) COVER — kolom hitam turun dari atas, kiri ke kanan
      const cover = cols.map(
        (c, i) =>
          c.animate([{ clipPath: CLOSED }, { clipPath: OPEN }], {
            duration: COL_DURATION,
            delay: i * COL_STAGGER,
            easing: EASE,
            fill: 'both',
          }).finished
      );
      const labelIn = label.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 260,
        delay: COL_DURATION + (COLUMNS - 1) * COL_STAGGER - 120,
        easing: 'ease-out',
        fill: 'both',
      }).finished;
      await Promise.all([...cover, labelIn]);

      // 2) Ganti halaman di balik layar hitam
      navigate(to);
      await nextFrames(2);
      await wait(HOLD);

      // 3) REVEAL — kolom menyusut ke bawah, halaman baru terbuka dari atas
      delete document.documentElement.dataset.ptBusy;
      window.dispatchEvent(new Event('pt:reveal'));
      const reveal = cols.map(
        (c, i) =>
          c.animate([{ clipPath: OPEN }, { clipPath: REVEALED }], {
            duration: COL_DURATION,
            delay: i * COL_STAGGER,
            easing: EASE,
            fill: 'both',
          }).finished
      );
      const labelOut = label.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        easing: 'ease-in',
        fill: 'both',
      }).finished;
      await Promise.all([...reveal, labelOut]);

      // 4) Reset
      [...cols, label].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
      root.dataset.active = 'false';
      busy.current = false;
    },
    [navigate]
  );

  // Semua <a>/<Link> internal otomatis memakai transisi
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      e.preventDefault(); // React Router <Link> melewati navigasi kalau defaultPrevented
      go(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [go]);

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <div ref={rootRef} className="pt-root" data-active="false" aria-hidden="true">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              colRefs.current[i] = el;
            }}
            className="pt-col"
            style={{ left: `${(100 / COLUMNS) * i}%` }}
          />
        ))}
        <div ref={labelRef} className="pt-label" />
      </div>
    </TransitionContext.Provider>
  );
};
