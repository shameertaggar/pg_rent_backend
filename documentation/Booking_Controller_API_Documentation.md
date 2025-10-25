# 📅 Booking Controller API Documentation

## Overview
This document provides comprehensive curl requests for all booking operations in the PG Management System. All endpoints require owner authentication using JWT tokens.

## 🔐 Authentication
All booking endpoints require the following header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Your Token:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ`

---

## 📋 **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings` | Get all bookings for owner |
| GET | `/api/bookings/:id` | Get specific booking by ID |
| PUT | `/api/bookings/:id` | Update booking by ID |
| DELETE | `/api/bookings/:id` | Delete booking by ID |
| GET | `/api/bookings/filter/all` | Filter bookings by criteria |
| GET | `/api/bookings/stats/summary` | Get booking statistics |
| GET | `/api/bookings/search/term` | Search bookings by name |

---

## 🚀 **Curl Requests**

### 1. **Create Booking**
Creates a new booking for a tenant in a specific room.

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID_HERE",
    "tenantId": "TENANT_ID_HERE",
    "roomId": "ROOM_ID_HERE",
    "booking_date": "2024-01-15",
    "checkIn_date": "2024-02-01",
    "checkOut_date": "2024-12-31",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'
```

**Expected Response:**
```json
{
  "id": "booking_id_here"
}
```

### 2. **Get All Bookings**
Retrieves all bookings for properties owned by the authenticated owner.

```bash
curl -X GET http://localhost:3000/api/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

**Expected Response:**
```json
[
  {
    "id": "booking_id_1",
    "propertyId": "property_id_1",
    "tenantId": "tenant_id_1",
    "roomId": "room_id_1",
    "booking_date": "2024-01-15T00:00:00.000Z",
    "checkIn_date": "2024-02-01T00:00:00.000Z",
    "checkOut_date": "2024-12-31T00:00:00.000Z",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed",
    "ownerId": "owner_id_here",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

### 3. **Get Booking by ID**
Retrieves a specific booking by its ID.

```bash
curl -X GET http://localhost:3000/api/bookings/BOOKING_ID_HERE \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

**Expected Response:**
```json
{
  "id": "booking_id_here",
  "propertyId": "property_id_here",
  "tenantId": "tenant_id_here",
  "roomId": "room_id_here",
  "booking_date": "2024-01-15T00:00:00.000Z",
  "checkIn_date": "2024-02-01T00:00:00.000Z",
  "checkOut_date": "2024-12-31T00:00:00.000Z",
  "rent_amount": 5000,
  "deposit_amount": 10000,
  "status": "confirmed",
  "ownerId": "owner_id_here",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

### 4. **Update Booking**
Updates an existing booking with new information.

```bash
curl -X PUT http://localhost:3000/api/bookings/BOOKING_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "checkIn_date": "2024-02-15",
    "checkOut_date": "2024-11-30",
    "rent_amount": 5500,
    "deposit_amount": 11000,
    "status": "confirmed"
  }'
```

**Expected Response:**
```json
{
  "message": "Booking updated successfully"
}
```

### 5. **Delete Booking**
Deletes a booking and all associated data.

```bash
curl -X DELETE http://localhost:3000/api/bookings/BOOKING_ID_HERE \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

**Expected Response:**
```json
{
  "message": "Booking deleted successfully"
}
```

