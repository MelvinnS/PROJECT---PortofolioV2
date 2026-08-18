import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Expand, Paperclip } from 'lucide-react';
import { ImageLightbox } from '../components/ui/ImageLightbox';

interface PhotographyDetailProps {
  selectedVideo?: string | null;
  setSelectedVideo?: React.Dispatch<React.SetStateAction<string | null>>;
  selectedImage?: { src: string; title: string } | null;
  setSelectedImage?: React.Dispatch<React.SetStateAction<{ src: string; title: string } | null>>;
}

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  src: string;
}

const galleryPhotos: PhotoItem[] = [
  { id: '1', title: 'Urban Solitude', category: 'Architecture', src: '/assets/creative/photography/gallery-1.jpg' },
  { id: '2', title: 'Golden Hour Shadows', category: 'Portrait', src: '/assets/creative/photography/gallery-2.jpg' },
  { id: '3', title: 'Monochrome Reflection', category: 'Street', src: '/assets/creative/photography/gallery-3.jpg' },
  { id: '4', title: 'Silent Forest', category: 'Nature', src: '/assets/creative/photography/gallery-4.jpg' },
  { id: '5', title: 'City Lights in Motion', category: 'Night', src: '/assets/creative/photography/poto1.jpeg' },
  { id: '6', title: 'Abstract Light Lines', category: 'Abstract', src: '/assets/creative/photography/gallery-5.jpg' },
  { id: '7', title: 'Quiet Moment', category: 'Portrait', src: '/assets/creative/photography/gallery-6.jpg' },
  { id: '8', title: 'Coastal Breeze', category: 'Landscape', src: '/assets/creative/photography/gallery-7.jpg' },
  { id: '9', title: 'Neon Reflections', category: 'Urban', src: '/assets/creative/photography/poto2.jpeg' },
  { id: '10', title: 'Minimalist Architecture', category: 'Design', src: '/assets/creative/photography/gallery-8.jpg' },
  { id: '11', title: 'Faded Memories', category: 'Editorial', src: '/assets/creative/photography/gallery-9.jpg' },
  { id: '12', title: 'Geometric Perspective', category: 'Structure', src: '/assets/creative/photography/gallery-10.jpg' },
  { id: '13', title: 'Intimate Portraiture', category: 'Portrait', src: '/assets/creative/photography/poto3.jpeg' },
  { id: '14', title: 'Dusk Horizons', category: 'Landscape', src: '/assets/creative/photography/gallery-11.jpg' },
  { id: '15', title: 'Cinematic Frame', category: 'Conceptual', src: '/assets/creative/photography/gallery-12.jpg' },
];

const favoriteWorks = [
  {
    id: 'fav-1',
    title: 'Quiet Light',
    tag: 'Portrait',
    description: 'A study in natural light, tone, and intentional stillness.',
    image: '/assets/creative/photography/poto3.jpeg',
    label: '@el_falskie',
  },
  {
    id: 'fav-2',
    title: 'Passing By',
    tag: 'Street',
    description: 'Fragments of everyday rhythm and life in constant motion.',
    image: '/assets/creative/photography/poto2.jpeg',
    label: 'Street Frames',
  },
  {
    id: 'fav-3',
    title: 'Wide Horizon',
    tag: 'Landscape',
    description: 'Scale, space, and a quiet sense of calm across the expanse.',
    image: '/assets/creative/photography/poto1.jpeg',
    label: '@el_falskie',
  },
];

