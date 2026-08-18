import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, Figma, ExternalLink, Check, Droplets, CreditCard, BarChart2, User, RefreshCw, Gift, Book, Tag, MapPin, Bell } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { projectsData, featuredProjectsData } from '../data/projectsData';

// Konten showcase "Web Developer" (route/id tetap 'tresbekasli').
// Teks tagline/tech diambil dari featuredProjectsData yang sudah ada (bukan karangan baru),
// hanya thumbnail & demo URL yang di-override sesuai aset/link yang diminta untuk halaman ini.
const webDevShowcase = [
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
];

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find((p) => p.id === id) || projectsData[0];

  // ---- Halaman khusus "Web Developer" (dulu Tresbekasli) — hanya untuk project ini ----
  if (project.id === 'tresbekasli') {
    return (
      <main className="pb-16">
        {/* HERO — pratinjau website full-bleed + fade gelap di bawah + judul */}
        <section className="wd-hero">
          <img src="/assets/creative/orastrix.png" alt={project.title} className="wd-hero-img" />
          <div className="wd-hero-fade-top" />
          <div className="wd-hero-fade-bottom" />

          <Link to="/#projects" className="wd-back-btn">
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

        {/* SHOWCASE — kartu tiap project web dengan tombol Live Demo */}
        <section className="section pt-10">
          <div className="section-inner">
            <div className="section-tag">Selected Builds</div>
            <h2 className="section-title">Live web projects</h2>
            <p className="section-desc">Two projects, one goal — clean code paired with premium, considered design.</p>

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
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="wd-card-cta">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cs-section text-center pt-8">
          <Link to="/#projects" className="back-link justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to all projects
          </Link>
        </section>

        <style>{`
          .wd-hero {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            min-height: 380px;
            max-height: 82vh;
            overflow: hidden;
            background: #000;
          }
          .wd-hero-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
          }
          .wd-hero-fade-top {
            position: absolute;
            inset: 0 0 auto 0;
            height: 30%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%);
            pointer-events: none;
          }
          .wd-hero-fade-bottom {
            position: absolute;
            inset: auto 0 0 0;
            height: 60%;
            background: linear-gradient(to top, #000 0%, rgba(0,0,0,0.88) 25%, rgba(0,0,0,0.35) 60%, transparent 100%);
            pointer-events: none;
          }
          .wd-back-btn {
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
          .wd-back-btn:hover { background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(0,212,255,0.4); }
          .wd-hero-content {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
            padding: 0 6% 2.5rem;
            max-width: 1180px;
            margin: 0 auto;
          }
          .wd-hero-title {
            font-weight: 800;
            letter-spacing: -0.01em;
            line-height: 1.05;
            font-size: clamp(2rem, 5.5vw, 3.75rem);
            text-shadow: 0 4px 24px rgba(0,0,0,0.6);
            margin: 0;
          }
          .wd-hero-tagline {
            margin-top: 0.75rem;
            max-width: 560px;
            font-size: 1rem;
            color: rgba(255,255,255,0.82);
            text-shadow: 0 2px 12px rgba(0,0,0,0.6);
          }
          @media (max-width: 640px) {
            .wd-hero { aspect-ratio: 4 / 5; min-height: 460px; }
            .wd-hero-content { padding: 0 5% 2rem; }
          }

          .wd-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 1.8rem;
          }
          .wd-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 24px;
            overflow: hidden;
            transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
            display: flex;
            flex-direction: column;
          }
          .wd-card:hover {
            transform: translateY(-8px);
            border-color: rgba(0,212,255,0.45);
            box-shadow: 0 25px 50px rgba(0,0,0,0.4);
          }
          .wd-card-thumb {
            aspect-ratio: 16/10;
            overflow: hidden;
            background: #000;
          }
          .wd-card-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            transition: transform 0.6s ease;
          }
          .wd-card:hover .wd-card-thumb img { transform: scale(1.05); }
          .wd-card-body {
            padding: 1.6rem 1.7rem 1.8rem;
            display: flex;
            flex-direction: column;
            flex: 1;
          }
          .wd-card-body h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
          .wd-card-body p { color: var(--text-dim); font-size: 0.92rem; margin-bottom: 1.2rem; flex: 1; }
          .wd-card-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.4rem;
          }
          .wd-card-tech span {
            font-size: 0.75rem;
            padding: 0.3rem 0.7rem;
            border-radius: 8px;
            background: rgba(255,255,255,0.04);
            border: 1px solid var(--border);
            color: var(--text-dim);
          }
          .wd-card-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            color: var(--blue, #00d4ff);
            transition: gap 0.2s ease;
          }
          .wd-card-cta:hover { gap: 0.7rem; }
        `}</style>
      </main>
    );
  }

  // ---- Template case-study generik (PDAM, TrashBack) — TIDAK diubah ----
  return (
    <main className="pb-16">
      {/* TOPBAR */}
      <div className="topbar">
        <div className="container-narrow">
          <Link to="/#projects" className="back-link">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <span className="text-sm text-[var(--text-dim)]">Case Study</span>
        </div>
      </div>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-tag">Mobile App · Sustainability</div>
        <h1>
          {project.title.includes('PDAM') ? (
            <>Layanan <span className="grad-text">PDAM</span></>
          ) : project.title.includes('TrashBack') ? (
            <>Trash<span className="grad-text">Back</span></>
          ) : (
            <span className="grad-text">{project.title}</span>
          )}
        </h1>
        <p className="cs-tagline">{project.tagline}</p>
        
        <div className="cs-meta">
          {project.tech.map((t, idx) => (
            <span key={idx}>{t}</span>
          ))}
        </div>

        <div className="cs-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
          {project.figmaUrl && (
            <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
              <Figma className="w-4 h-4" /> Figma
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>

        {/* PHONE FRAME */}
        {project.galleryScreens.length > 0 && (
          <div className="phone-frame mt-8">
            <div className="phone-screen">
              <div className="notch" />
              <img src={project.galleryScreens[0]} alt={`${project.title} screenshot preview`} />
              <div className="home-indicator" />
            </div>
          </div>
        )}
      </section>

      {/* OVERVIEW */}
      <section className="cs-section">
        <h2>Overview</h2>
        <p>{project.description}</p>
      </section>

      <hr className="divider" />

      {/* PROBLEM & SOLUTION */}
      <section className="cs-section">
        <div className="two-col">
          <div>
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </div>
          <div>
            <h2>Solution</h2>
            <p>{project.solution}</p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ROLE */}
      <section className="cs-section">
        <div className="role-card">
          <h2>My Role</h2>
          <p>{project.role}</p>
          <ul className="feature-list mt-4">
            {project.roleTasks.map((task, i) => (
              <li key={i}>
                <Check className="w-4 h-4" /> {task}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="divider" />

      {/* PROCESS */}
      <section className="cs-section">
        <h2>Development Process</h2>
        <p>{project.process}</p>
      </section>

      <hr className="divider" />

      {/* FEATURES */}
      <section className="cs-section">
        <h2>Features</h2>
        <ul className="feature-list">
          {project.features.map((feat, i) => (
            <li key={i}>
              <Check className="w-4 h-4" /> {feat.title}
            </li>
          ))}
        </ul>
      </section>

      <hr className="divider" />

      {/* GALLERY SLIDER */}
      {project.galleryScreens.length > 0 && (
        <section className="cs-section">
          <h2>Gallery</h2>
          <p className="mb-6 text-[var(--text-dim)] font-normal">A closer look at the app, screen by screen.</p>
          
          <div className="w-full py-4">
            <Swiper
              modules={[Pagination, Navigation]}
              slidesPerView="auto"
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              pagination={{ clickable: true }}
              navigation={true}
              className="w-full max-w-[800px] h-[520px]"
            >
              {project.galleryScreens.map((screen, idx) => (
                <SwiperSlide key={idx} className="!w-[250px] !h-[500px]">
                  <div className="phone-frame !w-[240px] !h-[480px]">
                    <div className="phone-screen">
                      <div className="notch" />
                      <img src={screen} alt={`Screen ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="home-indicator" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      <hr className="divider" />

      {/* TECH STACK */}
      <section className="cs-section">
        <h2>Tech Stack</h2>
        <div className="tech-row">
          {project.tech.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* REFLECTION */}
      <section className="cs-section">
        <h2>Reflection</h2>
        <p>{project.reflection}</p>
      </section>

      <section className="cs-section text-center pt-8">
        <Link to="/#projects" className="back-link justify-center">
          <ArrowLeft className="w-4 h-4" /> Back to all projects
        </Link>
      </section>
    </main>
  );
};