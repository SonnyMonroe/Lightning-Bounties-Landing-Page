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
        if (line.trim().startsWith('```')) return null; 

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
      return <code key={index} className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200 dark:border-slate-700">{part.slice(1, -1)}</code>;
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
      setHistory([result]);
      setHistoryIndex(0);
      setViewMode('preview'); 
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
    if (JSON.stringify(newDraft) !== JSON.stringify(draft)) {
        addToHistory(newDraft);
    } else {
        setDraft(newDraft);
    }
  };

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

  const emojis = ['⚡', '₿', '🐛', '🚀', '✅', '❌', '🔧', '📦', '📝', '🔒'];

  return (
    <div className={`w-full max-w-4xl mx-auto my-8 bg-white dark:bg-[#020305] border border-slate-200 dark:border-slate-800 rounded-3xl p-1 shadow-2xl relative transition-all duration-300 ${draft ? 'ring-1 ring-mv-purple/20' : ''}`}>
      
      {!draft ? (
        <div className="p-8 md:p-12 relative overflow-hidden bg-slate-50 dark:bg-[#020305] rounded-[22px]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-mv-purple/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-mv-cyan/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-mv-purple/20 text-mv-purple-dark dark:text-mv-purple text-xs font-bold uppercase tracking-widest mb-6 border border-mv-purple/30 shadow-sm">
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Powered by Gemini 3</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-tight">Bounty Architect AI</h3>
                <p className="text-slate-700 dark:text-slate-400 text-lg">Not sure how to structure your task? Describe it simply, and we'll draft it for you.</p>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="flex flex-col gap-4">
                <div className="relative group">
                    <label htmlFor="bounty-idea-input" className="sr-only">Describe your bounty idea</label>
                    <input 
                        id="bounty-idea-input"
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="e.g., I need a Python script to scrape Bitcoin price every hour..."
                        className="w-full bg-white dark:bg-[#0a0a0f] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-6 py-5 focus:outline-none focus:border-mv-purple focus:ring-2 focus:ring-mv-purple/30 placeholder-slate-400 dark:placeholder-slate-600 transition-all shadow-inner text-lg"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-mv-cyan/20 to-mv-purple/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 blur-xl"></div>
                </div>
                
                <button 
                    onClick={handleGenerate}
                    disabled={loading || !input.trim()}
                    className="w-full md:w-auto md:self-end bg-gradient-to-r from-mv-cyan-dark to-mv-purple-dark dark:from-mv-cyan-dark dark:to-mv-purple-dark hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg shadow-mv-purple/20 hover:shadow-mv-purple/40 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 font-display focus:ring-4 focus:ring-mv-purple/50 focus:outline-none"
                    aria-busy={loading}
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Draft Bounty <ArrowRight size={18} /></>}
                </button>
                </div>
                
                {error && <p className="text-red-600 dark:text-red-400 text-sm mt-4 text-center bg-red-50 dark:bg-red-900/20 py-2 rounded border border-red-200 dark:border-red-900/50" role="alert">{error}</p>}
            </div>
        </div>
      ) : (
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
        <div className="flex flex-col bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300 rounded-3xl overflow-hidden min-h-[600px]" role="region" aria-label="Bounty Draft Editor">
            {/* Toolbar Header */}
            <div className="flex flex-col border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050508]">
                <div className="flex items-center justify-between p-4 md:p-6 pb-2">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-cyan-700 dark:text-cyan-400" size={24} aria-hidden="true" /> 
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest font-display">Draft Generated</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <button 
                            onClick={handleRegenerate}
                            disabled={loading}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-cyan-800 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2 focus:ring-2 focus:ring-mv-cyan focus:outline-none"
                            aria-label="Regenerate draft with AI"
                        >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
                            <span className="text-xs font-bold uppercase hidden sm:inline">Regenerate</span>
                        </button>
                    </div>
                </div>

                {/* Title Editor Input */}
                <div className="px-6 pb-4">
                     <label htmlFor="draft-title-input" className="sr-only">Bounty Title</label>
                     <input 
                        id="draft-title-input"
                        type="text" 
                        value={draft.title}
                        onChange={(e) => updateDraftContent('title', e.target.value)}
                        className="w-full bg-transparent text-2xl md:text-3xl font-bold text-slate-900 dark:text-white focus:outline-none placeholder-slate-400 dark:placeholder-slate-600 font-display uppercase tracking-wide border-b-2 border-transparent focus:border-mv-cyan transition-colors py-2"
                        placeholder="ISSUE TITLE"
                     />
                </div>

                {/* Editor Toolbar */}
                <div className="flex flex-wrap items-center justify-between px-6 py-2 gap-4 bg-slate-100 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1 bg-white dark:bg-black/20 p-1 rounded-lg border border-slate-200 dark:border-slate-800" role="tablist" aria-label="Editor View Options">
                        <button 
                            onClick={() => setViewMode('preview')}
                            role="tab"
                            aria-selected={viewMode === 'preview'}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all focus:ring-2 focus:ring-mv-cyan focus:outline-none ${viewMode === 'preview' ? 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:hover:text-slate-300'}`}
                        >
                            <Eye size={14} aria-hidden="true" /> Preview
                        </button>
                        <button 
                            onClick={() => setViewMode('edit')}
                            role="tab"
                            aria-selected={viewMode === 'edit'}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all focus:ring-2 focus:ring-mv-purple focus:outline-none ${viewMode === 'edit' ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-900 dark:text-purple-400 border border-purple-300 dark:border-purple-500/30 shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:hover:text-slate-300'}`}
                        >
                            <Edit3 size={14} aria-hidden="true" /> Edit
                        </button>
                    </div>

                    {viewMode === 'edit' && (
                        <div className="flex items-center gap-1 animate-in fade-in slide-in-from-top-2" role="toolbar" aria-label="Editor Formatting Tools">
                             <div className="flex items-center border-r border-slate-300 dark:border-slate-800 pr-2 mr-2 gap-1">
                                <button onClick={handleUndo} disabled={!canUndo} className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 rounded hover:bg-slate-200 dark:hover:bg-white/5 focus:ring-2 focus:ring-mv-cyan focus:outline-none" aria-label="Undo"><RotateCcw size={16} aria-hidden="true"/></button>
                                <button onClick={handleRedo} disabled={!canRedo} className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 rounded hover:bg-slate-200 dark:hover:bg-white/5 focus:ring-2 focus:ring-mv-cyan focus:outline-none" aria-label="Redo"><RotateCw size={16} aria-hidden="true"/></button>
                             </div>
                             
                             <div className="flex items-center gap-1">
                                <button onClick={() => insertText('**', '**')} className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-cyan-800 dark:hover:text-cyan-400 rounded hover:bg-slate-200 dark:hover:bg-white/5 focus:ring-2 focus:ring-mv-cyan focus:outline-none" aria-label="Bold Text"><Bold size={16} aria-hidden="true"/></button>
                                <button onClick={() => insertText('_', '_')} className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-cyan-800 dark:hover:text-cyan-400 rounded hover:bg-slate-200 dark:hover:bg-white/5 focus:ring-2 focus:ring-mv-cyan focus:outline-none" aria-label="Italic Text"><Italic size={16} aria-hidden="true"/></button>
                                <button onClick={() => insertText('\n- ')} className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-cyan-800 dark:hover:text-cyan-400 rounded hover:bg-slate-200 dark:hover:bg-white/5 focus:ring-2 focus:ring-mv-cyan focus:outline-none" aria-label="Insert Bulleted List"><List size={16} aria-hidden="true"/></button>
                                <div className="relative">
                                    <button 
                                      onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                                      className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 rounded hover:bg-slate-200 dark:hover:bg-white/5 focus:ring-2 focus:ring-mv-cyan focus:outline-none" 
                                      aria-label="Insert Emoji"
                                      aria-expanded={showEmojiPicker}
                                      aria-haspopup="true"
                                    >
                                      <Smile size={16} aria-hidden="true"/>
                                    </button>
                                    {showEmojiPicker && (
                                        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-[#0a0a0f] border border-slate-300 dark:border-slate-700 rounded-lg shadow-xl p-2 grid grid-cols-5 gap-1 z-50 w-40" role="dialog" aria-label="Emoji Picker">
                                            {emojis.map(emoji => (
                                                <button key={emoji} onClick={() => { insertText(emoji); setShowEmojiPicker(false); }} className="hover:bg-slate-100 dark:hover:bg-white/10 p-1 rounded text-lg focus:ring-2 focus:ring-mv-cyan focus:outline-none" aria-label={`Insert ${emoji} emoji`}>{emoji}</button>
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
                     <>
                     <label htmlFor="draft-description-editor" className="sr-only">Bounty Markdown Description Editor</label>
                     <textarea 
                        id="draft-description-editor"
                        ref={textareaRef}
                        value={draft.description}
                        onChange={(e) => updateDraftContent('description', e.target.value)}
                        className="w-full bg-transparent text-slate-900 dark:text-slate-300 p-6 md:p-8 resize-none focus:outline-none font-mono text-sm leading-relaxed custom-scrollbar min-h-[500px]"
                        spellCheck={false}
                     />
                     </>
                ) : (
                    <div className="w-full p-6 md:p-8 custom-scrollbar focus:outline-none" tabIndex={0} aria-label="Preview of bounty description">
                         <SimpleMarkdownRenderer content={draft.description} />
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0a0f] flex justify-between items-center">
                 <button 
                    onClick={onDiscard} 
                    className="flex items-center gap-2 text-slate-600 hover:text-red-700 dark:hover:text-red-500 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
                    aria-label="Discard this bounty draft"
                >
                    <Trash2 size={16} aria-hidden="true" /> Discard
                 </button>
                 
                 <div className="flex gap-3">
                     <button 
                        onClick={copyToClipboard}
                        className={`
                            px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-4 focus:outline-none
                            ${copied 
                                ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500/50' 
                                : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 hover:shadow-lg focus:ring-mv-cyan/50 hover:-translate-y-0.5 active:translate-y-0'}
                        `}
                        aria-live="polite"
                    >
                        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} 
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                     </button>
                 </div>
            </div>
        </div>
    );
}