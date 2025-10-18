import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePackages } from '../hooks/useApi';

const Packages = () => {
  const [activeFilter, setActiveFilter] = useState('maldives');
  const [isVisible, setIsVisible] = useState(false);

  // Use API hook to fetch packages
  const { data: packages, loading, error, refetch } = usePackages({
    type: activeFilter === 'maldives' ? 'maldives' : 'sriLanka',
    limit: 6
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('packages');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const filters = [
    { id: 'maldives', label: 'Maldives' },
    { id: 'srilanka', label: 'Sri Lanka' }
  ];

  // Handle loading state
  if (loading) {
    return (
      <section id="packages" className="py-16 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading packages...</span>
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section id="packages" className="py-16 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">Error loading packages: {error}</p>
            <Button onClick={refetch} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-16 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
      {/* Dark mode background overlay */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className={`font-playfair font-bold text-3xl lg:text-4xl text-luxury-charcoal dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Our <span className="text-gradient dark:text-dark-gradient">Tour Packages</span>
          </h2>
          <p className={`font-lora text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Carefully crafted experiences tailored to your desires
          </p>

          {/* Filter Bar */}
          <div className={`flex flex-wrap justify-center gap-3 transition-all duration-1000 delay-500 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full font-montserrat text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-luxury-gold to-yellow-400 dark:from-dark-accent dark:to-dark-primary text-luxury-charcoal dark:text-white shadow-md'
                    : 'bg-gray-100 dark:bg-dark-surface/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-surface'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages?.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`luxury-card hover-lift group transition-all duration-1000 backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto ${
                isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                animationDelay: `${600 + index * 200}ms`,
                width: '95%'
              }}
            >
              {/* Package Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={pkg.image_url}
                  alt={pkg.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {pkg.featured && (
                    <span className="bg-gradient-to-r from-luxury-coral to-pink-400 dark:from-dark-accent dark:to-dark-primary text-white px-2 py-0.5 rounded-full text-xs font-poppins font-medium">
                      Featured
                    </span>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                  <div className="font-bold text-luxury-gold dark:text-dark-accent">${pkg.price}</div>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-4">
                <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-1.5">
                  {pkg.title}
                </h3>
                
                <p className="font-montserrat text-luxury-teal dark:text-dark-accent text-sm font-medium mb-3">
                  {pkg.duration}
                </p>

                <p className="font-lora text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {pkg.short_description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-4">
                  {pkg.highlights.slice(0, 3).map((highlight, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-luxury-gold dark:bg-dark-accent rounded-full"></div>
                      <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full teal-button dark:dark-button group-hover:scale-105 transition-transform duration-300 text-sm py-1.5">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-teal-400 dark:hover:from-blue-600 dark:hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1 font-medium">
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
