import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { electionApi } from '../../api/client';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      electionApi.listActive(user)
        .then(res => setElections(res.elections || []))
        .catch(err => setError(err.message || 'Failed to fetch elections'))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-[280px] bg-white border-r border-[#e0e0e0] flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[#e0e0e0]">
          <span className="text-[#1a73e8] font-bold text-xl tracking-tight">VoteKinetic</span>
        </div>
        
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#e8f0fe] text-[#1a73e8] font-medium mb-1">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </Link>
          <Link to="/admin/elections" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#5f6368] hover:bg-[#f1f3f4] font-medium mb-1 transition-colors">
            <span className="material-symbols-outlined text-[20px]">how_to_vote</span>
            Elections
          </Link>
          <Link to="/admin/organization" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#5f6368] hover:bg-[#f1f3f4] font-medium mb-1 transition-colors">
            <span className="material-symbols-outlined text-[20px]">business</span>
            Organization
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#e0e0e0] flex items-center justify-between px-6 shrink-0 z-10">
          <h1 className="text-xl font-medium text-[#202124]">Overview</h1>
          <div className="flex items-center gap-4">
            <button className="text-[#5f6368] hover:bg-[#f1f3f4] p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1a73e8] flex items-center justify-center text-white font-medium text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-[1200px] mx-auto space-y-6">
            
            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button onClick={() => navigate('/admin/create-election')} className="bg-white p-5 rounded-xl border border-[#e0e0e0] hover:border-[#1a73e8] hover:shadow-md transition-all text-left group flex flex-col justify-between min-h-[140px]">
                <span className="material-symbols-outlined text-[#1a73e8] text-[28px] group-hover:scale-110 transition-transform">add_circle</span>
                <div>
                  <h3 className="font-medium text-[#202124] text-lg">New Election</h3>
                  <p className="text-[#5f6368] text-sm mt-1">Configure a new voting event</p>
                </div>
              </button>
              
              <button className="bg-white p-5 rounded-xl border border-[#e0e0e0] hover:border-[#1a73e8] hover:shadow-md transition-all text-left group flex flex-col justify-between min-h-[140px]">
                <span className="material-symbols-outlined text-[#34a853] text-[28px] group-hover:scale-110 transition-transform">group_add</span>
                <div>
                  <h3 className="font-medium text-[#202124] text-lg">Invite Voters</h3>
                  <p className="text-[#5f6368] text-sm mt-1">Manage eligibility roster</p>
                </div>
              </button>

              <button className="bg-white p-5 rounded-xl border border-[#e0e0e0] hover:border-[#1a73e8] hover:shadow-md transition-all text-left group flex flex-col justify-between min-h-[140px]">
                <span className="material-symbols-outlined text-[#fbbc04] text-[28px] group-hover:scale-110 transition-transform">monitoring</span>
                <div>
                  <h3 className="font-medium text-[#202124] text-lg">Live Analytics</h3>
                  <p className="text-[#5f6368] text-sm mt-1">Monitor active turnout</p>
                </div>
              </button>
              
              <button className="bg-white p-5 rounded-xl border border-[#e0e0e0] hover:border-[#1a73e8] hover:shadow-md transition-all text-left group flex flex-col justify-between min-h-[140px]">
                <span className="material-symbols-outlined text-[#ea4335] text-[28px] group-hover:scale-110 transition-transform">settings</span>
                <div>
                  <h3 className="font-medium text-[#202124] text-lg">Org Settings</h3>
                  <p className="text-[#5f6368] text-sm mt-1">Manage global configuration</p>
                </div>
              </button>
            </div>

            {/* Active Elections Section */}
            <section className="bg-white rounded-xl border border-[#e0e0e0] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e0e0e0] flex items-center justify-between">
                <h2 className="text-lg font-medium text-[#202124]">Active Elections</h2>
                <Link to="/admin/elections" className="text-[#1a73e8] text-sm font-medium hover:underline">View All</Link>
              </div>
              
              <div className="divide-y divide-[#e0e0e0]">
                {loading ? (
                  <div className="p-8 text-center text-[#5f6368]">Loading elections...</div>
                ) : error ? (
                  <div className="p-8 text-center text-red-500">{error}</div>
                ) : elections.length === 0 ? (
                  <div className="p-8 text-center text-[#5f6368]">No active elections found.</div>
                ) : (
                  elections.map((election) => (
                    <div key={election.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f8f9fa] transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base font-medium text-[#202124]">{election.title}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] text-[11px] font-bold uppercase tracking-wider">
                            {election.status}
                          </span>
                        </div>
                        <p className="text-[#5f6368] text-sm">Ends {new Date(election.endDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <div className="text-xl font-medium text-[#202124]">{election._count?.votes || 0}</div>
                          <div className="text-[#5f6368] text-xs uppercase tracking-wider">Votes Cast</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button onClick={() => navigate(`/admin/elections/${election.id}/live`)} className="px-4 py-2 border border-[#dadce0] text-[#1a73e8] text-sm font-medium rounded hover:bg-[#f1f3f4] transition-colors">
                            Monitor
                          </button>
                          <button onClick={() => navigate(`/admin/elections/${election.id}/edit`)} className="p-2 border border-[#dadce0] text-[#5f6368] rounded hover:bg-[#f1f3f4] transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};