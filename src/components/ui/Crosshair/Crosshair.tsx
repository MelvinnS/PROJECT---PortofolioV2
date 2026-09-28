'use client';

import React, { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';

const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

interface CrosshairProps {
  color?: string;
  /** Batasi crosshair di dalam elemen ini. Kalau kosong = seluruh window. */
  containerRef?: RefObject<HTMLElement | null> | null;
  /**
   * mix-blend-mode: difference. Dengan color putih, garis otomatis jadi
   * hitam di atas background terang dan terang di atas background gelap.
   */
  blend?: boolean;
}

/**
 * React Bits — Crosshair (versi disesuaikan).
 * Perbedaan dari versi asli:
 *  - posisi mouse dihitung ulang tiap frame, jadi garis tetap menempel di
 *    kursor walau halaman di-scroll tanpa menggerakkan mouse
 *  - loop requestAnimationFrame dibersihkan saat unmount
 *  - efek glitch pada link bisa dipicu berkali-kali (timeline tidak di-kill)
 *  - event link memakai delegation, jadi link yang dirender belakangan ikut kena
 */
const Crosshair: React.FC<CrosshairProps> = ({ color = 'white', containerRef = null, blend = false }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const lines = [lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean) as HTMLDivElement[];
    const container = containerRef?.current ?? null;

    const client = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let started = false;
    let visible = false;
    let raf = 0;

    gsap.set(lines, { opacity: 0 });

    const getBounds = () =>
      container
        ? container.getBoundingClientRect()
        : ({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight } as DOMRect);

    const setVisible = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      gsap.to(lines, { opacity: v ? 1 : 0, duration: v ? 0.5 : 0.25, ease: 'power3.out', overwrite: true });
    };

    const render = () => {
      const b = getBounds();
      const tx = client.x - b.left;
      const ty = client.y - b.top;
      smooth.x = lerp(smooth.x, tx, 0.15);
      smooth.y = lerp(smooth.y, ty, 0.15);

      const inside = client.x >= b.left && client.x <= b.right && client.y >= b.top && client.y <= b.bottom;
      setVisible(inside);

      if (lineVerticalRef.current) gsap.set(lineVerticalRef.current, { x: smooth.x });
      if (lineHorizontalRef.current) gsap.set(lineHorizontalRef.current, { y: smooth.y });

      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      client.x = e.clientX;
      client.y = e.clientY;
      if (!started) {
        started = true;
        const b = getBounds();
        smooth.x = client.x - b.left;
        smooth.y = client.y - b.top;
        raf = requestAnimationFrame(render);
      }
    };

    const onLeaveWindow = () => {
      client.x = -9999;
      client.y = -9999;
    };

    // ── glitch pada link ──
    const primitiveValues = { turbulence: 0 };
    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current) lineHorizontalRef.current.style.filter = 'url(#filter-noise-x)';
          if (lineVerticalRef.current) lineVerticalRef.current.style.filter = 'url(#filter-noise-y)';
        },
        onUpdate: () => {
          const v = primitiveValues.turbulence.toString();
          filterXRef.current?.setAttribute('baseFrequency', v);
          filterYRef.current?.setAttribute('baseFrequency', v);
        },
        onComplete: () => {
          if (lineHorizontalRef.current) lineHorizontalRef.current.style.filter = 'none';
          if (lineVerticalRef.current) lineVerticalRef.current.style.filter = 'none';
        }
      })
      .to(primitiveValues, { duration: 0.5, ease: 'power1', startAt: { turbulence: 1 }, turbulence: 0 });

    const inScope = (el: Element | null) => !!el && (!container || container.contains(el));

    const onOver = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a');
      if (a && inScope(a)) tl.restart();
    };
    const onOut = (e: MouseEvent) => {
      const from = (e.target as Element | null)?.closest?.('a');
      const to = (e.relatedTarget as Element | null)?.closest?.('a');
      if (from && from !== to) tl.progress(1).pause();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      tl.kill();
      gsap.killTweensOf(lines);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [containerRef]);

  return (
    <div
      ref={rootRef}
      className="cursor"
      aria-hidden="true"
      style={{
        position: containerRef ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10000,
        mixBlendMode: blend ? 'difference' : undefined
      }}
    >
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '1px',
          background: color,
          pointerEvents: 'none',
          transform: 'translateY(50%)',
          opacity: 0
        }}
      />
      <div
        ref={lineVerticalRef}
        style={{
          position: 'absolute',
          height: '100%',
          width: '1px',
          background: color,
          pointerEvents: 'none',
          transform: 'translateX(50%)',
          opacity: 0
        }}
      />
    </div>
  );
};

export default Crosshair;
