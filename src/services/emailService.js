const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport(emailConfig);

// Verify SMTP on startup
transporter.verify(err => {
  if (err) logger.error('SMTP connection failed:', err);
  else logger.info('SMTP ready for sending');
});

//SEND TO COMPANY
const sendApplicationToCompany = async (formData, resumeBuffer, resumeName) => {
  const { firstName, lastName, email, linkedin } = formData;

  const mailOptions = {
    from: `"Job Applications" <${process.env.EMAIL_USER}>`,
    to: process.env.COMPANY_EMAIL,
    replyTo: email,
    subject: `New Application: ${firstName} ${lastName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;">
        <h2 style="color:#d32f2f;">New Job Application</h2><hr>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>LinkedIn:</strong> ${linkedin ? `<a href="${linkedin}">${linkedin}</a>` : 'Not provided'}</p>
        <hr>
        <p><em>Resume attached: ${resumeName}</em></p>
      </div>
    `,
    attachments: [{ filename: resumeName, content: resumeBuffer }],
  };

  const info = await transporter.sendMail(mailOptions);
  logger.info(`Company notified – MessageId: ${info.messageId}`);
  return info;
};

// SEND CONFIRMATION TO APPLICANT
const sendConfirmationToApplicant = async (formData) => {
  const { firstName, email } = formData;

  const mailOptions = {
    from: `"vazz - Careers" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'We Received Your Application!',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f9f9f9;">
        <div style="background:white;padding:30px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color:#d32f2f;margin-top:0;">Thank You, ${firstName}!</h2>
          <p>We’ve successfully received your job application and resume.</p>
          <p>Our team is excited to review your experience. You’ll hear back from us within <strong>3–5 business days</strong> if we’d like to move forward.</p>
          <hr style="border:1px dashed #eee;margin:20px 0;">
          <p style="color:#666;font-size:14px;">
            <strong>Need to update your info?</strong><br>
            Just reply to this email — we’ll get it.
          </p>
          <p style="color:#888;font-size:12px;">
            vazz Software Company<br>
            <a href="mailto:info@vazz.com">info@vazz.com</a>
          </p>
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  logger.info(`Confirmation sent to ${email} – MessageId: ${info.messageId}`);
  return info;
};


module.exports = {
  sendApplicationToCompany,
  sendConfirmationToApplicant,
};
