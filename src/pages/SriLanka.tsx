import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/utils';
import AnimatedHero from '@/components/AnimatedHero';
import ImageCarousel from '@/components/ui/image-carousel';
import { usePackages } from '@/hooks/usePackages';
import { Link } from 'react-router-dom';

const SriLanka = () => {
  const { sriLankaPackages } = usePackages();
  
  // Main sections data
  const heroSection = {
    title: "Discover Sri Lanka",
    subtitle: "The Pearl of the Indian Ocean",
    description: "Explore the breathtaking beauty, rich culture, and warm hospitality of this tropical paradise.",
    backgroundImage: getAssetPath("/assets/images/Sri_Lanka_bg.jpg"),
  };
  
  const countryDescriptionSection = {
    title: "About Sri Lanka",
    description: [
      "Sri Lanka, formerly known as Ceylon, is an island nation located in the Indian Ocean, just south of India. This tropical paradise is known for its diverse landscapes, ranging from rainforests and arid plains to highlands and sandy beaches.",
      "With a history that dates back over 3,000 years, Sri Lanka is home to eight UNESCO World Heritage Sites, including ancient cities, sacred temples, and natural wonders. The country's rich cultural heritage is influenced by Buddhism, Hinduism, and colonial powers like Portugal, the Netherlands, and Britain.",
      "Sri Lankan cuisine is a flavorful mix of spices, coconut, and fresh ingredients. Famous for its Ceylon tea, the country also produces cinnamon, rubber, and other valuable resources that have shaped its economy and history."
    ]
  };

  // Carousel items for highlights
  const carouselItems = [
    {
      title: "Sri Lanka",
      name: "Ancient Cities",
      description: "Explore UNESCO World Heritage sites like Sigiriya, Polonnaruwa, and Anuradhapura, where ancient civilizations built remarkable monuments, palaces, and religious sites.",
      image: getAssetPath("/assets/images/Sri_Lankan_01.jpg")
    },
    {
      title: "Sri Lanka",
      name: "Tea Plantations",
      description: "Visit the lush green tea estates in Nuwara Eliya and Ella, known as Little England, where you can learn about tea production and enjoy breathtaking mountain views.",
      image: getAssetPath("/assets/images/Sri_Lankan_02.jpg")
    },
    {
      title: "Sri Lanka",
      name: "Wildlife Safaris",
      description: "Encounter elephants, leopards, and exotic birds in Yala, Udawalawe, and Wilpattu National Parks, home to some of the highest densities of wildlife in Asia.",
      image: getAssetPath("/assets/images/Sri_Lankan_03.jpg")
    },
    {
      title: "Sri Lanka",
      name: "Stunning Beaches",
      description: "Relax on golden sands at Mirissa, Unawatuna, Bentota, and Arugam Bay, where palm-fringed shores meet the warm waters of the Indian Ocean.",
      image: getAssetPath("/assets/images/Sri_Lankan_04.jpg")
    }
  ];

  const highlightsSection = {
    title: "Sri Lanka Highlights",
    description: "From ancient cities to pristine beaches, discover the diverse wonders of Sri Lanka",
    highlights: [
      {
        title: "Ancient Cities",
        description: "Explore UNESCO World Heritage sites like Sigiriya, Polonnaruwa, and Anuradhapura.",
        image: getAssetPath("/assets/images/Sri_Lankan_01.jpg"),
      },
      {
        title: "Tea Plantations",
        description: "Visit the lush green tea estates in Nuwara Eliya and Ella, known as Little England.",
        image: getAssetPath("/assets/images/Sri_Lankan_02.jpg"),
      },
      {
        title: "Wildlife Safaris",
        description: "Encounter elephants, leopards, and exotic birds in Yala, Udawalawe, and Wilpattu National Parks.",
        image: getAssetPath("/assets/images/Sri_Lankan_03.jpg"),
      },
      {
        title: "Stunning Beaches",
        description: "Relax on golden sands at Mirissa, Unawatuna, Bentota, and Arugam Bay.",
        image: getAssetPath("/assets/images/Sri_Lankan_04.jpg"),
      }
    ]
  };

  const experiencesSection = {
    title: "Unforgettable Experiences",
    description: "Curated experiences that showcase the best of Sri Lanka",
    experiences: [
      {
        title: "Cultural Triangle Tour",
        description: "7-day journey through Sri Lanka's ancient cities and cultural landmarks.",
        price: "From $1,200 per person",
        image: getAssetPath("/assets/images/Sri_Lankan_01.jpg"),
      },
      {
        title: "Hill Country Tea Trails",
        description: "5-day adventure through the picturesque tea plantations and misty mountains.",
        price: "From $950 per person",
        image: getAssetPath("/assets/images/Sri_Lankan_02.jpg"),
      },
      {
        title: "Coastal Paradise",
        description: "8-day beach retreat with time to explore coastal towns and marine life.",
        price: "From $1,400 per person",
        image: getAssetPath("/assets/images/Sri_Lankan_03.jpg"),
      }
    ]
  };

  const testimonialSection = {
    title: "What Our Travelers Say",
    testimonials: [
      {
        name: "Sarah Johnson",
        location: "United Kingdom",
        comment: "Our Sri Lanka trip exceeded all expectations. The guides were knowledgeable, the accommodations superb, and the cultural experiences unforgettable.",
        rating: 5,
      },
      {
        name: "Michael Chen",
        location: "Singapore",
        comment: "The wildlife safari was the highlight of our trip. We saw elephants, leopards and so many birds. Highly recommended!",
        rating: 5,
      },
      {
        name: "Emma Williams",
        location: "Australia",
        comment: "From the tea plantations to the beaches, Sri Lanka offered such diverse experiences. Opulent Travels took care of every detail.",
        rating: 5,
      }
    ]
  };

  const homepageSriLankaCards = [
    {
      id: 1,
      title: "Sri Lanka Cultural Journey",
      duration: "10 Days / 9 Nights",
      price: "$2,299",
      originalPrice: "$2,799",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=3648&auto=format&fit=crop",
      features: ["Cultural Sites", "Tea Plantation Tours", "Wildlife Safari", "Local Cuisine"],
      featured: true
    },
    {
      id: 2,
      title: "Sri Lanka Cultural Journey",
      duration: "10 Days / 9 Nights",
      price: "$2,299",
      originalPrice: "$2,799",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=3648&auto=format&fit=crop",
      features: ["Cultural Sites", "Tea Plantation Tours", "Wildlife Safari", "Local Cuisine"]
    },
    {
      id: 3,
      title: "Sri Lanka Cultural Journey",
      duration: "10 Days / 9 Nights",
      price: "$2,299",
      originalPrice: "$2,799",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=3648&auto=format&fit=crop",
      features: ["Cultural Sites", "Tea Plantation Tours", "Wildlife Safari", "Local Cuisine"]
    }
  ];

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

      {/* Sri Lankan Packages Section */}
      <section className="py-20 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-dark-background via-dark-surface to-dark-primary/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-luxury-charcoal dark:text-white">
              Sri Lankan <span className="text-transparent bg-clip-text" style={{
                background: 'linear-gradient(90deg, #00308F 0%, #0066CC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Tour Packages</span>
            </h2>
            <p className="font-lora text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Discover carefully curated Sri Lankan experiences designed to showcase the island's rich heritage and natural beauty
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {homepageSriLankaCards.map((pkg, index) => (
              <div
                key={pkg.id}
                className="luxury-card hover-lift group transition-all duration-1000 backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto"
                style={{
                  animationDelay: `${600 + index * 200}ms`,
                  width: '95%'
                }}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    {pkg.featured && (
                      <span className="bg-gradient-to-r from-luxury-gold to-yellow-400 dark:from-dark-accent/80 dark:to-dark-secondary text-luxury-charcoal dark:text-white px-2 py-0.5 rounded-full text-xs font-poppins font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                    <div className="font-bold text-luxury-gold dark:text-dark-accent">{pkg.price}</div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-1.5">
                    {pkg.title}
                  </h3>
                  
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

                  <Button className="w-full teal-button dark:dark-button group-hover:scale-105 transition-transform duration-300 text-sm py-1.5">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Packages Button */}
          <div className="text-center mt-12">
            <Link to="/packages">
              <Button className="px-8 py-3 rounded-full bg-gradient-to-r from-luxury-teal to-blue-500 hover:from-luxury-teal/90 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium">
                View All Sri Lankan Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-20 bg-light-background dark:bg-dark-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-luxury-charcoal dark:text-white">{experiencesSection.title}</h2>
            <p className="font-lora text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">{experiencesSection.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiencesSection.experiences.map((experience, index) => (
              <div 
                key={index} 
                className="group theme-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover-lift"
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold mb-2 text-luxury-charcoal dark:text-white">{experience.title}</h3>
                  <p className="font-montserrat text-gray-700 dark:text-gray-300 mb-4">{experience.description}</p>
                  <p className="font-playfair text-lg font-bold text-light-accent dark:text-dark-accent">{experience.price}</p>
                  <Button className="mt-4 w-full bg-light-primary/10 hover:bg-light-primary/20 text-light-primary dark:bg-dark-primary/30 dark:hover:bg-dark-primary/50 dark:text-white">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-light-surface dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-luxury-charcoal dark:text-white">{testimonialSection.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialSection.testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="luxury-card p-8 hover-lift"
              >
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-luxury-gold' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-lora text-gray-700 dark:text-gray-300 italic mb-6">"{testimonial.comment}"</p>
                <div>
                  <p className="font-playfair font-bold text-luxury-charcoal dark:text-white">{testimonial.name}</p>
                  <p className="font-montserrat text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-light-gradient dark:bg-dark-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 text-luxury-charcoal dark:text-white">Ready to Explore Sri Lanka?</h2>
          <p className="font-lora text-xl text-gray-700 dark:text-white/90 max-w-3xl mx-auto mb-8">Contact our travel specialists to plan your perfect Sri Lankan adventure.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gold-button">
              Get a Quote
            </Button>
            <Button className="teal-button">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default SriLanka;
