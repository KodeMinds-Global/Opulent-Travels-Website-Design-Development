# Opulent Travels REST API Documentation

## Overview

The Opulent Travels REST API provides comprehensive endpoints for managing travel packages, customer inquiries, testimonials, car rentals, and booking requests. This API is designed to support the Opulent Travels website with full CRUD operations and advanced filtering capabilities.

## Base URL

```
https://api.opulenttravels.com/v1
```

## Authentication

Currently, the API does not require authentication for public endpoints. Admin endpoints (marked with 🔒) will require authentication in production.

## Response Format

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "data": object | array,
  "message": string,
  "error": string,
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "totalPages": number
  }
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 📦 Package Endpoints

### Get All Packages

**GET** `/api/packages`

Retrieve all travel packages with optional filtering and pagination.

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `type` | string | Filter by package type (`sriLanka`, `maldives`, `all`) | `all` |
| `featured` | boolean | Filter by featured status | - |
| `search` | string | Search in title, description, and highlights | - |
| `page` | number | Page number for pagination | `1` |
| `limit` | number | Number of items per page | `10` |

#### Example Request

```bash
GET /api/packages?type=maldives&featured=true&page=1&limit=5
```

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "mv-001",
      "type": "maldives",
      "title": "Luxury Overwater Villa Experience",
      "short_description": "Indulge in ultimate luxury with a stay in an overwater villa...",
      "long_description": "Experience the epitome of luxury and tranquility...",
      "image_url": "/assets/images/Maldives_bg.jpg",
      "price": 3200,
      "duration": "5 days / 4 nights",
      "highlights": [
        "Exclusive stay in a luxury overwater villa",
        "Direct lagoon access from your private deck"
      ],
      "inclusions": [
        "Luxury overwater villa accommodation",
        "Daily gourmet breakfast"
      ],
      "exclusions": [
        "International airfare",
        "Travel insurance"
      ],
      "itinerary": [...],
      "featured": true,
      "resort_name": "Blue Lagoon Maldives Resort & Spa",
      "resortRating": 5,
      "waterActivities": [
        "Snorkeling with manta rays",
        "Sunset fishing"
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 3,
    "totalPages": 1
  }
}
```

### Get Package by ID

**GET** `/api/packages/:id`

Retrieve a specific package by its unique identifier.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Package unique identifier |

#### Example Request

```bash
GET /api/packages/mv-001
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "mv-001",
    "type": "maldives",
    "title": "Luxury Overwater Villa Experience",
    // ... complete package details
  }
}
```

### Get Sri Lanka Packages

**GET** `/api/packages/sri-lanka`

Retrieve all Sri Lanka travel packages.

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "sl-001",
      "type": "sriLanka",
      "title": "5N6D SRI LANKA TOUR",
      "locations": ["Kandy", "Bentota", "Colombo"],
      "cultural_experiences": ["Local crafts workshop"],
      // ... other package details
    }
  ]
}
```

### Get Maldives Packages

**GET** `/api/packages/maldives`

Retrieve all Maldives travel packages.

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "mv-001",
      "type": "maldives",
      "title": "Luxury Overwater Villa Experience",
      "resort_name": "Blue Lagoon Maldives Resort & Spa",
      "resortRating": 5,
      "waterActivities": ["Snorkeling with manta rays"],
      // ... other package details
    }
  ]
}
```

### Get Featured Packages

**GET** `/api/packages/featured`

Retrieve all featured packages.

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "mv-001",
      "featured": true,
      // ... package details
    }
  ]
}
```

---

## 📞 Contact & Inquiry Endpoints

### Submit Contact Inquiry

**POST** `/api/contact/inquiry`

Submit a new contact inquiry.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "destination": "maldives",
  "message": "I'm interested in your luxury Maldives package..."
}
```

#### Field Validation

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Customer's full name |
| `email` | string | ✅ | Valid email address |
| `phone` | string | ❌ | Phone number with country code |
| `destination` | string | ✅ | One of: `maldives`, `srilanka`, `combined`, `custom` |
| `message` | string | ✅ | Inquiry message (max 1000 characters) |

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "inq_1703123456789_abc123def",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "destination": "maldives",
    "message": "I'm interested in your luxury Maldives package...",
    "status": "new",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Your inquiry has been submitted successfully. We will contact you soon."
}
```

### Get Contact Inquiries 🔒

**GET** `/api/contact/inquiries`

Retrieve all contact inquiries (admin only).

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `status` | string | Filter by status (`new`, `in_progress`, `resolved`) | - |
| `page` | number | Page number for pagination | `1` |
| `limit` | number | Number of items per page | `10` |

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "inq_1703123456789_abc123def",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "status": "new",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Update Inquiry Status 🔒

