import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Insurance.module.css';

const InsuranceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Mock data - in real app, fetch from API based on id
    const plans = {
      1: {
        id: 1,
        name: 'Complete Health Insurance',
        provider: 'Star Health',
        coverage: '₹10 Lakhs',
        premium: '₹2,499/month',
        rating: 4.5,
        reviews: 2341,
        description: 'Comprehensive health coverage for individuals and families',
        benefits: [
          'Cashless treatment at 6500+ hospitals',
          'No Claim Bonus up to 50%',
          'Day care procedures covered',
          'Free annual health checkup',
          'Ambulance cover up to ₹2000',
          'Pre and post hospitalization cover'
        ],
        eligibility: '18-65 years',
        waitingPeriod: '30 days',
        claimRatio: '98.5%',
        networkHospitals: '6500+',
        taxBenefit: 'Section 80D',
        documents: [
          'Identity proof (Aadhar/PAN)',
          'Age proof',
          'Address proof',
          'Medical history'
        ]
      },
      2: {
        id: 2,
        name: 'Family Floater Health',
        provider: 'ICICI Lombard',
        coverage: '₹20 Lakhs',
        premium: '₹4,999/month',
        rating: 4.7,
        reviews: 3892,
        description: 'Complete health protection for your entire family',
        benefits: [
          'Cover your entire family',
          'Maternity cover included',
          'Newborn baby cover',
          'Wellness benefits',
          'Annual health checkup',
          'No Claim Bonus up to 100%'
        ],
        eligibility: '18-65 years',
        waitingPeriod: '24 days',
        claimRatio: '97.2%',
        networkHospitals: '8000+',
        taxBenefit: 'Section 80D',
        documents: [
          'Identity proof for all members',
          'Age proof',
          'Address proof',
          'Relationship proof'
        ]
      },
      3: {
        id: 3,
        name: 'Term Life Insurance',
        provider: 'LIC',
        coverage: '₹50 Lakhs',
        premium: '₹1,899/month',
        rating: 4.8,
        reviews: 5231,
        description: 'Financial protection for your family\'s future',
        benefits: [
          'Life cover up to ₹50 Lakhs',
          'Maturity benefit',
          'Tax benefits u/s 80C',
          'Loan facility available',
          'Critical illness rider optional',
          'Accidental death benefit'
        ],
        eligibility: '18-60 years',
        claimRatio: '98.2%',
        taxBenefit: 'Section 80C',
        documents: [
          'Identity proof',
          'Age proof',
          'Address proof',
          'Income proof',
          'Medical examination'
        ]
      }
    };

    // Get the plan based on the id from URL
    const selectedPlan = plans[id];
    if (selectedPlan) {
      setPlan(selectedPlan);
    } else {
      // If plan not found, redirect to insurance page
      navigate('/insurance');
    }
    setLoading(false);
  }, [id, navigate]);

  const handleBuyNow = () => {
    navigate('/insurance-form', { 
      state: { 
        selectedPlan: plan 
      } 
    });
  };

  if (loading) {
    return (
      <div className={styles.insuranceContainer}>
        <div className={styles.loadingState}>
          <h2>Loading plan details...</h2>
        </div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className={styles.insuranceContainer}>
      {/* Hero Section */}
      <section className={styles.detailsHero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{plan.name}</h1>
          <p className={styles.heroSubtitle}>by {plan.provider}</p>
          <p className={styles.planDescription}>{plan.description}</p>
        </div>
      </section>

      <div className={styles.detailsLayout}>
        {/* Main Content */}
        <div className={styles.detailsMain}>
          {/* Overview Card */}
          <div className={styles.detailsCard}>
            <h2 className={styles.cardTitle}>Plan Overview</h2>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Coverage Amount</span>
                <span className={styles.overviewValue}>{plan.coverage}</span>
              </div>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Monthly Premium</span>
                <span className={styles.overviewValue}>{plan.premium}</span>
              </div>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Claim Settlement Ratio</span>
                <span className={styles.overviewValue}>{plan.claimRatio}</span>
              </div>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Rating</span>
                <span className={styles.overviewValue}>★ {plan.rating} ({plan.reviews} reviews)</span>
              </div>
              {plan.networkHospitals && (
                <div className={styles.overviewItem}>
                  <span className={styles.overviewLabel}>Network Hospitals</span>
                  <span className={styles.overviewValue}>{plan.networkHospitals}</span>
                </div>
              )}
            </div>
          </div>

          {/* Benefits Card */}
          <div className={styles.detailsCard}>
            <h2 className={styles.cardTitle}>Key Benefits</h2>
            <ul className={styles.benefitsFullList}>
              {plan.benefits.map((benefit, index) => (
                <li key={index} className={styles.benefitFullItem}>
                  <span className={styles.benefitIcon}>✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility Card */}
          <div className={styles.detailsCard}>
            <h2 className={styles.cardTitle}>Eligibility & Details</h2>
            <div className={styles.eligibilityContent}>
              <p><strong>Eligibility:</strong> {plan.eligibility}</p>
              <p><strong>Waiting Period:</strong> {plan.waitingPeriod}</p>
              {plan.taxBenefit && (
                <p><strong>Tax Benefit:</strong> {plan.taxBenefit}</p>
              )}
            </div>
          </div>

          {/* Required Documents Card */}
          <div className={styles.detailsCard}>
            <h2 className={styles.cardTitle}>Required Documents</h2>
            <ul className={styles.documentsList}>
              {plan.documents.map((doc, index) => (
                <li key={index} className={styles.documentItem}>
                  <span className={styles.documentIcon}>📄</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.detailsSidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Quick Summary</h3>
            <div className={styles.sidebarInfo}>
              <div className={styles.sidebarRow}>
                <span>Coverage</span>
                <strong>{plan.coverage}</strong>
              </div>
              <div className={styles.sidebarRow}>
                <span>Premium</span>
                <strong>{plan.premium}</strong>
              </div>
              <div className={styles.sidebarRow}>
                <span>Provider</span>
                <strong>{plan.provider}</strong>
              </div>
              <div className={styles.sidebarRow}>
                <span>Rating</span>
                <strong>★ {plan.rating}</strong>
              </div>
            </div>
            
            <button
              className={styles.sidebarBuyBtn}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            
            <button
              className={styles.sidebarBackBtn}
              onClick={() => navigate('/insurance')}
            >
              ← Back to Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;