### 6. **Filter Bookings by Status**
```bash
curl -X GET "http://localhost:3000/api/bookings/filter/all?status=confirmed" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### 7. **Filter Bookings by Date Range**
```bash
curl -X GET "http://localhost:3000/api/bookings/filter/all?checkInDateFrom=2024-01-01&checkInDateTo=2024-12-31" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### 8. **Filter Bookings by Rent Amount Range**
```bash
curl -X GET "http://localhost:3000/api/bookings/filter/all?minRentAmount=4000&maxRentAmount=6000" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### 9. **Filter Bookings by Property**
```bash
curl -X GET "http://localhost:3000/api/bookings/filter/all?propertyId=PROPERTY_ID_HERE" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### 10. **Filter Bookings by Tenant**
```bash
curl -X GET "http://localhost:3000/api/bookings/filter/all?tenantId=TENANT_ID_HERE" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### 11. **Filter Bookings with Pagination**
```bash
curl -X GET "http://localhost:3000/api/bookings/filter/all?limit=10&offset=0&sortBy=created_at&sortOrder=desc" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### 12. **Get Booking Statistics**
```bash
curl -X GET "http://localhost:3000/api/bookings/stats/summary" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### 13. **Get Filtered Booking Statistics**
```bash
curl -X GET "http://localhost:3000/api/bookings/stats/summary?status=confirmed&minRentAmount=4000" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### 14. **Search Bookings by Name**
```bash
curl -X GET "http://localhost:3000/api/bookings/search/term?searchTerm=John" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

---

## 🔍 **Filter Parameters**

### **Available Filter Options**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | string | Filter by booking status | `pending`, `confirmed`, `cancelled` |
| `propertyId` | string | Filter by specific property | `property_id_here` |
| `tenantId` | string | Filter by specific tenant | `tenant_id_here` |
| `roomId` | string | Filter by specific room | `room_id_here` |
| `checkInDateFrom` | date | Check-in date from | `2024-01-01` |
| `checkInDateTo` | date | Check-in date to | `2024-12-31` |
| `checkOutDateFrom` | date | Check-out date from | `2024-01-01` |
| `checkOutDateTo` | date | Check-out date to | `2024-12-31` |
| `bookingDateFrom` | date | Booking date from | `2024-01-01` |
| `bookingDateTo` | date | Booking date to | `2024-12-31` |
| `minRentAmount` | number | Minimum rent amount | `4000` |
| `maxRentAmount` | number | Maximum rent amount | `6000` |
| `minDepositAmount` | number | Minimum deposit amount | `8000` |
| `maxDepositAmount` | number | Maximum deposit amount | `12000` |
| `sortBy` | string | Sort field | `created_at`, `checkIn_date`, `rent_amount` |
| `sortOrder` | string | Sort order | `asc`, `desc` |
| `limit` | number | Number of results | `10` |
| `offset` | number | Skip results | `0` |

### **Filter Response Format**
```json
{
  "bookings": [
    {
      "id": "booking_id",
      "propertyId": "property_id",
      "tenantId": "tenant_id",
      "roomId": "room_id",
      "status": "confirmed",
      "rent_amount": 5000,
      "deposit_amount": 10000,
      "checkIn_date": "2024-02-01T00:00:00.000Z",
      "checkOut_date": "2024-12-31T00:00:00.000Z"
    }
  ],
  "totalCount": 1,
  "filters": {
    "status": "confirmed",
    "minRentAmount": 4000
  }
}
```

### **Statistics Response Format**
```json
{
  "stats": {
    "totalBookings": 15,
    "statusBreakdown": {
      "confirmed": 10,
      "pending": 3,
      "cancelled": 2
    },
    "totalRentAmount": 75000,
    "totalDepositAmount": 150000,
    "averageRentAmount": 5000,
    "averageDepositAmount": 10000,
    "dateRange": {
      "earliestCheckIn": "2024-01-01T00:00:00.000Z",
      "latestCheckIn": "2024-12-31T00:00:00.000Z",
      "earliestCheckOut": "2024-06-01T00:00:00.000Z",
      "latestCheckOut": "2025-06-01T00:00:00.000Z"
    }
  },
  "filters": {
    "status": "confirmed"
  }
}
```

### **Search Response Format**
```json
{
  "bookings": [
    {
      "id": "booking_id",
      "propertyId": "property_id",
      "tenantId": "tenant_id",
      "roomId": "room_id",
      "status": "confirmed",
      "rent_amount": 5000,
      "deposit_amount": 10000
    }
  ],
  "totalCount": 1,
  "searchTerm": "John"
}
```

---

## 📝 **Request Body Schemas**

### **Create Booking Schema**
```json
{
  "propertyId": "string (required)",
  "tenantId": "string (required)",
  "roomId": "string (required)",
  "booking_date": "date (optional, defaults to current date)",
  "checkIn_date": "date (required)",
  "checkOut_date": "date (optional, can be null)",
  "rent_amount": "number (positive, required)",
  "deposit_amount": "number (min 0, required)",
  "status": "string (pending|confirmed|cancelled, defaults to pending)"
}
```

### **Update Booking Schema**
All fields are optional for updates:
```json
{
  "checkIn_date": "date",
  "checkOut_date": "date (can be null)",
  "rent_amount": "number (positive)",
  "deposit_amount": "number (min 0)",
  "status": "string (pending|confirmed|cancelled)"
}
```

---

## 🎯 **Testing Scenarios**

### **1. Complete CRUD Testing Sequence**

```bash
# Step 1: Create Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "booking_date": "2024-01-15",
    "checkIn_date": "2024-02-01",
    "checkOut_date": "2024-12-31",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'

