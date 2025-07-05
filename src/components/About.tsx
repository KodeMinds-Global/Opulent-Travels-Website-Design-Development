import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getAssetPath } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  const images = [
    getAssetPath("/assets/images/about_01.jpg"),
    getAssetPath("/assets/images/about_02.jpg"),
    getAssetPath("/assets/images/about_03.jpg")
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
  
      return () => clearInterval(interval);
    }
  }, [images.length, isHovering]);

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
      {/* Dark mode background overlay */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'
          }`}>
            <h2 className="font-playfair font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-luxury-charcoal dark:text-white mb-3 sm:mb-4 md:mb-6">
              Crafting <span className="text-gradient dark:text-dark-gradient">Unforgettable</span> Experiences
            </h2>
            <p className="font-lora text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
              At Opulent Travels, we don't just plan trips – we curate extraordinary journeys that awaken your senses and create memories that last a lifetime. Our passion for luxury travel and deep local knowledge ensures every moment exceeds your expectations.
            </p>
            <p className="font-lora text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-5 md:mb-8 leading-relaxed">
              From the pristine beaches of the Maldives to the cultural richness of Sri Lanka, we provide exclusive access to hidden gems and luxury accommodations that define true opulence.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-6 mb-6">
              <div className="text-center">
                <div className="font-playfair font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-luxury-teal dark:text-dark-accent mb-1 sm:mb-2">500+</div>
                <div className="font-montserrat text-xs sm:text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="font-playfair font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-luxury-gold dark:text-dark-accent mb-1 sm:mb-2">3+</div>
                <div className="font-montserrat text-xs sm:text-sm text-gray-600 dark:text-gray-400">Destinations</div>
              </div>
              <div className="text-center">
                <div className="font-playfair font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-luxury-coral dark:text-dark-accent mb-1 sm:mb-2">15+</div>
                <div className="font-montserrat text-xs sm:text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
            </div>
            
            {/* About Us Page Link Button */}
            <Link to="/about-us">
              <Button className="gold-button bg-luxury-gold text-black hover:bg-luxury-gold/90 transition-all mt-4">
                Learn More About Us
              </Button>
            </Link>
          </div>

          {/* Right Image Frame */}
          <div className={`transition-all duration-1000 delay-500 mt-6 sm:mt-8 lg:mt-0 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'
          }`}>
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Enhanced Luxury Frame Effect with more curved borders */}
              <div className="absolute -inset-2.5 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-luxury-gold via-luxury-teal to-luxury-coral dark:from-dark-accent/60 dark:via-dark-primary/60 dark:to-dark-secondary/60 rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] opacity-75 blur-lg"></div>
              <div className="relative bg-white dark:bg-dark-surface/80 p-2 sm:p-3 md:p-4 rounded-[0.8rem] sm:rounded-[1.2rem] md:rounded-[1.5rem] shadow-2xl">
                <div 
                  className="aspect-[4/3] rounded-[0.7rem] sm:rounded-[1rem] md:rounded-[1.2rem] overflow-hidden cursor-pointer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Image container with hover effect */}
                  <div className="relative w-full h-full overflow-hidden">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Luxury Travel ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        } ${isHovering ? 'scale-110 filter brightness-105' : 'scale-100'}`}
                      />
                    ))}
                    
                    {/* Overlay effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-luxury-charcoal/50 dark:from-dark-background/70 to-transparent transition-opacity duration-500 ${
                      isHovering ? 'opacity-70' : 'opacity-0'
                    }`}></div>
                    
                    {/* Hover text */}
                    <div className={`absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-6 text-white transform transition-all duration-500 ${
                      isHovering ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                      <p className="font-playfair text-sm sm:text-base md:text-lg font-bold">Discover Paradise</p>
                      <p className="font-lora text-xs sm:text-sm">Explore our premium destinations</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 bg-luxury-gold dark:bg-dark-accent text-luxury-charcoal dark:text-dark-background px-2 py-1 sm:px-3 sm:py-2 md:px-6 md:py-3 rounded-full font-poppins text-xs sm:text-sm md:text-base font-semibold shadow-lg animate-float">
                Premium Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
