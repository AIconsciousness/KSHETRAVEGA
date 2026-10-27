import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import CancellationRefundPolicy from './pages/legal/CancellationRefundPolicy';
import ShippingDeliveryPolicy from './pages/legal/ShippingDeliveryPolicy';
import ContactUs from './pages/legal/ContactUs';
import LegalCompliance from './pages/legal/LegalCompliance';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsent from './components/CookieConsent';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { initCookieConsent } from './services/cookieService';
import { handleRouteFallback, checkRouteAccessibility } from './utils/routeFallback';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize cookie consent system when app loads
    initCookieConsent();
    
    // Handle route fallback for legal pages
    handleRouteFallback();
    
    // Check route accessibility
    if (checkRouteAccessibility()) {
      console.log('Legal page route detected, ensuring proper navigation');
    }
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/cancellation-refund" element={<CancellationRefundPolicy />} />
            <Route path="/shipping-delivery" element={<ShippingDeliveryPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/legal-compliance" element={<LegalCompliance />} />
          </Routes>
          <CookieConsent companyName="Kshetravega" position="bottom" />
          <PWAInstallPrompt />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