# Step 2: Get All Bookings (verify creation)
curl -X GET http://localhost:3000/api/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Step 3: Get Specific Booking (replace BOOKING_ID with actual ID)
curl -X GET http://localhost:3000/api/bookings/BOOKING_ID \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Step 4: Update Booking
curl -X PUT http://localhost:3000/api/bookings/BOOKING_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "rent_amount": 5500,
    "status": "confirmed"
  }'

# Step 5: Delete Booking
curl -X DELETE http://localhost:3000/api/bookings/BOOKING_ID \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

### **2. Different Booking Statuses**

```bash
# Pending Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-03-01",
    "rent_amount": 4500,
    "deposit_amount": 9000,
    "status": "pending"
  }'

# Confirmed Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-03-15",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'

# Cancelled Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-04-01",
    "rent_amount": 4800,
    "deposit_amount": 9600,
    "status": "cancelled"
  }'
```

### **3. Different Rent and Deposit Scenarios**

```bash
# High-end Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "checkOut_date": "2024-12-31",
    "rent_amount": 8000,
    "deposit_amount": 16000,
    "status": "confirmed"
  }'

# Budget Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "rent_amount": 3000,
    "deposit_amount": 6000,
    "status": "confirmed"
  }'

# No Deposit Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "rent_amount": 4000,
    "deposit_amount": 0,
    "status": "confirmed"
  }'
```

### **4. Date Scenarios**

```bash
# Short-term Booking (1 month)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "checkOut_date": "2024-03-01",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'

# Long-term Booking (1 year)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "checkOut_date": "2025-02-01",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'

# Open-ended Booking (no checkout date)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "checkOut_date": null,
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'
```

### **5. Partial Updates**

```bash
# Update only status
curl -X PUT http://localhost:3000/api/bookings/BOOKING_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "status": "confirmed"
  }'

# Update only rent amount
curl -X PUT http://localhost:3000/api/bookings/BOOKING_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "rent_amount": 5500
  }'

# Update checkout date
curl -X PUT http://localhost:3000/api/bookings/BOOKING_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "checkOut_date": "2024-11-30"
  }'
```

### **6. Advanced Filter Testing**

```bash
# Multiple filters combined
curl -X GET "http://localhost:3000/api/bookings/filter/all?status=confirmed&minRentAmount=4000&maxRentAmount=6000&checkInDateFrom=2024-01-01&checkInDateTo=2024-12-31" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Filter by specific property and tenant
curl -X GET "http://localhost:3000/api/bookings/filter/all?propertyId=PROPERTY_ID&tenantId=TENANT_ID" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Filter with pagination and sorting
curl -X GET "http://localhost:3000/api/bookings/filter/all?status=confirmed&sortBy=rent_amount&sortOrder=desc&limit=5&offset=0" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Get statistics for specific filters
curl -X GET "http://localhost:3000/api/bookings/stats/summary?status=confirmed&propertyId=PROPERTY_ID" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Search by partial tenant name
curl -X GET "http://localhost:3000/api/bookings/search/term?searchTerm=John" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"

# Search by property name
curl -X GET "http://localhost:3000/api/bookings/search/term?searchTerm=Sunshine" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

---

## 🚨 **Error Testing**

### **1. Invalid Token**
```bash
curl -X GET http://localhost:3000/api/bookings \
  -H "Authorization: Bearer invalid_token"
```

### **2. Missing Required Fields**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID"
  }'
```

### **3. Invalid Status**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "invalid_status"
  }'
```

### **4. Negative Rent Amount**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "rent_amount": -1000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'
```

### **5. Invalid Date Format**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "invalid-date",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'
```

### **6. Non-existent Property ID**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "non_existent_property_id",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'
```

### **7. Non-existent Tenant ID**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "non_existent_tenant_id",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'
```

### **8. Non-existent Room ID**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "non_existent_room_id",
    "checkIn_date": "2024-02-01",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }'
```

