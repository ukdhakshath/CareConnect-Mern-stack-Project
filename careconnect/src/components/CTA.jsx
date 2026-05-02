import React from 'react';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import '../styles/CTA.css';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-content" data-aos="fade-right">
          <h2 className="cta-title">
            {content.cta.title}
            <span className="gradient-text"> Get Started Today</span>
          </h2>
          
          <p className="cta-subtitle">
            {content.cta.subtitle}
          </p>

          <div className="cta-features">
            {['Free Assessment', 'No Commitment', '24/7 Support'].map((feature, index) => (
              <div 
                key={index}
                className="cta-feature"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <i className="fas fa-check-circle"></i>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="cta-buttons">
            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate('/appointment')}
            >
              Book Appointment
              <i className="fas fa-calendar-check"></i>
            </button>

            <button
              className="btn btn-outline btn-large"
              onClick={() => navigate('/contact')}
            >
              Contact Us
              <i className="fas fa-phone"></i>
            </button>
          </div>

          <div className="cta-stats">
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Families</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>

        <div className="cta-image" data-aos="fade-left" data-aos-delay="200">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
            alt="Happy patient with caregiver"
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;