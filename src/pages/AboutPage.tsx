import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Smartphone,
  Palette,
  Wrench,
  Globe,
  Server,
  Database,
  LayoutTemplate,
  PenTool,
  Camera,
  Trophy,
  Clapperboard,
  Presentation,
  Medal,
  Quote,
  ArrowUpRight,
  ZoomIn,
  X,
} from 'lucide-react';
import { useRiseOnScroll } from '../hooks/useRiseOnScroll';
import { usePageTransition } from '../components/layout/PageTransition';
import { techStackData, TechStackCategory } from '../data/techStackData';
import { TechIcon } from '../components/ui/TechIcon';
import ProfileCard from '../components/ui/ProfileCard/ProfileCard';
import './AboutPage.css';

// Stagger helper untuk animasi naik (data-rise) — hanya dipakai di isi konten
const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` } as React.CSSProperties);

const SKILLS: { icon: React.ElementType; label: string }[] = [
  { icon: Code2, label: 'Frontend Web Development' },
  { icon: Smartphone, label: 'Mobile App Development' },
  { icon: Palette, label: 'UI/UX Design' },
  { icon: LayoutTemplate, label: 'Responsive Web Design' },
  { icon: PenTool, label: 'Prototyping & Wireframing' },
  { icon: Camera, label: 'Visual Storytelling' },
];

const SKILL_TONES = ['yellow', 'blue', 'green', 'pink', 'yellow', 'blue'] as const;

const SKILL_DESCRIPTIONS: Record<string, string> = {
  'Frontend Web Development':
    'Building responsive, accessible, and high-performance web applications using React, TypeScript, and Tailwind CSS. Focused on component architecture, state management, and smooth micro-interactions.',
  'Mobile App Development':
    'Crafting cross-platform mobile apps with Flutter and Dart. Experienced in transforming wireframe prototypes into fully functional, production-ready mobile experiences.',
  'UI/UX Design':
    'Designing user-centered digital interfaces in Figma with modular design systems, intuitive user flows, and interactive prototypes tailored for real-world adoption.',
  'Responsive Web Design':
    'Ensuring websites scale flawlessly across mobile, tablet, and desktop viewports with fluid typography, responsive grids, and touch-optimized navigation.',
  'Prototyping & Wireframing':
    'Translating business requirements into structured wireframes and clickable prototypes to test hypotheses, refine UX, and accelerate development.',
  'Visual Storytelling':
    'Combining principles of cinematography, color grading, photography, and narrative pacing to craft evocative brand visuals and digital media.',
};

const CATEGORY_ICON: Record<TechStackCategory['categoryIcon'], React.ElementType> = {
  code: Code2,
  smartphone: Smartphone,
  server: Server,
  database: Database,
  wrench: Wrench,
  globe: Globe,
  palette: Palette,
};

const CATEGORY_TONE: Record<TechStackCategory['categoryIcon'], string> = {
  code: 'yellow',
  smartphone: 'blue',
  server: 'green',
  database: 'cyan',
  globe: 'green',
  wrench: 'orange',
  palette: 'pink',
};

interface CertEntry {
  icon: React.ElementType;
  tone: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  issuer: string;
  year: string;
}

const CERTIFICATES: CertEntry[] = [
  {
    icon: Medal,
    tone: 'yellow',
    tag: 'Certification',
    title: 'Information Technology Specialist: Artificial Intelligence',
    subtitle: 'Certiport — A Pearson VUE Business & CertNexus',
    image: '/assets/certificates/Serkom.jpg',
    issuer: 'Certiport / CertNexus',
    year: '2026',
  },
  {
    icon: Trophy,
    tone: 'blue',
    tag: 'Achievement',
    title: 'Semi Finalist — Business Plan Competition',
    subtitle: 'Creation Festival 2025 • CBSA Universitas Indonesia',
    image: '/assets/certificates/semifinal.png',
    issuer: 'CBSA Universitas Indonesia',
    year: '2025',
  },
  {
    icon: Clapperboard,
    tone: 'pink',
    tag: 'Film Award',
    title: 'Peserta Ratu Film Festival 2025',
    subtitle: 'Kategori Pelajar — Karya Film: "Ombak Harapan"',
    image: '/assets/certificates/memo.jpg',
    issuer: 'Radar Tulungagung & Memo Production',
    year: '2025',
  },
  {
    icon: Presentation,
    tone: 'green',
    tag: 'Competition',
    title: 'Peserta Business Plan — IMPACT 2025',
    subtitle: 'LKI Fakultas Kedokteran Universitas Brawijaya',
    image: '/assets/certificates/impact.png',
    issuer: 'FK Universitas Brawijaya',
    year: '2025',
  },
];

export const AboutPage: React.FC = () => {
  useRiseOnScroll();
  const { go } = usePageTransition();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ── Skill popup (bottom sheet) ──
  const [openSkill, setOpenSkill] = useState<number | null>(null);

  // ── Certificate Lightbox Modal ──
  const [activeCert, setActiveCert] = useState<CertEntry | null>(null);

  useEffect(() => {
    if (openSkill === null && activeCert === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenSkill(null);
        setActiveCert(null);
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openSkill, activeCert]);

  return (
    <div className="ap-page">
      <div className="ap-inner">

        {/* ══════════ 1. ABOUT ME — HOOK ══════════ */}
        <section className="ap-hook">
          <div className="ap-hook-grid">
            <div className="ap-hook-card">
              <ProfileCard
                avatarUrl="/assets/projects/profile.jpg"
                name="Melvin Andrea"
                title="Website & Mobile Developer"
                handle="melvinandrea"
                status="Available for opportunities"
                contactText="Contact Me"
                onContactClick={() => {
                  go('/#contact');
                }}
                enableTilt
                enableMobileTilt={false}
                behindGlowEnabled
                behindGlowColor="rgba(212, 163, 115, 0.55)"
                innerGradient="linear-gradient(150deg, #d4a37355 0%, #38bdf844 100%)"
              />
            </div>

            <div className="ap-hook-text">
              <span className="ap-eyebrow">who am i? ◜</span>
              <h1 className="ap-hook-title">
                I turn ideas into digital products through <span className="ap-hook-highlight">design</span> and{' '}
                <span className="ap-hook-highlight ap-hook-highlight-alt">code</span>.
              </h1>
              <div className="ap-hook-tags">
                <span className="sb-tag sb-tag-yellow">Frontend Developer</span>
                <span className="sb-tag sb-tag-mint">UI/UX Designer</span>
                <span className="ap-tag-outline">Mobile Developer</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ 2. STORY ══════════ */}
        <section className="ap-section">
          <div className="ap-story">
            <Quote className="ap-story-quote" aria-hidden="true" data-rise />
            <span className="ap-story-label" data-rise style={delay(80)}>the story</span>
            <p className="ap-story-text" data-rise style={delay(160)}>
              I am a Software Engineering student at SMK Telkom Malang with a passion for building digital
              products. I manage the entire process, from designing user interfaces in Figma to coding them
              into functional websites and applications. Beyond development, my interest in photography and
              visual storytelling deeply shapes my unique approach to product design.
            </p>
          </div>
        </section>

        {/* ══════════ 3. MY SKILLS ══════════ */}
        <section className="ap-section">
          <div className="ap-section-head">
            <span className="ap-eyebrow">what i bring ◜</span>
            <h2 className="sb-whatsup-box">My Skills</h2>
          </div>

          <div className="ap-skills-grid">
            {SKILLS.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.label}
                  type="button"
                  className={`ap-skill-card ap-tone-${SKILL_TONES[i % SKILL_TONES.length]}`}
                  onClick={() => setOpenSkill(i)}
                  aria-haspopup="dialog"
                  aria-label={`${s.label} — lihat detail`}
                >
                  <span className="ap-skill-icon" data-rise style={delay((i % 3) * 90)}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="ap-skill-label" data-rise style={delay((i % 3) * 90 + 80)}>{s.label}</span>
                  <span className="ap-skill-arrow" aria-hidden="true">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ══════════ 4. TECH STACK ══════════ */}
        <section className="ap-section">
          <div className="ap-section-head">
            <span className="ap-eyebrow">behind the screen ◜</span>
            <h2 className="sb-whatsup-box">Tech Stack</h2>
          </div>

          <div className="ap-tech-grid">
            {techStackData.map((cat, i) => {
              const CatIcon = CATEGORY_ICON[cat.categoryIcon];
              const tone = CATEGORY_TONE[cat.categoryIcon];
              return (
                <div key={cat.title} className="ap-tech-card">
                  <div className="ap-tech-head" data-rise style={delay((i % 2) * 90)}>
                    <span className={`ap-tech-icon ap-tone-${tone}`}>
                      <CatIcon className="w-5 h-5" />
                    </span>
                    <h3 className="ap-tech-title">{cat.title}</h3>
                    <span className="ap-tech-count">{cat.items.length} tools</span>
                  </div>
                  <div className="ap-tech-items" data-rise style={delay((i % 2) * 90 + 120)}>
                    {cat.items.map((item) => (
                      <span key={item} className="ap-tech-item">
                        <TechIcon name={item} className="w-4 h-4" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════ 5. CERTIFICATES ══════════ */}
        <section className="ap-section">
          <div className="ap-section-head">
            <span className="ap-eyebrow">proof of work ◜</span>
            <h2 className="sb-whatsup-box">Certificates</h2>
          </div>

          <div className="ap-cert-grid">
            {CERTIFICATES.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="ap-cert-card cursor-target"
                  onClick={() => setActiveCert(c)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveCert(c);
                    }
                  }}
                  data-rise
                  style={delay((i % 2) * 90)}
                >
                  {/* Certificate Image Frame */}
                  <div className="ap-cert-img-wrap">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="ap-cert-img"
                      loading="lazy"
                    />
                    <div className="ap-cert-overlay">
                      <span className="ap-cert-zoom-btn">
                        <ZoomIn className="w-4 h-4" /> View Certificate
                      </span>
                    </div>
                    <span className="ap-cert-badge-floating">{c.year}</span>
                  </div>

                  {/* Certificate Details */}
                  <div className="ap-cert-content">
                    <div className="ap-cert-top">
                      <span className={`ap-cert-icon ap-tone-${c.tone}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="ap-cert-badge">{c.tag}</span>
                      <span className="ap-cert-issuer">{c.issuer}</span>
                    </div>
                    <h3 className="ap-cert-title">{c.title}</h3>
                    <p className="ap-cert-subtitle">{c.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════ CERTIFICATE LIGHTBOX MODAL ══════════ */}
        {activeCert && (
          <div
            className="ap-cert-modal-backdrop"
            onClick={() => setActiveCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
          >
            <div
              className="ap-cert-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ap-cert-modal-header">
                <div>
                  <span className="ap-cert-modal-badge">{activeCert.tag} • {activeCert.year}</span>
                  <h3 className="ap-cert-modal-title">{activeCert.title}</h3>
                  <p className="ap-cert-modal-sub">{activeCert.subtitle}</p>
                </div>
                <button
                  type="button"
                  className="ap-cert-modal-close"
                  onClick={() => setActiveCert(null)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="ap-cert-modal-img-wrap">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="ap-cert-modal-img"
                />
              </div>
            </div>
          </div>
        )}

        {/* ══════════ SKILL POPUP (bottom sheet) ══════════ */}
        <div
          className={`ap-sheet-backdrop ${openSkill !== null ? 'is-open' : ''}`}
          onClick={() => setOpenSkill(null)}
          aria-hidden={openSkill === null}
        >
          <div
            className={`ap-sheet ${openSkill !== null ? 'is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={openSkill !== null ? SKILLS[openSkill].label : undefined}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="ap-sheet-handle" aria-hidden="true" />
            {openSkill !== null && (
              <>
                <div className="ap-sheet-head">
                  <span className={`ap-skill-icon ap-tone-${SKILL_TONES[openSkill % SKILL_TONES.length]}`}>
                    {React.createElement(SKILLS[openSkill].icon, { className: 'w-5 h-5' })}
                  </span>
                  <h3 className="ap-sheet-title">{SKILLS[openSkill].label}</h3>
                </div>
                <p className="ap-sheet-text">
                  {SKILL_DESCRIPTIONS[SKILLS[openSkill].label] || SKILLS[openSkill].label}
                </p>
              </>
            )}
            <button type="button" className="ap-sheet-close" onClick={() => setOpenSkill(null)}>
              Close
            </button>
          </div>
        </div>

        {/* ══════════ closing CTA ══════════ */}
        <div className="ap-closing">
          <Link to="/projects" className="sb-cta">
            <span className="sb-cta-icon"><ArrowUpRight className="w-4 h-4" /></span>
            SEE MY WORK
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
