const express = require('express');
const router = express.Router();

// Main API status route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CareConnect API Server',
    version: '1.0.0',
    endpoints: {
      medicines: '/api/medicines',
      orders: '/api/orders',
      appointments: '/api/appointments',
      insurance: '/api/insurance',
      contact: '/api/contact'
    }
  });
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
