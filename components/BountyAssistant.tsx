import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { generateBountyDraft } from '../services/geminiService';
import { BountyDraft } from '../types';

export const BountyAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<BountyDraft | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setDraft(null);

    try {
      const result = await generateBountyDraft(input);
      setDraft(result);
    } catch (err) {
      setError('Failed to generate bounty. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border rounded-2xl p-6 md:p-10 shadow-xl dark:shadow-[0_0_50px_rgba(188,19,254,0.1)] relative overflow-hidden group transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 dark:bg-mv-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-purple-200 dark:group-hover:bg-mv-purple/20 transition-colors duration-700 opacity-50 dark:opacity-100"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100 dark:bg-mv-cyan/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-cyan-200 dark:group-hover:bg-mv-cyan/20 transition-colors duration-700 opacity-50 dark:opacity-100"></div>

      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-purple-50 dark:bg-mv-purple/10 text-purple-700 dark:text-mv-purple text-xs font-bold uppercase tracking-widest mb-4 border border-purple-200 dark:border-mv-purple/30 shadow-sm dark:shadow-[0_0_15px_rgba(188,19,254,0.2)]">
          <Sparkles size={14} />
          <span>Powered by Gemini 2.5</span>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-display uppercase">Bounty Architect AI</h3>
        <p className="text-slate-600 dark:text-slate-400">Not sure how to structure your task? Describe it simply, and we'll draft it for you.</p>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g., I need a Python script to scrape Bitcoin price every hour..."
            className="flex-1 bg-slate-50 dark:bg-mv-dark border border-slate-300 dark:border-mv-border text-slate-900 dark:text-white rounded-sm px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-mv-cyan focus:border-cyan-500 dark:focus:border-mv-cyan placeholder-slate-400 dark:placeholder-slate-600 transition-all shadow-inner"
            aria-label="Describe your bounty idea"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-mv-cyan dark:to-mv-purple hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 dark:shadow-mv-cyan/20 flex items-center justify-center gap-2 min-w-[160px] font-display"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Draft <ArrowRight size={18} /></>}
          </button>
        </div>
        
        {error && <p className="text-red-500 dark:text-red-400 text-sm mt-3 text-center">{error}</p>}
      </div>

      {draft && (
        <div className="mt-10 bg-slate-50 dark:bg-mv-dark border border-slate-200 dark:border-mv-border rounded-xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-inner">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display uppercase">
              <CheckCircle2 className="text-cyan-600 dark:text-mv-cyan" size={20} /> 
              Draft Preview
            </h4>
            <span className="text-cyan-700 dark:text-mv-cyan font-mono font-bold bg-cyan-100 dark:bg-mv-cyan/10 px-3 py-1 rounded border border-cyan-200 dark:border-mv-cyan/20">
              {draft.estimatedSats.toLocaleString()} sats
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-bold font-display">Title</label>
              <p className="text-lg text-slate-900 dark:text-slate-200 font-medium">{draft.title}</p>
            </div>
            
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-bold font-display">Tags</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {draft.tags.map((tag, idx) => (
                  <span key={idx} className="bg-white dark:bg-mv-card text-slate-700 dark:text-slate-300 px-2 py-1 rounded-sm text-xs font-bold uppercase border border-slate-200 dark:border-mv-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-bold font-display">Description</label>
              <div className="mt-1 text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap bg-white dark:bg-mv-card p-4 rounded border border-slate-200 dark:border-mv-border font-mono">
                {draft.description}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
             <button className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white underline" onClick={() => setDraft(null)}>Discard</button>
             <button className="ml-4 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-6 py-2 rounded-sm font-bold text-sm uppercase tracking-wider transition-colors">
               Use This Draft
             </button>
          </div>
        </div>
      )}
    </div>
  );
};