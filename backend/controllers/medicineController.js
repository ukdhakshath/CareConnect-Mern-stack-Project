const Medicine = require('../models/Medicine');

// Get all medicines with optional filtering
exports.getAllMedicines = async (req, res) => {
  try {
    const { category, search, sortBy } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { generic: { $regex: search, $options: 'i' } },
        { manufacturer: { $regex: search, $options: 'i' } }
      ];
    }

    let medicines = await Medicine.find(query);

    // Sorting
    if (sortBy === 'price-low') {
      medicines.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      medicines.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      medicines.sort((a, b) => b.rating - a.rating);
    }

    res.json({
      success: true,
      count: medicines.length,
      data: medicines
    });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medicines',
      error: error.message
    });
  }
};

// Get single medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }
    res.json({
      success: true,
      data: medicine
    });
  } catch (error) {
    console.error('Error fetching medicine:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medicine',
      error: error.message
    });
  }
};

// Get medicines by category
exports.getMedicinesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const medicines = await Medicine.find({ category });
    res.json({
      success: true,
      count: medicines.length,
      data: medicines
    });
  } catch (error) {
    console.error('Error fetching medicines by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medicines',
      error: error.message
    });
  }
};

// Create new medicine (Admin)
exports.createMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json({
      success: true,
      message: 'Medicine created successfully',
      data: medicine
    });
  } catch (error) {
    console.error('Error creating medicine:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating medicine',
      error: error.message
    });
  }
};

// Update medicine (Admin)
exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }
    res.json({
      success: true,
      message: 'Medicine updated successfully',
      data: medicine
    });
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating medicine',
      error: error.message
    });
  }
};

// Delete medicine (Admin)
exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }
    res.json({
      success: true,
      message: 'Medicine deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting medicine',
      error: error.message
    });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = ['pain', 'antibiotics', 'vitamins', 'ayurvedic', 'diabetes', 'cardiac', 'gastric', 'skin'];
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};
