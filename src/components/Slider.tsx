import React, { useState, useEffect, useCallback, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  key: string;
  image: string;
}

interface SliderProps {
  slides: Slide[];
  translations: any;
  autoPlayInterval?: number;
  transitionDuration?: number;
}

export function Slider({
  slides,
  translations,
  autoPlayInterval = 5000,
  transitionDuration = 500,
}: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
    setIsAutoPlaying(false);
  }, [slides.length, isTransitioning, transitionDuration]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
    setIsAutoPlaying(false);
  }, [slides.length, isTransitioning, transitionDuration]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
    setIsAutoPlaying(false);
  };

  // Touch handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto-play
  useEffect(() => {
    let interval: number;

    if (isAutoPlaying && !isTransitioning) {
      interval = setInterval(nextSlide, autoPlayInterval);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval, isTransitioning]);

  // Pause auto-play when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAutoPlaying(false);
      } else {
        setIsAutoPlaying(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div 
      className="slider-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''} ${
            isTransitioning ? 'transitioning' : ''
          }`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
            transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
          }}
          onClick={() => window.location.href = `/business/${slide.id}`}
        >
          <img
            src={slide.image}
            alt={translations.slider[slide.key].title}
            className="slide-image"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="slide-content">
            <h2 className="slide-title">
              {translations.slider[slide.key].title}
            </h2>
            <p className="slide-description">
              {translations.slider[slide.key].description}
            </p>
          </div>
        </div>
      ))}

      <button 
        className="arrow-btn prev-btn"
        onClick={prevSlide}
        disabled={isTransitioning}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        className="arrow-btn next-btn"
        onClick={nextSlide}
        disabled={isTransitioning}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="slider-nav">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`nav-btn ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="autoplay-toggle"
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoPlaying ? '⏸' : '▶'}
      </button>
    </div>
  );
}