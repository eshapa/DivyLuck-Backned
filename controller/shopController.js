const Shop = require('../Models/shopModels');
const bcrypt = require('bcryptjs');

exports.registerShop = async (req, res) => {
    try {
        const {
            shopName,
            owner,
            email,
            password,
            confirmPassword,
            contact,
            location,
            businessLicense
        } = req.body;

        // Password check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // Check for existing email
        const existingShop = await Shop.findOne({ email });
        if (existingShop) {
            return res.status(400).json({ message: 'Shop already registered with this email.' });
        }

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // File upload fields
        const shopImage = req.files['shopImage']?.[0]?.filename || '';
        const profileImage = req.files['profileImage']?.[0]?.filename || '';
        const logo = req.files['logo']?.[0]?.filename || '';

        // Save new shop
        const newShop = new Shop({
            shopName,
            owner,
            email,
            password: hashedPassword,
            contact,
            location,
            businessLicense,
            shopImage,
            profileImage,
            logo
        });

        await newShop.save();
        res.status(201).json({ message: 'Shop registered successfully!', shop: newShop });

    } catch (error) {
        console.error('Error registering shop:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all shops
exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.status(200).json(shops);
    } catch (error) {
        console.error('Error fetching shops:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
