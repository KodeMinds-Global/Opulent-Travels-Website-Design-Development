# API Integration Guide for Opulent Travels

This guide provides comprehensive instructions for integrating the REST API endpoints with your React application.

## 📁 Files Created

The following files have been created to support API integration:

```
src/
├── api/
│   ├── endpoints.ts          # Complete API endpoint implementations
│   └── client.ts             # API client utility with React hooks
├── services/
│   └── apiServices.ts         # Service layer for all API calls
├── hooks/
│   └── useApi.ts             # Custom React hooks for API integration
├── examples/
│   └── apiIntegrationExamples.tsx  # Complete component examples
└── guides/
    └── apiIntegrationGuide.ts     # Step-by-step integration guide
```

## 🚀 Quick Start

### 1. Environment Setup

Add the following to your `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:3000
```

### 2. Basic Usage

```tsx
import { usePackages, useContactInquiry } from './hooks/useApi';

function MyComponent() {
  // Fetch packages
  const { data: packages, loading, error } = usePackages({ type: 'maldives' });
  
  // Contact form
  const { submitInquiry, loading: submitting } = useContactInquiry();
  
  const handleSubmit = async (formData) => {
    await submitInquiry({
      name: formData.name,
      email: formData.email,
      destination: 'maldives',
      message: formData.message
    });
  };
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {packages?.map(pkg => (
        <div key={pkg.id}>{pkg.title}</div>
      ))}
    </div>
  );
}
```

## 📋 Available API Endpoints

### Package Management
- `GET /api/packages` - Get all packages with filtering
- `GET /api/packages/:id` - Get specific package
- `GET /api/packages/sri-lanka` - Get Sri Lanka packages
- `GET /api/packages/maldives` - Get Maldives packages
- `GET /api/packages/featured` - Get featured packages

### Contact & Inquiries
- `POST /api/contact/inquiry` - Submit contact inquiry
- `GET /api/contact/inquiries` - Get all inquiries (admin)
- `PUT /api/contact/inquiries/:id` - Update inquiry status (admin)

### Testimonials
- `GET /api/testimonials` - Get testimonials with filtering
- `POST /api/testimonials` - Submit new testimonial

### Car Rentals
- `GET /api/car-rentals` - Get car rentals with filtering
- `GET /api/car-rentals/:id` - Get specific car rental

### Bookings
- `POST /api/bookings` - Create booking request
- `GET /api/bookings/:id` - Get booking details

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

### Utility
- `GET /api/terms-and-conditions` - Get terms and conditions
- `GET /api/health` - Health check
- `GET /api/stats` - Website statistics

## 🔧 React Hooks Available

### Package Hooks
```tsx
import { 
  usePackages, 
  usePackage, 
  useSriLankaPackages, 
  useMaldivesPackages, 
  useFeaturedPackages 
} from './hooks/useApi';

// Get packages with filtering
const { data, loading, error, refetch } = usePackages({
  type: 'maldives',
  featured: true,
  search: 'luxury',
  page: 1,
  limit: 10
});
```

### Contact Hooks
```tsx
import { useContactInquiry, useContactInquiries } from './hooks/useApi';

// Submit contact inquiry
const { submitInquiry, loading, success, error, reset } = useContactInquiry();

// Get inquiries (admin)
const { data: inquiries } = useContactInquiries({ status: 'new' });
```

### Testimonial Hooks
```tsx
import { useTestimonials, useTestimonialSubmission } from './hooks/useApi';

// Get testimonials
const { data: testimonials } = useTestimonials({ verified: true });

// Submit testimonial
const { submitTestimonial, loading } = useTestimonialSubmission();
```

### Car Rental Hooks
```tsx
import { useCarRentals, useCarRental } from './hooks/useApi';

// Get car rentals
const { data: cars } = useCarRentals({ category: 'luxury' });

// Get specific car
const { data: car } = useCarRental('car_1');
```

### Booking Hooks
```tsx
import { useBookingRequest, useBooking } from './hooks/useApi';

// Create booking
const { createBooking, loading } = useBookingRequest();

// Get booking
const { data: booking } = useBooking('booking_123');
```

### Newsletter Hooks
```tsx
import { useNewsletterSubscription } from './hooks/useApi';

const { subscribe, unsubscribe, loading } = useNewsletterSubscription();
```

## 📝 Component Integration Examples

### 1. Updated Contact Component

Your existing Contact component has been updated to use the API:

