import React, { useState } from 'react';
import { content } from '../data/content';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % content.testimonials.items.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + content.testimonials.items.length) % content.testimonials.items.length);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">{content.testimonials.title}</h2>
          <p className="section-subtitle">{content.testimonials.subtitle}</p>
        </div>

        <div className="testimonials-slider" data-aos="fade-up" data-aos-delay="200">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">
                <i className="fas fa-quote-right"></i>
              </div>
              <p className="testimonial-quote">{content.testimonials.items[currentIndex].quote}</p>
              
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas fa-star ${i < content.testimonials.items[currentIndex].rating ? 'filled' : ''}`}
                  ></i>
                ))}
              </div>

              <div className="testimonial-author">
                <img 
                  src={content.testimonials.items[currentIndex].image} 
                  alt={content.testimonials.items[currentIndex].author}
                  className="author-image"
                />
                <div className="author-info">
                  <h4>{content.testimonials.items[currentIndex].author}</h4>
                  <p>{content.testimonials.items[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-controls">
            <button 
              className="slider-btn prev" 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="slider-dots">
              {content.testimonials.items.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button 
              className="slider-btn next" 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;