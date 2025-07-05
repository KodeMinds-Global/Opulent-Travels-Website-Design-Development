// Package data types

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