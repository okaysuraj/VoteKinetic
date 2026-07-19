import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const CandidateList: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const token = await user?.getIdToken();
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        
        const res = await fetch(`${API_URL}/elections/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch election details');
        }
        
        const data = await res.json();
        setElection(data.election);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchElection();
    }
  }, [id, user]);

  return (
    <div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden">
      {/* SideNavBar (Simplified for this view) */}
      <nav className="bg-surface-container-low text-primary flex flex-col h-full py-stack-lg px-stack-md fixed left-0 top-0 w-64 border-r border-outline-variant">
        <div className="mb-stack-lg flex items-center gap-3">
          <div>
            <div className="font-headline-md text-headline-md font-bold text-primary">Election Management</div>
            <div className="text-on-surface-variant font-label-sm text-label-sm">Official Portal</div>
          </div>
        </div>
        <button 
          className="mb-stack-md w-full bg-primary text-on-primary py-3 rounded flex items-center justify-center gap-2 hover:bg-primary-container transition-colors min-h-[48px]"
          onClick={() => navigate(`/admin/elections/${id}/candidates/new`)}
        >
          <span className="material-symbols-outlined">add</span>
          New Registration
        </button>
        <div className="flex-1 flex flex-col gap-2">
          <Link to="/admin" className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <div className="flex items-center gap-3 p-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg">
            <span className="material-symbols-outlined">list</span>
            Candidate List
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="w-full bg-surface border-b border-outline-variant py-4 px-margin-desktop flex justify-between items-center z-10 sticky top-0">
          <div className="font-headline-md text-headline-md font-bold text-primary tracking-tight">VOTEKINETIC</div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-margin-desktop flex flex-col gap-stack-lg max-w-[1200px] w-full mx-auto">
          {loading ? (
            <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
          ) : error ? (
            <div className="bg-error-container text-on-error-container p-4 rounded-lg">{error}</div>
          ) : !election ? (
            <div className="bg-error-container text-on-error-container p-4 rounded-lg">Election not found.</div>
          ) : (
            <>
              <div className="flex flex-col gap-stack-md">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="font-display-lg text-display-lg text-primary">Candidate Roster</h1>
                    <p className="text-on-surface-variant mt-2">Manage and verify registered candidates for {election.title}.</p>
                  </div>
                </div>
                
                {/* Bento Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Total Registered</span>
                    <div className="font-headline-lg text-headline-lg text-primary">{election.candidates?.length || 0}</div>
                  </div>
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Election Status</span>
                    <div className="font-headline-lg text-headline-lg text-primary">{election.status}</div>
                  </div>
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5"></div>
                    <div className="relative z-10 flex flex-col gap-2">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Verification Status</span>
                      <div className="font-headline-lg text-headline-lg text-primary flex items-baseline gap-2">
                        100% <span className="font-label-md text-label-md text-secondary">Cleared</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-gutter items-center justify-between bg-surface-container-low p-stack-md rounded-xl border border-outline-variant">
                <div className="flex-1 w-full relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                  <input className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border-outline-variant rounded focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md min-h-[48px]" placeholder="Search by name or ID..." type="text"/>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex-1">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant bg-surface-container-low">
                        <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Candidate Name</th>
                        <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Party / Bio</th>
                        <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant font-body-md">
                      {election.candidates?.length === 0 ? (
                        <tr><td colSpan={3} className="py-8 px-6 text-center text-on-surface-variant">No candidates found.</td></tr>
                      ) : (
                        election.candidates?.map((candidate: any) => (
                          <tr key={candidate.id} className="hover:bg-surface-container transition-colors group">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border border-outline-variant bg-surface-variant flex items-center justify-center text-on-surface-variant">
                                  <span className="material-symbols-outlined">person</span>
                                </div>
                                <div>
                                  <div className="font-label-md text-label-md text-primary group-hover:text-secondary transition-colors">{candidate.name}</div>
                                  <div className="font-label-sm text-label-sm text-on-surface-variant">ID: {candidate.id.substring(0, 8)}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-on-background">{candidate.bio || 'Independent'}</td>
                            <td className="py-4 px-6 text-right">
                              <button className="text-secondary hover:text-primary transition-colors p-2 rounded hover:bg-surface-variant inline-flex items-center justify-center">
                                <span className="material-symbols-outlined">more_vert</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
