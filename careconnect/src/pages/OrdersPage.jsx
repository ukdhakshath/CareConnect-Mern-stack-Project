import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import styles from '../styles/OrdersPage.module.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders, getTotalSpent, getOrderCount, clearOrderHistory } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return styles.statusConfirmed;
      case 'Shipped': return styles.statusShipped;
      case 'Delivered': return styles.statusDelivered;
      case 'Cancelled': return styles.statusCancelled;
      default: return '';
    }
  };

  if (orders.length === 0) {
    return (
      <div className={styles.ordersPage}>
        <div className={styles.emptyOrders}>
          <div className={styles.emptyIcon}>📦</div>
          <h2>No orders yet</h2>
          <p>Looks like you haven't placed any orders yet.</p>
          <button
            className={styles.shopNowBtn}
            onClick={() => navigate('/pharmacy')}
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ordersPage}>
      <div className={styles.ordersContainer}>
        <div className={styles.ordersHeader}>
          <h1 className={styles.pageTitle}>My Orders</h1>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{getOrderCount()}</span>
              <span className={styles.statLabel}>Total Orders</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>₹{getTotalSpent()}</span>
              <span className={styles.statLabel}>Total Spent</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.activeFilter : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Orders
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'Confirmed' ? styles.activeFilter : ''}`}
            onClick={() => setFilterStatus('Confirmed')}
          >
            Confirmed
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'Shipped' ? styles.activeFilter : ''}`}
            onClick={() => setFilterStatus('Shipped')}
          >
            Shipped
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'Delivered' ? styles.activeFilter : ''}`}
            onClick={() => setFilterStatus('Delivered')}
          >
            Delivered
          </button>
        </div>

        {/* Orders List */}
        <div className={styles.ordersList}>
          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <span className={styles.orderNumber}>{order.orderNumber}</span>
                  <span className={styles.orderDate}>{formatDate(order.date)}</span>
                </div>
                <div className={styles.orderStatus}>
                  <span className={`${styles.statusBadge} ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <button
                    className={styles.viewDetailsBtn}
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  >
                    {selectedOrder === order.id ? '▲' : '▼'} Details
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className={styles.orderSummary}>
                <div className={styles.orderItems}>
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className={styles.orderItem}>
                      <img src={item.image} alt={item.name} className={styles.orderItemImage} />
                      <div className={styles.orderItemDetails}>
                        <span className={styles.orderItemName}>{item.name}</span>
                        <span className={styles.orderItemQty}>x{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <span className={styles.moreItems}>+{order.items.length - 2} more</span>
                  )}
                </div>
                <div className={styles.orderTotal}>
                  <span>Total: ₹{order.totalAmount}</span>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedOrder === order.id && (
                <div className={styles.orderDetails}>
                  <h4>Order Details</h4>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailSection}>
                      <h5>Items</h5>
                      {order.items.map((item) => (
                        <div key={item.id} className={styles.detailItem}>
                          <span>{item.name} (₹{item.price} x {item.quantity})</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.detailSection}>
                      <h5>Delivery Address</h5>
                      <p>{order.deliveryAddress.fullName}</p>
                      <p>{order.deliveryAddress.address}</p>
                      <p>{order.deliveryAddress.city} - {order.deliveryAddress.pincode}</p>
                      <p>Phone: {order.deliveryAddress.phone}</p>
                    </div>
                    <div className={styles.detailSection}>
                      <h5>Payment Summary</h5>
                      <div className={styles.paymentRow}>
                        <span>Subtotal:</span>
                        <span>₹{order.totalAmount + order.totalDiscount}</span>
                      </div>
                      <div className={styles.paymentRow}>
                        <span>Discount:</span>
                        <span>- ₹{order.totalDiscount}</span>
                      </div>
                      <div className={`${styles.paymentRow} ${styles.totalRow}`}>
                        <span>Total:</span>
                        <span>₹{order.totalAmount}</span>
                      </div>
                      <p className={styles.paymentMethod}>Payment: {order.paymentMethod}</p>
                    </div>
                  </div>
                  {order.estimatedDelivery && (
                    <div className={styles.estimatedDelivery}>
                      Estimated Delivery: {formatDate(order.estimatedDelivery)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Clear History Button (Admin only - optional) */}
        {orders.length > 0 && (
          <button
            className={styles.clearHistoryBtn}
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all order history?')) {
                clearOrderHistory();
              }
            }}
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;