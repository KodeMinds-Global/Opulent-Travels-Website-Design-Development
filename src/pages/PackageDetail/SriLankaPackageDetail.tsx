import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Button } from '@/components/ui/button';
import { usePackages } from '@/hooks/usePackages';
import { Clock, MapPin, Users, Star, Calendar, DollarSign, CheckCircle, XCircle, Hotel, Car, Plane, Camera, Heart, Shield } from 'lucide-react';

const SriLankaPackageDetail = () => {
  const { packageId } = useParams();
  const { getPackageById } = usePackages();
  const [isVisible, setIsVisible] = useState({
    hero: false,
    itinerary: false,
    inclusions: false,
    pricing: false,
    hotels: false,
    terms: false
  });
  
  const packageData = getPackageById(packageId || '');

  useEffect(() => {
    // Trigger hero animation immediately
    setIsVisible(prev => ({ ...prev, hero: true }));

    // Set up intersection observers for other sections
    const observerOptions = { threshold: 0.2 };
    
    const createObserver = (sectionId: string, visibilityKey: string) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [visibilityKey]: true }));
          }
        },
        observerOptions
      );
    };

    const itineraryObserver = createObserver('itinerary', 'itinerary');
    const inclusionsObserver = createObserver('inclusions', 'inclusions');

    const sections = [
      { id: 'itinerary', observer: itineraryObserver },
      { id: 'inclusions', observer: inclusionsObserver }
    ];

    sections.forEach(({ id, observer }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ observer }) => observer.disconnect());
    };
  }, []);

  if (!packageData || packageData.type !== 'sriLanka') {
    return <Navigate to="/sri-lanka" replace />;
  }

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <Navigation />
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
          style={{ backgroundImage: `url(${packageData.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>
        
        {/* Floating Elements - Hidden on mobile for better performance */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-luxury-gold rounded-full animate-float opacity-70"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-luxury-teal rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-luxury-coral rounded-full animate-float opacity-80" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <div className={`max-w-4xl w-full transition-all duration-1500 ${isVisible.hero ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-12'}`}>
            {/* Package Badge */}
            <div className="inline-flex items-center bg-luxury-gold/90 backdrop-blur-sm text-black px-4 sm:px-6 py-2 rounded-full font-medium mb-4 sm:mb-6 transform hover:scale-105 transition-transform duration-300">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="text-sm sm:text-base">Premium Sri Lanka Experience</span>
            </div>
            
            {/* Package Title */}
            <h1 className="font-playfair font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6 leading-tight px-2">
              {packageData.title}
            </h1>
            
            {/* Package Info Cards */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 px-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center text-white">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-luxury-gold" />
                <span className="font-medium text-sm sm:text-base">{packageData.duration}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center text-white">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-luxury-teal" />
                <span className="font-medium text-sm sm:text-base">{packageData.locations.length} Destinations</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="font-lora text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              {packageData.longDescription}
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Day-by-Day Itinerary Section */}
      <section id="itinerary" className="py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.itinerary ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-luxury-charcoal dark:text-white mb-4">
              Day-by-Day <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-teal to-blue-500">Itinerary</span>
            </h2>
            <p className="font-lora text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Experience every moment of your Sri Lankan adventure with our detailed daily schedule
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-luxury-teal to-luxury-coral rounded-full opacity-30"></div>
            
            {(packageData as any).detailedItinerary?.map((day: any, index: number) => (
              <div 
                key={day.day}
                className={`relative mb-16 transition-all duration-1000 ${
                  isVisible.itinerary ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-luxury-teal to-blue-500 rounded-full border-4 border-white dark:border-dark-background shadow-lg z-10 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{day.day}</span>
                </div>
                
                {/* Content */}
                <div className={`
                  max-w-md lg:max-w-lg
                  mx-auto pr-6 pl-6
                  lg:mx-0 ${index % 2 === 0 
                    ? 'lg:mr-auto lg:pr-12 lg:pl-0' 
                    : 'lg:ml-auto lg:pl-12 lg:pr-0'
                  }
                `}>
                  <div className="bg-white dark:bg-dark-surface/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group">
                    {/* Day Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white group-hover:text-luxury-teal transition-colors duration-300">
                        Day {day.day}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {day.meals?.map((meal: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-luxury-gold/20 text-luxury-gold text-xs rounded-full">
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">{day.title}</h4>
                    <p className="font-lora text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">{day.description}</p>
                    
                    {/* Activities */}
                    <div className="space-y-2">
                      {day.activities?.map((activity: string, i: number) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-luxury-teal rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Accommodation */}
                    {day.accommodation && day.accommodation !== 'Departure' && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>Overnight in {day.accommodation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions Section */}
      <section id="inclusions" className="py-20 bg-light-surface dark:bg-dark-surface/30 relative">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.inclusions ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-luxury-charcoal dark:text-white mb-4">
              What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">Included</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">Excluded</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inclusions */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible.inclusions ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-8'}`}>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-playfair font-bold text-2xl text-gray-800 dark:text-white">Package Inclusions</h3>
                </div>
                
                <div className="space-y-4">
                  {packageData.inclusions?.map((inclusion, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Exclusions */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible.inclusions ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-8'}`}>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-playfair font-bold text-2xl text-gray-800 dark:text-white">Package Exclusions</h3>
                </div>
                
                <div className="space-y-4">
                  {packageData.exclusions?.map((exclusion, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <XCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{exclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-teal via-blue-600 to-luxury-coral relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-playfair font-bold text-3xl md:text-5xl text-white mb-6">
            Ready for Your Sri Lankan Adventure?
          </h2>
          <p className="font-lora text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Don't miss out on this incredible journey. Book now and create memories that will last a lifetime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-4 bg-white hover:bg-gray-100 text-luxury-charcoal font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <Calendar className="w-5 h-5 mr-2" />
              Book Now - ${packageData.price}
            </Button>
            <Button variant="outline" className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-bold text-lg rounded-full backdrop-blur-sm transition-all duration-300">
              <Car className="w-5 h-5 mr-2" />
              Customize Package
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default SriLankaPackageDetail;
