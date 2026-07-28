import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import PackageCard from '@/components/PackageCard';
import PackageFilter from '@/components/PackageFilter';
import { usePackages } from '@/hooks/usePackages';
import { getAssetPath } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';
import { MaldivesPackage } from '@/types/package';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Maldives Detail Modal ---
interface MaldivesDetailModalProps {
  pkg: MaldivesPackage;
  onClose: () => void;
}

// Extra gallery images per Maldives package ID
const MALDIVES_GALLERY: Record<string, string[]> = {
  'mv-001': [
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1920&auto=format&fit=crop',
  ],
  'mv-002': [
    'https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1920&auto=format&fit=crop',
  ],
  'mv-003': [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682687982107-14492010e05e?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601581875039-e899893d520c?q=80&w=1920&auto=format&fit=crop',
  ],
};

const MaldivesDetailModal: React.FC<MaldivesDetailModalProps> = ({ pkg, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Use gallery lookup; fall back to the package's own imageUrl
  const images = MALDIVES_GALLERY[pkg.id] ?? [pkg.imageUrl];

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

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
          <img
            src={images[currentSlide]}
            alt={`${pkg.title} - image ${currentSlide + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {images.length > 1 && (
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
            </>
          )}

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
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
            {currentSlide + 1} / {images.length}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5">
          <h2 className="font-playfair font-bold text-2xl text-luxury-charcoal dark:text-white mb-2">
            {pkg.resortName || pkg.title}
          </h2>

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

          <ul className="space-y-2">
            {pkg.highlights.map((highlight, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-luxury-gold dark:bg-dark-accent rounded-full flex-shrink-0" />
                <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- Maldives Package Card ---
interface MaldivesCardProps {
  pkg: MaldivesPackage;
  onViewDetails: (pkg: MaldivesPackage) => void;
  index: number;
}

const MaldivesCard: React.FC<MaldivesCardProps> = ({ pkg, onViewDetails, index }) => {
  return (
    <div
      className="luxury-card hover-lift group transition-all duration-1000 backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto"
      style={{ animationDelay: `${index * 200}ms`, width: '100%' }}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={pkg.imageUrl}
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

        <div className="space-y-1.5 mb-4">
          {pkg.highlights.slice(0, 4).map((highlight, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-luxury-gold dark:bg-dark-accent rounded-full flex-shrink-0"></div>
              <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{highlight}</span>
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

// --- Main Packages Page ---
const Packages = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const [selectedMaldivesPkg, setSelectedMaldivesPkg] = useState<MaldivesPackage | null>(null);

  const {
    filteredPackages,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm
  } = usePackages();

  useEffect(() => {
    if (typeParam === 'sriLanka' || typeParam === 'maldives') {
      setFilter(typeParam);
    }
  }, [typeParam, setFilter]);

  // Split filtered packages by type
  const maldivesFiltered = filteredPackages.filter(p => p.type === 'maldives') as MaldivesPackage[];
  const sriLankaFiltered = filteredPackages.filter(p => p.type === 'sriLanka');

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
              Showing {filteredPackages.length} packages
            </p>
          </div>

          {filteredPackages.length === 0 && (
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

          {/* Maldives packages — new card style */}
          {maldivesFiltered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {maldivesFiltered.map((pkg, index) => (
                <MaldivesCard
                  key={pkg.id}
                  pkg={pkg}
                  index={index}
                  onViewDetails={setSelectedMaldivesPkg}
                />
              ))}
            </div>
          )}

          {/* Sri Lanka packages — existing PackageCard */}
          {sriLankaFiltered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sriLankaFiltered.map(pkg => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
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