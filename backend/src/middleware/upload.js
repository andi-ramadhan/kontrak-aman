const multer = require('multer');

const storage = multer.memoryStorage(); //this would store files in memory as buffer

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // this is 5MB max
  }
});

module.exports = upload;