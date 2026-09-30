import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Film,
  Sparkles,
  Clapperboard,
  Heart,
  X,
  SlidersHorizontal,
  Info,
  Check,
  Video,
} from 'lucide-react';
import './VideoEditingPage.css';

interface MediaItem {
  id: string;
  type: 'short-movie' | 'video-editing';
  title: string;
  categoryLabel: string;
  duration: string;
  genresOrSoftware: string[];
  roles?: string[];
  synopsis: string;
  thumb: string;
  youtubeId: string;
  trailerId?: string;
  year: string;
  featuredBadge?: string;
}

const ALL_MEDIA: MediaItem[] = [
  // ── Short Movies ──
  {
    id: 'janji-terakhir',
    type: 'short-movie',
    title: 'Janji Terakhir',
    categoryLabel: 'Short Movie',
    duration: '22 Minutes',
    genresOrSoftware: ['Drama', 'Romance', 'Horror'],
    roles: ['Director', 'Editor', 'Screenwriter', 'Cinematographer'],
    synopsis: "As their mother's life hangs by a thread, two siblings uncover a terrifying secret behind the debt that destroyed their family—a secret rooted in dark magic and impossible choices.",
    thumb: '/assets/creative/film/posterfilm.png',
    youtubeId: '_A_tKtmoFFM',
    trailerId: 'H_PJlMCc4ng',
    year: '2023',
    featuredBadge: '#1 FEATURED FILM',
  },
  {
    id: 'ombak-harapan',
    type: 'short-movie',
    title: 'Ombak Harapan',
    categoryLabel: 'Short Movie',
    duration: '14 Minutes',
    genresOrSoftware: ['Drama', 'Family', 'Inspirational'],
    roles: ['Director', 'Editor'],
    synopsis: 'When two young men from opposite worlds unexpectedly trade lives, they begin to realize that freedom and wealth rarely exist in the same place.',
    thumb: '/assets/creative/film/ombakharapan.jpg',
    youtubeId: 'ew-ctNjjXE8',
    trailerId: 'lThFvAcGehw',
    year: '2023',
    featuredBadge: 'FESTIVAL SELECTION',
  },
  {
    id: 'ryuichi',
    type: 'short-movie',
    title: 'Tunggu Ryuichi Sukses Nanti',
    categoryLabel: 'Short Movie',
    duration: '2 Minutes',
    genresOrSoftware: ['Drama', 'Comedy', 'Indie'],
    roles: ['Editor'],
    synopsis: 'After a series of endless scams, rejection, and bad luck, an unemployed young man is offered a mysterious app that promises to change the way he finds work—if he dares to trust it.',
    thumb: '/assets/creative/film/posterryu.png',
    youtubeId: 'P-wjgw4nA9k',
    year: '2024',
    featuredBadge: 'OFFICIAL SHORT',
  },

  // ── Video Editing ──
  {
    id: 'wedding-highlight',
    type: 'video-editing',
    title: 'Wedding Highlight Film',
    categoryLabel: 'Video Editing',
    duration: '3:40 Min',
    genresOrSoftware: ['DaVinci Resolve', 'Color Grading', 'Premiere Pro'],
    roles: ['Video Editor & Colorist'],
    synopsis: 'Cinematic wedding highlight with emotion-driven pacing, warm romantic color palette, and carefully balanced acoustic sound design.',
    thumb: '/assets/creative/video/wedding.png',
    youtubeId: 'iS02TKWT4XM',
    year: '2024',
    featuredBadge: 'COMMERCIAL HIGHLIGHT',
  },
  {
    id: 'aftermovie-p5',
    type: 'video-editing',
    title: 'AfterMovie P5 & MPLS Event',
    categoryLabel: 'Video Editing',
    duration: '2:50 Min',
    genresOrSoftware: ['DaVinci Resolve', 'Speed Ramping', 'Sound Design'],
    roles: ['Lead Editor'],
    synopsis: 'Fast-paced, high-energy school festival aftermovie featuring beat-synchronized transitions and dynamic sound effects to capture peak crowd energy.',
    thumb: '/assets/creative/video/aftermovie.png',
    youtubeId: '9GUL7EQamg8',
    year: '2024',
    featuredBadge: 'EVENT RECAP',
  },
  {
    id: 'education-video',
    type: 'video-editing',
    title: 'Educational Explainer Content',
    categoryLabel: 'Video Editing',
    duration: '4:15 Min',
    genresOrSoftware: ['After Effects', 'Motion Graphics', 'Premiere Pro'],
    roles: ['Motion & Video Editor'],
    synopsis: 'Engaging educational motion video designed to retain viewer attention with smooth graphic callouts, text animation, and clean audio mastering.',
    thumb: '/assets/creative/video/edukasi.png',
    youtubeId: 'Plx1fMDU5SU',
    year: '2023',
    featuredBadge: 'EDUCATIONAL',
  },
];

