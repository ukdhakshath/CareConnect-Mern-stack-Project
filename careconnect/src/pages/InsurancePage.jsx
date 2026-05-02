import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumCalculator from '../components/PremiumCalculator';
import styles from '../styles/Insurance.module.css';

const InsurancePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Plans' },
    { id: 'health', name: 'Health Insurance' },
    { id: 'life', name: 'Life Insurance' },
    { id: 'critical', name: 'Critical Illness' },
    { id: 'senior', name: 'Senior Citizen' }
  ];

  const insurancePlans = [
    {
      id: 1,
      name: 'Complete Health Insurance',
      provider: 'Star Health',
      coverage: '₹10 Lakhs',
      premium: '₹2,499/month',
      category: 'health',
      rating: 4.5,
      reviews: 2341,
      benefits: [
        'Cashless treatment at 6500+ hospitals',
        'No Claim Bonus up to 50%',
        'Day care procedures covered',
        'Free annual health checkup'
      ],
      eligibility: '18-65 years',
      claimRatio: '98.5%'
    },
    {
      id: 2,
      name: 'Family Floater Health',
      provider: 'ICICI Lombard',
      coverage: '₹20 Lakhs',
      premium: '₹4,999/month',
      category: 'health',
      rating: 4.7,
      reviews: 3892,
      benefits: [
        'Cover your entire family',
        'Maternity cover included',
        'Newborn baby cover',
        'Wellness benefits'
      ],
      eligibility: '18-65 years',
      claimRatio: '97.2%'
    },
    {
      id: 3,
      name: 'Term Life Insurance',
      provider: 'LIC',
      coverage: '₹50 Lakhs',
      premium: '₹1,899/month',
      category: 'life',
      rating: 4.8,
      reviews: 5231,
      benefits: [
        'Life cover up to 50 Lakhs',
        'Maturity benefit',
        'Tax benefits u/s 80C',
        'Loan facility available'
      ],
      eligibility: '18-60 years',
      claimRatio: '98.2%'
    },
    {
      id: 4,
      name: 'Critical Illness Plan',
      provider: 'HDFC Life',
      coverage: '₹15 Lakhs',
      premium: '₹3,299/month',
      category: 'critical',
      rating: 4.6,
      reviews: 1876,
      benefits: [
        'Covers 34 critical illnesses',
        'Lump sum payment on diagnosis',
        'No medical test up to 45 years',
        'Tax benefits u/s 80D'
      ],
      eligibility: '18-55 years',
      claimRatio: '96.5%'
    },
    {
      id: 5,
      name: 'Senior Citizen Health',
      provider: 'New India Assurance',
      coverage: '₹5 Lakhs',
      premium: '₹4,999/month',
      category: 'senior',
      rating: 4.4,
      reviews: 892,
      benefits: [
        'No upper age limit',
        'Pre-existing diseases covered',
        'Home care treatments',
        'Ambulance charges covered'
      ],
      eligibility: '60-80 years',
      claimRatio: '94.8%'
    }
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? insurancePlans 
    : insurancePlans.filter(plan => plan.category === selectedCategory);

  const handleViewDetails = (planId) => {
    console.log('Navigating to details for plan:', planId);
    navigate(`/insurance-details/${planId}`);
  };

  const handleBuyNow = (plan) => {
    console.log('Navigating to form with plan:', plan);
    navigate('/insurance-form', { 
      state: { 
        selectedPlan: plan 
      } 
    });
  };

  return (
    <div className={styles.insuranceContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Insurance Plans</h1>
          <p className={styles.heroSubtitle}>
            Protect what matters most with our comprehensive insurance plans
          </p>
        </div>
      </section>

      {/* Premium Calculator Component */}
      <PremiumCalculator />

      {/* Category Filter */}
      <section className={styles.categorySection}>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.activeCategory : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Plans Grid */}
      <section className={styles.plansSection}>
        <h2 className={styles.sectionTitle}>Insurance Plans</h2>
        <p className={styles.sectionSubtitle}>{filteredPlans.length} plans available</p>

        <div className={styles.plansGrid}>
          {filteredPlans.map((plan) => (
            <div key={plan.id} className={styles.planCard}>
              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <span className={styles.planProvider}>{plan.provider}</span>
              </div>

              <div className={styles.planBadges}>
                <span className={styles.rating}>
                  ★ {plan.rating} <span className={styles.reviews}>({plan.reviews})</span>
                </span>
                <span className={styles.claimRatio}>Claim Ratio: {plan.claimRatio}</span>
              </div>

              <div className={styles.planCoverage}>
                <div className={styles.coverageItem}>
                  <span className={styles.coverageLabel}>Coverage</span>
                  <span className={styles.coverageValue}>{plan.coverage}</span>
                </div>
                <div className={styles.coverageItem}>
                  <span className={styles.coverageLabel}>Premium</span>
                  <span className={styles.coverageValue}>{plan.premium}</span>
                </div>
              </div>

              <div className={styles.planBenefits}>
                <h4 className={styles.benefitsTitle}>Key Benefits</h4>
                <ul className={styles.benefitsList}>
                  {plan.benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className={styles.benefitItem}>
                      <span className={styles.benefitIcon}>✓</span>
                      {benefit}
                    </li>
                  ))}
                  {plan.benefits.length > 3 && (
                    <li className={styles.moreBenefits}>+{plan.benefits.length - 3} more benefits</li>
                  )}
                </ul>
              </div>

              <div className={styles.planActions}>
                <button
                  className={styles.viewDetailsBtn}
                  onClick={() => handleViewDetails(plan.id)}
                >
                  View Details
                </button>
                <button
                  className={styles.buyNowBtn}
                  onClick={() => handleBuyNow(plan)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InsurancePage;