```tsx
// Before: Simulated form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  await new Promise(resolve => setTimeout(resolve, 2000));
  setIsSubmitting(false);
  // ...
};

// After: Real API integration
const { submitInquiry, loading, success, error, reset } = useContactInquiry();

const handleSubmit = async (e) => {
  e.preventDefault();
  await submitInquiry({
    name: formData.name,
    email: formData.email,
    destination: formData.destination,
    message: formData.message
  });
  
  if (success) {
    setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
    setTimeout(() => reset(), 3000);
  }
};
```

### 2. Package List with Search

```tsx
import { usePackages } from './hooks/useApi';

function PackageList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  const { data: packages, loading, error, refetch } = usePackages({
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
      
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="all">All Packages</option>
        <option value="maldives">Maldives</option>
        <option value="srilanka">Sri Lanka</option>
      </select>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      <div className="grid grid-cols-3 gap-4">
        {packages?.map(pkg => (
          <div key={pkg.id}>
            <h3>{pkg.title}</h3>
            <p>{pkg.short_description}</p>
            <p>${pkg.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Booking Form

```tsx
import { useBookingRequest } from './hooks/useApi';

function BookingForm({ packageId }) {
  const { createBooking, loading, success, error } = useBookingRequest();
  
  const handleSubmit = async (formData) => {
    await createBooking({
      packageId,
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality
      },
      travelDetails: {
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        adults: formData.adults,
        children: formData.children,
        infants: formData.infants
      },
      preferences: {
        hotelCategory: formData.hotelCategory,
        specialRequests: formData.specialRequests
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Booking'}
      </button>
      
      {success && <div>Booking submitted successfully!</div>}
      {error && <div>Error: {error}</div>}
    </form>
  );
}
```

## 🎯 Error Handling

All hooks provide comprehensive error handling:

```tsx
const { data, loading, error, refetch } = usePackages();

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return (
    <div>
      <p>Error: {error}</p>
      <button onClick={refetch}>Try Again</button>
    </div>
  );
}

if (!data || data.length === 0) {
  return <div>No packages found.</div>;
}

return (
  <div>
    {data.map(item => (
      <div key={item.id}>{item.title}</div>
    ))}
  </div>
);
```

## 🔄 Loading States

All hooks provide loading states for better UX:

```tsx
const { loading, submitInquiry } = useContactInquiry();

<button disabled={loading}>
  {loading ? (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
  ) : (
    'Submit'
  )}
</button>
```

## 📊 Success States

Form submission hooks provide success states:

```tsx
const { success, reset } = useContactInquiry();

useEffect(() => {
  if (success) {
    // Show success message
    setTimeout(() => reset(), 3000); // Reset after 3 seconds
  }
}, [success, reset]);
```

## 🧪 Testing

### 1. Test API Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# Get packages
curl http://localhost:3000/api/packages

# Get specific package
curl http://localhost:3000/api/packages/mv-001
```

### 2. Test Form Submissions

```bash
# Submit contact inquiry
curl -X POST http://localhost:3000/api/contact/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "destination": "maldives",
    "message": "I am interested in your packages"
  }'
```

### 3. Test in Browser

1. Open browser developer tools
2. Check Network tab for API calls
3. Verify request/response data
4. Test error scenarios

## 🚀 Production Deployment

### 1. Update Environment Variables

```env
REACT_APP_API_BASE_URL=https://api.opulenttravels.com/v1
```

### 2. Add Error Monitoring

```tsx
// Add to your error handling
if (error) {
  // Log to error monitoring service
  console.error('API Error:', error);
  // Show user-friendly message
}
```

### 3. Implement Caching

```tsx
// Use React Query for advanced caching
import { useQuery } from '@tanstack/react-query';

const { data: packages } = useQuery({
  queryKey: ['packages', filters],
  queryFn: () => apiServices.getPackages(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

## 📚 Additional Resources

- **API Documentation**: See `API_DOCUMENTATION.md` for complete endpoint reference
- **Integration Examples**: See `src/examples/apiIntegrationExamples.tsx`
- **Step-by-step Guide**: See `src/guides/apiIntegrationGuide.ts`

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your API server allows requests from your frontend domain
2. **Network Errors**: Check if the API server is running and accessible
3. **Type Errors**: Ensure TypeScript types are properly imported
4. **Loading States**: Make sure to handle loading states in your components

### Debug Tips

1. Check browser console for errors
2. Use Network tab to inspect API calls
3. Verify environment variables are set correctly
4. Test API endpoints directly with curl or Postman

## 📞 Support

For API integration support:
- Check the examples in `src/examples/`
- Review the integration guide in `src/guides/`
- Test with the provided API endpoints
- Verify your environment configuration

---

**Happy coding! 🚀**
