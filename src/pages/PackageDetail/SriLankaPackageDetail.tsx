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
          
          <div className="relative lg:max-w-3xl lg:mx-auto">
            {/* Timeline Line */}
            <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 lg:left-16 lg:transform-none w-1 h-full bg-gradient-to-b from-luxury-teal to-luxury-coral rounded-full opacity-30"></div>
            
            {(packageData as any).detailedItinerary?.map((day: any, index: number) => (
              <div 
                key={day.day}
                className={`relative mb-16 transition-all duration-1000 ${
                  isVisible.itinerary ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute hidden md:flex left-1/2 transform -translate-x-1/2 lg:left-20 lg:transform-none lg:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-luxury-teal to-blue-500 rounded-full border-4 border-white dark:border-dark-background shadow-lg z-10 items-center justify-center">
                  <span className="text-white font-bold text-sm">{day.day}</span>
                </div>
                
                {/* Content */}
                <div className={`
                  max-w-md lg:max-w-lg
                  mx-auto pr-6 pl-6
                  lg:ml-24 lg:mr-0 lg:pl-4 lg:pr-0
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
      <section className="py-20 bg-white dark:bg-dark-surface relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-luxury-charcoal dark:text-white mb-4">
              The Rates Quoted Are Based on the Following 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500"> Terms & Conditions</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* All Rates Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">All Rates are</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• In United States Dollars, Per Person, in sharing double/twin room</li>
                <li>• Valid for travel from 1st May 2025 – 31st October 2025</li>
              </ul>
            </div>

            {/* Transfers & Tours Include */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">All Transfers & Tours Include</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Daily bottle of mineral water</li>
                <li>• Private Transfers between Airport –Hotel – Sightseeing – Hotel</li>
                <li>• English speaking licensed driver / guide, throughout the tour</li>
                <li>• Hotel accommodation on twin sharing room with meals including Breakfast (Unless booked otherwise)</li>
              </ul>
            </div>

            {/* Transfers & Tours Exclude */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">All Transfers & Tours Exclude</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Beverages, Portages & Tips</li>
                <li>• Entrance fees at places of interest (such as parks, museums etc.)</li>
              </ul>
            </div>

            {/* Children Policy */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">Children Policy</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Infants 0 – 2 years : Free of charge (Baby cot on request)</li>
                <li>• Child 2 – 11 years : 50% of adult rate sharing room with parents including extra bed</li>
                <li>• Child 2 – 11 years : 25% of adult rate sharing room with parents excluding extra bed</li>
              </ul>
            </div>

            {/* General Terms */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">General</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Rates are based on private touring.</li>
                <li>• If a place of visit is closed to visitors, on a particular time/date, every effort will be made to replace with an alternative.</li>
                <li>• During major events, accommodation may not be in the mentioned city.</li>
                <li>• Sequence of itinerary is subject to change without prior notice, in the best interest.</li>
                <li>• Hotel classifications are based on local standards</li>
                <li>• Amendments / cancellations etc., are subject to terms and conditions.</li>
                <li>• Information is as per time of print and subject to change without notice.</li>
              </ul>
            </div>

            {/* Please Note */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-teal-200 dark:border-teal-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">Please Note</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• The rates quoted are based on the listed proposed hotels.</li>
                <li>• The above rates are net and include government taxes (VAT, TDL & NBT).</li>
                <li>• These rates are subject to change without prior notice in the event government changes the tax policy, or if the hotels change their rates, or for situations beyond our control.</li>
                <li>• These rates are applicable for tour operators/travel agents working exclusively with us.</li>
                <li>• All hotel classifications are as per local hotel classifications.</li>
                <li>• Meal plan on tour will be on booked basis.</li>
                <li>• Breakfast will start from the 2nd day.</li>
                <li>• Half Board will be from arrival day dinner to departure day breakfast.</li>
                <li>• Full Board will be from arrival day lunch to departure day breakfast.</li>
                <li>• Transportation by air-conditioned vehicle from Airport to Airport, as per the itinerary.</li>
                <li>• In an unlikely event of a customer need a betterment, it should be brought to our notice immediately for rectification. No post tour complaints will be considered.</li>
                <li>• Optional excursions and additional services could be provided for which charges will be collected locally.</li>
                <li>• Visits to wild life parks, adventure activities, swimming etc, will be at client's own risk.</li>
                <li>• Safari vehicles (none air-conditioned) available are basic with basic insurance cover</li>
                <li>• Payment by credit cards will be subject to 3.5% bank charges.</li>
                <li>• Tours could be re-routed with/ or without adequate notice, in the best interest of the customer.</li>
                <li>• Certain places of interest could be closed during lunch hours, public holidays etc., and the DMC will not be responsible for those.</li>
              </ul>
            </div>

            {/* Cancellation Charges */}
            <div className="bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">Cancellation charges (Sri Lanka)</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Within 07 - 00 days - 100% cancellation charge.</li>
                <li>• Within 14 - 08 days - 75% cancellation charge.</li>
                <li>• Within 21-15 days - 50% cancellation charge.</li>
                <li>• If any advance payments are made to any hotels or other suppliers to reserve services, those will be added to the cancellation charges.</li>
              </ul>
            </div>

            {/* Hotel Confirmations */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">Hotel Confirmations</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Hotels reservations will be made when confirming, however due to prevailing demand situation, final confirmation of hotel/s, will be subject to availability at the time of receiving the timely confirmation.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                In the event of an untimely payment, leading to the hotel reservation being cancelled, by the hotel, we will make every effort to re-book the hotel/s and confirmation will be subject to then availability. Alternatively we will arrange suitable other accommodation. However no refunds or compensation will be considered in such events. This will also apply for last minute reservations.
              </p>
            </div>

            {/* Hotel Rules & Regulations */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">Hotel Rules & Regulations</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• The official check-in time at all hotels will be 14.00 hrs.</li>
                <li>• The official check-out time at all hotels will be 12.00 hrs.</li>
                <li>• For early arrival we recommend that the hotel to be reserved from previous day.</li>
                <li>• Cancellation policy will be applicable for any reduction of allocated / blocked rooms, after the release period.</li>
              </ul>
            </div>

            {/* Visa */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">Visa</h3>
              <p className="text-gray-700 dark:text-gray-300">
                A tourist visa needs to be obtained for nationals other than Singapore & Maldives and could be obtained online. For further details, visit 
                <a href="http://www.eta.gov.lk/" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline ml-1">
                  http://www.eta.gov.lk/
                </a>
              </p>
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
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>increase li
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
