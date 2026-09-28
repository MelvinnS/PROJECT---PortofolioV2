import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Folder, ArrowUpRight } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../ScrollStack/ScrollStack';
import { featuredProjectsData, projectsData } from '../../../data/projectsData';
import {
  creativeCategoriesData,
  photographyGallery,
  shortMoviesData,
  videoEditsData,
  graphicDesignProjects,
} from '../../../data/creativeData';
import './FeaturedStack.css';

interface FolderCard {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  bg: string;       // card body color
  fg: string;       // text color
  tabBg: string;    // tab color
  tabFg: string;    // tab text color
  link: string;
  isAll?: boolean;
}

const coverOf = (id: string, fallback: string) =>
  creativeCategoriesData.find((c) => c.id === id)?.coverImage ?? fallback;

const FOLDERS: FolderCard[] = [
  {
    id: 'mobile',
    tabLabel: 'PROJECT 01',
    title: 'Mobile App Developer',
    description: 'Cross-platform apps built with Flutter, from first wireframe to a smooth, usable product.',
    meta: 'FLUTTER · DART',
    image: projectsData[0]?.coverImage ?? '/assets/projects/coverPDAM.png',
    bg: '#141414',
    fg: '#ffffff',
    tabBg: '#17B8DE', // Cyan
    tabFg: '#141414',
    link: `/projects/${projectsData[0]?.id || 'pdam'}`,
  },
  {
    id: 'web',
    tabLabel: 'PROJECT 02',
    title: 'Web Developer',
    description: 'Responsive websites and web platforms built with React, TypeScript and modern styling.',
    meta: 'REACT · TYPESCRIPT',
    image: featuredProjectsData[0]?.coverImage ?? '/assets/projects/banksampahcover.png',
    bg: '#F5B82A', // Yellow/Gold
    fg: '#141414',
    tabBg: '#141414', // Black
    tabFg: '#ffffff',
    link: `/projects/${featuredProjectsData[0]?.id || 'banksampah'}`,
  },
  {
    id: 'photography',
    tabLabel: 'PROJECT 03',
    title: 'Photography',
    description: 'Visual storytelling through a lens: people, places, and small moments worth keeping.',
    meta: 'LIGHTROOM · STORY',
    image: coverOf('photography', '/assets/creative/photography.png'),
    bg: '#2B59FF', // Royal Blue
    fg: '#ffffff',
    tabBg: '#F5B82A', // Yellow
    tabFg: '#141414',
    link: '/creative/photography',
  },
  {
    id: 'videography',
    tabLabel: 'PROJECT 04',
    title: 'Videography & Editing',
    description: 'Short films and cinematic video edits, cut with rhythmic pacing in DaVinci Resolve.',
    meta: 'CINEMATIC · MOTION',
    image: coverOf('videography-editing', '/assets/creative/film.png'),
    bg: '#FF4D8D', // Hot Pink
    fg: '#ffffff',
    tabBg: '#FF2B85', // Pink
    tabFg: '#ffffff',
    link: '/creative/videography-editing',
  },
  {
    id: 'graphic',
    tabLabel: 'PROJECT 05',
    title: 'Graphic Design',
    description: 'UI/UX, branding and visual identity designed to feel clear, warm and memorable.',
    meta: 'FIGMA · UI/UX',
    image: coverOf('graphic-design', '/assets/creative/design.png'),
    bg: '#7C3AED', // Purple
    fg: '#ffffff',
    tabBg: '#8B5CF6',
    tabFg: '#ffffff',
    link: '/creative/graphic-design',
  },
  {
    id: 'all',
    tabLabel: 'ALL PROJECTS',
    title: 'Explore More Work',
    description: 'Check out the full archive of mobile apps, web platforms, photography, films, and design works.',
    meta: 'YOU',
    image: '',
    bg: '#00C274', // Emerald Green (matching reference photo)
    fg: '#141414',
    tabBg: '#00C274', // Green
    tabFg: '#141414',
    link: '/projects',
    isAll: true,
  },
];

export const FeaturedStack: React.FC = () => {
  useEffect(() => {
    const remeasure = () => window.dispatchEvent(new Event('resize'));
    const t = window.setTimeout(remeasure, 700);
    window.addEventListener('load', remeasure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('load', remeasure);
    };
  }, []);

  return (
    <ScrollStack
      useWindowScroll
      className="window-scroll fs-stack"
      itemDistance={60}
      itemScale={0.018}
      itemStackDistance={0}
      stackPosition="16%"
      scaleEndPosition="6%"
      baseScale={0.94}
    >
      {FOLDERS.map((f, i) => (
        <ScrollStackItem key={f.id} itemClassName="fs-item">
          <div className="fs-folder-wrapper">
            
            {/* ── SINGLE TAB FOR THIS SPECIFIC FOLDER (positioned horizontally at index i) ── */}
            <div className="fs-tabs-row">
              <div
                className="fs-tab-btn fs-tab-btn--active"
                style={{
                  '--tab-bg': f.tabBg,
                  '--tab-fg': f.tabFg,
                  marginLeft: `calc(${i} * min(150px, 14.5vw))`,
                  zIndex: 10,
                } as React.CSSProperties}
              >
                <span className="fs-tab-slant-outer">
                  <span className="fs-tab-slant-inner">
                    <Folder className="fs-tab-icon" />
                    <span className="fs-tab-text">{f.tabLabel}</span>
                  </span>
                </span>
              </div>
            </div>

            {/* ── FOLDER MAIN BODY ── */}
            <div
              className={`fs-body ${f.isAll ? 'fs-body--all' : ''}`}
              style={{ background: f.bg, color: f.fg }}
            >
              {/* Left Column: Info */}
              <div className="fs-info">
                <div className="fs-meta-pill" style={{ color: f.fg === '#ffffff' ? '#ffffff' : '#141414' }}>
                  <span className="fs-pill-dot" style={{ background: f.fg === '#ffffff' ? '#ffffff' : '#141414' }} />
                  <span>{f.meta}</span>
                </div>

                <h3 className="fs-title">{f.title}</h3>
                <p className="fs-desc">{f.description}</p>

                <Link
                  to={f.link}
                  className="fs-link"
                  style={{ color: f.fg, borderColor: f.fg }}
                >
                  {f.isAll ? 'VIEW ALL PROJECTS' : 'VIEW PROJECT'}
                  <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
                </Link>
              </div>

              {/* Right Column: Media / Graphic */}
              <div className="fs-right-col">
                {f.isAll ? (
                  <Link to="/projects" className="fs-all-cta-box" style={{ color: f.fg }}>
                    <div className="fs-all-icon-wrap">
                      <Folder className="fs-all-icon" strokeWidth={1.7} />
                    </div>
                    <div className="fs-all-title">
                      VIEW ALL<br />PROJECTS ↗
                    </div>
                  </Link>
                ) : (
                  <div className="fs-media">
                    <span className="fs-tape fs-tape-tl" />
                    <span className="fs-tape fs-tape-tr" />
                    <span className="fs-tape fs-tape-bl" />
                    <span className="fs-tape fs-tape-br" />
                    {f.image ? (
                      <img src={f.image} alt={f.title} className="fs-img" loading="lazy" />
                    ) : (
                      <div className="fs-img fs-img-empty" />
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
};

export default FeaturedStack;