export const PhotographyDetail: React.FC<PhotographyDetailProps> = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : 0));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : 0));
  };

  return (
    <main className="photography-page">
      {/* Scoped CSS Styles for Photography */}
      <style>{`
        .photography-page {
          width: 100% !important;
          min-height: 100vh;
          background-color: var(--bg);
          color: #f4f4f8;
          overflow-x: hidden;
          box-sizing: border-box;
          padding-top: 96px;
          padding-bottom: 96px;
        }

        .photography-container {
          width: 100% !important;
          max-width: 1200px !important;
          margin-left: auto !important;
          margin-right: auto !important;
          margin-inline: auto !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
          padding-inline: 24px !important;
          box-sizing: border-box !important;
          display: flex;
          flex-direction: column;
        }

        /* ---- Masonry gallery: UNTOUCHED, konsep pinterest tetap sama ---- */
        .photography-masonry {
          width: 100% !important;
          column-count: 4;
          column-gap: 24px;
          box-sizing: border-box;
        }

        @media (max-width: 1024px) {
          .photography-masonry {
            column-count: 3;
            column-gap: 18px;
          }
        }

        @media (max-width: 640px) {
          .photography-masonry {
            column-count: 2;
            column-gap: 12px;
          }
          .photography-container {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-inline: 16px !important;
          }
          .photography-page {
            padding-top: 80px;
            padding-bottom: 80px;
          }
        }

        .photography-masonry-item {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          -webkit-column-break-inside: avoid !important;
          margin-bottom: 24px;
          width: 100% !important;
          display: block;
          box-sizing: border-box;
        }

        @media (max-width: 1024px) {
          .photography-masonry-item {
            margin-bottom: 18px;
          }
        }

        @media (max-width: 640px) {
          .photography-masonry-item {
            margin-bottom: 12px;
          }
        }

        /* ---- TITLE / HERO TEXT: centered ---- */
        .hero-text-block {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          max-width: 640px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .hero-text-block > * + * {
          margin-top: 16px !important;
        }

        /* ---- GALLERY HEADER: centered ---- */
        .gallery-header {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          margin-bottom: 56px !important;
          padding-bottom: 32px !important;
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
        }

        .gallery-header > * + * {
          margin-top: 10px !important;
        }

        /* ---- FAVORITE WORKS ---- */
        .fav-section {
          width: 100% !important;
          padding-top: 72px !important;
          margin-top: 40px !important;
          margin-bottom: 96px !important;
          border-top: 1px solid rgba(255,255,255,0.1) !important;
        }

        .fav-header {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          margin-bottom: 56px !important;
        }

        .fav-header > * + * {
          margin-top: 10px !important;
        }

        .fav-grid {
          width: 100% !important;
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 32px !important;
        }

        @media (min-width: 768px) {
          .fav-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 28px !important;
          }
        }

        .fav-card {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
        }

        .fav-card-body {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          flex: 1 1 auto !important;
          padding: 32px 28px !important;
          gap: 24px !important;
        }

        .fav-card-text {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }

        .fav-card-text > * + * {
          margin-top: 10px !important;
        }

        .fav-card-footer {
          margin-top: auto !important;
          padding-top: 20px !important;
          border-top: 1px solid rgba(255,255,255,0.08) !important;
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
        }

        /* ---- CTA SECTION ---- */
        .cta-section {
          width: 100% !important;
          margin-top: 16px !important;
          margin-bottom: 32px !important;
        }

        .cta-box {
          padding: 64px 32px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }

        @media (min-width: 640px) {
          .cta-box {
            padding: 80px 56px !important;
          }
        }

        .cta-box h2 {
          margin-bottom: 16px !important;
        }

        .cta-box p {
          margin-bottom: 32px !important;
        }
      `}</style>

      {/* SHARED CENTERED CONTAINER */}
      <div className="photography-container">
        
        {/* 1. HERO PHOTO */}
        <section className="w-full mb-16 sm:mb-20 md:mb-24">
          <div className="relative w-full h-[240px] sm:h-[340px] md:h-[440px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/assets/creative/photography/poto3.jpeg"
              alt="Photography Hero"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/creative/photography/gallery-1.jpg';
              }}
            />
            {/* Dark gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/30 to-black/40" />

            {/* Back link */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
              <Link
                to="/#creative"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-white/90 hover:text-white hover:bg-black/80 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Back to Creative Works</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. TITLE & SUBTITLE - CENTERED */}
        <section className="w-full mb-20 sm:mb-24 md:mb-28">
          <div className="hero-text-block">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#00d4ff] uppercase block">
              Creative Works / Visual Storytelling
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-tight">
              Photography
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[var(--text-dim)] leading-relaxed font-normal">
              Capturing moments, emotions, and subtle narratives through light, frame, and composition.
            </p>
          </div>
        </section>

        {/* 3. MASONRY GALLERY - konsep pinterest TIDAK DIUBAH */}
        <section className="w-full mb-24 sm:mb-28 md:mb-32">
          {/* Gallery Header - CENTERED */}
          <div className="gallery-header">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff] block">
              Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Selected Frames
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-dim)]">
              Click any frame to view in high resolution.
            </p>
          </div>

          {/* Full-width Masonry — layout tetap sama persis */}
          <div className="photography-masonry">
            {galleryPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className="photography-masonry-item group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#00d4ff]/40 hover:shadow-xl hover:shadow-[#00d4ff]/10"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ display: 'block' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4">
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#00d4ff] uppercase mb-1">
                    {photo.category}
                  </span>
                  <div className="flex items-center justify-between text-white">
                    <h4 className="text-xs sm:text-sm font-semibold truncate max-w-[80%]">
                      {photo.title}
                    </h4>
                    <div className="p-1 sm:p-1.5 rounded-full bg-white/10 backdrop-blur-md">
                      <Expand className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00d4ff]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. LIGHTBOX MODAL */}
        <ImageLightbox
          isOpen={lightboxIndex !== null}
          imageSrc={lightboxIndex !== null ? galleryPhotos[lightboxIndex].src : ''}
          imageAlt={lightboxIndex !== null ? galleryPhotos[lightboxIndex].title : ''}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={lightboxIndex ?? 0}
          totalImages={galleryPhotos.length}
        />

        {/* 5. FAVORITE WORKS - CENTERED */}
        <section className="fav-section">
          {/* Section Header */}
          <div className="fav-header">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff] block">
              Favorite Works
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              A few I keep coming back to
            </h2>
          </div>

          <div className="fav-grid">
            {favoriteWorks.map((work) => (
              <div
                key={work.id}
                className="fav-card group relative rounded-2xl overflow-hidden border border-white/10 bg-[var(--surface)] hover:border-[#00d4ff]/30 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white/90 border border-white/10 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span>{work.label}</span>
                  </div>
                </div>

                {/* Body Content - CENTERED */}
                <div className="fav-card-body">
                  <div className="fav-card-text">
                    <span className="text-xs font-semibold tracking-wider text-[#00d4ff] uppercase block">
                      {work.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {work.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-dim)] leading-relaxed">
                      {work.description}
                    </p>
                  </div>

                  <div className="fav-card-footer">
                    <button
                      onClick={() => {
                        const galleryIdx = galleryPhotos.findIndex((p) => p.src === work.image);
                        if (galleryIdx !== -1) {
                          setLightboxIndex(galleryIdx);
                        } else {
                          setLightboxIndex(0);
                        }
                      }}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-[#00d4ff] transition-colors cursor-pointer w-fit"
                    >
                      <span>View Frame</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CALL TO ACTION - CENTERED */}
        <section className="cta-section">
          <div className="cta-box relative w-full rounded-2xl sm:rounded-3xl text-center overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02]">
            <div className="absolute -top-20 -left-20 w-56 h-56 bg-[#00d4ff]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#7b2cbf]/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Interested in working together?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[var(--text-dim)] max-w-md mx-auto leading-relaxed">
              Available for shoots, collaborations, and creative visual projects.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#00d4ff]/20 hover:shadow-[#00d4ff]/40 hover:-translate-y-0.5 transition-all"
            >
              <Paperclip className="w-4 h-4" />
              <span>Contact Me</span>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default PhotographyDetail;