const mongoose = require('mongoose');

const insuranceFormSchema = new mongoose.Schema({
  formNumber: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },
  nomineeName: {
    type: String,
    required: true,
    trim: true
  },
  nomineeRelation: {
    type: String,
    trim: true
  },
  medicalConditions: {
    type: String,
    trim: true
  },
  planName: {
    type: String,
    required: true,
    trim: true
  },
  planProvider: {
    type: String,
    required: true,
    trim: true
  },
  coverage: {
    type: String,
    required: true,
    trim: true
  },
  premium: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Under Review'],
    default: 'Pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InsuranceForm', insuranceFormSchema);
