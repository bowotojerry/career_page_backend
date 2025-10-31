require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing SMTP with:');
console.log('User:', process.env.EMAIL_USER);
console.log('Pass:', process.env.EMAIL_PASS ? '***' : 'MISSING' );

const transporter = nodemailer.createTransport({
  host: 'premium322.web-hosting.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true,// shows debug
  debug: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP FAILED:', error.message);
  } else {
    console.log('SMTP SUCCESS! You can send emails.');
  }
});