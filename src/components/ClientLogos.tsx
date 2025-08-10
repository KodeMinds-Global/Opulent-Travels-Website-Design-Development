import React, { useEffect, useState } from 'react';
import { getAssetPath } from '@/lib/utils';

const ClientLogos = () => {
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

    const section = document.getElementById('client-logos');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Using the actual logo files from public folder with correct paths
  const logos = [
    { id: 1, path: getAssetPath('/assets/images/logo_01.png'), alt: 'Partner Logo 1' },
    { id: 2, path: getAssetPath('/assets/images/logo_02.png'), alt: 'Partner Logo 2' },
    { id: 3, path: getAssetPath('/assets/images/logo_03.png'), alt: 'Partner Logo 3' },
    { id: 4, path: getAssetPath('/assets/images/logo_04.png'), alt: 'Partner Logo 4' },
    { id: 5, path: getAssetPath('/assets/images/logo_05.png'), alt: 'Partner Logo 5' }
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section id="client-logos" className="py-20 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`inline-block mb-3 transition-all duration-1000 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-r from-indigo-600 to-blue-400 dark:from-indigo-400 dark:to-blue-300 text-white dark:text-gray-900 text-sm font-medium px-4 py-1 rounded-full">
              Our Partners
            </div>
          </div>
          <h2 className={`font-playfair font-bold text-3xl lg:text-4xl mb-4 transition-all duration-1000 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          } text-gray-900 dark:text-white`}>
            Our Memberships  <span className="text-transparent bg-clip-text" style={{
              background: 'linear-gradient(90deg, #00308F 0%, #0066CC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>& Accreditations</span>
          </h2>
          <p className={`font-lora text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Working with the world's finest hospitality and travel brands
          </p>
        </div>

        {/* Logo Carousel */}
        <div className={`relative mx-auto max-w-4xl transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="logo-carousel-container overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md">
            <div className="logo-track flex animate-carousel py-4">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="logo-slide flex-shrink-0 px-8 w-1/4 flex items-center justify-center"
                >
                  <div className="bg-slate-300 dark:bg-gray-700 rounded-xl shadow-lg p-6 w-full h-24 flex items-center justify-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border border-gray-200 dark:border-gray-600">
                    <img
                      src={logo.path}
                      alt={logo.alt}
                      className="max-w-full max-h-full object-contain filter transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10"></div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center">
            <div className="font-playfair font-bold text-3xl text-blue-600 dark:text-blue-400 mb-2">50+</div>
            <div className="font-montserrat text-gray-600 dark:text-gray-300">Premium Partners</div>
          </div>
          <div className="text-center">
            <div className="font-playfair font-bold text-3xl text-blue-600 dark:text-blue-400 mb-2">500+</div>
            <div className="font-montserrat text-gray-600 dark:text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="font-playfair font-bold text-3xl text-blue-600 dark:text-blue-400 mb-2">15+</div>
            <div className="font-montserrat text-gray-600 dark:text-gray-300">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="font-playfair font-bold text-3xl text-blue-600 dark:text-blue-400 mb-2">99%</div>
            <div className="font-montserrat text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes carousel {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-carousel {
            animation: carousel 30s linear infinite;
          }
          
          .animate-carousel:hover {
            animation-play-state: paused;
          }
          
          .logo-carousel-container {
            position: relative;
            width: 100%;
          }
          
          .logo-track {
            width: fit-content;
          }
          
          .logo-slide {
            flex: 0 0 25%;
          }
        `}
      </style>
    </section>
  );
};

export default ClientLogos;
