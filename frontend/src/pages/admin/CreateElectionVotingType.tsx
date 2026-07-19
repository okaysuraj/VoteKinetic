import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateElectionVotingType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('ranked_choice');

  const votingTypes = [
    {
      id: 'plurality',
      name: 'Plurality (FPTP)',
      icon: 'looks_one',
      description: 'Simple and direct. The candidate with the most votes wins, regardless of whether they have a majority.'
    },
    {
      id: 'ranked_choice',
      name: 'Ranked Choice',
      icon: 'format_list_numbered',
      description: 'Voters rank candidates by preference. If no one has a majority, the least popular are eliminated and votes redistributed.'
    },
    {
      id: 'approval',
      name: 'Approval Voting',
      icon: 'thumb_up',
      description: 'Voters can select as many candidates as they "approve" of. The candidate with the most approvals wins.'
    },
    {
      id: 'referendum',
      name: 'Referendum',
      icon: 'rule',
      description: 'A direct Yes/No vote on a specific proposal or policy change. Ideal for institutional decisions.'
    }
  ];

  const handleNext = () => {
    navigate('/admin/elections/new/security');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin')}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
            <span className="font-headline-md text-primary font-bold tracking-tight hidden md:block">VOTEKINETIC Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest hidden md:block">Admin Portal</span>
            <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto w-full px-4 md:px-8 py-8 flex-grow">
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-1">Voting Type</h1>
              <p className="text-sm text-on-surface-variant font-medium">Step 4 of 6: Select the mathematical model</p>
            </div>
            <span className="text-sm font-bold text-secondary">66.6% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-4/6 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-on-surface-variant mb-8 leading-relaxed max-w-3xl">
          Select the mathematical model used to calculate the winner. Each type offers different levels of representation and strategic complexity.
        </p>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {votingTypes.map((type) => (
            <div 
              key={type.id}
              className={`cursor-pointer rounded-xl p-6 transition-all group active:scale-[0.98] shadow-sm ${selectedType === type.id ? 'border-2 border-primary bg-surface' : 'border border-outline-variant bg-surface hover:border-primary'}`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl transition-colors ${selectedType === type.id ? 'bg-primary/10' : 'bg-surface-container group-hover:bg-primary/5'}`}>
                  <span className="material-symbols-outlined text-primary text-[28px]">{type.icon}</span>
                </div>
                <div className={`transition-opacity duration-200 ${selectedType === type.id ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{type.name}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>

      </main>

      {/* Action Buttons */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant py-4 md:py-6 z-50">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <button 
            className="flex items-center justify-center gap-2 px-6 h-12 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors active:scale-95"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back
          </button>
          
          <button 
            className="flex items-center justify-center gap-2 px-8 h-12 bg-primary text-white font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-95"
            onClick={handleNext}
          >
            Next Step
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </footer>

    </div>
  );
};
