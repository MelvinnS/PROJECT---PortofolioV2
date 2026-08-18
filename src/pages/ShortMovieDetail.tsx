import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shortMoviesData } from '../data/creativeData';
import { VideoModal } from '../components/ui/VideoModal';
import { ImageLightbox } from '../components/ui/ImageLightbox';

interface ShortMovieDetailProps {
  selectedVideo: string | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  selectedImage: { src: string; title: string } | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<{ src: string; title: string } | null>>;
}

// Backdrop 16:9 khusus hero — beda dari featuredFilm.poster (2:3) yang dipakai di baris "More Like This".
const HERO_BACKDROP = '/assets/creative/film/posterfilm2.png';

const ShortMovieDetail: React.FC<ShortMovieDetailProps> = ({
  selectedVideo,
  setSelectedVideo,
  selectedImage,
  setSelectedImage,
}) => {
  const featuredFilm = shortMoviesData[0];
  const otherFilms = shortMoviesData.slice(1);
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollRow = (dir: 'left' | 'right') => {
    rowRef.current?.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
  };

  return (
    <main className="pb-16">
      {/* HERO — full-bleed 16:9 backdrop, Netflix-style bottom fade */}
      <section className="nf-hero">
        <img src={HERO_BACKDROP} alt={featuredFilm.title} className="nf-hero-img" />
        <div className="nf-hero-fade-top" />
        <div className="nf-hero-fade-left" />
        <div className="nf-hero-fade-bottom" />

        <Link to="/#creative" className="nf-back-btn">
          <ChevronLeft className="w-4 h-4 text-[#00d4ff] group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Creative Works</span>
        </Link>

        <div className="nf-hero-content">
          <div className="cs-tag !mb-3">Cinematic Stories</div>
          <h1 className="nf-hero-title">{featuredFilm.title}</h1>
          <div className="nf-hero-meta">
            {featuredFilm.genres.join(' · ')} <span className="nf-dot">•</span> {featuredFilm.duration}
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setSelectedVideo(featuredFilm.trailerYtId || null)}
              className="nf-btn nf-btn-primary"
            >
              <Play className="w-4 h-4 fill-black" /> Watch Trailer
            </button>
            <button
              onClick={() => setSelectedVideo(featuredFilm.fullYtId)}
              className="nf-btn nf-btn-secondary"
            >
              <Film className="w-4 h-4" /> Watch Full Film
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT — synopsis + quick facts, Netflix detail-page style */}
      <section className="section pt-10">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <h4 className="font-semibold text-lg mb-2">Synopsis</h4>
              <p className="text-[var(--text-dim)] leading-relaxed">{featuredFilm.synopsis}</p>
            </div>
            <div className="md:col-span-4">
              <h4 className="font-semibold text-sm text-[var(--text-dim)] uppercase tracking-wider mb-3">
                Cast &amp; Crew
              </h4>
              <div className="flex flex-wrap gap-2">
                {featuredFilm.roles.map((r, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-[rgba(255,255,255,0.06)] border border-[var(--border)] text-[var(--text-dim)]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MORE LIKE THIS — Netflix-style horizontal row with hover-expand cards */}
      <section className="section pt-4">
        <div className="section-inner">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title !mb-0">More Like This</h2>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scrollRow('left')} className="nf-row-nav" aria-label="Scroll left">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollRow('right')} className="nf-row-nav" aria-label="Scroll right">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={rowRef} className="nf-row">
            {otherFilms.map((film) => (
              <div key={film.id} className="nf-card">
                <img src={film.poster} alt={film.title} className="nf-card-img" />
                <div className="nf-card-overlay">
                  <h3 className="nf-card-title">{film.title}</h3>
                  <div className="nf-card-meta">
                    {film.genres.join(' · ')} <span className="nf-dot">•</span> {film.duration}
                  </div>
                  <div className="flex gap-2 mt-3">
                    {film.trailerYtId && (
                      <button
                        onClick={() => setSelectedVideo(film.trailerYtId)}
                        className="nf-card-btn nf-card-btn-primary"
                        aria-label={`Watch trailer for ${film.title}`}
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedVideo(film.fullYtId)}
                      className="nf-card-btn nf-card-btn-secondary"
                      aria-label={`Watch full film ${film.title}`}
                    >
                      <Film className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal isOpen={!!selectedVideo} youtubeId={selectedVideo || ''} onClose={() => setSelectedVideo(null)} />
      <ImageLightbox
        isOpen={!!selectedImage}
        imageSrc={selectedImage?.src ?? ''}
        imageAlt={selectedImage?.title ?? ''}
        onClose={() => setSelectedImage(null)}
      />

      <style>{`
        /* ---------- HERO ---------- */
        .nf-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          min-height: 380px;
          max-height: 82vh;
          overflow: hidden;
          background: #000;
        }
        .nf-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .nf-hero-fade-top {
          position: absolute;
          inset: 0 0 auto 0;
          height: 35%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%);
          pointer-events: none;
        }
        .nf-hero-fade-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 42%, transparent 72%);
          pointer-events: none;
        }
        .nf-hero-fade-bottom {
          position: absolute;
          inset: auto 0 0 0;
          height: 65%;
          background: linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 22%, rgba(0,0,0,0.35) 55%, transparent 100%);
          pointer-events: none;
        }
        .nf-back-btn {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          font-size: 0.8125rem;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .nf-back-btn:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
          border-color: rgba(0,212,255,0.4);
        }
        .nf-hero-content {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          padding: 0 1.5rem 2.5rem;
          max-width: 1180px;
          margin: 0 auto;
        }
        .nf-hero-title {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 1.02;
          font-size: clamp(2rem, 6vw, 4.25rem);
          text-shadow: 0 4px 24px rgba(0,0,0,0.6);
          margin: 0;
        }
        .nf-hero-meta {
          margin-top: 0.75rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 12px rgba(0,0,0,0.6);
        }
        .nf-dot { color: rgba(255,255,255,0.4); margin: 0 0.15rem; }

        .nf-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 700;
          font-size: 0.9375rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nf-btn-primary {
          background: #fff;
          color: #000;
        }
        .nf-btn-primary:hover { background: rgba(255,255,255,0.8); }
        .nf-btn-secondary {
          background: rgba(120,120,130,0.35);
          color: #fff;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
        }
        .nf-btn-secondary:hover { background: rgba(120,120,130,0.5); }

        @media (max-width: 640px) {
          .nf-hero { aspect-ratio: 4 / 5; min-height: 460px; }
          .nf-hero-content { padding: 0 1.25rem 2rem; }
        }

        /* ---------- MORE LIKE THIS ROW ---------- */
        .nf-row-nav {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-dim);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nf-row-nav:hover { color: #fff; border-color: #00d4ff; }

        .nf-row {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 0.5rem 0.5rem 1.25rem 0.25rem;
          scroll-snap-type: x proximity;
          scrollbar-width: none;
        }
        .nf-row::-webkit-scrollbar { display: none; }

        .nf-card {
          position: relative;
          flex: 0 0 auto;
          width: 200px;
          aspect-ratio: 2 / 3;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
          scroll-snap-align: start;
          cursor: default;
          transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0s;
        }
        .nf-card:hover {
          transform: scale(1.08);
          z-index: 5;
          box-shadow: 0 24px 48px -12px rgba(0,0,0,0.6);
          border-color: rgba(0,212,255,0.4);
        }
        .nf-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .nf-card-overlay {
          position: absolute;
          inset: auto 0 0 0;
          padding: 1rem 0.875rem 0.875rem;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 55%, transparent 100%);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .nf-card:hover .nf-card-overlay { opacity: 1; transform: translateY(0); }
        .nf-card-title {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.25rem;
        }
        .nf-card-meta {
          font-size: 0.6875rem;
          color: rgba(255,255,255,0.7);
        }
        .nf-card-btn {
          width: 1.875rem;
          height: 1.875rem;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .nf-card-btn:hover { transform: scale(1.1); }
        .nf-card-btn-primary { background: #fff; }
        .nf-card-btn-secondary {
          background: rgba(120,120,130,0.5);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }

        @media (prefers-reduced-motion: reduce) {
          .nf-card, .nf-card-overlay, .nf-back-btn, .nf-btn, .nf-card-btn {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default ShortMovieDetail;