import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MensSection from './pages/MensSection';
import WomensSection from './pages/WomensSection';
import FragrancesSection from './pages/FragrancesSection';
import AdminDashboard from './pages/AdminDashboard'; // This was the missing line!

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MensSection />} />
        <Route path="/mens" element={<MensSection />} />
        <Route path="/womens" element={<WomensSection />} />
        <Route path="/fragrances" element={<FragrancesSection />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;