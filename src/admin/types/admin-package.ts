export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface DetailedItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface PricingCategoryPrices {
  '2Pax': number;
  '4Pax': number;
  '6Pax': number;
  '8Pax': number;
  ExtraAdult: number;
  ChildWithBed: number;
  ChildWithoutBed: number;
}

export interface PricingCategory {
  name: string;
  prices: PricingCategoryPrices;
}

export interface PricingTable {
  currency: string;
  validFrom: string;
  validTo: string;
  categories: PricingCategory[];
}

export interface AdminPackage {
  _id: string;
  destination: 'sriLanka' | 'maldives';
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  price: number;
  duration: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  detailedItinerary: DetailedItineraryDay[];
  pricingTable: PricingTable;
  supplements: string[];
  hotelList: Record<string, Record<string, string>>;
  seasonalSupplements: Record<string, unknown>;
  featured: boolean;
  // Sri Lanka specific
  locations: string[];
  culturalExperiences: string[];
  // Maldives specific
  resortName: string;
  resortRating: number;
  waterActivities: string[];
  descriptionPoints: string[];
  galleryImages: string[];
  mapImageUrl?: string;
  destinationsCount?: number;
  createdAt: string;
  updatedAt: string;
}