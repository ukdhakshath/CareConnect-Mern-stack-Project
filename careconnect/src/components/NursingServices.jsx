import React from 'react';
import { content } from '../data/content';
import '../styles/Services.css';

const NursingServices = () => {
  const handleBookNow = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = document.getElementById(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="services nursing-services">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">Nursing Care</span>
          <h2 className="section-title">{content.nursingServices.title}</h2>
          <p className="section-subtitle">{content.nursingServices.subtitle}</p>
        </div>

        <div className="services-grid">
          {content.nursingServices.items.map((service, index) => (
            <div
              key={index}
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="service-image">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="service-icon">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <div className="service-price">
                  {service.price}
                </div>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  {service.features.map((feature, i) => (
                    <span key={i} className="feature-tag">
                      <i className="fas fa-check-circle"></i>
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="service-actions">
                  <button 
                    className="service-btn"
                    onClick={(e) => handleBookNow(e, 'contact')}
                  >
                    Book Now
                  </button>
                  
                  <button 
                    className="service-link"
                    onClick={(e) => handleBookNow(e, 'contact')}
                  >
                    Learn More <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NursingServices;