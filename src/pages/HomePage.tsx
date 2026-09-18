import React, { useState, useRef } from 'react';
import Lanyard from '../components/ui/Lanyard/Lanyard';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  Code,
  Smartphone,
  Globe,
  Wrench,
  Palette,
  Mail,
  Linkedin,
  Github,
  Instagram,
  Award,
  BookOpen,
  IdCard,
  Play,
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { creativeCategoriesData } from '../data/creativeData';
import { certificatesData, continuousLearningData } from '../data/certificatesData';
import { techStackData } from '../data/techStackData';
import { CertModal } from '../components/ui/CertModal';
import { Hero } from '../components/ui/Hero/Hero';
import { TechIcon } from '../components/ui/TechIcon';

interface CreativeCardProps {
  cat: {
    id: string;
    title: string;
    tag: string;
    coverImage: string;
  };
  index: number;
}

const CreativeCard: React.FC<CreativeCardProps> = ({ cat }) => {
  return (
    <Link
      to={`/creative/${cat.id}`}
      className="creative-card group relative flex flex-col rounded-xl bg-[var(--bg-alt)] p-3 sm:p-4 transition-colors duration-300 ease-out hover:bg-white/[0.06]"
    >
      {/* Cover art — square, Spotify-style */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg bg-black/40">
        <img
          src={cat.coverImage}
          alt={cat.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Ambient dark gradient vignette over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />

        {/* Tag badge top-left */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
          <span className="text-[9px] sm:text-[11px] font-semibold text-white/90 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 tracking-wide">
            {cat.tag}
          </span>
        </div>

        {/* Play button — hidden by default, fades & slides in on hover */}
        <div
          className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                     bg-[var(--blue)] text-black shadow-[0_8px_20px_rgba(0,0,0,0.45)]
                     opacity-0 translate-y-2 scale-90
                     transition-all duration-300 ease-out
                     group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                     group-hover:hover:scale-110"
        >
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black translate-x-[1px]" />
        </div>
      </div>

      {/* Card Info Footer — Spotify-style: title + subtitle below cover */}
      <div className="flex flex-col gap-1 pt-3 sm:pt-4 px-0.5">
        <h3 className="text-sm sm:text-base font-bold text-white truncate transition-colors duration-300 group-hover:text-[var(--blue)]">
          {cat.title}
        </h3>
        <span className="text-[11px] sm:text-xs text-[var(--text-dim)] font-medium">
          Explore Collection
        </span>
      </div>
    </Link>
  );
};
export const HomePage: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<{ src: string; title: string } | null>(null);

  // ===== ABOUT PHOTO INTERACTION =====
  const aboutPhotoRef = useRef<HTMLDivElement>(null);

  const [aboutPhotoActive, setAboutPhotoActive] = useState(false);

  const [aboutPhotoFx, setAboutPhotoFx] = useState({
    rotateX: 0,
    rotateY: 0,
    shineX: 50,
    shineY: 50,
    imageX: 0,
    imageY: 0,
  });

  const handleAboutPhotoEnter = () => {
    setAboutPhotoActive(true);
  };

  const handleAboutPhotoMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (e.pointerType === 'touch') return;
    if (!aboutPhotoRef.current) return;

    const rect = aboutPhotoRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setAboutPhotoFx({
      rotateX: (0.5 - y) * 5,
      rotateY: (x - 0.5) * 5,
      shineX: x * 100,
      shineY: y * 100,
      imageX: (x - 0.5) * -6,
      imageY: (y - 0.5) * -6,
    });
  };

  const handleAboutPhotoLeave = () => {
    setAboutPhotoActive(false);

    setAboutPhotoFx({
      rotateX: 0,
      rotateY: 0,
      shineX: 50,
      shineY: 50,
      imageX: 0,
      imageY: 0,
    });
  };

  const handleAboutPhotoDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (e.pointerType === 'touch') {
      setAboutPhotoActive(true);
    }
  };

  const handleAboutPhotoUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (e.pointerType !== 'touch') return;

    window.setTimeout(() => {
      handleAboutPhotoLeave();
    }, 900);
  };

  // ===== END ABOUT PHOTO INTERACTION =====

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'globe':
        return <Globe className="w-5 h-5" />;
      case 'wrench':
        return <Wrench className="w-5 h-5" />;
      case 'palette':
        return <Palette className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
   <main className="relative overflow-x-hidden">

  {/* HERO SECTION */}
  <section id="home" className="section pt-20">
    <Hero />
  </section>

  {/* LANYARD FROM NAVBAR TO ABOUT */}
  <div className="navbar-lanyard">
    <Lanyard
      position={[0, -2, 24]}
      gravity={[0, -40, 0]}
      frontImage="/assets/creative/graphic/parentstalk/fotokeren.jpg"
    />
  </div>

  {/* ABOUT SECTION */}
  <section id="about" className="section">
    <div className="section-inner">
      <div className="about-grid">
        <div
  ref={aboutPhotoRef}
  className={`about-photo about-photo-interactive ${
    aboutPhotoActive ? 'is-active' : ''
  }`}
  onPointerEnter={handleAboutPhotoEnter}
  onPointerMove={handleAboutPhotoMove}
  onPointerLeave={handleAboutPhotoLeave}
  onPointerDown={handleAboutPhotoDown}
  onPointerUp={handleAboutPhotoUp}
  onPointerCancel={handleAboutPhotoUp}
  style={
    {
      '--photo-rotate-x': `${aboutPhotoFx.rotateX}deg`,
      '--photo-rotate-y': `${aboutPhotoFx.rotateY}deg`,
      '--shine-x': `${aboutPhotoFx.shineX}%`,
      '--shine-y': `${aboutPhotoFx.shineY}%`,
      '--image-x': `${aboutPhotoFx.imageX}px`,
      '--image-y': `${aboutPhotoFx.imageY}px`,
    } as React.CSSProperties
  }
