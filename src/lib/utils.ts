import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to get the correct path for assets when deployed to GitHub Pages
 * @param path Path to the asset (should start with '/')
 * @returns The correct path including the base URL when deployed
 */
export function getAssetPath(path: string): string {
  // Make sure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Get the base URL from Vite's import.meta.env.BASE_URL or default to /
  // This ensures assets work in both dev and production environments
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // If the baseUrl is just '/', don't duplicate the slash
  const prefix = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${prefix}${normalizedPath}`;
}
