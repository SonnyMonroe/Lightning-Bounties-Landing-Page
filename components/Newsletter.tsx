import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Please enter an email address.');
      return;
    }
    // Basic email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('error');
        setMessage('Please enter a valid email address like example@mysite.com.');
        return;
    }

    setStatus('loading');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="relative z-10 py-16 bg-white dark:bg-[#020305] border-t border-slate-200 dark:border-mv-border transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {status === 'success' ? (
             <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-lg p-8 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle className="text-green-500 w-12 h-12 mb-3" />
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 font-display uppercase tracking-wide">Thanks for submitting!</h3>
                <p className="text-green-700 dark:text-green-300 mt-2">You've been added to the list.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200 underline"
                >
                    Back to form
                </button>
             </div>
        ) : (
            <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-display uppercase tracking-wide mb-3 flex flex-wrap items-center justify-center gap-3">
                    Subscribe to Lightning Bounties News <span className="text-3xl rotate-45 inline-block">📎</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
                    Join our email list to stay in touch with our news
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-xl">
                    <div className="flex flex-col text-left">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Enter your email here *
                        </label>
                        <div className="flex flex-col sm:flex-row gap-0 shadow-sm">
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (status === 'error') setStatus('idle');
                                }}
                                className={`flex-grow bg-white dark:bg-[#1a1b26] border ${status === 'error' ? 'border-red-500 z-10' : 'border-slate-300 dark:border-slate-700'} text-slate-900 dark:text-white px-4 py-3 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 focus:z-20 transition-colors rounded-t-sm sm:rounded-l-sm sm:rounded-tr-none h-12 appearance-none`}
                                placeholder=""
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-mv-cyan dark:hover:bg-cyan-300 text-white dark:text-slate-900 font-bold uppercase tracking-wider px-8 py-3 rounded-b-sm sm:rounded-r-sm sm:rounded-bl-none transition-colors disabled:opacity-70 disabled:cursor-not-allowed h-12 flex items-center justify-center min-w-[120px]"
                            >
                                {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Sign Up'}
                            </button>
                        </div>
                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-500 mt-2 text-sm animate-in slide-in-from-top-1">
                                <AlertCircle size={16} />
                                <span>{message}</span>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        )}
      </div>
    </section>
  );
};