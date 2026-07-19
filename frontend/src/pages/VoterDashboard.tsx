import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export const VoterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [identityStrength, setIdentityStrength] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIdentityStrength(98);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-on-surface">
      {/* TopAppBar */}
      <header className="bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline sticky top-0 z-50">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary dark:text-primary-fixed cursor-pointer" onClick={() => navigate('/')}>VOTEKINETIC</div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/dashboard" className="text-secondary dark:text-secondary-fixed border-b-2 border-secondary dark:border-secondary-fixed pb-1 font-label-md text-label-md transition-opacity duration-200">Dashboard</Link>
            <Link to="/voter/elections" className="text-on-surface-variant dark:text-on-tertiary-container hover:text-primary dark:hover:text-primary-fixed font-label-md text-label-md transition-colors duration-200">Ballots</Link>
            <a className="text-on-surface-variant dark:text-on-tertiary-container hover:text-primary dark:hover:text-primary-fixed font-label-md text-label-md transition-colors duration-200" href="#">Results</a>
            <a className="text-on-surface-variant dark:text-on-tertiary-container hover:text-primary dark:hover:text-primary-fixed font-label-md text-label-md transition-colors duration-200" href="#">Resources</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">help_outline</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">account_circle</button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="max-w-container-max mx-auto px-gutter py-stack-lg min-h-screen">
        {/* Welcome & Hero Status Banner */}
        <section className="mb-stack-lg">
          <div className="relative overflow-hidden rounded-xl h-64 bg-primary-container text-white flex flex-col justify-end p-8 border border-outline-variant/30">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBsjorqPY0mzSsK36r1T4sxT4oCiHPmh2y-nwzJL7RDL9n9y4e_VbgStu_lySVhAkACqr90ohSzbROjhlkRBt9p5XvCg3W0qKFmCRggW935zp2m67XLbBIxs1ELaPJ4R5BQKzL9w4KXevpkcHBsrk8BkQz4u4N_VOpmQm7o37Zq2qVGdEXLOTnIDIqKzAsJcWYJddpKF-4CDCXYC33VDTq_IKZX8e-aJdlzGRmsVVbBggXkfReZSeIPQ')" }}></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary-fixed">Security Protection Layer Active</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg mb-1 text-surface-bright">Welcome back, Citizen</h1>
              <p className="font-body-md text-body-md text-on-primary-container max-w-md">Your identity is secured by state-grade encryption. All sessions are monitored for integrity.</p>
            </div>
            {/* Subtle Animation Decor */}
            <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none overflow-hidden">
              <div className="security-scan-line"></div>
            </div>
          </div>
        </section>

        {/* Status Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mb-stack-lg">
          {/* Eligibility Status */}
          <div className="bg-white border border-outline-variant p-6 rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="font-label-md text-label-md text-on-surface-variant mb-4">Current Eligibility Status</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-label-md">VERIFIED</span>
                  <p className="font-body-md text-body-md mt-1 text-on-surface">Registered Voter: District 04</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-outline-variant">
              <button className="text-secondary font-label-md text-label-md flex items-center gap-2 hover:underline">
                View Credentials <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
          
          {/* Identity Strength */}
          <div className="bg-white border border-outline-variant p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-label-md text-label-md text-on-surface-variant">Identity Strength</h3>
              <span className="text-primary font-bold font-label-md text-label-md">{identityStrength}% Secure</span>
            </div>
            <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${identityStrength}%` }}></div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Multi-factor authentication and biometric validation are fully active for your profile.</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-label-sm text-secondary">
                <span className="material-symbols-outlined text-[16px]">lock</span> MFA
              </div>
              <div className="flex items-center gap-1 text-label-sm text-secondary">
                <span className="material-symbols-outlined text-[16px]">fingerprint</span> Biometric
              </div>
              <div className="flex items-center gap-1 text-label-sm text-secondary">
                <span className="material-symbols-outlined text-[16px]">key</span> HSM
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg">
          {/* Upcoming Elections (Main column) */}
          <div className="md:col-span-7">
            <h2 className="font-headline-md text-headline-md mb-stack-md flex items-center gap-3">
              Upcoming Elections
              <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            </h2>
            <div className="space-y-4">
              {/* Election Card */}
              <div className="bg-white border-2 border-primary rounded-lg p-6 shadow-sm relative overflow-hidden group hover:-translate-y-[2px] transition-transform duration-200">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-error font-label-md text-label-sm uppercase tracking-tighter">Live Selection Period</span>
                    <h4 className="font-headline-md text-headline-md text-primary mt-1">Presidential Primary 2024</h4>
                    <div className="flex items-center gap-4 mt-2 text-on-surface-variant font-label-md text-label-sm">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> Ends Dec 12, 2024</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> National</span>
                    </div>
                  </div>
                  <div className="bg-primary-fixed p-3 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-[32px]">ballot</span>
                  </div>
                </div>
                <div className="mt-8">
                  <button 
                    className="bg-primary text-white w-full py-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-md active:scale-[0.98]"
                    onClick={() => navigate('/voter/elections/1')}
                  >
                    Open Digital Ballot <span className="material-symbols-outlined">launch</span>
                  </button>
                </div>
              </div>

              {/* Secondary Election */}
              <div 
                className="bg-surface-container-low border border-outline-variant rounded-lg p-6 group hover:border-primary transition-colors cursor-pointer hover:-translate-y-[2px] duration-200"
                onClick={() => navigate('/voter/elections/2')}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">Municipal Bond Referendum</h4>
                    <p className="text-label-sm text-on-surface-variant mt-1">Opens Jan 15, 2025 • Local District 04</p>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity (Sidebar column) */}
          <div className="md:col-span-5">
            <h2 className="font-headline-md text-headline-md mb-stack-md">Security Audit Log</h2>
            <div className="bg-white border border-outline-variant rounded-lg overflow-hidden">
              <div className="p-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
                <span className="text-label-sm font-label-md text-on-surface-variant">Last 5 Validation Events</span>
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">history</span>
              </div>
              <ul className="divide-y divide-outline-variant">
                <li className="p-4 hover:bg-surface-container-lowest transition-colors">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px]">shield_person</span>
                    <div>
                      <p className="text-label-md font-label-md text-on-surface">Biometric Re-authentication</p>
                      <p className="text-label-sm text-on-surface-variant">Success • Today, 09:12 AM</p>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-surface-container-lowest transition-colors">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px]">key_visualizer</span>
                    <div>
                      <p className="text-label-md font-label-md text-on-surface">Credential Integrity Check</p>
                      <p className="text-label-sm text-on-surface-variant">Validated • Dec 10, 2024</p>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-surface-container-lowest transition-colors">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-error text-[20px]">login</span>
                    <div>
                      <p className="text-label-md font-label-md text-on-surface">New Session (Desktop/OSX)</p>
                      <p className="text-label-sm text-on-surface-variant">Alert • Dec 09, 2024</p>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-surface-container-lowest transition-colors">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary text-[20px]">how_to_reg</span>
                    <div>
                      <p className="text-label-md font-label-md text-on-surface">Registry Status Synced</p>
                      <p className="text-label-sm text-on-surface-variant">Automated • Dec 05, 2024</p>
                    </div>
                  </div>
                </li>
              </ul>
              <a className="block w-full text-center py-3 text-label-sm font-label-md text-secondary border-t border-outline-variant hover:bg-surface-container-low transition-colors" href="#">
                View Full Security Audit
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-tertiary dark:bg-tertiary-container w-full py-stack-lg px-gutter mt-stack-lg">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start gap-gutter">
          <div className="flex flex-col gap-4">
            <div className="text-label-md font-label-md font-bold text-surface-bright">VOTEKINETIC</div>
            <p className="text-body-md font-body-md text-on-tertiary-container dark:text-tertiary-fixed-dim max-w-sm">
              © 2024 VOTEKINETIC Secure Voting Systems. All rights reserved. State-grade encryption active.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            <a className="text-on-tertiary-container dark:text-tertiary-fixed-dim hover:text-surface-bright font-label-sm text-label-sm transition-colors duration-150" href="#">Security Protocol</a>
            <a className="text-on-tertiary-container dark:text-tertiary-fixed-dim hover:text-surface-bright font-label-sm text-label-sm transition-colors duration-150" href="#">Privacy Policy</a>
            <a className="text-on-tertiary-container dark:text-tertiary-fixed-dim hover:text-surface-bright font-label-sm text-label-sm transition-colors duration-150" href="#">Accessibility Statement</a>
            <a className="text-on-tertiary-container dark:text-tertiary-fixed-dim hover:text-surface-bright font-label-sm text-label-sm transition-colors duration-150" href="#">Terms of Service</a>
            <a className="text-surface-bright underline font-label-sm text-label-sm transition-colors duration-150" href="#">Verify Identity</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
