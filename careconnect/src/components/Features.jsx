import React from 'react';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import '../styles/Features.css';

const Features = () => {
  const navigate = useNavigate();

  return (
    <section className="features">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">{content.features.title}</h2>
          <p className="section-subtitle">{content.features.subtitle}</p>
        </div>

        <div className="features-grid">
          {content.features.items.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="feature-image">
                <img src={feature.image} alt={feature.title} loading="lazy" />
              </div>
              
              <div className="feature-content">
                {/* Removed the green icon wrapper completely */}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;