const multer = require('multer'); 
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message);

  //  Handle Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Max 5MB.' });
    }
    if (err.code === 'LIMIT_FIELD_KEY') {
      return res.status(400).json({ error: 'Field name missing or too long.' });
    }
  }

  // Custom message
  if (err.message.includes('Only PDF and DOCX')) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Something went wrong.' });
};

module.exports = errorHandler;