const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Create new inquiry
router.post('/', contactController.createContactInquiry);

// Get all inquiries
router.get('/', contactController.getAllInquiries);

// Get inquiry statistics
router.get('/stats/analytics', contactController.getInquiryStats);

// Get inquiries by status
router.get('/status/:status', contactController.getInquiriesByStatus);

// Get inquiries by phone
router.get('/phone/:phone', contactController.getInquiriesByPhone);

// Get single inquiry
router.get('/:id', contactController.getInquiryById);

// Update inquiry status (Admin)
router.put('/:id/status', contactController.updateInquiryStatus);

// Delete inquiry
router.delete('/:id', contactController.deleteInquiry);

module.exports = router;
