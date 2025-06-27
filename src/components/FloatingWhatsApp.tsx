import React from 'react';
import { Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingWhatsApp = () => {
  const isMobile = useIsMobile();
  
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+94774830911', '_blank');
  };

  return (
    <div className="fixed right-3 sm:right-4 md:right-5 lg:right-6 bottom-6 sm:bottom-6 md:bottom-8 lg:bottom-10 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse group"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-30"></div>
        
        {/* Lighting effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-300 to-green-500 opacity-40 blur-md group-hover:blur-lg transition-all duration-300"></div>
        
        <Phone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white relative z-10 transform rotate-12" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] sm:shadow-[0_0_20px_rgba(34,197,94,0.5)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all duration-300"></div>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
