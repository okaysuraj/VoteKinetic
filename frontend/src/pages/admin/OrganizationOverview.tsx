import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { organizationApi } from '../../api/client';

export const OrganizationOverview = () => {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const { user } = useAuth();
  
  const [org, setOrg] = useState<any>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && orgId) {
      organizationApi.getById(user, orgId)
        .then(res => {
          setOrg(res.organization);
          setTotalVotes(res.totalVotes || 0);
        })
        .catch(err => console.error('Failed to load organization', err))
        .finally(() => setLoading(false));
    }
  }, [user, orgId]);

  if (loading) {
    return (
      <div className="bg-[#f9f9fc] min-h-screen flex items-center justify-center font-sans">
        <div className="text-xl font-medium animate-pulse text-on-surface-variant">Loading organization details...</div>
      </div>
    );
  }

  if (!org) {
    return (
      <div className="bg-[#f9f9fc] min-h-screen flex items-center justify-center font-sans flex-col">
        <div className="text-xl font-medium text-error mb-4">Organization not found</div>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-primary text-white rounded-lg">Go Back</button>
      </div>
    );
  }

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
          <Link to={`/admin/organizations/${orgId}/overview`} className="flex items-center gap-3 px-4 py-3 bg-[#dbeafe] text-[#1e40af] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="text-sm font-bold">Overview</span>
          </Link>
          <Link to={`/admin/organizations/${orgId}/members`} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">people</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Members</span>
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
            <h1 className="text-xl font-bold tracking-tight text-primary">Organization Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-[#e0e2ec] border border-outline-variant flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">person</span>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-grow overflow-y-auto space-y-6 md:space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1c1e] tracking-tight">{org.name}</h2>
              <p className="text-sm font-medium text-on-surface-variant mt-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
                Enterprise ID: {org.id}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-md font-bold text-xs uppercase tracking-widest ${
                org.status === 'ACTIVE' ? 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]' :
                'bg-error/10 text-error border border-error/20'
              }`}>
                {org.status} Status
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Active Elections</span>
                <span className="material-symbols-outlined text-primary text-[24px]">how_to_vote</span>
              </div>
              <div className="text-4xl font-bold tracking-tight text-[#1a1c1e]">{org._count?.elections || 0}</div>
            </div>
            
            <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Total Members</span>
                <span className="material-symbols-outlined text-secondary text-[24px]">people</span>
              </div>
              <div className="text-4xl font-bold tracking-tight text-[#1a1c1e]">{org._count?.users || 0}</div>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Platform Usage</span>
                <span className="material-symbols-outlined text-[#16a34a] text-[24px]">trending_up</span>
              </div>
              <div className="text-4xl font-bold tracking-tight text-[#1a1c1e]">{totalVotes}</div>
              <p className="text-xs font-medium text-on-surface-variant mt-2">Total votes cast across org</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};