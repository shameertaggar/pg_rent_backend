# Property API Documentation

## Overview
This document provides comprehensive API documentation for Property endpoints. All endpoints require JWT authentication and are accessible only to authenticated owners.

**Base URL:** `http://localhost:3000/api/property`

**Authentication:** All endpoints require a Bearer token in the Authorization header.

---

## Authentication

All requests must include the following header:
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

The JWT token is obtained from the `/api/auth/login` endpoint.

---

## API Endpoints

### 1. Create Property

Creates a new property and optionally creates rooms automatically.

**Endpoint:** `POST /api/property`

**Authentication:** Required

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

**Request Body Schema:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `propertyName` | string | Yes | 3-100 characters | Name of the property |
| `location` | string | Yes | Minimum 3 characters | Address/location of the property |
| `totalRooms` | number | Yes | Positive integer | Total number of rooms in the property |
| `totalBeds` | number | Yes | Non-negative integer | Total number of beds in the property |
| `rentPerBed` | number | Yes | Positive number | Rent amount per bed |
| `facilities` | array | Yes | Array of strings | List of facilities available |
| `ownerName` | string | Yes | 3-100 characters | Name of the property owner |
| `type` | string | Yes | One of: "PG", "Hostel", "Apartment" | Type of property |
| `contactNumber` | string | Yes | - | Contact number for the property |

**Note:** 
- `ownerId` is automatically extracted from the JWT token and should not be included in the request body
- `availableBeds` is automatically set to `totalBeds` when the property is created
- If both `totalRooms` and `totalBeds` are provided, rooms will be automatically created with beds distributed evenly across rooms

**Sample Request Body:**
```json
{
  "propertyName": "Sunshine PG",
  "location": "123 Main Street, Bangalore, Karnataka 560001",
  "totalRooms": 10,
  "totalBeds": 20,
  "rentPerBed": 5000,
  "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security"],
  "ownerName": "John Doe",
  "type": "PG",
  "contactNumber": "9876543210"
}
```

**Success Response (201 Created):**
```json
{
  "propertyId": "abc123xyz789",
  "message": "Property created successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "propertyName length must be at least 3 characters long"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No token provided"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Error message here"
}
```

---

### 2. Get All Properties

Retrieves all properties owned by the authenticated owner.

**Endpoint:** `GET /api/property`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:** None

**Sample Request:**
```
GET /api/property
Authorization: Bearer <JWT_TOKEN>
```

**Success Response (200 OK):**
```json
[
  {
    "id": "abc123xyz789",
    "propertyName": "Sunshine PG",
    "location": "123 Main Street, Bangalore, Karnataka 560001",
    "totalRooms": 10,
    "totalBeds": 20,
    "availableBeds": 15,
    "rentPerBed": 5000,
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security"],
    "ownerName": "John Doe",
    "type": "PG",
    "contactNumber": "9876543210",
    "ownerId": "owner_id_from_token",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": "def456uvw012",
    "propertyName": "Elite Hostel",
    "location": "456 Park Avenue, Mumbai, Maharashtra 400001",
    "totalRooms": 15,
    "totalBeds": 30,
    "availableBeds": 30,
    "rentPerBed": 6000,
    "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security", "Gym"],
    "ownerName": "John Doe",
    "type": "Hostel",
    "contactNumber": "9876543211",
    "ownerId": "owner_id_from_token",
    "created_at": "2024-01-20T14:20:00.000Z",
    "updated_at": "2024-01-20T14:20:00.000Z"
  }
]
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No token provided"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Error message here"
}
```

---

### 3. Get Property by ID

Retrieves a specific property by its ID (only if owned by the authenticated owner).

**Endpoint:** `GET /api/property/:id`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Property ID |

**Sample Request:**
```
GET /api/property/abc123xyz789
Authorization: Bearer <JWT_TOKEN>
```

**Success Response (200 OK):**
```json
{
  "id": "abc123xyz789",
  "propertyName": "Sunshine PG",
  "location": "123 Main Street, Bangalore, Karnataka 560001",
  "totalRooms": 10,
  "totalBeds": 20,
  "availableBeds": 15,
  "rentPerBed": 5000,
  "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security"],
  "ownerName": "John Doe",
  "type": "PG",
  "contactNumber": "9876543210",
  "ownerId": "owner_id_from_token",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Not found or unauthorized"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No token provided"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Error message here"
}
```

---

### 4. Update Property

Updates an existing property. All fields are optional - only provide the fields you want to update.

**Endpoint:** `PUT /api/property/:id`

**Authentication:** Required

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Property ID |

**Request Body Schema:**

All fields are optional. Only include fields you want to update.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `propertyName` | string | No | 3-100 characters | Name of the property |
| `location` | string | No | Minimum 3 characters | Address/location of the property |
| `totalRooms` | number | No | Positive integer | Total number of rooms in the property |
| `totalBeds` | number | No | Non-negative integer | Total number of beds in the property |
| `rentPerBed` | number | No | Positive number | Rent amount per bed |
| `facilities` | array | No | Array of strings | List of facilities available |
| `ownerName` | string | No | 3-100 characters | Name of the property owner |
| `type` | string | No | One of: "PG", "Hostel", "Apartment" | Type of property |
| `contactNumber` | string | No | - | Contact number for the property |

**Sample Request Body (Update All Fields):**
```json
{
  "propertyName": "Sunshine PG - Updated",
  "location": "456 New Street, Bangalore, Karnataka 560002",
  "totalRooms": 12,
  "totalBeds": 24,
  "rentPerBed": 5500,
  "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security", "Gym"],
  "ownerName": "John Doe",
  "type": "PG",
  "contactNumber": "9876543211"
}
```

