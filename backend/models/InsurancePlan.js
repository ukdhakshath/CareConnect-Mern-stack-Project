const mongoose = require('mongoose');

const insurancePlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  provider: {
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
  category: {
    type: String,
    enum: ['health', 'life', 'critical', 'senior'],
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  benefits: [String],
  eligibility: {
    type: String,
    trim: true
  },
  claimRatio: {
    type: String,
    default: '0%'
  },
  logo: {
    type: String,
    default: ''
  },
  cashless: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('InsurancePlan', insurancePlanSchema);
