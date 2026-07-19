import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../firebase';

const fetchOrgs = async () => {
  const token = await auth.currentUser?.getIdToken();
  const res = await fetch('http://localhost:3000/api/organizations', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch orgs');
  return res.json();
};

export const OrganizationDashboard: React.FC = () => {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['organizations'], queryFn: fetchOrgs });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrg, setNewOrg] = useState({ name: '', domain: '' });

  const handleCreateOrg = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('http://localhost:3000/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newOrg)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create organization');
      }
      setIsModalOpen(false);
      refetch();
      alert('Organization created successfully!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const orgs = data?.organizations || [];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Organizations</h2>
          <p className="text-gray-400 mt-1">Manage tenants and settings.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ New Organization</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {isLoading && <div className="text-white">Loading...</div>}
        {orgs.map((org: any) => (
          <GlassCard key={org.id} className="flex flex-col h-full border-blue-500/20">
            <h3 className="text-xl font-bold text-white mb-2">{org.name}</h3>
            {org.domain && <p className="text-gray-400 text-sm mb-4">Domain: {org.domain}</p>}
            
            <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
              <Button variant="secondary" className="w-full">Manage Users</Button>
              <Button variant="outline" className="w-full">Settings</Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
           <GlassCard className="w-full max-w-md p-8 relative border-green-500/30">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">Create Organization</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                    value={newOrg.name} onChange={e => setNewOrg({...newOrg, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Domain (Optional)</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                    value={newOrg.domain} onChange={e => setNewOrg({...newOrg, domain: e.target.value})} />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateOrg}>Create</Button>
              </div>
           </GlassCard>
        </div>
      )}
    </div>
  );
};
