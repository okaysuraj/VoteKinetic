import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const SecurityManagement: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const token = await user?.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    },
    enabled: !!user
  });

  const mutation = useMutation({
    mutationFn: async (preferences: any) => {
      const token = await user?.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ preferences })
      });
      if (!res.ok) throw new Error('Failed to update profile');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    }
  });

  const prefs = profileData?.user?.preferences || { twoFactorEnabled: true, biometricEnabled: true };

  const handleToggle = (key: string) => {
    mutation.mutate({ ...prefs, [key]: !prefs[key] });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-background text-on-surface">Loading...</div>;
  }


  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* TopNavBar */}
      <nav className="bg-surface border-b border-outline-variant docked full-width top-0 z-50">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary">
            VOTEKINETIC
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/superadmin" className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors duration-200">Dashboard</Link>
            <Link to="/superadmin/organizations" className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors duration-200">Governance</Link>
            <Link to="/superadmin/security" className="text-label-md font-label-md text-primary font-bold border-b-2 border-primary pb-1">Security</Link>
            <Link to="/superadmin/settings" className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors duration-200">Infrastructure</Link>
          </div>
          <div className="flex items-center gap-4 text-primary">
            <span className="material-symbols-outlined cursor-pointer hover:opacity-80 transition-opacity">notifications</span>
            <span className="material-symbols-outlined cursor-pointer hover:opacity-80 transition-opacity">help_outline</span>
            <span className="material-symbols-outlined cursor-pointer text-secondary border-b-2 border-secondary pb-1">account_circle</span>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="max-w-container-max mx-auto px-gutter py-stack-lg min-h-screen">
        {/* Header Section */}
        <header className="mb-stack-lg">
          <h1 className="text-headline-lg font-headline-lg text-primary mb-2">Security & Session Management</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Monitor your active devices and manage institutional-grade security protocols for your admin profile.</p>
        </header>

        {/* Bento Layout for Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-stack-lg">
          {/* Active Sessions Section */}
          <section className="space-y-stack-sm">
            <h2 className="text-label-md font-label-md text-primary uppercase tracking-wider">Active Sessions</h2>
            <div className="border-[2px] border-secondary bg-[#EBF2FA] p-stack-md rounded-lg flex items-start gap-4">
              <div className="bg-primary text-on-primary p-3 rounded-xl">
                <span className="material-symbols-outlined">smartphone</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-label-md font-label-md text-primary">iPhone 15 Pro Max</h3>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">San Francisco, CA • Current Device</p>
                  </div>
                  <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded uppercase">Verified</span>
                </div>
                <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">Active since: Today, 10:45 AM</p>
              </div>
            </div>
          </section>

          {/* Security Actions Section */}
          <section className="space-y-stack-sm">
            <h2 className="text-label-md font-label-md text-primary uppercase tracking-wider">Security Actions</h2>
            <div className="border border-outline-variant hover:shadow-md transition-all bg-surface p-stack-md rounded-lg space-y-4">
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">vibration</span>
                  <div>
                    <p className="text-label-md font-label-md">Two-Factor Authentication</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">Extra layer via SMS/App</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleToggle('twoFactorEnabled')}
                  disabled={mutation.isPending}
                  className={`w-12 h-6 rounded-full relative flex items-center px-1 transition-all ${prefs.twoFactorEnabled ? 'bg-secondary' : 'bg-outline-variant'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all ${prefs.twoFactorEnabled ? 'ml-auto' : ''}`}></div>
                </button>
              </div>
              {/* Biometric Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">fingerprint</span>
                  <div>
                    <p className="text-label-md font-label-md">Biometric Login</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">FaceID or Fingerprint</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleToggle('biometricEnabled')}
                  disabled={mutation.isPending}
                  className={`w-12 h-6 rounded-full relative flex items-center px-1 transition-all ${prefs.biometricEnabled ? 'bg-secondary' : 'bg-outline-variant'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all ${prefs.biometricEnabled ? 'ml-auto' : ''}`}></div>
                </button>
              </div>
              {/* Change Password */}
              <button className="w-full h-12 border border-primary text-primary font-label-md rounded hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">key</span>
                Change Security Password
              </button>
            </div>
          </section>

          {/* Device History */}
          <section className="space-y-stack-sm md:col-span-2">
            <h2 className="text-label-md font-label-md text-primary uppercase tracking-wider">Device History</h2>
            <div className="border border-outline-variant hover:shadow-md transition-all bg-surface rounded-lg overflow-hidden">
              <div className="divide-y divide-outline-variant">
                {/* History Item 1 */}
                <div className="p-stack-md flex items-center justify-between hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant">laptop_mac</span>
                    <div>
                      <p className="text-label-md font-label-md">MacBook Pro 14"</p>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">Chrome • Seattle, WA • Oct 12, 2:15 PM</p>
                    </div>
                  </div>
                  <button className="text-error font-label-md text-label-sm hover:underline">Revoke Access</button>
                </div>
                {/* History Item 2 */}
                <div className="p-stack-md flex items-center justify-between hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant">tablet_android</span>
                    <div>
                      <p className="text-label-md font-label-md">iPad Air</p>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">App • Portland, OR • Oct 08, 11:02 AM</p>
                    </div>
                  </div>
                  <button className="text-error font-label-md text-label-sm hover:underline">Revoke Access</button>
                </div>
              </div>
            </div>
          </section>

          {/* Audit Log Section */}
          <section className="space-y-stack-sm md:col-span-2">
            <h2 className="text-label-md font-label-md text-primary uppercase tracking-wider">Audit Log</h2>
            <div className="border border-outline-variant hover:shadow-md transition-all bg-surface-container-low rounded-lg p-stack-md">
              <div className="max-h-48 overflow-y-auto space-y-3">
                <div className="flex justify-between items-start text-label-sm">
                  <span className="text-primary font-bold">SESSION_INIT</span>
                  <span className="text-on-surface-variant">Hash: 8f2a...c91e</span>
                  <span className="text-on-surface-variant">2024-10-15 10:45:01</span>
                </div>
                <div className="flex justify-between items-start text-label-sm border-t border-outline-variant pt-2">
                  <span className="text-secondary font-bold">2FA_VERIFIED</span>
                  <span className="text-on-surface-variant">Method: SMS_OTP</span>
                  <span className="text-on-surface-variant">2024-10-15 10:44:50</span>
                </div>
                <div className="flex justify-between items-start text-label-sm border-t border-outline-variant pt-2">
                  <span className="text-on-surface-variant font-bold">PWD_RESET_REQUISITION</span>
                  <span className="text-on-surface-variant">Origin: Local_UI</span>
                  <span className="text-on-surface-variant">2024-10-14 18:30:12</span>
                </div>
                <div className="flex justify-between items-start text-label-sm border-t border-outline-variant pt-2">
                  <span className="text-on-surface-variant font-bold">SYSTEM_HEALTH_CHECK</span>
                  <span className="text-on-surface-variant">Status: NOMINAL</span>
                  <span className="text-on-surface-variant">2024-10-14 00:00:01</span>
                </div>
                <div className="flex justify-between items-start text-label-sm border-t border-outline-variant pt-2">
                  <span className="text-error font-bold">LOGIN_FAIL_ATTEMPT</span>
                  <span className="text-on-surface-variant">IP: 192.168.1.104</span>
                  <span className="text-on-surface-variant">2024-10-12 09:12:33</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
                <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  Showing last 5 events
                </span>
                <button className="text-secondary font-label-md text-label-sm hover:underline">Download Full Log (.CSV)</button>
              </div>
            </div>
          </section>
        </div>

        {/* Encryption Banner */}
        <div className="relative overflow-hidden bg-primary text-on-primary rounded-xl p-gutter mt-stack-lg shadow-lg">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-surface-container-highest/20 p-4 rounded-full border border-surface-container-highest/30">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>encrypted</span>
              </div>
              <div>
                <h2 className="text-headline-md font-headline-md mb-1">Institutional Grade Encryption</h2>
                <p className="text-body-md opacity-80 max-w-md">Your session is protected by AES-256 end-to-end hardware-level encryption, ensuring every action is cryptographically verified.</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-label-sm font-label-sm border border-secondary px-3 py-1 rounded bg-secondary/10">FIPS 140-2 COMPLIANT</span>
              <span className="text-label-sm font-label-sm border border-outline-variant/30 px-3 py-1 rounded">SSL/TLS 1.3 ACTIVE</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-tertiary text-on-tertiary w-full py-stack-lg px-gutter max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start gap-gutter">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="text-label-md font-label-md font-bold text-surface-bright">VOTEKINETIC</div>
          <p className="text-body-md font-body-md opacity-70">Empowering digital democracy with secure, transparent, and accessible voting infrastructure for institutional bodies worldwide.</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-label-md font-label-md text-surface-bright mb-2">Legal</span>
            <a className="text-label-sm font-label-sm text-on-tertiary-container hover:text-surface-bright transition-colors duration-150" href="#">Security Protocol</a>
            <a className="text-label-sm font-label-sm text-on-tertiary-container hover:text-surface-bright transition-colors duration-150" href="#">Privacy Policy</a>
            <a className="text-label-sm font-label-sm text-on-tertiary-container hover:text-surface-bright transition-colors duration-150" href="#">Terms of Service</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-label-md font-label-md text-surface-bright mb-2">Account</span>
            <a className="text-label-sm font-label-sm text-on-tertiary-container hover:text-surface-bright transition-colors duration-150" href="#">Accessibility Statement</a>
            <a className="text-label-sm font-label-sm text-on-tertiary-container hover:text-surface-bright transition-colors duration-150" href="#">Verify Identity</a>
          </div>
        </div>
        <div className="w-full md:w-auto pt-stack-md md:pt-0 border-t md:border-0 border-outline-variant/20">
          <p className="text-label-sm font-label-sm text-on-tertiary-container">© 2024 VOTEKINETIC Secure Voting Systems. All rights reserved. State-grade encryption active.</p>
        </div>
      </footer>
    </div>
  );
};
