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
    const pricingObserver = createObserver('pricing', 'pricing');
    const hotelsObserver = createObserver('hotels', 'hotels');
    const termsObserver = createObserver('terms', 'terms');

    const sections = [
      { id: 'itinerary', observer: itineraryObserver },
      { id: 'inclusions', observer: inclusionsObserver },
      { id: 'pricing', observer: pricingObserver },
      { id: 'hotels', observer: hotelsObserver },
      { id: 'terms', observer: termsObserver }
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
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
          style={{ backgroundImage: `url(${packageData.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-luxury-gold rounded-full animate-float opacity-70"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-luxury-teal rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-luxury-coral rounded-full animate-float opacity-80" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <div className={`max-w-4xl transition-all duration-1500 ${isVisible.hero ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-12'}`}>
            {/* Package Badge */}
            <div className="inline-flex items-center bg-luxury-gold/90 backdrop-blur-sm text-black px-6 py-2 rounded-full font-medium mb-6 transform hover:scale-105 transition-transform duration-300">
              <Star className="w-4 h-4 mr-2" />
              Premium Sri Lanka Experience
            </div>
            
            {/* Package Title */}
            <h1 className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              {packageData.title}
            </h1>
            
            {/* Package Info Cards */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 flex items-center text-white">
                <Clock className="w-5 h-5 mr-2 text-luxury-gold" />
                <span className="font-medium">{packageData.duration}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 flex items-center text-white">
                <MapPin className="w-5 h-5 mr-2 text-luxury-teal" />
                <span className="font-medium">{packageData.locations.length} Destinations</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 flex items-center text-white">
                <DollarSign className="w-5 h-5 mr-2 text-luxury-coral" />
                <span className="font-medium">From ${packageData.price}</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="font-lora text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {packageData.longDescription}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 bg-luxury-gold hover:bg-luxury-gold/90 text-black font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Book Now - ${packageData.price}
              </Button>
              <Button variant="outline" className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg rounded-full backdrop-blur-sm transition-all duration-300">
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* Navigation Tabs */}
      <section className="sticky top-16 z-30 bg-white dark:bg-dark-surface shadow-md">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto no-scrollbar">
            <button
              className={`py-4 px-6 font-playfair font-medium text-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'overview' ? 'border-luxury-teal text-luxury-teal dark:text-luxury-teal' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-luxury-charcoal dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            
            <button
              className={`py-4 px-6 font-playfair font-medium text-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'itinerary' ? 'border-luxury-teal text-luxury-teal dark:text-luxury-teal' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-luxury-charcoal dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('itinerary')}
            >
              Itinerary
            </button>
            
            <button
              className={`py-4 px-6 font-playfair font-medium text-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'inclusions' ? 'border-luxury-teal text-luxury-teal dark:text-luxury-teal' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-luxury-charcoal dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('inclusions')}
            >
              Inclusions & Exclusions
            </button>
            
            <button
              className={`py-4 px-6 font-playfair font-medium text-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'map' ? 'border-luxury-teal text-luxury-teal dark:text-luxury-teal' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-luxury-charcoal dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('map')}
            >
              Map & Locations
            </button>
          </div>
        </div>
      </section>

      {/* Day-by-Day Itinerary Section */}
      <section id="itinerary" className="py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
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
            
            {packageData.detailedItinerary?.map((day, index) => (
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
                <div className={`${index % 2 === 0 ? 'mr-auto pr-12 lg:pr-20' : 'ml-auto pl-12 lg:pl-20'} max-w-md lg:max-w-lg`}>
                  <div className="bg-white dark:bg-dark-surface/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group">
                    {/* Day Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white group-hover:text-luxury-teal transition-colors duration-300">
                        Day {day.day}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {day.meals?.map((meal, i) => (
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
                      {day.activities.map((activity, i) => (
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
        </div>
      </section>
      
      {/* Content Sections */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-6">
                    Package Overview
                  </h2>
                  <div className="font-lora text-gray-700 dark:text-gray-300 space-y-4 mb-6">
                    <p>{packageData.longDescription}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">
                      Highlights
                    </h3>
                    <ul className="space-y-3">
                      {packageData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-luxury-teal mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-lora text-gray-700 dark:text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">
                      Cultural Experiences
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {packageData.culturalExperiences?.map((experience, index) => (
                        <span key={index} className="bg-light-surface dark:bg-dark-primary/20 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                          {experience}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="relative rounded-2xl overflow-hidden h-80 mb-6">
                    <img 
                      src={packageImages[currentImageIndex]} 
                      alt={`${packageData.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation arrows */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <button
                        onClick={() => setCurrentImageIndex(prev => (prev === 0 ? packageImages.length - 1 : prev - 1))}
                        className="w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => setCurrentImageIndex(prev => (prev === packageImages.length - 1 ? 0 : prev + 1))}
                        className="w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Image counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded">
                      {currentImageIndex + 1} / {packageImages.length}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {packageImages.map((image, index) => (
                      <div 
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative rounded-lg overflow-hidden h-16 cursor-pointer ${
                          currentImageIndex === index ? 'ring-2 ring-luxury-teal' : ''
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {currentImageIndex === index && (
                          <div className="absolute inset-0 bg-luxury-teal/20"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white dark:bg-dark-surface rounded-xl p-6 mt-6 shadow-md">
                    <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">
                      Quick Facts
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                        <p className="font-medium text-gray-900 dark:text-white">{packageData.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Price</p>
                        <p className="font-medium text-gray-900 dark:text-white">${packageData.price} per person</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Destinations</p>
                        <p className="font-medium text-gray-900 dark:text-white">{packageData.locations.length} locations</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Group Size</p>
                        <p className="font-medium text-gray-900 dark:text-white">2-12 people</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Itinerary Tab */}
          {activeTab === 'itinerary' && (
            <div className="animate-fade-in">
              <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-8">
                Day-by-Day Itinerary
              </h2>
              
              <div className="space-y-8">
                {packageData.itinerary.map((day, index) => (
                  <div key={index} className="border-l-2 border-luxury-teal pl-6 ml-3 relative">
                    {/* Day indicator dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-luxury-teal"></div>
                    
                    <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-md">
                      <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white flex items-center mb-3">
                        <span className="bg-luxury-teal text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          {day.day}
                        </span>
                        {day.title}
                      </h3>
                      
                      <p className="font-lora text-gray-700 dark:text-gray-300 mb-6">
                        {day.description}
                      </p>
                      
                      <h4 className="font-montserrat font-medium text-luxury-charcoal dark:text-white mb-3">
                        Day's Activities:
                      </h4>
                      
                      <ul className="space-y-2">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-luxury-gold mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="font-lora text-gray-700 dark:text-gray-300">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Inclusions & Exclusions Tab */}
          {activeTab === 'inclusions' && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-luxury-charcoal dark:text-white mb-6 flex items-center">
                    <svg className="w-6 h-6 text-luxury-teal mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    What's Included
                  </h2>
                  
                  <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-md">
                    <ul className="space-y-4">
                      {packageData.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-luxury-teal mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-lora text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-luxury-charcoal dark:text-white mb-6 flex items-center">
                    <svg className="w-6 h-6 text-luxury-coral mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    What's Not Included
                  </h2>
                  
                  <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-md">
                    <ul className="space-y-4">
                      {packageData.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-luxury-coral mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="font-lora text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-light-surface dark:bg-dark-surface/50 rounded-xl p-6 mt-6 border border-luxury-teal/20">
                    <h3 className="font-playfair font-medium text-lg text-luxury-charcoal dark:text-white mb-3">
                      Additional Information
                    </h3>
                    <p className="font-lora text-gray-700 dark:text-gray-300 text-sm">
                      Please note that this package can be customized according to your preferences. Contact us for more information about add-ons, upgrades, or special requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Map & Locations Tab */}
          {activeTab === 'map' && (
            <div className="animate-fade-in">
              <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-8">
                Destinations & Map
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {/* Map Placeholder - In a real app, implement Google Maps or similar */}
                  <div className="bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-md h-[400px] flex items-center justify-center">
                    <div className="text-center p-6">
                      <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <p className="font-lora text-gray-500 dark:text-gray-400">
                        Interactive map would be displayed here with tour route and destinations
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                        Powered by Google Maps API
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-md">
                    <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">
                      Destinations
                    </h3>
                    
                    <ul className="space-y-4">
                      {packageData.locations.map((location, index) => (
                        <li key={index} className="flex items-start border-b border-gray-100 dark:border-gray-800 last:border-b-0 pb-3 last:pb-0">
                          <div className="w-8 h-8 rounded-full bg-light-surface dark:bg-dark-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-luxury-teal font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-montserrat font-medium text-luxury-charcoal dark:text-white">
                              {location}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {/* In a real app, include more details about each location */}
                              Explore this iconic destination in Sri Lanka
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full gold-button bg-luxury-gold text-black">
                      Book This Package
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Packages Section - In a real app, show other Sri Lanka packages */}
      <section className="py-12 bg-light-surface dark:bg-dark-surface/50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-8 text-center">
            You May Also Like
          </h2>
          
          {/* Placeholder for related packages - would be populated with actual data */}
          <div className="bg-white dark:bg-dark-background rounded-xl p-8 text-center shadow-md">
            <p className="font-lora text-gray-700 dark:text-gray-300">
              Related packages would be displayed here. In a complete implementation, this section would show other Sri Lanka packages that might interest the visitor.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default SriLankaPackageDetail; 