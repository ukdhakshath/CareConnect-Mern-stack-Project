const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get order statistics
router.get('/stats/analytics', orderController.getOrderStats);

// Get orders by customer phone
router.get('/customer/:phone', orderController.getOrdersByCustomer);

// Get order by order number
router.get('/number/:orderNumber', orderController.getOrderByOrderNumber);

// Get single order
router.get('/:id', orderController.getOrderById);

// Update order status
router.put('/:id/status', orderController.updateOrderStatus);

// Delete order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
