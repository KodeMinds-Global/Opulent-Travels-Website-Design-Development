import axios from 'axios';

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:3000';

const publicAxios = axios.create({ baseURL });

export interface Car {
  _id: string;
  name: string;
  category: string;
  imageUrl: string;
  passengers?: string;
  luggage?: string;
  transmission?: string;
  highlight?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Resolves a car imageUrl to a full displayable URL.
 * - Absolute (http/https): returned as-is
 * - /uploads/... : prepended with API base URL
 * - Relative asset path: resolved with Vite BASE_URL
 */
export function resolveCarImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('/uploads/')) return `${baseURL}${imageUrl}`;
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalized = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${prefix}${normalized}`;
}

export const carsPublicService = {
  async getAll(): Promise<Car[]> {
    const res = await publicAxios.get<Car[]>('/cars');
    return res.data;
  },
};
