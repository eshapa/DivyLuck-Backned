const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  tailorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tailor',
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'General',
  },
});

module.exports = mongoose.model('Image', imageSchema);
