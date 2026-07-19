import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getAssetPath } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: '/assets/images/valentin-petrov-m-mal-01.jpg',
    alt: 'Luxury Maldives shoreline',
    title: 'Maldives Escape',
  },
  {
    src: '/assets/images/Sri_Lankan_01.jpg',
    alt: 'Sri Lanka scenic travel moment',
    title: 'Sri Lanka Journey',
  },
  {
    src: '/assets/images/about_01.jpg',
    alt: 'Travel experience highlight',
    title: 'Travel Moments',
  },
  {
    src: '/assets/images/Sri_Lankan_02.jpg',
    alt: 'Sri Lanka landscape',
    title: 'Island Views',
  },
  {
    src: '/assets/images/about_02.jpg',
    alt: 'Luxury travel detail',
    title: 'Luxury Details',
  },
  {
    src: '/assets/images/Sri_Lankan_03.jpg',
    alt: 'Sri Lanka vacation gallery image',
    title: 'Curated Routes',
  },
  {
    src: '/assets/images/about_03.jpg',
    alt: 'Travel highlight image',
    title: 'Special Memories',
  },
  {
    src: '/assets/images/Sri_Lankan_04.jpg',
    alt: 'Sri Lanka travel photo',
    title: 'Special Frames',
  },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const handleScrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />

      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getAssetPath('/assets/images/valentin-petrov-m-mal-01.jpg')}
            alt="Gallery showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 sm:bg-black/30 md:bg-black/20"></div>
        </div>

        <div className="flex-grow flex items-center">
          <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="font-playfair font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl text-white mb-2 sm:mb-4 md:mb-6 leading-tight">
              Our <span className="text-luxury-gold">Gallery</span>
            </h1>
            <p className="font-lora text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Discover special travel moments captured across Sri Lanka and the Maldives
            </p>
            <Button
              onClick={handleScrollToContent}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-2.5 px-6 sm:px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Browse Gallery
            </Button>
          </div>
        </div>

        <div className="w-full flex justify-center z-20 mb-6 md:mb-8">
          <button
            onClick={handleScrollToContent}
            className="flex flex-col items-center animate-bounce-slow px-3 py-2 cursor-pointer"
          >
            <span className="text-white font-montserrat text-sm md:text-base font-medium">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 md:w-6 md:h-6 text-white mt-1" />
          </button>
        </div>
      </section>

      <main className="px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-12 max-w-3xl">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-luxury-charcoal dark:text-white mb-3">
              Featured Images
            </h2>
            <p className="font-lora text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Tap any image to view it in a popup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setSelectedImage(item)}
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-black/5 shadow-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-transparent"
              >
                <img
                  src={getAssetPath(item.src)}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left text-white">
                  <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-white/70 mb-1">Special shot</p>
                  <h3 className="font-playfair text-xl sm:text-2xl">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-6xl border-0 bg-transparent p-0 shadow-none">
          {selectedImage && (
            <div className="overflow-hidden rounded-3xl bg-black/90 shadow-2xl">
              <DialogHeader className="sr-only">
                <DialogTitle>{selectedImage.title}</DialogTitle>
                <DialogDescription>{selectedImage.alt}</DialogDescription>
              </DialogHeader>
              <img
                src={getAssetPath(selectedImage.src)}
                alt={selectedImage.alt}
                className="max-h-[85vh] w-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default GalleryPage;