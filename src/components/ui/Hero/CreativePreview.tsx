import React from 'react';
import { Camera, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// A curated set of gallery shots available in the photography folder
const PREVIEW_IMAGES: string[] = [
  '/assets/creative/photography/gallery-10.jpg',
  '/assets/creative/photography/gallery-11.jpg',
  '/assets/creative/photography/gallery-5.jpg',
];

export const CreativePreview: React.FC = () => {
  return (
    <div className="creative-preview">
      {/* Header with label and inline CTA link */}
      <div className="creative-preview-header">
        <div className="creative-preview-label">
          <Camera className="w-3.5 h-3.5 text-[#00d4ff]" />
          <span>Visual Work</span>
        </div>
        <Link to="/creative/photography" className="creative-preview-cta">
          Gallery <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Image strip */}
      <div className="creative-preview-strip">
        {PREVIEW_IMAGES.map((src, i) => (
          <div key={i} className="creative-preview-thumb">
            <img src={src} alt={`Photography ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};
