import axios from 'axios';

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:3000';

const publicAxios = axios.create({ baseURL });

/** Shape returned by GET /packages/featured/maldives */
export interface FeaturedMaldivesPackage {
  _id: string;
  title: string;
  imageUrl: string;
  resortRating: number;
  descriptionPoints: string[];
  highlights: string[];
  galleryImages: string[];
  destination: 'maldives';
  featured: boolean;
}

/** Full shape returned by GET /packages?destination=maldives */
export interface AllMaldivesPackage {
  _id: string;
  destination: 'maldives';
  title: string;
  shortDescription: string;
  imageUrl: string;
  price: number;
  duration: string;
  highlights: string[];
  descriptionPoints: string[];
  galleryImages: string[];
  resortName: string;
  resortRating: number;
  waterActivities: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Resolves a package imageUrl to a full displayable URL.
 * - Absolute (http/https): returned as-is
 * - /uploads/... : prepended with API base URL
 */
export function resolvePackageImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('/uploads/')) return `${baseURL}${imageUrl}`;
  return imageUrl;
}

export const packagesPublicService = {
  async getFeaturedMaldives(): Promise<FeaturedMaldivesPackage[]> {
    const res = await publicAxios.get<FeaturedMaldivesPackage[]>('/packages/featured/maldives');
    return res.data;
  },

  async getAllMaldives(): Promise<AllMaldivesPackage[]> {
    const res = await publicAxios.get<AllMaldivesPackage[]>('/packages', {
      params: { destination: 'maldives' },
    });
    return res.data;
  },
};