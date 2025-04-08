import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showControls?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  showControls = false,
  onPrevious,
  onNext
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (showControls) {
        if (e.key === 'ArrowLeft' && onPrevious) onPrevious();
        if (e.key === 'ArrowRight' && onNext) onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, showControls, onPrevious, onNext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={32} />
        </button>

        {showControls && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>
          </>
        )}

        <div className="relative max-w-full max-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}