**PUT** `/api/contact/inquiries/:id`

Update the status of a contact inquiry (admin only).

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Inquiry unique identifier |

#### Request Body

```json
{
  "status": "in_progress"
}
```

#### Example Response

```json
{
  "success": true,
  "message": "Inquiry status updated successfully"
}
```

---

## ⭐ Testimonial Endpoints

### Get Testimonials

**GET** `/api/testimonials`

Retrieve customer testimonials with optional filtering.

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `verified` | boolean | Filter by verification status | - |
| `packageId` | string | Filter by package ID | - |
| `page` | number | Page number for pagination | `1` |
| `limit` | number | Number of items per page | `10` |

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "test_1",
      "name": "Sarah Johnson",
      "location": "New York, USA",
      "rating": 5,
      "text": "Absolutely breathtaking experience! The Maldives package exceeded all expectations.",
      "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop",
      "packageId": "mv-001",
      "verified": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

### Submit Testimonial

**POST** `/api/testimonials`

Submit a new customer testimonial.

#### Request Body

```json
{
  "name": "Jane Smith",
  "location": "London, UK",
  "rating": 5,
  "text": "Amazing experience with Opulent Travels!",
  "image": "https://example.com/photo.jpg",
  "packageId": "sl-001"
}
```

#### Field Validation

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Customer's full name |
| `location` | string | ✅ | Customer's location |
| `rating` | number | ✅ | Rating from 1 to 5 |
| `text` | string | ✅ | Testimonial text (max 500 characters) |
| `image` | string | ❌ | Profile image URL |
| `packageId` | string | ❌ | Associated package ID |

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "test_1703123456789_xyz789abc",
    "name": "Jane Smith",
    "location": "London, UK",
    "rating": 5,
    "text": "Amazing experience with Opulent Travels!",
    "image": "https://example.com/photo.jpg",
    "packageId": "sl-001",
    "verified": false,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Thank you for your testimonial! It will be reviewed and published soon."
}
```

---

## 🚗 Car Rental Endpoints

### Get Car Rentals

**GET** `/api/car-rentals`

Retrieve available car rental options.

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `category` | string | Filter by category (`economy`, `luxury`, `suv`, `premium`) | - |
| `available` | boolean | Filter by availability | - |
| `page` | number | Page number for pagination | `1` |
| `limit` | number | Number of items per page | `10` |

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "car_1",
      "name": "Toyota Corolla",
      "category": "economy",
      "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=2940&auto=format&fit=crop",
      "pricePerDay": 25,
      "features": [
        "Air Conditioning",
        "GPS Navigation",
        "Bluetooth",
        "Fuel Efficient"
      ],
      "availability": true,
      "description": "Perfect for city driving and short trips. Comfortable and fuel-efficient.",
      "specifications": {
        "seats": 5,
        "transmission": "automatic",
        "fuelType": "petrol",
        "airConditioning": true,
        "gps": true
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

### Get Car Rental by ID

**GET** `/api/car-rentals/:id`

Retrieve a specific car rental by its unique identifier.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Car rental unique identifier |

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "car_1",
    "name": "Toyota Corolla",
    "category": "economy",
    // ... complete car rental details
  }
}
```

---

## 📋 Booking Endpoints

### Create Booking Request

**POST** `/api/bookings`

Create a new booking request for a travel package.

#### Request Body

```json
{
  "packageId": "mv-001",
  "customerInfo": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "nationality": "American"
  },
  "travelDetails": {
    "departureDate": "2024-06-15",
    "returnDate": "2024-06-20",
    "adults": 2,
    "children": 1,
    "infants": 0
  },
  "preferences": {
    "hotelCategory": "5Star",
    "specialRequests": "Vegetarian meals preferred"
  }
}
```

