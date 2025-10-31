const { createLogger, format, transports } = require('winston');
const path = require('path');

// Custom format
const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
  })
);

// Logger instance
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // debug, info, warn, error
  format: customFormat,
  transports: [
    // Console (development)
    new transports.Console({
      format: format.combine(
        format.colorize(),
        customFormat
      ),
    }),

    // File: error.log
    new transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
    }),

    // File: combined.log
    new transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join(__dirname, '../logs/rejections.log') }),
  ],
});

module.exports = logger;