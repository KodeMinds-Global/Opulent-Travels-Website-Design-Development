import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Destinations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('destinations');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const destinations = [
    {
      id: 1,
      title: "Maldives",
      subtitle: "Paradise on Earth",
      description: "Crystal-clear waters, overwater villas, and pristine coral reefs await in this tropical paradise.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=3945&auto=format&fit=crop",
      highlights: ["Overwater Villas", "Private Islands", "World-class Diving"],
      gradient: "from-luxury-teal to-cyan-400"
    },
    {
      id: 2,
      title: "Sri Lanka",
      subtitle: "Pearl of the Indian Ocean",
      description: "Ancient temples, lush tea plantations, and golden beaches create an unforgettable cultural tapestry.",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=3648&auto=format&fit=crop",
      highlights: ["Cultural Heritage", "Wildlife Safaris", "Mountain Railways"],
      gradient: "from-luxury-coral to-pink-400"
    }
  ];

  return (
    <section id="destinations" className="py-10 sm:py-14 md:py-20 bg-destinations-gradient">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className={`font-playfair font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-luxury-charcoal mb-3 sm:mb-4 md:mb-6 transition-all duration-1000 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Exclusive <span className="text-gradient">Destinations</span>
          </h2>
          <p className={`font-lora text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Discover breathtaking destinations where luxury meets natural beauty
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`group cursor-pointer transition-all duration-1000 ${
                isVisible 
                  ? index === 0 
                    ? 'animate-slide-in-left' 
                    : 'animate-slide-in-right'
                  : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl luxury-card hover-lift">
                {/* Background Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                  <div className={`inline-block px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-poppins font-medium text-white mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r ${destination.gradient} w-fit`}>
                    {destination.subtitle}
                  </div>
                  
                  <h3 className="font-playfair font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-2 sm:mb-3 md:mb-4">
                    {destination.title}
                  </h3>
                  
                  <p className="font-lora text-sm sm:text-base md:text-lg text-white/90 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                    {destination.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6">
                    {destination.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white font-montserrat"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <Button className="gold-button text-xs sm:text-sm md:text-base self-start group-hover:scale-105 transition-transform duration-300 py-1 sm:py-2 md:py-3">
                    Explore {destination.title}
                  </Button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-luxury-gold/10 to-luxury-teal/10 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
