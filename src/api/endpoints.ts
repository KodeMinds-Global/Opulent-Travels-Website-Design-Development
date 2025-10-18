/**
 * REST API Endpoints for Opulent Travels Website
 * 
 * This file contains all the necessary REST API endpoints for the travel website
 * including package management, contact forms, testimonials, car rentals, and more.
 */

import { Package, SriLankaPackage, MaldivesPackage, TermsAndConditions } from '../types/package';
import { allPackages, sriLankaPackages, maldivesPackages } from '../data/packages';
import { sriLankaTermsAndConditions } from '../data/termsAndConditions';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  destination: 'maldives' | 'srilanka' | 'combined' | 'custom';
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  packageId?: string;
  verified: boolean;
  createdAt: string;
}

export interface CarRental {
  id: string;
  name: string;
  category: 'economy' | 'luxury' | 'suv' | 'premium';
  image: string;
  pricePerDay: number;
  features: string[];
  availability: boolean;
  description: string;
  specifications: {
    seats: number;
    transmission: 'manual' | 'automatic';
    fuelType: 'petrol' | 'diesel' | 'hybrid';
    airConditioning: boolean;
    gps: boolean;
  };
}

export interface BookingRequest {
  id: string;
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
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// PACKAGE ENDPOINTS
// ============================================================================

/**
 * GET /api/packages
 * Get all travel packages with optional filtering
 */
export const getPackages = async (params?: {
  type?: 'sriLanka' | 'maldives' | 'all';
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<Package[]>> => {
  try {
    let packages = allPackages;
    
    // Filter by type
    if (params?.type && params.type !== 'all') {
      packages = params.type === 'sriLanka' ? sriLankaPackages : maldivesPackages;
    }
    
    // Filter by featured
    if (params?.featured !== undefined) {
      packages = packages.filter(pkg => pkg.featured === params.featured);
    }
    
    // Search filter
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      packages = packages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm) ||
        pkg.short_description.toLowerCase().includes(searchTerm) ||
        pkg.long_description.toLowerCase().includes(searchTerm) ||
        pkg.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm)) ||
        (pkg.type === 'sriLanka' && pkg.locations.some(location => 
          location.toLowerCase().includes(searchTerm)
        )) ||
        (pkg.type === 'maldives' && pkg.resort_name.toLowerCase().includes(searchTerm))
      );
    }
    
    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPackages = packages.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedPackages,
      pagination: {
        page,
        limit,
        total: packages.length,
        totalPages: Math.ceil(packages.length / limit)
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch packages'
    };
  }
};

/**
 * GET /api/packages/:id
 * Get a specific package by ID
 */
export const getPackageById = async (id: string): Promise<ApiResponse<Package>> => {
  try {
    const packageData = allPackages.find(pkg => pkg.id === id);
    
    if (!packageData) {
      return {
        success: false,
        error: 'Package not found'
      };
    }
    
    return {
      success: true,
      data: packageData
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch package'
    };
  }
};

/**
 * GET /api/packages/sri-lanka
 * Get all Sri Lanka packages
 */
export const getSriLankaPackages = async (): Promise<ApiResponse<SriLankaPackage[]>> => {
  try {
    return {
      success: true,
      data: sriLankaPackages
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch Sri Lanka packages'
    };
  }
};

/**
 * GET /api/packages/maldives
 * Get all Maldives packages
 */
export const getMaldivesPackages = async (): Promise<ApiResponse<MaldivesPackage[]>> => {
  try {
    return {
      success: true,
      data: maldivesPackages
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch Maldives packages'
    };
  }
};

/**
 * GET /api/packages/featured
 * Get featured packages
 */
export const getFeaturedPackages = async (): Promise<ApiResponse<Package[]>> => {
  try {
    const featuredPackages = allPackages.filter(pkg => pkg.featured);
    return {
      success: true,
      data: featuredPackages
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch featured packages'
    };
  }
};

