import React from 'react';
import { Link } from 'react-router-dom';

export const AccessDenied: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md">
      {/* TopNavBar */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-[800px] mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary">
            VOTEKINETIC
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-label-md font-label-md">Dashboard</Link>
            <Link to="/ballots" className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-label-md font-label-md">Ballots</Link>
            <Link to="/results" className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-label-md font-label-md">Results</Link>
            <Link to="/resources" className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-label-md font-label-md">Resources</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">help_outline</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">account_circle</button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center py-stack-lg px-margin-mobile relative overflow-hidden">
        {/* Subtle Institutional Background Detail */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(186, 26, 26, 0.05) 50%, transparent 100%)',
            backgroundSize: '100% 4px'
          }}
        ></div>
        
        <div className="w-full max-w-[800px] bg-surface-container-lowest border border-outline-variant rounded-lg p-10 flex flex-col items-center text-center relative z-10 shadow-sm">
          {/* Lock Icon with Warning Badge */}
          <div className="relative mb-stack-lg group">
            <div className="w-24 h-24 bg-error-container rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-error text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-error text-on-error rounded-full flex items-center justify-center border-4 border-surface-container-lowest">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          
          {/* Authoritative Heading */}
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">Access Denied</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg mb-stack-lg">
            Your credentials do not have the required permissions to access this secure terminal. This event has been logged for security audit purposes.
          </p>
          
          {/* Technical Detail Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-gutter text-left border-y border-outline-variant py-stack-md mb-stack-lg">
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Encrypted Terminal ID</span>
              <code className="text-body-md font-mono bg-surface-container-low px-2 py-1 rounded text-primary">VK-9942-X8A-SEC</code>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Attempt Timestamp</span>
              <span className="text-body-md font-body-md text-on-surface">{new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC</span>
            </div>
          </div>
          
          {/* Action Cluster */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Link to="/dashboard" className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors min-h-[48px] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Return to Dashboard
            </Link>
            <button className="border border-primary text-primary px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-primary-fixed-dim transition-colors min-h-[48px] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
              Verify Credentials
            </button>
          </div>
          
          {/* Security Protocol Reference */}
          <div className="mt-stack-lg flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">security</span>
            <span className="text-label-sm font-label-sm">Security Protocol: SEC-PRO-V3.4-ENCRYPTED</span>
          </div>
        </div>
        
        {/* Decorative Security Pattern */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
          <span className="material-symbols-outlined text-[256px]">shield_person</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-tertiary text-on-tertiary mt-auto">
        <div className="w-full py-stack-lg px-gutter max-w-[800px] mx-auto flex flex-col md:flex-row justify-between items-start gap-gutter">
          <div className="flex flex-col gap-4">
            <div className="text-label-md font-label-md font-bold text-surface-bright">VOTEKINETIC</div>
            <p className="text-body-md font-body-md text-on-tertiary-container max-w-sm">
              © 2024 VOTEKINETIC Secure Voting Systems. All rights reserved. State-grade encryption active.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            <a className="text-on-tertiary-container hover:text-surface-bright transition-colors duration-150 text-label-sm font-label-sm" href="#">Security Protocol</a>
            <a className="text-on-tertiary-container hover:text-surface-bright transition-colors duration-150 text-label-sm font-label-sm" href="#">Privacy Policy</a>
            <a className="text-on-tertiary-container hover:text-surface-bright transition-colors duration-150 text-label-sm font-label-sm" href="#">Accessibility Statement</a>
            <a className="text-on-tertiary-container hover:text-surface-bright transition-colors duration-150 text-label-sm font-label-sm" href="#">Terms of Service</a>
            <a className="text-on-tertiary-container hover:text-surface-bright transition-colors duration-150 text-label-sm font-label-sm" href="#">Verify Identity</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
