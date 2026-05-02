import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const handleQuantityChange = (id, currentQty, change) => {
    const newQuantity = currentQty + change;
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your cart?`)) {
      removeFromCart(id);
    }
  };

  const totalAmount = getCartTotal();
  const cartCount = getCartCount();
  const totalDiscount = cart.reduce((sum, item) => 
    sum + ((item.mrp - item.price) * item.quantity), 0
  );

  if (cart.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartText}>Looks like you haven't added any medicines to your cart yet.</p>
          <button
            className={styles.continueShoppingBtn}
            onClick={() => navigate('/pharmacy')}
          >
            Browse Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Shopping Cart ({cartCount} items)</h1>
          <button 
            className={styles.continueShoppingLink}
            onClick={() => navigate('/pharmacy')}
          >
            ← Continue Shopping
          </button>
        </div>

        <div className={styles.cartLayout}>
          {/* Cart Items List */}
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemImage}>
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className={styles.cartItemDetails}>
                  <div className={styles.cartItemHeader}>
                    <div>
                      <h3 className={styles.cartItemName}>{item.name}</h3>
                      <p className={styles.cartItemGeneric}>{item.generic}</p>
                      <p className={styles.cartItemManufacturer}>{item.manufacturer}</p>
                    </div>
                    <button
                      className={styles.removeItemBtn}
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className={styles.cartItemFooter}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.cartItemPrice}>
                      <span className={styles.currentPrice}>₹{item.price}</span>
                      <span className={styles.originalPrice}>₹{item.mrp}</span>
                    </div>
                    <div className={styles.cartItemTotal}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className={styles.summaryContent}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Charges</span>
                <span className={styles.freeDelivery}>FREE</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Discount</span>
                <span className={styles.discount}>- ₹{totalDiscount}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total Amount</span>
                <span className={styles.totalAmount}>₹{totalAmount}</span>
              </div>
            </div>

            <button
              className={styles.checkoutBtn}
              onClick={() => navigate('/checkout', { state: { fromCart: true } })}
            >
              Proceed to Checkout
            </button>

            <p className={styles.securePayment}>
              <span>🔒</span> Secure Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;