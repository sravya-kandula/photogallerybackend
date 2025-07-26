const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");

// Upload a photo
router.post("/upload", async (req, res) => {
  const { imageUrl, title, description } = req.body;
  try {
    const newPhoto = new Photo({ imageUrl, title, description });
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all photos
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadedAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
