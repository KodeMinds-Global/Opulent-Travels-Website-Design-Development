import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TermsAndConditions from '@/components/TermsAndConditions';
import { sriLankaTermsAndConditions } from '@/data/termsAndConditions';

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300">
      <Navigation />
      <div className="pt-20">
        <TermsAndConditions termsData={sriLankaTermsAndConditions} />
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;