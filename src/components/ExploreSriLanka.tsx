import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ExploreSriLanka = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('explore-sri-lanka');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Image data for Sri Lanka
  const sriLankaImages = [
    {
      src: "/assets/images/Sri_Lankan_04.jpg",
      alt: "Pristine Beaches & Coastal Escapes",
      caption: "Relax on golden sands, surf the waves, or enjoy vibrant marine life along the stunning coastline."
    },
    {
      src: "/assets/images/Sri_Lankan_03.jpg",
      alt: "Wild Safaris & Nature Reserves",
      caption: "Encounter elephants, leopards, and a myriad of exotic birds in sprawling national parks."
    },
    {
      src: "/assets/images/Sri_Lankan_02.jpg",
      alt: "Lush Hill Country & Tea Plantations",
      caption: "Wander through emerald tea estates, mist-shrouded mountains, and cascading waterfalls."
    },
    {
      src: "/assets/images/Sri_Lankan_01.jpg",
      alt: "Adventure & Ecotourism",
      caption: "Thrill-seeking awaits with hiking, white-water rafting, and responsible exploration of natural wonders."
    }
  ];

  return (
    <section 
      id="explore-sri-lanka" 
      className="py-20 relative dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9f5f5 35%, #f5f0f5 70%, #f8f9fa 100%)"
      }}
    >
      {/* Dark mode overlay to override the inline style */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
      
      <div className="container mx-auto px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
              Sri Lanka
            </div>
          </div>
          <h2 className={`font-playfair font-bold text-4xl lg:text-5xl mb-6 transition-all duration-1000 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          } text-light-primary dark:text-dark-accent`}>
             <span 
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(90deg, #00308F 0%, #0066CC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <span className="dark:hidden">Explore with Sri Lanka</span>
              <span className="hidden dark:inline" style={{
                background: 'linear-gradient(90deg, #00BFFF 0%, #1E90FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Explore with Sri Lanka</span>
            </span>
          </h2>
          <p className={`font-lora text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            Discover the Pearl of the Indian Ocean with its rich culture, stunning landscapes, and warm hospitality
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 items-center">
          {/* Content Side - Now with Images Grid */}
          <div className={`transition-all duration-1000 delay-500 flex flex-col ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="grid grid-cols-2 gap-3 mx-auto w-[95%]">
              {sriLankaImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl 
                    transition-all duration-500 
                    hover-lift group
                    border border-gray-100 dark:border-dark-primary/30
                    ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'}`}
                  style={{ 
                    animationDelay: `${800 + index * 200}ms`,
                    height: "220px",
                  }}
                >
                  {/* Image */}
                  <div className="h-full overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Caption overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-playfair text-lg font-bold">{image.alt}</p>
                      <p className="font-lora text-sm">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side - Large image with hover effect */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group hover-lift border border-gray-100 dark:border-dark-primary/30 mx-auto w-[95%]">
              <div className="h-[450px] overflow-hidden">
                <img
                  src="/assets/images/Sri_Lankan_05.jpg"
                  alt="Sri Lanka Temple"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-playfair font-bold text-2xl">Historical & Cultural Wonders</h3>
                <p className="font-lora">Step back in time amidst ancient cities, majestic temples, and UNESCO World Heritage sites.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Centered View More button */}
        <div className="flex justify-center mt-12">
          <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:dark-button">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreSriLanka;
