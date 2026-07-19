import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../firebase';

const fetchAllElections = async () => {
  const token = await auth.currentUser?.getIdToken();
  const res = await fetch('http://localhost:3000/api/elections/all', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch elections');
  return res.json();
};

const fetchOrgs = async () => {
  const token = await auth.currentUser?.getIdToken();
  const res = await fetch('http://localhost:3000/api/organizations', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch orgs');
  return res.json();
};

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({ totalUsers: 0, totalElections: 0, totalVotes: 0 });

  useEffect(() => {
    let evtSource: EventSource;

    const setupSSE = async () => {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      evtSource = new EventSource(`http://localhost:3000/api/admin/metrics/live?token=${token}`);
      
      evtSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMetrics(data);
      };
      
      evtSource.onerror = (err) => {
        console.error("SSE Error:", err);
      };
    };

    setupSSE();

    return () => {
      if (evtSource) evtSource.close();
    };
  }, []);

  const { data: electionsData } = useQuery({ queryKey: ['admin-elections'], queryFn: fetchAllElections });
  const { data: orgsData } = useQuery({ queryKey: ['admin-orgs'], queryFn: fetchOrgs });
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Form State
  const [newElection, setNewElection] = useState({ title: '', description: '', startDate: '', endDate: '', organizationId: '' });
  const [candidates, setCandidates] = useState([{ name: '', bio: '' }]);

  const handleCreateElection = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      // Ensure dates are valid ISO strings
      const payload = {
        ...newElection,
        startDate: new Date(newElection.startDate).toISOString(),
        endDate: new Date(newElection.endDate).toISOString(),
        candidates
      };
      const res = await fetch('http://localhost:3000/api/elections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create election');
      }
      setIsWizardOpen(false);
      alert('Election created successfully!');
      // In a real app, invalidate query here
    } catch (error: any) {
      alert(error.message);
    }
  };

  const elections = electionsData?.elections || [];
  const orgs = orgsData?.organizations || [];
  
  // For the bar chart, we can show total votes per election as a simple metric if available,
  // or fallback to mock data if empty.
  const chartData = elections.length > 0 
    ? elections.map((e: any) => ({ name: e.title.substring(0, 10), votes: e._count?.votes || 0 }))
    : [{ name: 'No Data', votes: 0 }];
    
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-gray-400 mt-1">Manage elections and view analytics.</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => window.location.href='/organizations'}>Organizations</Button>
          <Button onClick={() => setIsWizardOpen(true)}>+ New Election</Button>
        </div>
      </div>

      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
           <GlassCard className="w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto relative border-blue-500/30">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setIsWizardOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">Create New Election</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Organization</label>
                  <select 
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                    value={newElection.organizationId}
                    onChange={(e) => setNewElection({...newElection, organizationId: e.target.value})}
                  >
                    <option value="">Select Organization</option>
                    {orgs.map((org: any) => (
                      <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                    value={newElection.title} onChange={e => setNewElection({...newElection, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <textarea className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                    value={newElection.description} onChange={e => setNewElection({...newElection, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                    <input type="datetime-local" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                      value={newElection.startDate} onChange={e => setNewElection({...newElection, startDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                    <input type="datetime-local" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                      value={newElection.endDate} onChange={e => setNewElection({...newElection, endDate: e.target.value})} />
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-bold text-white mb-2">Candidates</h3>
                  {candidates.map((c, i) => (
                    <div key={i} className="space-y-2 mb-4 p-4 border border-white/5 rounded-lg bg-white/5">
                      <input type="text" placeholder="Candidate Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                        value={c.name} onChange={e => {
                          const newC = [...candidates];
                          newC[i].name = e.target.value;
                          setCandidates(newC);
                        }} />
                      <input type="text" placeholder="Short Bio" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                        value={c.bio} onChange={e => {
                          const newC = [...candidates];
                          newC[i].bio = e.target.value;
                          setCandidates(newC);
                        }} />
                    </div>
                  ))}
                  <Button variant="secondary" className="w-full" onClick={() => setCandidates([...candidates, {name:'', bio:''}])}>
                    + Add Candidate
                  </Button>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setIsWizardOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateElection}>Create Election</Button>
              </div>
           </GlassCard>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-6">Total Votes Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }} 
                  />
                  <Bar dataKey="votes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Election List</h3>
            </div>
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="text-xs uppercase bg-white/5 text-gray-300">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Turnout</th>
                  <th className="px-4 py-3 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {elections.map((election: any) => (
                  <tr key={election.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 text-white font-medium">{election.title}</td>
                    <td className="px-4 py-4">
                      <span className={election.status === 'ACTIVE' ? 'text-green-400' : 'text-yellow-400'}>
                        {election.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">{election._count?.votes || 0} votes</td>
                    <td className="px-4 py-4"><Button variant="outline" className="text-xs py-1 px-3">Manage</Button></td>
                  </tr>
                ))}
                {elections.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">No elections found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20">
            <h3 className="text-lg font-bold text-white mb-2">Platform Metrics</h3>
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Total Users</span>
                  <span className="text-white">{metrics?.totalUsers || 0}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Total Elections</span>
                  <span className="text-white">{metrics?.totalElections || 0}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Total Votes Cast</span>
                  <span className="text-white">{metrics?.totalVotes || 0}</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start text-left">Generate Voter Tokens</Button>
              <Button variant="secondary" className="w-full justify-start text-left">Import Voter List (CSV)</Button>
              <Button variant="danger" className="w-full justify-start text-left">Emergency Freeze</Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
