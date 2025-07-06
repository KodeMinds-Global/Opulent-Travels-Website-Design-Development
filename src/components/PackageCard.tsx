import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from '@/types/package';
import { Button } from '@/components/ui/button';

interface PackageCardProps {
  package: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPackageUrl = () => {
    if (pkg.type === 'sriLanka') {
      return `/sri-lanka/package/${pkg.id}`;
    } else {
      return `/maldives/package/${pkg.id}`;
    }
  };

  return (
    <div 
      className="relative rounded-2xl overflow-hidden h-[450px] transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Type Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          pkg.type === 'sriLanka' 
            ? 'bg-luxury-teal/80 text-black' 
            : 'bg-luxury-gold/80 text-black'
        }`}>
          {pkg.type === 'sriLanka' ? 'Sri Lanka' : 'Maldives'}
        </span>
      </div>

      {/* Featured Badge */}
      {pkg.featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-luxury-coral/80 text-white rounded-full text-xs font-bold">
            Featured
          </span>
        </div>
      )}
      
      {/* Image Container */}
      <div className="relative w-full h-1/2 overflow-hidden">
        <img 
          src={pkg.imageUrl} 
          alt={pkg.title} 
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110 filter brightness-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative h-1/2 bg-white dark:bg-dark-surface px-6 py-5 flex flex-col">
        <h3 className="font-playfair font-bold text-xl mb-2 text-luxury-charcoal dark:text-white">
          {pkg.title}
        </h3>
        
        <div className="flex items-center mb-3 gap-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-luxury-gold mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-300">{pkg.duration}</span>
          </div>
          
          {pkg.type === 'maldives' && (
            <div className="flex items-center">
              <svg className="w-4 h-4 text-luxury-gold mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {pkg.resortRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        
        <p className="font-lora text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-2">
          {pkg.shortDescription}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="font-playfair font-bold text-lg text-luxury-gold">
            ${pkg.price}
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400"> / person</span>
          </div>
          
          <Link to={getPackageUrl()}>
            <Button 
              variant="outline" 
              className="border-luxury-teal text-luxury-teal hover:bg-luxury-teal/10 hover:text-luxury-teal"
            >
              See More
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Hover Overlay with Quick Info */}
      <div 
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center p-6 transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <h3 className="font-playfair font-bold text-2xl text-white mb-4">{pkg.title}</h3>
        <ul className="text-white space-y-2 mb-6">
          {pkg.highlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-luxury-gold mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{highlight}</span>
            </li>
          ))}
        </ul>
        <Link to={getPackageUrl()} className="w-full">
          <Button className="w-full gold-button bg-luxury-gold text-black">
            Explore Package
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PackageCard; 