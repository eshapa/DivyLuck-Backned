const mongoose = require("mongoose");

const tailorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopName: { type: String },
  tailorType: { type: String },
  experience: { type: Number },
  specialty: { type: String },
  city: { type: String },
  location: { type: String },
  pricingModel: { type: String },
  portfolioImages: { type: [String] }, // Array of image URLs
  profilePicture: { type: String },
});

module.exports = mongoose.model("Tailor", tailorSchema);
