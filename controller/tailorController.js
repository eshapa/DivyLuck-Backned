const Tailor = require('../models/tailorModel');

const registerTailor = async (req, res) => {
  try {
    const tailor = new Tailor(req.body);
    const savedTailor = await tailor.save();
    res.status(201).json({ message: 'Tailor registered successfully', tailor: savedTailor });
  } catch (error) {
    console.error('Error registering tailor:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const getAllTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find();
    res.status(200).json(tailors);
  } catch (error) {
    console.error('Error fetching tailors:', error);
    res.status(500).json({ message: 'Failed to fetch tailors', error: error.message });
  }
};

module.exports = {
  registerTailor,
  getAllTailors,
};
