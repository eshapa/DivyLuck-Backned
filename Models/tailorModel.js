const mongoose = require('mongoose');

const tailorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  phone: { type: String },
  city: { type: String },
  shopName: { type: String },
  tailorType: { type: String },
  experience: { type: String },
  specialty: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  pricingModel: { type: String },
  profilePicture: { type: String },

});

// ✅ Fix overwrite error
const Tailor = mongoose.models.Tailor || mongoose.model('Tailor', tailorSchema);

module.exports = Tailor;
