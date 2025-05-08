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
            businessLicense,
            shopImage,
            profileImage,
            logo,
            categories
        } = req.body;

        // ✅ 1. Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // ✅ 2. Check if email already exists
        const existingShop = await Shop.findOne({ email });
        if (existingShop) {
            return res.status(400).json({ message: 'Shop already registered with this email.' });
        }

        // ✅ 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ 4. Create new Shop instance
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
            logo,
            categories
        });

        // ✅ 5. Save to database
        await newShop.save();
        res.status(201).json({ message: 'Shop registered successfully!', shop: newShop });

    } catch (error) {
        console.error('Error registering shop:', error); // full error for better debugging
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.status(200).json(shops);
    } catch (error) {
        console.error('Error fetching shops:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
