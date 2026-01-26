const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { extractPDFText } = require('../services/pdfParser');
const { analyzeContract } = require('../services/gemini');

router.post('/analyze', upload.single('contract'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file; // get file info
    console.log('📄 Processing PDF:', file.originalname);

    // extract text from pdf
    const text = await extractPDFText(file.buffer);
    console.log(`📝 Extracted ${text.length} characters`);

    // AI analyze
    const analysis = await analyzeContract(text);

    // return analysis
    res.json({
      success: true,
      file: {
        name: file.originalname,
        size: file.size,
      },
      analysis: analysis
    });

  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;