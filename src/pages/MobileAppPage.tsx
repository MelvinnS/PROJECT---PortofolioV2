import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Github, Figma, ArrowRight, Star, Users, Layers } from 'lucide-react';
import { projectsData } from '../data/projectsData';

// Only PDAM and TrashBack
const mobileProjects = projectsData.filter((p) => p.id === 'pdam' || p.id === 'trashback');

const PROJECT_EXTRAS: Record<string, { color: string; tag: string; year: string; stat1: string; stat2: string }> = {
  pdam:      { color: '#17B8DE', tag: 'Civic Tech',      year: '2024', stat1: '18 Screens', stat2: '1 Developer' },
  trashback: { color: '#00C274', tag: 'Sustainability',  year: '2024', stat1: '20 Screens', stat2: 'Team Lead' },
};

export const MobileAppPage: React.FC = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      style={{
        background: '#ffffff',
        backgroundImage:
          'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        minHeight: '100vh',
        paddingTop: '6rem',
        paddingBottom: '5rem',
      }}
    >
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── BACK BUTTON ── */}
        <button
          onClick={() => navigate('/projects')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.82rem', fontWeight: 800, color: '#141414',
            background: '#fff', border: '2.5px solid #141414', borderRadius: '999px',
            padding: '0.4rem 1.1rem', cursor: 'pointer',
            boxShadow: '3px 3px 0 #141414', marginBottom: '2.5rem',
            fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.04em',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #141414'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #141414'; }}
        >
          <ArrowLeft style={{ width: 15, height: 15 }} />
          Back to Projects
        </button>

        {/* ── HEADER ── */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#17B8DE', color: '#141414', border: '2px solid #141414',
            borderRadius: '999px', padding: '0.3rem 1rem', fontSize: '0.72rem',
            fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
            fontFamily: 'Space Grotesk, monospace', marginBottom: '0.9rem',
          }}>
            <Smartphone style={{ width: 13, height: 13 }} />
            Flutter · Dart · Figma
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
            fontWeight: 900, color: '#141414',
            letterSpacing: '-0.03em', lineHeight: 1.0,
            margin: '0 0 0.7rem 0', textTransform: 'uppercase',
          }}>
            MOBILE APP<br />DEVELOPER
          </h1>
          <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.65, maxWidth: '520px' }}>
            Cross-platform mobile apps built with Flutter — from first wireframe in Figma to a polished, production-ready experience.
          </p>
        </header>

        {/* ── 2 PROJECT CARDS (side-by-side) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
        }}>
          {mobileProjects.map((p) => {
            const extra = PROJECT_EXTRAS[p.id] || { color: '#17B8DE', tag: 'App', year: '2024', stat1: '', stat2: '' };
            const isHovered = hovered === p.id;

            return (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  background: '#fff',
                  border: '2.5px solid #141414',
                  borderRadius: '0 16px 16px 16px',
                  boxShadow: isHovered ? '8px 8px 0 #141414' : '5px 5px 0 #141414',
                  transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                  transition: 'all 0.22s ease',
                  overflow: 'hidden',
                  position: 'relative',
                }}>

                  {/* Slanted folder tab */}
                  <div style={{
                    position: 'absolute', top: -38, left: 0,
                    background: extra.color, border: '2.5px solid #141414',
                    borderBottom: 'none',
                    height: 40, minWidth: 160, padding: '0 28px 0 16px',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0 100%)',
                    fontFamily: 'Space Grotesk, monospace',
                    fontSize: '0.7rem', fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#141414',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#141414', display: 'inline-block' }} />
                    {extra.tag}
                  </div>

                  {/* Cover Image */}
                  <div style={{
                    width: '100%', aspectRatio: '16/10',
                    overflow: 'hidden', background: '#1a1a1a',
                  }}>
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        display: 'block',
                        transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.4rem 1.5rem 1.6rem' }}>

                    {/* Stats row */}
                    <div style={{
                      display: 'flex', gap: '1rem', marginBottom: '0.9rem',
                      flexWrap: 'wrap',
                    }}>
                      {[
                        { icon: <Layers style={{ width: 13, height: 13 }} />, label: extra.stat1 },
                        { icon: <Users style={{ width: 13, height: 13 }} />, label: extra.stat2 },
                        { icon: <Star style={{ width: 13, height: 13 }} />, label: extra.year },
                      ].map((s, i) => (
                        <div key={i} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: '0.68rem', fontWeight: 700, color: '#888',
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                          fontFamily: 'Space Grotesk, monospace',
                        }}>
                          {s.icon} {s.label}
                        </div>
                      ))}
                    </div>

                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                      fontWeight: 900, color: '#141414',
                      letterSpacing: '-0.02em', margin: '0 0 0.45rem 0',
                      lineHeight: 1.1,
                    }}>
                      {p.title}
                    </h3>
                    <p style={{
                      fontSize: '0.88rem', color: '#555',
                      lineHeight: 1.6, margin: '0 0 1.1rem 0',
                    }}>
                      {p.tagline}
                    </p>

                    {/* Tech tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.3rem' }}>
                      {p.tech.map((t, i) => (
                        <span key={i} style={{
                          fontSize: '0.65rem', fontWeight: 700,
                          background: '#141414', color: '#fff',
                          padding: '0.15rem 0.55rem', borderRadius: '999px',
                          letterSpacing: '0.05em', textTransform: 'uppercase',
                          fontFamily: 'Space Grotesk, monospace',
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* External links */}
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            fontSize: '0.72rem', fontWeight: 700, color: '#141414',
                            textDecoration: 'none', border: '1.5px solid #141414',
                            borderRadius: '999px', padding: '0.2rem 0.7rem',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#141414'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#141414'; }}
                        >
                          <Github style={{ width: 12, height: 12 }} /> GitHub
                        </a>
                      )}
                      {p.figmaUrl && (
                        <a
                          href={p.figmaUrl} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            fontSize: '0.72rem', fontWeight: 700, color: '#141414',
                            textDecoration: 'none', border: '1.5px solid #141414',
                            borderRadius: '999px', padding: '0.2rem 0.7rem',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#141414'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#141414'; }}
                        >
                          <Figma style={{ width: 12, height: 12 }} /> Figma
                        </a>
                      )}
                    </div>

                    {/* CTA */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      color: extra.color === '#141414' ? '#17B8DE' : extra.color,
                      fontWeight: 800, fontSize: '0.82rem',
                      fontFamily: 'Space Grotesk, monospace',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                      View Case Study
                      <ArrowRight style={{ width: 14, height: 14, transition: 'transform 0.2s', transform: isHovered ? 'translateX(4px)' : '' }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── FEATURES CALLOUT STRIP ── */}
        <div style={{
          background: '#141414', color: '#fff',
          border: '2.5px solid #141414',
          boxShadow: '6px 6px 0 #17B8DE',
          borderRadius: '16px',
          padding: '2rem 2.5rem',
          display: 'flex', flexWrap: 'wrap', gap: '2rem',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#17B8DE', marginBottom: '0.4rem' }}>
              My Workflow
            </p>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
              From Figma Prototype<br />to Production App
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Research', 'Figma Design', 'Flutter Dev', 'Testing', 'Deployment'].map((step, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: i === 4 ? '#17B8DE' : 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk, monospace', fontWeight: 800, fontSize: '0.8rem', color: '#fff',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MobileAppPage;
