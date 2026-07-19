import React from 'react';
import { Link } from 'react-router-dom';

export const OrgManagement: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50 transition-shadow duration-200">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-10">
            <span className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</span>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/superadmin/organizations" className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1 hover:text-primary transition-colors opacity-80">Organizations</Link>
              <Link to="/superadmin/tenants" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Tenants</Link>
              <Link to="/superadmin/billing" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Billing</Link>
              <Link to="/superadmin/settings" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Global Settings</Link>
              <Link to="/superadmin/security" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Security</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
              <input className="bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-label-md w-64 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" placeholder="Search systems..." type="text" />
            </div>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-gutter py-stack-lg space-y-stack-lg">
        {/* Dashboard Header & Primary Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter">
          <div className="space-y-1">
            <h1 className="font-display-lg text-display-lg text-primary">Global Organizations</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Central management for institutional voting entities.</p>
          </div>
          <button className="bg-primary text-on-primary h-12 px-6 rounded font-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-sm active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Create New Organization
          </button>
        </div>

        {/* KPI Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* KPI 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:border-secondary transition-colors group">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-md">Total Registered Members</span>
              <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">groups</span>
            </div>
            <div className="mt-4">
              <div className="font-display-lg text-display-lg text-on-surface">1.24M</div>
              <div className="flex items-center gap-1 text-label-sm text-green-600 mt-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+12.4% this month</span>
              </div>
            </div>
          </div>
          {/* KPI 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between hover:border-secondary transition-colors group">
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-label-md">Active Organizations</span>
              <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">domain</span>
            </div>
            <div className="mt-4">
              <div className="font-display-lg text-display-lg text-on-surface">142</div>
              <div className="text-label-sm text-on-surface-variant mt-1">98.5% Uptime across entities</div>
            </div>
          </div>
          {/* KPI 3 */}
          <div className="bg-error-container border border-error p-6 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <span className="text-on-error-container font-label-md">Pending Actions</span>
              <span className="material-symbols-outlined text-error group-hover:animate-pulse">priority_high</span>
            </div>
            <div className="mt-4">
              <div className="font-display-lg text-display-lg text-on-error-container">08</div>
              <div className="text-label-sm text-on-error-container mt-1">3 critical security reviews required</div>
            </div>
          </div>
        </div>

        {/* Main Data Table Container */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          {/* Table Controls */}
          <div className="px-6 py-4 border-b border-outline-variant flex flex-col lg:flex-row justify-between items-center gap-4 bg-surface-bright">
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button className="flex items-center gap-2 border border-outline rounded px-4 py-2 text-label-md text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filters
              </button>
              <div className="h-6 w-px bg-outline-variant"></div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-label-sm font-bold">Enterprise: 84</span>
                <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm">Standard: 58</span>
              </div>
            </div>
            <div className="text-label-sm text-on-surface-variant">
              Displaying 10 of 142 Organizations
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Organization Name</th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Member Count</th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-lowest transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-label-sm">FD</div>
                      <span className="font-label-md text-on-surface">Federal Department of Justice</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-label-sm text-outline">ORG-9921-X</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-tight">Enterprise</span>
                  </td>
                  <td className="px-6 py-4 font-body-md text-on-surface-variant">420,500</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-green-600 font-label-sm">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-full text-outline group-hover:text-primary transition-all">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-surface-container-lowest transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-label-sm">ST</div>
                      <span className="font-label-md text-on-surface">State Teachers Association</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-label-sm text-outline">ORG-1182-B</td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-tight">Standard</span>
                  </td>
                  <td className="px-6 py-4 font-body-md text-on-surface-variant">88,200</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-amber-600 font-label-sm">
                      <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      Maintenance
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-full text-outline group-hover:text-primary transition-all">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-surface-container-lowest transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-error-container text-on-error-container flex items-center justify-center font-bold text-label-sm">NC</div>
                      <span className="font-label-md text-on-surface">National Council of Voters</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-label-sm text-outline">ORG-5501-A</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-tight">Enterprise</span>
                  </td>
                  <td className="px-6 py-4 font-body-md text-on-surface-variant">2.1M</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-error font-label-sm">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      Suspended
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-full text-outline group-hover:text-primary transition-all">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="hover:bg-surface-container-lowest transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">GT</div>
                      <span className="font-label-md text-on-surface">Global Tech Union</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-label-sm text-outline">ORG-3342-L</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-tight">Enterprise</span>
                  </td>
                  <td className="px-6 py-4 font-body-md text-on-surface-variant">156,000</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-green-600 font-label-sm">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-full text-outline group-hover:text-primary transition-all">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
                {/* Row 5 */}
                <tr className="hover:bg-surface-container-lowest transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-label-sm">MR</div>
                      <span className="font-label-md text-on-surface">Municipal Region 12</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-label-sm text-outline">ORG-0922-P</td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-tight">Standard</span>
                  </td>
                  <td className="px-6 py-4 font-body-md text-on-surface-variant">12,400</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-green-600 font-label-sm">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-full text-outline group-hover:text-primary transition-all">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low">
            <div className="text-label-sm text-on-surface-variant">Showing 1-10 of 142</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-outline-variant rounded text-label-sm hover:bg-surface transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-primary text-on-primary rounded text-label-sm">1</button>
              <button className="px-3 py-1 border border-outline-variant rounded text-label-sm hover:bg-surface transition-colors">2</button>
              <button className="px-3 py-1 border border-outline-variant rounded text-label-sm hover:bg-surface transition-colors">3</button>
              <span className="px-1 text-on-surface-variant">...</span>
              <button className="px-3 py-1 border border-outline-variant rounded text-label-sm hover:bg-surface transition-colors">15</button>
              <button className="px-3 py-1 border border-outline-variant rounded text-label-sm hover:bg-surface transition-colors">Next</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md w-full max-w-[1440px] mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC Institutional Voting Systems</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant opacity-80">© 2024 VOTEKINETIC Institutional Voting Systems. All rights reserved. State-grade encryption active.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all duration-200" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all duration-200" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all duration-200" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all duration-200" href="#">Compliance</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all duration-200" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all duration-200" href="#">Support</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
