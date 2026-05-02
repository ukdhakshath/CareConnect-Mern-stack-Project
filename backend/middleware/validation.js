/**
 * Input Validation Middleware
 * Validates required fields and data types
 */

const validatePhone = (phone) => {
  // Indian phone number format (10 digits)
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePincode = (pincode) => {
  // Indian pincode format (6 digits)
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode.toString());
};

const validateAge = (age) => {
  return age >= 18 && age <= 100;
};

const validateOrderData = (req, res, next) => {
  const { customerName, customerPhone, address, items, totalAmount } = req.body;

  const errors = [];

  if (!customerName || customerName.trim().length < 2) {
    errors.push('Customer name must be at least 2 characters');
  }

  if (!customerPhone || !validatePhone(customerPhone)) {
    errors.push('Valid phone number required');
  }

  if (!address || !address.trim()) {
    errors.push('Address is required');
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('At least one item is required');
  }

  if (!totalAmount || totalAmount < 0) {
    errors.push('Valid total amount is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateAppointmentData = (req, res, next) => {
  const { fullName, email, phone, serviceType } = req.body;

  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!phone || !validatePhone(phone)) {
    errors.push('Valid phone number required');
  }

  if (!serviceType || serviceType.trim().length === 0) {
    errors.push('Service type is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateInsuranceFormData = (req, res, next) => {
  const { fullName, age, phone, email, planName, nomineeName } = req.body;

  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  if (!age || !validateAge(age)) {
    errors.push('Age must be between 18 and 100');
  }

  if (!phone || !validatePhone(phone)) {
    errors.push('Valid phone number required');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!planName || planName.trim().length === 0) {
    errors.push('Plan name is required');
  }

  if (!nomineeName || nomineeName.trim().length < 2) {
    errors.push('Nominee name must be at least 2 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateContactData = (req, res, next) => {
  const { fullName, email, phone, message } = req.body;

  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!phone || !validatePhone(phone)) {
    errors.push('Valid phone number required');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = {
  validatePhone,
  validateEmail,
  validatePincode,
  validateAge,
  validateOrderData,
  validateAppointmentData,
  validateInsuranceFormData,
  validateContactData
};
