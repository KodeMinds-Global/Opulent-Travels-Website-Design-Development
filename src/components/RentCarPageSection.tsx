import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Car, Shield, Clock, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Users, Briefcase, Wrench, CheckCircle } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  image: string;
  passengers: string;
  luggage: string;
  transmission: string;
  features: string;
}

const RentCarPageSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('rent-car-page');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Car className="w-6 h-6" />,
      title: "Premium Fleet",
      description: "Luxury cars, SUVs, and comfortable vehicles for every need",
      gradient: {
        light: "from-blue-100 to-indigo-200",
        dark: "from-blue-800/40 to-indigo-700/50"
      },
      iconColor: "text-blue-600 dark:text-blue-300"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Full Insurance",
      description: "Comprehensive coverage for your peace of mind",
      gradient: {
        light: "from-emerald-100 to-teal-200",
        dark: "from-emerald-800/40 to-teal-700/50"
      },
      iconColor: "text-emerald-600 dark:text-emerald-300"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance wherever you go",
      gradient: {
        light: "from-amber-100 to-orange-200",
        dark: "from-amber-800/40 to-orange-700/50"
      },
      iconColor: "text-amber-600 dark:text-amber-300"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "GPS Navigation",
      description: "Modern GPS systems to guide your journey",
      gradient: {
        light: "from-rose-100 to-pink-200",
        dark: "from-rose-800/40 to-pink-700/50"
      },
      iconColor: "text-rose-600 dark:text-rose-300"
    }
  ];

  const vehicles: Vehicle[] = [
    {
      id: 1,
      name: "Toyota Allion",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2940&auto=format&fit=crop",
      passengers: "Up-to 3 Passengers",
      luggage: "Up-to 2 luggage / 200l Capacity in Trunk",
      transmission: "Chauffeur guide included",
      features: "Vehicle & Passenger Insurance included"
    },
    {
      id: 2,
      name: "Honda Odyssey",
      image: "https://images.unsplash.com/photo-1606611013016-969c19d91202?q=80&w=2940&auto=format&fit=crop",
      passengers: "Up-to 7 Passengers",
      luggage: "Up-to 5 luggage / 400l Capacity in Trunk",
      transmission: "Chauffeur guide included",
      features: "Vehicle & Passenger Insurance included"
    },
    {
      id: 3,
      name: "Toyota Fortuner",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2940&auto=format&fit=crop",
      passengers: "Up-to 7 Passengers",
      luggage: "Up-to 6 luggage / 500l Capacity in Trunk",
      transmission: "Chauffeur guide included",
      features: "Vehicle & Passenger Insurance included"
    },
    {
      id: 4,
      name: "Nissan Serena",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=2940&auto=format&fit=crop",
      passengers: "Up-to 7 Passengers",
      luggage: "Up-to 5 luggage / 400l Capacity in Trunk",
      transmission: "Chauffeur guide included",
      features: "Vehicle & Passenger Insurance included"
    },
    {
      id: 5,
      name: "BMW 7 Series",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2940&auto=format&fit=crop",
      passengers: "Up-to 5 Passengers",
      luggage: "Up-to 3 luggage / 300l Capacity in Trunk",
      transmission: "Chauffeur guide included",
      features: "Vehicle & Passenger Insurance included"
    },
    {
      id: 6,
      name: "Mercedes S-Class",
      image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?q=80&w=2940&auto=format&fit=crop",
      passengers: "Up-to 5 Passengers",
      luggage: "Up-to 4 luggage / 350l Capacity in Trunk",
      transmission: "Chauffeur guide included",
      features: "Vehicle & Passenger Insurance included"
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      setCurrentIndex(Math.min(vehicles.length - 3, currentIndex + 1));
    }
  };

  return (
    <section id="rent-car-page" className="py-14 px-3 bg-gradient-to-br from-light-secondary/10 via-light-background to-light-primary/5 dark:from-dark-secondary/10 dark:via-dark-background dark:to-dark-primary/5">
      <div className="container mx-auto px-2 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
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
              <span className="dark:hidden">Rent Car</span>
              <span className="hidden dark:inline" style={{
                background: 'linear-gradient(90deg, #00BFFF 0%, #1E90FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Rent Car</span>
            </span>
          </h2>
          <p className={`font-lora text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            Explore destinations at your own pace with our premium vehicle rental services
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-10 transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
        }`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-5 mx-auto text-center rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 
                transition-all duration-300 relative bg-gradient-to-br 
                ${feature.gradient.light} dark:${feature.gradient.dark}
                dark:border dark:border-white/10 group
                dark:hover:shadow-glow dark:hover:shadow-white/20
                ${isVisible ? 'animate-zoom-in' : 'opacity-0 scale-75'}`}
              style={{ 
                animationDelay: `${700 + index * 150}ms`,
                overflow: 'hidden',
                width: '94%',
                height: '185px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div className="absolute inset-0 opacity-0 dark:group-hover:opacity-40 
                transition-opacity duration-500 pointer-events-none bg-gradient-to-tr 
                dark:from-white/15 dark:via-white/10 dark:to-transparent 
                rounded-xl"></div>
              
              <div className={`mb-3 flex justify-center relative z-10 ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h3 className="font-playfair font-bold text-base text-gray-800 dark:text-white mb-2 relative z-10">
                {feature.title}
              </h3>
              <p className="font-lora text-gray-700 dark:text-gray-200 text-sm relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Vehicle Carousel Section */}
        <div className={`mb-12 transition-all duration-1000 delay-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative">
            {/* Left Arrow - Mobile Hidden */}
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full items-center justify-center transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Carousel Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-2 md:px-12"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            >
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex-shrink-0 w-full sm:w-96 cursor-pointer"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:border dark:border-white/10">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-playfair font-bold text-lg text-gray-800 dark:text-white">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Click to view details
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow - Mobile Hidden */}
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full items-center justify-center transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Mobile Scroll Indicator */}
          <div className="md:hidden text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Scroll horizontally to see more vehicles</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1500 ${
          isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
        }`}>
          <Button className="light-button dark:dark-button text-base px-8 py-4">
            Inquire Now
          </Button>
        </div>
      </div>

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 pb-6">
              {/* Vehicle Image */}
              <div className="mb-6">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Vehicle Name */}
              <h2 className="font-playfair font-bold text-3xl text-gray-900 dark:text-white mb-6">
                {selectedVehicle.name}
              </h2>

              {/* Vehicle Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedVehicle.passengers}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedVehicle.luggage}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedVehicle.transmission}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedVehicle.features}
                  </p>
                </div>
              </div>

              {/* Inquire Button */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300">
                Inquire Now
              </Button>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                *Can get any type of sedan from economical to luxury
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RentCarPageSection;
