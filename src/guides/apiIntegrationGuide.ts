/**
 * API Integration Guide for Opulent Travels
 * 
 * This file provides step-by-step instructions on how to integrate
 * the REST API endpoints with your existing React components.
 */

// ============================================================================
// STEP 1: INSTALLATION AND SETUP
// ============================================================================

/*
1. Copy the following files to your project:
   - src/services/apiServices.ts
   - src/hooks/useApi.ts
   - src/examples/apiIntegrationExamples.tsx

2. Add environment variable to your .env file:
   REACT_APP_API_BASE_URL=http://localhost:3000

3. Update your package.json if needed:
   npm install @tanstack/react-query (optional, for advanced caching)
*/

// ============================================================================
// STEP 2: BASIC USAGE EXAMPLES
// ============================================================================

import React from 'react';
import { usePackages, useContactInquiry, useTestimonials } from '../hooks/useApi';

// Example 1: Simple Package List
export const SimplePackageList: React.FC = () => {
  const { data: packages, loading, error } = usePackages({ type: 'maldives' });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {packages?.map(pkg => (
        <div key={pkg.id}>
          <h3>{pkg.title}</h3>
          <p>{pkg.short_description}</p>
          <p>Price: ${pkg.price}</p>
        </div>
      ))}
    </div>
  );
};

// Example 2: Contact Form with API
export const SimpleContactForm: React.FC = () => {
  const { submitInquiry, loading, success, error } = useContactInquiry();

  const handleSubmit = async (formData: any) => {
    await submitInquiry({
      name: formData.name,
      email: formData.email,
      destination: 'maldives',
      message: formData.message
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      {success && <p>Message sent successfully!</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
};

// ============================================================================
// STEP 3: UPDATING YOUR EXISTING COMPONENTS
// ============================================================================

// Before: Your existing Packages component
/*
const Packages = () => {
  const packages = [
    { id: 1, title: "Maldives Paradise", price: "$3,999" },
    // ... hardcoded data
  ];
  
  return (
    <div>
      {packages.map(pkg => (
        <div key={pkg.id}>{pkg.title}</div>
      ))}
    </div>
  );
};
*/

// After: Updated Packages component with API
/*
import { usePackages } from '../hooks/useApi';

const Packages = () => {
  const { data: packages, loading, error, refetch } = usePackages({
    type: 'maldives',
    featured: true,
    limit: 6
  });

  if (loading) return <div>Loading packages...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {packages?.map(pkg => (
        <div key={pkg.id}>
          <h3>{pkg.title}</h3>
          <p>{pkg.short_description}</p>
          <p>Price: ${pkg.price}</p>
        </div>
      ))}
    </div>
  );
};
*/

// ============================================================================
// STEP 4: ADVANCED INTEGRATION PATTERNS
// ============================================================================

// Pattern 1: Search and Filter
export const SearchablePackages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'maldives' | 'srilanka' | 'all'>('all');

  const { data: packages, loading, refetch } = usePackages({
    type: selectedType,
    search: searchTerm,
    limit: 12
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search packages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as any)}>
        <option value="all">All Packages</option>
        <option value="maldives">Maldives</option>
        <option value="srilanka">Sri Lanka</option>
      </select>

      {/* Package list */}
    </div>
  );
};

// Pattern 2: Pagination
export const PaginatedPackages: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: packages, loading } = usePackages({
    page,
    limit
  });

  return (
    <div>
      {/* Package grid */}
      <div className="grid grid-cols-3 gap-4">
        {packages?.map(pkg => (
          <div key={pkg.id}>{pkg.title}</div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-8">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          onClick={() => setPage(page + 1)}
          disabled={!packages || packages.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Pattern 3: Real-time Updates
export const LiveTestimonials: React.FC = () => {
  const { data: testimonials, refetch } = useTestimonials({ verified: true });

  // Refresh testimonials every 30 seconds
  useEffect(() => {
    const interval = setInterval(refetch, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div>
      {testimonials?.map(testimonial => (
        <div key={testimonial.id}>
          <p>"{testimonial.text}"</p>
          <p>- {testimonial.name}</p>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// STEP 5: ERROR HANDLING AND LOADING STATES
// ============================================================================

export const RobustPackageList: React.FC = () => {
  const { data: packages, loading, error, refetch } = usePackages();

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3">Loading packages...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-600 mb-4">
          <h3 className="text-lg font-semibold">Failed to load packages</h3>
          <p>{error}</p>
        </div>
        <button 
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (!packages || packages.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">No packages found.</p>
      </div>
    );
  }

  // Success state
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map(pkg => (
        <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
          <p className="text-gray-600 mb-4">{pkg.short_description}</p>
          <p className="text-2xl font-bold text-blue-600">${pkg.price}</p>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// STEP 6: FORM INTEGRATION
// ============================================================================

export const ContactFormWithAPI: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });

  const { submitInquiry, loading, success, error, reset } = useContactInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination as any,
      message: formData.message
    });

    // Reset form on success
    if (success) {
      setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
      setTimeout(() => reset(), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Your Name"
        required
        className="w-full px-4 py-2 border rounded-lg"
      />
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Your Email"
        required
        className="w-full px-4 py-2 border rounded-lg"
      />

      <select
        name="destination"
        value={formData.destination}
        onChange={(e) => setFormData({...formData, destination: e.target.value})}
        required
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">Select Destination</option>
        <option value="maldives">Maldives</option>
        <option value="srilanka">Sri Lanka</option>
        <option value="combined">Combined Tour</option>
        <option value="custom">Custom Package</option>
      </select>

      <textarea
        name="message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        placeholder="Your Message"
        required
        rows={4}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {success && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Message sent successfully! We'll contact you soon.
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}
    </form>
  );
};

// ============================================================================
// STEP 7: TESTING YOUR INTEGRATION
// ============================================================================

/*
1. Start your development server:
   npm start

2. Test API endpoints:
   curl http://localhost:3000/api/health
   curl http://localhost:3000/api/packages

3. Check browser console for any errors

4. Test form submissions and verify data is being sent correctly

5. Test error scenarios by temporarily breaking the API
*/

// ============================================================================
// STEP 8: PRODUCTION CONSIDERATIONS
// ============================================================================

/*
1. Update API_BASE_URL for production:
   REACT_APP_API_BASE_URL=https://api.opulenttravels.com/v1

2. Add error monitoring (Sentry, LogRocket, etc.)

3. Implement caching for better performance

4. Add retry logic for failed requests

5. Consider using React Query for advanced caching and synchronization

6. Add loading skeletons for better UX

7. Implement offline support with service workers
*/

export default {
  SimplePackageList,
  SimpleContactForm,
  SearchablePackages,
  PaginatedPackages,
  LiveTestimonials,
  RobustPackageList,
  ContactFormWithAPI,
};
