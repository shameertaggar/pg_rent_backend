# Custom Bed Rent Feature - API Documentation

## Overview
The PG Management System now supports **custom rent per bed** functionality. Each bed in a room can have its own individual rent amount, allowing for flexible pricing based on bed location, amenities, or other factors.

## New Data Structure

### Room Model Updates
```javascript
{
  roomNumber: 1,
  propertyId: "property_id",
  ownerId: "owner_id",
  beds: 2,
  availableBeds: 1,
  defaultRent: 5000, // Default rent for new beds
  bedsArray: [
    {
      bedNumber: 1,
      rent: 5500, // Custom rent for this bed
      isOccupied: true,
      tenantId: "tenant_id",
      occupiedAt: "2024-01-15T10:30:00Z"
    },
    {
      bedNumber: 2,
      rent: 4500, // Different rent for this bed
      isOccupied: false,
      tenantId: null,
      occupiedAt: null
    }
  ]
}
```

## New API Endpoints

### 1. Get Available Beds in a Room
**GET** `/api/rooms/:roomId/beds/available`

**Response:**
```json
[
  {
    "bedNumber": 2,
    "rent": 4500,
    "isOccupied": false,
    "tenantId": null,
    "occupiedAt": null
  }
]
```

### 2. Assign Bed to Tenant
**POST** `/api/rooms/beds/assign`

**Request Body:**
```json
{
  "roomId": "room_id",
  "bedNumber": 2,
  "tenantId": "tenant_id",
  "customRent": 4800
}
```

**Response:**
```json
{
  "message": "Bed assigned successfully",
  "bed": {
    "bedNumber": 2,
    "rent": 4800,
    "isOccupied": true,
    "tenantId": "tenant_id",
    "occupiedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 3. Release Bed from Tenant
**POST** `/api/rooms/beds/release`

**Request Body:**
```json
{
  "roomId": "room_id",
  "bedNumber": 2
}
```

**Response:**
```json
{
  "message": "Bed released successfully",
  "bed": {
    "bedNumber": 2,
    "rent": 4800,
    "isOccupied": false,
    "tenantId": null,
    "occupiedAt": null
  }
}
```

### 4. Update Bed Rent
**PUT** `/api/rooms/beds/rent`

**Request Body:**
```json
{
  "roomId": "room_id",
  "bedNumber": 2,
  "newRent": 5000
}
```

**Response:**
```json
{
  "message": "Bed rent updated successfully",
  "bed": {
    "bedNumber": 2,
    "rent": 5000,
    "isOccupied": false,
    "tenantId": null,
    "occupiedAt": null
  }
}
```

## Updated Tenant Creation

### Create Tenant with Bed Assignment
**POST** `/api/tenants`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "123 Main Street, City",
  "emergency_contact": "9876543211",
  "emergency_contact_name": "Jane Doe",
  "id_proof_type": "aadhar",
  "id_proof_number": "123456789012",
  "propertyName": "My PG",
  "roomId": "room_id",
  "bedNumber": 1,
  "customRent": 5500
}
```

**Response:**
```json
{
  "id": "tenant_id",
  "message": "Tenant created successfully",
  "bedAssigned": true
}
```

## Updated Rent Management

### Create Rent Record with Bed-Specific Rent
**POST** `/api/rent`

**Request Body:**
```json
{
  "propertyId": "property_id",
  "tenantId": "tenant_id",
  "roomId": "room_id",
  "bedNumber": 1,
  "due_date": "2024-02-01",
  "payment_method": "upi",
  "remarks": "Monthly rent"
}
```

**Note:** The `rent_amount` will be automatically fetched from the bed's custom rent.

## Workflow Examples

### 1. Creating a Property with Rooms
```javascript
// 1. Create property
POST /api/property
{
  "propertyName": "Sunshine PG",
  "location": "Bangalore",
  "totalRooms": 3,
  "rentPerBed": 5000, // Default rent
  "facilities": ["WiFi", "AC"],
  "ownerName": "Owner Name",
  "type": "PG",
  "contactNumber": "9876543210"
}

// This automatically creates 3 rooms with beds having default rent of 5000
```

### 2. Assigning Custom Rent to Beds
```javascript
// 2. Update bed rents individually
PUT /api/rooms/beds/rent
{
  "roomId": "room_1_id",
  "bedNumber": 1,
  "newRent": 5500 // Premium bed near window
}

PUT /api/rooms/beds/rent
{
  "roomId": "room_1_id", 
  "bedNumber": 2,
  "newRent": 4500 // Standard bed
}
```

### 3. Tenant Onboarding with Bed Assignment
```javascript
// 3. Create tenant and assign to specific bed
POST /api/tenants
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phone": "9876543210",
  "address": "456 Oak Street",
  "emergency_contact": "9876543211",
  "emergency_contact_name": "Bob Smith",
  "id_proof_type": "aadhar",
  "id_proof_number": "987654321098",
  "propertyName": "Sunshine PG",
  "roomId": "room_1_id",
  "bedNumber": 1,
  "customRent": 5500
}
```

### 4. Rent Collection
```javascript
// 4. Create rent record (automatically uses bed's custom rent)
POST /api/rent
{
  "propertyId": "property_id",
  "tenantId": "tenant_id",
  "roomId": "room_1_id",
  "bedNumber": 1,
  "due_date": "2024-02-01",
  "payment_method": "upi"
}
// rent_amount will be automatically set to 5500
```

## Benefits

1. **Flexible Pricing**: Different beds can have different rents based on location, amenities, or market demand
2. **Automatic Rent Calculation**: Rent records automatically use the bed's custom rent amount
3. **Bed Management**: Easy tracking of bed occupancy and rent changes
4. **Tenant Assignment**: Seamless bed assignment during tenant onboarding
5. **Rent History**: Complete tracking of rent changes per bed

## Error Handling

- **Bed Already Occupied**: Returns error if trying to assign occupied bed
- **Bed Not Found**: Returns error if bed number doesn't exist
- **Invalid Rent**: Returns error if rent amount is negative
- **Unauthorized Access**: Returns error if user doesn't own the room/property

## Security Features

- All endpoints require JWT authentication
- Owner-based access control ensures users can only manage their own beds
- Input validation prevents invalid data entry
- Transaction safety ensures data consistency during bed assignments

