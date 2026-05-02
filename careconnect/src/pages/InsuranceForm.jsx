import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { insuranceAPI } from '../services/api';
import styles from '../styles/Insurance.module.css';

const InsuranceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan } = location.state || {};
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    nomineeName: '',
    nomineeRelation: '',
    medicalConditions: '',
    planName: selectedPlan?.name || '',
    planProvider: selectedPlan?.provider || '',
    coverage: selectedPlan?.coverage || '',
    premium: selectedPlan?.premium || ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!selectedPlan) {
      // If no plan selected, redirect to insurance page
      navigate('/insurance');
    }
  }, [selectedPlan, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 18 || formData.age > 80) {
      newErrors.age = 'Age must be between 18 and 80';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Pincode validation
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    // Nominee validation
    if (!formData.nomineeName.trim()) {
      newErrors.nomineeName = 'Nominee name is required';
    }

    if (!formData.nomineeRelation) {
      newErrors.nomineeRelation = 'Nominee relation is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo(0, 0);
      return;
    }

    try {
      const result = await insuranceAPI.submitForm(formData);
      
      if (result.success) {
        setFormSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert('Failed to submit form: ' + result.error);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  if (formSubmitted) {
    return (
      <div className={styles.insuranceContainer}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.successTitle}>
            Your Insurance Application Has Been Submitted Successfully
          </h1>
          <p className={styles.successMessage}>
            Thank you for choosing our insurance services. Our representative will contact you within 24 hours.
          </p>
          
          <div className={styles.applicationDetails}>
            <h3>Application Summary</h3>
            <p><strong>Plan:</strong> {formData.planName}</p>
            <p><strong>Provider:</strong> {formData.planProvider}</p>
            <p><strong>Coverage:</strong> {formData.coverage}</p>
            <p><strong>Premium:</strong> {formData.premium}</p>
            <p><strong>Applicant:</strong> {formData.fullName}</p>
          </div>

          <button
            className={styles.backToPlansBtn}
            onClick={() => navigate('/insurance')}
          >
            Browse More Plans
          </button>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return null;
  }

  return (
    <div className={styles.insuranceContainer}>
      <section className={styles.formHero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Insurance Application</h1>
          <p className={styles.heroSubtitle}>
            Complete your application for {selectedPlan.name}
          </p>
        </div>
      </section>

      <div className={styles.formLayout}>
        <div className={styles.formSection}>
          <h2 className={styles.formSectionTitle}>Personal Information</h2>
          
          <form onSubmit={handleSubmit} className={styles.applicationForm}>
            <div className={styles.formGroup}>
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                className={`${styles.formInput} ${errors.fullName ? styles.inputError : ''}`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  className={`${styles.formInput} ${errors.age ? styles.inputError : ''}`}
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
                {errors.age && <span className={styles.errorMessage}>{errors.age}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                />
                {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Address *</label>
              <textarea
                name="address"
                className={`${styles.formTextarea} ${errors.address ? styles.inputError : ''}`}
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows="2"
              />
              {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  className={`${styles.formInput} ${errors.city ? styles.inputError : ''}`}
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  className={`${styles.formInput} ${errors.pincode ? styles.inputError : ''}`}
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                />
                {errors.pincode && <span className={styles.errorMessage}>{errors.pincode}</span>}
              </div>
            </div>

            <h2 className={styles.formSectionTitle}>Nominee Details</h2>

            <div className={styles.formGroup}>
              <label>Nominee Name *</label>
              <input
                type="text"
                name="nomineeName"
                className={`${styles.formInput} ${errors.nomineeName ? styles.inputError : ''}`}
                value={formData.nomineeName}
                onChange={handleChange}
                placeholder="Nominee's full name"
              />
              {errors.nomineeName && <span className={styles.errorMessage}>{errors.nomineeName}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Relation *</label>
              <select
                name="nomineeRelation"
                className={`${styles.formSelect} ${errors.nomineeRelation ? styles.inputError : ''}`}
                value={formData.nomineeRelation}
                onChange={handleChange}
              >
                <option value="">Select relation</option>
                <option value="Spouse">Spouse</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Other">Other</option>
              </select>
              {errors.nomineeRelation && <span className={styles.errorMessage}>{errors.nomineeRelation}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Medical History</label>
              <textarea
                name="medicalConditions"
                className={styles.formTextarea}
                value={formData.medicalConditions}
                onChange={handleChange}
                placeholder="List any pre-existing conditions or write 'None'"
                rows="3"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" required />
                <span>I declare that the information provided is true to the best of my knowledge.</span>
              </label>
            </div>

            <button type="submit" className={styles.submitApplicationBtn}>
              Submit Application
            </button>
          </form>
        </div>

        <div className={styles.planSummary}>
          <h2 className={styles.summaryTitle}>Plan Summary</h2>
          <div className={styles.summaryCard}>
            <h3 className={styles.planSummaryName}>{selectedPlan.name}</h3>
            <p className={styles.planSummaryProvider}>{selectedPlan.provider}</p>
            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Coverage</span>
                <strong>{selectedPlan.coverage}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Premium</span>
                <strong>{selectedPlan.premium}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Rating</span>
                <strong>★ {selectedPlan.rating}</strong>
              </div>
            </div>
          </div>
          <button className={styles.cancelBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceForm;