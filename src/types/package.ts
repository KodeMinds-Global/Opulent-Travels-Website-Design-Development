// Package data types

export interface PricingCategory {
  name: string;
  prices: {
    '2Pax': number;
    '4Pax': number;
    '6Pax': number;
    '8Pax': number;
    'ExtraAdult': number;
    'ChildWithBed': number;
    'ChildWithoutBed': number;
  };
}

export interface PricingTable {
  currency: string;
  validFrom: string;
  validTo: string;
  categories: PricingCategory[];
}

export interface DetailedItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface SeasonalSupplement {
  period: string;
  rates: {
    [key: string]: number;
  };
}

export interface TermsSection {
  title: string;
  items: string[];
  colorScheme: string;
}

export interface TermsAndConditions {
  mainTitle: string;
  validityPeriod: {
    from: string;
    to: string;
  };
  sections: {
    allRates: TermsSection;
    transfersInclude: TermsSection;
    transfersExclude: TermsSection;
    childrenPolicy: TermsSection;
    general: TermsSection;
    pleaseNote: TermsSection;
    cancellationCharges: TermsSection;
    hotelConfirmations: {
      title: string;
      content: string[];
      colorScheme: string;
    };
    hotelRules: TermsSection;
    visa: {
      title: string;
      content: string;
      link: string;
      colorScheme: string;
    };
  };
}

export interface BasePackage {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  price: number;
  duration: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  featured: boolean;
  detailedItinerary?: DetailedItineraryDay[];
  pricingTable?: PricingTable;
  supplements?: string[];
  seasonalSupplements?: {
    [key: string]: SeasonalSupplement;
  };
  hotelList?: {
    [category: string]: {
      [location: string]: string;
    };
  };
}

export interface SriLankaPackage extends BasePackage {
  type: 'sriLanka';
  locations: string[]; // Sri Lankan locations
  culturalExperiences?: string[];
}

export interface MaldivesPackage extends BasePackage {
  type: 'maldives';
  resortName: string;
  resortRating: number;
  waterActivities?: string[];
}

export type Package = SriLankaPackage | MaldivesPackage; 