**Sample Request Body (Partial Update - Only Rent):**
```json
{
  "rentPerBed": 5500
}
```

**Sample Request Body (Partial Update - Only Facilities):**
```json
{
  "facilities": ["WiFi", "AC", "Parking", "Laundry", "Security", "Gym", "Swimming Pool"]
}
```

**Success Response (200 OK):**
```json
{
  "message": "PROPERTY updated successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "rentPerBed must be a positive number"
}
```

**Error Response (403 Forbidden):**
```json
{
  "error": "Unauthorized or not found"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No token provided"
}
```

---

### 5. Delete Property

Deletes a property and all associated data (rooms, tenants, etc.).

**Endpoint:** `DELETE /api/property/:id`

**Authentication:** Required

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Property ID |

**Sample Request:**
```
DELETE /api/property/abc123xyz789
Authorization: Bearer <JWT_TOKEN>
```

**Success Response (200 OK):**
```json
{
  "message": "PROPERTY deleted successfully"
}
```

**Error Response (403 Forbidden):**
```json
{
  "error": "Unauthorized or not found"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No token provided"
}
```

---

## Response Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success (GET, PUT, DELETE) |
| 201 | Created (POST) |
| 400 | Bad Request (validation errors) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (unauthorized access or not found) |
| 404 | Not Found (property doesn't exist) |
| 500 | Internal Server Error |

---

## Field Validation Details

### Property Name
- **Type:** String
- **Length:** 3-100 characters
- **Required:** Yes (for create), No (for update)

### Location
- **Type:** String
- **Minimum Length:** 3 characters
- **Required:** Yes (for create), No (for update)

### Total Rooms
- **Type:** Integer
- **Constraints:** Must be a positive integer (> 0)
- **Required:** Yes (for create), No (for update)

### Total Beds
- **Type:** Integer
- **Constraints:** Must be non-negative (≥ 0)
- **Required:** Yes (for create), No (for update)
- **Note:** When property is created, `availableBeds` is automatically set to `totalBeds`

### Rent Per Bed
- **Type:** Number
- **Constraints:** Must be a positive number (> 0)
- **Required:** Yes (for create), No (for update)

### Facilities
- **Type:** Array of strings
- **Example:** `["WiFi", "AC", "Parking", "Laundry", "Security"]`
- **Required:** Yes (for create), No (for update)

### Owner Name
- **Type:** String
- **Length:** 3-100 characters
- **Required:** Yes (for create), No (for update)

### Type
- **Type:** String
- **Allowed Values:** `"PG"`, `"Hostel"`, `"Apartment"`
- **Case-sensitive:** Yes
- **Required:** Yes (for create), No (for update)

### Contact Number
- **Type:** String
- **Required:** Yes (for create), No (for update)

---

## Special Features

### Automatic Room Creation

When creating a property with both `totalRooms` and `totalBeds`:
- The system automatically creates the specified number of rooms
- Beds are distributed evenly across rooms
- If beds don't divide evenly, extra beds are assigned to the first few rooms
- Each room is initialized with:
  - Room number (starting from 1)
  - Number of beds (calculated from distribution)
  - Available beds (same as total beds initially)
  - Default rent (from property's `rentPerBed`)

**Example:**
- `totalRooms: 10`, `totalBeds: 20` → Each room gets 2 beds
- `totalRooms: 10`, `totalBeds: 23` → 7 rooms get 2 beds, 3 rooms get 3 beds

### Available Beds Tracking

- `availableBeds` is automatically set to `totalBeds` when property is created
- `availableBeds` decreases by 1 when a tenant is assigned to a bed
- `availableBeds` increases by 1 when a bed is released (tenant checkout/deletion)
- `availableBeds` never exceeds `totalBeds`

---

## Example cURL Commands

### Create Property
```bash
curl -X POST http://localhost:3000/api/property \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "propertyName": "Sunshine PG",
    "location": "123 Main Street, Bangalore",
    "totalRooms": 10,
    "totalBeds": 20,
    "rentPerBed": 5000,
    "facilities": ["WiFi", "AC", "Parking"],
    "ownerName": "John Doe",
    "type": "PG",
    "contactNumber": "9876543210"
  }'
```

### Get All Properties
```bash
curl -X GET http://localhost:3000/api/property \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Property by ID
```bash
curl -X GET http://localhost:3000/api/property/PROPERTY_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Property
```bash
curl -X PUT http://localhost:3000/api/property/PROPERTY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "rentPerBed": 5500,
    "facilities": ["WiFi", "AC", "Parking", "Gym"]
  }'
```

### Delete Property
```bash
curl -X DELETE http://localhost:3000/api/property/PROPERTY_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Notes

1. **Owner ID:** The `ownerId` is automatically extracted from the JWT token and should not be included in request bodies.

2. **Room Creation:** Rooms are only created automatically if both `totalRooms` and `totalBeds` are provided and are valid positive integers.

3. **Available Beds:** The `availableBeds` field is managed automatically by the system and should not be manually set in create/update requests.

4. **Property Type:** The `type` field is case-sensitive and must exactly match one of the allowed values: "PG", "Hostel", or "Apartment".

5. **Partial Updates:** For update requests, you only need to include the fields you want to change. All other fields remain unchanged.

6. **Authorization:** You can only access properties that belong to your account (ownerId from JWT token).

