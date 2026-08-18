import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  youtubeId: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, youtubeId, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !youtubeId) return null;

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;

  return (
    <div className="cert-modal open" style={{ zIndex: 4000 }}>
      <div className="cert-modal-backdrop" onClick={onClose} />
      <div className="cert-modal-inner" style={{ width: '90vw', maxWidth: '900px', aspectRatio: '16/9', padding: '0.8rem' }}>
        <button className="cert-modal-close" onClick={onClose} aria-label="Close video">
          <X className="w-5 h-5" />
        </button>
        <iframe
          src={embedUrl}
          title="Video player"
          className="w-full h-full rounded-xl border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
