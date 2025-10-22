# 🏠 Property Controller API Documentation

## Overview
This document provides comprehensive curl requests for all property operations in the PG Management System. All endpoints require owner authentication using JWT tokens.

## 🔐 Authentication
All property endpoints require the following header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Your Token:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ`

---

## 📋 **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/property` | Create a new property |
| GET | `/api/property` | Get all properties for owner |
| GET | `/api/property/:id` | Get specific property by ID |
| PUT | `/api/property/:id` | Update property by ID |
| DELETE | `/api/property/:id` | Delete property by ID |

---

## 🚀 **Curl Requests**

### 1. **Create Property**
Creates a new property with automatic room generation.

```bash
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Sunshine PG",
    "location": "123 Main Street, Bangalore",
    "totalRooms": 10,
    "availableBeds": 20,
    "rentPerBed": 5000,
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security"],
    "ownerName": "Shameer",
    "type": "PG",
    "contactNumber": "9876543210"
  }'
```

**Expected Response:**
```json
{
  "propertyId": "property_id_here",
  "message": "Property created successfully"
}
```

### 2. **Get All Properties**
Retrieves all properties owned by the authenticated owner.

```bash
curl -X GET http://localhost:3000/api/property \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

**Expected Response:**
```json
[
  {
    "id": "property_id_1",
    "propertyName": "Sunshine PG",
    "location": "123 Main Street, Bangalore",
    "totalRooms": 10,
    "availableBeds": 20,
    "rentPerBed": 5000,
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security"],
    "ownerName": "Shameer",
    "type": "PG",
    "contactNumber": "9876543210",
    "ownerId": "owner_id_here",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

### 3. **Get Property by ID**
Retrieves a specific property by its ID.

```bash
curl -X GET http://localhost:3000/api/property/PROPERTY_ID_HERE \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

**Expected Response:**
```json
{
  "id": "property_id_here",
  "propertyName": "Sunshine PG",
  "location": "123 Main Street, Bangalore",
  "totalRooms": 10,
  "availableBeds": 20,
  "rentPerBed": 5000,
  "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security"],
  "ownerName": "Shameer",
  "type": "PG",
  "contactNumber": "9876543210",
  "ownerId": "owner_id_here",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

### 4. **Update Property**
Updates an existing property with new information.

```bash
curl -X PUT http://localhost:3000/api/property/PROPERTY_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Sunshine PG Updated",
    "location": "456 Updated Street, Bangalore",
    "totalRooms": 12,
    "availableBeds": 24,
    "rentPerBed": 5500,
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security", "Gym"],
    "ownerName": "Shameer",
    "type": "PG",
    "contactNumber": "9876543211"
  }'
```

**Expected Response:**
```json
{
  "message": "PROPERTY updated successfully"
}
```

### 5. **Delete Property**
Deletes a property and all associated data.

```bash
curl -X DELETE http://localhost:3000/api/property/PROPERTY_ID_HERE \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

**Expected Response:**
```json
{
  "message": "PROPERTY deleted successfully"
}
```

---

## 📝 **Request Body Schemas**

### **Create Property Schema**
```json
{
  "propertyName": "string (3-100 chars, required)",
  "location": "string (min 3 chars, required)",
  "totalRooms": "number (positive integer, required)",
  "availableBeds": "number (min 0, required)",
  "rentPerBed": "number (positive, required)",
  "facilities": "array of strings (required)",
  "ownerName": "string (3-100 chars, required)",
  "type": "string (PG|Hostel|Apartment, required)",
  "contactNumber": "string (10 digits, required)"
}
```

### **Update Property Schema**
All fields are optional for updates:
```json
{
  "propertyName": "string (3-100 chars)",
  "location": "string (min 3 chars)",
  "totalRooms": "number (positive integer)",
  "availableBeds": "number (min 0)",
  "rentPerBed": "number (positive)",
  "facilities": "array of strings",
  "ownerName": "string (3-100 chars)",
  "type": "string (PG|Hostel|Apartment)",
  "contactNumber": "string (10 digits)"
}
```

---

## 🎯 **Testing Scenarios**

### **1. Complete CRUD Testing Sequence**

```bash
# Step 1: Create Property
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Test PG",
    "location": "Test Location",
    "totalRooms": 5,
    "availableBeds": 10,
    "rentPerBed": 4000,
    "facilities": ["WiFi", "AC"],
    "ownerName": "Shameer",
    "type": "PG",
    "contactNumber": "9876543210"
  }'

# Step 2: Get All Properties (verify creation)
curl -X GET http://localhost:3000/api/property \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Step 3: Get Specific Property (replace PROPERTY_ID with actual ID)
curl -X GET http://localhost:3000/api/property/PROPERTY_ID \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Step 4: Update Property
curl -X PUT http://localhost:3000/api/property/PROPERTY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Updated Test PG",
    "rentPerBed": 4500
  }'

