# API Integration Guide

## 🚀 Overview

This guide covers the complete API integration setup for the PG Accommodation frontend with the Spring Boot backend.

## 📁 Folder Structure

```
src/
├── constants/
│   └── apiEndpoints.js          # Centralized API endpoints
├── services/
│   ├── api.js                   # Axios instance with interceptors
│   ├── authService.js           # Authentication API calls
│   ├── pgService.js             # PG-related API calls
│   └── bookingService.js        # Booking-related API calls
├── features/
│   ├── auth/
│   │   └── authSlice.js         # Redux slice for auth
│   ├── pg/
│   │   └── pgSlice.js           # Redux slice for PGs
│   └── booking/
│       └── bookingSlice.js      # Redux slice for bookings
├── utils/
│   └── apiUtils.js              # API utility functions
├── hooks/
│   └── useApi.js                # Custom hooks for API calls
└── components/
    └── common/
        └── ApiTest.jsx          # API testing component
```

## 🔧 Configuration

### 1. API Base URL

The base URL is configured in `src/constants/apiEndpoints.js`:

```javascript
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";
```

### 2. Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_URL=http://localhost:8080/api
```

## 📡 API Endpoints

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

### PG Endpoints

- `GET /pgs` - Get all PGs
- `GET /pgs/{id}` - Get PG by ID
- `POST /pgs` - Create new PG
- `PUT /pgs/{id}` - Update PG
- `DELETE /pgs/{id}` - Delete PG
- `GET /pgs/owner/{ownerId}` - Get PGs by owner
- `GET /pgs/search` - Search PGs
- `POST /pgs/{id}/images` - Upload PG images

### Booking Endpoints

- `GET /bookings` - Get all bookings
- `GET /bookings/{id}` - Get booking by ID
- `POST /bookings` - Create new booking
- `PUT /bookings/{id}` - Update booking
- `PATCH /bookings/{id}/cancel` - Cancel booking

## 🛠️ Usage Examples

### 1. Using Services Directly

```javascript
import pgService from "../services/pgService";

// Get all PGs
const pgs = await pgService.getAllPGs();

// Create a new PG
const newPG = await pgService.createPG(pgData, images);
```

### 2. Using Redux with Async Thunks

```javascript
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPGs, createPG } from "../features/pg/pgSlice";

const dispatch = useDispatch();
const { pgs, loading, error } = useSelector((state) => state.pg);

// Fetch PGs
await dispatch(fetchAllPGs());

// Create PG
await dispatch(createPG({ pgData, images }));
```

### 3. Using Custom Hooks

```javascript
import { useApiOperation } from "../hooks/useApi";
import pgService from "../services/pgService";

const { loading, error, data, execute } = useApiOperation(pgService.getAllPGs);

// Execute API call
const result = await execute();
```

## 🔒 Authentication

### JWT Token Management

The API service automatically handles JWT tokens:

- Tokens are stored in localStorage
- Automatic token injection in request headers
- Automatic token refresh handling
- Automatic logout on 401 errors

### Protected Routes

```javascript
// Check if user is authenticated
const { isAuthenticated } = useSelector((state) => state.auth);

// Check user role
const { userRole } = useSelector((state) => state.auth);
```

## 📝 Error Handling

### Centralized Error Messages

```javascript
import { ERROR_MESSAGES } from "../constants/apiEndpoints";

// Error messages are centralized and reusable
console.log(ERROR_MESSAGES.UNAUTHORIZED);
```

### Error Handling in Components

```javascript
import { handleApiError } from "../utils/apiUtils";

try {
  const result = await apiCall();
} catch (error) {
  const errorMessage = handleApiError(error);
  // Handle error appropriately
}
```

## 🧪 Testing

### API Test Component

Use the `ApiTest` component to verify API connectivity:

```javascript
import ApiTest from "../components/common/ApiTest";

// Add to any page for testing
<ApiTest />;
```

### Manual Testing

1. **Test Basic Connectivity**: Click "Test Basic API"
2. **Test PG Creation**: Click "Test Create PG"
3. **Test Redux Integration**: Click "Test Redux Integration"

## 🔄 State Management

### Redux Store Structure

```javascript
{
  auth: {
    user: null,
    isAuthenticated: false,
    userRole: null,
    loading: false,
    error: null
  },
  pg: {
    pgs: [],
    currentPG: null,
    loading: false,
    error: null,
    filters: {}
  },
  booking: {
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null
  }
}
```

## 📊 Data Flow

1. **Component** → **Redux Action** → **Async Thunk** → **Service** → **API**
2. **API Response** → **Service** → **Async Thunk** → **Redux Reducer** → **Component**

## 🚨 Common Issues & Solutions

### 1. CORS Errors

- Ensure backend CORS configuration is correct
- Check if frontend URL is in allowed origins

### 2. 401 Unauthorized

- Check if JWT token is valid
- Verify token is being sent in headers
- Check if user is logged in

### 3. 500 Server Errors

- Check backend logs for detailed error messages
- Verify API endpoints match backend implementation
- Check request payload format

### 4. Network Errors

- Verify backend server is running
- Check if API base URL is correct
- Ensure no firewall blocking requests

## 🔧 Development Tips

### 1. Debug API Calls

```javascript
// Add to api.js for debugging
api.interceptors.request.use((config) => {
  console.log("Request:", config);
  return config;
});

api.interceptors.response.use((response) => {
  console.log("Response:", response);
  return response;
});
```

### 2. Environment-Specific Configuration

```javascript
// Different API URLs for different environments
const API_URL =
  import.meta.env.MODE === "production"
    ? "https://api.yourapp.com/api"
    : "http://localhost:8080/api";
```

### 3. Loading States

Always handle loading states in components:

```javascript
const { loading, error, data } = useSelector((state) => state.pg);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
```

## ✅ Checklist

- [ ] Backend server is running on port 8080
- [ ] CORS is properly configured
- [ ] API endpoints are accessible
- [ ] JWT authentication is working
- [ ] Redux store is properly configured
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] File uploads are working
- [ ] All CRUD operations are functional

## 🎯 Next Steps

1. Test all API endpoints
2. Implement error boundaries
3. Add retry logic for failed requests
4. Implement offline support
5. Add request/response caching
6. Implement real-time updates (WebSocket)
