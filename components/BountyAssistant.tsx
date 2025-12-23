import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Loader2, CheckCircle2, 
  Copy, Edit3, Eye, RotateCcw, RotateCw, 
  Bold, Italic, List, Smile, 
  Trash2, RefreshCw, Check
} from 'lucide-react';
import { generateBountyDraft } from '../services/geminiService';
import { BountyDraft } from '../types';

// Simple Markdown Parser for Preview
const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  
  return (
    <div className="font-sans text-sm md:text-base leading-relaxed text-slate-900 dark:text-slate-300 space-y-4">
      {lines.map((line, i) => {
        // Headers
        if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2 border-b border-slate-200 dark:border-slate-700 pb-1">{line.replace('### ', '')}</h3>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 border-b border-slate-200 dark:border-slate-700 pb-1">{line.replace('## ', '')}</h2>;
        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">{line.replace('# ', '')}</h1>;
        
        // List Items
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return (
            <div key={i} className="flex gap-2 ml-4">
               <span className="text-slate-400">•</span>
               <span>{formatInline(line.replace(/^[-*]\s/, ''))}</span>
            </div>
          );
        }

        // Code Blocks (Basic detection)
        if (line.trim().startsWith('```')) return null; // Skip fence lines in this simple parser

        // Empty lines
        if (!line.trim()) return <div key={i} className="h-2"></div>;

        // Paragraphs
        return <p key={i} className="min-h-[1em]">{formatInline(line)}</p>;
      })}
    </div>
  );
};

// Helper to format bold, italic, and inline code
const formatInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200 dark:border-slate-700">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

