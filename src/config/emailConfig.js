require('dotenv').config();

const emailConfig = {
  host: 'premium322.web-hosting.com',
  port: 465,                // SSL/TLS port
  secure: true,             // MUST be true for 465
  auth: {
    user: process.env.EMAIL_USER,   // general@shanksmediaandsoftwarecompany.com
    pass: process.env.EMAIL_PASS,   // real password
  },
  // Helpful for flaky hosts
  connectionTimeout: 10000,
  greetingTimeout:   10000,
  socketTimeout:     10000,
};

module.exports = emailConfig;