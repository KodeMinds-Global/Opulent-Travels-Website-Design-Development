import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import TermsAndConditions from '@/components/TermsAndConditions';
import CustomCTA from '@/components/CustomCTA';
import { Button } from '@/components/ui/button';
import { usePackages } from '@/hooks/usePackages';
import { sriLankaTermsAndConditions } from '@/data/termsAndConditions';
import { Clock, MapPin, Users, Star, Calendar, DollarSign, CheckCircle, XCircle, Hotel, Car, Plane, Camera, Heart, Shield, ChevronDown, ChevronUp, X } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

const SriLankaPackageDetail = () => {
  const { packageId } = useParams();
  const { getPackageById } = usePackages();
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    itinerary: false,
    inclusions: false,
    pricing: false,
    hotels: false,
    terms: false
  });
  
  const packageData = getPackageById(packageId || '');

  // Open day modal
  const openDayModal = (day: any) => {
    setSelectedDay(day);
  };

  // Close day modal
  const closeDayModal = () => {
    setSelectedDay(null);
  };

  // Open image modal
  const openImageModal = () => {
    setShowImageModal(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setShowImageModal(false);
  };

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
            <p className="font-lora text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Experience every moment of your Sri Lankan adventure with our detailed daily schedule
            </p>
          </div>
          
          {/* Map-Centered Layout with Left/Right Day Cards */}
          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              
              {/* Left Side Day Cards - Days 1,2,3,4... */}
              <div className="flex-1 space-y-4 order-2 lg:order-1 w-full lg:w-auto">
                {(packageData as any).detailedItinerary?.slice(0, Math.ceil((packageData as any).detailedItinerary.length / 2)).map((day: any, index: number) => (
                  <div 
                    key={`left-${day.day}`}
                    className={`transition-all duration-1000 ${
                      isVisible.itinerary ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div 
                      className="bg-white dark:bg-dark-surface/90 rounded-2xl shadow-xl border-2 border-transparent hover:border-luxury-teal/50 hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-500 cursor-pointer p-6"
                      onClick={() => openDayModal(day)}
                    >
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-luxury-teal to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">{day.day}</span>
                        </div>
                        <div className="text-center">
                          <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white">
                            Day {day.day}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Central Sri Lanka Map */}
              <div className="flex-shrink-0 order-1 lg:order-2">
                <div className="relative group cursor-pointer" onClick={openImageModal}>
                  <img 
                    src={getAssetPath('/assets/images/lk.png')} 
                    alt="Sri Lanka Map" 
                    className="w-96 h-96 md:w-[32rem] md:h-[32rem] lg:w-[40rem] lg:h-[40rem] xl:w-[44rem] xl:h-[44rem] 2xl:w-[48rem] 2xl:h-[48rem] object-contain filter drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-luxury-teal/20 via-transparent to-luxury-coral/20 rounded-full blur-xl opacity-50"></div>
                  
                  {/* Click indicator overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-full flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-800">
                      Click to enlarge
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Day Cards - Days 5,6,7,8... */}
              <div className="flex-1 space-y-4 order-3 w-full lg:w-auto">
                {(packageData as any).detailedItinerary?.slice(Math.ceil((packageData as any).detailedItinerary.length / 2)).map((day: any, index: number) => (
                  <div 
                    key={`right-${day.day}`}
                    className={`transition-all duration-1000 ${
                      isVisible.itinerary ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${(index + Math.ceil((packageData as any).detailedItinerary.length / 2)) * 150}ms` }}
                  >
                    <div 
                      className="bg-white dark:bg-dark-surface/90 rounded-2xl shadow-xl border-2 border-transparent hover:border-luxury-teal/50 hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-500 cursor-pointer p-6"
                      onClick={() => openDayModal(day)}
                    >
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-luxury-coral to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">{day.day}</span>
                        </div>
                        <div className="text-center">
                          <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white">
                            Day {day.day}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Click Instruction */}
            <div className="text-center mt-12">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Click on any day card to view detailed itinerary information
              </p>
            </div>
          </div>
        </div>

        {/* Day Detail Modal */}
        {selectedDay && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="relative bg-gradient-to-r from-luxury-teal to-blue-500 text-white p-6">
                <button
                  onClick={closeDayModal}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{selectedDay.day}</span>
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-2xl mb-2">Day {selectedDay.day}</h3>
                    <h4 className="font-bold text-lg opacity-90">{selectedDay.title}</h4>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Description */}
                <div className="mb-6">
                  <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Description</h5>
                  <p className="font-lora text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedDay.description}
                  </p>
                </div>
                
                {/* Meals */}
                {selectedDay.meals && selectedDay.meals.length > 0 && (
                  <div className="mb-6">
                    <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Meals Included</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedDay.meals.map((meal: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-luxury-gold/20 text-luxury-gold rounded-full text-sm font-medium">
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Activities */}
                {selectedDay.activities && selectedDay.activities.length > 0 && (
                  <div className="mb-6">
                    <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Activities & Highlights</h5>
                    <div className="space-y-3">
                      {selectedDay.activities.map((activity: string, i: number) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-luxury-teal rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-400 leading-relaxed">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Accommodation */}
                {selectedDay.accommodation && selectedDay.accommodation !== 'Departure' && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-luxury-coral" />
                      <div>
                        <span className="font-semibold text-gray-800 dark:text-white">Overnight Accommodation</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedDay.accommodation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeImageModal}>
            <div className="relative max-w-7xl max-h-[95vh] w-full h-full flex items-center justify-center">
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              <img 
                src={getAssetPath('/assets/images/lk.png')} 
                alt="Sri Lanka Map - Full Size" 
                className="max-w-full max-h-full object-contain filter drop-shadow-2xl rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                Click outside to close
              </div>
            </div>
          </div>
        )}
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

      {/* Pricing Table Section */}
      <section className="py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-luxury-charcoal dark:text-white mb-4">
              Package <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-teal to-blue-500">Pricing</span>
            </h2>
            <div className="bg-luxury-gold/10 dark:bg-luxury-gold/20 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-xl text-luxury-charcoal dark:text-white mb-2">
                LAND PACKAGE PRICE: (VALID FROM {(packageData as any).pricingTable?.validFrom || '01 MAY'} – {(packageData as any).pricingTable?.validTo || '31 OCT 2025'})
              </h3>
              <p className="text-gray-700 dark:text-gray-300">Tariff – in {(packageData as any).pricingTable?.currency || 'US'}$, per Person, net</p>
            </div>
          </div>

          <div className="overflow-x-auto mb-8">
            <div className="min-w-[800px] bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-luxury-teal to-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left font-bold">Category</th>
                    <th className="px-4 py-4 text-center font-bold">2 Pax</th>
                    <th className="px-4 py-4 text-center font-bold">4 Pax</th>
                    <th className="px-4 py-4 text-center font-bold">6 Pax</th>
                    <th className="px-4 py-4 text-center font-bold">8 Pax</th>
                    <th className="px-4 py-4 text-center font-bold">Extra Adult<br/>(Triple Sharing)</th>
                    <th className="px-4 py-4 text-center font-bold">Child with Bed<br/>(2-11yrs.)</th>
                    <th className="px-4 py-4 text-center font-bold">Child without Bed<br/>(2-11yrs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {(packageData as any).pricingTable?.categories?.map((category: any, index: number) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors last:border-0">
                      <td className="px-4 py-4 font-semibold text-gray-800 dark:text-white">{category.name}</td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">{category.prices['2Pax']}</td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">{category.prices['4Pax']}</td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">{category.prices['6Pax']}</td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">{category.prices['8Pax']}</td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">{category.prices['ExtraAdult']}</td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">{category.prices['ChildWithBed']}</td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">{category.prices['ChildWithoutBed']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Supplements Section */}
          {(packageData as any).supplements && (packageData as any).supplements.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-6 border-l-4 border-yellow-400">
              <div className="flex items-start">
                <div className="bg-yellow-400 text-black px-3 py-1 rounded-md font-bold text-sm mr-4 flex-shrink-0">
                  Supplements:
                </div>
                <div className="space-y-2">
                  {(packageData as any).supplements.map((supplement: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {supplement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Peak Supplement Section */}
          {(packageData as any).seasonalSupplements?.peakSeason && (
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-l-4 border-blue-400">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-400 text-white px-3 py-1 rounded-md font-bold text-sm mr-4 flex-shrink-0">
                    Peak Supplement
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {(packageData as any).seasonalSupplements.peakSeason.period} (Applicable for all the hotels)
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                  {Object.entries((packageData as any).seasonalSupplements.peakSeason.rates).map(([category, rate]: [string, any], index: number) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                      <div className="text-sm font-semibold text-gray-800 dark:text-white">
                        {category.replace('Star', '* Hotel')}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 font-bold">
                        US$ {rate}Nett per room per day
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hotel List Section */}
      {(packageData as any).hotelList && (
        <section className="py-20 bg-light-surface dark:bg-dark-surface/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair font-bold text-3xl md:text-5xl text-luxury-charcoal dark:text-white mb-4">
                Hotel <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">List</span>
              </h2>
              <p className="font-lora text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Carefully selected accommodations for your comfort and convenience
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px] bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <tr>
                      <th className="px-4 py-4 text-left font-bold">Place</th>
                      <th className="px-4 py-4 text-center font-bold">3* Hotels</th>
                      <th className="px-4 py-4 text-center font-bold">3.5* Hotels</th>
                      <th className="px-4 py-4 text-center font-bold">4* Hotels</th>
                      <th className="px-4 py-4 text-center font-bold">5* Hotels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const hotelList = (packageData as any).hotelList;
                      const locations = Object.keys(hotelList['3Star'] || {});
                      
                      return locations.map((location: string, index: number) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors last:border-0">
                          <td className="px-4 py-4 font-semibold text-gray-800 dark:text-white">
                            {location === 'Beach' ? 'Wadduwa/Hikkaduwa' : location}
                          </td>
                          <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                            {hotelList['3Star']?.[location] || '-'}
                          </td>
                          <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                            {hotelList['3.5Star']?.[location] || '-'}
                          </td>
                          <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                            {hotelList['4Star']?.[location] || '-'}
                          </td>
                          <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                            {hotelList['5Star']?.[location] || '-'}
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Terms & Conditions Section */}
      <TermsAndConditions termsData={sriLankaTermsAndConditions} />

      {/* Custom CTA Section */}
      <CustomCTA />
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default SriLankaPackageDetail;
