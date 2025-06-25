import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedVideo } from '@/components/ui/optimized-video';
import { getAssetPath } from '@/lib/utils';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      video: getAssetPath("/assets/videos/Scene_01.webm"),
      title: "Sri Lanka",
      description: "Embark on extraordinary journeys to Sri Lanka and the Maldives, where luxury meets pristine natural beauty",
      primaryBtn: "Explore Destinations",
      secondaryBtn: "Plan Your Trip",
      duration: 5000, // 5 seconds
    },
    {
      video: getAssetPath("/assets/videos/Scene_02.webm"),
      title: "Maldives",
      description: "Experience world-class accommodations and personalized service in the most breathtaking locations",
      primaryBtn: "View Luxury Suites",
      secondaryBtn: "Contact Us",
      duration: 5000, // 5 seconds
    },
    {
      video: getAssetPath("/assets/videos/Scene_03.webm"),
      title: "Rent Cars",
      description: "Create unforgettable memories with our curated collection of premium travel experiences",
      primaryBtn: "Book Experience",
      secondaryBtn: "Learn More",
      duration: 5000, // 5 seconds
    }
  ];

  // Preload next slide's video
  useEffect(() => {
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    const nextVideoSrc = slides[nextSlideIndex].video;
    
    if (nextVideoSrc) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = nextVideoSrc;
      preloadLink.as = 'video';
      document.head.appendChild(preloadLink);
      
      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [currentSlide, slides]);

  // Typewriter effect
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    if (isTyping && charIndex < currentSlideData.title.length) {
      const timer = setTimeout(() => {
        setCurrentText(currentSlideData.title.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else if (charIndex >= currentSlideData.title.length) {
      setIsTyping(false);
    }
  }, [charIndex, currentSlide, isTyping, slides]);

  // Auto slide change with dynamic timing
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    const timer = setTimeout(() => {
      triggerSlideChange((currentSlide + 1) % slides.length);
    }, currentSlideData.duration);
    return () => clearTimeout(timer);
  }, [currentSlide, slides]);

  const triggerSlideChange = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      goToSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setCharIndex(0);
    setCurrentText('');
    setIsTyping(true);
  };

  const goToPrevious = () => {
    triggerSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    triggerSlideChange((currentSlide + 1) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Videos with enhanced transitions */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          } ${isTransitioning ? 'filter blur-sm' : ''}`}
        >
          <OptimizedVideo 
            src={slide.video}
            className="w-full h-full object-cover"
            priority={index === currentSlide || index === ((currentSlide + 1) % slides.length)}
          />
          {/* Dark overlay for better text readability, especially on mobile */}
          <div className="absolute inset-0 bg-black/40 sm:bg-black/30 md:bg-black/20"></div>
        </div>
      ))}

      {/* Navigation Arrows - smaller on mobile */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
      </button>

      {/* Main Content - centered vertically */}
      <div className="flex-grow flex items-center">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <h1 className="font-playfair font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl text-white mb-2 sm:mb-4 md:mb-6 leading-tight">
              {currentText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="font-lora text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              {currentSlideData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-6 justify-center items-center mb-4 sm:mb-6 md:mb-8">
              <Button className="gold-button text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-5 md:px-8 lg:px-10 py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-6 animate-pulse-gold text-black w-36 sm:w-40 md:w-48 lg:w-auto">
                {currentSlideData.primaryBtn}
              </Button>
              <Button 
                variant="outline" 
                className="teal-button border border-luxury-teal sm:border-2 text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-5 md:px-8 lg:px-10 py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-6 bg-transparent hover:bg-luxury-teal text-black w-36 sm:w-40 md:w-48 lg:w-auto mt-2 sm:mt-0"
              >
                {currentSlideData.secondaryBtn}
              </Button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => triggerSlideChange(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-luxury-gold scale-125' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - explicitly at bottom */}
      <div className="w-full flex justify-center z-20 mb-3 sm:mb-4 md:mb-6">
        <div className="flex flex-col items-center animate-bounce-slow px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2">
          <span className="text-white font-montserrat text-xs sm:text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
