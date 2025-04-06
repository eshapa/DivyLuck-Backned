const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  address: String,
  gender: String,
  role: {
    type: String,
    enum: ['user', 'tailor', 'shopkeeper'],
    default: 'user',
  },
  registeredOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
