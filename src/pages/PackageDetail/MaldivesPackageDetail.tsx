import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { usePackages } from '@/hooks/usePackages';
import { MaldivesPackage } from '@/types/package';
import { Button } from '@/components/ui/button';

const MaldivesPackageDetail = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const { getPackageById } = usePackages();
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'map'>('overview');
  const [packageData, setPackageData] = useState<MaldivesPackage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    if (packageId) {
      const foundPackage = getPackageById(packageId);
      if (foundPackage && foundPackage.type === 'maldives') {
        setPackageData(foundPackage as MaldivesPackage);
      } else {
        // Package not found or not a Maldives package
        navigate('/packages', { replace: true });
      }
    }
  }, [packageId, getPackageById, navigate]);
  
  if (!packageData) {
    return (
      <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-lora text-gray-700 dark:text-gray-300">Loading package information...</p>
        </div>
      </div>
    );
  }
  
  // Mock images for gallery (in a real app, these would come from the API)
  const packageImages = [
    packageData.imageUrl,
    // In a real implementation, you would have multiple images per package
    ...packageData.itinerary.map(() => packageData.imageUrl)
  ];
  
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={packageData.imageUrl} 
            alt={packageData.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-background dark:to-dark-background"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <span className="bg-luxury-teal/80 text-black px-3 py-1 rounded-full text-sm font-bold">
                Maldives
              </span>
              <span className="w-2 h-2 bg-white rounded-full mx-3"></span>
              <span className="text-white/90 text-sm">{packageData.duration}</span>
            </div>
            
            <h1 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {packageData.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center bg-white/20 dark:bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg className="w-4 h-4 text-luxury-gold mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                </svg>
                <span className="text-white text-sm">From ${packageData.price} per person</span>
              </div>
              
              <div className="flex items-center bg-white/20 dark:bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg className="w-4 h-4 text-luxury-gold mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-white text-sm">
                  {packageData.resortName}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button className="gold-button bg-luxury-gold text-black">
                Book Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Download Itinerary
              </Button>
            </div>
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
              Resort & Activities
            </button>
          </div>
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
                      Water Activities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {packageData.waterActivities?.map((activity, index) => (
                        <span key={index} className="bg-light-surface dark:bg-dark-primary/20 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                          {activity}
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
                      Resort Details
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
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Resort Name</p>
                        <p className="font-medium text-gray-900 dark:text-white">{packageData.resortName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Resort Rating</p>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(packageData.resortRating) ? 'text-luxury-gold' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          {packageData.resortRating % 1 !== 0 && (
                            <span className="text-sm ml-1 text-gray-600 dark:text-gray-400">({packageData.resortRating})</span>
                          )}
                        </div>
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
          
          {/* Resort & Activities Tab */}
          {activeTab === 'map' && (
            <div className="animate-fade-in">
              <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-8">
                Resort & Activities
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
                        Interactive map would be displayed here with resort location and nearby attractions
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
                      About {packageData.resortName}
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex mb-2">
                        {Array(5).fill(0).map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(packageData.resortRating) ? 'text-luxury-gold' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm ml-2 text-gray-600 dark:text-gray-400">{packageData.resortRating}-star luxury</span>
                      </div>
                      
                      <p className="font-lora text-gray-700 dark:text-gray-300 text-sm mb-4">
                        {packageData.resortName} offers an exceptional blend of luxury and natural beauty, with modern amenities and Maldivian hospitality.
                      </p>
                    </div>
                    
                    <h4 className="font-montserrat font-medium text-luxury-charcoal dark:text-white mb-3">
                      Water Activities:
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {packageData.waterActivities?.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-luxury-teal mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                          <span className="font-lora text-gray-700 dark:text-gray-300">{activity}</span>
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
      
      {/* Related Packages Section - In a real app, show other Maldives packages */}
      <section className="py-12 bg-light-surface dark:bg-dark-surface/50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-8 text-center">
            You May Also Like
          </h2>
          
          {/* Placeholder for related packages - would be populated with actual data */}
          <div className="bg-white dark:bg-dark-background rounded-xl p-8 text-center shadow-md">
            <p className="font-lora text-gray-700 dark:text-gray-300">
              Related packages would be displayed here. In a complete implementation, this section would show other Maldives packages that might interest the visitor.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default MaldivesPackageDetail; 