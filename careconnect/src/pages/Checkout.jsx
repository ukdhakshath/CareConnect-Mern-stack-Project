import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import PaymentModal from '../components/PaymentModal';
import styles from '../styles/Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getCartTotal, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethodUsed, setPaymentMethodUsed] = useState('');

  // Get items - either from cart or direct Buy Now
  const itemsFromCart = location.state?.items || cart;
  const fromBuyNow = location.state?.fromBuyNow || false;
  const total = location.state?.total || getCartTotal();

  // If coming from Buy Now, we have items directly
  const items = itemsFromCart;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentMethod) => {
    setPaymentMethodUsed(paymentMethod);
    
    const orderPayload = {
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.fullName,
      address: formData,
      items: items,
      totalAmount: total,
      paymentMethod: paymentMethod
    };

    try {
      const result = await orderAPI.create(orderPayload);
      
      if (result.success) {
        const orderData = {
          orderId: result.data.orderNumber,
          orderDate: new Date().toLocaleString(),
          items: items,
          total: total,
          address: formData,
          paymentMethod: paymentMethod,
          status: 'Confirmed'
        };
        
        setOrderDetails(orderData);
        setOrderSuccess(true);
        clearCart();
      } else {
        console.error('Failed to create order:', result.error);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const handleCodConfirm = async () => {
    setPaymentMethodUsed('cod');
    
    const orderPayload = {
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.fullName,
      address: formData,
      items: items,
      totalAmount: total,
      paymentMethod: 'cod'
    };

    try {
      const result = await orderAPI.create(orderPayload);
      
      if (result.success) {
        const orderData = {
          orderId: result.data.orderNumber,
          orderDate: new Date().toLocaleString(),
          items: items,
          total: total,
          address: formData,
          paymentMethod: 'cod',
          status: 'Confirmed'
        };
        
        setOrderDetails(orderData);
        setOrderSuccess(true);
        clearCart();
      } else {
        console.error('Failed to create order:', result.error);
      }
    } catch (error) {
      console.error('COD error:', error);
    }
  };

  // Order Success Screen
  if (orderSuccess && orderDetails) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.successTitle}>Order Placed Successfully!</h1>
          <p className={styles.successMessage}>
            Thank you for your order. Your order has been confirmed.
          </p>
          
          <div className={styles.orderInfo}>
            <div className={styles.orderInfoRow}>
              <div className={styles.orderInfoItem}>
                <span className={styles.orderInfoLabel}>Order Number</span>
                <span className={styles.orderInfoValue}>{orderDetails.orderId}</span>
              </div>
              <div className={styles.orderInfoItem}>
                <span className={styles.orderInfoLabel}>Order Date</span>
                <span className={styles.orderInfoValue}>{orderDetails.orderDate}</span>
              </div>
              <div className={styles.orderInfoItem}>
                <span className={styles.orderInfoLabel}>Payment Method</span>
                <span className={styles.orderInfoValue}>
                  {orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <div className={styles.orderItemsList}>
              {orderDetails.items.map((item) => (
                <div key={item.id} className={styles.orderItemRow}>
                  <div>
                    <span className={styles.orderItemName}>{item.name}</span>
                    <span className={styles.orderItemQty}> x {item.quantity}</span>
                  </div>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className={styles.orderTotalRow}>
              <span>Total Amount</span>
              <span className={styles.orderTotalPrice}>₹{orderDetails.total}</span>
            </div>
          </div>

          <div className={styles.deliveryInfo}>
            <h3>Delivery Address</h3>
            <p><strong>{orderDetails.address.fullName}</strong></p>
            <p>{orderDetails.address.address}</p>
            <p>{orderDetails.address.city} - {orderDetails.address.pincode}</p>
            <p>Phone: {orderDetails.address.phone}</p>
          </div>

          <div className={styles.successActions}>
            <button 
              className={styles.trackOrderBtn}
              onClick={() => navigate('/orders')}
            >
              Track Your Order
            </button>
            <button 
              className={styles.continueShopBtn}
              onClick={() => navigate('/pharmacy')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={styles.empty}>
          <h2>No items to checkout</h2>
          <button className={styles.shopBtn} onClick={() => navigate('/pharmacy')}>
            Go to Pharmacy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        totalAmount={total}
        onPaymentSuccess={handlePaymentSuccess}
        onCodConfirm={handleCodConfirm}
      />

      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.checkoutLayout}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Delivery Address</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                className={`${styles.formInput} ${errors.fullName ? styles.inputError : ''}`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />
              {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Address *</label>
              <textarea
                name="address"
                className={`${styles.formTextarea} ${errors.address ? styles.inputError : ''}`}
                value={formData.address}
                onChange={handleChange}
                placeholder="House/Flat No., Street, Landmark"
                rows="2"
              />
              {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  className={`${styles.formInput} ${errors.city ? styles.inputError : ''}`}
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                {errors.city && <span className={styles.errorMsg}>{errors.city}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  className={`${styles.formInput} ${errors.pincode ? styles.inputError : ''}`}
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                />
                {errors.pincode && <span className={styles.errorMsg}>{errors.pincode}</span>}
              </div>
            </div>
          </form>
        </div>

        <div className={styles.summarySection}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>

          <div className={styles.orderItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <img src={item.image} alt={item.name} className={styles.orderItemImage} />
                <div className={styles.orderItemDetails}>
                  <h3>{item.name}</h3>
                  <p>₹{item.price} × {item.quantity || 1}</p>
                </div>
                <div className={styles.orderItemTotal}>
                  ₹{item.price * (item.quantity || 1)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span className={styles.totalPrice}>₹{total}</span>
            </div>
          </div>

          <button type="submit" onClick={handleSubmit} className={styles.placeOrderBtn}>
            Proceed to Payment
          </button>

          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;