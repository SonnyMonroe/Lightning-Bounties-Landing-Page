import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FaqPage } from './components/FaqPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { TeamPage } from './components/TeamPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { BountyAssistant } from './components/BountyAssistant';
import { LeaderboardTable } from './components/LeaderboardTable';
import { OpenBountiesTable } from './components/OpenBountiesTable';
import { Zap, Shield, Globe, ArrowRight, Github, X, TrendingUp, Users, GitBranch, Database, CheckCircle, Linkedin, Youtube, Sun, Moon, Ban, HeartHandshake, CameraOff, Lock } from 'lucide-react';
import { fetchLightningData, fetchBtcPrice } from './services/dataService';
import { Developer, UnclaimedIssue, Metric } from './types';

export const App: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [openBounties, setOpenBounties] = useState<UnclaimedIssue[]>([]);
  
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms'>('home');

  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'light' ? false : true;
    }
    return true;
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Apply theme class to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle URL Hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      // Basic routing based on hash
      if (hash === '#faq') { setCurrentView('faq'); return; }
      if (hash === '#how-it-works') { setCurrentView('how-it-works'); return; }
      if (hash === '#team') { setCurrentView('team'); return; }
      if (hash === '#privacy') { setCurrentView('privacy'); return; }
      if (hash === '#terms') { setCurrentView('terms'); return; }
      
      // If hash is home-related or empty, go to home
      if (!hash || hash === '#home' || hash === '#bounties' || hash === '#features' || hash === '#leaderboard') {
         if (currentView !== 'home') setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  // Scroll to top when view changes (simulating page navigation)
  useEffect(() => {
    if (currentView !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  // Handle View Navigation
  const navigateTo = (view: 'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms') => {
    if (view === 'home') {
        // If navigating home, clear the hash unless we are using an anchor (handled by Header)
        // If we are already at home, we might want to just scroll top or do nothing specific regarding hash if it's empty
        setCurrentView('home');
        // Clear hash to nice URL
        if (window.location.hash && window.location.hash !== '#home' && window.location.hash !== '#bounties' && window.location.hash !== '#features' && window.location.hash !== '#leaderboard') {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Set hash to trigger navigation
        window.location.hash = view;
        // Scroll logic is handled by the effect or we can force it here for immediate feedback
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to extract metric value safely
  const getMetricValue = (name: string): number => {
    const m = metrics.find(m => m.metric === name);
    return m ? m.value : 0;
  };

  const loadData = async () => {
    try {
      const [apiData, price] = await Promise.all([
        fetchLightningData(),
        fetchBtcPrice()
      ]);
      
      if (apiData) {
        setMetrics(apiData.metrics || []);
        setDevelopers(apiData.topDevelopers || []);
        setOpenBounties(apiData.topIssuesNotClaimed || []);
      }
      setBtcPrice(price);
    } catch (e) {
      console.error("Failed to load initial data", e);
    }
  };

  useEffect(() => {
    loadData();
    const priceInterval = setInterval(async () => {
      const price = await fetchBtcPrice();
      setBtcPrice(price);
    }, 33000);
    const statsInterval = setInterval(async () => {
      const data = await fetchLightningData();
      if (data) {
        setMetrics(data.metrics || []);
        setDevelopers(data.topDevelopers || []);
        setOpenBounties(data.topIssuesNotClaimed || []);
      }
    }, 60000);
    return () => {
      clearInterval(priceInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const renderContent = () => {
      switch (currentView) {
          case 'faq':
              return <FaqPage onBack={() => navigateTo('home')} />;
          case 'how-it-works':
              return <HowItWorksPage onBack={() => navigateTo('home')} />;
          case 'team':
              return <TeamPage onBack={() => navigateTo('home')} />;
          case 'privacy':
              return <PrivacyPolicyPage onBack={() => navigateTo('home')} />;
          case 'terms':
              return <TermsOfServicePage onBack={() => navigateTo('home')} />;
          case 'home':
          default:
              return (
                <>
                {/* Hero Section */}
                <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-24 overflow-hidden z-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 dark:bg-mv-purple/20 rounded-full blur-[120px] opacity-60 dark:opacity-100 transition-all duration-700"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-300 dark:bg-mv-cyan/20 rounded-full blur-[120px] opacity-60 dark:opacity-100 transition-all duration-700"></div>
                  </div>
                  
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Live BTC Price Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-mv-card/80 border border-slate-200 dark:border-mv-border backdrop-blur-md mb-8 shadow-sm dark:shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:border-mv-cyan-dark dark:hover:border-mv-cyan/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">BTC - USD:</span>
                        <span className="text-slate-900 dark:text-white font-bold font-mono">
                          ${btcPrice > 0 ? btcPrice.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '---,---'}
                        </span>
                      </div>
                    </div>
                    
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-[0.9] font-display uppercase drop-shadow-sm dark:drop-shadow-2xl">
                      Lightning <br/>
                      Bounties
                    </h1>

                    <h2 className="text-2xl md:text-4xl font-bold mb-6 font-display uppercase tracking-wider">
                       <span className="gradient-text">GitHub Bounties Paid in Bitcoin</span>
                    </h2>
                    
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-10 font-light leading-relaxed">
                    Reward open-source developers instantly in Bitcoin for solving GitHub issues.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                      <button className="relative overflow-hidden group bg-transparent px-8 py-4 rounded-sm font-bold text-lg uppercase tracking-wider font-display text-white transition-all duration-300 shadow-xl dark:shadow-none hover:shadow-2xl hover:-translate-y-0.5">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-mv-cyan-dark to-mv-purple-dark dark:from-[#00f0ff] dark:to-[#bc13fe] opacity-90 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex items-center gap-2">Start Earning <ArrowRight size={20} /></span>
                      </button>
                      <button className="px-8 py-4 rounded-sm font-bold text-lg uppercase tracking-wider font-display text-slate-900 dark:text-white border border-slate-300 dark:border-mv-border hover:border-mv-cyan-dark dark:hover:border-mv-cyan hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-colors bg-white/50 dark:bg-mv-card/50">
                        Post a Bounty
                      </button>
                    </div>
                  </div>
                </section>

                {/* Live Metrics Grid */}
                <section className="relative z-10 py-12 bg-slate-50/50 dark:bg-mv-card/30 border-y border-slate-200 dark:border-mv-border backdrop-blur-sm transition-colors duration-300">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                      <div className="flex flex-col items-center text-center p-4 group">
                        <div className="w-12 h-12 bg-cyan-100 dark:bg-mv-cyan/10 rounded-lg flex items-center justify-center mb-3 border border-cyan-200 dark:border-mv-cyan/20 group-hover:border-mv-cyan-dark dark:group-hover:border-mv-cyan/50 transition-colors">
                          <Database className="text-mv-cyan-dark dark:text-mv-cyan" size={24} />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-display">
                          {getMetricValue('Open Bounties') || getMetricValue('openBounties')}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors">Open Bounties</div>
                      </div>

                      <div className="flex flex-col items-center text-center p-4 group">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-mv-purple/10 rounded-lg flex items-center justify-center mb-3 border border-purple-200 dark:border-mv-purple/20 group-hover:border-mv-purple-dark dark:group-hover:border-mv-purple/50 transition-colors">
                          <GitBranch className="text-mv-purple-dark dark:text-mv-purple" size={24} />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-display">
                          {getMetricValue('Unique Repositories') || getMetricValue('uniqueRepos')}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-mv-purple-dark dark:group-hover:text-mv-purple transition-colors">Unique Repos</div>
                      </div>

                      <div className="flex flex-col items-center text-center p-4 group">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center mb-3 border border-blue-200 dark:border-blue-500/20 group-hover:border-blue-400 dark:group-hover:border-blue-500/50 transition-colors">
                          <CheckCircle className="text-blue-600 dark:text-blue-500" size={24} />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-display">
                          {getMetricValue('Total Bounties') || getMetricValue('totalBounties')}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">Total Bounties</div>
                      </div>

                      <div className="flex flex-col items-center text-center p-4 group">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3 border border-emerald-200 dark:border-emerald-500/20 group-hover:border-emerald-400 dark:group-hover:border-emerald-500/50 transition-colors">
                          <Users className="text-emerald-600 dark:text-emerald-500" size={24} />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-display">
                          {getMetricValue('Total Developers') || getMetricValue('totalDevelopers')}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">Total Developers</div>
                      </div>

                      <div className="flex flex-col items-center text-center p-4 group col-span-2 md:col-span-1 lg:col-span-1">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/10 rounded-lg flex items-center justify-center mb-3 border border-yellow-200 dark:border-yellow-500/20 group-hover:border-yellow-400 dark:group-hover:border-yellow-500/50 transition-colors">
                          <Zap className="text-yellow-600 dark:text-yellow-500" size={24} />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-display font-mono">
                          {getMetricValue('Total Sats Rewarded').toLocaleString()}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">Sats Rewarded</div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
                  <section id="leaderboard" className="scroll-mt-24">
                     <LeaderboardTable developers={developers} />
                  </section>

                  <section id="bounties" className="scroll-mt-24">
                     <OpenBountiesTable bounties={openBounties} />
                  </section>
                </div>

                <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24">
                  <BountyAssistant />
                </section>

                <section id="features" className="relative z-10 py-24 bg-slate-50 dark:bg-mv-card/50 relative overflow-hidden border-t border-slate-200 dark:border-mv-border transition-colors duration-300">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide leading-tight">
                        Why Developers & Organizations Choose <br/>
                        <span className="text-mv-cyan-dark dark:text-mv-cyan">Lightning Bounties</span>
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-lg font-bold uppercase tracking-wider">Zero friction. Global access. Instant rewards.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Card 1 */}
                      <div className="bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border p-8 rounded-xl hover:border-mv-cyan-dark dark:hover:border-mv-cyan/50 transition-all group shadow-xl dark:shadow-lg dark:shadow-black/50 hover:-translate-y-1 flex flex-col h-full">
                        <div className="bg-slate-100 dark:bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-white/5 group-hover:border-mv-cyan-dark/30 dark:group-hover:border-mv-cyan/30">
                          <Ban className="text-slate-500 dark:text-slate-400 group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors">No Setup Required</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                          No plugins, no installations, no GitHub changes. Post a bounty in 5 clicks or claim one instantly. Just copy-paste a GitHub Issue URL and go.
                        </p>
                      </div>
                      
                      {/* Card 2 */}
                      <div className="bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border p-8 rounded-xl hover:border-mv-cyan-dark dark:hover:border-mv-cyan/50 transition-all group shadow-xl dark:shadow-lg dark:shadow-black/50 hover:-translate-y-1 flex flex-col h-full">
                        <div className="bg-slate-100 dark:bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-white/5 group-hover:border-mv-cyan-dark/30 dark:group-hover:border-mv-cyan/30">
                          <Zap className="text-slate-500 dark:text-slate-400 group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors">Lightning-Fast Payments</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                          Bitcoin payouts via Lightning Network arrive in seconds, not days. No invoices, no wire transfers, no waiting—just instant global payments.
                        </p>
                      </div>
                      
                      {/* Card 3 */}
                      <div className="bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border p-8 rounded-xl hover:border-mv-cyan-dark dark:hover:border-mv-cyan/50 transition-all group shadow-xl dark:shadow-lg dark:shadow-black/50 hover:-translate-y-1 flex flex-col h-full">
                        <div className="bg-slate-100 dark:bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-white/5 group-hover:border-mv-cyan-dark/30 dark:group-hover:border-mv-cyan/30">
                          <Globe className="text-slate-500 dark:text-slate-400 group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors">Global Access</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                          Bypass Stripe, PayPal, and region-locked payment processors. Bitcoin operates globally—anyone, anywhere can participate and earn.
                        </p>
                      </div>

                      {/* Card 4 */}
                      <div className="bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border p-8 rounded-xl hover:border-mv-cyan-dark dark:hover:border-mv-cyan/50 transition-all group shadow-xl dark:shadow-lg dark:shadow-black/50 hover:-translate-y-1 flex flex-col h-full">
                        <div className="bg-slate-100 dark:bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-white/5 group-hover:border-mv-cyan-dark/30 dark:group-hover:border-mv-cyan/30">
                          <HeartHandshake className="text-slate-500 dark:text-slate-400 group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors">Crowdfunding</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                          Multiple contributors can fund a single bounty. Support issues on VSCode, Django, React—even if you're not the project owner.
                        </p>
                      </div>

                      {/* Card 5 */}
                      <div className="bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border p-8 rounded-xl hover:border-mv-cyan-dark dark:hover:border-mv-cyan/50 transition-all group shadow-xl dark:shadow-lg dark:shadow-black/50 hover:-translate-y-1 flex flex-col h-full">
                        <div className="bg-slate-100 dark:bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-white/5 group-hover:border-mv-cyan-dark/30 dark:group-hover:border-mv-cyan/30">
                          <CameraOff className="text-slate-500 dark:text-slate-400 group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors">Anonymous Bounty Posting</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                          Contribute to bounties without revealing your identity. Perfect for those who value privacy.
                        </p>
                      </div>

                      {/* Card 6 */}
                      <div className="bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border p-8 rounded-xl hover:border-mv-cyan-dark dark:hover:border-mv-cyan/50 transition-all group shadow-xl dark:shadow-lg dark:shadow-black/50 hover:-translate-y-1 flex flex-col h-full">
                        <div className="bg-slate-100 dark:bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-white/5 group-hover:border-mv-cyan-dark/30 dark:group-hover:border-mv-cyan/30">
                          <Lock className="text-slate-500 dark:text-slate-400 group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan-dark dark:group-hover:text-mv-cyan transition-colors">Escrow Protection</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                          Bounties are locked in escrow for a set time (e.g., 2 weeks). Developers know the reward is secured before they start working.
                        </p>
                      </div>

                    </div>
                  </div>
                </section>
                </>
              );
      }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-mv-dark text-slate-900 dark:text-white font-sans transition-colors duration-300 selection:bg-cyan-200 dark:selection:bg-mv-purple selection:text-cyan-900 dark:selection:text-white flex flex-col">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} onNavigate={navigateTo} />
      
      {/* Background Grid Pattern - Adjusted for Light Mode */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-mv-dark/80 dark:to-mv-dark"></div>
      </div>

      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer darkMode={darkMode} toggleTheme={toggleTheme} onNavigate={navigateTo} />
    </div>
  );
};