import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/utils';
import { useSriLankaGallery, resolveGalleryImageUrl } from '@/hooks/useSriLankaGallery';

const ExploreSriLanka = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const galleryItems = useSriLankaGallery();

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

    const el = document.getElementById('explore-sri-lanka');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // First 4 items for the 2x2 grid
  const gridItems = galleryItems.slice(0, 4);

  // 5th item for the large hero image (right side)
  const heroItem = galleryItems[4];
  const heroImageSrc = heroItem?.imageUrl
    ? resolveGalleryImageUrl(heroItem.imageUrl)
    : getAssetPath('/assets/images/Sri_Lankan_05.jpg');
  const heroTitle = heroItem?.title ?? 'Historical & Cultural Wonders';
  const heroDescription = heroItem?.description ?? 'Step back in time amidst ancient cities, majestic temples, and UNESCO World Heritage sites.';

  return (
    <section
      id="explore-sri-lanka"
      className="py-20 relative dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f5f5 35%, #f5f0f5 70%, #f8f9fa 100%)'
      }}
    >
      {/* Dark mode overlay */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>

      <div className="container mx-auto px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
              Sri Lanka
            </div>
          </div>
          <h2 className={`font-playfair font-bold text-4xl lg:text-5xl mb-6 transition-all duration-1000 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          } text-light-primary dark:text-dark-accent`}>
            <span
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(90deg, #00308F 0%, #0066CC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <span className="dark:hidden">Explore with Sri Lanka</span>
              <span className="hidden dark:inline" style={{
                background: 'linear-gradient(90deg, #00BFFF 0%, #1E90FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Explore with Sri Lanka</span>
            </span>
          </h2>
          <p className={`font-lora text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            Discover the Pearl of the Indian Ocean with its rich culture, stunning landscapes, and warm hospitality
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 items-center">
          {/* Left — 2x2 image grid */}
          <div className={`transition-all duration-1000 delay-500 flex flex-col ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="grid grid-cols-2 gap-3 mx-auto w-[95%]">
              {gridItems.length > 0 ? gridItems.map((item, index) => {
                const src = item.imageUrl ? resolveGalleryImageUrl(item.imageUrl) : '';
                return (
                  <div
                    key={item.id}
                    className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl
                      transition-all duration-500
                      hover-lift group
                      border border-gray-100 dark:border-dark-primary/30
                      ${
                        isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
                      }`}
                    style={{
                      animationDelay: `${800 + index * 200}ms`,
                      height: '220px',
                    }}
                  >
                    <div className="h-full overflow-hidden">
                      {src ? (
                        <img
                          src={src}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400 dark:text-gray-500 text-sm font-lora">No image</span>
                        </div>
                      )}
                    </div>
                    {/* Caption overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="font-playfair text-lg font-bold">{item.title}</p>
                        {item.description && (
                          <p className="font-lora text-sm">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }) : (
                // Fallback skeleton placeholders when no gallery data
                Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
                    style={{ height: '220px' }}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right — large hero image */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group hover-lift border border-gray-100 dark:border-dark-primary/30 mx-auto w-[95%]">
              <div className="h-[450px] overflow-hidden">
                <img
                  src={heroImageSrc}
                  alt={heroTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-playfair font-bold text-2xl">{heroTitle}</h3>
                <p className="font-lora">{heroDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* View More button */}
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => navigate('/sri-lanka')}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:dark-button"
          >
            View More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreSriLanka;
