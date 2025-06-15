import React, { useState, useCallback } from 'react';
import { Button } from './button';
import { CaretLeft as ChevronLeft, CaretRight as ChevronRight } from '@phosphor-icons/react';
import { ScrollArea, ScrollBar } from './scroll-area';

interface PropertyGalleryProps {
  images: string[];
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnailRef, setThumbnailRef] = useState<HTMLDivElement | null>(null);
  
  // Define these callbacks outside of useEffect to prevent dependency issues
  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }, [images.length]);
  
  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }, [images.length]);

  // Use keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);
  
  // Scroll the thumbnail into view when active index changes
  React.useEffect(() => {
    if (thumbnailRef) {
      const scrollOffset = activeIndex * 100; // Approximate width of thumbnail
      thumbnailRef.scrollTo({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  }, [activeIndex, thumbnailRef]);
  
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <div className="aspect-video relative">
          <img 
            src={images[activeIndex]} 
            alt="Property" 
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Navigation arrows */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white" 
          onClick={goToPrevious}
        >
          <ChevronLeft size={24} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white" 
          onClick={goToNext}
        >
          <ChevronRight size={24} />
        </Button>
      </div>
      
      {/* Thumbnails */}
      <ScrollArea className="w-full">
        <div 
          className="flex gap-2" 
          ref={setThumbnailRef}
        >
          {images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden transition 
                ${activeIndex === index ? 'ring-2 ring-primary' : 'opacity-70'}`}
              onClick={() => setActiveIndex(index)}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`} 
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};