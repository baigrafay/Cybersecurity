
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'security.log' })
  ]
});

module.exports = logger;

const logger = require('./logger');
logger.info('Server started');
logger.warn('Failed login attempt', { email: 'x@example.com' });
