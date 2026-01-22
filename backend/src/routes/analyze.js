const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/analyze', upload.single('contract'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded'
      });
    }

    const file = req.file; // get file info

    console.log('File received:', {
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    });

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        name: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;