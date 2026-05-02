import React from 'react';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import '../styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    if (type === 'primary') {
      navigate('/services'); // Changed to navigate to services
    } else if (type === 'outline') {
      navigate('/contact'); // Changed to navigate to contact
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge" data-aos="fade-down">
            <span className="pulse-dot"></span>
            Trusted Healthcare Provider
          </div>

          <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
            Professional Nursing & <span className="gradient-text">Home Care</span>
          </h1>

          <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
            Experience compassionate, certified healthcare services tailored to your needs in the comfort of your home.
          </p>

          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="300">
            <button
              className="btn btn-primary"
              onClick={() => handleButtonClick('primary')}
            >
              Explore Our Services
              <i className="fas fa-arrow-right"></i>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => handleButtonClick('outline')}
            >
              Talk to an Expert
              <i className="fas fa-phone-alt"></i>
            </button>
          </div>

          <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Families</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Availability</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Certified Nurses</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper" data-aos="fade-left" data-aos-delay="200">
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1581056771392-8a90ddb76831?q=80&w=2070&auto=format&fit=crop" 
              alt="Nurse caring for patient"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;