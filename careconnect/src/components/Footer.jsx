import React from 'react';
import { Link } from 'react-router-dom';
import { content } from '../data/content';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section" data-aos="fade-up">
            <h3 className="footer-logo">
              <Link to="/" className="footer-logo-link">
                cuure<span className="logo-dot">.</span>health
              </Link>
            </h3>
            <p className="footer-description">
              Certified doctors and medical professionals visiting your home for treatment. 
              Affordable, convenient, and trusted healthcare.
            </p>
            
            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="badge">
                <span className="badge-icon">✓</span>
                <span className="badge-text">Certified Doctors</span>
              </div>
              <div className="badge">
                <span className="badge-icon">🏆</span>
                <span className="badge-text">5000+ Happy Patients</span>
              </div>
              <div className="badge">
                <span className="badge-icon">✓</span>
                <span className="badge-text">24/7 Available</span>
              </div>
              <div className="badge">
                <span className="badge-icon">💳</span>
                <span className="badge-text">Secure Payment</span>
              </div>
            </div>
          </div>

          <div className="footer-section" data-aos="fade-up" data-aos-delay="100">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/pharmacy">Pharmacy</Link></li>
              <li><Link to="/insurance">Insurance</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/appointment">Book Appointment</Link></li>
            </ul>
          </div>

          <div className="footer-section" data-aos="fade-up" data-aos-delay="200">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services">Doctor Consultation</Link></li>
              <li><Link to="/services">Nursing Care</Link></li>
              <li><Link to="/services">Physiotherapy</Link></li>
              <li><Link to="/services">Lab Tests at Home</Link></li>
              <li><Link to="/services">Elderly Care</Link></li>
              <li><Link to="/services">24/7 Emergency</Link></li>
            </ul>
          </div>

          <div className="footer-section" data-aos="fade-up" data-aos-delay="300">
            <h4>Get In Touch</h4>
            <ul>
              <li>
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <a href={`tel:${content.footer.phone}`}>+91 74830 68353, 08213 156014</a>
                  <span className="contact-note">Available 24/7 for emergency calls</span>
                  <span className="contact-note">Response within 2 hours</span>
                  <span className="contact-note">Quick support via WhatsApp</span>
                </div>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>Sarvajanika Hostel Rd,Vidyaranyapura, Mysuru, Karnataka 570008</span>
              </li>
            </ul>
            
            <div className="footer-social">
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} cuure.health. All rights reserved.</p>
            <p>Made with <i className="fas fa-heart"></i> for better healthcare</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;