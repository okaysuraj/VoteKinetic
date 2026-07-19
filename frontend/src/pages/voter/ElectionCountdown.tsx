import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ElectionCountdown = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: '03', hours: '14', minutes: '45' });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Static end date: 3 days, 14 hours, 45 minutes from "now" for demonstration
    const now = new Date().getTime();
    const electionDate = now + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (45 * 60 * 1000);
    
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = electionDate - currentTime;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0')
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
            <span className="font-headline-md text-primary font-bold tracking-tight hidden md:block">VOTEKINETIC Voter</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest hidden md:block">Citizen Portal</span>
            <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto w-full px-4 py-12 flex-grow flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-outline-variant text-on-surface-variant mb-6 bg-surface shadow-sm">
            <span className="material-symbols-outlined text-[18px]">lock_clock</span>
            <span className="text-xs font-bold uppercase tracking-widest">Election Scheduled</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">2024 National General Assembly</h2>
          <p className="text-sm md:text-base text-on-surface-variant max-w-md mx-auto leading-relaxed">
            The digital polling stations are being prepared for a secure, encrypted voting window.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full mb-12" id="countdown">
          <div className="flex flex-col items-center justify-center py-8 md:py-12 bg-surface border border-outline-variant rounded-2xl shadow-sm">
            <span className="text-5xl md:text-7xl font-bold text-primary leading-none tracking-tight">{timeLeft.days}</span>
            <span className="text-xs font-bold text-on-surface-variant mt-3 uppercase tracking-wider">Days</span>
          </div>
          <div className="flex flex-col items-center justify-center py-8 md:py-12 bg-surface border border-outline-variant rounded-2xl shadow-sm">
            <span className="text-5xl md:text-7xl font-bold text-primary leading-none tracking-tight">{timeLeft.hours}</span>
            <span className="text-xs font-bold text-on-surface-variant mt-3 uppercase tracking-wider">Hours</span>
          </div>
          <div className="flex flex-col items-center justify-center py-8 md:py-12 bg-surface border border-outline-variant rounded-2xl shadow-sm">
            <span className="text-5xl md:text-7xl font-bold text-primary leading-none tracking-tight">{timeLeft.minutes}</span>
            <span className="text-xs font-bold text-on-surface-variant mt-3 uppercase tracking-wider">Minutes</span>
          </div>
        </div>

        {/* Notification & Summary Card */}
        <div className="w-full bg-surface border border-outline-variant rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex items-center justify-between mb-8 border-b border-outline-variant pb-6">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-primary text-lg">Status Notifications</span>
              <span className="text-sm text-on-surface-variant">Get notified via email when voting opens.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
              />
              <div className="w-14 h-7 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-bold text-sm text-primary uppercase tracking-wider">What to expect</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary">verified_user</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface mb-1 text-sm">Secure Authentication</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Multi-factor ID verification required to access your digital ballot.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary">history_edu</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface mb-1 text-sm">Immutable Records</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Your vote is cryptographically hashed and stored on a private ledger.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary">visibility_off</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface mb-1 text-sm">Total Anonymity</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Personal identification is decoupled from your vote selection.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary">receipt_long</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface mb-1 text-sm">Digital Receipt</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Receive a verifiable transaction ID to confirm your vote was counted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-on-surface-variant opacity-80 border-t border-outline-variant w-full pt-8 justify-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>encrypted</span>
            <span className="text-xs font-bold uppercase tracking-wider">256-bit AES Encryption</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 bg-outline-variant rounded-full"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">public</span>
            <span className="text-xs font-bold uppercase tracking-wider">International Standard ISO/IEC 27001</span>
          </div>
        </div>

      </main>
    </div>
  );
};
