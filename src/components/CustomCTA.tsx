import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Settings, Sparkles, Users } from 'lucide-react';

const CustomCTA: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+94774830911', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-luxury-teal/10 via-blue-50 to-emerald-50 dark:from-luxury-teal/5 dark:via-dark-surface dark:to-emerald-900/10 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-luxury-gold/10 rounded-full animate-float opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-luxury-teal/10 rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-luxury-coral/10 rounded-full animate-float opacity-80" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-luxury-teal to-blue-500 text-white px-6 py-2 rounded-full font-medium mb-6 transform hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Personalized Experience</span>
            </div>
            
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-luxury-charcoal dark:text-white mb-6">
              Looking for something <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-teal to-blue-500">custom?</span>
            </h2>
            
            <p className="font-lora text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our travel experts can create a personalized itinerary tailored to your preferences, budget, and travel style. 
              Let us craft the perfect journey just for you.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-dark-surface/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-luxury-teal to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-3">
                Tailored Itineraries
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Custom routes, accommodations, and experiences designed around your interests and preferences.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-luxury-coral to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-3">
                Expert Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Work directly with our destination specialists who know every hidden gem and local secret.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-3">
                Flexible Pricing
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Packages designed to fit your budget without compromising on quality and experience.
              </p>
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-white dark:bg-dark-surface/90 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-playfair font-bold text-2xl text-luxury-charcoal dark:text-white mb-6">
              Get Your Custom Quote Today
            </h3>
            
            <div className="flex justify-center mb-8">
              <Button 
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Request Custom Packages
              </Button>
            </div>

            <div className="bg-gradient-to-r from-luxury-gold/10 to-yellow-50 dark:from-luxury-gold/5 dark:to-yellow-900/10 rounded-2xl p-4 border border-luxury-gold/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-luxury-gold">💫 Special Offer:</span> 
                Get a <span className="font-bold">free consultation</span> and <span className="font-bold">10% discount</span> on your custom package when you contact us this month!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomCTA;
