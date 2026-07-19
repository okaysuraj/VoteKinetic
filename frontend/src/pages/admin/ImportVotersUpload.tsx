import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const ImportVotersUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
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

      <main className="max-w-[1200px] mx-auto w-full px-4 md:px-8 py-8 flex-grow">
        
        <div className="mb-8 border-b border-outline-variant pb-6">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
            <span className="font-bold text-xs uppercase tracking-wider">Voter Management</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Import Voter Registry</h1>
          <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
            Upload your voter records in CSV format to synchronize with the official database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Upload Area */}
          <div className="lg:col-span-8 bg-surface border border-outline-variant rounded-xl p-6 md:p-10 shadow-sm flex flex-col">
            <div 
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center min-h-[360px] transition-all cursor-pointer group ${dragOver ? 'border-primary bg-primary/5' : file ? 'border-[#16a34a] bg-[#f0fdf4]' : 'border-outline-variant hover:border-secondary hover:bg-surface-container-low'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm ${file ? 'bg-[#bbf7d0]' : 'bg-surface-container-high'}`}>
                <span className={`material-symbols-outlined text-5xl ${file ? 'text-[#16a34a]' : 'text-secondary'}`}>
                  {file ? 'check_circle' : 'cloud_upload'}
                </span>
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 text-center ${file ? 'text-[#166534]' : 'text-primary'}`}>
                {file ? file.name : 'Drag and drop file'}
              </h3>
              
              <p className="font-medium text-on-surface-variant text-center mb-8">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB • Ready for processing` : 'Support for .csv, .xlsx (Max 25MB)'}
              </p>
              
              {!file && (
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined">search</span> Browse Files
                </button>
              )}
              
              <input 
                accept=".csv,.xlsx" 
                className="hidden" 
                ref={fileInputRef} 
                type="file" 
                onChange={handleFileChange}
              />
            </div>
            
            <div className="mt-8 flex items-center justify-between text-on-surface-variant pt-6 border-t border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">info</span>
                <span className="text-xs font-bold uppercase tracking-wider">Secure end-to-end encryption active</span>
              </div>
              <button className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">download</span> Download CSV Template
              </button>
            </div>
          </div>

          {/* Guidance & Requirements */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">list_alt</span>
                Required Headers
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <code className="bg-surface-container-high px-3 py-1.5 rounded font-mono text-sm font-bold border border-outline-variant">VOTER_ID</code>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <code className="bg-surface-container-high px-3 py-1.5 rounded font-mono text-sm font-bold border border-outline-variant">NAME</code>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                  <code className="bg-surface-container-high px-3 py-1.5 rounded font-mono text-sm font-bold border border-outline-variant">EMAIL</code>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-outline-variant">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Ensure all required columns are present in the first row of your file. Data validation occurs automatically upon upload.
                </p>
              </div>
            </div>

            <div className="bg-primary text-white rounded-xl p-6 flex flex-col justify-between overflow-hidden relative min-h-[160px] shadow-sm">
              <div className="relative z-10">
                <h4 className="font-bold mb-2">Institutional Security</h4>
                <p className="text-sm text-white/80 leading-relaxed">All uploaded data is processed in a secure environment and immediately anonymized.</p>
              </div>
              <span className="material-symbols-outlined text-[120px] absolute -bottom-6 -right-6 text-white/10">lock</span>
              <div className="relative z-10 mt-6 flex items-center gap-2 bg-black/20 w-fit px-3 py-1.5 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4ade80]">Server: Verified</span>
              </div>
            </div>
            
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-outline-variant flex items-center justify-between">
          <button className="px-8 py-3 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container-high transition-colors" onClick={() => navigate(-1)}>
            Cancel Import
          </button>
          <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-on-surface-variant italic">
              {file ? 'File validated successfully' : 'No file selected'}
            </p>
            <button 
              className={`px-8 py-3 font-bold rounded-lg transition-all shadow-sm flex items-center gap-2 ${file ? 'bg-secondary text-white hover:bg-secondary/90' : 'bg-surface-container-highest text-on-surface-variant opacity-50 cursor-not-allowed'}`} 
              disabled={!file}
              onClick={() => {
                alert('Proceeding to field mapping screen. Action audited.');
                navigate('/admin');
              }}
            >
              Continue to Mapping
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
