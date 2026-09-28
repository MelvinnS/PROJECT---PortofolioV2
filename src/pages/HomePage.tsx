import React, { useRef, useState } from 'react';
import FolderFloat from '../components/ui/FolderFloat/FolderFloat';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useNavigate } from 'react-router-dom';
import {
  Code2,
  Smartphone,
  Palette,
  Mail,
  Linkedin,
  Github,
  Instagram,
  Layers,
  Terminal,
  Server,
  Film,
  Camera,
  Figma,
} from 'lucide-react';
import { creativeCategoriesData } from '../data/creativeData';
import { Hero } from '../components/ui/Hero/Hero';
import Splash, { hasSplashPlayed } from '../components/ui/Splash/Splash';
import Crosshair from '../components/ui/Crosshair/Crosshair';
import { FeaturedStack } from '../components/ui/FeaturedStack/FeaturedStack';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` } as React.CSSProperties);

const FOLDER_ITEMS = creativeCategoriesData.map((c) => ({ label: c.title, value: c.id }));

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);
  useRevealOnScroll();

  const [showSplash, setShowSplash] = useState(
    () =>
      typeof window !== 'undefined' &&
      !hasSplashPlayed() &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [entered, setEntered] = useState(() => !showSplash);
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  return (
    <main ref={mainRef} className={`relative overflow-x-hidden ${entered ? 'is-entered' : ''}`} style={{ background: '#fff' }}>

      {/* SPLASH */}
      {showSplash && <Splash onExit={() => setEntered(true)} onDone={() => setShowSplash(false)} />}

      {/* CROSSHAIR */}
      {canHover && <Crosshair containerRef={mainRef} color="#141414" blend />}

      {/* ── HERO + ABOUT (scrapbook white section) ── */}
      <div className="sb-wrap">
        <Hero />

        <section id="about" className="sb-about">
          <div className="sb-about-inner">
            <div className="sb-anno sb-anno-about">about me! ◜</div>
            <button
              onClick={() => navigate('/about')}
              className="sb-more-detail-btn"
              data-reveal
            >
              more detail ↗
            </button>

            <div className="sb-about-grid">
              <div className="sb-polaroid sb-polaroid-left" data-reveal style={delay(120)}>
                <span className="sb-tape sb-tape-tl sb-tape-blue" />
                <span className="sb-tape sb-tape-tr sb-tape-yellow" />
                <div className="sb-polaroid-img-wrap">
                  <img src="/assets/projects/profile.jpg" alt="Melvin Andrea" className="sb-polaroid-img" />
                </div>
                <div className="sb-polaroid-caption">2024</div>
              </div>

              <div className="sb-bio-center" data-reveal style={delay(220)}>
                <p className="sb-bio">
                  I'm Melvin, a Frontend &amp; Mobile Developer and UI/UX Designer who loves turning ideas into apps and websites that feel simple to use. <span className="sb-bio-sparkle">✨</span> I build with React and Flutter, and away from the keyboard you'll find me behind a camera or a video timeline, chasing good visual stories. <span className="sb-bio-palette">🎬</span>
                </p>
              </div>

              <div className="sb-folder-wrap" data-reveal style={delay(320)}>
                <FolderFloat
                  className="sb-folder"
                  items={FOLDER_ITEMS}
                  label="Beyond Code"
                  sublabel={`${FOLDER_ITEMS.length} collections`}
                  trigger={canHover ? 'hover' : 'click'}
                  closeOnSelect
                  physics
                  drift={0.5}
                  onSelect={(value) => navigate(`/creative/${value}`)}
                  folderColor="#E8B800"
                  frontColor="#FFD026"
                  paperColor="#ffffff"
                  itemColor="#FFD026"
                  itemTextColor="#141414"
                  labelColor="#141414"
                  width={200}
                  height={148}
                  radius={14}
                  spread={130}
                  lift={26}
                  tilt={8}
                  flapAngle={34}
                  restAngle={16}
                  openDuration={520}
                  stagger={45}
                  bounce={0.3}
                />
              </div>
            </div>

            {/* Skills chips */}
            <div className="sb-chips-container">
              <div className="sb-chip-row" data-reveal style={delay(420)}>
                <span className="sb-chip sb-chip-yellow"><Code2 className="w-4 h-4" /> TypeScript</span>
                <span className="sb-chip sb-chip-blue"><Layers className="w-4 h-4" /> React</span>
                <span className="sb-chip sb-chip-green"><Palette className="w-4 h-4" /> Tailwind CSS</span>
                <span className="sb-chip sb-chip-pink"><Smartphone className="w-4 h-4" /> Flutter</span>
                <span className="sb-chip sb-chip-yellow"><Terminal className="w-4 h-4" /> Dart</span>
              </div>
              <div className="sb-chip-row" data-reveal style={delay(500)}>
                <span className="sb-chip sb-chip-blue"><Figma className="w-4 h-4" /> Figma</span>
                <span className="sb-chip sb-chip-green"><Server className="w-4 h-4" /> REST API</span>
                <span className="sb-chip sb-chip-pink"><Film className="w-4 h-4" /> DaVinci Resolve</span>
                <span className="sb-chip sb-chip-yellow"><Camera className="w-4 h-4" /> Lightroom</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── FEATURED PROJECTS (ScrollStack folders) ── */}
      <section id="projects" className="fp-section fs-section">
        <div className="fs-head fp-header" data-reveal>
          <span className="fp-label">Featured Work</span>
          <h2 className="fp-heading">Selected Projects.</h2>
          <p className="fp-sub">Scroll through my folders — apps, websites, photography, film and design.</p>
        </div>
        <FeaturedStack />
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="fp-contact-section">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="fp-contact-box" data-reveal>
            <h2>Let's build something together</h2>
            <p>Open for full-time roles, freelance projects, and creative collaborations.</p>
            <div className="fp-contact-links">
              <a href="https://wa.me/6282231258463" target="_blank" className="fp-contact-pill">
                <Mail className="w-4 h-4" /> Chat Me
              </a>
              <a href="https://linkedin.com/in/melvin-andrea" target="_blank" rel="noopener noreferrer" className="fp-contact-pill">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://github.com/MelvinnS" target="_blank" rel="noopener noreferrer" className="fp-contact-pill">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://instagram.com/el_falskie" target="_blank" rel="noopener noreferrer" className="fp-contact-pill">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};