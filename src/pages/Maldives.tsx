import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/utils';
import AnimatedHero from '@/components/AnimatedHero';
import ImageCarousel from '@/components/ui/image-carousel';
import { Link } from 'react-router-dom';
import { usePackages } from '@/hooks/usePackages';

const Maldives = () => {
  // Get Maldives packages from the hook
  const { maldivesPackages } = usePackages();
  
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

  // Use real package data for experiences section
  const experiencesSection = {
    title: "Luxury Experiences",
    description: "Curated experiences that showcase the best of the Maldives",
    experiences: maldivesPackages.slice(0, 3).map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.shortDescription,
      price: `From $${pkg.price} per person`,
      image: pkg.imageUrl,
    }))
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

  const homepageMaldivesCards = [
    {
      id: 1,
      title: "Luxury Overwater Villa Experience",
      duration: "5 days / 4 nights",
      price: "$3,200",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=3945&auto=format&fit=crop",
      features: ["Overwater Villa", "All Meals Included", "Spa Treatment", "Sunset Cruise"],
      featured: true
    },
    {
      id: 2,
      title: "Private Island Escape",
      duration: "7 days / 6 nights",
      price: "$4,800",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=4752&auto=format&fit=crop",
      features: ["Private Island", "Gourmet Dining", "Dolphin Watching", "Water Sports"]
    },
    {
      id: 3,
      title: "Coral Reef Adventure",
      duration: "6 days / 5 nights",
      price: "$3,600",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=3165&auto=format&fit=crop",
      features: ["Snorkeling", "Island Hopping", "Beach Picnic", "Luxury Stay"]
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
            {homepageMaldivesCards.map((pkg, index) => (
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
    </div>
  );
};

export default Maldives;
