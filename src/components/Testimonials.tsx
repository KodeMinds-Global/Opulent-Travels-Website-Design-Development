import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('testimonials');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Absolutely breathtaking experience! The Maldives package exceeded all expectations. Every detail was perfectly orchestrated.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "London, UK",
      text: "The Sri Lanka cultural tour was phenomenal. Our guide's knowledge and the luxury accommodations made it unforgettable.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Emma Williams",
      location: "Sydney, Australia",
      text: "Opulent Travels delivered beyond our wildest dreams. The combined tour was seamlessly executed with luxury at every turn.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=300&auto=format&fit=crop"
    }
  ];

  // Add padding testimonials to create a circular effect - only used in desktop view
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials
  ];

  // For desktop: show current + adjacent testimonials
  const visibleDesktopTestimonials = extendedTestimonials.slice(
    currentIndex,
    currentIndex + 3
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-10 sm:py-12 md:py-16 relative bg-black text-white overflow-hidden">
      {/* Parallax Background Image - Same for both light and dark modes */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=3270&auto=format&fit=crop")', 
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay for both light and dark modes */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className={`font-playfair font-bold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 transition-all duration-1000 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            What Our <span className="text-transparent bg-clip-text" style={{
              background: 'linear-gradient(90deg, #00308F 0%, #0066CC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Clients Say</span>
          </h2>
          <p className={`font-lora text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Discover why travelers choose us for their luxury adventures
          </p>
        </div>

        {/* Mobile View: Single Testimonial */}
        <div className="md:hidden relative max-w-sm mx-auto overflow-hidden py-4">
          <div 
            className="rounded-2xl p-5 sm:p-6 backdrop-blur-sm bg-gray-800/90 shadow-xl border border-gray-700 transition-all duration-500"
          >
            {/* Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <span key={i} className="text-luxury-gold text-base sm:text-lg">⭐</span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-lora text-sm sm:text-base text-gray-200 mb-5 sm:mb-6 leading-relaxed text-center">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Client Info */}
            <div className="flex items-center justify-center">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-luxury-gold/30 mr-3 sm:mr-4"
              />
              <div className="text-left">
                <h4 className="font-playfair font-bold text-sm sm:text-base text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="font-montserrat text-xs sm:text-sm text-luxury-gold">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="bg-gray-800/80 rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-700 transition-all"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="bg-gray-800/80 rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-700 transition-all"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop View: Multi-Testimonial Carousel */}
        <div className="hidden md:block relative max-w-6xl mx-auto overflow-hidden py-6">
          {/* Main Testimonials Display */}
          <div className="flex justify-center items-center gap-4 mb-10">
            {visibleDesktopTestimonials.map((testimonial, idx) => {
              const isCenter = idx === 1;
              
              return (
                <div 
                  key={`${testimonial.id}-${idx}`}
                  className={`transition-all duration-500 ${
                    isCenter 
                      ? 'w-1/2 z-10 scale-100 opacity-100' 
                      : 'w-1/3 z-0 scale-90 opacity-80'
                  }`}
                >
                  <div 
                    className={`rounded-2xl p-6 backdrop-blur-sm 
                      ${isCenter 
                        ? 'bg-gray-800/90 shadow-xl transform -translate-y-4' 
                        : 'bg-gray-800/70 shadow-md'
                      } 
                      transition-all duration-500 h-full
                      border border-gray-700
                    `}
                  >
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-luxury-gold text-lg">⭐</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className={`font-lora text-gray-200 mb-6 leading-relaxed ${
                      isCenter ? 'text-base lg:text-lg' : 'text-sm'
                    }`}>
                      "{testimonial.text}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className={`rounded-full object-cover ring-2 ring-luxury-gold/30 mr-4 ${
                          isCenter ? 'w-14 h-14' : 'w-10 h-10'
                        }`}
                      />
                      <div className="text-left">
                        <h4 className={`font-playfair font-bold text-white ${
                          isCenter ? 'text-base' : 'text-sm'
                        }`}>
                          {testimonial.name}
                        </h4>
                        <p className={`font-montserrat text-luxury-gold ${
                          isCenter ? 'text-sm' : 'text-xs'
                        }`}>
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Navigation Arrows */}
          <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-700 transition-all"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-700 transition-all"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Navigation Dots - shown on both mobile and desktop */}
        <div className="flex justify-center mt-4 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-luxury-gold scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
