const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files statically

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/Divyluck"; // Replace if your URI is different
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Multer setup for portfolio uploads
const portfolioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "uploads", "portfolio");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploadPortfolio = multer({ storage: portfolioStorage });

// Default Route
app.get("/", (req, res) => {
  res.send("💃 Divyluck Fashion Portal Backend is Running 🎉");
});

// Route for role-based registration logging
app.post("/api/register/:role", (req, res) => {
  const { role } = req.params;
  const { email } = req.body;

  if (!["user", "shopkeeper", "tailor"].includes(role)) {
    return res.status(400).json({ message: "Invalid role selected" });
  }

  console.log(`Registering ${email} as ${role}`);

  res.status(200).json({
    message: `Successfully registered ${email} as ${role}`,
    email,
    role,
  });
});

// Import routes
const userRoutes = require('./Routes/userRoutes');
const shopRoutes = require('./Routes/shopRoutes');
const tailorRoutes = require('./Routes/tailorRoutes');
const tempEmailRoutes = require('./Routes/tempEmailRoutes');
const imageRoutes = require('./Routes/imageRoutes');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/tailors', tailorRoutes);
app.use('/api/temp', tempEmailRoutes);
app.use('/api/images', imageRoutes);