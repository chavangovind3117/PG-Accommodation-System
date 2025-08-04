# Authentication Integration Guide

## 🔧 **Updated Configuration**

The frontend authentication has been updated to work with your backend API at `http://localhost:8080/api/users/login`.

### **Key Changes Made:**

1. **Updated API Endpoints:**

   - Login: `/users/login` (was `/auth/login`)
   - Register: `/users/register` (was `/auth/register`)
   - All other auth endpoints now use `/users/` prefix

2. **Enhanced Error Handling:**

   - Better error message extraction from backend responses
   - Support for different error response structures
   - Detailed console logging for debugging

3. **Flexible Response Handling:**
   - Supports different backend response structures
   - Handles both `response.user` and direct `response` objects
   - Supports both `response.token` and `response.jwt` token fields

## 🧪 **Testing Your Authentication**

### **Method 1: Using the AuthTest Component**

1. **Add the test component to your app:**

   ```jsx
   // In any page or component
   import AuthTest from "../components/common/AuthTest";

   // Then use it in your JSX
   <AuthTest />;
   ```

2. **Test with the provided buttons:**
   - **Test Login (Default)**: Tests with hardcoded credentials
   - **Test Signup**: Tests user registration
   - **Test Custom Login**: Prompts for custom credentials

### **Method 2: Using Postman**

**Login Request:**

```
POST http://localhost:8080/api/users/login
Content-Type: application/json

{
  "email": "your-email@example.com",
  "password": "your-password",
  "role": "USER"
}
```

**Signup Request:**

```
POST http://localhost:8080/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "USER",
  "phone": "1234567890"
}
```

### **Method 3: Using the Login Form**

1. Navigate to `/login` in your app
2. Fill in your credentials
3. Select the appropriate role (USER/OWNER)
4. Submit and check the console for detailed logs

## 📋 **Expected Backend Response Structure**

The frontend now handles multiple response structures:

### **Option 1: Nested User Object**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  "token": "jwt-token-here"
}
```

### **Option 2: Direct User Object**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "token": "jwt-token-here"
}
```

### **Option 3: JWT Token Field**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  "jwt": "jwt-token-here"
}
```

## 🔍 **Debugging Tips**

### **Check Console Logs:**

- Login requests and responses are logged
- Error details are displayed
- User state changes are tracked

### **Common Issues:**

1. **CORS Errors:**

   - Ensure your backend allows requests from `http://localhost:5173`
   - Check CORS configuration in your Spring Boot app

2. **Authentication Errors:**

   - Verify the API endpoint is correct
   - Check request payload structure
   - Ensure backend is running on port 8080

3. **Token Issues:**
   - Check if token is being stored in localStorage
   - Verify token format and expiration

## 🚀 **Next Steps**

1. **Test the authentication** using any of the methods above
2. **Check the console logs** for detailed information
3. **Verify the user state** is properly updated
4. **Test role-based navigation** (USER vs OWNER)

## 📞 **Support**

If you encounter issues:

1. Check the browser console for error messages
2. Verify your backend API is running and accessible
3. Test the API directly in Postman first
4. Check the network tab for request/response details

The authentication system is now flexible and should work with most backend response structures!
