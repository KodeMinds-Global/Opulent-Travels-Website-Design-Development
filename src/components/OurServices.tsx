import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Car, Building, Users, Check } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

const OurServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState('car');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('our-services');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const services = {
    car: {
      title: 'Rent Car Service',
      icon: <Car className="w-8 h-8" />,
      description: 'Experience comfortable, convenient, and transparent car rentals in Sri Lanka for any travel need.',
      features: [
        'Comfort & Convenience',
        'Holiday & Business Ready',
        'Experienced Service',
        'Customer-Focused',
        'Transparent Pricing',
        'Reliable Transportation'
      ],
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2940&auto=format&fit=crop',
      color: 'from-blue-600 to-indigo-500'
    },
    hotel: {
      title: 'Hotel Reservations',
      icon: <Building className="w-8 h-8" />,
      description: 'Simplify Sri Lankan travel with our diverse, hand-picked hotel options offering exclusive benefits for a memorable stay.',
      features: [
        'Seamless Booking',
        'Diverse Options',
        'Suits Every Budget',
        'Curated Selection',
        'Prime Locations',
        'Exclusive Benefits'
      ],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2940&auto=format&fit=crop',
      color: 'from-amber-500 to-orange-500'
    },
    mice: {
      title: 'Services for MICE Groups',
      icon: <Users className="w-8 h-8" />,
      description: 'Sri Lanka is a rapidly recognized premier M.I.C.E destination in Asia, offering world-class facilities and a strategic global meeting point.',
      features: [
        'Premier M.I.C.E Destination',
        'Strategic Global Location',
        'World-Class Facilities',
        'Diverse Convention Venues',
        'Island-Wide Options',
        'Tailored for M.I.C.E'
      ],
      image: getAssetPath('/assets/images/mice.jpg'),
      color: 'from-emerald-500 to-teal-500'
    }
  };

  const filterOptions = [
    { key: 'car', label: 'Rent Car Service', icon: <Car className="w-4 h-4" /> },
    { key: 'hotel', label: 'Hotel Reservations', icon: <Building className="w-4 h-4" /> },
    { key: 'mice', label: 'MICE Groups', icon: <Users className="w-4 h-4" /> }
  ];

  const currentService = services[activeService as keyof typeof services];

  return (
    <section id="our-services" className="py-14 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-400 text-white text-sm font-medium px-4 py-1 rounded-full">
              Our Offerings
            </div>
          </div>
          <h2 className={`font-playfair font-bold text-3xl lg:text-4xl mb-4 transition-all duration-1000 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          } text-gray-900 dark:text-dark-accent`}>
            Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:text-dark-gradient">Services</span>
          </h2>
          <p className={`font-lora text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            Comprehensive travel solutions tailored to your unique needs and preferences
          </p>
        </div>

        {/* Filter Options */}
        <div className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
        }`}>
          {filterOptions.map((option) => (
            <Button
              key={option.key}
              onClick={() => setActiveService(option.key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full font-montserrat font-medium transition-all duration-300 ${
                activeService === option.key
                  ? `bg-gradient-to-r ${services[option.key as keyof typeof services].color} text-white shadow-md dark:dark-button`
                  : 'bg-white shadow-sm text-gray-700 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-primary/20'
              }`}
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>

        {/* Service Content */}
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Content Side */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${currentService.color} p-[2px] shadow-lg flex-shrink-0`}>
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                  <div className={`bg-gradient-to-r ${currentService.color} bg-clip-text text-transparent`}>
                    {currentService.icon}
                  </div>
                </div>
              </div>
              <h3 className="font-playfair font-bold text-2xl text-gray-900 dark:text-dark-accent">
                {currentService.title}
              </h3>
            </div>
            
            <p className="font-lora text-base text-gray-600 dark:text-gray-300 mb-6">
              {currentService.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {currentService.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 dark:theme-card"
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentService.color} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className={`bg-gradient-to-r ${currentService.color} text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 dark:dark-button`}>
                View More
              </Button>
              
            </div>
          </div>

          {/* Image Side */}
          <div className={`transition-all duration-1000 delay-900 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative rounded-xl shadow-lg mx-auto overflow-hidden" style={{ width: '95%' }}>
              <img
                src={currentService.image}
                alt={currentService.title}
                className="rounded-xl w-full h-[380px] object-cover transition-all duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-playfair font-bold text-xl">{currentService.title}</h4>
                <p className="font-lora text-sm">Professional excellence in every detail</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
