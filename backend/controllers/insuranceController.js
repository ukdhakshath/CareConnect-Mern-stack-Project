const InsurancePlan = require('../models/InsurancePlan');
const InsuranceForm = require('../models/InsuranceForm');

// Get all insurance plans
exports.getAllInsurancePlans = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    const plans = await InsurancePlan.find(query).sort({ rating: -1 });
    res.json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    console.error('Error fetching insurance plans:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching insurance plans',
      error: error.message
    });
  }
};

// Get insurance plan by ID
exports.getInsurancePlanById = async (req, res) => {
  try {
    const plan = await InsurancePlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Insurance plan not found'
      });
    }
    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Error fetching insurance plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching insurance plan',
      error: error.message
    });
  }
};

// Get plans by category
exports.getPlansByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const plans = await InsurancePlan.find({ category });
    res.json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    console.error('Error fetching insurance plans:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching insurance plans',
      error: error.message
    });
  }
};

// Create insurance plan (Admin)
exports.createInsurancePlan = async (req, res) => {
  try {
    const plan = new InsurancePlan(req.body);
    await plan.save();
    res.status(201).json({
      success: true,
      message: 'Insurance plan created successfully',
      data: plan
    });
  } catch (error) {
    console.error('Error creating insurance plan:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating insurance plan',
      error: error.message
    });
  }
};

// Update insurance plan (Admin)
exports.updateInsurancePlan = async (req, res) => {
  try {
    const plan = await InsurancePlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Insurance plan not found'
      });
    }
    res.json({
      success: true,
      message: 'Insurance plan updated successfully',
      data: plan
    });
  } catch (error) {
    console.error('Error updating insurance plan:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating insurance plan',
      error: error.message
    });
  }
};

// Delete insurance plan (Admin)
exports.deleteInsurancePlan = async (req, res) => {
  try {
    const plan = await InsurancePlan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Insurance plan not found'
      });
    }
    res.json({
      success: true,
      message: 'Insurance plan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting insurance plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting insurance plan',
      error: error.message
    });
  }
};

// Submit insurance form
exports.submitInsuranceForm = async (req, res) => {
  try {
    const { fullName, age, phone, email, address, city, pincode, nomineeName, nomineeRelation, medicalConditions, planName, planProvider, coverage, premium } = req.body;

    // Validate required fields
    if (!fullName || !age || !phone || !email || !nomineeName || !planName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const formNumber = `FORM${Date.now().toString().slice(-8)}`;

    const insuranceForm = new InsuranceForm({
      formNumber,
      fullName,
      age,
      phone,
      email,
      address,
      city,
      pincode,
      nomineeName,
      nomineeRelation,
      medicalConditions,
      planName,
      planProvider,
      coverage,
      premium,
      status: 'Pending'
    });

    await insuranceForm.save();

    res.status(201).json({
      success: true,
      message: 'Insurance form submitted successfully',
      formId: insuranceForm._id,
      formNumber: insuranceForm.formNumber,
      data: insuranceForm
    });
  } catch (error) {
    console.error('Error submitting insurance form:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting insurance form',
      error: error.message
    });
  }
};

// Get all insurance forms
exports.getAllInsuranceForms = async (req, res) => {
  try {
    const forms = await InsuranceForm.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: forms.length,
      data: forms
    });
  } catch (error) {
    console.error('Error fetching insurance forms:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching insurance forms',
      error: error.message
    });
  }
};

// Get insurance form by ID
exports.getInsuranceFormById = async (req, res) => {
  try {
    const form = await InsuranceForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Insurance form not found'
      });
    }
    res.json({
      success: true,
      data: form
    });
  } catch (error) {
    console.error('Error fetching insurance form:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching insurance form',
      error: error.message
    });
  }
};

// Get insurance forms by phone
exports.getInsuranceFormsByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const forms = await InsuranceForm.find({ phone }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: forms.length,
      data: forms
    });
  } catch (error) {
    console.error('Error fetching insurance forms:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching insurance forms',
      error: error.message
    });
  }
};

// Update insurance form status (Admin)
exports.updateInsuranceFormStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected', 'Under Review'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const form = await InsuranceForm.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Insurance form not found'
      });
    }

    res.json({
      success: true,
      message: 'Insurance form status updated',
      data: form
    });
  } catch (error) {
    console.error('Error updating insurance form:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating insurance form',
      error: error.message
    });
  }
};

// Delete insurance form
exports.deleteInsuranceForm = async (req, res) => {
  try {
    const form = await InsuranceForm.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Insurance form not found'
      });
    }
    res.json({
      success: true,
      message: 'Insurance form deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting insurance form:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting insurance form',
      error: error.message
    });
  }
};
