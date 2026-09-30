import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  Figma,
  ExternalLink,
  Check,
  Droplets,
  CreditCard,
  BarChart2,
  User,
  Sparkles,
  Smartphone,
  Layers,
  Play,
  Pause,
  Maximize2,
  X,
  Star,
  AlertTriangle,
  Lightbulb,
  Recycle,
  Gift,
  BookOpen,
  ShoppingBag,
} from 'lucide-react';
import { projectsData, featuredProjectsData } from '../data/projectsData';
import './CaseStudyDetail.css';

// Web Developer showcase (for tresbekasli)
const webDevShowcase = [
  {
    data: featuredProjectsData.find((p) => p.id === 'banksampah')!,
    thumbnail: '/assets/creative/orastrix.png',
    demoUrl: 'https://banksampahdigital-sooty.vercel.app/',
  },
  {
    data: featuredProjectsData.find((p) => p.id === 'dk-catering')!,
    thumbnail: '/assets/creative/cattering.png',
    demoUrl: 'https://cattering-nine.vercel.app',
  },
  {
    data: featuredProjectsData.find((p) => p.id === 'Template for gf')!,
    thumbnail: '/assets/creative/4gf.png',
    demoUrl: 'https://template-4gf.vercel.app/',
  },
  {
    data: featuredProjectsData.find((p) => p.id === 'orastrix')!,
    thumbnail: '/assets/creative/orastrix.png',
    demoUrl: 'https://project-landing-page-orastrix.vercel.app/',
  },
  {
    data: featuredProjectsData.find((p) => p.id === 'portfolio')!,
    thumbnail: '/assets/creative/portofolio.png',
    demoUrl: 'https://project-portfolio-ten-rosy.vercel.app/',
  },
  {
    data: featuredProjectsData.find((p) => p.id === 'restofinder')!,
    thumbnail: '/assets/creative/restofinder.png',
    demoUrl: 'https://techtest-restofinder.vercel.app/',
  },
];

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id) || projectsData[0];

  // Screen controller state
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([0, 1, 2]);
  const [stampSpins, setStampSpins] = useState(0);
  const [stickerAlert, setStickerAlert] = useState<string | null>(null);

  // 3D tilt coordinates
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScreenIndex(0);
    setIsAutoplay(false);
  }, [id]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay || !project.galleryScreens?.length) return;
    const timer = setInterval(() => {
      setActiveScreenIndex((prev) => (prev + 1) % project.galleryScreens.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isAutoplay, project.galleryScreens]);

  // 3D Mouse Tilt on phone mockup
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 16,
      y: (x / rect.width) * 16,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const nextScreen = () => {
    if (!project.galleryScreens?.length) return;
    setActiveScreenIndex((prev) => (prev + 1) % project.galleryScreens.length);
  };

  const prevScreen = () => {
    if (!project.galleryScreens?.length) return;
    setActiveScreenIndex((prev) => (prev - 1 + project.galleryScreens.length) % project.galleryScreens.length);
  };

  const toggleTask = (index: number) => {
    setCompletedTasks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const triggerSticker = (msg: string) => {
    setStickerAlert(msg);
    setTimeout(() => setStickerAlert(null), 2500);
  };

  // Color theme per project
  const isPDAM = project.id === 'pdam';
  const themeColor = isPDAM ? '#17B8DE' : '#00C274';
  const otherProjectId = isPDAM ? 'trashback' : 'pdam';
  const otherProjectTitle = isPDAM ? 'TrashBack' : 'Layanan PDAM';

  // Feature icons mapping
  const getFeatureIcon = (index: number) => {
    if (isPDAM) {
      const icons = [
        <Droplets className="w-5 h-5" />,
        <CreditCard className="w-5 h-5" />,
        <BarChart2 className="w-5 h-5" />,
        <User className="w-5 h-5" />,
      ];
      return icons[index % icons.length];
    } else {
      const icons = [
        <Recycle className="w-5 h-5" />,
        <Gift className="w-5 h-5" />,
        <BookOpen className="w-5 h-5" />,
        <ShoppingBag className="w-5 h-5" />,
      ];
      return icons[index % icons.length];
    }
  };

  // ---- Halaman khusus "Web Developer" (tresbekasli) ----
  if (project.id === 'tresbekasli') {
    return (
      <main className="pb-16" style={{ background: '#ffffff' }}>
        <section className="wd-hero">
          <img src="/assets/creative/orastrix.png" alt={project.title} className="wd-hero-img" />
          <div className="wd-hero-fade-top" />
          <div className="wd-hero-fade-bottom" />

          <Link to="/projects" className="wd-back-btn">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <div className="wd-hero-content">
            <div className="cs-tag !mb-3">Case Study</div>
            <h1 className="wd-hero-title">{project.title}</h1>
            <p className="wd-hero-tagline">
              A closer look at the websites I've designed and built end-to-end — from concept to live deployment.
            </p>
          </div>
        </section>

        <section className="section pt-10">
          <div className="section-inner">
            <div className="section-tag">Selected Builds</div>
            <h2 className="section-title">Live web projects</h2>
            <p className="section-desc">Projects crafted with clean code paired with premium, considered design.</p>

            <div className="wd-grid">
              {webDevShowcase.map(({ data, thumbnail, demoUrl }) => (
                <div key={data.id} className="wd-card">
                  <div className="wd-card-thumb">
                    <img src={thumbnail} alt={data.title} />
                  </div>
                  <div className="wd-card-body">
                    <h3>{data.title}</h3>
                    <p>{data.tagline}</p>
                    <div className="wd-card-tech">
                      {data.tech.map((t, i) => (
                        <span key={i}>{t}</span>
                      ))}
                    </div>
                    <div className="wd-card-actions">
                      <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="wd-card-cta">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                      {data.githubUrl && (
                        <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="wd-card-cta wd-card-cta-secondary">
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cs-section text-center pt-8">
          <Link to="/projects" className="back-link justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to all projects
          </Link>
        </section>
      </main>
    );
  }

  // ---- TOTAL REDESIGN: Mobile App Case Study (PDAM & TrashBack) ----
  const currentScreen = project.galleryScreens?.[activeScreenIndex] || project.coverImage;

  return (
    <div
      className="cs-page"
      style={{ '--project-accent': themeColor } as React.CSSProperties}
    >
      <div className="cs-container">

        {/* ── TOP NAV BAR ── */}
        <div className="cs-top-nav">
          <button
            onClick={() => navigate('/projects/mobile-app')}
            className="cs-back-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Mobile Apps
          </button>

          <div className="cs-badge-pill">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App Case Study</span>
          </div>
        </div>

        {/* ── HERO SECTION ── */}
        <header className="cs-hero-box">
          {/* Floating Interactive Starburst Stamp */}
          <div
            className="cs-starburst-stamp"
            onClick={() => setStampSpins((prev) => prev + 1)}
            title="Click to spin!"
          >
            <svg
              className="cs-stamp-svg"
              viewBox="0 0 100 100"
              style={{
                filter: 'drop-shadow(3px 3px 0 #141414)',
                transform: `rotate(${stampSpins * 90}deg)`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <polygon
                points="50,0 63,14 82,9 85,28 100,38 91,54 100,71 83,77 78,96 60,90 50,100 38,89 20,93 18,74 2,64 10,48 2,31 19,25 24,6 42,12"
                fill={themeColor}
                stroke="#141414"
                strokeWidth="2.5"
              />
              <circle cx="50" cy="50" r="18" fill="#141414" />
              <text
                x="50"
                y="54"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="900"
                fontFamily="Space Grotesk, sans-serif"
              >
                PRO
              </text>
            </svg>
          </div>

          <span className="cs-anno">case study &amp; workflow ◜</span>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-tagline">{project.tagline}</p>

          {/* Action Links Bar */}
          <div className="cs-action-row">
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-action-btn cs-action-btn--primary"
              >
                <Figma className="w-4 h-4" /> Figma Prototype
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-action-btn cs-action-btn--secondary"
              >
                <Github className="w-4 h-4" /> View Source
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-action-btn cs-action-btn--secondary"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>

          {/* Interactive Stickers Row */}
          <div className="cs-stickers-row">
            <span
              className="cs-interactive-sticker cs-sticker-cyan"
              onClick={() => triggerSticker('⚡ Developed with Flutter & Dart for cross-platform performance!')}
            >
              <Smartphone className="w-3.5 h-3.5" /> Flutter &amp; Dart
            </span>
            <span
              className="cs-interactive-sticker cs-sticker-yellow"
              onClick={() => triggerSticker('🎨 Complete UI/UX system crafted in Figma from wireframe to hifi!')}
            >
              <Sparkles className="w-3.5 h-3.5" /> Figma UI/UX
            </span>
            <span
              className="cs-interactive-sticker cs-sticker-pink"
              onClick={() => triggerSticker(`📱 ${project.galleryScreens?.length || 18} unique interactive screens built!`)}
            >
              <Layers className="w-3.5 h-3.5" /> {project.galleryScreens?.length || 18} Screens
            </span>
            <span
              className="cs-interactive-sticker cs-sticker-green"
              onClick={() => triggerSticker('✅ Production-ready architecture and clean state management!')}
            >
              <Star className="w-3.5 h-3.5" /> 100% Tested
            </span>
          </div>

          {/* Floating Sticker Alert Toast */}
          {stickerAlert && (
            <div
              style={{
                display: 'inline-block',
                background: '#141414',
                color: '#fff',
                padding: '0.45rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'Space Grotesk, sans-serif',
                marginTop: '0.5rem',
                animation: 'bounce 0.3s ease',
              }}
            >
              {stickerAlert}
            </div>
          )}
        </header>

        {/* ── INTERACTIVE PHONE DEVICE SHOWCASE (CENTERPIECE) ── */}
        <section className="cs-device-section">
          <div className="cs-device-card">
            {/* Stage with 3D Mouse Tilt */}
            <div
              className="cs-phone-stage"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={phoneRef}
                className="cs-phone-mockup"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className="cs-phone-screen">
                  {/* Dynamic Island */}
                  <div className="cs-phone-island" />

                  {/* Active Screen */}
                  <img
                    src={currentScreen}
                    alt={`${project.title} screen ${activeScreenIndex + 1}`}
                    className="cs-phone-img"
                  />

                  {/* Bottom Indicator */}
                  <div className="cs-phone-indicator" />
                </div>
              </div>
            </div>

            {/* Screen Controls */}
            <div className="cs-device-controls">
              <button
                type="button"
                onClick={prevScreen}
                className="cs-ctrl-btn"
                aria-label="Previous screen"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="cs-screen-counter">
                SCREEN {String(activeScreenIndex + 1).padStart(2, '0')} /{' '}
                {String(project.galleryScreens?.length || 18).padStart(2, '0')}
              </div>

              <button
                type="button"
                onClick={nextScreen}
                className="cs-ctrl-btn"
                aria-label="Next screen"
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`cs-autoplay-btn ${isAutoplay ? 'cs-autoplay-btn--active' : ''}`}
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoplay ? 'Pause' : 'Autoplay'}</span>
              </button>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="cs-ctrl-btn"
                title="Fullscreen preview"
                aria-label="Expand image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Quick-Select Strip */}
            {project.galleryScreens?.length > 0 && (
              <div className="cs-thumb-strip">
                {project.galleryScreens.map((screen, idx) => (
                  <div
                    key={idx}
                    className={`cs-thumb-item ${idx === activeScreenIndex ? 'cs-thumb-item--active' : ''}`}
                    onClick={() => setActiveScreenIndex(idx)}
                    title={`Screen ${idx + 1}`}
                  >
                    <img src={screen} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="cs-section">
          <div className="cs-box-card">
            <span className="cs-card-tag cs-card-tag--solution">
              <Sparkles className="w-3.5 h-3.5" /> Project Overview
            </span>
            <h2 className="cs-box-title">About the Application</h2>
            <p className="cs-box-p">{project.description}</p>
          </div>
        </section>

        {/* ── PROBLEM & SOLUTION DUAL CARDS ── */}
        <section className="cs-section">
          <div className="cs-sec-header">
            <span className="cs-anno">the challenge &amp; the fix ◜</span>
            <h2 className="cs-sec-title">Problem &amp; Solution</h2>
            <p className="cs-sec-sub">Understanding the core user friction and building the digital remedy.</p>
          </div>

          <div className="cs-dual-grid">
            {/* Problem Card */}
            <div className="cs-box-card">
              <span className="cs-card-tag cs-card-tag--problem">
                <AlertTriangle className="w-3.5 h-3.5" /> The Problem
              </span>
              <h3 className="cs-box-title">User Friction &amp; Inefficiency</h3>
              <p className="cs-box-p">{project.problem}</p>
            </div>

            {/* Solution Card */}
            <div className="cs-box-card">
              <span className="cs-card-tag cs-card-tag--solution">
                <Lightbulb className="w-3.5 h-3.5" /> The Solution
              </span>
              <h3 className="cs-box-title">Integrated Mobile Experience</h3>
              <p className="cs-box-p">{project.solution}</p>
            </div>
          </div>
        </section>

        {/* ── ROLE & RESPONSIBILITIES ── */}
        <section className="cs-section">
          <div className="cs-role-card">
            <div>
              <div className="cs-role-pill">
                <Star className="w-3.5 h-3.5" /> My Role
              </div>
              <h2 className="cs-role-headline">{project.role}</h2>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                {project.process}
              </p>
            </div>

            {/* Interactive Tasks Checklist */}
            <div>
              <p style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#888',
                marginBottom: '0.8rem',
              }}>
                Interactive Responsibilities (Click to toggle)
              </p>
              <ul className="cs-tasks-list">
                {project.roleTasks?.map((task, i) => {
                  const isDone = completedTasks.includes(i);
                  return (
                    <li
                      key={i}
                      className="cs-task-item"
                      onClick={() => toggleTask(i)}
                      style={{
                        borderColor: isDone ? themeColor : '#141414',
                      }}
                    >
                      <span
                        className="cs-task-check"
                        style={{
                          background: isDone ? themeColor : '#ddd',
                          color: isDone ? '#141414' : '#888',
                        }}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span style={{ fontWeight: 600 }}>{task}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ── KEY FEATURES GRID ── */}
        <section className="cs-section">
          <div className="cs-sec-header">
            <span className="cs-anno">built with intention ◜</span>
            <h2 className="cs-sec-title">Core Features</h2>
            <p className="cs-sec-sub">Designed and implemented to streamline every interaction.</p>
          </div>

          <div className="cs-features-grid">
            {project.features?.map((feat, i) => (
              <div key={i} className="cs-feature-card">
                <div className="cs-feature-icon-box">
                  {getFeatureIcon(i)}
                </div>
                <div>
                  <div className="cs-feature-num">FEATURE {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="cs-feature-name">{feat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── REFLECTION NOTEPAD (SCRAPBOOK TAPE) ── */}
        <section className="cs-section">
          <div className="cs-reflection-card">
            <span className="cs-tape cs-tape-tl" />
            <span className="cs-tape cs-tape-tr" />

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'Caveat, cursive',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#555',
              marginBottom: '0.5rem',
            }}>
              Melvin's take &amp; lessons learned ◜
            </div>

            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.65rem',
              fontWeight: 900,
              color: '#141414',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em',
            }}>
              Key Reflections
            </h2>

            <blockquote className="cs-reflection-quote">
              "{project.reflection}"
            </blockquote>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#888',
            }}>
              <span>Melvin Andrea</span>
              <span>·</span>
              <span>Frontend &amp; Mobile Developer</span>
            </div>
          </div>
        </section>

        {/* ── BOTTOM PROJECT SWITCHER ── */}
        <div className="cs-footer-nav">
          <button
            onClick={() => navigate('/projects/mobile-app')}
            className="cs-back-btn"
          >
            <ArrowLeft className="w-4 h-4" /> All Mobile Apps
          </button>

          <Link
            to={`/projects/${otherProjectId}`}
            className="cs-action-btn cs-action-btn--primary"
          >
            <span>Next Project: {otherProjectTitle}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {lightboxOpen && (
        <div
          className="cs-lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="cs-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cs-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={currentScreen}
              alt="Fullscreen preview"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
