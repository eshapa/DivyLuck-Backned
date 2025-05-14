const express = require('express');
const router = express.Router();
const { registerTailor, getAllTailors } = require('../controller/tailorController');

router.post('/register', registerTailor);
router.get('/', getAllTailors);

module.exports = router;
