import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const SystemMaintenance: React.FC = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [fade, setFade] = useState(true);
  
  const statusTexts = [
    "Optimizing query performance...",
    "Running cryptographic audits...",
    "Securing node connections...",
    "Finalizing system health check..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setStatusIndex((prev) => (prev + 1) % statusTexts.length);
        setFade(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-on-surface font-body-md bg-surface">
      {/* TopNavBar */}
      <nav className="bg-surface border-b border-outline-variant w-full fixed top-0 z-50">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary">VOTEKINETIC</div>
          <div className="hidden md:flex gap-8">
            <Link to="/dashboard" className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200">Dashboard</Link>
            <Link to="/ballots" className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200">Ballots</Link>
            <Link to="/results" className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200">Results</Link>
            <Link to="/resources" className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200">Resources</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 transition-opacity">notifications</span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 transition-opacity">help_outline</span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 transition-opacity">account_circle</span>
          </div>
        </div>
      </nav>

      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-stack-lg px-margin-mobile relative overflow-hidden">
        {/* Background Image Cluster (Blurred Server Room) */}
        <div className="absolute inset-0 z-0 opacity-10 blur-sm pointer-events-none">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCD3mhzTCGCuRZMajl8YWybRZi0X00x80TT3HoU1x13C_uvEv1e-U2Q1UE3GfvGzexm-BaMICWqJof8fhuc-Arl8nJ2c0UdMX2yaVU7IOYpXglBzam83NdIlBCYmw2xqJrmGsDguOEjJPV6FtHYAtdVIRVBwJgHgGHBOKlYXGxOVO2qFUEPizU3dCA98-KMu_J2iC6JW6FDkVejs5uUbdVkksU_Xb21tn1yrgT5jX_hdhfcXb4BmJFNqw')" }}></div>
        </div>
        
        <div className="w-full max-w-[800px] z-10 flex flex-col items-center">
          {/* Hero Icon */}
          <div className="mb-stack-md relative">
            <div className="w-24 h-24 rounded-full bg-secondary-container/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <span className="material-symbols-outlined text-[64px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-surface-bright rounded-full p-1 border border-outline-variant">
              <span className="material-symbols-outlined text-error text-[20px]">build</span>
            </div>
          </div>
          
          {/* Heading */}
          <h1 className="font-headline-lg text-headline-lg text-center text-primary mb-stack-sm">Scheduled Maintenance</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-[500px] mb-stack-md">
            We are performing essential security upgrades to our voting infrastructure to ensure your democratic participation remains secure and transparent.
          </p>
          
          {/* Time Banner */}
          <div className="w-full bg-primary-container text-on-primary-fixed rounded-xl py-4 px-gutter flex items-center justify-between mb-stack-lg border border-primary">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">schedule</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Estimated Return</span>
            </div>
            <div className="font-headline-md text-headline-md text-secondary-fixed">14:00 GMT+1</div>
          </div>
          
          {/* Status Bento Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-gutter mb-stack-lg">
            {/* Database Status */}
            <div className="bg-white/90 backdrop-blur-md p-stack-md rounded-xl border border-outline-variant flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Subsystem</span>
                  <span className="font-headline-md text-headline-md text-primary">Database</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-headline-md">storage</span>
              </div>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-3/4 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
                <span className={`font-label-sm text-label-sm text-on-surface-variant transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                  {statusTexts[statusIndex]}
                </span>
              </div>
            </div>
            
            {/* Blockchain Status */}
            <div className="bg-white/90 backdrop-blur-md p-stack-md rounded-xl border border-outline-variant flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Subsystem</span>
                  <span className="font-headline-md text-headline-md text-primary">Blockchain</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-headline-md">link</span>
              </div>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/2 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
                <span className={`font-label-sm text-label-sm text-on-surface-variant transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                  {statusTexts[(statusIndex + 1) % statusTexts.length]}
                </span>
              </div>
            </div>
          </div>
          
          {/* Encryption Assurance */}
          <div className="flex items-center gap-3 py-3 px-6 bg-surface-container-low rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <p className="font-label-md text-label-md text-on-surface-variant">Active end-to-end encryption remains unaffected.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-tertiary w-full mt-auto">
        <div className="w-full py-stack-lg px-gutter max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start gap-gutter">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="text-label-md font-label-md font-bold text-surface-bright">VOTEKINETIC</div>
            <p className="text-on-tertiary-container font-body-md text-body-md">
              © 2024 VOTEKINETIC Secure Voting Systems. All rights reserved. State-grade encryption active.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3">
            <a className="text-on-tertiary-container font-label-sm text-label-sm hover:text-surface-bright transition-colors duration-150" href="#">Security Protocol</a>
            <a className="text-on-tertiary-container font-label-sm text-label-sm hover:text-surface-bright transition-colors duration-150" href="#">Privacy Policy</a>
            <a className="text-on-tertiary-container font-label-sm text-label-sm hover:text-surface-bright transition-colors duration-150" href="#">Accessibility Statement</a>
            <a className="text-on-tertiary-container font-label-sm text-label-sm hover:text-surface-bright transition-colors duration-150" href="#">Terms of Service</a>
            <a className="text-on-tertiary-container font-label-sm text-label-sm hover:text-surface-bright transition-colors duration-150" href="#">Verify Identity</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
