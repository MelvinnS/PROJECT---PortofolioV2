import React from 'react';
import { ArrowUpRight, Target } from 'lucide-react';
import './Hero.css';

// Delay (ms) tiap elemen — urutan: anotasi → name box → sticker → tags → headline per kata → CTA
const inDelay = (ms: number) => ({ '--in': `${ms}ms` } as React.CSSProperties);

const LINE_1 = ['I', 'design', '&', 'build', 'software', 'that'];
const LINE_2 = ['gets', 'out', 'of', 'your', 'way.'];
const WORD_START = 720;
const WORD_STEP = 75;

export const Hero: React.FC = () => {
  return (
    <section id="home" className="sb-hero">
      <div className="sb-hero-inner">

        {/* Handwritten annotation above name */}
        <div className="sb-anno sb-anno-name" data-in style={inDelay(0)}>my name is</div>

        {/* Name box + side stickers */}
        <div className="sb-name-row">
          <div className="sb-name-wrap">
            <span className="sb-sticker sb-sticker-tl" data-in style={inDelay(680)}>Mobile Developer</span>
            <div className="sb-name-box" data-in style={inDelay(140)}>
              <h1>MELVIN</h1>
            </div>
            <span className="sb-sticker sb-sticker-tr" data-in style={inDelay(820)}>Web Developer</span>
          </div>
        </div>

        {/* Row under name box: role tags + availability dot */}
        <div className="sb-tags-row">
          <span className="sb-tag sb-tag-yellow" data-in style={inDelay(950)}>Frontend Developer</span>
          <span className="sb-dot-text" data-in style={inDelay(1050)}>
            <span className="sb-dot" /> OPEN FOR OPPORTUNITIES
          </span>
          <span className="sb-tag sb-tag-mint" data-in style={inDelay(1150)}>UI/UX Designer</span>
        </div>

        {/* Headline — muncul kata per kata */}
        <h2 className="sb-headline" aria-label="I design & build software that gets out of your way.">
          {LINE_1.map((w, i) => (
            <React.Fragment key={`a${i}`}>
              <span className="sb-word" data-in aria-hidden="true" style={inDelay(WORD_START + i * WORD_STEP)}>{w}</span>{' '}
            </React.Fragment>
          ))}
          <span className="sb-word" data-in aria-hidden="true" style={inDelay(WORD_START + LINE_1.length * WORD_STEP)}>
            <Target className="sb-headline-icon" />
          </span>
          <br />
          {LINE_2.map((w, i) => (
            <React.Fragment key={`b${i}`}>
              <span
                className="sb-word"
                data-in
                aria-hidden="true"
                style={inDelay(WORD_START + (LINE_1.length + 1 + i) * WORD_STEP)}
              >
                {w}
              </span>{' '}
            </React.Fragment>
          ))}
          <span
            className="sb-word sb-headline-emoji"
            data-in
            aria-hidden="true"
            style={inDelay(WORD_START + (LINE_1.length + 1 + LINE_2.length) * WORD_STEP)}
          >
            🌸
          </span>
        </h2>

        {/* CTA */}
        <a href="#about" className="sb-cta" data-in style={inDelay(1900)}>
          <span className="sb-cta-icon"><ArrowUpRight className="w-4 h-4" /></span>
          ABOUT ME
        </a>
      </div>

      {/* Wavy hand-drawn divider — tergambar dari kiri ke kanan */}
      <svg className="sb-divider" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path className="sb-divider-path" pathLength={1} d="M0,20 Q300,0 600,20 T1200,20" fill="none" stroke="#141414" strokeWidth="1.5" />
      </svg>
    </section>
  );
};
