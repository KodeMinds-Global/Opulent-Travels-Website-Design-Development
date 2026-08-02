import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TermsAndConditions from '@/components/TermsAndConditions';
import { sriLankaTermsAndConditions } from '@/data/termsAndConditions';
import { getAssetPath } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const TermsConditionsPage = () => {
  const handleScrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />

      {/* Full Screen Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getAssetPath('/assets/images/Maldives_bg.jpg')}
            alt="Terms & Conditions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 sm:bg-black/45 md:bg-black/40"></div>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex items-center">
          <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="font-playfair font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl text-white mb-2 sm:mb-4 md:mb-6 leading-tight">
              Terms &amp; <span className="text-luxury-gold">Conditions</span>
            </h1>
            <p className="font-lora text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Please read our terms and conditions carefully before booking your journey
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center z-20 mb-6 md:mb-8">
          <button
            onClick={handleScrollToContent}
            className="flex flex-col items-center animate-bounce-slow px-3 py-2 cursor-pointer"
          >
            <span className="text-white font-montserrat text-sm md:text-base font-medium">Scroll to read</span>
            <ChevronDown className="w-4 h-4 md:w-6 md:h-6 text-white mt-1" />
          </button>
        </div>
      </section>

      {/* Terms Content */}
      <main>
        <TermsAndConditions termsData={sriLankaTermsAndConditions} />
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditionsPage;
