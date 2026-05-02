import React from 'react';
import '../styles/ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact-section" className="contact-section">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <span className="section-badge">CONTACT US</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have questions? We're here to help 24/7. Reach out to us anytime.
          </p>
        </div>

        <div className="contact-wrapper">
          {/* Left Column - Contact Info */}
          <div className="contact-info-left">
            <h3 className="info-heading">Let's Talk About Your Care Needs</h3>
            <p className="info-description">
              Our care coordinators are available to discuss your specific requirements and help you find the perfect care solution.
            </p>

            <div className="contact-details-grid">
              {/* PHONE */}
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="detail-content">
                  <h4>PHONE</h4>
                  <p className="detail-text">+91 74830 68353</p>
                  <p className="detail-text">08213 156014</p>
                  <span className="detail-note">Available 24/7 for emergency calls</span>
                </div>
              </div>

              {/* EMAIL */}
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="detail-content">
                  <h4>EMAIL</h4>
                  <p className="detail-text">enquire@cuure.health</p>
                  <span className="detail-note">Response within 2 hours</span>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="detail-content">
                  <h4>WHATSAPP</h4>
                  <p className="detail-text">+91 74830 68353</p>
                  <span className="detail-note">Quick support via WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Address & Map */}
          <div className="contact-info-right">
            {/* ADDRESS Card - Matching left side styling exactly */}
            <div className="detail-card address-detail-card">
              <div className="detail-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="detail-content">
                <h4>ADDRESS</h4>
                <p className="detail-text">1054, Sarvajanika Hostel Rd,</p>
                <p className="detail-text">Vidyaranyapura, Mysuru,</p>
                <p className="detail-text">Karnataka 570008</p>
              </div>
            </div>

            {/* Map Container */}
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.4!2d76.6!3d12.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b5f7e8a8a8a8a8a%3A0x8a8a8a8a8a8a8a8a!2sVidyaranyapura%2C%20Mysuru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Cuure.health location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;