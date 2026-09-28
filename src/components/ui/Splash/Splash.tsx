import React, { useEffect, useRef } from 'react';
import './Splash.css';

const NAME = 'MELVIN'.split('');
const SEGMENTS = 16;
const LOAD_MS = 1900; // lama loading
const HOLD_MS = 250; // jeda di 100% sebelum keluar
const OUT_MS = 450; // durasi fade keluar

// loading dibuat sedikit "tersendat" supaya terasa natural
const CURVE: Array<[number, number]> = [
  [0, 0],
  [0.25, 0.18],
  [0.45, 0.4],
  [0.6, 0.45],
  [0.85, 0.9],
  [1, 1]
];
const curve = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  for (let i = 1; i < CURVE.length; i++) {
    const [x1, y1] = CURVE[i];
    if (x <= x1) {
      const [x0, y0] = CURVE[i - 1];
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1);
    }
  }
  return 1;
};

let played = false;
/** true kalau splash sudah tampil di sesi halaman ini (reset saat reload). */
export const hasSplashPlayed = () => played;

interface SplashProps {
  /** dipanggil saat splash mulai memudar — pakai untuk memulai animasi masuk halaman */
  onExit?: () => void;
  onDone: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onExit, onDone }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const exitRef = useRef(onExit);
  exitRef.current = onExit;

  useEffect(() => {
    const root = rootRef.current!;
    const segs = Array.from(root.querySelectorAll<HTMLElement>('.pxs__seg'));

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let raf = 0;
    let timer = 0;
    let filled = 0;
    let leaving = false;
    let start = performance.now();

    const leave = () => {
      if (leaving) return;
      leaving = true;
      cancelAnimationFrame(raf);
      root.classList.add('pxs--out');
      exitRef.current?.();
      timer = window.setTimeout(() => {
        played = true;
        document.documentElement.style.overflow = prevOverflow;
        doneRef.current();
      }, OUT_MS);
    };
    skipRef.current = leave;

    const tick = (now: number) => {
      const p = curve((now - start) / LOAD_MS);
      const n = Math.floor(p * SEGMENTS + 1e-6);
      while (filled < n) segs[filled++]?.classList.add('on');
      if (pctRef.current) pctRef.current.textContent = `${Math.round(p * 100)}%`;

      if (p >= 1) {
        timer = window.setTimeout(leave, HOLD_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    // mulai setelah font siap (maks 700ms) agar font pixel tidak "lompat"
    let began = false;
    const begin = () => {
      if (began) return;
      began = true;
      root.classList.add('pxs--go');
      start = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const fallback = window.setTimeout(begin, 700);
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready;
    if (fonts) fonts.then(begin).catch(begin);
    else begin();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') leave();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(fallback);
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div ref={rootRef} className="pxs" role="status" aria-label="Loading portfolio" onClick={() => skipRef.current()}>
      <div className="pxs__stage">
        <h1 className="pxs__logo" aria-label="Melvin">
          {NAME.map((ch, i) => (
            <span key={i} className="pxs__letter" aria-hidden="true" style={{ '--i': i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </h1>

        <div className="pxs__loader" aria-hidden="true">
          <div className="pxs__segs">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span key={i} className="pxs__seg" />
            ))}
          </div>
          <div className="pxs__row">
            <span className="pxs__label">loading</span>
            <span ref={pctRef} className="pxs__pct">
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
