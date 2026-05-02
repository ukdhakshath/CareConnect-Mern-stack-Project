import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import '../styles/Services.css';

const Services = () => {
  const [activeTab, setActiveTab] = useState('nursing');
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/appointment');
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const services = activeTab === 'nursing' ? content.nursingServices.items : content.homeCareServices.items;

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">Comprehensive Care Solutions</h2>
          <p className="section-subtitle">
            From specialized medical care to daily living assistance, we provide complete 
            support for you and your loved ones.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="services-tabs" data-aos="fade-up" data-aos-delay="100">
          <button
            className={`tab-btn ${activeTab === 'nursing' ? 'active' : ''}`}
            onClick={() => setActiveTab('nursing')}
          >
            <i className="fas fa-user-md"></i>
            Nursing Services
          </button>
          <button
            className={`tab-btn ${activeTab === 'homecare' ? 'active' : ''}`}
            onClick={() => setActiveTab('homecare')}
          >
            <i className="fas fa-home"></i>
            Home Care Services
          </button>
        </div>

        {/* Services Grid */}
        <div className="services-grid" data-aos="fade-up" data-aos-delay="200">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="service-image">
                <img src={service.image} alt={service.title} loading="lazy" />
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
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                  
                  <button 
                    className="service-link"
                    onClick={() => setSelectedService(service)}
                  >
                    Learn More <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Need Help Choosing Button - Updated to scroll to contact */}
        <div className="services-more" data-aos="fade-up">
          <button 
            className="btn btn-outline btn-large"
            onClick={scrollToContact}
          >
            Need Help Choosing? Contact Us
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="service-modal" onClick={() => setSelectedService(null)}>
          <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedService(null)}>
              <i className="fas fa-times"></i>
            </button>

            <div className="service-modal-header">
              <h3>{selectedService.title}</h3>
            </div>

            <div className="service-modal-body">
              <img src={selectedService.image} alt={selectedService.title} />
              
              <p className="service-modal-description">
                {selectedService.description}
              </p>

              <div className="service-modal-features">
                <h4>What's Included:</h4>
                <ul>
                  {selectedService.features.map((feature, i) => (
                    <li key={i}>
                      <i className="fas fa-check-circle"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-modal-pricing">
                <h4>Pricing:</h4>
                <p className="price">{selectedService.price}</p>
                <p className="price-note">*Minimum 2 hours per visit. Insurance accepted.</p>
              </div>

              <div className="service-modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={(e) => {
                    setSelectedService(null);
                    handleBookNow(e);
                  }}
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;