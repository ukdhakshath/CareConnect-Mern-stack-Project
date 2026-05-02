import React, { useState } from 'react';
import styles from '../styles/Insurance.module.css';

const PremiumCalculator = () => {
  const [age, setAge] = useState('');
  const [coverage, setCoverage] = useState('');
  const [estimatedPremium, setEstimatedPremium] = useState(null);

  const calculatePremium = () => {
    if (!age || !coverage) {
      alert('Please enter age and coverage amount');
      return;
    }

    // Simple premium calculation logic
    const ageFactor = age < 30 ? 1 : age < 40 ? 1.5 : age < 50 ? 2 : 2.5;
    const coverageAmount = parseInt(coverage.replace(/[^0-9]/g, ''));
    const basePremium = coverageAmount * 0.002; // 0.2% of coverage
    
    const calculated = basePremium * ageFactor;
    setEstimatedPremium(Math.round(calculated));
  };

  return (
    <div className={styles.calculatorSection}>
      <h2 className={styles.calculatorTitle}>Premium Calculator</h2>
      <p className={styles.calculatorSubtitle}>
        Get estimated premium for your insurance plan
      </p>

      <div className={styles.calculatorCard}>
        <div className={styles.calculatorForm}>
          <div className={styles.formGroup}>
            <label htmlFor="age">Your Age</label>
            <input
              type="number"
              id="age"
              className={styles.calculatorInput}
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
              max="80"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="coverage">Coverage Amount</label>
            <select
              id="coverage"
              className={styles.calculatorSelect}
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
            >
              <option value="">Select coverage</option>
              <option value="500000">₹5 Lakhs</option>
              <option value="1000000">₹10 Lakhs</option>
              <option value="2000000">₹20 Lakhs</option>
              <option value="5000000">₹50 Lakhs</option>
              <option value="10000000">₹1 Crore</option>
            </select>
          </div>

          <button
            className={styles.calculateBtn}
            onClick={calculatePremium}
          >
            Calculate Premium
          </button>
        </div>

        {estimatedPremium && (
          <div className={styles.premiumResult}>
            <h3>Estimated Monthly Premium</h3>
            <div className={styles.premiumAmount}>
              ₹{estimatedPremium.toLocaleString()}
            </div>
            <p className={styles.premiumNote}>
              *This is an estimated premium. Actual premium may vary based on underwriting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumCalculator;