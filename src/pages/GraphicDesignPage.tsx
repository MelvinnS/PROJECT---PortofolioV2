import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Palette,
  Sparkles,
  Layers,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Copy,
  Check,
  Shapes,
} from 'lucide-react';
import './GraphicDesignPage.css';

interface DesignItem {
  id: string;
  title: string;
  collection: 'trashback' | 'parentstalk';
  collectionLabel: string;
  category: string;
  aspectRatio: 'mobile' | 'wide' | 'standard';
  ratioLabel: string;
  tools: string;
  description: string;
  image: string;
}

const DESIGN_GALLERY: DesignItem[] = [
  // ── TrashBack UI/UX Collection ──
  {
    id: 'tb-menu-2',
    title: 'TrashBack - Primary Waste Hub',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Mobile App Screen',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · Mobile System',
    description: 'Central user dashboard displaying active waste collections, daily recycling streaks, and quick action shortcuts.',
    image: '/assets/creative/graphic/trashback/Main Menu-2.png',
  },
  {
    id: 'tb-menu-4',
    title: 'TrashBack - Waste Collection Request',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Booking Flow',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · Interactive Flow',
    description: 'Multi-step scheduling screen allowing users to select waste weight, category, and preferred pickup location.',
    image: '/assets/creative/graphic/trashback/Main Menu-4.png',
  },
  {
    id: 'tb-menu-1',
    title: 'TrashBack - EcoPoint Wallet & Stats',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Fintech / Rewards',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · Data Visuals',
    description: 'EcoCash reward balance overview, coin transaction history, and monthly sustainability impact meters.',
    image: '/assets/creative/graphic/trashback/Main Menu-1.png',
  },
  {
    id: 'tb-mentor',
    title: 'EcoMentor - AI Sorting Guide',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Feature Screen',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · UI Components',
    description: 'Interactive educational guide teaching users how to properly segregate inorganic and organic recyclable materials.',
    image: '/assets/creative/graphic/trashback/EcoMentor.png',
  },
  {
    id: 'tb-shop',
    title: 'TrashBack Market - Eco Store',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'E-Commerce',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · Component Library',
    description: 'Sustainable catalog marketplace where users can purchase upcycled crafts using earned EcoCash credits.',
    image: '/assets/creative/graphic/trashback/shop.png',
  },
  {
    id: 'tb-finish-1',
    title: 'Onboarding & Verification Flow',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Auth & Onboarding',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · User Flow',
    description: 'Smooth entry point introducing core value propositions followed by lightweight telephone authentication.',
    image: '/assets/creative/graphic/trashback/finish1.png',
  },
  {
    id: 'tb-finish-2',
    title: 'Pickup Scheduled Confirmation',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Status Dialog',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · Feedback States',
    description: 'Successful pickup confirmation modal with dynamic map estimation and assigned courier tracking ID.',
    image: '/assets/creative/graphic/trashback/finish2.png',
  },
  {
    id: 'tb-finish-3',
    title: 'Recycling Categorization Matrix',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Category Selector',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · UI Cards',
    description: 'Intuitive card-based selector for plastic, paper, metal, and e-waste pricing calculations.',
    image: '/assets/creative/graphic/trashback/finish3.png',
  },
  {
    id: 'tb-finish-4',
    title: 'User Profile & Carbon Offset Stats',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'User Account',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · Profiling',
    description: 'Personal achievements, tree-equivalent offset calculations, and security settings overview.',
    image: '/assets/creative/graphic/trashback/finish4.png',
  },
  {
    id: 'tb-finish-5',
    title: 'Voucher Redemption & Rewards',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Reward Catalog',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 UI',
    tools: 'Figma · Microcopy',
    description: 'Redemption modal converting EcoCash points into merchant discounts and digital electricity tokens.',
    image: '/assets/creative/graphic/trashback/finish5.png',
  },
  {
    id: 'tb-promo-mockup',
    title: 'TrashBack Mobile Showcase Mockup',
    collection: 'trashback',
    collectionLabel: 'TrashBack UI/UX',
    category: 'Promotional Banner',
    aspectRatio: 'wide',
    ratioLabel: '16:9 Artboard',
    tools: 'Photoshop · 3D Mockup',
    description: 'High-resolution hero presentation featuring multi-device isometric layout for investor pitch deck.',
    image: '/assets/creative/graphic/trashbackP.png',
  },

  // ── Parents Talk Event Branding Collection ──
  {
    id: 'pt-banner-main',
    title: 'Parents Talk - Main Stage Backdrop',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Stage Backdrop',
    aspectRatio: 'wide',
    ratioLabel: 'Wide Banner',
    tools: 'Illustrator · Large Format',
    description: 'Main auditorium stage backdrop banner, designed with warm family-focused color hierarchy and high-readability typography.',
    image: '/assets/creative/graphic/parentstalk/Banner.png',
  },
  {
    id: 'pt-feed-poster',
    title: 'Parents Talk - Social Feed Poster',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Social Media Feed',
    aspectRatio: 'standard',
    ratioLabel: 'Square/Portrait',
    tools: 'Photoshop · Digital Media',
    description: 'Instagram announcement graphic communicating date, keynote speakers, and ticket booking links.',
    image: '/assets/creative/graphic/parentstalk/Feed Poster.png',
  },
  {
    id: 'pt-flyer-h1',
    title: 'Parents Talk - H-1 Countdown Flyer',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Countdown Flyer',
    aspectRatio: 'standard',
    ratioLabel: 'Digital Flyer',
    tools: 'Illustrator · Graphic Layout',
    description: 'Urgency-driven countdown promotion distributed across WhatsApp communities and Instagram broadcast channels.',
    image: '/assets/creative/graphic/parentstalk/Flyer H-1.png',
  },
  {
    id: 'pt-flyer-2',
    title: 'Parents Talk - Speaker Lineup Flyer',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Speaker Roster',
    aspectRatio: 'standard',
    ratioLabel: 'Digital Flyer',
    tools: 'Illustrator · Typography',
    description: 'Specialist profile spotlight highlighting certified psychologists and educational experts speaking at the session.',
    image: '/assets/creative/graphic/parentstalk/flyer2.png',
  },
  {
    id: 'pt-group-hero',
    title: 'Parents Talk - Key Visual Artwork',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Key Visual Identity',
    aspectRatio: 'standard',
    ratioLabel: 'Hero Visual',
    tools: 'Photoshop · Vector/Photo',
    description: 'The master key visual that anchors all print, digital, and stage assets for brand consistency.',
    image: '/assets/creative/graphic/parentstalk/Group 107.jpg',
  },
  {
    id: 'pt-id-card',
    title: 'Parents Talk - Lanyard & ID Pass',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Print Collateral',
    aspectRatio: 'standard',
    ratioLabel: 'Merch / Print',
    tools: 'Illustrator · Print Spec',
    description: 'Official committee, media pass, and VIP attendee identification badges with color-coded classification.',
    image: '/assets/creative/graphic/parentstalk/IDCard.png',
  },
  {
    id: 'pt-live-report',
    title: 'Parents Talk - Live Story Template',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Story Template',
    aspectRatio: 'mobile',
    ratioLabel: '9:16 Story',
    tools: 'Photoshop · Social Assets',
    description: 'Branded vertical frame template used by documentation crew for realtime event updates on social media.',
    image: '/assets/creative/graphic/parentstalk/Live Report.png',
  },
  {
    id: 'pt-full-poster',
    title: 'Parents Talk - Complete Schedule Poster',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'A3 Print Poster',
    aspectRatio: 'standard',
    ratioLabel: 'Print Poster',
    tools: 'Illustrator · Editorial Layout',
    description: 'Full-bleed printed poster detailing event rundown, workshop breakout rooms, and sponsor acknowledgements.',
    image: '/assets/creative/graphic/parentstalk/poster.png',
  },
  {
    id: 'pt-banner-2',
    title: 'Parents Talk - Sponsor Stage Banner',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Stage Backdrop',
    aspectRatio: 'wide',
    ratioLabel: 'Wide Banner',
    tools: 'Illustrator · Large Format',
    description: 'Sponsor acknowledgement banner positioned along the main event gallery hall and photo booth.',
    image: '/assets/creative/graphic/parentstalk/Banner2.png',
  },
  {
    id: 'pt-banner-3',
    title: 'Parents Talk - Registration Backdrop',
    collection: 'parentstalk',
    collectionLabel: 'Parents Talk Event',
    category: 'Entrance Backdrop',
    aspectRatio: 'wide',
    ratioLabel: 'Wide Banner',
    tools: 'Illustrator · Large Format',
    description: 'Welcoming front-desk banner greeting attendees upon arrival with event branding and QR check-in instructions.',
    image: '/assets/creative/graphic/parentstalk/Banner3.png',
  },
];

