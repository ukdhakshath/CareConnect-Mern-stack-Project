/**
 * Request Logging Middleware
 * Logs all incoming requests with timestamp and method
 */

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${path} - IP: ${ip}`);

  // Store request details for later use
  req.requestTime = new Date();

  // Log response when it's sent
  res.on('finish', () => {
    const duration = new Date() - req.requestTime;
    const status = res.statusCode;
    console.log(`[${timestamp}] Response: ${status} (${duration}ms)`);
  });

  next();
};

module.exports = requestLogger;
