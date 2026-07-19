import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { organizationApi } from '../../api/client';

export const OrganizationMembers = () => {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const { user } = useAuth();
  
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && orgId) {
      organizationApi.getMembers(user, orgId)
        .then(res => setMembers(res.members || []))
        .catch(err => console.error('Failed to load members', err))
        .finally(() => setLoading(false));
    }
  }, [user, orgId]);

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans md:flex-row pb-16 md:pb-0">
      
      {/* Side Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-[260px] border-r border-outline-variant bg-white min-h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <span className="font-bold text-xl tracking-tight text-primary">VOTEKINETIC</span>
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Org Admin</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link to={`/admin/organizations/${orgId}/overview`} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">home</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Overview</span>
          </Link>
          <Link to={`/admin/organizations/${orgId}/members`} className="flex items-center gap-3 px-4 py-3 bg-[#dbeafe] text-[#1e40af] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>people</span>
            <span className="text-sm font-bold">Members</span>
          </Link>
          <Link to={`/admin/organizations/${orgId}/settings`} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">settings</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto flex flex-col min-w-0">
        <header className="h-16 md:h-20 border-b border-outline-variant bg-white sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 -ml-2 rounded-full hover:bg-[#f0f0f3] transition-colors" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
            </button>
            <h1 className="text-xl font-bold tracking-tight text-primary">Members</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/voters/manual-add')} className="h-10 px-4 bg-primary text-white rounded-lg font-bold text-sm hover:bg-[#1d4ed8] transition-colors flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span className="hidden sm:inline">Invite Member</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-grow overflow-y-auto">
          <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
            <div className="p-4 md:px-6 border-b border-outline-variant bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative max-w-md w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                <input 
                  type="text" 
                  placeholder="Search by name, email, or role..." 
                  className="w-full h-10 pl-10 pr-4 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto flex-grow custom-scrollbar">
              <table className="w-full text-left border-collapse whitespace-nowrap min-w-[700px]">
                <thead>
                  <tr className="bg-surface-container-lowest border-b border-outline-variant">
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest w-[40%]">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-on-surface-variant animate-pulse">Loading members...</td>
                    </tr>
                  ) : members.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-on-surface-variant">No members found in this organization.</td>
                    </tr>
                  ) : (
                    members.map(member => (
                      <tr key={member.id} className="hover:bg-surface-container-lowest transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">person</span>
                            </div>
                            <div>
                              <div className="font-bold text-[#1a1c1e] text-sm group-hover:text-primary transition-colors">{member.user.displayName || 'Unknown User'}</div>
                              <div className="text-xs font-medium text-on-surface-variant mt-0.5">{member.user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold tracking-wide">
                            {member.role.name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#16a34a]"></div>
                            <span className="text-xs font-bold text-[#16a34a] uppercase tracking-widest">Active</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => navigate(`/admin/voters/${member.userId}/block`)}
                            className="p-2 rounded-lg text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors inline-flex" title="Revoke Access"
                          >
                            <span className="material-symbols-outlined text-[20px]">block</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between mt-auto">
              <span className="text-sm font-medium text-on-surface-variant">Showing {members.length} member(s)</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-outline-variant rounded-md text-sm font-medium text-on-surface-variant disabled:opacity-50">Previous</button>
                <button className="px-3 py-1.5 border border-outline-variant rounded-md text-sm font-medium text-on-surface-variant disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};