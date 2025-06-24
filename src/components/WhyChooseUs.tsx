import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    clients: 0,
    destinations: 0,
    experience: 0,
    satisfaction: 0
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start counter animations
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('why-choose-us');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = { clients: 500, destinations: 3, experience: 15, satisfaction: 100 };
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;

    Object.keys(targets).forEach(key => {
      const target = targets[key as keyof typeof targets];
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, interval);
    });
  };

  const features = [
    {
      title: "Personalized Service",
      description: "Every journey is tailored to your unique preferences and dreams",
      icon: "👤"
    },
    {
      title: "Local Expertise",
      description: "Deep knowledge of hidden gems and authentic experiences",
      icon: "🗺️"
    },
    {
      title: "Luxury Accommodations",
      description: "Hand-picked premium hotels and exclusive resorts",
      icon: "🏨"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your journey",
      icon: "📞"
    }
  ];

  const stats = [
    { key: 'clients', label: 'Happy Clients', suffix: '+' },
    { key: 'destinations', label: 'Destinations', suffix: '+' },
    { key: 'experience', label: 'Years Experience', suffix: '+' },
    { key: 'satisfaction', label: 'Satisfaction Rate', suffix: '%' }
  ];

  return (
    <section 
      id="why-choose-us" 
      className="py-10 sm:py-12 md:py-16 text-white relative overflow-hidden bg-black"
    >
      {/* Parallax Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Light mode image - luxury resort */}
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover block dark:hidden"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop")', 
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Light mode overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50 sm:bg-black/40"></div>
        </div>

        {/* Dark mode image - night luxury scene */}
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover hidden dark:block"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2940&auto=format&fit=crop")', 
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark mode overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/70 sm:bg-black/60"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className={`font-playfair font-bold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 transition-all duration-1000 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Why Choose <span className="text-gradient">Opulent Travels</span>
          </h2>
          <p className={`font-lora text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Excellence, expertise, and exclusivity define every aspect of our service
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, index) => (
            <div key={stat.key} className="text-center px-1 sm:px-2">
              <div className="font-playfair font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-luxury-gold mb-1">
                {counters[stat.key as keyof typeof counters]}{stat.suffix}
              </div>
              <div className="font-montserrat text-white/80 text-xs sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-3 sm:p-4 text-center rounded-xl backdrop-blur-sm bg-black/20 border border-white/10 
                hover:bg-black/30 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 
                ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'}`}
              style={{ 
                animationDelay: `${800 + index * 200}ms`,
              }}
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                {feature.icon}
              </div>
              <h3 className="font-playfair font-bold text-sm sm:text-base text-luxury-gold mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="font-lora text-white/90 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
