import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const CreateElection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);

  const [formData, setFormData] = useState({
    organizationId: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const [candidates, setCandidates] = useState([{ name: '', bio: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const token = await user?.getIdToken();
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
        const res = await fetch(`${API_URL}/organizations`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setOrganizations(data.organizations || []);
          if (data.organizations?.length > 0) {
            setFormData(f => ({ ...f, organizationId: data.organizations[0].id }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch orgs", err);
      } finally {
        setLoadingOrgs(false);
      }
    };
    
    if (user) {
      fetchOrgs();
    }
  }, [user]);

  const handleAddCandidate = () => {
    setCandidates([...candidates, { name: '', bio: '' }]);
  };

  const handleCandidateChange = (index: number, field: 'name' | 'bio', value: string) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = value;
    setCandidates(newCandidates);
  };

  const handleRemoveCandidate = (index: number) => {
    const newCandidates = [...candidates];
    newCandidates.splice(index, 1);
    setCandidates(newCandidates);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = await user?.getIdToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      
      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        candidates: candidates.filter(c => c.name.trim() !== '')
      };

      const res = await fetch(`${API_URL}/elections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create election');
      }
      
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <header className="bg-surface border-b border-outline-variant flex justify-between items-center px-margin-desktop w-full mx-auto h-20 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-headline-lg text-headline-lg text-primary tracking-tight">VOTEKINETIC</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-2 font-label-md text-label-md"
            onClick={() => navigate('/admin')}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
            Cancel Creation
          </button>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-stack-sm">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">New Election</h1>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-lg font-label-md">
            {error}
          </div>
        )}

        <form className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm flex flex-col gap-stack-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <h2 className="font-headline-md text-headline-md text-on-surface">Basic Information</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Define the core identity and schedule of this election event.</p>
          </div>

          <div className="flex flex-col gap-gutter">
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface">Organization</label>
              {loadingOrgs ? (
                <div className="h-12 flex items-center"><div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div></div>
              ) : (
                <select 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md"
                  value={formData.organizationId}
                  onChange={(e) => setFormData({...formData, organizationId: e.target.value})}
                  required
                >
                  <option value="" disabled>Select an Organization</option>
                  {organizations.map(org => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface">Election Title *</label>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none" 
                placeholder="e.g., 2024 Board of Directors Election" 
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface">Election Description</label>
              <textarea 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-y" 
                placeholder="Enter details about the purpose of this election..." 
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface">Start Date & Time *</label>
                <input 
                  type="datetime-local" 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md" 
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface">End Date & Time *</label>
                <input 
                  type="datetime-local" 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md" 
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-outline-variant pt-stack-lg mt-stack-sm flex flex-col gap-stack-md">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface">Candidates</h2>
              <button 
                type="button" 
                className="text-secondary font-label-md hover:underline flex items-center gap-1"
                onClick={handleAddCandidate}
              >
                <span className="material-symbols-outlined text-[18px]">add</span> Add Candidate
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {candidates.map((c, idx) => (
                <div key={idx} className="bg-surface-container-low p-4 rounded-lg border border-outline-variant flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex-1 flex flex-col gap-2 w-full">
                    <label className="font-label-sm text-on-surface-variant">Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md" 
                      placeholder="Candidate Name"
                      value={c.name}
                      onChange={(e) => handleCandidateChange(idx, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2 w-full">
                    <label className="font-label-sm text-on-surface-variant">Bio / Party</label>
                    <input 
                      type="text" 
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md" 
                      placeholder="Short bio or party"
                      value={c.bio}
                      onChange={(e) => handleCandidateChange(idx, 'bio', e.target.value)}
                    />
                  </div>
                  {candidates.length > 1 && (
                    <button 
                      type="button" 
                      className="text-error p-2 hover:bg-error-container rounded-full mt-6"
                      onClick={() => handleRemoveCandidate(idx)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-stack-sm mt-stack-md">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`h-12 px-8 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm ${isSubmitting ? 'opacity-70' : ''}`}
            >
              {isSubmitting ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>Deploy Election <span className="material-symbols-outlined text-[20px]">rocket_launch</span></>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
