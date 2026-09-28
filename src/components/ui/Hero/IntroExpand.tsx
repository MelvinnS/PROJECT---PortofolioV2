import React, { useState } from 'react';
import ScrollExpand from '../ScrollExpand/ScrollExpand';
import { Hero } from './Hero';
import './IntroExpand.css';

/**
 * Poster frame: satu blok gelap polos dengan grid tipis (SVG, tanpa file gambar).
 * Sengaja minimal supaya fokusnya ke judul dan hero yang terbuka.
 */
const POSTER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="880" viewBox="0 0 1584 880">' +
      '<defs><pattern id="g" width="44" height="44" patternUnits="userSpaceOnUse">' +
      '<path d="M44 0H0V44" fill="none" stroke="#ffffff" stroke-opacity=".07"/></pattern></defs>' +
      '<rect width="1584" height="880" fill="#141414"/><rect width="1584" height="880" fill="url(#g)"/></svg>'
  );

/**
 * Intro setelah splash: frame kecil yang membuka jadi layar
 * penuh saat di-scroll. Isi frame (children) = Hero itu sendiri, jadi begitu
 * frame penuh, kamu langsung berada di hero — bukan di slide terpisah.
 */
export const IntroExpand: React.FC = () => {
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  return (
    <ScrollExpand
      className="intro-expand"
      src={POSTER}
      alt=""
      title="MELVIN"
      scrollHint="scroll ▼"
      useWindowScroll
      startWidth={40}
      startHeight={54}
      startRadius={18}
      endRadius={0}
      mediaZoom={1.1}
      scrollDistance={reduce ? 0 : 1}
      holdDistance={reduce ? 0 : 0.15}
      smoothing={0.1}
      overlayScrim={0}
      enabled={!reduce}
    >
      <Hero />
    </ScrollExpand>
  );
};

export default IntroExpand;
