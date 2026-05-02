import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const scrollToContact = (e) => {
    e.preventDefault();
    setIsOpen(false);
    
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      const offset = 80;
      const elementPosition = contactSection.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="cuure.health Logo" className="logo-image" />
          <span className="logo-text">cuure<span className="logo-dot">.</span>health</span>
        </Link>

        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>Services</Link>
          <Link to="/pharmacy" className={`nav-link ${isActive('/pharmacy') ? 'active' : ''}`}>Pharmacy</Link>
          <Link to="/insurance" className={`nav-link ${isActive('/insurance') ? 'active' : ''}`}>Insurance</Link>
          <Link to="/testimonials" className={`nav-link ${isActive('/testimonials') ? 'active' : ''}`}>Testimonials</Link>
          <a 
            href="#contact-section" 
            className="nav-link"
            onClick={scrollToContact}
          >
            Contact
          </a>
          <Link to="/appointment" className="nav-cta">Book Appointment</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;