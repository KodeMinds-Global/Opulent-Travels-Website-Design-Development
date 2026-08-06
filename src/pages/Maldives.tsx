import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/utils';
import AnimatedHero from '@/components/AnimatedHero';
import ImageCarousel from '@/components/ui/image-carousel';
import { Link } from 'react-router-dom';
import { useFeaturedMaldivesPackages } from '@/hooks/useFeaturedMaldivesPackages';
import { resolvePackageImageUrl } from '@/services/packages.service';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { FeaturedMaldivesPackage } from '@/services/packages.service';

// --- Maldives Detail Modal ---
const MaldivesDetailModal: React.FC<{ pkg: FeaturedMaldivesPackage; onClose: () => void }> = ({ pkg, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = (pkg.galleryImages ?? []).map(resolvePackageImageUrl);

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

  const features = (pkg.descriptionPoints?.length > 0 ? pkg.descriptionPoints : pkg.highlights ?? []).slice(0, 4);

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
            </>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-5">
          <h2 className="font-playfair font-bold text-2xl text-luxury-charcoal dark:text-white mb-2">
            {pkg.title}
          </h2>

          {pkg.resortRating > 0 && (
            <div className="flex items-center gap-1.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < pkg.resortRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
              <span className="font-montserrat text-sm font-medium text-luxury-teal dark:text-dark-accent ml-1">
                {pkg.resortRating}.0
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

const Maldives = () => {
  const { data: featuredPackages = [], isLoading: isFeaturedLoading } = useFeaturedMaldivesPackages();
  const [selectedPkg, setSelectedPkg] = useState<FeaturedMaldivesPackage | null>(null);
  
  // Main sections data
  const heroSection = {
    title: "Discover Maldives",
    subtitle: "Paradise on Earth",
    description: "Experience crystal clear waters, pristine beaches, and luxury overwater villas in this tropical haven.",
    backgroundImage: getAssetPath("/assets/images/Maldives_bg.jpg"),
    // Using local image instead of unsplash to match the animation style
  };

  const countryDescriptionSection = {
    title: "About Maldives",
    description: [
      "The Maldives is a tropical paradise consisting of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. Located in the heart of the Indian Ocean, this nation is renowned for its stunning white-sand beaches, crystal-clear turquoise waters, and vibrant marine life.",
      "With an average ground level of just 1.5 meters (4 feet 11 inches) above sea level, the Maldives is the world's lowest country, making it a pristine destination where land and sea exist in perfect harmony.",
      "The Maldivian culture is rich with influences from the lands that lie along the trading routes of the Indian Ocean. Visitors can experience traditional 'Bodu Beru' performances, taste delicious seafood cuisine, and witness the warm hospitality that the Maldivian people are known for."
    ]
  };

  // Carousel items for highlights
  const carouselItems = [
    {
      title: "Maldives",
      name: "Overwater Villas",
      description: "Stay in luxurious accommodations suspended above crystal clear lagoons, where you can wake up to panoramic ocean views and direct access to the pristine waters below.",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=3165&auto=format&fit=crop"
    },
    {
      title: "Maldives",
      name: "Marine Life",
      description: "Explore vibrant coral reefs and swim alongside manta rays, turtles, and tropical fish in one of the world's most biodiverse marine ecosystems.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop"
    },
    {
      title: "Maldives",
      name: "Water Activities",
      description: "Enjoy snorkeling, diving, surfing, and paddleboarding in perfect conditions year-round in the warm, crystal-clear waters of the Indian Ocean.",
      image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2301&auto=format&fit=crop"
    },
    {
      title: "Maldives",
      name: "Private Islands",
      description: "Experience exclusive resorts located on their own pristine tropical atolls, offering unparalleled privacy, luxury, and personalized service.",
      image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=3133&auto=format&fit=crop"
    }
  ];

  const highlightsSection = {
    title: "Maldives Highlights",
    description: "From underwater adventures to overwater luxury, discover the wonders of the Maldives",
    highlights: [
      {
        title: "Overwater Villas",
        description: "Stay in luxurious accommodations suspended above crystal clear lagoons.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=3165&auto=format&fit=crop",
      },
      {
        title: "Marine Life",
        description: "Explore vibrant coral reefs and swim alongside manta rays, turtles, and tropical fish.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop",
      },
      {
        title: "Water Activities",
        description: "Enjoy snorkeling, diving, surfing, and paddleboarding in perfect conditions.",
        image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2301&auto=format&fit=crop",
      },
      {
        title: "Private Islands",
        description: "Experience exclusive resorts located on their own pristine tropical atolls.",
        image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=3133&auto=format&fit=crop",
      }
    ]
  };

  const testimonialSection = {
    title: "What Our Travelers Say",
    testimonials: [
      {
        name: "David & Jessica Smith",
        location: "United States",
        comment: "Our honeymoon in the Maldives was absolute perfection. The overwater villa, private dining experiences, and incredible service made it unforgettable.",
        rating: 5,
      },
      {
        name: "Thomas Weber",
        location: "Germany",
        comment: "The diving and snorkeling were world-class. We saw manta rays, turtles, and so many colorful fish. The resort staff were incredibly helpful.",
        rating: 5,
      },
      {
        name: "Akiko Tanaka",
        location: "Japan",
        comment: "The Maldives exceeded our expectations. The beauty of the islands, the clarity of the water, and the luxury of our accommodation were all perfect.",
        rating: 5,
      }
    ]
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section with Text Animation */}
      <AnimatedHero
        title={heroSection.title}
        subtitle={heroSection.subtitle}
        description={heroSection.description}
        backgroundImage={heroSection.backgroundImage}
        showButton={false}
        // No svgPath prop, so it will use text animation
      />

      {/* Country Description Section */}
      <section className="py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-8 text-luxury-charcoal dark:text-white text-center">{countryDescriptionSection.title}</h2>
            <div className="space-y-6">
              {countryDescriptionSection.description.map((paragraph, index) => (
                <p key={index} className="font-lora text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section with Image Carousel */}
      <section className="py-10 bg-light-surface dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-luxury-charcoal dark:text-white">{highlightsSection.title}</h2>
            <p className="font-lora text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">{highlightsSection.description}</p>
          </div>
          
          {/* Image Carousel */}
          <ImageCarousel items={carouselItems} />
        </div>
      </section>

      {/* Maldives Tour Packages Section */}
      <section className="py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-luxury-charcoal dark:text-white">
              Maldives <span className="text-transparent bg-clip-text" style={{
                background: 'linear-gradient(90deg, #00308F 0%, #0066CC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Tour Packages</span>
            </h2>
            <p className="font-lora text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Discover carefully curated Maldives experiences designed to showcase the island’s luxury, marine life, and tropical beauty
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isFeaturedLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="luxury-card backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto" style={{ width: '95%' }}>
                  <Skeleton className="h-48 rounded-t-xl rounded-b-none" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-4/6" />
                    <Skeleton className="h-3 w-3/6" />
                    <Skeleton className="h-9 w-full mt-2" />
                  </div>
                </div>
              ))
            ) : featuredPackages.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="font-lora text-gray-500 dark:text-gray-400">No featured packages available at the moment.</p>
              </div>
            ) : (
              featuredPackages.map((pkg, index) => (
                <div
                  key={pkg._id}
                  className="luxury-card hover-lift group transition-all duration-1000 backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto"
                  style={{
                    animationDelay: `${600 + index * 200}ms`,
                    width: '95%'
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={resolvePackageImageUrl(pkg.imageUrl)}
                      alt={pkg.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {pkg.price > 0 && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                        <div className="font-bold text-luxury-gold dark:text-dark-accent">From ${pkg.price}</div>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-1.5">
                      {pkg.title}
                    </h3>

                    {pkg.duration && (
                      <p className="font-montserrat text-luxury-teal dark:text-dark-accent text-sm font-medium mb-3">
                        {pkg.duration}
                      </p>
                    )}

                    <div className="space-y-1.5 mb-4">
                      {(pkg.descriptionPoints?.length > 0 ? pkg.descriptionPoints : pkg.highlights ?? []).slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-luxury-gold dark:bg-dark-accent rounded-full"></div>
                          <span className="font-lora text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full teal-button dark:dark-button group-hover:scale-105 transition-transform duration-300 text-sm py-1.5"
                      onClick={() => setSelectedPkg(pkg)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/packages?type=maldives">
              <Button className="px-8 py-3 rounded-full bg-gradient-to-r from-luxury-teal to-blue-500 hover:from-luxury-teal/90 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium">
                View All Maldives Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-light-gradient dark:bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 text-luxury-charcoal dark:text-white">Ready to Experience Paradise?</h2>
          <p className="font-lora text-xl text-gray-700 dark:text-white/90 max-w-3xl mx-auto mb-8">Contact our travel specialists to plan your perfect Maldives getaway.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="gold-button">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />

      {selectedPkg && (
        <MaldivesDetailModal
          pkg={selectedPkg}
          onClose={() => setSelectedPkg(null)}
        />
      )}
    </div>
  );
};

export default Maldives;
