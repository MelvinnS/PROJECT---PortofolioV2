import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalImages?: number;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  imageSrc,
  imageAlt,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalImages,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3500] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main container */}
      <div className="relative z-10 max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:top-2 md:-right-12 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer z-20"
          aria-label="Close image"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev Button */}
        {onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/60 hover:bg-black/80 md:bg-white/10 md:hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-[85vw] max-h-[72vh] md:max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
        />

        {/* Next Button */}
        {onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/60 hover:bg-black/80 md:bg-white/10 md:hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Counter & Alt text */}
        {typeof currentIndex === 'number' && typeof totalImages === 'number' && (
          <div className="mt-4 text-xs md:text-sm font-medium text-white/70 tracking-widest uppercase">
            {currentIndex + 1} / {totalImages} {imageAlt ? `• ${imageAlt}` : ''}
          </div>
        )}
      </div>
    </div>
  );
};

