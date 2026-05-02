const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Create new appointment
router.post('/', appointmentController.createAppointment);

// Get all appointments
router.get('/', appointmentController.getAllAppointments);

// Get appointment statistics
router.get('/stats/analytics', appointmentController.getAppointmentStats);

// Get appointments by status
router.get('/status/:status', appointmentController.getAppointmentsByStatus);

// Get appointments by phone
router.get('/phone/:phone', appointmentController.getAppointmentsByPhone);

// Get single appointment
router.get('/:id', appointmentController.getAppointmentById);

// Update appointment status
router.put('/:id/status', appointmentController.updateAppointmentStatus);

// Update appointment
router.put('/:id', appointmentController.updateAppointment);

// Delete appointment
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
