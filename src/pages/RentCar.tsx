import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import RentCar from '@/components/RentCar';

const RentCarPage = () => {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <Navigation />

      {/* Simple header spacer below fixed navbar */}
      <header className="h-16" />

      {/* Rent Car full section reused as a page body */}
      <main>
        <RentCar />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default RentCarPage;
