import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import Pharmacy from './pages/Pharmacy';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrdersPage from './pages/OrdersPage';

// Insurance Module
import InsurancePage from './pages/InsurancePage';
import InsuranceDetails from './pages/InsuranceDetails';
import InsuranceForm from './pages/InsuranceForm';

import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import AppointmentPage from './pages/AppointmentPage';
import OrderMedicinesPage from './pages/OrderMedicinesPage';
import NotFoundPage from './pages/NotFoundPage';
import AOS from 'aos';
import './styles/global.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#contact-section') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          const offset = 80;
          const elementPosition = contactSection.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="app">
      <Navbar />
      
      <main>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage setModalOpen={setModalOpen} />} />
          <Route path="/appointment" element={<AppointmentPage setModalOpen={setModalOpen} />} />
          
          {/* Pharmacy Module Routes */}
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Insurance Module Routes - THESE MUST MATCH your navigation */}
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/insurance-details/:id" element={<InsuranceDetails />} />
          <Route path="/insurance-form" element={<InsuranceForm />} />
          
          {/* Order Pages */}
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order-medicines" element={<OrderMedicinesPage />} />
          
          {/* 404 Page - This must be LAST */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      {/* Contact Section - Global, appears on all pages */}
      <ContactSection />
      
      <Footer />
      
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <button
        className="fab"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <OrderProvider>
          <ScrollToTop />
          <AppContent />
        </OrderProvider>
      </CartProvider>
    </Router>
  );
}

export default App;