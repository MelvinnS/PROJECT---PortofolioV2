import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VideoModal } from '../components/ui/VideoModal';
import { ImageLightbox } from '../components/ui/ImageLightbox';

interface GraphicDesignDetailProps {
  selectedVideo: string | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  selectedImage: { src: string; title: string } | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<{ src: string; title: string } | null>>;
}

type ProjectKey = 'trashback' | 'parentstalk';

// 3 foto preview di hero — bebas diganti/ditambah, otomatis dapat animasi masuk + hover.
const heroPreviews = [
  { src: '/assets/creative/graphic/trashbackP.png', title: 'Trashback' },
  { src: '/assets/creative/graphic/parentstalk/IDCard.png', title: 'Trashback' },
  { src: '/assets/creative/graphic/parentstalk/Group 107.jpg', title: 'Parents Talk' },
];

// Data 2 project digabung di satu tempat. Tinggal tambah/hapus item di array `images`
// kalau nanti ada file baru — urutan gallery mengikuti urutan array ini.
const projects: Record<
  ProjectKey,
  { label: string; description: string; layout: 'fixed' | 'masonry'; images: string[] }
> = {
  trashback: {
    label: 'Trashback',
    description:
      'UI/UX untuk aplikasi pengelolaan sampah — seluruh layar didesain pada rasio 9:16.',
    layout: 'fixed', // semua foto 9:16 → grid rapi
    images: [
      
      '/assets/creative/graphic/trashback/Main Menu-2.png',
      '/assets/creative/graphic/trashback/Main Menu-4.png',
      '/assets/creative/graphic/trashback/Main Menu-1.png',
      '/assets/creative/graphic/trashback/EcoMentor.png',
      '/assets/creative/graphic/trashback/shop.png',
      '/assets/creative/graphic/trashback/finish1.png',
      '/assets/creative/graphic/trashback/finish2.png',
      '/assets/creative/graphic/trashback/finish3.png',
      '/assets/creative/graphic/trashback/finish4.png',
      '/assets/creative/graphic/trashback/finish5.png',
    ],
  },
  parentstalk: {
    label: 'Parents Talk',
    description: 'Desain kampanye & brand — banner, poster, dan materi identitas dengan rasio bervariasi.',
    layout: 'masonry', // rasio beda-beda → pakai masonry biar tidak crop
    images: [
      '/assets/creative/graphic/parentstalk/Banner.png',
      '/assets/creative/graphic/parentstalk/Banner2.png',
      '/assets/creative/graphic/parentstalk/Banner3.png',
      '/assets/creative/graphic/parentstalk/Banner4.png',
      '/assets/creative/graphic/parentstalk/Banner5.png',
      '/assets/creative/graphic/parentstalk/Feed Poster.png',
      '/assets/creative/graphic/parentstalk/Flyer H-1.png',
      '/assets/creative/graphic/parentstalk/flyer2.png',
      '/assets/creative/graphic/parentstalk/Group 107.jpg',
      '/assets/creative/graphic/parentstalk/IDCard.png',
      '/assets/creative/graphic/parentstalk/Live Report.png',
      '/assets/creative/graphic/parentstalk/poster.png',
    ],
  },
};

