import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Packages = () => {
  const [activeFilter, setActiveFilter] = useState('maldives');
  const [isVisible, setIsVisible] = useState(false);

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

  const packages = [
    {
      id: 1,
      title: "Maldives Paradise",
      category: "maldives",
      duration: "7 Days / 6 Nights",
      price: "$3,999",
      originalPrice: "$4,999",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=3945&auto=format&fit=crop",
      features: ["Overwater Villa", "All Meals Included", "Spa Treatment", "Sunset Cruise"],
      popular: true
    },
    {
      id: 2,
      title: "Sri Lanka Cultural Journey",
      category: "srilanka",
      duration: "10 Days / 9 Nights",
      price: "$2,299",
      originalPrice: "$2,799",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=3648&auto=format&fit=crop",
      features: ["Cultural Sites", "Tea Plantation Tours", "Wildlife Safari", "Local Cuisine"]
    },
    {
      id: 3,
      title: "Luxury Maldives Escape",
      category: "maldives",
      duration: "8 Days / 7 Nights",
      price: "$4,299",
      originalPrice: "$5,499",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=4752&auto=format&fit=crop",
      features: ["Private Infinity Pool", "Dolphin Watching", "Gourmet Dining", "Water Sports"],
      premium: true
    },
    {
      id: 4,
      title: "Luxury Maldives Escape",
      category: "maldives",
      duration: "8 Days / 7 Nights",
      price: "$4,299",
      originalPrice: "$5,499",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=4752&auto=format&fit=crop",
      features: ["Private Infinity Pool", "Dolphin Watching", "Gourmet Dining", "Water Sports"],
      premium: true
    },
    {
      id: 5,
      title: "Sri Lanka Cultural Journey",
      category: "srilanka",
      duration: "10 Days / 9 Nights",
      price: "$2,299",
      originalPrice: "$2,799",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=3648&auto=format&fit=crop",
      features: ["Cultural Sites", "Tea Plantation Tours", "Wildlife Safari", "Local Cuisine"]
    },
    {
      id: 6,
      title: "Sri Lanka Cultural Journey",
      category: "srilanka",
      duration: "10 Days / 9 Nights",
      price: "$2,299",
      originalPrice: "$2,799",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=3648&auto=format&fit=crop",
      features: ["Cultural Sites", "Tea Plantation Tours", "Wildlife Safari", "Local Cuisine"]
    },
  ];

  const filteredPackages = packages.filter(pkg => pkg.category === activeFilter);

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
          {filteredPackages.map((pkg, index) => (
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
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {pkg.popular && (
                    <span className="bg-gradient-to-r from-luxury-coral to-pink-400 dark:from-dark-accent dark:to-dark-primary text-white px-2 py-0.5 rounded-full text-xs font-poppins font-medium">
                      Popular
                    </span>
                  )}
                  {pkg.premium && (
                    <span className="bg-gradient-to-r from-luxury-gold to-yellow-400 dark:from-dark-accent/80 dark:to-dark-secondary text-luxury-charcoal dark:text-white px-2 py-0.5 rounded-full text-xs font-poppins font-medium">
                      Premium
                    </span>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                  <div className="text-xs line-through opacity-70">{pkg.originalPrice}</div>
                  <div className="font-bold text-luxury-gold dark:text-dark-accent">{pkg.price}</div>
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

                {/* Features */}
                <div className="space-y-1.5 mb-4">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-luxury-gold dark:bg-dark-accent rounded-full"></div>
                      <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
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
