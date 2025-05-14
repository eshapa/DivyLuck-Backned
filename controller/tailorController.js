// controllers/tailorController.js
const Tailor = require('../Models/tailorModel');

const registerTailor = async (req, res) => {
  try {
    const newTailor = new Tailor(req.body);
    await newTailor.save();
    res.status(201).json({ message: 'Tailor registered successfully', tailor: newTailor });
  } catch (error) {
    console.error('Error registering tailor:', error);
    res.status(500).json({ message: 'Failed to register tailor', error: error.message });
  }
};

const getAllTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find();
    res.status(200).json(tailors);
  } catch (error) {
    console.error('Error getting tailors:', error);
    res.status(500).json({ message: 'Failed to get tailors', error: error.message });
  }
};

module.exports = {
  registerTailor,
  getAllTailors,
};
