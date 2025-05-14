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

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/Divyluck"; // Replace with your actual URI if different
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

// Set up multer storage engine for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create unique filename
  },
});

// Initialize multer with storage and file filter
const upload = multer({ storage });

// Route to handle image upload
app.post('/api/images/upload/:tailorId', upload.array('images'), (req, res) => {
  const tailorId = req.params.tailorId;

  if (!tailorId) {
    return res.status(400).json({ message: 'Tailor ID is required.' });
  }

  // Get captions and categories sent from frontend
  const imageDetails = req.files.map((file, index) => {
    const caption = req.body[`caption_${index}`];
    const category = req.body[`category_${index}`];
    
    return {
      tailorId,
      imageUrl: file.path, // Path to the uploaded image file
      caption,
      category,
    };
  });

  // Save or process image details (e.g., save to database)
  console.log('Uploaded Images:', imageDetails);

  // Send response
  res.status(200).json({ message: 'Images uploaded successfully!', imageDetails });
});

// Default Route
app.get("/", (req, res) => {
  res.send("💃 Divyluck Fashion Portal Backend is Running 🎉");
});

// Role-based Registration Route
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

// Custom Routes
const userRoutes = require('./Routes/userRoutes');
const shopRoutes = require('./Routes/shopRoutes');
const tailorRoutes = require('./Routes/tailorRoutes');
const tempEmailRoutes = require('./Routes/tempEmailRoutes');
const imageRoutes = require('./Routes/imageRoutes'); // Import image routes

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/tailors', tailorRoutes);
app.use('/api/temp', tempEmailRoutes);
app.use('/api/images', imageRoutes); // Add image routes
