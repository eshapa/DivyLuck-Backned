const Image = require('../Models/imageModels');
const Tailor = require('../Models/tailorModel');
const path = require('path');

const uploadImage = async (req, res) => {
  try {
    const tailorId = req.params.tailorId;

    const tailor = await Tailor.findById(tailorId);
    if (!tailor) {
      return res.status(404).json({ message: 'Tailor not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const newImage = new Image({
      tailorId: tailorId,
      imagePath: `/uploads/portfolio/${req.file.filename}`,
      caption: req.body.caption || '',
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate('tailorId');
    res.status(200).json(images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ message: 'Failed to retrieve images', error: error.message });
  }
};

const getImagesByTailorId = async (req, res) => {
  try {
    const { tailorId } = req.params;
    const images = await Image.find({ tailorId }).populate('tailorId');
    res.status(200).json(images);
  } catch (error) {
    console.error('Error retrieving images by tailorId:', error);
    res.status(500).json({ message: 'Failed to retrieve images', error: error.message });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImagesByTailorId,
};
