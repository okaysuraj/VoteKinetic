import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useQuery } from '@tanstack/react-query';

const fetchElections = async () => {
  const res = await fetch('http://localhost:3000/api/elections');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export const VoterDashboard: React.FC = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['elections'], queryFn: fetchElections });
  const [selectedElection, setSelectedElection] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [voteReceipt, setVoteReceipt] = useState<string | null>(null);

  const handleVote = () => {
    if (!selectedCandidate) return;
    // Simulate encryption and submission. 
    // Real implementation would hit POST /api/vote/token then POST /api/vote/submit
    setVoteReceipt(`vk_receipt_${Math.random().toString(36).substring(2, 15)}`);
  };

  if (isLoading) return <div className="text-white text-center py-20">Loading elections...</div>;
  if (error) return <div className="text-red-400 text-center py-20">Error loading elections. Ensure backend is running.</div>;
  
  const elections = data?.elections || [];

  if (voteReceipt) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <GlassCard className="text-center space-y-6 p-10 border-green-500/30 bg-green-500/5">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Vote Submitted Securely</h2>
          <p className="text-gray-400">Your vote has been encrypted and recorded. Your identity is untraceable.</p>
          <div className="bg-black/40 p-4 rounded-lg font-mono text-sm text-green-300 break-all border border-green-500/20">
            Receipt: {voteReceipt}
          </div>
          <Button variant="outline" onClick={() => { setVoteReceipt(null); setSelectedElection(null); setSelectedCandidate(null); }}>
            Back to Dashboard
          </Button>
        </GlassCard>
      </div>
    );
  }

  if (selectedElection) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Select Your Candidate</h2>
          <Button variant="secondary" onClick={() => setSelectedElection(null)}>Cancel</Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* We would map through selectedElection's candidates here */}
          <GlassCard 
            className={`cursor-pointer transition-all ${selectedCandidate === 'c1' ? 'ring-2 ring-blue-500 bg-blue-500/10' : 'hover:bg-white/10'}`}
            onClick={() => setSelectedCandidate('c1')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white">Alice Johnson</h3>
                <p className="text-gray-400 text-sm mt-1">Experienced leader focused on campus sustainability.</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="flex justify-end pt-8 border-t border-white/10 mt-8">
          <Button 
            disabled={!selectedCandidate} 
            onClick={handleVote}
            className="text-lg px-8 py-3"
          >
            Encrypt & Submit Vote
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Your Elections</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elections.map((election: any) => (
          <GlassCard key={election.id} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${election.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                {election.status}
              </span>
              <span className="text-gray-400 text-sm text-right">Closes<br/>{election.endDate}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{election.title}</h3>
            
            <div className="mt-auto pt-6">
              <Button 
                variant={election.status === 'ACTIVE' ? 'primary' : 'secondary'} 
                className="w-full"
                disabled={election.status !== 'ACTIVE'}
                onClick={() => setSelectedElection(election.id)}
              >
                {election.status === 'ACTIVE' ? 'Cast Vote' : 'View Results'}
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
