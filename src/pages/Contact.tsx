import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getAssetPath } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactSection from '@/components/Contact';

const ContactPage = () => {
  const handleScrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
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
            src={getAssetPath("/assets/images/Sri_Lanka_bg.jpg")}
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 sm:bg-black/30 md:bg-black/20"></div>
        </div>

        {/* Main Content - centered vertically */}
        <div className="flex-grow flex items-center">
          <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="font-playfair font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl text-white mb-2 sm:mb-4 md:mb-6 leading-tight">
              Get in <span className="text-luxury-gold">Touch</span>
            </h1>
            <p className="font-lora text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
              We're here to help you plan your perfect travel experience
            </p>
            <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-2.5 px-6 sm:px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Let's Connect
            </Button>
          </div>
        </div>

        {/* Scroll Indicator at bottom */}
        <div className="w-full flex justify-center z-20 mb-6 md:mb-8">
          <button 
            onClick={handleScrollToContent}
            className="flex flex-col items-center animate-bounce-slow px-3 py-2 cursor-pointer"
          >
            <span className="text-white font-montserrat text-sm md:text-base font-medium">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 md:w-6 md:h-6 text-white mt-1" />
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <main>
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ContactPage;
