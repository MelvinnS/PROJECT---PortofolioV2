import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  Heart,
  Download,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Rows3,
  Sparkles,
  Eye,
} from 'lucide-react';
import { photographyGallery } from '../data/creativeData';

/* ─── helpers ──────────────────────────────────────────────── */
// Give each photo a random height bucket so the masonry columns look organic
const SIZE_BUCKETS = ['tall', 'medium', 'short', 'wide'] as const;
type SizeBucket = typeof SIZE_BUCKETS[number];

const BUCKET_HEIGHT: Record<SizeBucket, string> = {
  tall:   '380px',
  medium: '280px',
  short:  '200px',
  wide:   '260px',
};

// Pre-assign buckets consistently (index-based, not random, so no re-render flicker)
const PHOTO_SIZES: SizeBucket[] = [
  'tall', 'medium', 'short', 'wide', 'tall', 'medium',
  'wide', 'short', 'tall', 'medium', 'short', 'tall',
  'medium', 'wide', 'short',
];

// Liked state (local only)
type LikedSet = Set<string>;

/* ─── Photo Card ────────────────────────────────────────────── */
interface PhotoCardProps {
  photo: { id: string; title: string; src: string };
  bucket: SizeBucket;
  index: number;
  liked: boolean;
  onLike: (id: string) => void;
  onOpen: (index: number) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, bucket, index, liked, onLike, onOpen }) => {
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onLike(photo.id);
  };

  // Staggered entrance delay
  const delay = `${index * 60}ms`;

  return (
    <div
      onClick={() => onOpen(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        height: BUCKET_HEIGHT[bucket],
        borderRadius: '14px',
        overflow: 'hidden',
        border: '2.5px solid #141414',
        boxShadow: hovered ? '7px 7px 0 #141414' : '4px 4px 0 #141414',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)',
        background: '#141414',
        // Staggered entrance
        animation: `photoEnter 0.5s ease both`,
        animationDelay: delay,
      }}
    >
      {/* Photo */}
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.4, 1)',
          filter: hovered ? 'brightness(0.7)' : 'brightness(1)',
        }}
      />

      {/* Hover Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Photo Number Badge (top-left) */}
      <div
        style={{
          position: 'absolute',
          top: '0.6rem',
          left: '0.6rem',
          background: 'rgba(255,255,255,0.9)',
          border: '1.5px solid #141414',
          borderRadius: '999px',
          padding: '0.1rem 0.55rem',
          fontFamily: 'Space Grotesk, monospace',
          fontSize: '0.6rem',
          fontWeight: 800,
          color: '#141414',
          letterSpacing: '0.06em',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Like Button (top-right) */}
      <button
        onClick={handleLike}
        style={{
          position: 'absolute',
          top: '0.55rem',
          right: '0.55rem',
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: liked ? '#FF4D6D' : 'rgba(255,255,255,0.88)',
          border: `2px solid ${liked ? '#FF4D6D' : '#141414'}`,
          boxShadow: '2px 2px 0 #141414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: liked ? 'scale(1.15)' : 'scale(1)',
          overflow: 'hidden',
          zIndex: 10,
        }}
        title={liked ? 'Liked!' : 'Like this photo'}
      >
        {/* Ripple */}
        {ripple && (
          <span
            style={{
              position: 'absolute',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,77,109,0.3)',
              left: ripple.x - 40,
              top: ripple.y - 40,
              animation: 'rippleOut 0.6s ease-out forwards',
              pointerEvents: 'none',
            }}
          />
        )}
        <Heart
          style={{
            width: 15,
            height: 15,
            fill: liked ? '#ffffff' : 'none',
            stroke: liked ? '#ffffff' : '#141414',
            strokeWidth: 2.5,
          }}
        />
      </button>

      {/* Bottom Action Bar (visible on hover) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0.6rem 0.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: '#FFD026',
              color: '#141414',
              border: '1.5px solid #141414',
              borderRadius: '999px',
              padding: '0.2rem 0.6rem',
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.62rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <ZoomIn style={{ width: 10, height: 10 }} /> View
          </span>
        </div>

        <Eye style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.8)' }} />
      </div>
    </div>
  );
};

/* ─── Main Page ─────────────────────────────────────────────── */
export const PhotographyPage: React.FC = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<LikedSet>(new Set());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [layout, setLayout] = useState<'masonry' | 'grid'>('masonry');
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [totalLikes, setTotalLikes] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightboxIndex((p) => (p! + 1) % displayPhotos.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((p) => (p! - 1 + displayPhotos.length) % displayPhotos.length);
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  const handleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setTotalLikes((t) => t - 1);
        setToastMsg('💔 Removed from favorites');
      } else {
        next.add(id);
        setTotalLikes((t) => t + 1);
        setToastMsg('❤️ Added to favorites!');
      }
      setTimeout(() => setToastMsg(null), 1800);
      return next;
    });
  }, []);

  const displayPhotos = filter === 'liked'
    ? photographyGallery.filter((p) => liked.has(p.id))
    : photographyGallery;

  // Distribute into 3 masonry columns
  const col1 = displayPhotos.filter((_, i) => i % 3 === 0);
  const col2 = displayPhotos.filter((_, i) => i % 3 === 1);
  const col3 = displayPhotos.filter((_, i) => i % 3 === 2);

  const getOriginalIndex = (photo: typeof photographyGallery[0]) =>
    displayPhotos.findIndex((p) => p.id === photo.id);

  return (
    <div
      style={{
        background: '#ffffff',
        backgroundImage:
          'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        minHeight: '100vh',
        paddingTop: '5.5rem',
        paddingBottom: '6rem',
        color: '#141414',
      }}
    >
      {/* ── Global Animations ── */}
      <style>{`
        @keyframes photoEnter {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes rippleOut {
          from { transform: scale(0); opacity: 1; }
          to   { transform: scale(3); opacity: 0; }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbSlideIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        .ph-filter-btn { transition: all 0.18s ease; }
        .ph-filter-btn:hover { transform: translateY(-2px); }
        .ph-layout-btn { transition: all 0.15s ease; }
        .ph-layout-btn:hover { background: #141414; color: #fff; }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── TOP NAV ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem',
        }}>
          <button
            onClick={() => navigate('/projects')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', fontWeight: 800,
              color: '#141414', background: '#ffffff', border: '2.5px solid #141414',
              boxShadow: '3px 3px 0 #141414', borderRadius: '999px', padding: '0.45rem 1.2rem',
              cursor: 'pointer', letterSpacing: '0.04em',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #141414'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #141414'; (e.currentTarget as HTMLElement).style.transform = ''; }}
          >
            <ArrowLeft style={{ width: 15, height: 15 }} /> Back to Projects
          </button>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#141414', color: '#fff',
            fontFamily: 'Space Grotesk, monospace', fontSize: '0.72rem', fontWeight: 800,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '0.4rem 1.1rem', borderRadius: '999px', border: '2px solid #141414',
          }}>
            <Camera style={{ width: 13, height: 13 }} />
            Photography Gallery
          </div>
        </div>

        {/* ── HERO HEADER ── */}
        <header style={{ marginBottom: '3rem', position: 'relative' }}>
          {/* Floating Camera Emoji Stamp */}
          <div
            style={{
              position: 'absolute', top: '-10px', right: '2%',
              fontSize: '4rem', lineHeight: 1,
              animation: 'floatY 3s ease-in-out infinite',
              cursor: 'default', userSelect: 'none',
            }}
          >
            📷
          </div>

          <span style={{
            fontFamily: 'Caveat, cursive', fontSize: '1.6rem', fontWeight: 700,
            color: '#555', display: 'block', marginBottom: '0.15rem',
          }}>
            moments through the lens ◜
          </span>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 900, color: '#141414',
            letterSpacing: '-0.04em', lineHeight: 0.95,
            margin: '0 0 1rem 0', textTransform: 'uppercase',
          }}>
            PHOTO<br />GALLERY
          </h1>

          <p style={{
            fontSize: '1.05rem', color: '#555', lineHeight: 1.65,
            maxWidth: '540px', margin: '0 0 2rem 0',
          }}>
            A curated collection of personal photography — urban stories, candid moments, and visual experiments. Each frame tells a story.
          </p>

          {/* Stats Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[
              { icon: '📸', label: `${photographyGallery.length} Photos` },
              { icon: '❤️', label: `${totalLikes} Liked` },
              { icon: '🎞️', label: 'Original Shots' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem', fontWeight: 700,
                color: '#555',
              }}>
                <span style={{ fontSize: '1rem' }}>{s.icon}</span> {s.label}
              </div>
            ))}
          </div>

          {/* Controls Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Filter buttons */}
            <button
              className="ph-filter-btn"
              onClick={() => setFilter('all')}
              style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.78rem', fontWeight: 800,
                padding: '0.45rem 1.1rem', borderRadius: '999px',
                border: '2px solid #141414',
                background: filter === 'all' ? '#141414' : '#fff',
                color: filter === 'all' ? '#fff' : '#141414',
                boxShadow: filter === 'all' ? '3px 3px 0 #FFD026' : '2.5px 2.5px 0 #141414',
                cursor: 'pointer', letterSpacing: '0.04em',
              }}
            >
              All Photos ({photographyGallery.length})
            </button>
            <button
              className="ph-filter-btn"
              onClick={() => setFilter('liked')}
              style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.78rem', fontWeight: 800,
                padding: '0.45rem 1.1rem', borderRadius: '999px',
                border: '2px solid #141414',
                background: filter === 'liked' ? '#FF4D6D' : '#fff',
                color: filter === 'liked' ? '#fff' : '#141414',
                boxShadow: filter === 'liked' ? '3px 3px 0 #141414' : '2.5px 2.5px 0 #141414',
                cursor: 'pointer', letterSpacing: '0.04em',
              }}
            >
              <Heart style={{ width: 12, height: 12, display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              Favorites ({liked.size})
            </button>

            {/* Layout Toggle */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
              {[
                { mode: 'masonry' as const, icon: <Rows3 style={{ width: 16, height: 16 }} />, label: 'Masonry' },
                { mode: 'grid' as const, icon: <Grid3X3 style={{ width: 16, height: 16 }} />, label: 'Grid' },
              ].map((t) => (
                <button
                  key={t.mode}
                  className="ph-layout-btn"
                  onClick={() => setLayout(t.mode)}
                  title={t.label}
                  style={{
                    width: 40, height: 40, borderRadius: '10px',
                    border: '2px solid #141414',
                    background: layout === t.mode ? '#141414' : '#fff',
                    color: layout === t.mode ? '#fff' : '#141414',
                    boxShadow: '2.5px 2.5px 0 #141414',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {t.icon}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ── Empty Liked State ── */}
        {filter === 'liked' && liked.size === 0 && (
          <div style={{
            textAlign: 'center', padding: '5rem 2rem',
            background: '#fff', border: '2.5px dashed #ccc',
            borderRadius: '16px', marginBottom: '3rem',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>💔</div>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#888' }}>
              No favorites yet — click the ❤️ on any photo to save it here.
            </p>
          </div>
        )}

        {/* ── MASONRY LAYOUT ── */}
        {layout === 'masonry' && displayPhotos.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.4rem', alignItems: 'start' }}>
            {[col1, col2, col3].map((col, colIdx) => (
              <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {col.map((photo) => {
                  const origIdx = getOriginalIndex(photo);
                  const bucket = PHOTO_SIZES[parseInt(photo.id) - 1] ?? 'medium';
                  return (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      bucket={bucket}
                      index={origIdx}
                      liked={liked.has(photo.id)}
                      onLike={handleLike}
                      onOpen={setLightboxIndex}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* ── GRID LAYOUT ── */}
        {layout === 'grid' && displayPhotos.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.4rem',
          }}>
            {displayPhotos.map((photo, idx) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                bucket="medium"
                index={idx}
                liked={liked.has(photo.id)}
                onLike={handleLike}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
        )}

        {/* ── BOTTOM CALLOUT ── */}
        <div style={{
          marginTop: '4.5rem',
          background: '#141414', color: '#fff',
          border: '2.5px solid #141414',
          boxShadow: '6px 6px 0 #FFD026',
          borderRadius: '16px',
          padding: '2rem 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1.5rem',
        }}>
          <div>
            <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFD026', marginBottom: '0.35rem' }}>
              Behind the Lens
            </p>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 0.35rem 0' }}>
              Shot on Canon EOS & iPhone
            </h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0, maxWidth: '420px' }}>
              Every photo is an original — no stock images, no AI generation. Just real moments, real light, and a passionate eye for composition.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles style={{ width: 18, height: 18, color: '#FFD026' }} />
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>
              {photographyGallery.length} Original Shots
            </span>
          </div>
        </div>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)',
            background: '#141414', color: '#fff',
            border: '2px solid #FFD026', boxShadow: '3px 3px 0 #FFD026',
            borderRadius: '999px', padding: '0.5rem 1.3rem',
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', fontWeight: 700,
            zIndex: 9999, whiteSpace: 'nowrap',
            animation: 'toastIn 0.3s ease',
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* ── LIGHTBOX MODAL ── */}
      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
            animation: 'lbFadeIn 0.25s ease',
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              width: 42, height: 42, borderRadius: '50%',
              background: '#fff', color: '#141414',
              border: '2.5px solid #141414', boxShadow: '3px 3px 0 #141414',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 1,
            }}
          >
            <X style={{ width: 18, height: 18 }} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p! - 1 + displayPhotos.length) % displayPhotos.length); }}
            style={{
              position: 'absolute', left: '1.25rem',
              width: 44, height: 44, borderRadius: '50%',
              background: '#fff', color: '#141414',
              border: '2.5px solid #141414', boxShadow: '3px 3px 0 #141414',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft style={{ width: 20, height: 20 }} />
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', maxWidth: '88vw', maxHeight: '88vh',
              border: '3px solid #ffffff',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              borderRadius: '16px', overflow: 'hidden',
              animation: 'lbSlideIn 0.25s ease',
            }}
          >
            <img
              src={displayPhotos[lightboxIndex].src}
              alt={displayPhotos[lightboxIndex].title}
              style={{ maxWidth: '88vw', maxHeight: '86vh', display: 'block', objectFit: 'contain' }}
            />

            {/* Bottom bar inside lightbox */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
              padding: '1.5rem 1.25rem 1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <span style={{
                  fontFamily: 'Space Grotesk, monospace', fontSize: '0.68rem',
                  fontWeight: 800, color: '#FFD026', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  PHOTO {String(lightboxIndex + 1).padStart(2, '0')} / {String(displayPhotos.length).padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleLike(displayPhotos[lightboxIndex].id); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: liked.has(displayPhotos[lightboxIndex].id) ? '#FF4D6D' : 'rgba(255,255,255,0.15)',
                  color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)',
                  borderRadius: '999px', padding: '0.3rem 0.8rem',
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.75rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >
                <Heart style={{ width: 13, height: 13, fill: liked.has(displayPhotos[lightboxIndex].id) ? '#fff' : 'none', stroke: '#fff' }} />
                {liked.has(displayPhotos[lightboxIndex].id) ? 'Liked' : 'Like'}
              </button>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p! + 1) % displayPhotos.length); }}
            style={{
              position: 'absolute', right: '1.25rem',
              width: 44, height: 44, borderRadius: '50%',
              background: '#fff', color: '#141414',
              border: '2.5px solid #141414', boxShadow: '3px 3px 0 #141414',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronRight style={{ width: 20, height: 20 }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotographyPage;