# Step 5: Delete Property
curl -X DELETE http://localhost:3000/api/property/PROPERTY_ID \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **2. Different Property Types**

```bash
# PG Property
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Premium PG",
    "location": "Koramangala, Bangalore",
    "totalRooms": 15,
    "availableBeds": 30,
    "rentPerBed": 6000,
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security", "Gym"],
    "ownerName": "Shameer",
    "type": "PG",
    "contactNumber": "9876543210"
  }'

# Hostel Property
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Student Hostel",
    "location": "Whitefield, Bangalore",
    "totalRooms": 20,
    "availableBeds": 40,
    "rentPerBed": 3500,
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security", "Cafeteria"],
    "ownerName": "Shameer",
    "type": "Hostel",
    "contactNumber": "9876543210"
  }'

# Apartment Property
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Luxury Apartments",
    "location": "Indiranagar, Bangalore",
    "totalRooms": 8,
    "availableBeds": 16,
    "rentPerBed": 8000,
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security", "Gym", "Swimming Pool"],
    "ownerName": "Shameer",
    "type": "Apartment",
    "contactNumber": "9876543210"
  }'
```

### **3. Partial Updates**

```bash
# Update only rent
curl -X PUT http://localhost:3000/api/property/PROPERTY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "rentPerBed": 5500
  }'

# Update only facilities
curl -X PUT http://localhost:3000/api/property/PROPERTY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security", "Gym", "Swimming Pool"]
  }'

# Update only contact
curl -X PUT http://localhost:3000/api/property/PROPERTY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "contactNumber": "9876543211"
  }'
```

---

## 🚨 **Error Testing**

### **1. Invalid Token**
```bash
curl -X GET http://localhost:3000/api/property \
  -H "Authorization: Bearer invalid_token"
```

### **2. Missing Required Fields**
```bash
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Test PG"
  }'
```

### **3. Invalid Property Type**
```bash
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Test PG",
    "location": "Test Location",
    "totalRooms": 5,
    "availableBeds": 10,
    "rentPerBed": 4000,
    "facilities": ["WiFi"],
    "ownerName": "Shameer",
    "type": "InvalidType",
    "contactNumber": "9876543210"
  }'
```

### **4. Invalid Contact Number**
```bash
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Test PG",
    "location": "Test Location",
    "totalRooms": 5,
    "availableBeds": 10,
    "rentPerBed": 4000,
    "facilities": ["WiFi"],
    "ownerName": "Shameer",
    "type": "PG",
    "contactNumber": "123"
  }'
```

---

## 📊 **Expected Status Codes**

| Status Code | Description |
|-------------|-------------|
| 200 | Success (GET, PUT, DELETE) |
| 201 | Created (POST) |
| 400 | Bad Request (validation errors) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (unauthorized access) |
| 404 | Not Found (property doesn't exist) |
| 500 | Internal Server Error |

---

## 🔧 **Features**

### **Automatic Room Generation**
When creating a property with `totalRooms`, the system automatically creates rooms:
- Room numbers start from 1
- Each room has 1 bed by default
- Default rent is set to property's `rentPerBed`
- Rooms are linked to the property

### **Validation Features**
- Property name: 3-100 characters
- Location: minimum 3 characters
- Total rooms: positive integer
- Available beds: non-negative integer
- Rent per bed: positive number
- Contact number: exactly 10 digits
- Property type: PG, Hostel, or Apartment
- Facilities: array of strings

### **Security Features**
- JWT token authentication required
- Owner can only access their own properties
- Automatic owner ID injection from token
- Input validation and sanitization

---

## 🎯 **Quick Test Commands**

### **Create and Test Property**
```bash
# Create property
PROPERTY_RESPONSE=$(curl -s -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyName": "Quick Test PG",
    "location": "Test Location",
    "totalRooms": 3,
    "availableBeds": 6,
    "rentPerBed": 4000,
    "facilities": ["WiFi", "AC"],
    "ownerName": "Shameer",
    "type": "PG",
    "contactNumber": "9876543210"
  }')

echo "Property created: $PROPERTY_RESPONSE"

# Extract property ID (requires jq)
PROPERTY_ID=$(echo $PROPERTY_RESPONSE | jq -r '.propertyId')
echo "Property ID: $PROPERTY_ID"

# Get the property
curl -X GET http://localhost:3000/api/property/$PROPERTY_ID \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

This comprehensive documentation provides all the curl requests needed to test property operations with your JWT token!
