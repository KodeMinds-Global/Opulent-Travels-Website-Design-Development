import React from 'react';
import { TermsAndConditions as TermsAndConditionsType } from '../types/package';

interface TermsAndConditionsProps {
  termsData: TermsAndConditionsType;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ termsData }) => {
  const getColorClasses = (colorScheme: string) => {
    const colorMap = {
      green: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800',
      blue: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800',
      red: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800',
      purple: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800',
      amber: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800',
      teal: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-800',
      rose: 'from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 border-rose-200 dark:border-rose-800',
      indigo: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-indigo-200 dark:border-indigo-800',
      emerald: 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800',
      slate: 'from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 border-slate-200 dark:border-slate-800'
    };
    return colorMap[colorScheme as keyof typeof colorMap] || colorMap.slate;
  };

  const renderSection = (section: any, key: string) => {
    const colorClasses = getColorClasses(section.colorScheme);
    
    return (
      <div key={key} className={`bg-gradient-to-r ${colorClasses} rounded-2xl p-6 border`}>
        <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-4">
          {section.title}
        </h3>
        
        {section.items && (
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {section.items.map((item: string, index: number) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        )}
        
        {section.content && Array.isArray(section.content) && (
          <div className="space-y-3">
            {section.content.map((paragraph: string, index: number) => (
              <p key={index} className="text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        
        {section.content && typeof section.content === 'string' && (
          <p className="text-gray-700 dark:text-gray-300">
            {section.content}
            {section.link && (
              <a 
                href={section.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-600 dark:text-green-400 hover:underline ml-1"
              >
                {section.link}
              </a>
            )}
          </p>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-dark-surface relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair font-bold text-3xl md:text-5xl text-luxury-charcoal dark:text-white mb-4">
            {termsData.mainTitle.split('Terms & Conditions')[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              Terms & Conditions
            </span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {renderSection(termsData.sections.allRates, 'allRates')}
          {renderSection(termsData.sections.transfersInclude, 'transfersInclude')}
          {renderSection(termsData.sections.transfersExclude, 'transfersExclude')}
          {renderSection(termsData.sections.childrenPolicy, 'childrenPolicy')}
          {renderSection(termsData.sections.general, 'general')}
          {renderSection(termsData.sections.pleaseNote, 'pleaseNote')}
          {renderSection(termsData.sections.cancellationCharges, 'cancellationCharges')}
          {renderSection(termsData.sections.hotelConfirmations, 'hotelConfirmations')}
          {renderSection(termsData.sections.hotelRules, 'hotelRules')}
          {renderSection(termsData.sections.visa, 'visa')}
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
