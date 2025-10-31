const {
  sendApplicationToCompany,
  sendConfirmationToApplicant,
} = require('../services/emailService');
const logger = require('../utils/logger');

const submitApplication = async (req, res, next) => {
  try {
    const { firstName, lastName, email, linkedin } = req.body;
    const resume = req.file;

    //  required fields
    if (!firstName || !lastName || !email || !resume) {
      logger.warn(`Incomplete submission from ${req.ip}`);
      return res.status(400).json({
        error: 'First name, last name, email, and resume are required.',
      });
    }

    const formData = { firstName, lastName, email, linkedin };

    //  Send to company
    await sendApplicationToCompany(formData, resume.buffer, resume.originalname);

    //  Send confirmation to applicant
    await sendConfirmationToApplicant(formData);

    // Success response
    res.status(200).json({
      message: 'Application submitted! Check your email for confirmation.',
    });
  } catch (error) {
    logger.error(`Submission failed: ${error.message}`);
    next(error);
  }
};

module.exports = { submitApplication };