const STUDIO_SWATCHES = [
  { name: 'Studio Purple', hex: '#8B5CF6' },
  { name: 'Eco Emerald', hex: '#00C274' },
  { name: 'Creative Pink', hex: '#FF2B85' },
  { name: 'Gold Accent', hex: '#FFD026' },
  { name: 'Brutalist Black', hex: '#141414' },
];

export const GraphicDesignPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'trashback' | 'parentstalk'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    triggerToast(`Copied ${hex} to clipboard! 🎨`);
  };

  const filteredItems =
    filter === 'all'
      ? DESIGN_GALLERY
      : DESIGN_GALLERY.filter((item) => item.collection === filter);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
      }
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="gd-page">
      <div className="gd-container">

        {/* ── TOP NAV BAR ── */}
        <div className="gd-top-nav">
          <button
            onClick={() => navigate('/projects')}
            className="gd-back-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>

          <div className="gd-badge-pill">
            <Palette className="w-3.5 h-3.5" />
            <span>Graphic Design Gallery</span>
          </div>
        </div>

        {/* ── HEADER ── */}
        <header className="gd-header">
          <span className="gd-anno">visual identities &amp; ui artboards ◜</span>
          <h1 className="gd-title">GRAPHIC DESIGN</h1>
          <p className="gd-desc">
            A comprehensive design exhibition featuring full mobile UI/UX systems and complete event visual identities. Crafted with precision in Figma, Adobe Illustrator, and Photoshop.
          </p>

          {/* Interactive Palette Swatches Row */}
          <div className="gd-swatches-strip">
            <span
              style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Studio Palette:
            </span>
            {STUDIO_SWATCHES.map((swatch) => (
              <div
                key={swatch.hex}
                className="gd-swatch-chip"
                onClick={() => copyHex(swatch.hex)}
                title={`Click to copy ${swatch.hex}`}
              >
                <span
                  className="gd-swatch-dot"
                  style={{ background: swatch.hex }}
                />
                <span>{swatch.hex}</span>
              </div>
            ))}
          </div>

          {/* Filter Pills */}
          <div className="gd-filter-row">
            <button
              className={`gd-filter-btn ${filter === 'all' ? 'gd-filter-btn--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Artboards ({DESIGN_GALLERY.length})
            </button>
            <button
              className={`gd-filter-btn ${filter === 'trashback' ? 'gd-filter-btn--active' : ''}`}
              onClick={() => setFilter('trashback')}
            >
              📱 TrashBack UI/UX (11)
            </button>
            <button
              className={`gd-filter-btn ${filter === 'parentstalk' ? 'gd-filter-btn--active' : ''}`}
              onClick={() => setFilter('parentstalk')}
            >
              🎪 Parents Talk Branding (10)
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
              border: '2px solid #8B5CF6',
              boxShadow: '3px 3px 0 #8B5CF6',
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

        {/* ── ARTBOARD CARDS GRID ── */}
        <div className="gd-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="gd-artboard-card"
              onClick={() => setLightboxIndex(idx)}
            >
              {/* Studio Canvas / Viewport */}
              <div
                className={`gd-card-viewport ${item.aspectRatio === 'mobile' ? 'gd-card-viewport--mobile' : ''}`}
              >
                {/* Print Registration Crop Marks */}
                <span className="gd-crop-mark gd-crop-tl">┌</span>
                <span className="gd-crop-mark gd-crop-tr">┐</span>
                <span className="gd-crop-mark gd-crop-bl">└</span>
                <span className="gd-crop-mark gd-crop-br">┘</span>

                <span className="gd-format-badge">{item.category}</span>

                <img
                  src={item.image}
                  alt={item.title}
                  className="gd-card-img"
                  loading="lazy"
                />

                <div className="gd-card-overlay">
                  <span className="gd-overlay-pill">
                    <ZoomIn className="w-4 h-4" /> Inspect Artwork
                  </span>
                </div>
              </div>

              {/* Card Body (Pantone Swatch Style) */}
              <div className="gd-card-body">
                <div className="gd-card-meta">
                  <span className="gd-card-collection">{item.collectionLabel}</span>
                  <span className="gd-card-ratio">{item.ratioLabel}</span>
                </div>

                <h3 className="gd-card-title">{item.title}</h3>
                <p className="gd-card-desc">{item.description}</p>

                <div className="gd-card-footer">
                  <span className="gd-tools-tag">{item.tools}</span>
                  <span className="gd-zoom-cta">
                    View <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── WORKFLOW CALLOUT STRIP ── */}
        <div className="gd-strip">
          <div>
            <p
              style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8B5CF6',
                marginBottom: '0.4rem',
              }}
            >
              Design Methodology
            </p>
            <h3 className="gd-strip-title">From Concept Wireframe to Print-Ready Assets</h3>
            <p className="gd-strip-p">
              Every graphic is designed with intentional hierarchy, harmonic typography scales, and modular components to guarantee visual cohesion across digital and physical mediums.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {['Discovery', 'Wireframing', 'Color System', 'Asset Creation', 'Production Export'].map(
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
                      background: i === 3 ? '#8B5CF6' : 'rgba(255,255,255,0.1)',
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

      {/* ── STUDIO INSPECTION LIGHTBOX MODAL ── */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="gd-lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="gd-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gd-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev button */}
            <button
              onClick={() =>
                setLightboxIndex(
                  (prev) => (prev! - 1 + filteredItems.length) % filteredItems.length
                )
              }
              style={{
                position: 'fixed',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#ffffff',
                border: '2.5px solid #141414',
                boxShadow: '3px 3px 0 #141414',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#141414',
                zIndex: 10001,
              }}
              aria-label="Previous artwork"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next button */}
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev! + 1) % filteredItems.length)
              }
              style={{
                position: 'fixed',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#ffffff',
                border: '2.5px solid #141414',
                boxShadow: '3px 3px 0 #141414',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#141414',
                zIndex: 10001,
              }}
              aria-label="Next artwork"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="gd-lightbox-img"
            />

            <div className="gd-lightbox-footer">
              <span>{filteredItems[lightboxIndex].title}</span>
              <span>·</span>
              <span style={{ color: '#8B5CF6' }}>
                {filteredItems[lightboxIndex].collectionLabel}
              </span>
              <span>·</span>
              <span>
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphicDesignPage;
