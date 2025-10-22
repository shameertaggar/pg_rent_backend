# 🚀 Postman Testing Guide - PG Management System

## 📋 Prerequisites
- **Server Running**: Make sure your server is running on `http://localhost:3000`
- **Postman Installed**: Download from [postman.com](https://www.postman.com/)
- **Environment Setup**: Create a Postman environment with base URL: `http://localhost:3000`

## 🔧 Environment Variables Setup
Create these variables in your Postman environment:
- `base_url`: `http://localhost:3000`
- `owner_token`: (will be set after login)
- `tenant_token`: (will be set after tenant login)
- `tenant_code`: (will be set after creating tenant)
- `property_id`: (will be set after creating property)
- `tenant_id`: (will be set after creating tenant)

---

## 🔐 **AUTHENTICATION TESTING**

### 1. Owner Signup
**Method:** `POST`  
**URL:** `{{base_url}}/api/auth/signup`  
**Headers:** `Content-Type: application/json`

**Body (JSON):**
```json
{
  "email": "owner@example.com",
  "password": "password123",
  "name": "John Owner"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Postman Setup:**
1. Save the `token` to environment variable `owner_token`
2. Use this token in Authorization header for owner routes

### 2. Owner Login
**Method:** `POST`  
**URL:** `{{base_url}}/api/auth/login`  
**Headers:** `Content-Type: application/json`

**Body (JSON):**
```json
{
  "email": "owner@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Tenant Login
**Method:** `POST`  
**URL:** `{{base_url}}/api/auth/tenant/login`  
**Headers:** `Content-Type: application/json`

**Body (JSON):**
```json
{
  "tenantCode": "ABC12345",
  "dob": "1995-06-15"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tenant": {
    "id": "tenant_id",
    "name": "John Doe",
    "email": "john@example.com",
    "tenantCode": "ABC12345",
    "propertyName": "Sunshine PG"
  }
}
```

---

## 🏠 **PROPERTY MANAGEMENT TESTING**

### 1. Create Property
**Method:** `POST`  
**URL:** `{{base_url}}/api/property`  
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer {{owner_token}}`

**Body (JSON):**
```json
{
  "propertyName": "Sunshine PG",
  "address": "123 Main Street, City",
  "totalRooms": 10,
  "rentPerRoom": 5000,
  "amenities": ["WiFi", "AC", "Parking"],
  "contactNumber": "9876543210"
}
```

**Expected Response:**
```json
{
  "id": "property_id_here",
  "message": "Property created successfully"
}
```

**Postman Setup:**
1. Save the `id` to environment variable `property_id`

---

## 👥 **TENANT MANAGEMENT TESTING**

### 1. Create Tenant
**Method:** `POST`  
**URL:** `{{base_url}}/api/tenants`  
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer {{owner_token}}`

**Body (JSON):**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "address": "123 Main Street, City",
  "emergency_contact": "9876543211",
  "emergency_contact_name": "Jane Doe",
  "id_proof_type": "aadhar",
  "id_proof_number": "123456789012",
  "dob": "1995-06-15",
  "propertyName": "Sunshine PG",
  "roomId": "room_123",
  "bedNumber": 1,
  "customRent": 5000
}
```

**Expected Response:**
```json
{
  "id": "tenant_id_here",
  "tenantCode": "ABC12345",
  "message": "Tenant created successfully",
  "bedAssigned": true
}
```

**Postman Setup:**
1. Save the `tenantCode` to environment variable `tenant_code`
2. Save the `id` to environment variable `tenant_id`

### 2. Get All Tenants
**Method:** `GET`  
**URL:** `{{base_url}}/api/tenants`  
**Headers:** `Authorization: Bearer {{owner_token}}`

### 3. Get Tenant by ID
**Method:** `GET`  
**URL:** `{{base_url}}/api/tenants/{{tenant_id}}`  
**Headers:** `Authorization: Bearer {{owner_token}}`

---

## 🏠 **TENANT PORTAL TESTING**

### 1. Get Tenant Profile
**Method:** `GET`  
**URL:** `{{base_url}}/api/tenants/portal/profile`  
**Headers:** `Authorization: Bearer {{tenant_token}}`

**Expected Response:**
```json
{
  "id": "tenant_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "tenantCode": "ABC12345",
  "propertyName": "Sunshine PG",
  "roomId": "room_123",
  "bedNumber": 1
}
```

### 2. Get Rent History
**Method:** `GET`  
**URL:** `{{base_url}}/api/tenants/portal/rent-history`  
**Headers:** `Authorization: Bearer {{tenant_token}}`

### 3. Get Complaints
**Method:** `GET`  
**URL:** `{{base_url}}/api/tenants/portal/complaints`  
**Headers:** `Authorization: Bearer {{tenant_token}}`

### 4. Update Checkout Date
**Method:** `PUT`  
**URL:** `{{base_url}}/api/tenants/portal/checkout-date`  
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer {{tenant_token}}`

**Body (JSON):**
```json
{
  "checkoutDate": "2024-12-31"
}
```

---

## 🍽️ **FOOD REGISTER TESTING**

### 1. Create Food Entry
**Method:** `POST`  
**URL:** `{{base_url}}/api/food`  
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer {{owner_token}}`

**Body (JSON):**
```json
{
  "propertyId": "{{property_id}}",
  "date": "2024-01-15",
  "meal_type": "lunch",
  "menu_items": ["Rice", "Dal", "Vegetables"],
  "cost_per_person": 50,
  "total_cost": 1000,
  "people_prepared_for": 20,
  "people_actually_ate": 18,
  "prepared_by": "Chef Name",
  "notes": "Extra rice left"
}
```

### 2. Get Food Analytics
**Method:** `GET`  
**URL:** `{{base_url}}/api/food/analytics?startDate=2024-01-01&endDate=2024-01-31`  
**Headers:** `Authorization: Bearer {{owner_token}}`

### 3. Get Kitchen Optimization Insights
**Method:** `GET`  
**URL:** `{{base_url}}/api/food/insights?startDate=2024-01-01&endDate=2024-01-31`  
**Headers:** `Authorization: Bearer {{owner_token}}`

---

## 🏠 **ROOM MANAGEMENT TESTING**

### 1. Create Room
**Method:** `POST`  
**URL:** `{{base_url}}/api/rooms`  
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer {{owner_token}}`

**Body (JSON):**
```json
{
  "propertyId": "{{property_id}}",
  "roomNumber": "101",
  "bedCount": 2,
  "rentPerBed": 2500,
  "amenities": ["AC", "WiFi"]
}
```

### 2. Get All Rooms
**Method:** `GET`  
**URL:** `{{base_url}}/api/rooms`  
**Headers:** `Authorization: Bearer {{owner_token}}`

---

## 💰 **RENT MANAGEMENT TESTING**

### 1. Create Rent Record
**Method:** `POST`  
**URL:** `{{base_url}}/api/rent`  
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer {{owner_token}}`

**Body (JSON):**
```json
{
  "tenantId": "{{tenant_id}}",
  "amount": 5000,
  "month": "2024-01",
  "dueDate": "2024-01-01",
  "status": "pending"
}
```

### 2. Get All Rent Records
**Method:** `GET`  
**URL:** `{{base_url}}/api/rent`  
**Headers:** `Authorization: Bearer {{owner_token}}`

---

## 🚨 **ISSUE/COMPLAINT TESTING**

### 1. Create Issue
**Method:** `POST`  
**URL:** `{{base_url}}/api/issues`  
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer {{owner_token}}`

**Body (JSON):**
```json
{
  "tenantId": "{{tenant_id}}",
  "title": "Water Issue",
  "description": "No water supply in room",
  "priority": "high",
  "category": "maintenance"
}
```

### 2. Get All Issues
**Method:** `GET`  
**URL:** `{{base_url}}/api/issues`  
**Headers:** `Authorization: Bearer {{owner_token}}`

---

## 📊 **TESTING WORKFLOW**

### Complete Testing Sequence:

1. **Setup Phase:**
   - Owner Signup → Save token
   - Owner Login → Verify token

2. **Property Setup:**
   - Create Property → Save property_id

3. **Tenant Management:**
   - Create Tenant → Save tenant_code and tenant_id
   - Get All Tenants → Verify tenant appears
   - Get Tenant by ID → Verify tenant details

4. **Tenant Portal:**
   - Tenant Login → Save tenant_token
   - Get Tenant Profile → Verify profile data
   - Update Checkout Date → Verify update

5. **Food Management:**
   - Create Food Entry → Test new fields
   - Get Food Analytics → Verify calculations
   - Get Kitchen Insights → Verify recommendations

6. **Additional Features:**
   - Room Management
   - Rent Management
   - Issue Management

---

## 🔍 **Testing Tips**

### Authorization Headers:
- **Owner Routes:** `Authorization: Bearer {{owner_token}}`
- **Tenant Portal:** `Authorization: Bearer {{tenant_token}}`

### Common Headers:
- `Content-Type: application/json` (for POST/PUT requests)

### Error Testing:
- Test with invalid tokens
- Test with missing required fields
- Test with invalid data formats

### Success Indicators:
- **200/201 status codes** for successful requests
- **Proper JSON responses** with expected fields
- **Token generation** for authentication
- **Data persistence** across requests

---

## 🚨 **Common Issues & Solutions**

### 1. **401 Unauthorized**
- Check if token is properly set in environment
- Verify token format: `Bearer {{token}}`
- Ensure token hasn't expired

### 2. **400 Bad Request**
- Check JSON format in request body
- Verify all required fields are present
- Check data types (dates, numbers, etc.)

### 3. **404 Not Found**
- Verify correct endpoint URLs
- Check if resources exist (property, tenant, etc.)
- Ensure proper ID references

### 4. **500 Internal Server Error**
- Check server logs
- Verify database connection
- Check environment variables

---

## 📱 **Postman Collection Setup**

### Environment Variables:
```
base_url: http://localhost:3000
owner_token: (set after login)
tenant_token: (set after tenant login)
tenant_code: (set after creating tenant)
property_id: (set after creating property)
tenant_id: (set after creating tenant)
```

### Pre-request Scripts:
Add this to automatically set tokens:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.token) {
        pm.environment.set("owner_token", response.token);
    }
    if (response.tenant && response.tenant.tenantCode) {
        pm.environment.set("tenant_code", response.tenant.tenantCode);
    }
}
```

This comprehensive testing guide will help you verify all the features of your PG management system!
