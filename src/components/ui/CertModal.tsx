import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface CertModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export const CertModal: React.FC<CertModalProps> = ({ isOpen, imageSrc, imageAlt, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div className="cert-modal open">
      <div className="cert-modal-backdrop" onClick={onClose} />
      <div className="cert-modal-inner">
        <button className="cert-modal-close" onClick={onClose} aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
};
