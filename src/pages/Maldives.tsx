import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/utils';
import AnimatedHero from '@/components/AnimatedHero';

const Maldives = () => {
  // Main sections data
  const heroSection = {
    title: "Discover Maldives",
    subtitle: "Paradise on Earth",
    description: "Experience crystal clear waters, pristine beaches, and luxury overwater villas in this tropical haven.",
    backgroundImage: getAssetPath("/assets/images/valentin-petrov-m-mal-01.jpg"),
    // Using local image instead of unsplash to match the animation style
  };

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

  const experiencesSection = {
    title: "Luxury Experiences",
    description: "Curated experiences that showcase the best of the Maldives",
    experiences: [
      {
        title: "Romantic Getaway",
        description: "7-day luxury escape for couples with private dining and spa treatments.",
        price: "From $3,200 per person",
        image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=3133&auto=format&fit=crop",
      },
      {
        title: "Underwater Adventure",
        description: "5-day package focused on snorkeling and diving in the best reefs.",
        price: "From $2,800 per person",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop",
      },
      {
        title: "Family Paradise",
        description: "8-day family retreat with kid-friendly activities and spacious accommodations.",
        price: "From $3,600 per person",
        image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2301&auto=format&fit=crop",
      }
    ]
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

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section with Text Animation */}
      <AnimatedHero
        title={heroSection.title}
        subtitle={heroSection.subtitle}
        description={heroSection.description}
        backgroundImage={heroSection.backgroundImage}
        // No svgPath prop, so it will use text animation
      />

      {/* Highlights Section */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{highlightsSection.title}</h2>
            <p className="font-lora text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{highlightsSection.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlightsSection.highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="group bg-gray-50 dark:bg-dark-primary/20 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={highlight.image} 
                    alt={highlight.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold mb-2 text-gray-900 dark:text-white">{highlight.title}</h3>
                  <p className="font-montserrat text-gray-600 dark:text-gray-300">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{experiencesSection.title}</h2>
            <p className="font-lora text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{experiencesSection.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiencesSection.experiences.map((experience, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-dark-primary/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold mb-2 text-gray-900 dark:text-white">{experience.title}</h3>
                  <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-4">{experience.description}</p>
                  <p className="font-playfair text-lg font-bold text-blue-600 dark:text-blue-400">{experience.price}</p>
                  <Button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-dark-primary/30 dark:hover:bg-dark-primary/50 dark:text-white">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{testimonialSection.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialSection.testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-dark-primary/20 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-lora text-gray-600 dark:text-gray-300 italic mb-6">"{testimonial.comment}"</p>
                <div>
                  <p className="font-playfair font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="font-montserrat text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-400 dark:from-blue-800 dark:to-sky-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Experience Paradise?</h2>
          <p className="font-lora text-xl text-white/90 max-w-3xl mx-auto mb-8">Contact our travel specialists to plan your perfect Maldives getaway.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 shadow-md hover:shadow-xl transition-all py-3 px-8 text-lg">
              Get a Quote
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 transition-all py-3 px-8 text-lg">
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

export default Maldives;
