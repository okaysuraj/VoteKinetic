import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Dashboard from './pages/Dashboard';
import CollectionsPage from './pages/CollectionsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ManifestoPage from './pages/ManifestoPage';
import BulletinBoardPage from './pages/BulletinBoardPage';
import Elections from './pages/Elections';
import ElectionDetail from './pages/ElectionDetail';
import VotePage from './pages/VotePage';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/bulletin/:electionId" element={<BulletinBoardPage />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/elections/:id" element={<ElectionDetail />} />
        <Route path="/elections/:id/vote" element={<VotePage />} />
        <Route path="/elections/:id/results" element={<Results />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="logo headline-md" style={{ fontSize: '24px', letterSpacing: '-0.02em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.svg" alt="Vote Kinetic Logo" style={{ width: '32px', height: '32px' }} />
            Vote Kinetic
          </div>
          <div className="footer-links label-caps">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/manifesto">Manifesto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