>
  <img
    src="/assets/projects/profile.jpg"
    alt="Melvin Andrea Ismiananta"
  />
</div>

        <div className="about-text">
          <div className="section-tag">About Me</div>

          <h2 className="section-title">
            Where design meets development...
          </h2>

          <p>
            I'm a <strong>Frontend & Mobile App Developer</strong> and{' '}
            <strong>UI/UX Designer</strong> who enjoys turning ideas into
            functional digital products through thoughtful design and clean
            development.
          </p>

          <p>
            With experience in building cross-platform mobile apps,
            designing intuitive user interfaces, and creating visual media,
            I bridge the gap between aesthetics and functionality.
          </p>

          <div className="about-tags">
            <span className="about-tag">Mobile App Development</span>
            <span className="about-tag">UI/UX Design</span>
            <span className="about-tag">Frontend Web</span>
            <span className="about-tag">Visual Storytelling</span>
          </div>
        </div>
      </div>
    </div>
  </section>




      {/* TECH STACK SECTION */}
      <section id="stack" className="section">
        <div className="section-inner">
          <div className="section-tag">Tech Stack & Tools</div>
          <h2 className="section-title">Technologies I work with</h2>
          <p className="section-desc">Tools and frameworks I use to build mobile apps, websites, and user experiences.</p>
          
          <div className="stack-grid">
            {techStackData.map((stack, idx) => (
              <div key={idx} className="stack-card">
                <div className="stack-head">
                  <div className="stack-head-icon">
                    {getTechIcon(stack.categoryIcon)}
                  </div>
                  <div className="stack-head-info">
                    <h3>{stack.title}</h3>
                    <span className="stack-count">{stack.items.length} {stack.items.length === 1 ? 'tool' : 'tools'}</span>
                  </div>
                </div>
                <div className="stack-items">
                  {stack.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="stack-chip">
                      <TechIcon name={item} className="w-4 h-4 flex-shrink-0" />
                      <span className="stack-chip-label">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section">
        <div className="section-inner">
          <div className="section-tag">Featured Work</div>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-desc">Mobile applications and digital platforms built from concept to execution.</p>

          <div className="project-grid">
            {projectsData.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-thumb">
                  <img src={project.coverImage} alt={project.title} />
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>
                  <Link to={`/projects/${project.id}`} className="project-link">
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATIVE WORKS SECTION */}
      <section id="creative" className="section">
        <div className="section-inner">
          <div className="section-tag">Creative Works</div>
          <h2 className="section-title">Beyond Code</h2>
          <p className="section-desc">Graphic design, photography, short movies, and video editing portfolio.</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7">
     {creativeCategoriesData.map((cat, idx) => (
       <CreativeCard key={cat.id} cat={cat} index={idx} />
     ))}
   </div>


        </div>
      </section>

      {/* CERTIFICATES & RECOGNITION SECTION */}
      <section id="certificates" className="section">
        <div className="section-inner">
          <div className="section-tag">Recognition</div>
          <h2 className="section-title">Certificates & Achievements</h2>
          <p className="section-desc">Milestones from competitions, leadership programs, and continuous learning.</p>

          <div className="recognition-grid">
            {certificatesData.map((cert) => (
              <div
                key={cert.id}
                className="recognition-card"
                onClick={() => setSelectedCert({ src: cert.image, title: cert.title })}
              >
                <div className="recognition-preview">
                  <img src={cert.image} alt={cert.title} />
                  <div className="recognition-view">
                    <Eye className="w-4 h-4" /> View Certificate
                  </div>
                </div>
                <div className="recognition-body">
                  <h4>{cert.title}</h4>
                  <div className="rec-sub">{cert.subtitle}</div>
                  <span className="recognition-year"><Award className="w-3.5 h-3.5" /> {cert.year}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="learning-label">Continuous Learning</div>
          <h3 className="learning-title">Skills & Courses Completed</h3>
          <div className="learning-grid">
            {continuousLearningData.map((item, idx) => (
              <div key={idx} className="learning-badge">
                <div className="learning-badge-icon">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="section-inner">
          <div className="contact-box">
            <h2>Let's build something together</h2>
            <p>Open for full-time roles, freelance projects, and creative collaborations.</p>
            <div className="contact-links">
              <a href="https://wa.me/6282231258463"target="_blank" className="contact-pill">
                <Mail className="w-4 h-4 text-[#d4a373]" /> Chat Me
              </a>
              <a href="https://linkedin.com/in/melvin-andrea" target="_blank" rel="noopener noreferrer" className="contact-pill">
                <Linkedin className="w-4 h-4 text-[#d4a373]" /> LinkedIn
              </a>
              <a href="https://github.com/MelvinnS" target="_blank" rel="noopener noreferrer" className="contact-pill">
                <Github className="w-4 h-4 text-[#d4a373]" /> GitHub
              </a>
              <a href="https://instagram.com/el_falskie" target="_blank" rel="noopener noreferrer" className="contact-pill">
                <Instagram className="w-4 h-4 text-[#d4a373]" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATE MODAL */}
      <CertModal
        isOpen={!!selectedCert}
        imageSrc={selectedCert?.src || ''}
        imageAlt={selectedCert?.title || ''}
        onClose={() => setSelectedCert(null)}
      />
    </main>
  );
};