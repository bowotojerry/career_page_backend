# Career Page API 🚀

A professional Express.js API for streamlining job applications. This service securely handles candidate applications with resume uploads and automatically forwards them to your hiring team via email. Built with security, reliability, and scalability in mind.

## ✨ Key Features

### 📝 Application Processing
- Modern REST API endpoint (`/api/apply`)
- Smart form handling with resume upload
- Support for PDF and DOCX formats (up to 5MB)
- Comprehensive field validation
- User-friendly error responses

### 📧 Email Integration
- Automated application forwarding
- Professional HTML email templates
- Secure resume attachments
- Configurable SMTP settings
- Reply-to support for direct communication

### 🛡️ Security First
- Industry-standard security headers (Helmet)
- CORS protection
- Intelligent rate limiting (10/15min)
- Request size validation
- File type verification

### 📊 Monitoring & Logging
- Structured logging (Winston)
- Development console output
- Organized log files
- IP-based request tracking
- Health monitoring (`/health`)

## 🚦 Prerequisites

- Node.js (v18 or higher recommended)
- NPM or Yarn
- SMTP server access for email delivery

## 🔧 Quick Setup

```bash
# Clone the repository
git clone https://github.com/bowotojerry/career_page_backend.git
cd career_page_backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

## ⚙️ Configuration

Create a `.env` file with the following variables:

```env
# Application
APP_PORT=your app port             # Server port number
LOG_LEVEL=info            # Logging level (debug, info, warn, error)

# Email Settings
EMAIL_HOST=smtp.gmail.com  # SMTP server host
EMAIL_PORT=your mail service port            # SMTP port
EMAIL_USER=your@email.com # SMTP username
EMAIL_PASS=yourpassword   # SMTP password
COMPANY_EMAIL=hr@company.com # Recipient email
```


## 🚀 Usage

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## 🔌 API Endpoints

### Submit Application
```http
POST /api/apply
Content-Type: multipart/form-data
```

**Request Body:**
```json
{
    "firstName": "string (required)",
    "lastName": "string (required)",
    "email": "string (required)",
    "linkedin": "string (optional)",
    "resume": "file (required, PDF/DOCX, max 5MB)"
}
```

**Success Response:**
```json
{
    "message": "Application submitted successfully! We'll review your resume shortly."
}
```

### Health Check
```http
GET /health
```

**Response:**
```json
{
    "status": "OK"
}
```


## ⚠️ Error Handling

The API provides consistent error responses with appropriate HTTP status codes:

```javascript
// 400 Bad Request - Invalid input or file
{
    "error": "File too large. Maximum 5MB allowed."
}

// 429 Too Many Requests - Rate limit exceeded
{
    "error": "Too many applications. Please try again later."
}

// 500 Internal Server Error - Server issues
{
    "error": "Something went wrong. Please try again later."
}
```

## 📊 Logging System

Logs are organized in the `src/logs` directory:
```
logs/
├── combined.log    # All log levels
├── error.log       # Error-level logs
├── exceptions.log  # Uncaught exceptions
└── rejections.log  # Unhandled promises
```

## 🛠️ Technology Stack

- **Core Framework**: Express.js
- **Security Suite**: 
  - `helmet` (security headers)
  - `cors` (CORS protection)
  - `express-rate-limit` (rate limiting)
- **File Processing**: `multer`
- **Email Service**: `nodemailer`
- **Logging System**: `winston`
- **Development**: `nodemon`

## 📂 Project Structure
```
career_page/
├── src/
│   ├── app.js           # Express configuration
│   ├── server.js        # Entry point
│   ├── config/          # Configurations
│   ├── controller/      # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/          # Utilities
│   └── logs/           # Log files
├── .env                # Environment variables
└── package.json       # Dependencies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support & Issues

For support:
1. Check existing issues
2. Open a new issue with detailed information
3. Follow the issue template guidelines

## 🔒 Security

Report security vulnerabilities via email instead of public issues.

---
Made with ❤️ by [bowotojerry](https://github.com/bowotojerry)
