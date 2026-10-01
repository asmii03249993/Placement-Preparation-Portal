const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Library Management System API is Running..."
  });
});

// Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});