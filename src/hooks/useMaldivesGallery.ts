const STORAGE_KEY = 'opulnet_maldives_gallery';

export interface MaldivesGalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Resolves a gallery imageUrl to a displayable URL for the public website.
 * - Absolute URLs (http/https): returned as-is
 * - /uploads/... paths: prepended with the API base URL
 * - Relative asset paths (/assets/...): resolved via Vite BASE_URL
 */
export function resolveGalleryImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  const apiBase = (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:3000';
  if (imageUrl.startsWith('/uploads/')) return `${apiBase}${imageUrl}`;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const prefix = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalized = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${prefix}${normalized}`;
}

/**
 * Reads Maldives gallery items from localStorage (same key as admin panel),
 * sorted by the `order` field ascending.
 * Falls back to an empty array if nothing is stored yet.
 */
export function useMaldivesGallery(): MaldivesGalleryItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const items: MaldivesGalleryItem[] = JSON.parse(stored);
    return items.sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}
