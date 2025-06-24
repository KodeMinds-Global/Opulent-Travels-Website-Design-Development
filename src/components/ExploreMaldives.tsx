import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ExploreMaldives = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('explore-maldives');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Image data for Maldives
  const maldivesImages = [
    {
      src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=3165&auto=format&fit=crop",
      alt: "Overwater Villas",
      caption: "Luxury accommodation above crystal clear lagoons"
    },
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop",
      alt: "Marine Life",
      caption: "Snorkel with manta rays and tropical fish"
    },
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop",
      alt: "Sunset Views",
      caption: "Breathtaking sunsets over the Indian Ocean"
    },
    {
      src: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=3133&auto=format&fit=crop",
      alt: "Private Islands",
      caption: "Exclusive resorts on pristine tropical atolls"
    }
  ];

  return (
    <section 
      id="explore-maldives" 
      className="py-24 relative dark:bg-gradient-to-br dark:from-dark-primary/5 dark:via-dark-background dark:to-dark-secondary/10"
      style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 80%, #e0f2fe 100%)"
      }}
    >
      {/* Dark mode overlay to override the inline style */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-primary/5 via-dark-background to-dark-secondary/10 z-0"></div>
      
      <div className="container mx-auto px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="bg-gradient-to-r from-blue-600 to-sky-400 text-white text-sm font-medium px-4 py-1 rounded-full">
              Maldives
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
              <span className="dark:hidden">Explore with Maldives</span>
              <span className="hidden dark:inline" style={{
                background: 'linear-gradient(90deg, #00BFFF 0%, #1E90FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Explore with Maldives</span>
            </span>
          </h2>
          <p className={`font-lora text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            Experience paradise on Earth with pristine waters, luxury resorts, and unforgettable underwater adventures
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 items-center">
          {/* Image Side - Large image with hover effect */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group hover-lift border border-gray-100 dark:border-dark-primary/30 mx-auto w-[95%]">
              <div className="h-[450px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
                  alt="Maldives Overwater Villa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-playfair font-bold text-2xl">Overwater Paradise</h3>
                <p className="font-lora">Wake up to endless ocean views</p>
              </div>
            </div>
          </div>

          {/* Content Side - Now with Images Grid */}
          <div className={`transition-all duration-1000 delay-500 flex flex-col ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'
          }`}>
            <div className="grid grid-cols-2 gap-3 mx-auto w-[95%]">
              {maldivesImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl 
                    transition-all duration-500 
                    hover-lift group
                    border border-gray-100 dark:border-dark-primary/30
                    ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'}`}
                  style={{ 
                    animationDelay: `${800 + index * 200}ms`,
                    height: "220px",
                  }}
                >
                  {/* Image */}
                  <div className="h-full overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Caption overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-playfair text-lg font-bold">{image.alt}</p>
                      <p className="font-lora text-sm">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Centered View More button */}
        <div className="flex justify-center mt-12">
          <Button className="bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white font-medium py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:dark-button">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreMaldives;
