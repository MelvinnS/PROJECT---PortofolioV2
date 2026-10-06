import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Globe,
  Code2,
  Sparkles,
  Layers,
  Copy,
  Check,
  Server,
  Lock,
} from 'lucide-react';
import './WebDevPage.css';

interface WebProject {
  id: string;
  title: string;
  tagline: string;
  category: 'all' | 'fullstack' | 'landing' | 'frontend';
  categoryLabel: string;
  coverImage: string;
  tech: string[];
  demoUrl: string;
  githubUrl?: string;
  displayUrl: string;
}

const WEB_PROJECTS: WebProject[] = [
  {
    id: 'dk-website',
    title: 'DK Website',
    tagline: 'Modern culinary and food service landing page built with React and Tailwind CSS v4.',
    category: 'landing',
    categoryLabel: 'Landing Page',
    coverImage: '/assets/creative/dkwebsite.png',
    tech: ['React', 'React DOM', 'TypeScript', 'Tailwind CSS v4'],
    demoUrl: 'https://dapoerkuliner.vercel.app/',
    githubUrl: 'https://github.com/MelvinnS/PROJECT---DK-Landing-Page',
    displayUrl: 'dapoerkuliner.vercel.app',
  },
  {
    id: 'banksampah',
    title: 'Bank Sampah Digital',
    tagline: 'Digital waste management platform - customers deposit recyclable waste, admins manage transactions. • Admin login: admin_banksampah / admin123', 
    category: 'fullstack',
    categoryLabel: 'Full-Stack App',
    coverImage: '/assets/creative/banksampahcover.png',
    tech: ['React JS', 'Tailwind CSS', 'NestJS', 'Prisma', 'MySQL'],
    demoUrl: 'https://banksampahdigital-sooty.vercel.app/',
    githubUrl: 'https://github.com/MelvinnS/PROJECT---Bank-Sampah',
    displayUrl: 'banksampahdigital.vercel.app',
  },
  {
    id: 'dk-catering',
    title: 'DK-Catering',
    tagline: 'MSME catering ordering and menu management system designed for effortless food service browsing.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack App',
    coverImage: '/assets/creative/cattering.png',
    tech: ['React JS', 'Tailwind CSS', 'NestJS', 'Prisma', 'MySQL'],
    demoUrl: 'https://cattering-nine.vercel.app',
    githubUrl: 'https://github.com/MelvinnS/PROJECT---DK-Cattering',
    displayUrl: 'cattering-nine.vercel.app',
  },
  {
    id: 'template-gf',
    title: 'Template for gf (Forsale)',
    tagline: 'Nostalgic Game Boy-style pixel-art landing page featuring an interactive shared memory quiz.',
    category: 'landing',
    categoryLabel: 'Creative & Commercial',
    coverImage: '/assets/creative/4gf.png',
    tech: ['React JS', 'Vite', 'Tailwind CSS'],
    demoUrl: 'https://template-4gf.vercel.app/',
    githubUrl: 'https://github.com/MelvinnS/FORSALE---Template-for-gf',
    displayUrl: 'template-4gf.vercel.app',
  },
  {
    id: 'orastrix',
    title: 'Orastrix Enterprise',
    tagline: 'High-conversion enterprise product landing page built with modern web technologies and animated sections.',
    category: 'landing',
    categoryLabel: 'Landing Page',
    coverImage: '/assets/creative/orastrix.png',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://project-landing-page-orastrix.vercel.app/',
    githubUrl: 'https://github.com/MelvinnS/PROJECT---Landing-Page-Orastrix',
    displayUrl: 'orastrix-landing.vercel.app',
  },
  {
    id: 'restofinder',
    title: 'RestoFinder',
    tagline: 'Restaurant discovery application with real-time search, filters, and detailed culinary views.',
    category: 'frontend',
    categoryLabel: 'Frontend App',
    coverImage: '/assets/creative/restofinder.png',
    tech: ['React', 'TypeScript', 'CSS3', 'Vercel'],
    demoUrl: 'https://techtest-restofinder.vercel.app/',
    githubUrl: 'https://github.com/MelvinnS/FrontendDevReactjs-Melvin-Andrea-Ismiananta',
    displayUrl: 'techtest-restofinder.vercel.app',
  },
];

