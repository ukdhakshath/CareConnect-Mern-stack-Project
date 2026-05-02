import React, { useEffect } from 'react';
import ContactForm from '../components/ContactSection';

const ContactPage = ({ setModalOpen }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <ContactForm setModalOpen={setModalOpen} />
    </div>
  );
};

export default ContactPage;