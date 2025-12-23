import React, { useState } from 'react';
import { Zap, X, Linkedin, Github, Youtube, Sun, Moon, Loader2, CheckCircle, AlertCircle, Check } from 'lucide-react';

// Custom Icon for Nostr (reused here)
const NostrIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
     <path d="M20.06 14.78c-.28 0-.54.05-.79.13-.23-.62-.64-1.16-1.17-1.55.03-.18.05-.37.05-.56 0-1.84-1.49-3.33-3.33-3.33-1.84 0-3.33 1.49-3.33 3.33 0 .19.02.38.05.56-.53.39-.94.93-1.17 1.55-.25-.08-.51-.13-.79-.13-1.47 0-2.67 1.19-2.67 2.67s1.2 2.67 2.67 2.67c.28 0 .54-.05.79-.13.23.62.64 1.16 1.17 1.55-.03.18-.05.37-.05.56 0 .52.12 1.01.32 1.46-2.1-.47-3.92-1.74-5.04-3.52 1.25-1.79 3.25-3.05 5.54-3.23.41-1.99 1.95-3.56 3.91-4.04C15.42 12.06 14.86 11 14 11c-1.66 0-3 1.34-3 3 0 .18.02.35.05.52-.77.26-1.42.78-1.86 1.45-.63-.19-1.3-.29-2-.29-3.14 0-5.83 1.93-6.91 4.72 1.28 2.38 3.65 4.14 6.46 4.51.58 1.41 1.98 2.41 3.61 2.41 2.16 0 3.92-1.76 3.92-3.92 0-.19-.02-.38-.05-.56.53-.39.94-.93 1.17-1.55.25.08.51.13.79.13 1.47 0 2.67-1.19 2.67-2.67s-1.2-2.64-2.67-2.64zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8-8 8z"/>
     <circle cx="15.5" cy="5.5" r="1.5" />
  </svg>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Enter an email address like example@mysite.com.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('error');
        setMessage('Enter an email address like example@mysite.com.');
        return;
    }
    if (!agreed) {
        setStatus('error');
        setMessage('Please agree to subscribe.');
        return;
    }

    setStatus('loading');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setMessage('Thanks for submitting!');
      setEmail('');
      setAgreed(false);
    }, 1500);
  };

  if (status === 'success') {
      return (
        <div className="h-full flex flex-col justify-center items-start animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                <CheckCircle size={24} />
                <h3 className="text-lg font-bold font-display uppercase tracking-wide">Success</h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">Thanks for submitting!</p>
            <button 
                onClick={() => setStatus('idle')} 
                className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-200 underline"
            >
                Subscribe another
            </button>
        </div>
      );
  }

  return (
    <div className="flex flex-col">
        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider font-display">
            Subscribe to Our Newsletter
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="email-input" className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    Email *
                </label>
                <input 
                    id="email-input"
                    type="text" 
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                    }}
                    className={`bg-slate-50 dark:bg-white/5 border ${status === 'error' ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-sm px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`}
                />
                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-xs mt-1 animate-in slide-in-from-top-1 font-medium">
                        <AlertCircle size={14} />
                        <span>{message}</span>
                    </div>
                )}
            </div>

            <label className="flex items-start gap-3 group cursor-pointer relative">
                <input 
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="peer sr-only"
                />
                <div className={`mt-0.5 w-5 h-5 flex-shrink-0 border rounded-sm flex items-center justify-center transition-colors 
                    border-slate-400 dark:border-slate-600 bg-transparent
                    peer-focus:ring-2 peer-focus:ring-cyan-500 peer-focus:border-cyan-500
                    peer-checked:bg-cyan-600 peer-checked:border-cyan-600
                `}>
                    <Check size={14} className={`text-white transition-opacity ${agreed ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-tight select-none">
                    Yes, subscribe me to your newsletter. *
                </span>
            </label>

            <button 
                type="submit" 
                disabled={status === 'loading'}
                className="mt-2 w-full sm:w-auto bg-transparent border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors uppercase font-bold text-sm tracking-wider py-3 px-6 rounded-sm disabled:opacity-50 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
                 {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 'Submit'}
            </button>
        </form>
    </div>
  );
}

interface FooterProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onNavigate: (view: 'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms' | 'about' | 'features') => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, toggleTheme, onNavigate }) => {
  const [footerLogoError, setFooterLogoError] = useState(false);

  return (
    <footer className="relative z-10 bg-white dark:bg-[#020305] border-t border-slate-200 dark:border-mv-border pt-16 pb-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 xl:gap-20">
                {/* Left Column: Brand & Socials */}
                <div className="lg:w-3/12 flex flex-col items-start justify-between">
                    <div>
                        <div className="relative mb-6 z-0">
                        <button 
                            onClick={() => onNavigate('home')}
                            className="group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1 -ml-1 text-left"
                            aria-label="Go to homepage"
                        >
                            {!footerLogoError ? (
                                <img 
                                    src="images/logo2.png"
                                    alt="Lightning Bounties" 
                                    className="w-48 h-auto object-contain object-left"
                                    onError={() => setFooterLogoError(true)}
                                />
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="bg-cyan-100 dark:bg-mv-cyan/20 p-2 rounded-lg border border-cyan-200 dark:border-mv-cyan/50 group-hover:border-mv-cyan-dark dark:group-hover:border-mv-cyan transition-colors">
                                    <Zap className="h-5 w-5 text-mv-cyan-dark dark:text-mv-cyan fill-current" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                    <span className="font-display font-bold text-xl leading-none text-slate-900 dark:text-white uppercase tracking-wider group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors">Lightning</span>
                                    <span className="font-display font-bold text-base leading-none text-mv-cyan-dark dark:text-mv-cyan uppercase tracking-[0.2em]">Bounties</span>
                                    </div>
                                </div>
                            )}
                        </button>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed max-w-sm mb-8 font-medium">
                            Accelerating open-source development one bounty at a time.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-display">Follow Us On:</h3>
                        <div className="flex gap-4 text-slate-600 dark:text-slate-400">
                            <a href="https://x.com/LBounties" className="hover:text-slate-900 dark:hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 transition-all focus:outline-none focus:text-slate-900 dark:focus:text-white focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-sm" title="X (Twitter)" aria-label="Follow us on X (Twitter)"><X size={20} /></a>
                            <a href="https://www.linkedin.com/company/lightning-bounties/" className="hover:text-blue-600 dark:hover:text-blue-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 transition-all focus:outline-none focus:text-blue-600 dark:focus:text-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-sm" title="LinkedIn" aria-label="Follow us on LinkedIn"><Linkedin size={20} /></a>
                            <a href="https://github.com/SonnyMonroe/Lightning-Issues" className="hover:text-slate-900 dark:hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 transition-all focus:outline-none focus:text-slate-900 dark:focus:text-white focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-sm" title="GitHub" aria-label="Follow us on GitHub"><Github size={20} /></a>
                            <a href="https://primal.net/p/nprofile1qqsxjszwrjqxjetnfeh9r2kea3jyz4uqxedyawwq58f2cc4uqwtrq7gyjy2yn" className="hover:text-mv-purple-dark dark:hover:text-mv-purple hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 transition-all focus:outline-none focus:text-mv-purple-dark dark:focus:text-mv-purple focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-sm" title="Nostr" aria-label="Follow us on Nostr"><NostrIcon size={20} /></a>
                            <a href="https://www.youtube.com/@LightningBounties" className="hover:text-red-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 transition-all focus:outline-none focus:text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-sm" title="YouTube" aria-label="Subscribe to our YouTube channel"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Middle Column: Links Grid */}
                <div className="lg:w-5/12 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <nav aria-label="Footer Platform Navigation">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider font-display text-mv-cyan-dark dark:text-mv-cyan">Platform</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><a href="https://app.lightningbounties.com/" className="hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-all duration-300 block hover:translate-x-2 focus:outline-none focus:underline">Browse Bounties</a></li>
                            <li><a href="#" className="hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-all duration-300 block hover:translate-x-2 focus:outline-none focus:underline">Post a Task</a></li>
                            <li><a href="https://discord.com/invite/zBxj4x4Cbq" className="hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-all duration-300 block hover:translate-x-2 focus:outline-none focus:underline">Support</a></li>
                        </ul>
                    </nav>

                    <nav aria-label="Footer Explore Navigation">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider font-display text-mv-purple-dark dark:text-mv-purple">Explore</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li>
                              <button onClick={() => onNavigate('about')} className="hover:text-mv-purple-dark dark:hover:text-mv-purple transition-all duration-300 text-left focus:outline-none focus:underline hover:translate-x-2 w-full">
                                About
                              </button>
                            </li>
                            <li>
                              <button onClick={() => onNavigate('how-it-works')} className="hover:text-mv-purple-dark dark:hover:text-mv-purple transition-all duration-300 text-left focus:outline-none focus:underline hover:translate-x-2 w-full">
                                How it Works
                              </button>
                            </li>
                            <li>
                              <button onClick={() => onNavigate('features')} className="hover:text-mv-purple-dark dark:hover:text-mv-purple transition-all duration-300 text-left focus:outline-none focus:underline hover:translate-x-2 w-full">
                                Features
                              </button>
                            </li>
                             <li>
                              <button onClick={() => onNavigate('team')} className="hover:text-mv-purple-dark dark:hover:text-mv-purple transition-all duration-300 text-left focus:outline-none focus:underline hover:translate-x-2 w-full">
                                Team
                              </button>
                            </li>
                            <li>
                              <button onClick={() => onNavigate('faq')} className="hover:text-mv-purple-dark dark:hover:text-mv-purple transition-all duration-300 text-left focus:outline-none focus:underline hover:translate-x-2 w-full">
                                FAQ
                              </button>
                            </li>
                        </ul>
                    </nav>

                    <nav aria-label="Footer Resources Navigation">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider font-display text-blue-600 dark:text-blue-400">Resources</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><a href="https://docs.lightningbounties.com/docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 block hover:translate-x-2 focus:outline-none focus:underline">Docs</a></li>
                            <li><a href="https://issues.lightningbounties.com/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 block hover:translate-x-2 focus:outline-none focus:underline">Issue Generator</a></li>
                            <li><a href="https://issues.lightningbounties.com/templates" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 block hover:translate-x-2 focus:outline-none focus:underline">Issue Templates</a></li>
                            <li><a href="https://blog.lightningbounties.com/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 block hover:translate-x-2 focus:outline-none focus:underline">Blog</a></li>
                        </ul>
                    </nav>
                </div>

                {/* Right Column: Newsletter Form */}
                <div className="lg:w-4/12">
                    <NewsletterForm />
                </div>
            </div>
            
            {/* Copyright Bar */}
            <div className="border-t border-slate-200 dark:border-mv-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                    © 2025 Lightning Bounties. ⚡ Open Source Meets Bitcoin.
                </p>
                <div className="flex items-center gap-6">
                   <button 
                      onClick={toggleTheme}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-colors focus:outline-none focus:text-mv-cyan-dark dark:focus:text-mv-cyan"
                      aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                   >
                     {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                     <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                   </button>
                   <div className="h-3 w-px bg-slate-300 dark:bg-mv-border"></div>
                   <div className="flex gap-6 text-xs text-slate-600 dark:text-slate-400">
                      <button onClick={() => onNavigate('privacy')} className="hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-colors focus:outline-none focus:underline">Privacy Policy</button>
                      <button onClick={() => onNavigate('terms')} className="hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-colors focus:outline-none focus:underline">Terms of Service</button>
                   </div>
                </div>
            </div>
        </div>
    </footer>
  );
};