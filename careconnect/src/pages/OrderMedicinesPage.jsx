import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderMedicinesPage.css';

const OrderMedicinesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [prescription, setPrescription] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load cart from localStorage if exists
    const savedCart = localStorage.getItem('medicineCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('medicineCart', JSON.stringify(cart));
  }, [cart]);

  const medicines = [
    { 
      id: 1, 
      name: 'Paracetamol', 
      price: 45, 
      mrp: 55, 
      discount: '18% off',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop', 
      category: 'Pain Relief',
      description: 'Effective for fever and mild pain'
    },
    { 
      id: 2, 
      name: 'Vitamin C', 
      price: 120, 
      mrp: 150, 
      discount: '20% off',
      image: 'https://images.unsplash.com/photo-1616671276441-2f2c5b21b5d5?q=80&w=2070&auto=format&fit=crop', 
      category: 'Vitamins',
      description: 'Boosts immunity and overall health'
    },
    { 
      id: 3, 
      name: 'Azithromycin', 
      price: 180, 
      mrp: 220, 
      discount: '18% off',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop', 
      category: 'Antibiotics',
      description: 'Treats bacterial infections'
    },
    { 
      id: 4, 
      name: 'Cetrizine', 
      price: 65, 
      mrp: 80, 
      discount: '19% off',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop', 
      category: 'Allergy',
      description: 'Relieves allergy symptoms'
    },
    { 
      id: 5, 
      name: 'Omeprazole', 
      price: 95, 
      mrp: 120, 
      discount: '21% off',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop', 
      category: 'Gastric',
      description: 'Treats acid reflux and heartburn'
    },
    { 
      id: 6, 
      name: 'Aspirin', 
      price: 35, 
      mrp: 45, 
      discount: '22% off',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop', 
      category: 'Pain Relief',
      description: 'Pain relief and blood thinner'
    },
    { 
      id: 7, 
      name: 'Amoxicillin', 
      price: 150, 
      mrp: 180, 
      discount: '17% off',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop', 
      category: 'Antibiotics',
      description: 'Broad-spectrum antibiotic'
    },
    { 
      id: 8, 
      name: 'Dolo 650', 
      price: 50, 
      mrp: 65, 
      discount: '23% off',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop', 
      category: 'Pain Relief',
      description: 'Fever and body pain relief'
    }
  ];

  const handleQuantityChange = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };

  const addToCart = (medicine) => {
    const quantity = quantities[medicine.id] || 1;
    const existingItem = cart.find(item => item.id === medicine.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === medicine.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity }]);
    }
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalMrp = cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const totalDiscount = totalMrp - totalAmount;
  const savings = Math.round((totalDiscount / totalMrp) * 100);

  const handleCheckout = () => {
    setLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      navigate('/checkout', { 
        state: { 
          cart, 
          totalAmount, 
          totalDiscount,
          savings 
        } 
      });
    }, 1500);
  };

  const handlePrescriptionUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescription(file);
      // Here you would typically upload the file to server
      console.log('Prescription uploaded:', file.name);
    }
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  return (
    <div className="order-medicines-page">
      <div className="container">
        <h1 className="page-title" data-aos="fade-down">Order Medicines</h1>
        
        {showSuccess && (
          <div className="success-message" data-aos="slide-down">
            <i className="fas fa-check-circle"></i>
            Item added to cart successfully!
          </div>
        )}

        <div className="order-content">
          {/* Medicines List Section */}
          <div className="medicines-list" data-aos="fade-right">
            <h2>Available Medicines</h2>
            <div className="medicines-grid">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="medicine-item" data-aos="fade-up">
                  <img src={medicine.image} alt={medicine.name} />
                  <div className="medicine-details">
                    <h3>{medicine.name}</h3>
                    <p className="category">{medicine.category}</p>
                    <p className="description">{medicine.description}</p>
                    <div className="price">
                      <span className="current">₹{medicine.price}</span>
                      <span className="mrp">₹{medicine.mrp}</span>
                      <span className="discount-badge">{medicine.discount}</span>
                    </div>
                    
                    <div className="quantity-selector">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(medicine.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity">{quantities[medicine.id] || 1}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(medicine.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      className="add-btn"
                      onClick={() => addToCart(medicine)}
                    >
                      <i className="fas fa-cart-plus"></i> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="cart-section" data-aos="fade-left">
            <h2>Your Cart ({cart.length})</h2>
            
            {cart.length === 0 ? (
              <div className="empty-cart">
                <i className="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <small>Add medicines to get started</small>
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-info">
                      <span className="item-name">{item.name}</span>
                      <div className="item-price-details">
                        <span className="item-price">₹{item.price} x {item.quantity}</span>
                        <span className="item-total">= ₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-quantity">
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Total MRP:</span>
                    <span>₹{totalMrp}</span>
                  </div>
                  <div className="summary-row discount">
                    <span>Discount:</span>
                    <span>- ₹{totalDiscount}</span>
                  </div>
                  <div className="summary-row savings">
                    <span>You Save:</span>
                    <span>{savings}%</span>
                  </div>
                  <div className="cart-total">
                    <strong>Total Amount:</strong>
                    <strong>₹{totalAmount}</strong>
                  </div>
                </div>

                {/* Prescription Upload */}
                <div className="prescription-upload">
                  <i className="fas fa-file-prescription"></i>
                  <p>Upload Prescription (Optional)</p>
                  <small>Supports: JPG, PNG, PDF</small>
                  <input 
                    type="file" 
                    id="prescription" 
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handlePrescriptionUpload}
                    style={{ display: 'none' }}
                  />
                  <button 
                    className="upload-btn"
                    onClick={() => document.getElementById('prescription').click()}
                  >
                    {prescription ? prescription.name : 'Choose File'}
                  </button>
                </div>

                <div className="cart-actions">
                  <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <i className="fas fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                  <button 
                    className="clear-cart-btn"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMedicinesPage;