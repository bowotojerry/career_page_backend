# Career Page API

A lightweight Express service for handling job applications with resume uploads. This API accepts candidate applications (form data + resume) and automatically forwards them to your hiring team's email inbox. Built with security and reliability in mind.

## Features

- Simple Application Endpoint (`/api/apply`)
  - Accepts applicant details and resume upload in one request
  - Supports PDF and DOCX resume formats (up to 5MB)
  - Validates required fields and file types
  - Returns user-friendly error messages

- Email Delivery
  - Automatically forwards applications to configured company email
  - Includes formatted HTML email with applicant details
  - Attaches the resume file
  - Configurable SMTP settings

- Security & Protection
  - Security headers via Helmet
  - CORS protection
  - Rate limiting (10 requests per 15 minutes)
  - Request size limits
  - File type validation

- ## Logging & Monitoring
  - Structured logging with Winston
  - Console output for development
  - Separate error and combined log files
  - Request logging with IP tracking
  - Health check endpoint (`/health`)

## Prerequisites

- Node.js (v18 or higher recommended)
- NPM or Yarn
- SMTP server access for email delivery

## Installation

1. Clone the repository:
git clone <repository-url>
cd career-page


2. Install dependencies:
npm install


3. Create environment configuration:

cp .env.example .env
# Edit .env with your settings


## Configuration

Create a `.env` file in the project root with the following variables:

env
# App
APP_PORT=your app port
LOG_LEVEL=info

# Email (SMTP)
EMAIL_HOST=smtp.example.com
EMAIL_PORT= your-email-port
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-smtp-password
COMPANY_EMAIL=hiring-team@company.com


## Usage

### Development
npm run start:dev


### Production
npm run start:prod


## API Endpoints

### POST /api/apply
Submit a job application with resume.

## Request:
- Content-Type: multipart/form-data
- Body:
  - firstName (required): Applicant's first name
  - lastName (required): Applicant's last name
  - email (required): Applicant's email address
  - linkedin (optional): LinkedIn profile URL
  - resume (required): PDF or DOCX file (max 5MB)

## Success Response:
json
{
  "message": "Application submitted successfully! We'll review your resume shortly."
}


### GET /health
Check API health status.

## Success Response:
 json
{
  "status": "OK"
}


## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request (invalid input, file too large)
- 429: Too Many Requests (rate limit exceeded)
- 500: Internal Server Error

Example error response:
json
{
  "error": "File too large. Maximum 5MB allowed."
}


## Logging

Logs are stored in the `src/logs` directory:
- `combined.log`: All log levels
- `error.log`: Error-level logs only
- `exceptions.log`: Uncaught exceptions
- `rejections.log`: Unhandled promise rejections

## Tech Stack

- Framework: Express.js
- Security: helmet, cors, express-rate-limit
- File Upload: multer
- Email: nodemailer
- Logging:winston
- Development: nodemon

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository.
