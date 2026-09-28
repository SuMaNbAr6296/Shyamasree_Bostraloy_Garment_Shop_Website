'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';

interface Slide {
  id: string;
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { id: 'slide-1', src: '/assets/hero/hero-01.png', alt: 'Traditional Saree Collection' },
  { id: 'slide-2', src: '/assets/hero/hero-02.png', alt: 'Designer Kurti Showcase' },
  { id: 'slide-3', src: '/assets/hero/hero-03.png', alt: 'Men\'s Ethnic Wear' },
  { id: 'slide-4', src: '/assets/hero/hero-04.png', alt: 'Boutique Textile Showcase' },
];

export function HeroCarousel({ children }: { children?: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-lg border border-border shadow-md bg-muted/40 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Image Carousel"
      role="region"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0.4, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="relative w-full h-full"
        >
          <Image
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            fill
            priority={currentIndex === 0}
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next Controls */}
      <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <IconButton
          variant="outline"
          size="sm"
          aria-label="Previous Slide"
          onClick={prevSlide}
          className="pointer-events-auto bg-card/80 backdrop-blur-xs text-foreground hover:bg-card shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
        </IconButton>
        <IconButton
          variant="outline"
          size="sm"
          aria-label="Next Slide"
          onClick={nextSlide}
          className="pointer-events-auto bg-card/80 backdrop-blur-xs text-foreground hover:bg-card shadow-xs"
        >
          <ChevronRight className="w-4 h-4" />
        </IconButton>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex items-center justify-center gap-2 pointer-events-auto">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx ? 'w-6 bg-primary' : 'w-2 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>

      {/* Children overlay (Buttons) */}
      {children && (
        <div className="hidden sm:flex absolute inset-0 flex-col items-center justify-end pb-12 sm:pb-16 pointer-events-none z-10">
          <div className="pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
