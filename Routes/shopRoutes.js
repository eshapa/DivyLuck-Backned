const express = require('express');
const router = express.Router();
const shopController = require('../controller/shopController');
const validateShop = require('../Middleware/validateShop');
const upload = require('../Middleware/uploadFiles');

// ⬆️ Fields expected: shopImage, profileImage, logo
router.post(
    '/register',
    upload.fields([
        { name: 'shopImage', maxCount: 1 },
        { name: 'profileImage', maxCount: 1 },
        { name: 'logo', maxCount: 1 }
    ]),
    validateShop,
    shopController.registerShop
);

// 📦 Get All Shops
router.get('/all', shopController.getAllShops);

module.exports = router;
