import React from 'react';
import { useNavigate } from 'react-router-dom';

export const VerificationStatus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased">
      {/* TopNavBar */}
      <header className="bg-surface dark:bg-inverse-surface w-full top-0 sticky border-b border-outline-variant dark:border-outline flat no shadows z-50">
        <div className="max-w-[1440px] mx-auto px-margin-desktop flex justify-between items-center h-16">
          <div className="flex items-center gap-stack-md">
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed cursor-pointer" onClick={() => navigate('/')}>VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-stack-md">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-on-tertiary-container cursor-pointer hover:text-primary transition-colors">settings</span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex justify-center py-stack-lg px-margin-desktop">
        <div className="w-full max-w-container-max flex flex-col gap-stack-lg">
          {/* Verification Status Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg flex flex-col items-center text-center gap-stack-md relative overflow-hidden mt-8 shadow-sm">
            
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-fixed opacity-10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
            
            <div className="w-24 h-24 rounded-full bg-primary-fixed flex items-center justify-center mb-stack-sm relative shadow-[0_8px_24px_rgba(17,92,185,0.15)]">
              <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-surface-container-lowest rounded-full border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
              </div>
            </div>
            
            <h1 className="font-headline-lg text-headline-lg text-primary">Fully Verified</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Voter identity has been authenticated against state registries. Liveness checks passed.</p>
            
            <div className="bg-surface-container-low border border-outline-variant rounded-full px-stack-md py-unit flex items-center gap-stack-sm mt-stack-sm">
              <span className="material-symbols-outlined text-[18px] text-secondary">shield</span>
              <span className="font-label-md text-label-md text-on-surface">Level 3 Trust Indicator</span>
            </div>
          </div>

          {/* Milestones Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Milestone 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-stack-sm relative group hover:border-secondary transition-colors duration-200">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>id_card</span>
                </div>
                <span className="material-symbols-outlined text-[24px] text-secondary">check_circle</span>
              </div>
              <div className="mt-stack-sm">
                <h3 className="font-label-md text-label-md text-on-surface">Identity Document</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">State ID Validated</p>
              </div>
              <div className="mt-auto pt-stack-sm">
                <div className="w-full h-20 bg-surface-variant rounded flex items-center justify-center border border-outline-variant overflow-hidden relative">
                  <img alt="Document Preview" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFLgYlzINqytt7e6Et-4rcfZ8rCU2_VHLrVP57p43N0LzlhStOz1mACeUHNOhqmtm2tXKi9Y8TUcPcdhQx_8b0QxqeI8pD_pfxou_RZ12AttPNiLVjMXceqcs6KxYNFEdih8-RpLgMZSy9HO12ZvW4BaQBQewZoF0EsjOM4FF7ceUDdbY7LMWRwMK_r7UkRGgNJ9ZK2nt4MliBamCZYGDVkX5-go6ZYbj3vrMNc311I_HHJhaHNJw9eQ" />
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-container/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-on-surface">visibility</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-stack-sm relative group hover:border-secondary transition-colors duration-200">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
                </div>
                <span className="material-symbols-outlined text-[24px] text-secondary">check_circle</span>
              </div>
              <div className="mt-stack-sm">
                <h3 className="font-label-md text-label-md text-on-surface">Liveness Check</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Biometric Match confirmed</p>
              </div>
              <div className="mt-auto pt-stack-sm">
                <div className="w-full h-20 bg-surface-variant rounded flex items-center justify-center border border-outline-variant overflow-hidden relative">
                  <img alt="Liveness Preview" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9D6NYTqjShORJJVaXSxhqr6r1E8XfeSbbjcWPGHxLBGFenlGN1JTD8SscdAq6xprFxDz3H8nVEXcNe7wgynipbPnTB1xlnFEPzYOMBIl5dsT7GupeePQwmwK8o2masPXmjE3ms7imBioIwO3ZTy9KJtw4ATkVfbZgLBterAQWV_hoVtl_pw8uf9fSrrXsk2qdDre0S_OzaazPQvo7HMmHbhCC_xfjJ1d-F-K5UqVGOiwNthb9M2Atkw" />
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-container/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-on-surface">visibility</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-stack-sm relative group hover:border-secondary transition-colors duration-200">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>home_pin</span>
                </div>
                <span className="material-symbols-outlined text-[24px] text-secondary">check_circle</span>
              </div>
              <div className="mt-stack-sm">
                <h3 className="font-label-md text-label-md text-on-surface">Address Verification</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Cross-referenced registry</p>
              </div>
              <div className="mt-auto pt-stack-sm">
                <div className="w-full h-20 bg-surface-variant rounded flex items-center justify-center border border-outline-variant overflow-hidden relative">
                  <img alt="Address Preview" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPYRS2jb0j3ddPCusy3BFZl3eAzF7DRmHBeElOHWTTT7tBt1Y4qqh_6QoOI3beeo0yuVdQw0OS_GuCJRmY6sBDnjMSuE-aoCpqMN3IdpTHJ2MCfDezXARervwjiKUS4IKsKX2PXgA_m9yARxFqEbtqvSFNpgJlTQWMu_14mg5PRoD5rk10Jt0LV1zw4KmA4B_s3GeHamGGdk4v3FdvsVU9nNiY4iBfnZ2-6Wus38m1WIy5uZxCYVWTJQ" />
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-container/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-on-surface">visibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex justify-end pt-stack-sm border-t border-outline-variant mt-stack-md">
            <button 
              className="bg-primary text-on-primary font-label-md text-label-md h-12 px-8 rounded flex items-center justify-center hover:bg-on-secondary-container transition-colors shadow-sm focus:outline-none"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest dark:bg-inverse-surface w-full mt-auto border-t border-outline-variant dark:border-outline flat no shadows">
        <div className="max-w-[1440px] mx-auto px-margin-desktop py-stack-md flex justify-between items-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container">© 2024 VOTEKINETIC Secure Systems. All rights reserved. Data Retention Policy Active.</span>
          <div className="flex gap-stack-md">
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed opacity-80 hover:opacity-100 transition-opacity" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed opacity-80 hover:opacity-100 transition-opacity" href="#">Legal Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