export const WebDevPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'landing' | 'frontend'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setToastMessage('Link copied to clipboard!');
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage(null);
    }, 2000);
  };

  const triggerSticker = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredProjects =
    filter === 'all' ? WEB_PROJECTS : WEB_PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="wd-page">
      <div className="wd-container">

        {/* ── TOP NAV BAR ── */}
        <div className="wd-top-nav">
          <button
            onClick={() => navigate('/projects')}
            className="wd-back-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>

          <div className="wd-badge-pill">
            <Globe className="w-3.5 h-3.5" />
            <span>Web Developer Directory</span>
          </div>
        </div>

        {/* ── HEADER ── */}
        <header className="wd-header">
          <span className="wd-anno">curated live builds &amp; platforms ◜</span>
          <h1 className="wd-title">WEB DEVELOPER</h1>
          <p className="wd-desc">
            A direct collection of live websites, web applications, and digital platforms built with React, TypeScript, and modern backend architectures. Ready to explore live.
          </p>

          {/* Interactive Stickers Row */}
          <div className="wd-stickers-row">
            <span
              className="wd-sticker wd-sticker-gold"
              onClick={() => triggerSticker('⚡ All builds are live & deployed on Vercel!')}
            >
              <Sparkles className="w-3.5 h-3.5" /> 6 Live Builds
            </span>
            <span
              className="wd-sticker wd-sticker-cyan"
              onClick={() => triggerSticker('⚛️ Powered by React, TypeScript, & Tailwind CSS!')}
            >
              <Code2 className="w-3.5 h-3.5" /> React &amp; TypeScript
            </span>
            <span
              className="wd-sticker wd-sticker-green"
              onClick={() => triggerSticker('🚀 Full-stack integrations with NestJS, Prisma & MySQL!')}
            >
              <Server className="w-3.5 h-3.5" /> Full-Stack Architecture
            </span>
            <span
              className="wd-sticker wd-sticker-purple"
              onClick={() => triggerSticker('📱 100% Tested across mobile, tablet, and desktop!')}
            >
              <Layers className="w-3.5 h-3.5" /> Responsive Breakpoints
            </span>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div
              style={{
                display: 'inline-block',
                background: '#141414',
                color: '#ffffff',
                border: '2px solid #FFD026',
                boxShadow: '3px 3px 0 #141414',
                padding: '0.45rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: '1.5rem',
                animation: 'bounce 0.3s ease',
              }}
            >
              {toastMessage}
            </div>
          )}

          {/* Interactive Filter Pills */}
          <div className="wd-filters-row">
            <button
              className={`wd-filter-btn ${filter === 'all' ? 'wd-filter-btn--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Builds ({WEB_PROJECTS.length})
            </button>
            <button
              className={`wd-filter-btn ${filter === 'fullstack' ? 'wd-filter-btn--active' : ''}`}
              onClick={() => setFilter('fullstack')}
            >
              Full-Stack &amp; Systems
            </button>
            <button
              className={`wd-filter-btn ${filter === 'landing' ? 'wd-filter-btn--active' : ''}`}
              onClick={() => setFilter('landing')}
            >
              Landing Pages
            </button>
            <button
              className={`wd-filter-btn ${filter === 'frontend' ? 'wd-filter-btn--active' : ''}`}
              onClick={() => setFilter('frontend')}
            >
              Frontend Apps
            </button>
          </div>
        </header>

        {/* ── BROWSER WINDOW CARDS GRID ── */}
        <div className="wd-grid">
          {filteredProjects.map((p) => (
            <div key={p.id} className="wd-browser-card">

              {/* Browser Window Chrome Bar */}
              <div className="wd-browser-bar">
                <div className="wd-traffic-dots">
                  <span className="wd-dot-close" />
                  <span className="wd-dot-min" />
                  <span className="wd-dot-max" />
                </div>

                <div className="wd-url-box">
                  <Lock className="w-3 h-3 text-[#12B76A]" />
                  <span>https://{p.displayUrl}</span>
                </div>

                <div className="wd-live-pill">
                  <span className="wd-pulse-green" />
                  <span>Live</span>
                </div>
              </div>

              {/* Viewport Preview with Hover Overlay */}
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wd-viewport"
                title={`Open ${p.title} live demo`}
              >
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="wd-viewport-img"
                  loading="lazy"
                />
                <div className="wd-viewport-overlay">
                  <span className="wd-overlay-badge">
                    <ExternalLink className="w-4 h-4" /> Open Website
                  </span>
                </div>
              </a>

              {/* Card Body */}
              <div className="wd-card-body">
                <div className="wd-card-top-meta">
                  <span className="wd-category-tag">{p.categoryLabel}</span>
                  <span
                    style={{
                      fontFamily: 'Space Grotesk, monospace',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      color: '#888',
                    }}
                  >
                    2024
                  </span>
                </div>

                <h3 className="wd-card-title">{p.title}</h3>
                <p className="wd-card-tagline">{p.tagline}</p>

                {/* Tech Stack List */}
                <div className="wd-tech-list">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="wd-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons Row */}
                <div className="wd-actions-row">
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wd-btn-demo"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>

                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wd-btn-github"
                    >
                      <Github className="w-4 h-4" /> Source
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleCopy(p.demoUrl, p.id)}
                    className="wd-btn-copy"
                    title="Copy demo link"
                    aria-label="Copy demo link"
                  >
                    {copiedId === p.id ? (
                      <Check className="w-4 h-4 text-[#027A48]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── BOTTOM CALLOUT STRIP ── */}
        <div className="wd-strip">
          <div>
            <h3 className="wd-strip-title">Looking for custom web development?</h3>
            <p className="wd-strip-p">
              From landing pages that convert to robust full-stack architectures, I build websites focused on speed, aesthetics, and user delight.
            </p>
          </div>
          <button
            onClick={() => navigate('/#contact')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFD026',
              color: '#141414',
              border: '2px solid #141414',
              borderRadius: '999px',
              padding: '0.65rem 1.4rem',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.88rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '3px 3px 0 #ffffff',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = '';
            }}
          >
            <span>Let's Discuss</span> ↗
          </button>
        </div>

      </div>
    </div>
  );
};

export default WebDevPage;
