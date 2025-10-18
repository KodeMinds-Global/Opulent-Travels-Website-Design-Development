/**
 * Custom React Hooks for API Integrations
 * 
 * This file contains custom React hooks that provide easy integration
 * with the Opulent Travels API endpoints. Each hook handles loading states,
 * error handling, and data management for specific API operations.
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  getPackages, 
  getPackageById, 
  getSriLankaPackages, 
  getMaldivesPackages, 
  getFeaturedPackages,
  submitContactInquiry,
  getContactInquiries,
  updateInquiryStatus,
  getTestimonials,
  submitTestimonial as submitTestimonialApi,
  getCarRentals,
  getCarRentalById,
  createBookingRequest,
  getBookingById,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getTermsAndConditions,
  healthCheck,
  getWebsiteStats,
  PackageFilters, 
  ContactInquiryData, 
  TestimonialData, 
  CarRentalFilters, 
  BookingRequestData, 
  ContactInquiryFilters 
} from '../services/apiServices';

// ============================================================================
// GENERIC API HOOK
// ============================================================================

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>;
  reset: () => void;
}

/**
 * Generic hook for API calls with loading, error, and success states
 */
function useApi<T>(
  apiCall: () => Promise<{ success: boolean; data?: T; error?: string }>,
  dependencies: any[] = []
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
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
          success: true,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Unknown error occurred',
          success: false,
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      });
    }
  }, dependencies);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  useEffect(() => {
    executeApiCall();
  }, [executeApiCall]);

  return {
    ...state,
    refetch: executeApiCall,
    reset,
  };
}

// ============================================================================
// PACKAGE HOOKS
// ============================================================================

/**
 * Hook to fetch all packages with filtering
 */
export function usePackages(filters: PackageFilters = {}) {
  return useApi(
    () => getPackages(filters),
    [JSON.stringify(filters)]
  );
}

/**
 * Hook to fetch a specific package by ID
 */
export function usePackage(id: string) {
  return useApi(
    () => getPackageById(id),
    [id]
  );
}

/**
 * Hook to fetch Sri Lanka packages
 */
export function useSriLankaPackages() {
  return useApi(() => getSriLankaPackages());
}

/**
 * Hook to fetch Maldives packages
 */
export function useMaldivesPackages() {
  return useApi(() => getMaldivesPackages());
}

/**
 * Hook to fetch featured packages
 */
export function useFeaturedPackages() {
  return useApi(() => getFeaturedPackages());
}

// ============================================================================
// CONTACT HOOKS
// ============================================================================

/**
 * Hook to submit contact inquiry
 */
export function useContactInquiry() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const submitInquiry = useCallback(async (data: ContactInquiryData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await submitContactInquiry(data);
      
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
          success: true,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Failed to submit inquiry',
          success: false,
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    submitInquiry,
    reset,
  };
}

/**
 * Hook to fetch contact inquiries (admin)
 */
export function useContactInquiries(filters: { status?: string; page?: number; limit?: number } = {}) {
  return useApi(
    () => getContactInquiries({ status: filters.status as 'new' | 'in_progress' | 'resolved', page: filters.page, limit: filters.limit }),
    [JSON.stringify(filters)]
  );
}

// ============================================================================
// TESTIMONIAL HOOKS
// ============================================================================

/**
 * Hook to fetch testimonials
 */
export function useTestimonials(filters: { verified?: boolean; packageId?: string; page?: number; limit?: number } = {}) {
  return useApi(
    () => getTestimonials(filters),
    [JSON.stringify(filters)]
  );
}

/**
 * Hook to submit testimonial
 */
export function useTestimonialSubmission() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const submitTestimonial = useCallback(async (data: TestimonialData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await submitTestimonialApi(data);
      
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
          success: true,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Failed to submit testimonial',
          success: false,
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    submitTestimonial,
    reset,
  };
}

// ============================================================================
// CAR RENTAL HOOKS
// ============================================================================

/**
 * Hook to fetch car rentals
 */
export function useCarRentals(filters: CarRentalFilters = {}) {
  return useApi(
    () => getCarRentals(filters),
    [JSON.stringify(filters)]
  );
}

/**
 * Hook to fetch a specific car rental by ID
 */
export function useCarRental(id: string) {
  return useApi(
    () => getCarRentalById(id),
    [id]
  );
}

// ============================================================================
// BOOKING HOOKS
// ============================================================================

/**
 * Hook to create booking request
 */
export function useBookingRequest() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const createBooking = useCallback(async (data: BookingRequestData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await createBookingRequest(data);
      
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
          success: true,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Failed to create booking',
          success: false,
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    createBooking,
    reset,
  };
}

/**
 * Hook to fetch booking by ID
 */
export function useBooking(id: string) {
  return useApi(
    () => getBookingById(id),
    [id]
  );
}

// ============================================================================
// NEWSLETTER HOOKS
// ============================================================================

/**
 * Hook to subscribe to newsletter
 */
export function useNewsletterSubscription() {
  const [state, setState] = useState<UseApiState<any>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const subscribe = useCallback(async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await subscribeToNewsletter(email);
      
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
          success: true,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Failed to subscribe',
          success: false,
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      });
    }
  }, []);

  const unsubscribe = useCallback(async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await unsubscribeFromNewsletter(email);
      
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
          success: true,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Failed to unsubscribe',
          success: false,
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    subscribe,
    unsubscribe,
    reset,
  };
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook to fetch terms and conditions
 */
export function useTermsAndConditions() {
  return useApi(() => getTermsAndConditions());
}

/**
 * Hook to check API health
 */
export function useHealthCheck() {
  return useApi(() => healthCheck());
}

/**
 * Hook to fetch website statistics
 */
export function useWebsiteStats() {
  return useApi(() => getWebsiteStats());
}

// ============================================================================
// EXPORT ALL HOOKS
// ============================================================================

export const apiHooks = {
  // Package hooks
  usePackages,
  usePackage,
  useSriLankaPackages,
  useMaldivesPackages,
  useFeaturedPackages,
  
  // Contact hooks
  useContactInquiry,
  useContactInquiries,
  
  // Testimonial hooks
  useTestimonials,
  useTestimonialSubmission,
  
  // Car rental hooks
  useCarRentals,
  useCarRental,
  
  // Booking hooks
  useBookingRequest,
  useBooking,
  
  // Newsletter hooks
  useNewsletterSubscription,
  
  // Utility hooks
  useTermsAndConditions,
  useHealthCheck,
  useWebsiteStats,
};

export default apiHooks;