export const BountyAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<BountyDraft | null>(null);
  const [error, setError] = useState('');
  
  // Editor State
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview');
  const [history, setHistory] = useState<BountyDraft[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to add to history
  const addToHistory = (newDraft: BountyDraft) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newDraft);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setDraft(newDraft);
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const result = await generateBountyDraft(input);
      setDraft(result);
      // Reset history with new draft
      setHistory([result]);
      setHistoryIndex(0);
      setViewMode('preview'); // Default to preview on new generate
    } catch (err) {
      setError('Failed to generate bounty. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!draft) return;
    setLoading(true);
    try {
      // Re-use original input or prompt derived from current title?
      // Using original input is safer for "Regenerate" context
      const result = await generateBountyDraft(input || draft.title); 
      addToHistory(result);
      setViewMode('preview');
    } catch (err) {
      setError('Failed to regenerate.');
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDraft(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDraft(history[historyIndex + 1]);
    }
  };

  const updateDraftContent = (field: keyof BountyDraft, value: string) => {
    if (!draft) return;
    const newDraft = { ...draft, [field]: value };
    // Only add to history if distinct (debounce could be added here for typing)
    if (JSON.stringify(newDraft) !== JSON.stringify(draft)) {
        addToHistory(newDraft);
    } else {
        setDraft(newDraft);
    }
  };

  // Text manipulation helpers
  const insertText = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current || !draft) return;
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = draft.description;
    
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);
    
    const newText = `${before}${prefix}${selection}${suffix}${after}`;
    
    updateDraftContent('description', newText);
    
    // Restore focus and selection (roughly)
    setTimeout(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(start + prefix.length, end + prefix.length);
        }
    }, 0);
  };

  const copyToClipboard = () => {
    if (!draft) return;
    const content = `# ${draft.title}\n\n${draft.description}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple Emoji List
  const emojis = ['⚡', '₿', '🐛', '🚀', '✅', '❌', '🔧', '📦', '📝', '🔒'];

  return (
    <div className={`w-full max-w-4xl mx-auto my-8 bg-white dark:bg-[#020305] border border-slate-200 dark:border-slate-800 rounded-3xl p-1 shadow-2xl relative transition-all duration-300 ${draft ? 'ring-1 ring-purple-500/20' : ''}`}>
      
      {!draft ? (
        // Input View
        <div className="p-8 md:p-12 relative overflow-hidden bg-[#020305] rounded-[22px]">
             {/* Decorative background elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-purple-900/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <Sparkles size={14} />
                    <span>Powered by Gemini 3</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display uppercase tracking-tight">Bounty Architect AI</h3>
                <p className="text-slate-400 text-lg">Not sure how to structure your task? Describe it simply, and we'll draft it for you.</p>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="flex flex-col gap-4">
                <div className="relative group">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="e.g., I need a Python script to scrape Bitcoin price every hour..."
                        className="w-full bg-[#0a0a0f] border border-slate-700 text-white rounded-xl px-6 py-5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-slate-600 transition-all shadow-inner text-lg"
                        aria-label="Describe your bounty idea"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 blur-xl"></div>
                </div>
                
                <button 
                    onClick={handleGenerate}
                    disabled={loading || !input.trim()}
                    className="w-full md:w-auto md:self-end bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 font-display"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Draft <ArrowRight size={18} /></>}
                </button>
                </div>
                
                {error && <p className="text-red-400 text-sm mt-4 text-center bg-red-900/20 py-2 rounded border border-red-900/50">{error}</p>}
            </div>
        </div>
      ) : (
        // Draft View (In-place)
        <BountyEditor 
            draft={draft}
            viewMode={viewMode}
            setViewMode={setViewMode}
            updateDraftContent={updateDraftContent}
            handleRegenerate={handleRegenerate}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            loading={loading}
            textareaRef={textareaRef}
            insertText={insertText}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            emojis={emojis}
            copyToClipboard={copyToClipboard}
            copied={copied}
            onDiscard={() => { setDraft(null); }}
        />
      )}
    </div>
  );
};


// Extracted Sub-component for the Editor UI
interface BountyEditorProps {
    draft: BountyDraft;
    viewMode: 'edit' | 'preview';
    setViewMode: (m: 'edit' | 'preview') => void;
    updateDraftContent: (field: keyof BountyDraft, value: string) => void;
    handleRegenerate: () => void;
    handleUndo: () => void;
    handleRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    loading: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    insertText: (prefix: string, suffix?: string) => void;
    showEmojiPicker: boolean;
    setShowEmojiPicker: (show: boolean) => void;
    emojis: string[];
    copyToClipboard: () => void;
    copied: boolean;
    onDiscard: () => void;
}

const BountyEditor: React.FC<BountyEditorProps> = ({
    draft, viewMode, setViewMode, updateDraftContent,
    handleRegenerate, handleUndo, handleRedo, canUndo, canRedo, loading,
    textareaRef, insertText, showEmojiPicker, setShowEmojiPicker, emojis,
    copyToClipboard, copied, onDiscard
}) => {
    return (
        <div className="flex flex-col bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300 rounded-3xl overflow-hidden min-h-[600px]">
            {/* Toolbar Header */}
            <div className="flex flex-col border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050508]">
                {/* Top Row: Title & Main Actions */}
                <div className="flex items-center justify-between p-4 md:p-6 pb-2">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-cyan-600 dark:text-cyan-400" size={24} /> 
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-display">Draft Preview</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <button 
                            onClick={handleRegenerate}
                            disabled={loading}
                            className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                            title="Regenerate with AI"
                        >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            <span className="text-xs font-bold uppercase hidden sm:inline">Regenerate</span>
                        </button>
                    </div>
                </div>

                {/* Title Editor Input */}
                <div className="px-6 pb-4">
                     <input 
                        type="text" 
                        value={draft.title}
                        onChange={(e) => updateDraftContent('title', e.target.value)}
                        className="w-full bg-transparent text-2xl md:text-3xl font-bold text-slate-900 dark:text-white focus:outline-none placeholder-slate-400 dark:placeholder-slate-600 font-display uppercase tracking-wide border-b border-transparent focus:border-slate-300 dark:focus:border-slate-700 transition-colors py-2"
                        placeholder="ISSUE TITLE"
                     />
                </div>

                {/* Editor Toolbar */}
                <div className="flex flex-wrap items-center justify-between px-6 py-2 gap-4 bg-slate-100 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1 bg-white dark:bg-black/20 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                        <button 
                            onClick={() => setViewMode('preview')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'preview' ? 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            <Eye size={14} /> Preview
                        </button>
                        <button 
                            onClick={() => setViewMode('edit')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'edit' ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            <Edit3 size={14} /> Edit
                        </button>
                    </div>

                    {viewMode === 'edit' && (
                        <div className="flex items-center gap-1 animate-in fade-in slide-in-from-top-2">
                             <div className="flex items-center border-r border-slate-300 dark:border-slate-800 pr-2 mr-2 gap-1">
                                <button onClick={handleUndo} disabled={!canUndo} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 rounded hover:bg-slate-200 dark:hover:bg-white/5"><RotateCcw size={16}/></button>
                                <button onClick={handleRedo} disabled={!canRedo} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 rounded hover:bg-slate-200 dark:hover:bg-white/5"><RotateCw size={16}/></button>
                             </div>
                             
                             <div className="flex items-center gap-1">
                                <button onClick={() => insertText('**', '**')} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded hover:bg-slate-200 dark:hover:bg-white/5" title="Bold"><Bold size={16}/></button>
                                <button onClick={() => insertText('_', '_')} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded hover:bg-slate-200 dark:hover:bg-white/5" title="Italic"><Italic size={16}/></button>
                                <button onClick={() => insertText('\n- ')} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded hover:bg-slate-200 dark:hover:bg-white/5" title="Bullet List"><List size={16}/></button>
                                <div className="relative">
                                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-yellow-500 dark:hover:text-yellow-400 rounded hover:bg-slate-200 dark:hover:bg-white/5" title="Emoji"><Smile size={16}/></button>
                                    {showEmojiPicker && (
                                        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-2 grid grid-cols-5 gap-1 z-50 w-40">
                                            {emojis.map(emoji => (
                                                <button key={emoji} onClick={() => { insertText(emoji); setShowEmojiPicker(false); }} className="hover:bg-slate-100 dark:hover:bg-white/10 p-1 rounded text-lg">{emoji}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                             </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Editor Body */}
            <div className="flex-grow relative bg-white dark:bg-[#050508]">
                {viewMode === 'edit' ? (
                     <textarea 
                        ref={textareaRef}
                        value={draft.description}
                        onChange={(e) => updateDraftContent('description', e.target.value)}
                        className="w-full bg-transparent text-slate-900 dark:text-slate-300 p-6 md:p-8 resize-none focus:outline-none font-mono text-sm leading-relaxed custom-scrollbar min-h-[500px]"
                        spellCheck={false}
                     />
                ) : (
                    <div className="w-full p-6 md:p-8 custom-scrollbar">
                         <SimpleMarkdownRenderer content={draft.description} />
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0a0f] flex justify-between items-center">
                 <button 
                    onClick={onDiscard} 
                    className="flex items-center gap-2 text-slate-500 hover:text-red-500 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                    <Trash2 size={16} /> Discard
                 </button>
                 
                 <div className="flex gap-3">
                     <button 
                        onClick={copyToClipboard}
                        className={`
                            px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2
                            ${copied 
                                ? 'bg-green-500 text-white hover:bg-green-600' 
                                : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'}
                        `}
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />} 
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                     </button>
                 </div>
            </div>
        </div>
    );
}