import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePackages } from '@/hooks/usePackages';
import { useFeaturedMaldivesPackages } from '@/hooks/useFeaturedMaldivesPackages';
import { resolvePackageImageUrl } from '@/services/packages.service';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// --- Types ---
interface MaldivesPackage {
  id: string | number;
  title: string;
  category: 'maldives';
  ratingCount: number;
  image: string;
  features: string[];
  featured?: boolean;
  galleryImages: string[];
}

interface SriLankaPackage {
  id: string | number;
  title: string;
  category: 'srilanka';
  duration: string;
  price: string;
  originalPrice: string;
  image: string;
  features: string[];
}

type Package = MaldivesPackage | SriLankaPackage;

// --- Maldives Detail Modal ---
interface MaldivesDetailModalProps {
  pkg: MaldivesPackage;
  onClose: () => void;
}

const MaldivesDetailModal: React.FC<MaldivesDetailModalProps> = ({ pkg, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = pkg.galleryImages;

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
          {images.length > 0 ? (
            <img
              src={images[currentSlide]}
              alt={`${pkg.title} - image ${currentSlide + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-lora">No images available</span>
            </div>
          )}

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

          {images.length > 1 && (
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
          )}

          {images.length > 1 && (
            <div className="absolute top-3 left-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
              {currentSlide + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-5">
          <h2 className="font-playfair font-bold text-2xl text-luxury-charcoal dark:text-white mb-2">
            {pkg.title}
          </h2>

          <div className="flex items-center gap-1.5 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < pkg.ratingCount
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="font-montserrat text-sm font-medium text-luxury-teal dark:text-dark-accent ml-1">
              {pkg.ratingCount}.0
            </span>
          </div>

          <ul className="space-y-2">
            {pkg.features.map((feature, i) => (
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

// --- Maldives Card Skeleton ---
const MaldivesCardSkeleton = () => (
  <div
    className="luxury-card backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto"
    style={{ width: '95%' }}
  >
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

// --- Main Packages Component ---
const Packages = () => {
  const navigate = useNavigate();
  const { sriLankaPackages } = usePackages();
  const { data: featuredMaldivesRaw = [], isLoading: isMaldivesLoading } = useFeaturedMaldivesPackages();
  const [activeFilter, setActiveFilter] = useState('maldives');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMaldivesPkg, setSelectedMaldivesPkg] = useState<MaldivesPackage | null>(null);

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

  // Map API data to MaldivesPackage shape
  const featuredMaldivesPackages: MaldivesPackage[] = featuredMaldivesRaw.map(pkg => ({
    id: pkg._id,
    title: pkg.title,
    category: 'maldives' as const,
    ratingCount: pkg.resortRating ?? 5,
    image: resolvePackageImageUrl(pkg.imageUrl),
    features: (
      pkg.descriptionPoints?.length > 0
        ? pkg.descriptionPoints
        : pkg.highlights ?? []
    ).slice(0, 4),
    featured: true,
    galleryImages: (pkg.galleryImages ?? []).map(resolvePackageImageUrl),
  }));

  const sriLankaAsPackages: SriLankaPackage[] = sriLankaPackages.map(pkg => ({
    id: pkg.id,
    title: pkg.title,
    category: 'srilanka' as const,
    duration: pkg.duration,
    price: `$${pkg.price}`,
    originalPrice: '',
    image: pkg.imageUrl,
    features: pkg.highlights.slice(0, 4),
  }));

  const allPackages: Package[] = [
    ...featuredMaldivesPackages,
    ...sriLankaAsPackages,
  ];

  const filteredPackages = allPackages.filter(pkg => pkg.category === activeFilter);

  return (
    <section id="packages" className="py-16 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Maldives tab: show skeletons while loading, then live cards */}
          {activeFilter === 'maldives' && isMaldivesLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <MaldivesCardSkeleton key={i} />
            ))
          ) : (
            filteredPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`luxury-card hover-lift group transition-all duration-1000 backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto ${
                  isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${600 + index * 200}ms`, width: '95%' }}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {pkg.category === 'srilanka' && pkg.price && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                      <div className="font-bold text-luxury-gold dark:text-dark-accent">{pkg.price}</div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-1.5">
                    {pkg.title}
                  </h3>

                  {pkg.category === 'maldives' ? (
                    <>
                      <div className="flex items-center gap-1.5 mb-3 text-luxury-teal dark:text-dark-accent">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < pkg.ratingCount ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        ))}
                        <span className="font-montserrat text-sm font-medium">{pkg.ratingCount}.0</span>
                      </div>
                      <div className="space-y-1.5 mb-4">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-luxury-gold dark:bg-dark-accent rounded-full"></div>
                            <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-montserrat text-luxury-teal dark:text-dark-accent text-sm font-medium mb-3">
                        {pkg.duration}
                      </p>
                      <div className="space-y-1.5 mb-4">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-luxury-gold dark:bg-dark-accent rounded-full"></div>
                            <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {pkg.category === 'maldives' ? (
                    <Button
                      className="w-full teal-button dark:dark-button group-hover:scale-105 transition-transform duration-300 text-sm py-1.5"
                      onClick={() => setSelectedMaldivesPkg(pkg as MaldivesPackage)}
                    >
                      View Details
                    </Button>
                  ) : (
                    <Link to={`/sri-lanka/package/${pkg.id}`}>
                      <Button className="w-full teal-button dark:dark-button group-hover:scale-105 transition-transform duration-300 text-sm py-1.5">
                        View Details
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => navigate('/packages')}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-teal-400 dark:hover:from-blue-600 dark:hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            View All Packages
          </Button>
        </div>
      </div>

      {selectedMaldivesPkg && (
        <MaldivesDetailModal
          pkg={selectedMaldivesPkg}
          onClose={() => setSelectedMaldivesPkg(null)}
        />
      )}
    </section>
  );
};

export default Packages;