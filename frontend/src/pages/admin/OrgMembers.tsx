import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const OrgMembers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const members = [
    { id: 1, name: 'Arjun Jayakrishnan', initials: 'AJ', email: 'arjun.j@votekinetic.gov', role: 'Admin', status: 'Active', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
    { id: 2, name: 'Sarah Lindholm', initials: 'SL', email: 's.lindholm@it-ops.io', role: 'Moderator', status: 'Active', bgColor: 'bg-tertiary-fixed', textColor: 'text-on-tertiary-fixed' },
    { id: 3, name: 'Marcus Petrov', initials: 'MP', email: 'marcus.p@legal.agency', role: 'Viewer', status: 'Pending', bgColor: 'bg-error-container', textColor: 'text-on-error-container' },
    { id: 4, name: 'Elena Lopez', initials: 'EL', email: 'elena.l@reg-compliance.gov', role: 'Moderator', status: 'Active', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
  ];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-surface text-on-surface">
      {/* Top Navigation Bar */}
      <header className="bg-surface border-b border-outline-variant fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-[1440px] mx-auto">
          <Link to="/admin" className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</Link>
          <nav className="hidden md:flex gap-8 items-center">
            <a className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1 hover:text-primary transition-colors" href="#">Organizations</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Tenants</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Billing</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Global Settings</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">account_circle</button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 lg:px-margin-desktop max-w-[1440px] mx-auto min-h-screen">
        <div className="flex flex-col lg:flex-row gap-stack-lg">
          {/* Left Side: User Management Main Content */}
          <div className="flex-1 space-y-stack-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-primary">Organization Members</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Manage administrative access and regional oversight teams.</p>
              </div>
              <button className="bg-primary text-on-primary px-6 py-3 rounded hover:opacity-90 transition-opacity flex items-center gap-2 font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                Invite Member
              </button>
            </div>

            {/* Filters & Search Bento Card */}
            <div className="bento-card p-4 rounded-lg flex flex-wrap items-center gap-4 shadow-sm">
              <div className="flex-1 min-w-[280px] relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input 
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body-md text-body-md" 
                  placeholder="Search by name or email..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select className="bg-surface border border-outline-variant rounded px-4 py-2 font-label-md text-label-md text-on-surface focus:border-secondary outline-none">
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>Moderator</option>
                  <option>Viewer</option>
                </select>
                <select className="bg-surface border border-outline-variant rounded px-4 py-2 font-label-md text-label-md text-on-surface focus:border-secondary outline-none">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Deactivated</option>
                </select>
              </div>
            </div>

            {/* Table Card */}
            <div className="bento-card rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Member Name</th>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Email</th>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Role</th>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Status</th>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-surface-bright transition-colors cursor-pointer group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${member.bgColor} flex items-center justify-center ${member.textColor} font-bold`}>{member.initials}</div>
                            <span className="font-body-md text-body-md text-on-surface">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">{member.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full ${member.role === 'Admin' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'} font-label-sm text-label-sm`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 ${member.status === 'Active' ? 'text-on-surface' : 'text-on-surface-variant'} font-label-sm text-label-sm`}>
                            <span className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-secondary' : 'bg-outline-variant'}`}></span> {member.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">more_vert</button>
                        </td>
                      </tr>
                    ))}
                    {filteredMembers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant font-body-md text-body-md">
                          No members found matching your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-surface-container-lowest px-6 py-4 flex items-center justify-between border-t border-outline-variant">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Showing {filteredMembers.length} of {members.length} members</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-outline-variant rounded font-label-sm text-label-sm hover:bg-surface-container transition-colors disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity">1</button>
                  <button className="px-3 py-1 border border-outline-variant rounded font-label-sm text-label-sm hover:bg-surface-container transition-colors">2</button>
                  <button className="px-3 py-1 border border-outline-variant rounded font-label-sm text-label-sm hover:bg-surface-container transition-colors">3</button>
                  <button className="px-3 py-1 border border-outline-variant rounded font-label-sm text-label-sm hover:bg-surface-container transition-colors">Next</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Security Enforcement */}
          <aside className="w-full lg:w-[320px] space-y-stack-md">
            <div className="bento-card p-6 rounded-lg shadow-sm border-l-4 border-l-secondary">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary">security</span>
                <h2 className="font-label-md text-label-md text-primary">Security Enforcement</h2>
              </div>
              <div className="space-y-stack-md">
                <div className="flex flex-col gap-1">
                  <label className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface">Enforce 2FA</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                    </div>
                  </label>
                  <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight">Mandatory for all Admin roles.</p>
                </div>
                <hr className="border-outline-variant" />
                <div className="flex flex-col gap-1">
                  <label className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface">IP Whitelisting</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input className="sr-only peer" type="checkbox" />
                      <div className="w-9 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                    </div>
                  </label>
                  <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight">Restrict login to agency VPN IPs.</p>
                </div>
                <hr className="border-outline-variant" />
                <div className="flex flex-col gap-1">
                  <label className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface">Session Timeout</span>
                    <select className="bg-transparent border-none text-secondary font-label-sm text-label-sm outline-none cursor-pointer" defaultValue="30 mins">
                      <option>15 mins</option>
                      <option>30 mins</option>
                      <option>1 hour</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            {/* Identity Verification Stats */}
            <div className="bento-card p-6 rounded-lg shadow-sm relative overflow-hidden h-48 group">
              <div className="relative z-10">
                <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-2">Audit Readiness</h3>
                <div className="text-display-lg font-display-lg text-primary">98.4%</div>
                <p className="font-label-sm text-label-sm text-secondary mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  +2.1% from last month
                </p>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bento-card p-6 rounded-lg shadow-sm">
              <h3 className="font-label-md text-label-md text-primary mb-4">Security Logs</h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">lock_open</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface">Admin Login</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">Arjun J. • 2m ago</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-[18px] text-outline mt-0.5">person_add</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface">New Invite Sent</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">To: legal.agency • 1h ago</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-[18px] text-error mt-0.5">warning</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-error">Failed Login Attempt</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">IP: 192.168.1.104 • 4h ago</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-2 border border-outline-variant rounded font-label-sm text-label-sm text-on-surface hover:bg-surface-container transition-colors">View All Logs</button>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md w-full max-w-[1440px] mx-auto gap-4">
          <div className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC</div>
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left">© 2024 VOTEKINETIC Institutional Voting Systems. All rights reserved. State-grade encryption active.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all duration-200" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all duration-200" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all duration-200" href="#">Audit Logs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
