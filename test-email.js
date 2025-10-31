const { sendApplicationEmail } = require('./src/services/emailService');

const fake = {
  firstName: 'John',
  lastName:  'Doe',
  email:     'john@example.com',
  linkedin:  'https://linkedin.com/in/johndoe',
};

sendApplicationEmail(fake, Buffer.from('fake resume'), 'resume.pdf')
  .then(() => console.log('Test email sent!'))
  .catch(console.error);