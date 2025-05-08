const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    owner: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String },
    businessLicense: { type: String },
    shopImage: { type: String },
    profileImage: { type: String },
    logo: { type: String },
    categories: [
        {
            categoryName: String,
            types: [
                {
                    typeName: String,
                    price: Number
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Shop', shopSchema);
