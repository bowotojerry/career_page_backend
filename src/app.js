const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const applicationRoutes = require('../src/routes/jobApplicationRoute');
const errorHandler = require('../src/middleware/errorHandler');
const logger = require('../src/utils/logger');

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());

// Match form limit + buffer
app.use(express.json({ limit: '6mb' }));        // 5MB file + overhead
app.use(express.urlencoded({ extended: true, limit: '6mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many applications. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/v1/apply', limiter);

// Routes
app.use('/api/v1', applicationRoutes);

// Health check
app.get('/health', (req, res) => {
  logger.info('Health check: OK');
  res.status(200).json({ status: 'OK' });
});

// Error handler with logging
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  errorHandler(err, req, res, next);
});

module.exports = app;