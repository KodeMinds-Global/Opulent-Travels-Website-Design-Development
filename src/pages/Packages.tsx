import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import PackageFilter from '@/components/PackageFilter';
import { usePackages } from '@/hooks/usePackages';
import { useAllMaldivesPackages } from '@/hooks/useAllMaldivesPackages';
import { resolvePackageImageUrl, type AllMaldivesPackage } from '@/services/packages.service';
import { getAssetPath } from '@/lib/utils';
import { useSearchParams, Link } from 'react-router-dom';
import { SriLankaPackage } from '@/types/package';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// --- Sri Lanka Package Card ---
interface SriLankaCardProps {
  pkg: SriLankaPackage;
}

const SriLankaCard: React.FC<SriLankaCardProps> = ({ pkg }) => {
  return (
    <div className="luxury-card hover-lift group transition-all duration-1000 backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto" style={{ width: '100%' }}>
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {pkg.featured && (
            <span className="bg-gradient-to-r from-luxury-gold to-yellow-400 dark:from-dark-accent/80 dark:to-dark-secondary text-luxury-charcoal dark:text-white px-2 py-0.5 rounded-full text-xs font-poppins font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
          <div className="font-bold text-luxury-gold dark:text-dark-accent">${pkg.price}</div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-1.5">
          {pkg.title}
        </h3>
        <p className="font-montserrat text-luxury-teal dark:text-dark-accent text-sm font-medium mb-3">
          {pkg.duration}
        </p>
        <div className="space-y-1.5 mb-4">
          {pkg.highlights.slice(0, 4).map((feature, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-luxury-gold dark:bg-dark-accent rounded-full"></div>
              <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <Link to={`/sri-lanka/package/${pkg.id}`}>
          <Button className="w-full teal-button dark:dark-button group-hover:scale-105 transition-transform duration-300 text-sm py-1.5">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

// --- Maldives Detail Modal ---
const MaldivesDetailModal: React.FC<{ pkg: AllMaldivesPackage; onClose: () => void }> = ({ pkg, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = (pkg.galleryImages ?? []).map(resolvePackageImageUrl).filter(Boolean);
  const displayImages = images.length > 0 ? images : [resolvePackageImageUrl(pkg.imageUrl)].filter(Boolean);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const features = (pkg.descriptionPoints?.length > 0 ? pkg.descriptionPoints : pkg.highlights ?? []).slice(0, 6);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Slideshow */}
        <div className="relative overflow-hidden rounded-t-2xl h-64">
          {displayImages.length > 0 ? (
            <img
              src={displayImages[currentSlide]}
              alt={`${pkg.title} - image ${currentSlide + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-lora">No images available</span>
            </div>
          )}

          {displayImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {displayImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
              <div className="absolute top-3 left-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
                {currentSlide + 1} / {displayImages.length}
              </div>
            </>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-5">
          <h2 className="font-playfair font-bold text-2xl text-luxury-charcoal dark:text-white mb-2">
            {pkg.resortName || pkg.title}
          </h2>

          {pkg.resortRating > 0 && (
            <div className="flex items-center gap-1.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(pkg.resortRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
              <span className="font-montserrat text-sm font-medium text-luxury-teal dark:text-dark-accent ml-1">
                {pkg.resortRating.toFixed(1)}
              </span>
            </div>
          )}

          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-luxury-gold dark:bg-dark-accent rounded-full flex-shrink-0" />
                <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- Maldives Package Card ---
const MaldivesCard: React.FC<{
  pkg: AllMaldivesPackage;
  onViewDetails: (pkg: AllMaldivesPackage) => void;
  index: number;
}> = ({ pkg, onViewDetails, index }) => {
  return (
    <div
      className="luxury-card hover-lift group transition-all duration-1000 backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto"
      style={{ animationDelay: `${index * 200}ms`, width: '100%' }}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={resolvePackageImageUrl(pkg.imageUrl)}
          alt={pkg.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {pkg.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-luxury-gold to-yellow-400 dark:from-dark-accent/80 dark:to-dark-secondary text-luxury-charcoal dark:text-white px-2 py-0.5 rounded-full text-xs font-poppins font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-1.5">
          {pkg.resortName || pkg.title}
        </h3>

        {pkg.resortRating > 0 && (
          <div className="flex items-center gap-1.5 mb-3 text-luxury-teal dark:text-dark-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(pkg.resortRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="font-montserrat text-sm font-medium">{pkg.resortRating.toFixed(1)}</span>
          </div>
        )}

        <div className="space-y-1.5 mb-4">
          {(pkg.descriptionPoints?.length > 0 ? pkg.descriptionPoints : pkg.highlights ?? []).slice(0, 4).map((feature, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-luxury-gold dark:bg-dark-accent rounded-full flex-shrink-0"></div>
              <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          className="w-full teal-button dark:dark-button group-hover:scale-105 transition-transform duration-300 text-sm py-1.5"
          onClick={() => onViewDetails(pkg)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

// --- Maldives Card Skeleton ---
const MaldivesCardSkeleton = () => (
  <div className="luxury-card backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto" style={{ width: '100%' }}>
    <Skeleton className="h-48 rounded-t-xl rounded-b-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
      <Skeleton className="h-3 w-3/6" />
      <Skeleton className="h-9 w-full mt-2" />
    </div>
  </div>
);

// --- Main Packages Page ---
const Packages = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const [selectedMaldivesPkg, setSelectedMaldivesPkg] = useState<AllMaldivesPackage | null>(null);

  const {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    sriLankaPackages,
  } = usePackages();

  const { data: maldivesPackages = [], isLoading: isMaldivesLoading } = useAllMaldivesPackages();

  useEffect(() => {
    if (typeParam === 'sriLanka' || typeParam === 'maldives') {
      setFilter(typeParam);
    }
  }, [typeParam, setFilter]);

  // Filter Sri Lanka packages by search term
  const sriLankaFiltered = (sriLankaPackages as SriLankaPackage[]).filter(pkg => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(term) ||
      pkg.shortDescription?.toLowerCase().includes(term) ||
      pkg.locations?.some(l => l.toLowerCase().includes(term))
    );
  });

  // Filter Maldives packages by search term
  const maldivesFiltered = maldivesPackages.filter(pkg => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(term) ||
      pkg.resortName?.toLowerCase().includes(term) ||
      pkg.shortDescription?.toLowerCase().includes(term)
    );
  });

  const showMaldives = filter === 'all' || filter === 'maldives';
  const showSriLanka = filter === 'all' || filter === 'sriLanka';

  const totalCount =
    (showMaldives ? (isMaldivesLoading ? 0 : maldivesFiltered.length) : 0) +
    (showSriLanka ? sriLankaFiltered.length : 0);

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={filter === 'maldives'
              ? getAssetPath("/assets/images/Maldives_bg.jpg")
              : getAssetPath("/assets/images/Sri_Lankan_05.jpg")}
            alt="Luxury Travel Packages"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-background dark:to-dark-background"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 gap-6">
          <h1 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-white text-center animate-fade-up">
            {filter === 'maldives' ? 'Maldives ' : filter === 'sriLanka' ? 'Sri Lanka ' : 'Exclusive Travel '}
            <span className="text-luxury-gold">Packages</span>
          </h1>
          <button
            onClick={() => window.open('https://wa.me/+94774830911', '_blank')}
            className="gold-button !rounded-lg !px-6 !py-2.5 !text-sm"
          >
            Custom Package
          </button>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <PackageFilter
            filter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-luxury-charcoal dark:text-white mb-2 sm:mb-0">
              {filter === 'all' ? 'All Packages' : filter === 'sriLanka' ? 'Sri Lanka Packages' : 'Maldives Packages'}
            </h2>
            <p className="font-lora text-gray-600 dark:text-gray-300">
              {isMaldivesLoading && showMaldives ? 'Loading...' : `Showing ${totalCount} packages`}
            </p>
          </div>

          {/* Maldives packages */}
          {showMaldives && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {isMaldivesLoading ? (
                Array.from({ length: 3 }).map((_, i) => <MaldivesCardSkeleton key={i} />)
              ) : maldivesFiltered.length === 0 ? null : (
                maldivesFiltered.map((pkg, index) => (
                  <MaldivesCard
                    key={pkg._id}
                    pkg={pkg}
                    index={index}
                    onViewDetails={setSelectedMaldivesPkg}
                  />
                ))
              )}
            </div>
          )}

          {/* Sri Lanka packages */}
          {showSriLanka && sriLankaFiltered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sriLankaFiltered.map(pkg => (
                <SriLankaCard key={pkg.id} pkg={pkg as SriLankaPackage} />
              ))}
            </div>
          )}

          {/* Empty state — only when not loading and nothing to show */}
          {!isMaldivesLoading && totalCount === 0 && (
            <div className="bg-white dark:bg-dark-surface rounded-xl p-10 text-center shadow-md">
              <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-2">No packages found</h3>
              <p className="font-lora text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => { setSearchTerm(''); setFilter('all'); }}
                className="font-medium text-luxury-teal hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />

      {/* Maldives Detail Modal */}
      {selectedMaldivesPkg && (
        <MaldivesDetailModal
          pkg={selectedMaldivesPkg}
          onClose={() => setSelectedMaldivesPkg(null)}
        />
      )}
    </div>
  );
};

export default Packages;