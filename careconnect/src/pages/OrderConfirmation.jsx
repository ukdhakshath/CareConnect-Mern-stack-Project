import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/OrderConfirmation.module.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails } = location.state || {};
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Auto redirect timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/orders');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  if (!orderDetails) {
    navigate('/pharmacy');
    return null;
  }

  // Generate random order number
  const orderNumber = `CUURE${Math.floor(Math.random() * 1000000)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
  
  const deliveryDate = estimatedDelivery.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.confirmationContainer}>
      {/* Success Header */}
      <div className={styles.successHeader}>
        <div className={styles.successIcon}>✓</div>
        <h1>Thank you for your order!</h1>
        <p>Your order has been placed successfully.</p>
      </div>

      {/* Order Info Card */}
      <div className={styles.orderInfoCard}>
        <div className={styles.orderInfoRow}>
          <div className={styles.orderInfoItem}>
            <span className={styles.label}>Order Number</span>
            <span className={styles.value}>{orderNumber}</span>
          </div>
          <div className={styles.orderInfoItem}>
            <span className={styles.label}>Order Date</span>
            <span className={styles.value}>{new Date().toLocaleDateString()}</span>
          </div>
          <div className={styles.orderInfoItem}>
            <span className={styles.label}>Total Amount</span>
            <span className={styles.value}>₹{orderDetails.total}</span>
          </div>
        </div>
      </div>

      {/* Delivery Status */}
      <div className={styles.deliveryStatus}>
        <h3>Delivery Status</h3>
        <div className={styles.statusTimeline}>
          <div className={`${styles.statusStep} ${styles.completed}`}>
            <div className={styles.stepIcon}>✓</div>
            <div className={styles.stepText}>
              <strong>Order Placed</strong>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className={styles.statusLine}></div>
          <div className={`${styles.statusStep} ${styles.active}`}>
            <div className={styles.stepIcon}>📦</div>
            <div className={styles.stepText}>
              <strong>Order Confirmed</strong>
              <span>Processing your order</span>
            </div>
          </div>
          <div className={styles.statusLine}></div>
          <div className={styles.statusStep}>
            <div className={styles.stepIcon}>🚚</div>
            <div className={styles.stepText}>
              <strong>Shipped</strong>
              <span>Awaiting dispatch</span>
            </div>
          </div>
          <div className={styles.statusLine}></div>
          <div className={styles.statusStep}>
            <div className={styles.stepIcon}>🏠</div>
            <div className={styles.stepText}>
              <strong>Delivered</strong>
              <span>Expected by {deliveryDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        
        <div className={styles.itemsList}>
          {orderDetails.items.map((item) => (
            <div key={item.id} className={styles.orderItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h4>{item.name}</h4>
                <p className={styles.itemGeneric}>{item.generic}</p>
                <div className={styles.itemMeta}>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.price} each</span>
                </div>
              </div>
              <div className={styles.itemPrice}>
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>Subtotal</span>
            <span>₹{orderDetails.subtotal}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Delivery Charges</span>
            <span className={styles.free}>FREE</span>
          </div>
          <div className={`${styles.priceRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>₹{orderDetails.total}</span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className={styles.deliveryAddress}>
        <h3>Delivery Address</h3>
        <div className={styles.addressCard}>
          <p><strong>{orderDetails.address.fullName}</strong></p>
          <p>{orderDetails.address.address}</p>
          <p>{orderDetails.address.city} - {orderDetails.address.pincode}</p>
          <p>Phone: {orderDetails.address.phone}</p>
        </div>
      </div>

      {/* Payment Details */}
      <div className={styles.paymentDetails}>
        <h3>Payment Method</h3>
        <div className={styles.paymentCard}>
          <div className={styles.paymentIcon}>
            {orderDetails.paymentMethod === 'card' && <i className="fas fa-credit-card"></i>}
            {orderDetails.paymentMethod === 'upi' && <i className="fas fa-mobile-alt"></i>}
            {orderDetails.paymentMethod === 'cod' && <i className="fas fa-rupee-sign"></i>}
          </div>
          <div className={styles.paymentInfo}>
            <strong>{orderDetails.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                        orderDetails.paymentMethod === 'upi' ? 'UPI / Google Pay' : 'Cash on Delivery'}</strong>
            <span>Payment completed successfully</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button 
          className={styles.trackOrderBtn}
          onClick={() => navigate('/orders')}
        >
          Track Your Order
        </button>
        <button 
          className={styles.continueShoppingBtn}
          onClick={() => navigate('/pharmacy')}
        >
          Continue Shopping
        </button>
      </div>

      {/* Auto redirect message */}
      <div className={styles.autoRedirect}>
        <p>Redirecting to My Orders in {countdown} seconds...</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;