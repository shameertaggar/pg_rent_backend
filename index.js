// index.js
require("dotenv").config(); // ✅ Load .env FIRST

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // In development, allow any localhost origin
    if (
      process.env.NODE_ENV !== "production" &&
      origin &&
      origin.includes("localhost")
    ) {
      return callback(null, true);
    }

    // For production, check environment variable for allowed origins
    const envAllowedOrigins =
      process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) || [];

    // Default allowed origins
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      ...envAllowedOrigins,
    ];

    // If ALLOW_ALL_ORIGINS is set to true, allow all origins (use with caution)
    if (process.env.ALLOW_ALL_ORIGINS === "true") {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For debugging - log the origin that was rejected
      console.log("CORS rejected origin:", origin);
      console.log("Allowed origins:", allowedOrigins);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Auth route (no JWT needed)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // ✅ Always keep auth route first
// Protected Routes (JWT will be needed inside route files)
const propertyRoutes = require("./routes/propertyRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const staffRoutes = require("./routes/staffRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const rentRoutes = require("./routes/rentRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const foodRoutes = require("./routes/foodRegisterRoutes");
const issueRoutes = require("./routes/issueRoutes");
const profitLossRoutes = require("./routes/profitLossRoutes");

// Apply routes
app.use("/api/issues", issueRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/profit-loss", profitLossRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
