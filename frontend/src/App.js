import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar'; 

// Import Pages
import MensSection from './pages/MensSection';
import WomensSection from './pages/WomensSection';
import FragrancesSection from './pages/FragrancesSection';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// We use an inner component here so we can access the 'useLocation' hook
const AppContent = () => {
  const location = useLocation();
  
  // Check if the current URL is either the login page or the dashboard
  const hideNavbar = location.pathname === '/admin-login' || location.pathname === '/admin';

  return (
    <>
      {/* The Navbar will render on every page EXCEPT the admin routes */}
      {!hideNavbar && <Navbar />}

      {/* React Router handles switching between your pages */}
      <Routes>
        {/* Main Storefront Routes */}
        {/* Automatically redirect the home page to the Womens section */}
        <Route path="/" element={<Navigate to="/womens" replace />} />
        
        <Route path="/mens" element={<MensSection />} />
        <Route path="/womens" element={<WomensSection />} />
        <Route path="/fragrances" element={<FragrancesSection />} />

        {/* Administrative Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;