const GraphicDesignDetail: React.FC<GraphicDesignDetailProps> = ({
  selectedVideo,
  setSelectedVideo,
  selectedImage,
  setSelectedImage,
}) => {
  const [active, setActive] = useState<ProjectKey>('trashback');
  const current = projects[active];

  const openLightbox = (src: string, title: string) => setSelectedImage({ src, title });

  return (
    <main className="pb-16 pt-24 sm:pt-28">
      {/* Back Button Container (iOS Style Header - Pojok Kiri Atas) */}
      <div className="max-w-[1180px] mx-auto px-6 mb-4 sm:mb-6 flex justify-start">
        <Link
          to="/#creative"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/12 backdrop-blur-md text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-all shadow-sm hover:border-[#00d4ff]/40 group w-fit active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#00d4ff] group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Creative Works</span>
        </Link>
      </div>

      {/* HERO */}
      <section className="cs-hero !pt-2 sm:!pt-4">
        <div className="cs-tag">Creative Works</div>
        <h1>
          Graphic <span className="grad-text">Design</span>
        </h1>
        <p className="cs-tagline">
          Where product thinking meets visual craft — interfaces, brands, and everything in between.
        </p>

        <div className="hero-preview-row">
          {heroPreviews.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => openLightbox(img.src, img.title)}
              className="hero-preview-card"
              style={{ animationDelay: `${i * 0.15}s, ${0.9 + i * 0.15}s` }}
              aria-label={`Lihat pratinjau ${img.title}`}
            >
              <img src={img.src} alt={img.title} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {/* DESIGN PHILOSOPHY */}
      <section className="section pt-0">
        <div className="section-inner text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="section-tag text-center mx-auto">Design Philosophy</div>
          <h2 className="section-title !mx-auto !text-center">Design that serves the story, not the trend</h2>
          <p className="text-[var(--text-dim)] leading-relaxed text-center mx-auto">
            Every layout, color, and type choice starts from the problem it needs to solve. I aim
            for visuals that feel considered and clear — premium without being loud, expressive
            without losing usability.
          </p>
        </div>
      </section>

      {/* PROJECT GALLERY (Trashback / Parents Talk — no page navigation) */}
      <section className="section pt-0">
        <div className="section-inner">
          <div className="section-tag">Featured Works</div>
          <h2 className="section-title">Selected projects</h2>
          <p className="section-desc">
            Pilih project untuk melihat galerinya — semuanya tetap di halaman ini.
          </p>

          <div className="project-toggle" role="tablist" aria-label="Pilih project">
            {(Object.keys(projects) as ProjectKey[]).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={active === key}
                onClick={() => setActive(key)}
                className={`project-toggle-btn ${active === key ? 'is-active' : ''}`}
              >
                {projects[key].label}
              </button>
            ))}
          </div>

          <p className="text-sm text-[var(--text-dim)] mt-4 mb-8 max-w-xl">
            {current.description}
          </p>

          {/* key={active} memaksa remount saat tab berganti → animasi fade/slide jalan ulang */}
          <div key={active} className="gallery-fade">
            {current.layout === 'fixed' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {current.images.map((src, i) => (
                  <button
                    type="button"
                    key={src}
                    onClick={() => openLightbox(src, current.label)}
                    className="gallery-item aspect-[9/16] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <img
                      src={src}
                      alt={`${current.label} ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 gap-4">
                {current.images.map((src, i) => (
                  <button
                    type="button"
                    key={src}
                    onClick={() => openLightbox(src, current.label)}
                    className="gallery-item mb-4 block w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <img
                      src={src}
                      alt={`${current.label} ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DESIGN PROCESS */}
      <section className="section pt-0">
        <div className="section-inner">
          <div className="section-tag">Process</div>
          <h2 className="section-title">Design Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--gradient)] text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                01
              </div>
              <h4 className="font-bold text-base mb-2">Research</h4>
              <p className="text-xs text-[var(--text-dim)]">Understanding users, context, and the real problem.</p>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--gradient)] text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                02
              </div>
              <h4 className="font-bold text-base mb-2">Wireframe</h4>
              <p className="text-xs text-[var(--text-dim)]">Structuring layout and flow before visuals.</p>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--gradient)] text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                03
              </div>
              <h4 className="font-bold text-base mb-2">Visual Design</h4>
              <p className="text-xs text-[var(--text-dim)]">Applying color, type, and detail with intent.</p>
            </div>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--gradient)] text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                04
              </div>
              <h4 className="font-bold text-base mb-2">Prototype</h4>
              <p className="text-xs text-[var(--text-dim)]">Testing the flow as a real, interactive experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <VideoModal isOpen={!!selectedVideo} youtubeId={selectedVideo || ''} onClose={() => setSelectedVideo(null)} />
      <ImageLightbox
        isOpen={!!selectedImage}
        imageSrc={selectedImage?.src ?? ''}
        imageAlt={selectedImage?.title ?? ''}
        onClose={() => setSelectedImage(null)}
      />

      <style>{`
        .hero-preview-row {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          max-width: 48rem;
          margin: 2.5rem auto 0;
          padding: 0 1rem;
        }
        .hero-preview-card {
          flex: 1;
          min-width: 0;
          aspect-ratio: 3 / 4;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.5);
          padding: 0;
          background: var(--surface);
          cursor: pointer;
          opacity: 0;
          transform: translateY(16px);
          animation: heroIn 0.6s ease forwards, heroFloat 5s ease-in-out infinite;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hero-preview-card:hover {
          transform: translateY(-6px) scale(1.03) rotate(-0.5deg);
          box-shadow: 0 28px 50px -18px rgba(0, 212, 255, 0.35);
          animation-play-state: paused, paused;
        }
        .hero-preview-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @keyframes heroIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .project-toggle {
          display: inline-flex;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding: 0.35rem;
          border-radius: 999px;
          background: var(--surface);
          border: 1px solid var(--border);
        }
        .project-toggle-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-dim);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .project-toggle-btn.is-active {
          background: var(--gradient);
          color: #fff;
          box-shadow: 0 8px 20px -8px rgba(0, 212, 255, 0.5);
        }
        .project-toggle-btn:not(.is-active):hover {
          color: #fff;
        }

        .gallery-fade {
          animation: fadeSlideIn 0.45s ease both;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gallery-item {
          animation: fadeSlideIn 0.45s ease both;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .gallery-item:hover {
          transform: translateY(-4px);
          border-color: #00d4ff;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-preview-card,
          .gallery-item,
          .gallery-fade {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default GraphicDesignDetail;