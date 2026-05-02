import React, { useEffect } from 'react';
import Testimonials from '../components/Testimonials';

const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="testimonials-page">
      <Testimonials />
    </div>
  );
};

export default TestimonialsPage;