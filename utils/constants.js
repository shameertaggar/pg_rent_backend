const Constants = {
    PROPERTY_COLLECTION: "properties",
    TENANT_COLLECTION: "tenants",
    OWNER_ID: "ownerId",
    EMAIL: "email",
    OWNER_COLLECTION: "owners",
    SECRET_KEY: process.env.JWT_SECRET,
    JWT_TOKEN_EXPIRY: "7d",
    PROPERTY_ID: "propertyId",
    ROOM_COLLECTION: "rooms",
    RENT_COLLECTION: "Rent",
    EXPENSE_COLLECTION: "Expenses",
    BOOKING_COLLECTION: "Bookings",
    ISSUE_COLLECTION: "Issues"
  };
  
  module.exports = { Constants };
  