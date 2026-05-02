import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h2 className="modal-title">Booking Confirmed!</h2>
        
        <p className="modal-message">
          Thank you for choosing CareConnect. A care coordinator will contact you 
          within the next 2 hours to discuss your needs and schedule a consultation.
        </p>

        <div className="modal-details">
          <div className="detail-item">
            <i className="fas fa-clock"></i>
            <span>Response time: 2 hours</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-phone"></i>
            <span>Emergency: +1 (800) 456-7890</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-envelope"></i>
            <span>Confirmation sent to your email</span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>

        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Modal;