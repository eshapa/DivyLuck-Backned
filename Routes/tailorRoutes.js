// routes/tailorRoutes.js
const express = require('express');
const router = express.Router();
const { registerTailor, getAllTailors } = require('../controller/tailorController');

// Register tailor
router.post('/register', registerTailor);

// Get all tailors
router.get('/', getAllTailors);

module.exports = router;
