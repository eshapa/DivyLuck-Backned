const express = require('express');
const router = express.Router();
const {
  uploadImage,
  getAllImages,
  getImagesByTailorId,
} = require('../controller/imagecontroller');

const upload = require('../Middleware/upload');

// Upload image for a specific tailor
router.post('/upload/:tailorId', upload.single('image'), uploadImage);

// Get all images
router.get('/', getAllImages);

// Get images by tailorId
router.get('/:tailorId', getImagesByTailorId);

module.exports = router;
