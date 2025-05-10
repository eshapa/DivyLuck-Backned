const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

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
// const adminRoutes = require('./routes/adminRoutes'); // Uncomment when needed
// const orderRoutes = require('./routes/orderRoutes'); // Uncomment when needed

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/tailors', tailorRoutes);
app.use('/api/temp', tempEmailRoutes);
