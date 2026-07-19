import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export const ElectionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reminderSet, setReminderSet] = useState(false);

  const handleReminder = () => {
    setReminderSet(true);
    setTimeout(() => {
      setReminderSet(false);
    }, 3000);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* TopNavBar */}
      <header className="bg-surface border-b border-outline-variant fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-[1440px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>VOTEKINETIC</div>
          <nav className="hidden md:flex items-center gap-stack-lg">
            <Link to="/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/voter/elections" className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1">Ballots</Link>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Results</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Resources</a>
          </nav>
          <div className="flex items-center gap-stack-md">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-stack-lg px-margin-desktop max-w-[1200px] mx-auto">
        {/* Status Banner */}
        <div className="mb-stack-lg bg-surface-container-low border border-outline-variant rounded-xl p-stack-md flex items-center gap-4">
          <div className="bg-primary text-on-primary rounded-full p-2 flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock_clock</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-primary font-bold">VOTING ACTIVE PERIOD</p>
            <p className="font-body-md text-body-md text-on-surface-variant">This election is active and secure transmission channels are ready.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Left Column: Primary Details */}
          <div className="md:col-span-7 flex flex-col gap-stack-lg">
            <section>
              <h1 className="font-headline-lg text-headline-lg text-primary mb-2">2024 Institutional Governance Restructuring</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                A comprehensive proposal to modernize the institutional voting protocols and board member selection processes. This vote will determine the constitutional amendments for the fiscal years 2025-2030, impacting over 45,000 eligible institutional participants.
              </p>
            </section>
            
            <div className="h-[1px] bg-outline-variant w-full"></div>
            
            <section className="bg-surface-container-lowest border border-outline-variant p-stack-lg rounded-xl">
              <h2 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-4">Governing Body Details</h2>
              <div className="flex items-center gap-4 mb-stack-md">
                <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant overflow-hidden">
                  <img className="w-full h-full object-contain p-2" alt="Governing Body Details Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1CPcmGieWSkGPqhKtKvZSxQYYtbG7NaRe9-uMBYPoRmAyz9ceSAwKW8bSEjx5UGA9cWC5rFwk81Ia0N3YeP1ktFPt2lDsAciT1-oYLH_c2vQFZmjLcdLc1eHTI4GXraoSpoqYA8RbUB4hHP6qsG2N53ekr-YXROBE337ZaVyFa6JDWT1Vw02TwkfdXussMn8l6bsQaQ4JJQ0zkVwq1FeUzdSEnOa-MzVMMRXg_Yj1a6-81L429bL2og" />
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-on-surface">Global Standards Commission</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">Certified Authority ID: GSC-2024-VOTE</p>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                The Global Standards Commission (GSC) is the primary oversight body for this election. All procedures are audited by the independent Election Integrity Bureau (EIB) to ensure 100% compliance with state-grade encryption mandates.
              </p>
            </section>
            
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
              <div className="p-stack-md border border-outline-variant rounded-xl">
                <span className="material-symbols-outlined text-secondary mb-2">security</span>
                <h3 className="font-label-md text-label-md font-bold mb-1">Encrypted Identity</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Your identity is cryptographically hashed. Your choices remain private.</p>
              </div>
              <div className="p-stack-md border border-outline-variant rounded-xl">
                <span className="material-symbols-outlined text-secondary mb-2">verified_user</span>
                <h3 className="font-label-md text-label-md font-bold mb-1">Audit Trail</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Every vote generates a unique transaction hash for public verification.</p>
              </div>
            </section>
          </div>
          
          {/* Right Column: Context & Actions */}
          <div className="md:col-span-5 flex flex-col gap-stack-lg">
            {/* Voting Period Card */}
            <div className="bg-white border-2 border-primary rounded-xl p-stack-lg shadow-sm">
              <h2 className="font-label-md text-label-md text-primary font-bold mb-4 uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">calendar_today</span>
                Voting Period
              </h2>
              <div className="flex flex-col gap-stack-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Starts</p>
                    <p className="font-headline-md text-headline-md">Oct 15, 2024</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">08:00 AM UTC</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Ends</p>
                    <p className="font-headline-md text-headline-md">Oct 30, 2024</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">11:59 PM UTC</p>
                  </div>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 mt-2">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="font-label-sm text-label-sm text-center text-on-surface-variant">Ends in: 4 Hours</p>
              </div>
              <div className="mt-stack-lg flex flex-col gap-stack-sm">
                <button 
                  className="w-full h-12 bg-primary text-white hover:bg-primary-container transition-all font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                  onClick={() => navigate(`/voter/ballot/${id}`)}
                >
                  <span className="material-symbols-outlined">how_to_vote</span>
                  Enter Digital Ballot
                </button>
                <button 
                  className={`w-full h-12 border-2 transition-all font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 ${reminderSet ? 'bg-secondary text-white border-secondary' : 'border-secondary text-secondary hover:bg-secondary-fixed'}`}
                  onClick={handleReminder}
                >
                  <span className="material-symbols-outlined">{reminderSet ? 'done' : 'notifications_active'}</span>
                  {reminderSet ? 'Reminder Set' : 'Set Calendar Reminder'}
                </button>
              </div>
            </div>

            {/* Eligibility Card */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-stack-lg">
              <h2 className="font-label-md text-label-md text-primary font-bold mb-4 uppercase">Eligibility Requirements</h2>
              <ul className="flex flex-col gap-stack-md">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <p className="font-label-md text-label-md">Tier 1 Institutional Access</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Verified on Sep 20, 2024</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <p className="font-label-md text-label-md">Active Account Standing</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Account must be in good standing.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <p className="font-label-md text-label-md">Multi-Factor Completion</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Completed.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Documentation */}
            <div className="p-stack-md border border-outline-variant rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">description</span>
                <p className="font-label-md text-label-md">Download Full Proposal (PDF)</p>
              </div>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md w-full max-w-[1440px] mx-auto">
          <div className="mb-4 md:mb-0">
            <p className="font-label-md text-label-md font-bold text-on-surface mb-1">VOTEKINETIC</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant max-w-[400px]">
              © 2024 VOTEKINETIC Institutional Voting Systems. All rights reserved. State-grade encryption active.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Compliance</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
