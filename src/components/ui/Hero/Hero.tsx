import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowDown, Download, Code2, Smartphone, Palette, Video, Sparkles } from 'lucide-react';
import { TypingRole } from './TypingRole';
import { CodeEditorWidget } from './CodeEditorWidget';
import { CreativePreview } from './CreativePreview';

interface TechPill {
  icon: React.ReactNode;
  label: string;
}

const TECH_PILLS: TechPill[] = [
  { icon: <Code2 className="w-3.5 h-3.5" />,      label: 'React & Flutter' },
  { icon: <Smartphone className="w-3.5 h-3.5" />, label: 'Mobile Dev' },
  { icon: <Palette className="w-3.5 h-3.5" />,    label: 'UI/UX Design' },
  { icon: <Video className="w-3.5 h-3.5" />,      label: 'Video & Film' },
];

// Max pixel shift for parallax
const PARALLAX_STRENGTH = 14;

export const Hero: React.FC = () => {
  const rightColRef = useRef<HTMLDivElement>(null);
  const frameRef    = useRef<number | null>(null);
  const targetRef   = useRef({ x: 0, y: 0 });
  const currentRef  = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    // Normalise to [-1, 1]
    const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    targetRef.current = { x: nx * PARALLAX_STRENGTH, y: ny * PARALLAX_STRENGTH };
  }, []);

  useEffect(() => {
    // Disable on touch/mobile
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    const animate = () => {
      const cur = currentRef.current;
      const tar = targetRef.current;
      // Lerp
      cur.x += (tar.x - cur.x) * 0.06;
      cur.y += (tar.y - cur.y) * 0.06;

      if (rightColRef.current) {
        rightColRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [onMouseMove]);

  return (
    <section id="home" className="hero2">
      <div className="hero2-inner">

        {/* ── LEFT COLUMN ─────────────────────────────────── */}
        <div className="hero2-left">

          {/* Eyebrow */}
          <div className="eyebrow hero2-fade" style={{ '--delay': '0ms' } as React.CSSProperties}>
            <span className="dot" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 className="hero2-name hero2-fade" style={{ '--delay': '80ms' } as React.CSSProperties}>
            Melvin Andrea{' '}
            <span className="grad-text">Ismiananta</span>
          </h1>

          {/* Typing role */}
          <p className="hero2-role hero2-fade" style={{ '--delay': '160ms' } as React.CSSProperties}>
            <TypingRole />
          </p>

          {/* Intro */}
          <p className="hero2-intro hero2-fade" style={{ '--delay': '240ms' } as React.CSSProperties}>
            Turning ideas into real digital products — where clean code meets
            thoughtful design and visual storytelling.
          </p>

          {/* Tech pills */}
          <div className="hero2-pills hero2-fade" style={{ '--delay': '320ms' } as React.CSSProperties}>
            {TECH_PILLS.map((pill) => (
              <span key={pill.label} className="hero2-pill">
                {pill.icon}
                {pill.label}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hero-buttons hero2-fade" style={{ '--delay': '400ms' } as React.CSSProperties}>
            <a href="#projects" className="btn btn-primary">
              <ArrowDown className="w-4 h-4" /> View Projects
            </a>
            <a
              href="/assets/CV ATS(rpl).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </div>
        </div>

        {/* ── RIGHT COLUMN (Overlapping Stacked Composition) ── */}
        <div
          className="hero2-right hero2-fade"
          style={{ '--delay': '200ms' } as React.CSSProperties}
          ref={rightColRef}
        >
          <div className="hero2-stack">
            {/* Tilted Floating Accent Badge */}
            <div className="hero2-floating-badge">
              <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span>UI/UX & Code</span>
            </div>

            {/* Primary Base: Code Editor */}
            <CodeEditorWidget />

            {/* Overlapping Tilted Creative Card */}
            <CreativePreview />
          </div>
        </div>

      </div>
    </section>
  );
};
