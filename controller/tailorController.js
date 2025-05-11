const Tailor = require("../Models/tailorModel");

exports.registerTailor = async (req, res) => {
  try {
    // Check if all required fields are present
    const { name, gender, phone, email, password } = req.body;
    if (!name || !gender || !phone || !email || !password) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const tailor = await Tailor.create(req.body);
    res.status(201).json(tailor);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};

exports.getAllTailors = async (req, res) => {
  try {
    const { gender } = req.query;

    // Build query object for optional filtering
    const query = gender
      ? { gender: { $regex: new RegExp(`^${gender}$`, 'i') } }
      : {};

    const tailors = await Tailor.find(query);
    res.status(200).json(tailors);
  } catch (error) {
    console.error('Error fetching tailors:', error);
    res.status(500).json({ error: error.message });
  }
};
