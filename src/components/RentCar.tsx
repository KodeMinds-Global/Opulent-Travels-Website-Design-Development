import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Car, Shield, Clock, MapPin } from 'lucide-react';

const RentCar = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById('rent-car');
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

  const carTypes = [
    {
      name: "Economy",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=2940&auto=format&fit=crop",
      price: "$25/day"
    },
    {
      name: "Luxury SUV",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2940&auto=format&fit=crop",
      price: "$85/day"
    },
    {
      name: "Premium Sedan",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2940&auto=format&fit=crop",
      price: "$65/day"
    }
  ];

  return (
    <section id="rent-car" className="py-14 px-3 bg-gradient-to-br from-light-secondary/10 via-light-background to-light-primary/5 dark:from-dark-secondary/10 dark:via-dark-background dark:to-dark-primary/5">
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
              {/* Dark mode glow effect overlay */}
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

        {/* Car Types */}
        <div className={`grid md:grid-cols-3 gap-3 mb-8 transition-all duration-1000 delay-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
        }`}>
          {carTypes.map((car, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
              } bg-white dark:bg-gray-800/90 dark:border dark:border-white/10 mx-auto`}
              style={{ 
                animationDelay: `${1200 + index * 200}ms`,
                width: '96%'
              }}
            >
              <div className="relative h-44">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1500 ${
          isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
        }`}>
          <Button className="light-button dark:dark-button text-base px-8 py-4">
            View Details
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RentCar;
