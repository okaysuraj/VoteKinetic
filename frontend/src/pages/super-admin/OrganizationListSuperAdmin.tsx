import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { organizationApi } from '../../api/client';

export const OrganizationListSuperAdmin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    organizationApi.list(user)
      .then(res => setOrgs(res.organizations || []))
      .catch(err => console.error('Failed to load organizations', err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="p-8">Loading...</div>;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]';
      case 'Maintenance': return 'bg-[#fef9c3] text-[#854d0e] border-[#fef08a]';
      case 'Suspended': return 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]';
      default: return 'bg-surface-container-high text-on-surface';
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-[#16a34a]';
      case 'Maintenance': return 'bg-[#eab308]';
      case 'Suspended': return 'bg-[#dc2626]';
      default: return 'bg-outline-variant';
    }
  };



  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0">
      
      {/* Global Super Admin Header */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-error rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
            <span className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC <span className="text-error font-normal text-sm ml-1 uppercase tracking-widest hidden md:inline">Super Admin</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.ORG_MANAGEMENT</span>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container p-1 pr-3 rounded-full transition-colors" onClick={() => navigate('/super-admin')}>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">shield_person</span>
              </div>
              <span className="text-sm font-bold text-on-surface hidden md:block">SysAdmin_01</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow max-w-[1440px] mx-auto w-full">
        
        {/* Desktop Sidebar (hidden on mobile) */}
        <aside className="hidden md:flex flex-col w-64 border-r border-outline-variant bg-surface py-6 px-4 shrink-0">
          <nav className="space-y-1">
            <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-bold text-sm">Global Dashboard</span>
            </a>
            <a href="/super-admin/organizations" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
              <span className="text-sm">Organizations</span>
            </a>
            <a href="/super-admin/users" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">people</span>
              <span className="font-bold text-sm">System Users</span>
            </a>
            <a href="/super-admin/settings" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-bold text-sm">Platform Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1">Organizations</h1>
              <p className="text-sm text-on-surface-variant font-medium">Manage all tenant instances across the platform.</p>
            </div>
            <button 
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 h-12 rounded-lg font-bold shadow-sm hover:bg-primary/90 transition-colors active:scale-95"
              onClick={() => navigate('/super-admin/organizations/new')}
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Create Organization
            </button>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                type="text" 
                placeholder="Search by Org ID, Name, or Admin Email..." 
                className="w-full h-12 pl-10 pr-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm font-medium transition-all"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="h-12 px-4 bg-surface border border-outline-variant rounded-lg flex items-center gap-2 text-on-surface font-bold text-sm hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                <span className="hidden md:inline">Filter</span>
              </button>
              <button className="h-12 px-4 bg-surface border border-outline-variant rounded-lg flex items-center gap-2 text-on-surface font-bold text-sm hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">sort</span>
                <span className="hidden md:inline">Sort</span>
              </button>
            </div>
          </div>

          <div className="flex gap-6 mb-4 px-2">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"><span className="text-primary mr-1">{orgs.length}</span> Total</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"><span className="text-[#16a34a] mr-1">{orgs.filter(o => o.status === 'ACTIVE').length}</span> Active</span>
          </div>

          {/* Organization List */}
          <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
            
            {/* List Header */}
            <div className="hidden md:flex items-center px-4 py-3 border-b border-outline-variant bg-surface-container-lowest">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-[40%]">Organization</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-[20%] text-right">Members</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-[25%] text-center">Status</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-[15%] text-right">Actions</span>
            </div>

            {/* List Items */}
            <div className="flex flex-col divide-y divide-outline-variant">
              {orgs.map((org) => (
                <div key={org.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-container-lowest transition-colors group cursor-pointer" onClick={() => navigate(`/super-admin/organizations/${org.id}`)}>
                  
                  <div className="flex items-center gap-4 md:w-[40%]">
                    <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center shrink-0 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-primary">corporate_fare</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{org.name}</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">ID: {org.id} • {org.domain || 'No domain'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-[60%]">
                    <div className="md:w-[33%] text-right md:text-right">
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest md:hidden mb-1">Members</p>
                      <p className="font-bold text-sm text-on-surface">{org._count?.users ?? 0}</p>
                    </div>
                    
                    <div className="md:w-[41%] flex justify-end md:justify-center">
                      <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase rounded-md border ${getStatusColor(org.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDot(org.status)}`}></span>
                        {org.status}
                      </span>
                    </div>
                    
                    <div className="md:w-[25%] flex justify-end">
                      <button 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors"
                        onClick={(e) => { e.stopPropagation(); /* open menu */ }}
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
            
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-on-surface-variant">Showing {orgs.length} organization(s)</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 border border-outline-variant rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 border border-primary bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm">1</button>
              <button className="w-10 h-10 border border-outline-variant bg-surface text-on-surface rounded-lg flex items-center justify-center font-bold text-sm hover:bg-surface-container transition-colors">2</button>
              <button className="w-10 h-10 border border-outline-variant bg-surface text-on-surface rounded-lg flex items-center justify-center font-bold text-sm hover:bg-surface-container transition-colors">3</button>
              <button className="w-10 h-10 border border-outline-variant rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

        </main>
      </div>

      {/* Bottom NavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface flex justify-around items-center h-16 pb-safe shadow-sm">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="/super-admin/organizations" onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
          <span className="text-[10px] font-bold mt-1">Orgs</span>
        </a>
        <a href="/super-admin/users" onClick={(e) => { e.preventDefault(); navigate('/super-admin/users'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">people</span>
          <span className="text-[10px] font-bold mt-1">Users</span>
        </a>
        <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">shield_person</span>
          <span className="text-[10px] font-bold mt-1">Admin</span>
        </a>
      </nav>

      {/* Contextual FAB (Mobile Only) */}
      <button 
        className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
        onClick={() => navigate('/super-admin/organizations/new')}
      >
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>

    </div>
  );
};
