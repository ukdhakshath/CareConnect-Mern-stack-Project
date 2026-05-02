const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    trim: true
  },
  address: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    pincode: String
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    totalPrice: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'cod'],
    default: 'cod'
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Confirmed'
  },
  deliveryDate: {
    type: Date
  },
  orderDate: {
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

module.exports = mongoose.model('Order', orderSchema);
