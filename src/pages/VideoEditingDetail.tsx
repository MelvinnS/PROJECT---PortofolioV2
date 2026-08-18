import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VideoModal } from '../components/ui/VideoModal';
import { ImageLightbox } from '../components/ui/ImageLightbox';

interface VideoEditingDetailProps {
  selectedVideo: string | null;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string | null>>;
  selectedImage: { src: string; title: string } | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<{ src: string; title: string } | null>>;
}

interface VideoEdit {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  thumb: string;
  duration?: string; // isi kalau ada durasi pastinya — badge hanya muncul kalau field ini terisi
}

// Data lokal supaya tidak bergantung pada file creativeData.ts (isinya bisa saja belum sinkron).
const videoEdits: VideoEdit[] = [
  {
    id: 'wedding',
    title: 'Wedding Editing',
    category: 'Wedding Film',
    youtubeId: 'iS02TKWT4XM',
    thumb: '/assets/creative/video/wedding.png',
  },
  {
    id: 'aftermovie',
    title: 'AfterMovie P5',
    category: 'Event Aftermovie',
    youtubeId: '9GUL7EQamg8',
    thumb: '/assets/creative/video/aftermovie.png',
  },
  {
    id: 'education',
    title: 'Education',
    category: 'Educational Content',
    youtubeId: 'Plx1fMDU5SU',
    thumb: '/assets/creative/video/edukasi.png',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Planning',
    desc: "Reviewing footage, identifying key moments, and defining the video's direction before editing begins.",
  },
  {
    num: '02',
    title: 'Storytelling',
    desc: 'Building a clear narrative flow that keeps viewers engaged from the first second to the last.',
  },
  {
    num: '03',
    title: 'Editing',
    desc: 'Cutting unnecessary scenes, refining pacing, and creating smooth transitions that support the story.',
  },
  {
    num: '04',
    title: 'Color Grading',
    desc: 'Adjusting color and lighting to create a consistent mood across every scene.',
  },
  {
    num: '05',
    title: 'Sound Design',
    desc: 'Balancing music, dialogue, and sound effects to strengthen the emotional impact.',
  },
  {
    num: '06',
    title: 'Final Export',
    desc: 'Reviewing every detail before exporting in the best format for delivery and publishing.',
  },
];

