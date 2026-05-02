const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Get all medicines with filters
router.get('/', medicineController.getAllMedicines);

// Get categories
router.get('/categories/all', medicineController.getCategories);

// Get medicines by category
router.get('/category/:category', medicineController.getMedicinesByCategory);

// Get single medicine
router.get('/:id', medicineController.getMedicineById);

// Create medicine (Admin)
router.post('/', medicineController.createMedicine);

// Update medicine (Admin)
router.put('/:id', medicineController.updateMedicine);

// Delete medicine (Admin)
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
