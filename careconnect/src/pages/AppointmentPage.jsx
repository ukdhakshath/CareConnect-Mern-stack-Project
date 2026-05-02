import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { appointmentAPI } from '../services/api';
import '../styles/AppointmentPage.css';

const AppointmentPage = ({ setModalOpen }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    specificServices: [],
    preferredDate: '',
    preferredTime: '',
    urgentCare: false,
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceChange = (service) => {
    setFormData(prev => {
      const updated = prev.specificServices.includes(service)
        ? prev.specificServices.filter(s => s !== service)
        : [...prev.specificServices, service];
      return { ...prev, specificServices: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.serviceType) {
      setFormStatus({ submitting: false, submitted: false, error: 'Please fill in all required fields' });
      return;
    }

    try {
      const result = await appointmentAPI.create(formData);
      
      if (result.success) {
        setFormStatus({ submitting: false, submitted: true, error: null });
        
        // Open the booking confirmation modal
        setModalOpen(true);
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          serviceType: '',
          specificServices: [],
          preferredDate: '',
          preferredTime: '',
          urgentCare: false,
          message: ''
        });

        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setFormStatus({ submitting: false, submitted: false, error: result.error || 'Failed to book appointment' });
      }
    } catch (error) {
      console.error('Appointment booking error:', error);
      setFormStatus({ submitting: false, submitted: false, error: 'Error booking appointment. Please try again.' });
    }
  };

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        <div className="appointment-header" data-aos="fade-down">
          <h1>Book an Appointment</h1>
          <p>Schedule your care consultation with our healthcare professionals</p>
        </div>

        <div className="appointment-content">
          <div className="appointment-info" data-aos="fade-right">
            <div className="info-card">
              <h3>Why Book with Us?</h3>
              <ul>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Free initial consultation</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Flexible scheduling options</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Same-day appointments available</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Certified healthcare professionals</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Personalized care plans</span>
                </li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Contact Information</h3>
              <p>
                <i className="fas fa-phone"></i>
                <a href={`tel:${content.footer.phone}`}>{content.footer.phone}</a>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${content.footer.email}`}>{content.footer.email}</a>
              </p>
              <p>
                <i className="fas fa-clock"></i>
                <span>Mon - Sun: 24/7 Available</span>
              </p>
            </div>

            <div className="info-card">
              <h3>Insurance Accepted</h3>
              <div className="insurance-logos">
                <span>Medicare</span>
                <span>Medicaid</span>
                <span>Blue Cross</span>
                <span>Aetna</span>
                <span>Cigna</span>
                <span>UnitedHealth</span>
              </div>
            </div>
          </div>

          <div className="appointment-form-wrapper" data-aos="fade-left">
            {formStatus.error && (
              <div className="form-error">
                <i className="fas fa-exclamation-circle"></i>
                {formStatus.error}
              </div>
            )}

            {formStatus.submitted && (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                Appointment booked successfully! Redirecting...
              </div>
            )}

            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                    <i className="fas fa-user"></i>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                    <i className="fas fa-envelope"></i>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                    <i className="fas fa-phone"></i>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Appointment Details</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="serviceType">Type of Service *</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select service type</option>
                      <option value="nursing">Nursing Services</option>
                      <option value="homecare">Home Care Services</option>
                      <option value="both">Both Nursing & Home Care</option>
                    </select>
                    <i className="fas fa-chevron-down"></i>
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredDate">Preferred Date</label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <i className="fas fa-calendar"></i>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredTime">Preferred Time</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (8AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (4PM - 8PM)</option>
                    </select>
                    <i className="fas fa-clock"></i>
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="urgentCare"
                        checked={formData.urgentCare}
                        onChange={handleChange}
                      />
                      <span>This is an urgent care request</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Specific Services Needed</h3>
                <div className="services-checkbox-grid">
                  {content.formOptions.services.map((service, index) => (
                    <label key={index} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={service}
                        checked={formData.specificServices.includes(service)}
                        onChange={() => handleServiceChange(service)}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h3>Additional Information</h3>
                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your specific requirements or concerns..."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={formStatus.submitting}
                >
                  {formStatus.submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Booking...
                    </>
                  ) : (
                    <>
                      Book Appointment
                      <i className="fas fa-calendar-check"></i>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline btn-large"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;