// ============================================================================
// CONTACT & INQUIRY ENDPOINTS
// ============================================================================

/**
 * POST /api/contact/inquiry
 * Submit a contact inquiry
 */
export const submitContactInquiry = async (inquiry: Omit<ContactInquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ContactInquiry>> => {
  try {
    const newInquiry: ContactInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...inquiry,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real application, you would save this to a database
    // For now, we'll simulate success
    console.log('New inquiry received:', newInquiry);
    
    return {
      success: true,
      data: newInquiry,
      message: 'Your inquiry has been submitted successfully. We will contact you soon.'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to submit inquiry'
    };
  }
};

/**
 * GET /api/contact/inquiries
 * Get all contact inquiries (admin only)
 */
export const getContactInquiries = async (params?: {
  status?: 'new' | 'in_progress' | 'resolved';
  page?: number;
  limit?: number;
}): Promise<ApiResponse<ContactInquiry[]>> => {
  try {
    // In a real application, you would fetch from database
    // This is a placeholder response
    const mockInquiries: ContactInquiry[] = [];
    
    return {
      success: true,
      data: mockInquiries,
      message: 'Inquiries retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch inquiries'
    };
  }
};

/**
 * PUT /api/contact/inquiries/:id
 * Update inquiry status (admin only)
 */
export const updateInquiryStatus = async (id: string, status: ContactInquiry['status']): Promise<ApiResponse<ContactInquiry>> => {
  try {
    // In a real application, you would update the database
    return {
      success: true,
      message: 'Inquiry status updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update inquiry status'
    };
  }
};

// ============================================================================
// TESTIMONIAL ENDPOINTS
// ============================================================================

/**
 * GET /api/testimonials
 * Get all testimonials
 */
export const getTestimonials = async (params?: {
  verified?: boolean;
  packageId?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<Testimonial[]>> => {
  try {
    // Mock testimonials data
    const mockTestimonials: Testimonial[] = [
      {
        id: 'test_1',
        name: 'Sarah Johnson',
        location: 'New York, USA',
        rating: 5,
        text: 'Absolutely breathtaking experience! The Maldives package exceeded all expectations. Every detail was perfectly orchestrated.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop',
        packageId: 'mv-001',
        verified: true,
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 'test_2',
        name: 'Michael Chen',
        location: 'London, UK',
        rating: 5,
        text: 'The Sri Lanka cultural tour was phenomenal. Our guide\'s knowledge and the luxury accommodations made it unforgettable.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        packageId: 'sl-001',
        verified: true,
        createdAt: '2024-01-20T14:45:00Z'
      },
      {
        id: 'test_3',
        name: 'Emma Williams',
        location: 'Sydney, Australia',
        rating: 5,
        text: 'Opulent Travels delivered beyond our wildest dreams. The combined tour was seamlessly executed with luxury at every turn.',
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=300&auto=format&fit=crop',
        verified: true,
        createdAt: '2024-02-01T09:15:00Z'
      }
    ];
    
    let filteredTestimonials = mockTestimonials;
    
    // Filter by verification status
    if (params?.verified !== undefined) {
      filteredTestimonials = filteredTestimonials.filter(testimonial => testimonial.verified === params.verified);
    }
    
    // Filter by package ID
    if (params?.packageId) {
      filteredTestimonials = filteredTestimonials.filter(testimonial => testimonial.packageId === params.packageId);
    }
    
    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedTestimonials,
      pagination: {
        page,
        limit,
        total: filteredTestimonials.length,
        totalPages: Math.ceil(filteredTestimonials.length / limit)
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch testimonials'
    };
  }
};

/**
 * POST /api/testimonials
 * Submit a new testimonial
 */
export const submitTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'verified' | 'createdAt'>): Promise<ApiResponse<Testimonial>> => {
  try {
    const newTestimonial: Testimonial = {
      id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...testimonial,
      verified: false, // Requires admin approval
      createdAt: new Date().toISOString()
    };
    
    // In a real application, you would save this to a database
    console.log('New testimonial submitted:', newTestimonial);
    
    return {
      success: true,
      data: newTestimonial,
      message: 'Thank you for your testimonial! It will be reviewed and published soon.'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to submit testimonial'
    };
  }
};

// ============================================================================
// CAR RENTAL ENDPOINTS
// ============================================================================

/**
 * GET /api/car-rentals
 * Get all available car rentals
 */
export const getCarRentals = async (params?: {
  category?: 'economy' | 'luxury' | 'suv' | 'premium';
  available?: boolean;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<CarRental[]>> => {
  try {
    const mockCarRentals: CarRental[] = [
      {
        id: 'car_1',
        name: 'Toyota Corolla',
        category: 'economy',
        image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=2940&auto=format&fit=crop',
        pricePerDay: 25,
        features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'Fuel Efficient'],
        availability: true,
        description: 'Perfect for city driving and short trips. Comfortable and fuel-efficient.',
        specifications: {
          seats: 5,
          transmission: 'automatic',
          fuelType: 'petrol',
          airConditioning: true,
          gps: true
        }
      },
      {
        id: 'car_2',
        name: 'BMW X5',
        category: 'luxury',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2940&auto=format&fit=crop',
        pricePerDay: 85,
        features: ['Luxury Interior', 'Premium Sound System', 'Leather Seats', 'Sunroof'],
        availability: true,
        description: 'Luxury SUV perfect for family trips and exploring Sri Lanka in style.',
        specifications: {
          seats: 7,
          transmission: 'automatic',
          fuelType: 'petrol',
          airConditioning: true,
          gps: true
        }
      },
      {
        id: 'car_3',
        name: 'Mercedes-Benz E-Class',
        category: 'premium',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2940&auto=format&fit=crop',
        pricePerDay: 65,
        features: ['Premium Interior', 'Advanced Safety', 'Comfort Seats', 'Climate Control'],
        availability: true,
        description: 'Premium sedan offering comfort and elegance for business and leisure travel.',
        specifications: {
          seats: 5,
          transmission: 'automatic',
          fuelType: 'petrol',
          airConditioning: true,
          gps: true
        }
      }
    ];
    
    let filteredCars = mockCarRentals;
    
    // Filter by category
    if (params?.category) {
      filteredCars = filteredCars.filter(car => car.category === params.category);
    }
    
    // Filter by availability
    if (params?.available !== undefined) {
      filteredCars = filteredCars.filter(car => car.availability === params.available);
    }
    
    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCars = filteredCars.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedCars,
      pagination: {
        page,
        limit,
        total: filteredCars.length,
        totalPages: Math.ceil(filteredCars.length / limit)
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch car rentals'
    };
  }
};

/**
 * GET /api/car-rentals/:id
 * Get a specific car rental by ID
 */
export const getCarRentalById = async (id: string): Promise<ApiResponse<CarRental>> => {
  try {
    // Mock data - in real app, fetch from database
    const mockCars: CarRental[] = [
      {
        id: 'car_1',
        name: 'Toyota Corolla',
        category: 'economy',
        image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=2940&auto=format&fit=crop',
        pricePerDay: 25,
        features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'Fuel Efficient'],
        availability: true,
        description: 'Perfect for city driving and short trips. Comfortable and fuel-efficient.',
        specifications: {
          seats: 5,
          transmission: 'automatic',
          fuelType: 'petrol',
          airConditioning: true,
          gps: true
        }
      }
    ];
    
    const car = mockCars.find(c => c.id === id);
    
    if (!car) {
      return {
        success: false,
        error: 'Car rental not found'
      };
    }
    
    return {
      success: true,
      data: car
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch car rental'
    };
  }
};

// ============================================================================
// BOOKING ENDPOINTS
// ============================================================================

/**
 * POST /api/bookings
 * Create a new booking request
 */
export const createBookingRequest = async (booking: Omit<BookingRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<BookingRequest>> => {
  try {
    const newBooking: BookingRequest = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...booking,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real application, you would save this to a database
    console.log('New booking request:', newBooking);
    
    return {
      success: true,
      data: newBooking,
      message: 'Your booking request has been submitted successfully. We will contact you to confirm the details.'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create booking request'
    };
  }
};

/**
 * GET /api/bookings/:id
 * Get booking details by ID
 */
export const getBookingById = async (id: string): Promise<ApiResponse<BookingRequest>> => {
  try {
    // In a real application, you would fetch from database
    return {
      success: false,
      error: 'Booking not found'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch booking'
    };
  }
};

// ============================================================================
// NEWSLETTER ENDPOINTS
// ============================================================================

/**
 * POST /api/newsletter/subscribe
 * Subscribe to newsletter
 */
export const subscribeToNewsletter = async (email: string): Promise<ApiResponse<NewsletterSubscription>> => {
  try {
    const subscription: NewsletterSubscription = {
      id: `newsletter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      subscribed: true,
      subscribedAt: new Date().toISOString()
    };
    
    // In a real application, you would save this to a database
    console.log('Newsletter subscription:', subscription);
    
    return {
      success: true,
      data: subscription,
      message: 'Successfully subscribed to our newsletter!'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to subscribe to newsletter'
    };
  }
};

/**
 * POST /api/newsletter/unsubscribe
 * Unsubscribe from newsletter
 */
export const unsubscribeFromNewsletter = async (email: string): Promise<ApiResponse<NewsletterSubscription>> => {
  try {
    // In a real application, you would update the database
    return {
      success: true,
      message: 'Successfully unsubscribed from our newsletter.'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to unsubscribe from newsletter'
    };
  }
};

// ============================================================================
// TERMS AND CONDITIONS ENDPOINTS
// ============================================================================

/**
 * GET /api/terms-and-conditions
 * Get terms and conditions
 */
export const getTermsAndConditions = async (): Promise<ApiResponse<TermsAndConditions>> => {
  try {
    return {
      success: true,
      data: sriLankaTermsAndConditions
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch terms and conditions'
    };
  }
};

// ============================================================================
// UTILITY ENDPOINTS
// ============================================================================

/**
 * GET /api/health
 * Health check endpoint
 */
export const healthCheck = async (): Promise<ApiResponse<{ status: string; timestamp: string }>> => {
  try {
    return {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Health check failed'
    };
  }
};

/**
 * GET /api/stats
 * Get website statistics
 */
export const getWebsiteStats = async (): Promise<ApiResponse<{
  totalPackages: number;
  totalTestimonials: number;
  totalBookings: number;
  totalInquiries: number;
}>> => {
  try {
    return {
      success: true,
      data: {
        totalPackages: allPackages.length,
        totalTestimonials: 3, // Mock data
        totalBookings: 0, // Mock data
        totalInquiries: 0 // Mock data
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch website statistics'
    };
  }
};

// ============================================================================
// EXPORT ALL ENDPOINTS
// ============================================================================

export const apiEndpoints = {
  // Package endpoints
  getPackages,
  getPackageById,
  getSriLankaPackages,
  getMaldivesPackages,
  getFeaturedPackages,
  
  // Contact endpoints
  submitContactInquiry,
  getContactInquiries,
  updateInquiryStatus,
  
  // Testimonial endpoints
  getTestimonials,
  submitTestimonial,
  
  // Car rental endpoints
  getCarRentals,
  getCarRentalById,
  
  // Booking endpoints
  createBookingRequest,
  getBookingById,
  
  // Newsletter endpoints
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  
  // Terms and conditions
  getTermsAndConditions,
  
  // Utility endpoints
  healthCheck,
  getWebsiteStats
};

export default apiEndpoints;