### **9. Property/Tenant/Room Belongs to Different Owner**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "OTHER_OWNER_PROPERTY_ID",
    "tenantId": "OTHER_OWNER_TENANT_ID",
    "roomId": "OTHER_OWNER_ROOM_ID",
    "checkIn_date": "2024-02-01",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
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
| 404 | Not Found (booking doesn't exist) |
| 500 | Internal Server Error |

---

## 🔧 **Features**

### **Booking Management**
- Create bookings with tenant, room, and property associations
- Track booking status (pending, confirmed, cancelled)
- Manage check-in and check-out dates
- Handle rent and deposit amounts
- Automatic booking date timestamping

### **Validation Features**
- Property ID: required string
- Tenant ID: required string
- Room ID: required string
- Check-in date: required date
- Check-out date: optional date (can be null)
- Rent amount: positive number
- Deposit amount: non-negative number
- Status: pending, confirmed, or cancelled

### **Security Features**
- JWT token authentication required
- Owner can only access bookings for their properties
- Automatic owner ID injection from token
- Input validation and sanitization

### **Database Validation Features**
- **Property Validation**: Ensures property exists and belongs to the owner
- **Tenant Validation**: Ensures tenant exists and belongs to owner's property
- **Room Validation**: Ensures room exists and belongs to owner's property
- **Cross-Reference Validation**: Validates relationships between property, tenant, and room
- **Ownership Verification**: Prevents cross-owner data access

---

## 🎯 **Quick Test Commands**

### **Create and Test Booking**
```bash
# Create booking
BOOKING_RESPONSE=$(curl -s -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "propertyId": "PROPERTY_ID",
    "tenantId": "TENANT_ID",
    "roomId": "ROOM_ID",
    "checkIn_date": "2024-02-01",
    "rent_amount": 5000,
    "deposit_amount": 10000,
    "status": "confirmed"
  }')

echo "Booking created: $BOOKING_RESPONSE"

# Extract booking ID (requires jq)
BOOKING_ID=$(echo $BOOKING_RESPONSE | jq -r '.id')
echo "Booking ID: $BOOKING_ID"

# Get the booking
curl -X GET http://localhost:3000/api/bookings/$BOOKING_ID \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ"
```

---

## 📋 **Prerequisites for Testing**

Before testing booking operations, ensure you have:

1. **Property ID**: Create a property first using the property API
2. **Tenant ID**: Create a tenant first using the tenant API
3. **Room ID**: Create rooms for the property using the room API

### **Complete Setup Sequence**
```bash
# 1. Create Property
PROPERTY_RESPONSE=$(curl -s -X POST http://localhost:3000/api/property \
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
  }')

PROPERTY_ID=$(echo $PROPERTY_RESPONSE | jq -r '.propertyId')

# 2. Create Tenant
TENANT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/tenants \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "address": "123 Main Street",
    "emergency_contact": "9876543211",
    "emergency_contact_name": "Jane Doe",
    "id_proof_type": "aadhar",
    "id_proof_number": "123456789012",
    "dob": "1995-06-15",
    "propertyName": "Test PG"
  }')

TENANT_ID=$(echo $TENANT_RESPONSE | jq -r '.id')

# 3. Get Room ID (assuming room 1 exists)
ROOM_RESPONSE=$(curl -s -X GET http://localhost:3000/api/rooms \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ")

ROOM_ID=$(echo $ROOM_RESPONSE | jq -r '.[0].id')

# 4. Now create booking with all IDs
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiUXNQR2Nqa3B3WlRLQkNDS2Z6QmsiLCJuYW1lIjoiU2hhbWVlciIsImVtYWlsIjoic2hhbWVlcnRhZ2dhcnJAZ21haWwuY29tIiwiaWF0IjoxNzYxMTQ0NzYzLCJleHAiOjE3NjE3NDk1NjN9.mclsgekbHHd0UqedGH_BLo-YapwBobDD9yhh3S1XOdQ" \
  -d "{
    \"propertyId\": \"$PROPERTY_ID\",
    \"tenantId\": \"$TENANT_ID\",
    \"roomId\": \"$ROOM_ID\",
    \"checkIn_date\": \"2024-02-01\",
    \"rent_amount\": 5000,
    \"deposit_amount\": 10000,
    \"status\": \"confirmed\"
  }"
```

This comprehensive documentation provides all the curl requests needed to test booking operations with your JWT token!