#### Field Validation

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `packageId` | string | ✅ | Valid package ID |
| `customerInfo.name` | string | ✅ | Customer's full name |
| `customerInfo.email` | string | ✅ | Valid email address |
| `customerInfo.phone` | string | ✅ | Phone number |
| `customerInfo.nationality` | string | ✅ | Customer's nationality |
| `travelDetails.departureDate` | string | ✅ | Departure date (ISO format) |
| `travelDetails.returnDate` | string | ✅ | Return date (ISO format) |
| `travelDetails.adults` | number | ✅ | Number of adults (min: 1) |
| `travelDetails.children` | number | ✅ | Number of children (min: 0) |
| `travelDetails.infants` | number | ✅ | Number of infants (min: 0) |
| `preferences.hotelCategory` | string | ✅ | One of: `3Star`, `3.5Star`, `4Star`, `5Star` |
| `preferences.specialRequests` | string | ❌ | Special requests or notes |

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "booking_1703123456789_def456ghi",
    "packageId": "mv-001",
    "customerInfo": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "nationality": "American"
    },
    "travelDetails": {
      "departureDate": "2024-06-15",
      "returnDate": "2024-06-20",
      "adults": 2,
      "children": 1,
      "infants": 0
    },
    "preferences": {
      "hotelCategory": "5Star",
      "specialRequests": "Vegetarian meals preferred"
    },
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Your booking request has been submitted successfully. We will contact you to confirm the details."
}
```

### Get Booking by ID

**GET** `/api/bookings/:id`

Retrieve booking details by unique identifier.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Booking unique identifier |

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "booking_1703123456789_def456ghi",
    "packageId": "mv-001",
    "status": "confirmed",
    // ... complete booking details
  }
}
```

---

## 📧 Newsletter Endpoints

### Subscribe to Newsletter

**POST** `/api/newsletter/subscribe`

Subscribe to the newsletter.

#### Request Body

```json
{
  "email": "john.doe@example.com"
}
```

#### Field Validation

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | ✅ | Valid email address |

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "newsletter_1703123456789_jkl012mno",
    "email": "john.doe@example.com",
    "subscribed": true,
    "subscribedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Successfully subscribed to our newsletter!"
}
```

### Unsubscribe from Newsletter

**POST** `/api/newsletter/unsubscribe`

Unsubscribe from the newsletter.

#### Request Body

```json
{
  "email": "john.doe@example.com"
}
```

#### Example Response

```json
{
  "success": true,
  "message": "Successfully unsubscribed from our newsletter."
}
```

---

## 📄 Terms and Conditions

### Get Terms and Conditions

**GET** `/api/terms-and-conditions`

Retrieve the current terms and conditions.

#### Example Response

```json
{
  "success": true,
  "data": {
    "mainTitle": "The Rates Quoted Are Based on the Following Terms & Conditions",
    "validityPeriod": {
      "from": "1st May 2025",
      "to": "31st October 2025"
    },
    "sections": {
      "allRates": {
        "title": "All Rates are",
        "items": [
          "In United States Dollars, Per Person, in sharing double/twin room",
          "Valid for travel from 1st May 2025 – 31st October 2025"
        ],
        "colorScheme": "green"
      },
      "transfersInclude": {
        "title": "All Transfers & Tours Include",
        "items": [
          "Daily bottle of mineral water",
          "Private Transfers between Airport –Hotel – Sightseeing – Hotel"
        ],
        "colorScheme": "blue"
      }
      // ... other sections
    }
  }
}
```

---

## 🔧 Utility Endpoints

### Health Check

**GET** `/api/health`

Check the API health status.

#### Example Response

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Get Website Statistics

**GET** `/api/stats`

Retrieve website statistics.

#### Example Response

```json
{
  "success": true,
  "data": {
    "totalPackages": 6,
    "totalTestimonials": 3,
    "totalBookings": 0,
    "totalInquiries": 0
  }
}
```

---

## 📊 Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Public endpoints**: 100 requests per minute per IP
- **Contact/Booking endpoints**: 10 requests per minute per IP
- **Admin endpoints**: 1000 requests per minute per authenticated user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

---

## 🔒 Authentication (Future Implementation)

Admin endpoints will require authentication using JWT tokens:

### Login

**POST** `/api/auth/login`

```json
{
  "email": "admin@opulenttravels.com",
  "password": "securepassword"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "admin_1",
      "email": "admin@opulenttravels.com",
      "role": "admin"
    }
  }
}
```

### Using the Token

Include the token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE_API_KEY=your_email_service_key
```

### 3. Start the Server

```bash
npm run dev
```

### 4. Test the API

```bash
curl http://localhost:3000/api/health
```

---

## 📝 Changelog

### Version 1.0.0 (2024-01-15)

- Initial API release
- Package management endpoints
- Contact inquiry system
- Testimonial management
- Car rental services
- Booking request system
- Newsletter subscription
- Terms and conditions
- Health check and statistics

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

## 📞 Support

For API support and questions:

- **Email**: api-support@opulenttravels.com
- **Documentation**: https://docs.opulenttravels.com
- **Status Page**: https://status.opulenttravels.com

---

## 📄 License

This API is proprietary to Opulent Travels. All rights reserved.