export const VideoEditingPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'short-movie' | 'video-editing'>('all');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleWatchlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        triggerToast('Removed from Watchlist');
      } else {
        next.add(id);
        triggerToast('Added to Watchlist! 🎬');
      }
      return next;
    });
  };

  const spotlightItem = ALL_MEDIA[spotlightIndex] || ALL_MEDIA[0];

  const shortMovies = ALL_MEDIA.filter((m) => m.type === 'short-movie');
  const videoEdits = ALL_MEDIA.filter((m) => m.type === 'video-editing');

  return (
    <div className="ve-page">
      <div className="ve-container">

        {/* ── TOP NAV BAR ── */}
        <div className="ve-top-nav">
          <button
            onClick={() => navigate('/projects')}
            className="ve-back-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>

          <div className="ve-badge-pill">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Video &amp; Editing Directory</span>
          </div>
        </div>

        {/* ── HEADER ── */}
        <header className="ve-header">
          <span className="ve-anno">cinema &amp; post-production ◜</span>
          <h1 className="ve-title">VIDEO &amp; EDITING</h1>
          <p className="ve-desc">
            Narrative filmmaking and high-impact video editing. From directing festival short films to color grading and sound design in DaVinci Resolve.
          </p>

          {/* Filter Pills */}
          <div className="ve-filter-row">
            <button
              className={`ve-filter-btn ${filter === 'all' ? 've-filter-btn--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Works ({ALL_MEDIA.length})
            </button>
            <button
              className={`ve-filter-btn ${filter === 'short-movie' ? 've-filter-btn--active' : ''}`}
              onClick={() => setFilter('short-movie')}
            >
              🎬 Short Movies ({shortMovies.length})
            </button>
            <button
              className={`ve-filter-btn ${filter === 'video-editing' ? 've-filter-btn--active' : ''}`}
              onClick={() => setFilter('video-editing')}
            >
              ✂️ Video Editing ({videoEdits.length})
            </button>
          </div>
        </header>

        {/* ── TOAST NOTIFICATION ── */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#141414',
              color: '#ffffff',
              border: '2px solid #FF2B85',
              boxShadow: '3px 3px 0 #FF2B85',
              borderRadius: '999px',
              padding: '0.5rem 1.4rem',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 800,
              zIndex: 9999,
              animation: 'bounce 0.3s ease',
            }}
          >
            {toastMessage}
          </div>
        )}

        {/* ── NETFLIX-STYLE HERO SPOTLIGHT BILLBOARD ── */}
        <div className="ve-billboard">
          <img
            src={spotlightItem.thumb}
            alt={spotlightItem.title}
            className="ve-billboard-bg"
          />
          <div className="ve-billboard-overlay" />

          <div className="ve-billboard-content">
            <span className="ve-top10-badge">
              <Sparkles className="w-3 h-3" />
              {spotlightItem.featuredBadge || 'FEATURED SPOTLIGHT'}
            </span>

            <h2 className="ve-billboard-title">{spotlightItem.title}</h2>

            <div className="ve-billboard-meta">
              <span className="ve-meta-pill">{spotlightItem.duration}</span>
              <span className="ve-meta-pill">{spotlightItem.year}</span>
              <span className="ve-meta-pill">HD 4K</span>
              <span className="ve-meta-pill">5.1 SOUND</span>
            </div>

            <p className="ve-billboard-synopsis">{spotlightItem.synopsis}</p>

            <div className="ve-billboard-actions">
              <button
                type="button"
                className="ve-btn-play"
                onClick={() => setActiveVideoModal(spotlightItem.youtubeId)}
              >
                <Play className="w-4 h-4 fill-current" /> Watch Video
              </button>

              {spotlightItem.trailerId && (
                <button
                  type="button"
                  className="ve-btn-trailer"
                  onClick={() => setActiveVideoModal(spotlightItem.trailerId!)}
                >
                  <Film className="w-4 h-4" /> Watch Trailer
                </button>
              )}
            </div>
          </div>

          {/* Spotlight Quick Switcher Dots */}
          <div className="ve-spotlight-nav">
            {ALL_MEDIA.slice(0, 4).map((_, idx) => (
              <span
                key={idx}
                className={`ve-spotlight-dot ${idx === spotlightIndex ? 've-spotlight-dot--active' : ''}`}
                onClick={() => setSpotlightIndex(idx)}
                title={`Spotlight ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── SECTION 1: SHORT MOVIES (NETFLIX RAIL) ── */}
        {(filter === 'all' || filter === 'short-movie') && (
          <section className="ve-section">
            <div className="ve-section-header">
              <h2 className="ve-section-title">🎬 Short Movies &amp; Independent Cinema</h2>
              <span className="ve-section-tag">Narrative Drama · Mystery · Comedy</span>
            </div>

            <div className="ve-cards-grid">
              {shortMovies.map((movie) => {
                const isSaved = watchlist.has(movie.id);
                return (
                  <div
                    key={movie.id}
                    className="ve-movie-card"
                    onClick={() => setActiveVideoModal(movie.youtubeId)}
                  >
                    <div className="ve-card-thumb">
                      <img
                        src={movie.thumb}
                        alt={movie.title}
                        className="ve-card-img"
                        loading="lazy"
                      />
                      <span className="ve-category-badge">Short Film</span>
                      <span className="ve-duration-badge">{movie.duration}</span>

                      <div className="ve-play-overlay">
                        <div className="ve-play-circle">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="ve-card-body">
                      <h3 className="ve-card-title">{movie.title}</h3>
                      <p className="ve-card-synopsis">{movie.synopsis}</p>

                      <div className="ve-tag-list">
                        {movie.genresOrSoftware.map((g, idx) => (
                          <span key={idx} className="ve-tag">
                            {g}
                          </span>
                        ))}
                      </div>

                      <div className="ve-card-actions">
                        <span className="ve-watch-text">
                          <Play className="w-3.5 h-3.5 fill-current" /> Watch Film
                        </span>

                        <button
                          type="button"
                          className="ve-fav-btn"
                          onClick={(e) => toggleWatchlist(movie.id, e)}
                          title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
                          style={{
                            background: isSaved ? '#FF2B85' : '#ffffff',
                            color: isSaved ? '#ffffff' : '#141414',
                          }}
                        >
                          <Heart
                            className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── SECTION 2: VIDEO EDITING (NETFLIX RAIL) ── */}
        {(filter === 'all' || filter === 'video-editing') && (
          <section className="ve-section">
            <div className="ve-section-header">
              <h2 className="ve-section-title">✂️ Commercial &amp; Event Video Editing</h2>
              <span className="ve-section-tag">Aftermovie · Wedding · Explainer</span>
            </div>

            <div className="ve-cards-grid">
              {videoEdits.map((item) => {
                const isSaved = watchlist.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="ve-movie-card"
                    onClick={() => setActiveVideoModal(item.youtubeId)}
                  >
                    <div className="ve-card-thumb">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="ve-card-img"
                        loading="lazy"
                      />
                      <span
                        className="ve-category-badge"
                        style={{ background: '#141414' }}
                      >
                        {item.categoryLabel}
                      </span>
                      <span className="ve-duration-badge">{item.duration}</span>

                      <div className="ve-play-overlay">
                        <div className="ve-play-circle">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="ve-card-body">
                      <h3 className="ve-card-title">{item.title}</h3>
                      <p className="ve-card-synopsis">{item.synopsis}</p>

                      <div className="ve-tag-list">
                        {item.genresOrSoftware.map((s, idx) => (
                          <span key={idx} className="ve-tag">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="ve-card-actions">
                        <span className="ve-watch-text">
                          <Play className="w-3.5 h-3.5 fill-current" /> Watch Video
                        </span>

                        <button
                          type="button"
                          className="ve-fav-btn"
                          onClick={(e) => toggleWatchlist(item.id, e)}
                          title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
                          style={{
                            background: isSaved ? '#FF2B85' : '#ffffff',
                            color: isSaved ? '#ffffff' : '#141414',
                          }}
                        >
                          <Heart
                            className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── WORKFLOW CALLOUT STRIP ── */}
        <div className="ve-strip">
          <div>
            <p
              style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FF2B85',
                marginBottom: '0.4rem',
              }}
            >
              Post-Production Workflow
            </p>
            <h3 className="ve-strip-title">The Complete Video Pipeline</h3>
            <p className="ve-strip-p">
              From raw footage ingest and narrative assembly to frame-by-frame color grading in DaVinci Resolve and surgical audio mixing.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {['Planning', 'Rough Cut', 'Fine Pacing', 'Color Grade', 'Audio Mix'].map(
              (step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: i === 3 ? '#FF2B85' : 'rgba(255,255,255,0.1)',
                      border: '2px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Grotesk, monospace',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      color: '#ffffff',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.7)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {step}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

      </div>

      {/* ── YOUTUBE VIDEO PLAYER MODAL ── */}
      {activeVideoModal && (
        <div
          className="ve-modal-overlay"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="ve-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="ve-modal-close"
              onClick={() => setActiveVideoModal(null)}
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1&rel=0`}
              title="Video Player"
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoEditingPage;
