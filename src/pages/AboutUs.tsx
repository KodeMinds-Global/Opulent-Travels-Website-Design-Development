import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getAssetPath } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({
    history: false,
    mission: false,
    team: false
  });

  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    
    const historyObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, history: true }));
        }
      },
      observerOptions
    );
    
    const missionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, mission: true }));
        }
      },
      observerOptions
    );
    
    const teamObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, team: true }));
        }
      },
      observerOptions
    );

    const historySection = document.getElementById('history');
    const missionSection = document.getElementById('mission');
    const teamSection = document.getElementById('team');

    if (historySection) historyObserver.observe(historySection);
    if (missionSection) missionObserver.observe(missionSection);
    if (teamSection) teamObserver.observe(teamSection);

    return () => {
      historyObserver.disconnect();
      missionObserver.disconnect();
      teamObserver.disconnect();
    };
  }, []);

  const teamMembers = [
    {
      name: "Alexandra Rivera",
      position: "Founder & CEO",
      image: getAssetPath("/assets/images/about_01.jpg"),
      description: "With over 15 years of luxury travel experience, Alexandra founded Opulent Travels with a vision to redefine luxury journeys."
    },
    {
      name: "David Chen",
      position: "Travel Director",
      image: getAssetPath("/assets/images/about_02.jpg"),
      description: "David's extensive knowledge of Asian destinations ensures every itinerary is perfectly crafted for our clients."
    },
    {
      name: "Sarah Johnson",
      position: "Client Relations Manager",
      image: getAssetPath("/assets/images/about_03.jpg"),
      description: "Sarah's attention to detail and personalized approach creates unforgettable experiences for our valued clients."
    },
    {
      name: "Michael Torres",
      position: "Luxury Experience Specialist",
      image: getAssetPath("/assets/images/Sri_Lankan_04.jpg"),
      description: "Michael's background in hospitality and deep connections with luxury properties ensure VIP treatment for every client."
    }
  ];

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("/assets/images/Sri_Lankan_01.jpg")} 
            alt="Luxury Travel Experience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-background dark:to-dark-background"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6">
              About <span className="text-luxury-gold">Opulent</span> Travels
            </h1>
            <p className="font-lora text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl">
              Discover the passion, expertise, and dedication that drives us to create extraordinary travel experiences for discerning travelers.
            </p>
            <Button className="gold-button bg-luxury-gold text-black hover:bg-luxury-gold/90 transition-all">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
      
      {/* Our History Section */}
      <section id="history" className="py-16 sm:py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        {/* Dark mode background overlay */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-luxury-charcoal dark:text-white mb-3 sm:mb-4">
              Our <span className="text-luxury-gold dark:text-luxury-gold">History</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold to-luxury-teal mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible.history ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={getAssetPath("/assets/images/Sri_Lankan_02.jpg")} 
                  alt="Our History" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="font-playfair text-xl font-bold">Established 2008</p>
                  <p className="font-lora">Starting our journey of excellence</p>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible.history ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <h3 className="font-playfair font-bold text-xl sm:text-2xl md:text-3xl text-luxury-charcoal dark:text-white mb-4 sm:mb-6">
                From Dream to <span className="text-luxury-teal dark:text-luxury-teal">Reality</span>
              </h3>
              <p className="font-lora text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                Founded in 2008, Opulent Travels began with a singular vision: to provide discerning travelers with extraordinary experiences that blend luxury, authenticity, and cultural immersion. Our founder, Alexandra Rivera, after years of working in traditional travel agencies, recognized a gap in the market for truly personalized luxury travel services.
              </p>
              <p className="font-lora text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                What started as a boutique agency focused on Sri Lankan experiences has grown into a respected luxury travel company specializing in curated journeys across multiple destinations. Throughout our evolution, we have maintained our commitment to exclusivity, attention to detail, and exceptional service.
              </p>
              <p className="font-lora text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, with offices in Colombo and Male, we continue to push the boundaries of luxury travel, creating bespoke experiences that transform ordinary trips into extraordinary journeys.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section id="mission" className="py-16 sm:py-20 bg-light-surface dark:bg-dark-surface/30 relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-luxury-charcoal dark:text-white mb-3 sm:mb-4">
              Our <span className="text-luxury-teal dark:text-luxury-teal">Mission</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-luxury-teal to-luxury-coral mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className={`relative p-6 sm:p-8 md:p-10 bg-white dark:bg-dark-background rounded-2xl shadow-xl border border-gray-100 dark:border-dark-primary/30 overflow-hidden transition-all duration-1000 ${isVisible.mission ? 'animate-zoom-in' : 'opacity-0 scale-95'}`}>
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10 dark:opacity-5">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFD700" d="M46,-51.1C59.9,-37.3,71.5,-18.6,70.6,-0.9C69.7,16.9,56.2,33.8,42.3,47.1C28.3,60.3,14.2,69.9,-1.7,71.6C-17.6,73.3,-35.2,67,-46.7,53.7C-58.2,40.3,-63.6,20.1,-63.9,-0.3C-64.3,-20.7,-59.6,-41.5,-48.1,-55.2C-36.5,-69,-18.3,-75.9,0.1,-75.9C18.4,-76,36.8,-69.3,46,-51.1Z" transform="translate(100 100)" />
                </svg>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="font-playfair font-bold text-xl sm:text-2xl md:text-3xl text-luxury-charcoal dark:text-white mb-6 sm:mb-8">
                  Elevating Travel to an Art Form
                </h3>
                <p className="font-lora text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  At Opulent Travels, our mission is to transform travel from a mere activity into an art form. We believe that exceptional journeys have the power to inspire, transform, and create lasting memories that enrich lives.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mt-8">
                  <div className="p-4 sm:p-6 rounded-xl bg-light-background dark:bg-dark-primary/20">
                    <div className="w-12 h-12 rounded-full bg-luxury-gold/20 dark:bg-dark-accent/20 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-luxury-gold dark:text-dark-accent">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                    </div>
                    <h4 className="font-montserrat font-bold text-luxury-charcoal dark:text-white mb-2">Excellence</h4>
                    <p className="font-lora text-sm text-gray-600 dark:text-gray-400">
                      We strive for excellence in every aspect of your journey.
                    </p>
                  </div>
                  
                  <div className="p-4 sm:p-6 rounded-xl bg-light-background dark:bg-dark-primary/20">
                    <div className="w-12 h-12 rounded-full bg-luxury-teal/20 dark:bg-dark-accent/20 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-luxury-teal dark:text-dark-accent">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <h4 className="font-montserrat font-bold text-luxury-charcoal dark:text-white mb-2">Authenticity</h4>
                    <p className="font-lora text-sm text-gray-600 dark:text-gray-400">
                      We create genuine experiences that connect you with destinations.
                    </p>
                  </div>
                  
                  <div className="p-4 sm:p-6 rounded-xl bg-light-background dark:bg-dark-primary/20">
                    <div className="w-12 h-12 rounded-full bg-luxury-coral/20 dark:bg-dark-accent/20 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-luxury-coral dark:text-dark-accent">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <h4 className="font-montserrat font-bold text-luxury-charcoal dark:text-white mb-2">Personalization</h4>
                    <p className="font-lora text-sm text-gray-600 dark:text-gray-400">
                      We tailor every detail to your unique preferences and desires.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section id="team" className="py-16 sm:py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        {/* Dark mode background overlay */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-luxury-charcoal dark:text-white mb-3 sm:mb-4">
              Our <span className="text-luxury-coral dark:text-luxury-coral">Team</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-luxury-coral to-luxury-gold mx-auto"></div>
            <p className="font-lora text-base md:text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Meet the passionate experts behind Opulent Travels who bring your dream journeys to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`group perspective relative transition-all duration-1000 ${
                  isVisible.team ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-[50px]'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="relative preserve-3d transition-all duration-500 w-full h-[400px] group-hover:rotate-y-180">
                  {/* Front of Card */}
                  <div className="absolute backface-hidden w-full h-full">
                    <div className="bg-white dark:bg-dark-surface/50 rounded-2xl shadow-xl overflow-hidden h-full">
                      {/* Image Container */}
                      <div className="relative h-3/5 overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-105"
                        />
                        
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                        
                        {/* Gold shimmering border on hover */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold dark:group-hover:border-luxury-gold opacity-0 group-hover:opacity-100 rounded-t-2xl transition-all duration-500"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col h-2/5">
                        <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white transition-all duration-300 group-hover:text-luxury-gold dark:group-hover:text-luxury-gold">{member.name}</h3>
                        <p className="font-montserrat text-sm text-luxury-teal dark:text-luxury-teal mb-2">{member.position}</p>
                        
                        {/* Social Icons */}
                        <div className="mt-auto flex space-x-3 pt-4">
                          <a href="#" className="transform transition-all duration-300 text-gray-400 hover:text-luxury-gold dark:hover:text-luxury-gold hover:scale-110">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                          <a href="#" className="transform transition-all duration-300 text-gray-400 hover:text-luxury-gold dark:hover:text-luxury-gold hover:scale-110">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a href="#" className="transform transition-all duration-300 text-gray-400 hover:text-luxury-gold dark:hover:text-luxury-gold hover:scale-110">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1.41 7.08c.84-.58 1.87-.92 2.98-.92 1.04 0 1.99.29 2.81.77 1.44.85 2.4 2.43 2.4 4.24 0 2.74-2.23 4.97-4.97 4.97s-4.97-2.23-4.97-4.97c0-1.59.75-3 1.91-3.91h.01v.01c.65.61 1.52.98 2.47.98 2.01 0 3.64-1.63 3.64-3.64s-1.63-3.64-3.64-3.64c-1.3 0-2.43.68-3.07 1.71-.27.44-.42.95-.42 1.5 0 .3.05.59.14.86.49 1.36 1.79 2.35 3.35 2.35.58 0 1.14-.13 1.64-.37-.21.3-.47.55-.78.73-.5.3-1.08.45-1.69.45-1.84 0-3.33-1.49-3.33-3.33 0-1.35.8-2.51 1.96-3.03z" clipRule="evenodd" />
                            </svg>
                          </a>
                          
                          {/* Flip card icon */}
                          <div className="ml-auto">
                            <button className="w-8 h-8 rounded-full bg-white/90 dark:bg-dark-surface flex items-center justify-center text-luxury-gold dark:text-luxury-gold transition-transform duration-300 group-hover:rotate-180">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm4 8a4 4 0 0 1-8 0V7a4 4 0 1 1 8 0v4zm-1-4a3 3 0 1 0-6 0v4a3 3 0 0 0 6 0V7z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of Card */}
                  <div className="absolute backface-hidden w-full h-full rotate-y-180 bg-gradient-to-br from-luxury-gold/10 to-luxury-teal/10 dark:from-luxury-gold/20 dark:to-luxury-teal/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6">
                    <div className="flex-1 flex flex-col">
                      <div className="bg-luxury-gold/20 dark:bg-luxury-gold/20 p-2 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white text-center mb-4">{member.name}</h3>
                      <p className="font-montserrat text-luxury-teal dark:text-luxury-teal text-center mb-6">{member.position}</p>
                      
                      <div className="flex-1 bg-white/80 dark:bg-dark-background/80 rounded-xl p-4 backdrop-blur-sm mb-6">
                        <p className="font-lora text-gray-700 dark:text-gray-300 text-center">{member.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/60 dark:bg-dark-background/60 rounded-lg p-2 text-center">
                          <span className="block text-xs text-gray-500 dark:text-gray-400">Languages</span>
                          <span className="font-montserrat text-sm text-luxury-charcoal dark:text-white">English, Spanish</span>
                        </div>
                        <div className="bg-white/60 dark:bg-dark-background/60 rounded-lg p-2 text-center">
                          <span className="block text-xs text-gray-500 dark:text-gray-400">Experience</span>
                          <span className="font-montserrat text-sm text-luxury-charcoal dark:text-white">15+ Years</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-luxury-gold/80 hover:bg-luxury-gold text-black font-montserrat font-medium rounded-lg transition-colors duration-300">Contact Me</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-light-surface dark:bg-dark-surface/30 relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-luxury-charcoal dark:text-white mb-6">
              Ready to Experience <span className="text-luxury-gold dark:text-luxury-gold">Luxury Travel</span>?
            </h2>
            <p className="font-lora text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let us create a bespoke journey tailored to your preferences. Contact our team today and begin your extraordinary adventure.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="gold-button bg-luxury-gold text-black hover:bg-luxury-gold/90 transition-all">
                Contact Us
              </Button>
              <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10 dark:border-luxury-gold dark:text-luxury-gold dark:hover:bg-luxury-gold/10 transition-all">
                View Destinations
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default AboutUs; 