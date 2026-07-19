import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const CandidateDetails: React.FC = () => {
  const { electionId, candidateId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const token = await user?.getIdToken();
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        
        const res = await fetch(`${API_URL}/elections/${electionId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          const cand = data.election.candidates.find((c: any) => c.id === candidateId);
          setCandidate(cand);
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchElection();
    }
  }, [electionId, candidateId, user]);

  return (
    <div className="bg-background text-on-background font-body-md h-screen flex flex-col p-8">
      <button onClick={() => navigate(-1)} className="self-start mb-4 text-secondary hover:underline">
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Candidate Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !candidate ? (
        <p>Candidate not found.</p>
      ) : (
        <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant max-w-2xl">
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Bio:</strong> {candidate.bio}</p>
          <p><strong>ID:</strong> {candidate.id}</p>
        </div>
      )}
    </div>
  );
};
