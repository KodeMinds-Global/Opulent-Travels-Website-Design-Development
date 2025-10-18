/**
 * API Client Utility for Opulent Travels
 * 
 * This utility provides a convenient way to interact with the Opulent Travels API
 * with built-in error handling, request/response transformation, and TypeScript support.
 */

import { apiEndpoints, ApiResponse, ContactInquiry, Testimonial, CarRental, BookingRequest, NewsletterSubscription } from './endpoints';

// ============================================================================
// API CLIENT CONFIGURATION
// ============================================================================

export interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export class ApiClient {
  private config: ApiClientConfig;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 10000,
      retries: 3,
      headers: {},
      ...config
    };
    
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...this.config.headers
    };
  }

  // ============================================================================
  // HTTP METHODS
  // ============================================================================

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      
      throw new Error('Unknown error occurred');
    }
  }

  private async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.config.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.request<T>(url.pathname + url.search);
  }

  private async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  private async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  private async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE'
    });
  }

  // ============================================================================
  // PACKAGE METHODS
  // ============================================================================

  async getPackages(params?: {
    type?: 'sriLanka' | 'maldives' | 'all';
    featured?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    return this.get('/api/packages', params);
  }

  async getPackageById(id: string) {
    return this.get(`/api/packages/${id}`);
  }

  async getSriLankaPackages() {
    return this.get('/api/packages/sri-lanka');
  }

  async getMaldivesPackages() {
    return this.get('/api/packages/maldives');
  }

  async getFeaturedPackages() {
    return this.get('/api/packages/featured');
  }

  // ============================================================================
  // CONTACT METHODS
  // ============================================================================

  async submitContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
    return this.post('/api/contact/inquiry', inquiry);
  }

  async getContactInquiries(params?: {
    status?: 'new' | 'in_progress' | 'resolved';
    page?: number;
    limit?: number;
  }) {
    return this.get('/api/contact/inquiries', params);
  }

  async updateInquiryStatus(id: string, status: ContactInquiry['status']) {
    return this.put(`/api/contact/inquiries/${id}`, { status });
  }

  // ============================================================================
  // TESTIMONIAL METHODS
  // ============================================================================

  async getTestimonials(params?: {
    verified?: boolean;
    packageId?: string;
    page?: number;
    limit?: number;
  }) {
    return this.get('/api/testimonials', params);
  }

  async submitTestimonial(testimonial: Omit<Testimonial, 'id' | 'verified' | 'createdAt'>) {
    return this.post('/api/testimonials', testimonial);
  }

  // ============================================================================
  // CAR RENTAL METHODS
  // ============================================================================

  async getCarRentals(params?: {
    category?: 'economy' | 'luxury' | 'suv' | 'premium';
    available?: boolean;
    page?: number;
    limit?: number;
  }) {
    return this.get('/api/car-rentals', params);
  }

  async getCarRentalById(id: string) {
    return this.get(`/api/car-rentals/${id}`);
  }

  // ============================================================================
  // BOOKING METHODS
  // ============================================================================

  async createBookingRequest(booking: Omit<BookingRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
    return this.post('/api/bookings', booking);
  }

  async getBookingById(id: string) {
    return this.get(`/api/bookings/${id}`);
  }

  // ============================================================================
  // NEWSLETTER METHODS
  // ============================================================================

  async subscribeToNewsletter(email: string) {
    return this.post('/api/newsletter/subscribe', { email });
  }

  async unsubscribeFromNewsletter(email: string) {
    return this.post('/api/newsletter/unsubscribe', { email });
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  async getTermsAndConditions() {
    return this.get('/api/terms-and-conditions');
  }

  async healthCheck() {
    return this.get('/api/health');
  }

  async getWebsiteStats() {
    return this.get('/api/stats');
  }
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Create a new API client instance
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}

/**
 * Default API client instance
 */
export const defaultApiClient = new ApiClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
});

// ============================================================================
// REACT HOOKS (Optional - for React applications)
// ============================================================================

import { useState, useEffect, useCallback } from 'react';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false
  });

  const executeApiCall = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall();
      
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
          success: true
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Unknown error occurred',
          success: false
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false
      });
    }
  }, dependencies);

  useEffect(() => {
    executeApiCall();
  }, [executeApiCall]);

  return {
    ...state,
    refetch: executeApiCall
  };
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/*
// Basic usage
const apiClient = createApiClient({
  baseUrl: 'https://api.opulenttravels.com/v1'
});

// Get packages
const packages = await apiClient.getPackages({ type: 'maldives', featured: true });

// Submit contact inquiry
const inquiry = await apiClient.submitContactInquiry({
  name: 'John Doe',
  email: 'john@example.com',
  destination: 'maldives',
  message: 'I\'m interested in your luxury packages'
});

// React hook usage
function PackagesList() {
  const { data: packages, loading, error, refetch } = useApi(
    () => apiClient.getPackages({ type: 'maldives' }),
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {packages?.map(pkg => (
        <div key={pkg.id}>{pkg.title}</div>
      ))}
    </div>
  );
}
*/

export default ApiClient;
