/**
 * API Service Layer for Opulent Travels
 * 
 * This file contains all the API service functions that integrate with the REST API endpoints
 * documented in API_DOCUMENTATION.md. Each function handles the API communication,
 * error handling, and data transformation.
 */

import { ApiResponse } from '@/api/endpoints';

// ============================================================================
// API CONFIGURATION
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generic API request function with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Build query string from parameters
 */
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

// ============================================================================
// PACKAGE API SERVICES
// ============================================================================

export interface PackageFilters {
  type?: 'sriLanka' | 'maldives' | 'all';
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Get all packages with optional filtering
 */
export async function getPackages(filters: PackageFilters = {}): Promise<ApiResponse<any[]>> {
  const queryString = buildQueryString(filters);
  return apiRequest(`/api/packages/${queryString}`);
}

/**
 * Get a specific package by ID
 */
export async function getPackageById(id: string): Promise<ApiResponse<any>> {
  return apiRequest(`/api/packages/${id}`);
}

/**
 * Get all Sri Lanka packages
 */
export async function getSriLankaPackages(): Promise<ApiResponse<any[]>> {
  return apiRequest('/api/packages/sri_lanka/');
}

/**
 * Get all Maldives packages
 */
export async function getMaldivesPackages(): Promise<ApiResponse<any[]>> {
  return apiRequest('/api/packages/maldives/');
}

/**
 * Get featured packages
 */
export async function getFeaturedPackages(): Promise<ApiResponse<any[]>> {
  return apiRequest('/api/packages/featured/');
}

// ============================================================================
// CONTACT API SERVICES
// ============================================================================

export interface ContactInquiryData {
  name: string;
  email: string;
  phone?: string;
  destination: 'maldives' | 'srilanka' | 'combined' | 'custom';
  message: string;
}

export interface ContactInquiryFilters {
  status?: 'new' | 'in_progress' | 'resolved';
  page?: number;
  limit?: number;
}

/**
 * Submit a contact inquiry
 */
export async function submitContactInquiry(data: ContactInquiryData): Promise<ApiResponse<any>> {
  return apiRequest('/api/contact/inquiry/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get all contact inquiries (admin only)
 */
export async function getContactInquiries(filters: ContactInquiryFilters = {}): Promise<ApiResponse<any[]>> {
  const queryString = buildQueryString(filters);
  return apiRequest(`/api/contact/inquiries${queryString}`);
}

/**
 * Update inquiry status (admin only)
 */
export async function updateInquiryStatus(id: string, status: 'new' | 'in_progress' | 'resolved'): Promise<ApiResponse<any>> {
  return apiRequest(`/api/contact/inquiries/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

// ============================================================================
// TESTIMONIAL API SERVICES
// ============================================================================

export interface TestimonialData {
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  packageId?: string;
}

export interface TestimonialFilters {
  verified?: boolean;
  packageId?: string;
  page?: number;
  limit?: number;
}

/**
 * Get testimonials with optional filtering
 */
export async function getTestimonials(filters: TestimonialFilters = {}): Promise<ApiResponse<any[]>> {
  const queryString = buildQueryString(filters);
  return apiRequest(`/api/testimonials${queryString}`);
}

/**
 * Submit a new testimonial
 */
export async function submitTestimonial(data: TestimonialData): Promise<ApiResponse<any>> {
  return apiRequest('/api/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================================================
// CAR RENTAL API SERVICES
// ============================================================================

export interface CarRentalFilters {
  category?: 'economy' | 'luxury' | 'suv' | 'premium';
  available?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Get car rentals with optional filtering
 */
export async function getCarRentals(filters: CarRentalFilters = {}): Promise<ApiResponse<any[]>> {
  const queryString = buildQueryString(filters);
  return apiRequest(`/api/car-rentals${queryString}`);
}

/**
 * Get a specific car rental by ID
 */
export async function getCarRentalById(id: string): Promise<ApiResponse<any>> {
  return apiRequest(`/api/car-rentals/${id}`);
}

// ============================================================================
// BOOKING API SERVICES
// ============================================================================

export interface BookingRequestData {
  packageId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    nationality: string;
  };
  travelDetails: {
    departureDate: string;
    returnDate: string;
    adults: number;
    children: number;
    infants: number;
  };
  preferences: {
    hotelCategory: '3Star' | '3.5Star' | '4Star' | '5Star';
    specialRequests?: string;
  };
}

/**
 * Create a new booking request
 */
export async function createBookingRequest(data: BookingRequestData): Promise<ApiResponse<any>> {
  return apiRequest('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get booking details by ID
 */
export async function getBookingById(id: string): Promise<ApiResponse<any>> {
  return apiRequest(`/api/bookings/${id}`);
}

// ============================================================================
// NEWSLETTER API SERVICES
// ============================================================================

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(email: string): Promise<ApiResponse<any>> {
  return apiRequest('/api/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribeFromNewsletter(email: string): Promise<ApiResponse<any>> {
  return apiRequest('/api/newsletter/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// ============================================================================
// UTILITY API SERVICES
// ============================================================================

/**
 * Get terms and conditions
 */
export async function getTermsAndConditions(): Promise<ApiResponse<any>> {
  return apiRequest('/api/terms-and-conditions');
}

/**
 * Health check
 */
export async function healthCheck(): Promise<ApiResponse<any>> {
  return apiRequest('/api/health');
}

/**
 * Get website statistics
 */
export async function getWebsiteStats(): Promise<ApiResponse<any>> {
  return apiRequest('/api/stats');
}

// ============================================================================
// EXPORT ALL SERVICES
// ============================================================================

export const apiServices = {
  // Package services
  getPackages,
  getPackageById,
  getSriLankaPackages,
  getMaldivesPackages,
  getFeaturedPackages,
  
  // Contact services
  submitContactInquiry,
  getContactInquiries,
  updateInquiryStatus,
  
  // Testimonial services
  getTestimonials,
  submitTestimonial,
  
  // Car rental services
  getCarRentals,
  getCarRentalById,
  
  // Booking services
  createBookingRequest,
  getBookingById,
  
  // Newsletter services
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  
  // Utility services
  getTermsAndConditions,
  healthCheck,
  getWebsiteStats,
};

export default apiServices;
