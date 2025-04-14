// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pgRoutes = require("./routes/pgRoutes");
const tenantRoutes = require('./routes/tenantRoutes');
const staffRoutes = require('./routes/staffRoutes');
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const rentRoutes = require("./routes/rentRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const foodRoutes = require("./routes/foodRegisterRoutes");
const issueRoutes = require("./routes/issueRoutes");
app.use("/api/issues", issueRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use('/api/staff', staffRoutes);

// Middleware
app.use(express.json());

// Routes
app.use("/api/pgs", pgRoutes);
app.use("/api/tenants", tenantRoutes); 
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
