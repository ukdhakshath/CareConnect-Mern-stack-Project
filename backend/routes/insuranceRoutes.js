const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');

// Insurance Plans Routes
// Get all insurance plans
router.get('/plans', insuranceController.getAllInsurancePlans);

// Get plans by category
router.get('/plans/category/:category', insuranceController.getPlansByCategory);

// Get single plan
router.get('/plans/:id', insuranceController.getInsurancePlanById);

// Create insurance plan (Admin)
router.post('/plans', insuranceController.createInsurancePlan);

// Update insurance plan (Admin)
router.put('/plans/:id', insuranceController.updateInsurancePlan);

// Delete insurance plan (Admin)
router.delete('/plans/:id', insuranceController.deleteInsurancePlan);

// Insurance Forms Routes
// Submit insurance form
router.post('/forms', insuranceController.submitInsuranceForm);

// Get all insurance forms
router.get('/forms', insuranceController.getAllInsuranceForms);

// Get forms by phone
router.get('/forms/phone/:phone', insuranceController.getInsuranceFormsByPhone);

// Get single form
router.get('/forms/:id', insuranceController.getInsuranceFormById);

// Update form status (Admin)
router.put('/forms/:id/status', insuranceController.updateInsuranceFormStatus);

// Delete form
router.delete('/forms/:id', insuranceController.deleteInsuranceForm);

module.exports = router;
