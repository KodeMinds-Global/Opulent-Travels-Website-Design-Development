import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ExploreSriLanka from '@/components/ExploreSriLanka';
import ExploreMaldives from '@/components/ExploreMaldives';
import RentCar from '@/components/RentCar';
import Packages from '@/components/Packages';
import WhyChooseUs from '@/components/WhyChooseUs';
import OurServices from '@/components/OurServices';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import ClientLogos from '@/components/ClientLogos';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />
      <Hero />
      <About />
      <ExploreSriLanka />
      <ExploreMaldives />
      <RentCar />
      <Packages />
      <WhyChooseUs />
      <OurServices />
      <Testimonials />
      <Contact />
      <ClientLogos />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
