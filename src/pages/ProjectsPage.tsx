import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsPage.css';

interface FolderData {
  id: string;
  tabLabel: string;
  title: string;
  desc: string;
  image: string;
  tabBg: string;
  tabFg: string;
  bodyBg: string;
  link: string;
}

const FOLDERS: FolderData[] = [
  {
    id: 'mobile-app',
    tabLabel: 'PROJECT 01',
    title: 'Mobile App Developer',
    desc: 'Cross-platform applications crafted with Flutter, Dart & intuitive UX flows.',
    image: '/assets/projects/coverPDAM.png',
    tabBg: '#17B8DE',
    tabFg: '#141414',
    bodyBg: '#fcfcfc',
    link: '/projects/pdam',
  },
  {
    id: 'web-dev',
    tabLabel: 'PROJECT 02',
    title: 'Web Developer',
    desc: 'Modern web applications built with React, TypeScript, and responsive styling.',
    image: '/assets/projects/coverORASTRIX.png',
    tabBg: '#141414',
    tabFg: '#ffffff',
    bodyBg: '#fcfcfc',
    link: '/projects/tresbekasli',
  },
  {
    id: 'photography',
    tabLabel: 'PROJECT 03',
    title: 'Photography',
    desc: 'Visual storytelling through a lens: people, streets, landscapes & emotion.',
    image: '/assets/creative/photography.png',
    tabBg: '#F5B82A',
    tabFg: '#141414',
    bodyBg: '#fcfcfc',
    link: '/creative/photography',
  },
  {
    id: 'video-editing',
    tabLabel: 'PROJECT 04',
    title: 'Video & Editing',
    desc: 'Cinematic short films, motion pacing, and narrative edits in DaVinci Resolve.',
    image: '/assets/creative/film.png',
    tabBg: '#FF2B85',
    tabFg: '#ffffff',
    bodyBg: '#fcfcfc',
    link: '/creative/videography-editing',
  },
  {
    id: 'graphic-designer',
    tabLabel: 'PROJECT 05',
    title: 'Graphic Designer',
    desc: 'Visual identity systems, brand collaterals, and high-fidelity product UI/UX.',
    image: '/assets/creative/design.png',
    tabBg: '#8B5CF6',
    tabFg: '#ffffff',
    bodyBg: '#fcfcfc',
    link: '/creative/graphic-design',
  },
];

export const ProjectsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pw-page">
      <div className="pw-inner">

        {/* ── HEADER: explore my work! + FEATURED WORKS ── */}
        <header className="pw-header">
          <span className="pw-anno">explore my work!</span>
          <h1 className="pw-title">FEATURED WORKS</h1>
          <p className="pw-sub">
            A curated selection across mobile app development, web platforms, photography, video editing, and graphic design.
          </p>
        </header>

        {/* ── 5 FOLDERS GRID (Maksimal 2 baris berdampingan) ── */}
        <div className="pw-grid">
          {FOLDERS.map((f) => (
            <Link
              key={f.id}
              to={f.link}
              className="pw-folder-item"
              style={{
                '--folder-tab-bg': f.tabBg,
                '--folder-tab-fg': f.tabFg,
                '--folder-body-bg': f.bodyBg,
              } as React.CSSProperties}
            >
              <div className="pw-folder-shell">
                {/* Slanted Tab */}
                <div className="pw-tab">
                  <span className="pw-tab-dot" />
                  <span>{f.tabLabel}</span>
                </div>

                {/* Folder Body */}
                <div className="pw-folder-box">
                  <div className="pw-preview-frame">
                    <span className="pw-tape pw-tape-tl" />
                    <span className="pw-tape pw-tape-tr" />
                    <img
                      src={f.image}
                      alt={f.title}
                      className="pw-preview-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Description Below Folder */}
              <div className="pw-meta">
                <h3 className="pw-meta-title">{f.title}</h3>
                <p className="pw-meta-desc">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectsPage;
