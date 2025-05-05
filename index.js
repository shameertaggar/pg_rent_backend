// index.js
require("dotenv").config(); // ✅ Load .env FIRST

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Auth route (no JWT needed)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // ✅ Always keep auth route first

// Protected Routes (JWT will be needed inside route files)
const propertyRoutes = require("./routes/propertyRoutes");
const tenantRoutes = require('./routes/tenantRoutes');
const staffRoutes = require('./routes/staffRoutes');
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const rentRoutes = require("./routes/rentRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const foodRoutes = require("./routes/foodRegisterRoutes");
const issueRoutes = require("./routes/issueRoutes");

// Apply routes
app.use("/api/issues", issueRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use('/api/staff', staffRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/tenants", tenantRoutes); 

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
