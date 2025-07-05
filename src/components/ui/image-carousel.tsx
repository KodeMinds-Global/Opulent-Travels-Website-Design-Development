import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import './image-carousel.css';

export interface CarouselItem {
  image: string;
  title: string;
  name: string;
  description: string;
}

interface ImageCarouselProps {
  items: CarouselItem[];
  autoRunTime?: number; // Time in milliseconds for auto-next
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  items, 
  autoRunTime = 7000,
  className = ""
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const runningTimeRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeRunning = 3000; // Time for animation to complete

  const resetTimeAnimation = () => {
    if (!runningTimeRef.current) return;
    
    runningTimeRef.current.style.animation = 'none';
    void runningTimeRef.current.offsetHeight; // Trigger reflow
    runningTimeRef.current.style.animation = `runningTime ${autoRunTime/1000}s linear 1 forwards`;
  };

  const showSlider = (type: 'next' | 'prev') => {
    if (!carouselRef.current || !listRef.current) return;

    // Get all items
    const sliderItems = Array.from(listRef.current.children) as HTMLElement[];
    
    if (type === 'next') {
      // Move first element to the end
      const firstItem = sliderItems[0];
      listRef.current.appendChild(firstItem);
      carouselRef.current.classList.add('next');
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else {
      // Move last element to the beginning
      const lastItem = sliderItems[sliderItems.length - 1];
      listRef.current.insertBefore(lastItem, listRef.current.firstChild);
      carouselRef.current.classList.add('prev');
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }

    // Remove classes after animation completes
    setTimeout(() => {
      if (!carouselRef.current) return;
      carouselRef.current.classList.remove('next');
      carouselRef.current.classList.remove('prev');
    }, timeRunning);

    resetTimeAnimation();
  };

  useEffect(() => {
    // Auto run carousel
    const runNextAuto = setTimeout(() => {
      showSlider('next');
    }, autoRunTime);

    // Initialize animation
    resetTimeAnimation();

    return () => {
      clearTimeout(runNextAuto);
    };
  }, [currentIndex, autoRunTime]);

  return (
    <div className={`carousel-wrapper overflow-hidden shadow-xl ${className}`} style={{ borderRadius: '20px' }}>
      <div className={`carousel-container`}>
        <div className="carousel" ref={carouselRef}>
          <div className="list" ref={listRef}>
            {items.map((item, index) => (
              <div 
                key={index}
                className="item"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="content">
                  <div className="title">{item.title}</div>
                  <div className="name">{item.name}</div>
                  <div className="des">{item.description}</div>
            
                </div>
              </div>
            ))}
          </div>

          {/* Time running */}
          <div className="timeRunning" ref={runningTimeRef}></div>

          {/* Next/prev buttons */}
          <div className="arrows">
            <Button 
              onClick={() => showSlider('prev')} 
              className="prev bg-light-accent dark:bg-dark-accent text-white hover:bg-white hover:text-gray-900 h-12 w-12 rounded-full p-0 flex items-center justify-center"
            >
              &lt;
            </Button>
            <Button 
              onClick={() => showSlider('next')} 
              className="next bg-light-accent dark:bg-dark-accent text-white hover:bg-white hover:text-gray-900 h-12 w-12 rounded-full p-0 flex items-center justify-center"
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel; 