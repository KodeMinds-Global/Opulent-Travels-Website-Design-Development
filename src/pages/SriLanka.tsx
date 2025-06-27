import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/utils';
import AnimatedHero from '@/components/AnimatedHero';

const SriLanka = () => {
  // Main sections data
  const heroSection = {
    title: "Discover Sri Lanka",
    subtitle: "The Pearl of the Indian Ocean",
    description: "Explore the breathtaking beauty, rich culture, and warm hospitality of this tropical paradise.",
    backgroundImage: getAssetPath("/assets/images/Sri_Lanka_bg.jpg"),
  };

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

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section with Text Animation */}
      <AnimatedHero
        title={heroSection.title}
        subtitle={heroSection.subtitle}
        description={heroSection.description}
        backgroundImage={heroSection.backgroundImage}
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
                  <p className="font-playfair text-lg font-bold text-emerald-600 dark:text-emerald-400">{experience.price}</p>
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
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-800 dark:to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Explore Sri Lanka?</h2>
          <p className="font-lora text-xl text-white/90 max-w-3xl mx-auto mb-8">Contact our travel specialists to plan your perfect Sri Lankan adventure.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 shadow-md hover:shadow-xl transition-all py-3 px-8 text-lg">
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

export default SriLanka;
