import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const PlatformSettings: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'admin' | 'system'>('general');

  const tabTitles = {
    'general': 'General Defaults',
    'security': 'Security Policies',
    'admin': 'Super Admin Management',
    'system': 'System Health Status'
  };

  const tabSubtitles = {
    'general': 'Manage global environment variables and operational thresholds.',
    'security': 'Configure multi-layer encryption and authentication protocols.',
    'admin': 'Audit and manage top-level administrative identities.',
    'system': 'Real-time telemetry and resource allocation metrics.'
  };

  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['platform-settings'],
    queryFn: async () => {
      const token = await user?.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/platform-settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    },
    enabled: !!user
  });

  const mutation = useMutation({
    mutationFn: async (updates: any) => {
      const token = await user?.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/platform-settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update settings');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-settings'] });
      alert('Settings updated successfully');
    }
  });

  const settings = settingsData?.settings || {};

  const handleToggle = (key: string) => {
    mutation.mutate({ [key]: !settings[key] });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-background text-on-surface">Loading...</div>;
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
        <div className="flex justify-between items-center h-16 px-margin-desktop max-w-container-max mx-auto">
          <div className="font-display-lg text-display-lg font-bold text-primary">VOTEKINETIC</div>
          <nav className="hidden md:flex gap-gutter items-center">
            <Link to="/superadmin" className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/superadmin/organizations" className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors">Governance</Link>
            <Link to="/superadmin/security" className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors">Security</Link>
            <Link to="/superadmin/settings" className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1">Infrastructure</Link>
            <a className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Logs</a>
          </nav>
          <div className="flex items-center gap-stack-md">
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80">notifications</span>
            <span className="material-symbols-outlined text-secondary font-bold cursor-pointer">settings</span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80">admin_panel_settings</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline ml-stack-sm">
              <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhqGMul_aVYwoNQPoDue6a8TyEzvyCFqDw3kwFt0cS5Zr2aq0g_N0p0fK45-_--wIrZl5mOvxbkR7o1JAfdaoZ0LgfO8o-kaLulnbxha-C_wMuJreY0cYKF0sAsXzky2rvQnmzfRTNJxglWva58UwKGVl0f3A6x42Pm_kbZAIYwlyVKzjWclLw-rywWOPAAfaWroRIDZff7vOULfC2I2t55OzbY1pg8FIQZ-Rflslh4VxjJHgEI9pogg" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-container-max mx-auto w-full px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-stack-lg">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-unit">
            <button 
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-stack-md px-stack-md py-stack-sm rounded text-left transition-all ${activeTab === 'general' ? 'bg-secondary-container text-on-secondary-container font-bold border-l-4 border-secondary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined">tune</span>
              <span className="font-label-md text-label-md">General Defaults</span>
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-stack-md px-stack-md py-stack-sm rounded text-left transition-all ${activeTab === 'security' ? 'bg-secondary-container text-on-secondary-container font-bold border-l-4 border-secondary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined">gpp_maybe</span>
              <span className="font-label-md text-label-md">Security Policies</span>
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-stack-md px-stack-md py-stack-sm rounded text-left transition-all ${activeTab === 'admin' ? 'bg-secondary-container text-on-secondary-container font-bold border-l-4 border-secondary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined">manage_accounts</span>
              <span className="font-label-md text-label-md">Super Admins</span>
            </button>
            <button 
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-stack-md px-stack-md py-stack-sm rounded text-left transition-all ${activeTab === 'system' ? 'bg-secondary-container text-on-secondary-container font-bold border-l-4 border-secondary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined">analytics</span>
              <span className="font-label-md text-label-md">System Health</span>
            </button>
          </nav>
          
          {/* Access Quorum Status */}
          <div className="mt-stack-lg p-stack-md bg-surface-container rounded border border-outline-variant">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Access Quorum</span>
              <span className="font-label-md text-label-md text-primary">6/10</span>
            </div>
            <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden">
              <div className="bg-secondary h-full transition-all duration-1000" style={{ width: '60%' }}></div>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-stack-sm leading-tight">
              4 more approvals required for policy updates.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow">
          {/* Header section */}
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-headline-lg text-primary">{tabTitles[activeTab]}</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">{tabSubtitles[activeTab]}</p>
          </div>

          {/* Content Card */}
          <div className="bg-surface-container-lowest border border-outline-variant p-stack-lg rounded shadow-sm">
            
            {/* General Defaults View */}
            {activeTab === 'general' && (
              <div className="space-y-stack-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="flex flex-col gap-unit">
                    <label className="font-label-md text-label-md text-on-surface">Primary Institution Name</label>
                    <input className="border border-outline-variant rounded p-stack-sm focus:ring-2 focus:ring-secondary focus:outline-none font-body-md text-body-md bg-transparent" type="text" defaultValue="VOTEKINETIC Global" />
                  </div>
                  <div className="flex flex-col gap-unit">
                    <label className="font-label-md text-label-md text-on-surface">Environment ID</label>
                    <input className="bg-surface-container-low border border-outline-variant rounded p-stack-sm font-body-md text-body-md cursor-not-allowed opacity-70" readOnly type="text" value="VK-CORE-001" />
                  </div>
                </div>
                
                <div className="border-t border-outline-variant pt-stack-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary">Operational Modes</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Warning: Some modes may suspend active voting sessions.</p>
                    </div>
                  </div>
                  <div className="mt-stack-md space-y-stack-md">
                    {/* Toggle: Maintenance Mode */}
                    <div className="flex items-center justify-between p-stack-md bg-surface-container-low border border-outline-variant rounded-lg">
                      <div className="flex gap-stack-md">
                        <span className="material-symbols-outlined text-error mt-1">construction</span>
                        <div>
                          <p className="font-label-md text-label-md font-bold text-on-surface">Maintenance Mode</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Suspend all traffic and display maintenance splash screen.</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only toggle-checkbox" type="checkbox" checked={settings.maintenanceMode || false} onChange={() => handleToggle('maintenanceMode')} disabled={mutation.isPending} />
                        <div className={`toggle-slot w-11 h-6 rounded-full transition-colors relative ${settings.maintenanceMode ? 'bg-secondary' : 'bg-outline-variant'}`}>
                          <div className={`toggle-dot absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.maintenanceMode ? 'translate-x-5' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                    {/* Toggle: Read-Only Mode */}
                    <div className="flex items-center justify-between p-stack-md bg-surface-container-low border border-outline-variant rounded-lg">
                      <div className="flex gap-stack-md">
                        <span className="material-symbols-outlined text-primary mt-1">visibility</span>
                        <div>
                          <p className="font-label-md text-label-md font-bold text-on-surface">Read-Only Mode</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">Allow audit trail viewing but disable new vote casting.</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only toggle-checkbox" type="checkbox" />
                        <div className="toggle-slot w-11 h-6 bg-outline-variant rounded-full transition-colors relative">
                          <div className="toggle-dot absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-stack-md pt-stack-lg border-t border-outline-variant">
                  <button className="px-gutter py-stack-md font-label-md text-label-md border border-primary text-primary rounded-lg hover:bg-surface-container-high transition-all">Cancel</button>
                  <button className="px-gutter py-stack-md font-label-md text-label-md bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 transition-all">Update Defaults</button>
                </div>
              </div>
            )}

            {/* Security Policies View */}
            {activeTab === 'security' && (
              <div className="space-y-stack-lg">
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary">Authentication Layers</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Global enforcement settings for user and admin access.</p>
                </div>
                <div className="space-y-stack-md">
                  {/* Toggle: Strict Biometric Enforcement */}
                  <div className="flex items-center justify-between p-stack-md bg-surface-container-low border border-outline-variant rounded-lg">
                    <div className="flex gap-stack-md">
                      <span className="material-symbols-outlined text-secondary mt-1">fingerprint</span>
                      <div>
                        <p className="font-label-md text-label-md font-bold text-on-surface">Strict Biometric Enforcement</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">Force WebAuthn/FIDO2 for every administrative action.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input className="sr-only toggle-checkbox" type="checkbox" checked={settings.biometricEnforcement || false} onChange={() => handleToggle('biometricEnforcement')} disabled={mutation.isPending} />
                      <div className={`toggle-slot w-11 h-6 rounded-full transition-colors relative ${settings.biometricEnforcement ? 'bg-secondary' : 'bg-outline-variant'}`}>
                        <div className={`toggle-dot absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.biometricEnforcement ? 'translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                  {/* Toggle: Hardware Token Required */}
                  <div className="flex items-center justify-between p-stack-md bg-surface-container-low border border-outline-variant rounded-lg">
                    <div className="flex gap-stack-md">
                      <span className="material-symbols-outlined text-primary mt-1">key</span>
                      <div>
                        <p className="font-label-md text-label-md font-bold text-on-surface">Hardware Token Required</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">Admins must use a physical security key (e.g. YubiKey).</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input className="sr-only toggle-checkbox" type="checkbox" />
                      <div className="toggle-slot w-11 h-6 bg-outline-variant rounded-full transition-colors relative">
                        <div className="toggle-dot absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="p-stack-md bg-error-container text-on-error-container rounded-lg border border-error flex gap-stack-md items-start">
                  <span className="material-symbols-outlined">warning</span>
                  <div className="font-label-sm text-label-sm">
                    <p className="font-bold">Encryption Protocol Notice</p>
                    <p>Changing the primary encryption schema will require a full node synchronization which may take up to 48 hours. This action requires 100% quorum approval.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Super Admin Management View */}
            {activeTab === 'admin' && (
              <div>
                <div className="flex justify-between items-center mb-stack-md">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary">System Hierarchy</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Active Super Admins with root-level governance privileges.</p>
                  </div>
                  <button className="flex items-center gap-unit px-stack-md py-stack-sm bg-primary text-on-primary rounded font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Invite Admin
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container text-on-surface-variant border-b border-outline-variant">
                        <th className="p-stack-md font-label-md text-label-md font-bold uppercase tracking-wider">Admin</th>
                        <th className="p-stack-md font-label-md text-label-md font-bold uppercase tracking-wider">Assigned Role</th>
                        <th className="p-stack-md font-label-md text-label-md font-bold uppercase tracking-wider">Status</th>
                        <th className="p-stack-md font-label-md text-label-md font-bold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="p-stack-md">
                          <div className="flex items-center gap-stack-md">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline">
                              <img className="w-full h-full object-cover" alt="Dr. Elena Volkov" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn6V9GasQz9kkPA5RxILSJ7oj4KvcCAGbPUcoN4wx8qJMZ8TYOkNcaq-CqqtajxKZDw534U-APIlamAai54bYahLTfn44fSVxz0u4QeVpdWFAibW-Uw9_uyB5JjnV8vSIrtP-aOCMR62vgRopfE0L6Q5JgiUCW00ELQ45_q17Vvtjzb75kKGOTSXsnpAa-2HNNSgiR2J0aTBg1ohMAMaFJto_LCN_CbHVkmHMdw5hQKLtdfNTQ2t43KQ" />
                            </div>
                            <div>
                              <p className="font-label-md text-label-md text-on-surface">Dr. Elena Volkov</p>
                              <p className="font-label-sm text-label-sm text-on-surface-variant">e.volkov@votekinetic.gov</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-stack-md font-body-md text-body-md">Infrastructure Governance</td>
                        <td className="p-stack-md">
                          <span className="px-stack-sm py-unit bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase rounded-full">Online</span>
                        </td>
                        <td className="p-stack-md">
                          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">more_vert</span>
                        </td>
                      </tr>
                      <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="p-stack-md">
                          <div className="flex items-center gap-stack-md">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline">
                              <img className="w-full h-full object-cover" alt="Marcus Thorne" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvnVRUmDGIjNP3bW3ALS5lKAfT5Zf_ybc_I3iKQWX4_QYpv8rP24l75a7xm1ADrN_tFnRvFoo6wIuQpDMddZB6S49QspcCyyjo8TA0tFk-322j7u1Oo1Wz6bOfco0dnwFJ8IYgAU4TOzrx-K2F8la_Wl9S6Ia2PZEibzfnyDLA9NVTfpzSwVd0d5JRnaw68PKFOef2wdNxXyppUwSKUE3pGIIRoUSDMuMlaohROfbCZxIYFKqKcKdyxw" />
                            </div>
                            <div>
                              <p className="font-label-md text-label-md text-on-surface">Marcus Thorne</p>
                              <p className="font-label-sm text-label-sm text-on-surface-variant">m.thorne@votekinetic.gov</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-stack-md font-body-md text-body-md">Policy Auditor</td>
                        <td className="p-stack-md">
                          <span className="px-stack-sm py-unit bg-outline-variant text-on-surface-variant text-[10px] font-bold uppercase rounded-full">Offline</span>
                        </td>
                        <td className="p-stack-md">
                          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">more_vert</span>
                        </td>
                      </tr>
                      <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="p-stack-md">
                          <div className="flex items-center gap-stack-md">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline">
                              <img className="w-full h-full object-cover" alt="Aiden Vance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp00-6BMxVrFKocqWbI0kD6-kggzKBcVSUpY1389SGeG6v_TbrHMVlBEd4Ll0t5hYV0LU0sI5RwAcyMD-xFkb_Zj-WK7KrKnuq_5amzHOCyDjqTK-EAvDN80cmBgas9YRplQBdvDJkrg3vTBFWsyC0PrzdYhZYLa7CJHmt_pPHS9HD2tvKe7xGJXOkK7XQGWEWeCf2jfte2wrS5Kd881tr2cDisxeW9FcvVloWUbgL9mGvEWEygUezoA" />
                            </div>
                            <div>
                              <p className="font-label-md text-label-md text-on-surface">Aiden Vance</p>
                              <p className="font-label-sm text-label-sm text-on-surface-variant">a.vance@votekinetic.gov</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-stack-md font-body-md text-body-md">Cryptographic Custodian</td>
                        <td className="p-stack-md">
                          <span className="px-stack-sm py-unit bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase rounded-full">Online</span>
                        </td>
                        <td className="p-stack-md">
                          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">more_vert</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* System Health View */}
            {activeTab === 'system' && (
              <div className="space-y-stack-lg">
                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    <h3 className="font-headline-md text-label-md uppercase tracking-wider text-primary">System Telemetry</h3>
                </div>
                <p className="text-on-surface-variant">System health metrics will be displayed here.</p>
              </div>
            )}
            
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bottom-0 mt-stack-lg border-t border-outline-variant bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center py-stack-md px-margin-desktop max-w-container-max mx-auto">
          <div className="font-label-md text-label-md font-bold text-primary mb-stack-sm md:mb-0">VOTEKINETIC</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant mb-stack-sm md:mb-0">
            © 2024 VOTEKINETIC Institutional Grade Voting Systems. All rights reserved.
          </div>
          <div className="flex gap-stack-md">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Security Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">System Health</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
