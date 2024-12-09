const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Use auth routes
app.use("/api/auth", authRoutes);

const progressRoutes = require("./routes/progress");
app.use("/api/progress", progressRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
