import React from 'react';
import { getAssetPath } from '@/lib/utils';
import './AnimatedHero.css';
import { ChevronDown } from 'lucide-react';

// Define props interface
interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  svgPath?: string; // Make svgPath optional
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  svgPath
}) => {
  // Function to handle scroll to next section
  const handleScrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden">
      {/* Background image with zoom animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 animate-bgZoomIn" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay with zoom-out animation */}
      <div 
        className="absolute inset-0 bg-cover bg-top z-0 scale-200 animate-bgZoomOut" 
        style={{ backgroundImage: `url(${getAssetPath('/assets/images/after.png')})` }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Main Content - centered vertically */}
      <div className="flex-grow flex items-center">
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          {/* Animated Title - choose between SVG or Text based on whether svgPath is provided */}
          {svgPath ? (
            <div className="title flex justify-center mb-4">
              <svg width="360" height="120" viewBox="0 0 26 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-textDraw">
                <path d={svgPath} fill="white" className="animated-path" />
              </svg>
            </div>
          ) : (
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 animate-textReveal">{title}</h1>
          )}
          
          <p className="font-lora text-xl md:text-2xl mb-6 opacity-0 animate-fadeIn">{subtitle}</p>
          <p className="font-montserrat max-w-3xl mx-auto mb-8 opacity-0 animate-fadeIn animation-delay-300">{description}</p>
          <button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-2.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all opacity-0 animate-fadeIn animation-delay-600">
            Plan Your Trip
          </button>
        </div>
      </div>

      {/* Scroll Indicator at bottom */}
      <div className="w-full flex justify-center z-20 mb-6 md:mb-8 opacity-0 animate-fadeIn animation-delay-900">
        <button 
          onClick={handleScrollToContent}
          className="flex flex-col items-center animate-bounce-slow px-3 py-2 cursor-pointer"
        >
          <span className="text-white font-montserrat text-sm md:text-base font-medium">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 md:w-6 md:h-6 text-white mt-1" />
        </button>
      </div>
    </section>
  );
};

export default AnimatedHero; 