const VideoEditingDetail: React.FC<VideoEditingDetailProps> = ({
  selectedVideo,
  setSelectedVideo,
  selectedImage,
  setSelectedImage,
}) => {
  // ---- Reel refs/state ----
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() => videoEdits.map(() => false));
  const [active, setActive] = useState(0);

  // ---- Process refs/state ----
  const processSectionRef = useRef<HTMLDivElement>(null);
  const processFillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stepsVisible, setStepsVisible] = useState<boolean[]>(() => processSteps.map(() => false));

  // ---- Global top scroll-progress bar ----
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Reveal + active-panel observers (Reel)
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisible((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.idx));
          }
        });
      },
      { threshold: 0.5 }
    );

    panelRefs.current.forEach((el) => {
      if (el) {
        revealObserver.observe(el);
        activeObserver.observe(el);
      }
    });

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  // Reveal observer (Process steps)
  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.stepIdx);
            setStepsVisible((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            stepObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    stepRefs.current.forEach((el) => el && stepObserver.observe(el));
    return () => stepObserver.disconnect();
  }, []);

  // Scroll-linked motion: page progress bar + thumbnail parallax + process line fill.
  // Done imperatively (direct DOM writes) instead of React state so it stays smooth at 60fps.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;

      // Global top progress bar
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.min(100, Math.max(0, pct))}%`;
      }

      // Thumbnail parallax per reel panel
      panelRefs.current.forEach((panel, i) => {
        const wrap = thumbWrapRefs.current[i];
        if (!panel || !wrap) return;
        const rect = panel.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - vh / 2;
        const normalized = Math.max(-1, Math.min(1, centerOffset / vh));
        const translate = normalized * 18; // px, subtle
        wrap.style.transform = `translateY(${translate.toFixed(1)}px)`;
      });

      // Process timeline fill line
      const section = processSectionRef.current;
      const fill = processFillRef.current;
      if (section && fill) {
        const rect = section.getBoundingClientRect();
        const frac = (vh - rect.top) / (rect.height + vh);
        fill.style.height = `${Math.min(100, Math.max(0, frac * 100))}%`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToPanel = (idx: number) => {
    panelRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <main className="pb-16 pt-24 sm:pt-28">
      {/* Global scroll progress indicator */}
      <div className="ve-progress-track">
        <div ref={progressBarRef} className="ve-progress-fill" />
      </div>

      {/* Back Button */}
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
        <div className="cs-tag">Pacing &amp; Motion</div>
        <h1>
          Video <span className="grad-text">Editing</span>
        </h1>
        <p className="cs-tagline">Crafting stories through cut, rhythm, and color grading.</p>
      </section>

      {/* THE REEL */}
      <section className="section pt-4">
        <div className="section-inner relative">
          <div className="flex items-baseline justify-between mb-2">
            <div className="section-tag !mb-0">The Reel</div>
            <span className="ve-counter">
              {String(active + 1).padStart(2, '0')} / {String(videoEdits.length).padStart(2, '0')}
            </span>
          </div>
          <h2 className="section-title">A few edits worth watching</h2>

          {/* Rail index — desktop only */}
          <div className="ve-rail">
            {videoEdits.map((edit, i) => (
              <button
                key={edit.id}
                onClick={() => scrollToPanel(i)}
                className={`ve-rail-dot ${active === i ? 'is-active' : ''}`}
                aria-label={`Ke ${edit.title}`}
              >
                <span className="ve-rail-num">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:gap-10 mt-8">
            {videoEdits.map((edit, i) => (
              <div
                key={edit.id}
                ref={(el) => (panelRefs.current[i] = el)}
                data-idx={i}
                className={`ve-panel ${visible[i] ? 'is-visible' : ''}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                  {/* Text */}
                  <div className="md:col-span-4 order-2 md:order-1 ve-panel-text">
                    <span className="ve-index">{String(i + 1).padStart(2, '0')}</span>
                    <div className="ve-category">{edit.category}</div>
                    <h3 className="text-2xl md:text-3xl font-bold mt-1 mb-4">{edit.title}</h3>
                    <button onClick={() => setSelectedVideo(edit.youtubeId)} className="ve-play-btn">
                      <Play className="w-3.5 h-3.5 fill-current" /> Watch Edit
                    </button>
                  </div>

                  {/* Thumbnail */}
                  <div className="md:col-span-8 order-1 md:order-2 ve-panel-media">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(edit.youtubeId)}
                      className="ve-thumb-btn"
                      aria-label={`Play ${edit.title}`}
                    >
                      <div ref={(el) => (thumbWrapRefs.current[i] = el)} className="ve-thumb-parallax">
                        <img src={edit.thumb} alt={edit.title} className="ve-thumb-img" />
                      </div>
                      <div className="ve-thumb-tint" />
                      <div className="ve-thumb-play">
                        <Play className="w-5 h-5 fill-white translate-x-0.5" />
                      </div>
                      {edit.duration && <span className="ve-duration">{edit.duration}</span>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — Behind the Edit */}
      <section className="section pt-6" ref={processSectionRef}>
        <div className="section-inner">
          <div className="section-tag">Process</div>
          <h2 className="section-title">Behind the Edit</h2>
          <p className="section-desc">Six steps, one goal — every edit earns its emotion honestly.</p>

          <div className="process-track">
            <div className="process-line-bg" />
            <div ref={processFillRef} className="process-line-fill" />

            <div className="process-steps">
              {processSteps.map((step, i) => (
                <div
                  key={step.num}
                  ref={(el) => (stepRefs.current[i] = el)}
                  data-step-idx={i}
                  className={`process-row ${i % 2 === 0 ? 'row-left' : 'row-right'} ${
                    stepsVisible[i] ? 'is-visible' : ''
                  }`}
                >
                  <div className="process-node">
                    <span>{step.num}</span>
                  </div>
                  <div className="process-card">
                    <h4 className="process-card-title">{step.title}</h4>
                    <p className="process-card-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
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
        /* ---------- GLOBAL SCROLL PROGRESS ---------- */
        .ve-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: transparent;
          z-index: 60;
          pointer-events: none;
        }
        .ve-progress-fill {
          height: 100%;
          width: 0%;
          background: var(--gradient);
          box-shadow: 0 0 12px rgba(0,212,255,0.6);
        }

        .ve-counter {
          font-family: ui-monospace, 'SF Mono', Menlo, monospace;
          font-size: 0.8125rem;
          letter-spacing: 0.05em;
          color: var(--text-dim);
        }

        .ve-rail {
          position: absolute;
          right: -2.5rem;
          top: 9rem;
          display: none;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (min-width: 1200px) { .ve-rail { display: flex; } }
        .ve-rail-dot {
          width: 2px;
          height: 2rem;
          background: var(--border);
          border: none;
          padding: 0;
          cursor: pointer;
          position: relative;
          transition: background 0.3s ease, height 0.3s ease;
        }
        .ve-rail-dot.is-active { background: #00d4ff; height: 2.75rem; }
        .ve-rail-num {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          font-family: ui-monospace, 'SF Mono', Menlo, monospace;
          font-size: 0.6875rem;
          color: var(--text-dim);
          opacity: 0;
          white-space: nowrap;
          transition: opacity 0.25s ease;
        }
        .ve-rail-dot:hover .ve-rail-num, .ve-rail-dot.is-active .ve-rail-num { opacity: 1; }
        .ve-rail-dot.is-active .ve-rail-num { color: #00d4ff; }

        /* ---------- REEL PANELS ---------- */
        .ve-panel {
          padding: 1rem 0;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ve-panel.is-visible { opacity: 1; transform: translateY(0); }
        .ve-panel + .ve-panel { border-top: 1px solid var(--border); padding-top: 2.5rem; }

        .ve-panel-text, .ve-panel-media {
          opacity: 0;
          transition: opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
        }
        .ve-panel-text { transform: translateX(-24px); }
        .ve-panel-media { transform: translateX(24px); transition-delay: 0.22s; }
        .ve-panel.is-visible .ve-panel-text,
        .ve-panel.is-visible .ve-panel-media { opacity: 1; transform: translateX(0); }
        @media (max-width: 767px) {
          .ve-panel-text, .ve-panel-media { transform: translateY(16px); }
          .ve-panel.is-visible .ve-panel-text,
          .ve-panel.is-visible .ve-panel-media { transform: translateY(0); }
        }

        .ve-index {
          font-family: ui-monospace, 'SF Mono', Menlo, monospace;
          font-size: 0.75rem;
          color: var(--text-dim);
          letter-spacing: 0.1em;
        }
        .ve-category {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #00d4ff;
          margin-top: 0.5rem;
        }

        .ve-play-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: #fff;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .ve-play-btn:hover { border-color: #00d4ff; color: #00d4ff; gap: 0.7rem; }

        .ve-thumb-btn {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid var(--border);
          background: #000;
          padding: 0;
          cursor: pointer;
        }
        .ve-thumb-parallax {
          position: absolute;
          inset: -8% 0;
          will-change: transform;
        }
        .ve-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0.35) contrast(0.94) saturate(0.75) brightness(0.92);
          transition: filter 0.7s ease, transform 0.7s ease;
        }
        .ve-thumb-tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(0,212,255,0.16), rgba(0,0,0,0.28));
          mix-blend-mode: multiply;
          transition: opacity 0.7s ease;
        }
        .ve-thumb-btn:hover .ve-thumb-img { filter: grayscale(0) contrast(1) saturate(1.05) brightness(1); transform: scale(1.05); }
        .ve-thumb-btn:hover .ve-thumb-tint { opacity: 0; }
        .ve-thumb-play {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          width: 3.25rem;
          height: 3.25rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.4);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          opacity: 0.85;
          transition: all 0.35s ease;
        }
        .ve-thumb-btn:hover .ve-thumb-play {
          transform: translate(-50%, -50%) scale(1.08);
          background: rgba(0,212,255,0.9);
          border-color: #00d4ff;
          opacity: 1;
        }
        .ve-duration {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          padding: 0.2rem 0.55rem;
          border-radius: 0.35rem;
          background: rgba(0,0,0,0.75);
          color: #fff;
          font-family: ui-monospace, 'SF Mono', Menlo, monospace;
          font-size: 0.6875rem;
        }

        /* ---------- PROCESS TIMELINE ---------- */
        .process-track { position: relative; margin-top: 3rem; padding: 0 0 1rem; }
        .process-line-bg, .process-line-fill {
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          transform: translateX(-50%);
        }
        .process-line-bg { height: 100%; background: var(--border); }
        .process-line-fill { height: 0%; background: var(--gradient); box-shadow: 0 0 10px rgba(0,212,255,0.5); transition: height 0.1s linear; }

        .process-steps { display: flex; flex-direction: column; }
        .process-row {
          position: relative;
          display: flex;
          justify-content: center;
          padding: 2.25rem 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .process-row.is-visible { opacity: 1; transform: translateY(0); }

        .process-node {
          position: absolute;
          left: 50%;
          top: 2.25rem;
          transform: translate(-50%, 0) scale(1);
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-dim);
          font-family: ui-monospace, 'SF Mono', Menlo, monospace;
          font-size: 0.8125rem;
          font-weight: 600;
          z-index: 2;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .process-row.is-visible .process-node {
          background: var(--gradient);
          border-color: #00d4ff;
          color: #fff;
          box-shadow: 0 0 0 6px rgba(0,212,255,0.12);
        }
        .process-row:hover .process-node { transform: translate(-50%, 0) scale(1.12); }

        .process-card {
          width: calc(50% - 3.25rem);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
        }
        .process-row:hover .process-card { border-color: rgba(0,212,255,0.4); transform: translateY(-3px); }
        .process-card-title { font-weight: 700; font-size: 1.0625rem; margin-bottom: 0.4rem; }
        .process-card-desc { font-size: 0.875rem; color: var(--text-dim); line-height: 1.55; }

        .row-left { justify-content: flex-start; }
        .row-left .process-card { margin-right: auto; text-align: right; }
        .row-right { justify-content: flex-end; }
        .row-right .process-card { margin-left: auto; text-align: left; }

        @media (max-width: 767px) {
          .process-line-bg, .process-line-fill { left: 1.35rem; }
          .process-node { left: 1.35rem; top: 0; width: 2.25rem; height: 2.25rem; font-size: 0.75rem; }
          .process-row { justify-content: flex-start; padding: 1.5rem 0 1.5rem 3.5rem; }
          .row-left .process-card, .row-right .process-card {
            width: 100%;
            margin: 0;
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ve-panel, .ve-panel-text, .ve-panel-media, .ve-thumb-img, .ve-thumb-tint,
          .ve-thumb-play, .ve-play-btn, .ve-rail-dot, .process-row, .process-node, .process-card {
            transition: none !important;
          }
          .ve-panel, .ve-panel-text, .ve-panel-media, .process-row { opacity: 1; transform: none; }
          .ve-thumb-parallax { transform: none !important; }
        }
      `}</style>
    </main>
  );
};

export default VideoEditingDetail;