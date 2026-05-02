import React, { useState } from 'react';
import styles from '../styles/PaymentModal.module.css';

const PaymentModal = ({ isOpen, onClose, totalAmount, onPaymentSuccess, onCodConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [selectedApp, setSelectedApp] = useState('');
  const [processing, setProcessing] = useState(false);
  const [savedCards, setSavedCards] = useState([
    { id: 1, last4: '4582', brand: 'visa', expiry: '12/25' },
    { id: 2, last4: '8910', brand: 'mastercard', expiry: '08/26' }
  ]);
  const [useSavedCard, setUseSavedCard] = useState(true);
  const [selectedSavedCard, setSelectedSavedCard] = useState(1);

  if (!isOpen) return null;

  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails({
      ...cardDetails,
      cardNumber: formatted
    });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\//g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setCardDetails({
      ...cardDetails,
      expiry: value
    });
  };

  const handlePayment = () => {
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess(paymentMethod);
      onClose();
    }, 2000);
  };

  const handleCodConfirm = () => {
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      onCodConfirm();
      onClose();
    }, 1000);
  };

  const getCardIcon = (brand) => {
    switch(brand) {
      case 'visa': return <i className="fab fa-cc-visa"></i>;
      case 'mastercard': return <i className="fab fa-cc-mastercard"></i>;
      default: return <i className="fab fa-cc-visa"></i>;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Secure Checkout</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.amountSection}>
          <span>Total Amount:</span>
          <strong>₹{totalAmount}</strong>
        </div>

        <div className={styles.paymentMethods}>
          <label className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className={styles.optionContent}>
              <span>Credit / Debit Card</span>
            </div>
          </label>

          <label className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className={styles.optionContent}>
              <span>UPI / BHIM</span>
            </div>
          </label>

          <label className={`${styles.paymentOption} ${paymentMethod === 'netbanking' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="netbanking"
              checked={paymentMethod === 'netbanking'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className={styles.optionContent}>
              <span>Net Banking</span>
            </div>
          </label>

          <label className={`${styles.paymentOption} ${paymentMethod === 'wallet' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              checked={paymentMethod === 'wallet'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className={styles.optionContent}>
              <span>Mobile Wallets</span>
            </div>
          </label>

          <label className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className={styles.optionContent}>
              <span>Cash on Delivery</span>
            </div>
          </label>
        </div>

        {/* Credit Card Form */}
        {paymentMethod === 'card' && (
          <div className={styles.cardDetails}>
            {savedCards.length > 0 && (
              <div className={styles.savedCards}>
                <div className={styles.savedCardsHeader}>
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={useSavedCard}
                      onChange={(e) => setUseSavedCard(e.target.checked)}
                    />
                    Use saved card
                  </label>
                </div>
                {useSavedCard && (
                  <div className={styles.savedCardsList}>
                    {savedCards.map(card => (
                      <label key={card.id} className={styles.savedCardItem}>
                        <input
                          type="radio"
                          name="savedCard"
                          checked={selectedSavedCard === card.id}
                          onChange={() => setSelectedSavedCard(card.id)}
                        />
                        {getCardIcon(card.brand)}
                        <span>XXXX-{card.last4}</span>
                        <span>Exp: {card.expiry}</span>
                      </label>
                    ))}
                  </div>
                )}
                <div className={styles.orDivider}>
                  <span>OR</span>
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Card Number</label>
              <div className={styles.cardInputWrapper}>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength="19"
                />
                <div className={styles.cardTypeIcons}>
                  <i className="fab fa-cc-visa"></i>
                  <i className="fab fa-cc-mastercard"></i>
                </div>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleExpiryChange}
                  maxLength="5"
                />
              </div>
              <div className={styles.formGroup}>
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  maxLength="3"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Name on Card</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={handleCardChange}
              />
            </div>
            <div className={styles.secureBadge}>
              <i className="fas fa-lock"></i> 100% Secure Payment
            </div>
          </div>
        )}

        {/* UPI Payment Form */}
        {paymentMethod === 'upi' && (
          <div className={styles.upiDetails}>
            <div className={styles.upiAppsGrid}>
              <button 
                className={`${styles.upiAppBtn} ${selectedApp === 'gpay' ? styles.selectedApp : ''}`}
                onClick={() => setSelectedApp('gpay')}
                type="button"
              >
                <span>Google Pay</span>
              </button>
              <button 
                className={`${styles.upiAppBtn} ${selectedApp === 'phonepe' ? styles.selectedApp : ''}`}
                onClick={() => setSelectedApp('phonepe')}
                type="button"
              >
                <span>PhonePe</span>
              </button>
              <button 
                className={`${styles.upiAppBtn} ${selectedApp === 'paytm' ? styles.selectedApp : ''}`}
                onClick={() => setSelectedApp('paytm')}
                type="button"
              >
                <span>Paytm</span>
              </button>
              <button 
                className={`${styles.upiAppBtn} ${selectedApp === 'amazon' ? styles.selectedApp : ''}`}
                onClick={() => setSelectedApp('amazon')}
                type="button"
              >
                <span>Amazon Pay</span>
              </button>
              <button 
                className={`${styles.upiAppBtn} ${selectedApp === 'bhim' ? styles.selectedApp : ''}`}
                onClick={() => setSelectedApp('bhim')}
                type="button"
              >
                <span>BHIM UPI</span>
              </button>
            </div>
            <div className={styles.upiOr}>
              <span>OR</span>
            </div>
            <div className={styles.formGroup}>
              <label>Enter UPI ID</label>
              <input
                type="text"
                placeholder="username@okhdfcbank"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            <p className={styles.upiNote}>Pay using any UPI app</p>
          </div>
        )}

        {/* Net Banking Form */}
        {paymentMethod === 'netbanking' && (
          <div className={styles.netbankingDetails}>
            <div className={styles.formGroup}>
              <label>Select Your Bank</label>
              <select className={styles.bankSelect}>
                <option value="">Select Bank</option>
                <option value="sbi">State Bank of India (SBI)</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
                <option value="yes">Yes Bank</option>
                <option value="pnb">Punjab National Bank (PNB)</option>
                <option value="bob">Bank of Baroda (BOB)</option>
                <option value="canara">Canara Bank</option>
                <option value="idfc">IDFC First Bank</option>
              </select>
            </div>
            <p className={styles.netbankingNote}>You will be redirected to your bank's secure page</p>
          </div>
        )}

        {/* Wallet Form */}
        {paymentMethod === 'wallet' && (
          <div className={styles.walletDetails}>
            <div className={styles.walletAppsGrid}>
              <button className={styles.walletBtn} type="button">
                <span>Paytm Wallet</span>
              </button>
              <button className={styles.walletBtn} type="button">
                <span>Amazon Pay Balance</span>
              </button>
              <button className={styles.walletBtn} type="button">
                <span>Mobikwik</span>
              </button>
              <button className={styles.walletBtn} type="button">
                <span>Freecharge</span>
              </button>
            </div>
            <p className={styles.walletNote}>Add money to wallet to make instant payments</p>
          </div>
        )}

        {/* Cash on Delivery - Confirm Order Button instead of Pay */}
        {paymentMethod === 'cod' && (
          <div className={styles.codInfo}>
            <div className={styles.codMessage}>
              <p>You have selected Cash on Delivery</p>
              <p className={styles.codNote}>Pay with cash when you receive your order</p>
              <p className={styles.codNote}>No additional charges for COD</p>
            </div>
            <button 
              className={styles.confirmOrderBtn} 
              onClick={handleCodConfirm}
              disabled={processing}
            >
              {processing ? (
                <>Processing...</>
              ) : (
                <>Confirm Order</>
              )}
            </button>
          </div>
        )}

        {/* Payment Button for other methods */}
        {paymentMethod !== 'cod' && (
          <button 
            className={styles.payBtn} 
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? (
              <>Processing...</>
            ) : (
              `Pay ₹${totalAmount}`
            )}
          </button>
        )}

        <div className={styles.paymentFooter}>
          <p className={styles.secureFooter}>
            Your payment information is secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;