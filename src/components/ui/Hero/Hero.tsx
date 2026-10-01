import React, { useRef, useCallback } from 'react';
import './Hero.css';

// ─── Text-scramble hook ────────────────────────────────────────────────────────
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const TARGET = 'MELVIN';

function useScramble(targetRef: React.RefObject<HTMLSpanElement | null>) {
  const rafRef = useRef<number | null>(null);
  const iRef = useRef<number>(0);
  const iterRef = useRef<number>(0);

  const cancel = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const scramble = useCallback(() => {
    cancel();
    iRef.current = 0;
    iterRef.current = 0;

    const step = () => {
      if (!targetRef.current) return;
      const iter = iterRef.current;
      const revealed = Math.min(iRef.current, TARGET.length);

      let output = '';
      for (let i = 0; i < TARGET.length; i++) {
        if (i < revealed) {
          output += TARGET[i];
        } else {
          output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      targetRef.current.textContent = output;

      iterRef.current += 1;
      if (iter % 2 === 0 && iRef.current < TARGET.length) {
        iRef.current += 1;
      }

      if (iRef.current < TARGET.length) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        targetRef.current.textContent = TARGET;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [cancel, targetRef]);

  const reset = useCallback(() => {
    cancel();
    if (targetRef.current) targetRef.current.textContent = TARGET;
  }, [cancel, targetRef]);

  return { scramble, reset };
}

// ─── Component ─────────────────────────────────────────────────────────────────
export const Hero: React.FC = () => {
  const nameTextRef = useRef<HTMLSpanElement>(null);
  const { scramble } = useScramble(nameTextRef);

  return (
    <section id="home" className="hero-v2">
      {/* ── Centre stack ────────────────────────────────────────── */}
      <div className="hero-v2-center">

        {/* MELVIN box */}
        <div className="hero-v2-name-wrap" data-v2-in style={{ '--v2-delay': '0ms' } as React.CSSProperties}>
          {/* Mobile Developer badge (floats above, top-left) */}
          <span className="hero-v2-badge">Mobile Developer</span>

          <div
            className="hero-v2-name-box cursor-target"
            onMouseEnter={scramble}
          >
            <span ref={nameTextRef} className="hero-v2-name-text">MELVIN</span>
          </div>
        </div>

        {/* Three pills */}
        <div className="hero-v2-pills" data-v2-in style={{ '--v2-delay': '120ms' } as React.CSSProperties}>
          <span className="hero-v2-pill hero-v2-pill-yellow">Frontend Developer</span>
          <span className="hero-v2-pill hero-v2-pill-outline">OPEN FOR OPPORTUNITIES</span>
          <span className="hero-v2-pill hero-v2-pill-teal">UI/UX Designer</span>
        </div>

        {/* Headline */}
        <h1 className="hero-v2-headline" data-v2-in style={{ '--v2-delay': '240ms' } as React.CSSProperties}>
          I design &amp; build software that<br />gets out of your way.
        </h1>

        {/* CTA */}
        <a
          href="#about"
          className="hero-v2-cta cursor-target"
          data-v2-in
          style={{ '--v2-delay': '360ms' } as React.CSSProperties}
        >
          ABOUT ME <span className="hero-v2-arrow">→</span>
        </a>
      </div>

      {/* ── Left floating card ──────────────────────────────────── */}
      <div className="hero-v2-card hero-v2-card-left" data-v2-in style={{ '--v2-delay': '480ms' } as React.CSSProperties}>
        <div className="hero-v2-browser-bar">
          <span className="hero-v2-dot hero-v2-dot-r" />
          <span className="hero-v2-dot hero-v2-dot-y" />
          <span className="hero-v2-dot hero-v2-dot-g" />
        </div>
        <p className="hero-v2-card-text">Better code, better experiences.</p>
        {/* Curved arrow */}
        <svg className="hero-v2-arrow-svg hero-v2-arrow-right" viewBox="0 0 60 50" fill="none">
          <path d="M4 4 C20 4, 52 20, 52 44" stroke="#141414" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M44 38 L52 44 L58 36" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* ── Right floating card ─────────────────────────────────── */}
      <div className="hero-v2-card hero-v2-card-right" data-v2-in style={{ '--v2-delay': '560ms' } as React.CSSProperties}>
        <div className="hero-v2-work-row">
          <span className="hero-v2-work-text">Let's work<br />together</span>
          <span className="hero-v2-work-toggle" />
        </div>
        {/* Cursor icon */}
        <svg className="hero-v2-cursor-icon" viewBox="0 0 24 24" fill="none">
          <path d="M4 2L4 18L8.5 13.5L12 20L14 19L10.5 12.5L17 12L4 2Z" fill="#141414"/>
        </svg>
        {/* Curved arrow */}
        <svg className="hero-v2-arrow-svg hero-v2-arrow-left" viewBox="0 0 60 50" fill="none">
          <path d="M56 4 C40 4, 8 20, 8 44" stroke="#141414" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M16 38 L8 44 L2 36" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* ── Bottom wavy divider ─────────────────────────────────── */}
      <svg className="hero-v2-divider" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path
          className="hero-v2-divider-path"
          pathLength={1}
          d="M0,20 Q300,0 600,20 T1200,20"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1.5"
        />
      </svg>
    </section>
  );
};
