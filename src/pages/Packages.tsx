import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import PackageCard from '@/components/PackageCard';
import PackageFilter from '@/components/PackageFilter';
import { usePackages } from '@/hooks/usePackages';
import { getAssetPath } from '@/lib/utils';

const Packages = () => {
  const {
    filteredPackages,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm
  } = usePackages();

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("/assets/images/Sri_Lankan_05.jpg")} 
            alt="Luxury Travel Packages" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-background dark:to-dark-background"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Exclusive Travel <span className="text-luxury-gold">Packages</span>
            </h1>
            <p className="font-lora text-base sm:text-lg md:text-xl text-white/90 max-w-2xl">
              Discover our curated collection of luxury experiences in Sri Lanka and the Maldives, designed to create unforgettable memories.
            </p>
          </div>
        </div>
      </section>
      
      {/* Packages Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Filter */}
          <PackageFilter 
            filter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          {/* Results info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-2 sm:mb-0">
              {filter === 'all' ? 'All Packages' : filter === 'sriLanka' ? 'Sri Lanka Packages' : 'Maldives Packages'}
            </h2>
            <p className="font-lora text-gray-600 dark:text-gray-300">
              Showing {filteredPackages.length} packages
            </p>
          </div>
          
          {/* No results */}
          {filteredPackages.length === 0 && (
            <div className="bg-white dark:bg-dark-surface rounded-xl p-10 text-center shadow-md">
              <svg 
                className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-2">
                No packages found
              </h3>
              <p className="font-lora text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
                className="font-medium text-luxury-teal hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* Package Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map(pkg => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-light-surface dark:bg-dark-surface/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-dark-background rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-3">
                  Looking for something custom?
                </h3>
                <p className="font-lora text-gray-700 dark:text-gray-300 max-w-lg">
                  Our travel experts can design a bespoke itinerary tailored to your preferences and interests.
                </p>
              </div>
              <button className="gold-button bg-luxury-gold text-black flex-shrink-0">
                Request Custom Package
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Packages; 