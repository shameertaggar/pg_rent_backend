# Tenant Portal & Authentication System

## Overview
This system provides tenant authentication using unique codes and date of birth, along with a comprehensive tenant portal for managing rent history, complaints, and checkout dates.

## 🔐 Authentication System

### Tenant Login
**Endpoint:** `POST /auth/tenant/login`

**Request Body:**
```json
{
  "tenantCode": "ABC12345",
  "dob": "1995-06-15"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "tenant": {
    "id": "tenant_id",
    "name": "John Doe",
    "email": "john@example.com",
    "tenantCode": "ABC12345",
    "propertyName": "Sunshine PG"
  }
}
```

### Unique Tenant Code Generation
- **Format:** 8 characters (uppercase letters and numbers)
- **Example:** `ABC12345`, `XYZ98765`
- **Generated automatically** when creating a new tenant
- **Unique across the system**

## 🏠 Tenant Portal Features

### 1. Profile Management
**Endpoint:** `GET /tenants/portal/profile`
**Authentication:** Required (Tenant JWT Token)

**Response:**
```json
{
  "id": "tenant_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "123 Main Street",
  "tenantCode": "ABC12345",
  "propertyName": "Sunshine PG",
  "roomId": "room_123",
  "bedNumber": 1,
  "checkIn": "2024-01-01T00:00:00.000Z",
  "checkoutDate": null
}
```

### 2. Rent History
**Endpoint:** `GET /tenants/portal/rent-history`
**Authentication:** Required (Tenant JWT Token)

**Response:**
```json
{
  "tenant": {
    "id": "tenant_id",
    "name": "John Doe",
    "propertyName": "Sunshine PG"
  },
  "rentHistory": [
    {
      "id": "rent_record_1",
      "amount": 5000,
      "month": "2024-01",
      "status": "paid",
      "dueDate": "2024-01-01",
      "paidDate": "2024-01-01",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 3. Complaints & Issues
**Endpoint:** `GET /tenants/portal/complaints`
**Authentication:** Required (Tenant JWT Token)

**Response:**
```json
[
  {
    "id": "complaint_1",
    "title": "Water Issue",
    "description": "No water supply in room",
    "status": "open",
    "priority": "high",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

### 4. Checkout Date Management
**Endpoint:** `PUT /tenants/portal/checkout-date`
**Authentication:** Required (Tenant JWT Token)

**Request Body:**
```json
{
  "checkoutDate": "2024-12-31"
}
```

**Response:**
```json
{
  "message": "Checkout date updated successfully"
}
```

## 🛠️ Owner Management Features

### Creating a New Tenant
**Endpoint:** `POST /tenants`
**Authentication:** Required (Owner JWT Token)

**Request Body:**
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

**Response:**
```json
{
  "id": "tenant_id",
  "tenantCode": "ABC12345",
  "message": "Tenant created successfully",
  "bedAssigned": true
}
```

## 🔒 Security Features

### JWT Token Structure
**Owner Token:**
```json
{
  "ownerId": "owner_id",
  "name": "Owner Name",
  "email": "owner@example.com",
  "exp": 1234567890
}
```

**Tenant Token:**
```json
{
  "tenantId": "tenant_id",
  "tenantCode": "ABC12345",
  "name": "John Doe",
  "email": "john@example.com",
  "userType": "tenant",
  "exp": 1234567890
}
```

### Middleware Protection
- **Owner Routes:** Protected by `authenticateJWT` middleware
- **Tenant Portal Routes:** Protected by `authenticateTenant` middleware
- **Token Validation:** Automatic token expiration and validation

## 📱 Usage Examples

### 1. Tenant Login Flow
```javascript
// Step 1: Tenant login
const loginResponse = await fetch('/auth/tenant/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tenantCode: 'ABC12345',
    dob: '1995-06-15'
  })
});

const { token, tenant } = await loginResponse.json();

// Step 2: Use token for authenticated requests
const profileResponse = await fetch('/tenants/portal/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### 2. Owner Creating Tenant
```javascript
const createTenantResponse = await fetch('/tenants', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ownerToken}`
  },
  body: JSON.stringify({
    name: 'John Doe',
    phone: '9876543210',
    email: 'john@example.com',
    dob: '1995-06-15',
    // ... other fields
  })
});

const { tenantCode } = await createTenantResponse.json();
// Share tenantCode with tenant for login
```

## 🎯 Key Benefits

1. **Secure Authentication:** Unique codes + DOB verification
2. **Self-Service Portal:** Tenants can manage their own data
3. **Rent Transparency:** Complete rent history visibility
4. **Issue Tracking:** Easy complaint submission and tracking
5. **Flexible Checkout:** Tenants can update their checkout dates
6. **Owner Control:** Full tenant management capabilities

## 🔧 Error Handling

### Common Error Responses
```json
{
  "error": "Invalid tenant code"
}
```

```json
{
  "error": "Invalid date of birth"
}
```

```json
{
  "error": "Access denied. No token provided."
}
```

```json
{
  "error": "Access denied. Invalid token type."
}
```

## 📋 API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/tenant/login` | None | Tenant login with code + DOB |
| GET | `/tenants/portal/profile` | Tenant | Get tenant profile |
| GET | `/tenants/portal/rent-history` | Tenant | Get rent history |
| GET | `/tenants/portal/complaints` | Tenant | Get complaints/issues |
| PUT | `/tenants/portal/checkout-date` | Tenant | Update checkout date |
| POST | `/tenants` | Owner | Create new tenant |
| GET | `/tenants` | Owner | Get all tenants |
| GET | `/tenants/:id` | Owner | Get tenant by ID |
| PUT | `/tenants/:id` | Owner | Update tenant |
| DELETE | `/tenants/:id` | Owner | Delete tenant |

The system is now ready for tenant authentication and portal management!
