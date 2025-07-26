const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary.js');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temp storage

router.post('/video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "your_app_videos",
    });

    fs.unlinkSync(req.file.path);

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;