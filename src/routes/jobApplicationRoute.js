const express = require('express');
const { submitApplication } = require('../controller/jobApplication');
const upload = require('../middleware/upload'); 

const router = express.Router();

router.post('/apply', upload, submitApplication);

module.exports = router;