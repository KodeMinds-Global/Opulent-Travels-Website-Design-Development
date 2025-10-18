/**
 * API Integration Examples for Opulent Travels Components
 * 
 * This file contains practical examples of how to integrate the API endpoints
 * with your existing React components. Each example shows the complete
 * implementation with error handling, loading states, and user feedback.
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePackages, useContactInquiry, useTestimonials, useCarRentals, useBookingRequest, useNewsletterSubscription } from '../hooks/useApi';
import { Package } from '@/types/package';
import { CarRental, Testimonial } from '@/api/endpoints';

// ============================================================================
// EXAMPLE 1: UPDATED PACKAGES COMPONENT
// ============================================================================

interface UpdatedPackagesProps {
  activeFilter: 'maldives' | 'sriLanka' | 'all';
}

export const UpdatedPackages: React.FC<UpdatedPackagesProps> = ({ activeFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the API hook with filtering
  const { data: packages, loading, error, refetch } = usePackages({
    type: activeFilter,
    featured: true,
    search: searchTerm,
    limit: 6
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">Error loading packages: {error}</p>
        <Button onClick={refetch} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <section id="packages" className="py-16 bg-white dark:bg-gradient-to-br dark:from-dark-background dark:via-dark-surface dark:to-dark-primary/10 relative">
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.isArray(packages) && packages.map((pkg: Package) => (
            <div key={pkg.id} className="luxury-card hover-lift group transition-all duration-1000 backdrop-blur-sm dark:bg-dark-surface/60 dark:border dark:border-dark-primary/20 mx-auto">
              {/* Package Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={pkg.image_url}
                  alt={pkg.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                  <div className="font-bold text-luxury-gold dark:text-dark-accent">${pkg.price}</div>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-4">
                <h3 className="font-playfair font-bold text-xl text-luxury-charcoal dark:text-white mb-1.5">
                  {pkg.title}
                </h3>
                
                <p className="font-montserrat text-luxury-teal dark:text-dark-accent text-sm font-medium mb-3">
                  {pkg.duration}
                </p>

                <p className="font-lora text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {pkg.short_description}
                </p>

                <Button className="w-full teal-button dark:dark-button group-hover:scale-105 transition-transform duration-300 text-sm py-1.5">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="mt-12 flex justify-center">
          <Button 
            onClick={refetch}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-teal-400 dark:hover:from-blue-600 dark:hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            Load More Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// EXAMPLE 2: UPDATED CONTACT COMPONENT
// ============================================================================

export const UpdatedContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });

  // Use the contact inquiry hook
  const { submitInquiry, loading, error, success, reset } = useContactInquiry();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.destination || !formData.message) {
      return;
    }

    await submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination as 'maldives' | 'srilanka' | 'combined' | 'custom',
      message: formData.message
    });

    // Reset form on success
    if (success) {
      setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
      setTimeout(() => reset(), 3000); // Reset success state after 3 seconds
    }
  };

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4 text-gray-900 dark:text-white">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Luxury Journey</span> Today
          </h2>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            <p className="font-medium">Thank you for your inquiry! We will contact you soon.</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                      Your Name
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                      Phone Number
                    </label>
                  </div>

                  <div className="relative group">
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors appearance-none"
                    >
                      <option value="" disabled>Select Destination</option>
                      <option value="maldives">Maldives</option>
                      <option value="srilanka">Sri Lanka</option>
                      <option value="combined">Combined Tour</option>
                      <option value="custom">Custom Package</option>
                    </select>
                    <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                      Preferred Destination
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors resize-none"
                    placeholder=" "
                  ></textarea>
                  <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                    Tell us about your dream vacation...
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="relative py-3 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-medium"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl mb-4">Contact Information</h3>
              <div className="space-y-3">
                <p><strong>Phone:</strong> +94 771234567</p>
                <p><strong>Email:</strong> info@opulenttravels.com</p>
                <p><strong>Address:</strong> 123 Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// EXAMPLE 3: UPDATED TESTIMONIALS COMPONENT
// ============================================================================

export const UpdatedTestimonials: React.FC = () => {
  // Use the testimonials hook
  const { data: testimonials, loading, error, refetch } = useTestimonials({
    verified: true,
    limit: 6
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">Error loading testimonials: {error}</p>
        <Button onClick={refetch} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4 text-gray-900 dark:text-white">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(testimonials) && testimonials.map((testimonial: Testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              
              <blockquote className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.text}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// EXAMPLE 4: UPDATED CAR RENTAL COMPONENT
// ============================================================================

export const UpdatedCarRentals: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Use the car rentals hook
  const { data: carRentals, loading, error, refetch } = useCarRentals({
    category: selectedCategory as any,
    available: true,
    limit: 6
  });

  const categories = [
    { id: '', label: 'All Categories' },
    { id: 'economy', label: 'Economy' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'suv', label: 'SUV' },
    { id: 'premium', label: 'Premium' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">Error loading car rentals: {error}</p>
        <Button onClick={refetch} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <section id="car-rentals" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4 text-gray-900 dark:text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Fleet</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(carRentals) && carRentals.map((car: CarRental) => (
            <div key={car.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{car.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{car.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {car.features.map((feature: string, index: number) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${car.pricePerDay}/day
                  </span>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// EXAMPLE 5: BOOKING FORM COMPONENT
// ============================================================================

interface BookingFormProps {
  packageId: string;
  packageTitle: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ packageId, packageTitle }) => {
  const [formData, setFormData] = useState({
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      nationality: ''
    },
    travelDetails: {
      departureDate: '',
      returnDate: '',
      adults: 1,
      children: 0,
      infants: 0
    },
    preferences: {
      hotelCategory: '3Star' as '3Star' | '3.5Star' | '4Star' | '5Star',
      specialRequests: ''
    }
  });

  // Use the booking request hook
  const { createBooking, loading, error, success, reset } = useBookingRequest();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createBooking({
      packageId,
      ...formData
    });

    if (success) {
      setTimeout(() => reset(), 5000); // Reset success state after 5 seconds
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Book: {packageTitle}
      </h2>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          <p className="font-medium">Booking request submitted successfully! We will contact you soon.</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Customer Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="customerInfo.name"
              value={formData.customerInfo.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              name="customerInfo.email"
              value={formData.customerInfo.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="tel"
              name="customerInfo.phone"
              value={formData.customerInfo.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="customerInfo.nationality"
              value={formData.customerInfo.nationality}
              onChange={handleInputChange}
              placeholder="Nationality"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Travel Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Travel Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="date"
              name="travelDetails.departureDate"
              value={formData.travelDetails.departureDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="date"
              name="travelDetails.returnDate"
              value={formData.travelDetails.returnDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              name="travelDetails.adults"
              value={formData.travelDetails.adults}
              onChange={handleInputChange}
              min="1"
              placeholder="Adults"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              name="travelDetails.children"
              value={formData.travelDetails.children}
              onChange={handleInputChange}
              min="0"
              placeholder="Children"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preferences</h3>
          <div className="space-y-4">
            <select
              name="preferences.hotelCategory"
              value={formData.preferences.hotelCategory}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="3Star">3 Star Hotel</option>
              <option value="3.5Star">3.5 Star Hotel</option>
              <option value="4Star">4 Star Hotel</option>
              <option value="5Star">5 Star Hotel</option>
            </select>
            <textarea
              name="preferences.specialRequests"
              value={formData.preferences.specialRequests}
              onChange={handleInputChange}
              placeholder="Special Requests (Optional)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          {loading ? 'Submitting...' : 'Submit Booking Request'}
        </Button>
      </form>
    </div>
  );
};

// ============================================================================
// EXAMPLE 6: NEWSLETTER SUBSCRIPTION COMPONENT
// ============================================================================

export const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  
  // Use the newsletter subscription hook
  const { subscribe, loading, error, success, reset } = useNewsletterSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    await subscribe(email);
    
    if (success) {
      setEmail('');
      setTimeout(() => reset(), 3000); // Reset success state after 3 seconds
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-white text-center">
      <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
      <p className="mb-6">Subscribe to our newsletter for the latest travel deals and updates.</p>
      
      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-medium">Successfully subscribed!</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
        />
        <Button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
};

// ============================================================================
// EXPORT ALL EXAMPLES
// ============================================================================

export const apiIntegrationExamples = {
  UpdatedPackages,
  UpdatedContact,
  UpdatedTestimonials,
  UpdatedCarRentals,
  BookingForm,
  NewsletterSubscription,
};

export default apiIntegrationExamples;
