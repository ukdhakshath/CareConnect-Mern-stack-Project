import React, { useEffect } from 'react';
import Services from '../components/Services';

const ServicesPage = () => {
  // Ensure page starts at top when navigating to services
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page">
      <Services />
    </div>
  );
};

export default ServicesPage;