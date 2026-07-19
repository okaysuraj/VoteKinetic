import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const OrgSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'identity' | 'security' | 'regional' | 'compliance'>('identity');

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-[1440px] mx-auto">
          <Link to="/admin" className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</Link>
          <nav className="hidden md:flex items-center space-x-gutter">
            <Link to="/admin/members" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Organizations</Link>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Tenants</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Billing</a>
            <a className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1 transition-colors" href="#">Global Settings</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Shell */}
      <main className="flex-grow flex flex-col md:flex-row w-full max-w-[1440px] mx-auto px-gutter py-stack-lg gap-gutter">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex flex-col gap-unit">
          <h2 className="font-label-sm text-label-sm uppercase tracking-wider text-outline px-2 mb-2">Settings Menu</h2>
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${activeTab === 'identity' ? 'text-secondary font-bold bg-surface-container-low' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
            onClick={() => setActiveTab('identity')}
          >
            <span className="material-symbols-outlined">corporate_fare</span>
            <span className="font-label-md text-label-md">Organization Identity</span>
          </button>
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${activeTab === 'security' ? 'text-secondary font-bold bg-surface-container-low' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
            onClick={() => setActiveTab('security')}
          >
            <span className="material-symbols-outlined">security</span>
            <span className="font-label-md text-label-md">Security Protocols</span>
          </button>
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${activeTab === 'regional' ? 'text-secondary font-bold bg-surface-container-low' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
            onClick={() => setActiveTab('regional')}
          >
            <span className="material-symbols-outlined">language</span>
            <span className="font-label-md text-label-md">Regional Preferences</span>
          </button>
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${activeTab === 'compliance' ? 'text-secondary font-bold bg-surface-container-low' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
            onClick={() => setActiveTab('compliance')}
          >
            <span className="material-symbols-outlined">gavel</span>
            <span className="font-label-md text-label-md">Audit &amp; Compliance</span>
          </button>
        </aside>

        {/* Configuration Canvas */}
        <div className="flex-grow max-w-[800px] mx-auto md:mx-0">
          {/* Section: Organization Identity */}
          {activeTab === 'identity' && (
            <section className="space-y-stack-lg">
              <header className="mb-stack-md">
                <h1 className="font-headline-lg text-headline-lg text-primary">Organization Identity</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Manage your institution's public-facing information and core identifiers used across the voting network.</p>
              </header>
              <div className="settings-card p-gutter bg-surface rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface">Legal Entity Name</label>
                    <input className="border border-outline-variant px-4 py-3 rounded focus:outline-none focus:border-secondary font-body-md text-body-md bg-transparent" type="text" defaultValue="VOTEKINETIC Institutional" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface">Organization ID</label>
                    <input className="bg-surface-container-low border border-outline-variant px-4 py-3 rounded font-body-md text-body-md text-outline cursor-not-allowed" readOnly type="text" value="VK-ORG-88293-PRO" />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-label-md text-label-md text-on-surface">Registered Address</label>
                    <textarea className="border border-outline-variant px-4 py-3 rounded focus:outline-none focus:border-secondary font-body-md text-body-md bg-transparent" rows={3} defaultValue="1200 Federal Plaza, Suite 400, Washington D.C., 20004, USA"></textarea>
                  </div>
                </div>
              </div>
              <div className="settings-card p-gutter bg-surface rounded flex items-center gap-gutter">
                <div className="w-24 h-24 bg-surface-container-highest rounded flex items-center justify-center border border-dashed border-outline">
                  <span className="material-symbols-outlined text-outline text-4xl">add_a_photo</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-label-md text-label-md text-on-surface">Institutional Seal</h3>
                  <p className="font-body-sm text-label-sm text-on-surface-variant mb-4">Official logo for ballots and formal documents. Max size 2MB.</p>
                  <button className="px-gutter py-2 border border-primary text-primary font-label-md text-label-md hover:bg-primary hover:text-white transition-all rounded">Replace Logo</button>
                </div>
              </div>
            </section>
          )}

          {/* Section: Security Protocols */}
          {activeTab === 'security' && (
            <section className="space-y-stack-lg">
              <header className="mb-stack-md">
                <h1 className="font-headline-lg text-headline-lg text-primary">Security Protocols</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Enforce state-grade encryption and access controls to maintain the integrity of the voting environment.</p>
              </header>
              <div className="settings-card p-gutter bg-surface rounded space-y-gutter">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">Mandatory Two-Factor Authentication</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Require all administrative staff to use hardware keys or TOTP.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant pt-gutter">
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">Session Inactivity Timeout</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Automatic logout for inactive sessions.</p>
                  </div>
                  <select className="bg-transparent border border-outline-variant px-4 py-2 rounded font-label-md text-label-md focus:outline-none focus:border-secondary" defaultValue="30 Minutes">
                    <option>15 Minutes</option>
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>Never (Not Recommended)</option>
                  </select>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant pt-gutter">
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">IP Restricted Access</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Only allow logins from designated institutional VPN ranges.</p>
                  </div>
                  <button className="text-secondary font-label-md text-label-md hover:underline">Manage Whitelist</button>
                </div>
              </div>
              <div className="bg-error-container/20 border border-error/20 p-gutter rounded flex gap-4">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <div>
                  <h4 className="font-label-md text-label-md text-error">Active Encryption Protocol: AES-256-GCM</h4>
                  <p className="font-label-sm text-label-sm text-on-error-container/80">Your organization is currently operating under state-grade quantum-resistant encryption standards.</p>
                </div>
              </div>
            </section>
          )}

          {/* Section: Regional Preferences */}
          {activeTab === 'regional' && (
            <section className="space-y-stack-lg">
              <header className="mb-stack-md">
                <h1 className="font-headline-lg text-headline-lg text-primary">Regional Preferences</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Adjust date, time, and language settings to align with local jurisdictional requirements.</p>
              </header>
              <div className="settings-card p-gutter bg-surface rounded space-y-gutter">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface">Primary Operating Language</label>
                    <select className="bg-transparent border border-outline-variant px-4 py-3 rounded font-body-md text-body-md focus:outline-none focus:border-secondary" defaultValue="English (United States)">
                      <option>English (United States)</option>
                      <option>Spanish (Mexico)</option>
                      <option>French (Canada)</option>
                      <option>German (Germany)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface">Timezone</label>
                    <select className="bg-transparent border border-outline-variant px-4 py-3 rounded font-body-md text-body-md focus:outline-none focus:border-secondary" defaultValue="(GMT-05:00) Eastern Time">
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT-06:00) Central Time</option>
                      <option>(GMT-08:00) Pacific Time</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface">Date Format</label>
                    <select className="bg-transparent border border-outline-variant px-4 py-3 rounded font-body-md text-body-md focus:outline-none focus:border-secondary" defaultValue="MM/DD/YYYY">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface">Currency</label>
                    <select className="bg-transparent border border-outline-variant px-4 py-3 rounded font-body-md text-body-md focus:outline-none focus:border-secondary" defaultValue="USD ($)">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section: Compliance */}
          {activeTab === 'compliance' && (
            <section className="space-y-stack-lg">
              <header className="mb-stack-md">
                <h1 className="font-headline-lg text-headline-lg text-primary">Audit & Compliance</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Manage data retention and compliance policies.</p>
              </header>
              <div className="settings-card p-gutter bg-surface rounded space-y-gutter">
                 <p className="font-body-md text-body-md text-on-surface-variant">Compliance settings are currently managed globally by VOTEKINETIC Platform administrators.</p>
              </div>
            </section>
          )}

          {/* Bottom Action Bar */}
          <div className="mt-stack-lg flex justify-end items-center gap-gutter pt-stack-md border-t border-outline-variant">
            <button className="px-gutter py-3 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors rounded">Discard Changes</button>
            <button className="px-gutter py-3 bg-primary text-white font-label-md text-label-md hover:opacity-90 transition-opacity rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">save</span>
              Save Configuration
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-1">
            <span className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 VOTEKINETIC Institutional Voting Systems. All rights reserved. State-grade encryption active.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all duration-200" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all duration-200" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all duration-200" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all duration-200" href="#">Compliance</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all duration-200" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
