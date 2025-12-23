import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FaqPage } from './components/FaqPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { TeamPage } from './components/TeamPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { AboutPage } from './components/AboutPage';
import { FeaturesPage } from './components/FeaturesPage';
import { BountyAssistant } from './components/BountyAssistant';
import { LeaderboardTable } from './components/LeaderboardTable';
import { OpenBountiesTable } from './components/OpenBountiesTable';
import { Zap, Shield, Globe, ArrowRight, Github, X, TrendingUp, Users, GitBranch, Database, CheckCircle, Linkedin, Youtube, Sun, Moon, Ban, HeartHandshake, CameraOff, Lock, PlayCircle, Maximize2, Minimize2, Loader2, Cpu, Code, Sparkles } from 'lucide-react';
import { fetchLightningData, fetchBtcPrice } from './services/dataService';
import { Developer, UnclaimedIssue, Metric } from './types';

export const App: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [openBounties, setOpenBounties] = useState<UnclaimedIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState<'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms' | 'about' | 'features'>('home');

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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#faq') { setCurrentView('faq'); return; }
      if (hash === '#how-it-works') { setCurrentView('how-it-works'); return; }
      if (hash === '#team') { setCurrentView('team'); return; }
      if (hash === '#privacy') { setCurrentView('privacy'); return; }
      if (hash === '#terms') { setCurrentView('terms'); return; }
      if (hash === '#about') { setCurrentView('about'); return; }
      if (hash === '#features') { setCurrentView('features'); return; }
      
      if (!hash || hash === '#home' || hash === '#bounties' || hash === '#leaderboard') {
         if (currentView !== 'home') setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  useEffect(() => {
    if (currentView !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  const navigateTo = (view: 'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms' | 'about' | 'features') => {
    if (view === 'home') {
        setCurrentView('home');
        if (window.location.hash) {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.location.hash = view;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getMetricValue = (name: string): number => {
    const m = metrics.find(m => m.metric === name);
    return m ? m.value : 0;
  };

  const loadData = async () => {
    setIsLoading(true);
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
    } finally {
        setIsLoading(false);
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
          case 'about':
              return <AboutPage onBack={() => navigateTo('home')} />;
          case 'features':
              return <FeaturesPage onBack={() => navigateTo('home')} />;
          case 'home':
          default:
              return (
                <>
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
                  <div className="absolute inset-0 z-0 cyber-grid opacity-30 pointer-events-none" />
                  
                  {/* Background Glows */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mv-cyan/10 rounded-full blur-[150px] pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mv-magenta/10 rounded-full blur-[120px] pointer-events-none" />
                  
                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    
                    {/* Animated HUD / Logo Area */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 mb-16 flex items-center justify-center">
                        
                        {/* Orbiting Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-mv-cyan/20 border-dashed"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 md:inset-8 rounded-full border border-mv-magenta/20 border-dotted"
                        />

                        {/* Floating Icons on Orbit */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-black p-1.5 rounded-full border border-mv-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                                <Cpu size={20} className="text-mv-cyan" />
                            </div>
                            <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white dark:bg-black p-1.5 rounded-full border border-mv-magenta/50 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                                <GitBranch size={20} className="text-mv-magenta" />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-black p-1.5 rounded-full border border-mv-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                                <Database size={20} className="text-mv-cyan" />
                            </div>
                            <div className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white dark:bg-black p-1.5 rounded-full border border-mv-magenta/50 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                                <Zap size={20} className="text-mv-magenta" />
                            </div>
                        </motion.div>

                        {/* Central Logo Container */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="w-44 h-44 md:w-56 md:h-56 flex items-center justify-center relative group"
                            >
                                {/* Glowing effect behind the logo */}
                                <div className="absolute inset-0 bg-mv-cyan/20 blur-3xl rounded-full animate-pulse" />
                                <div className="relative z-10 w-36 h-36 md:w-48 md:h-48 bg-black border-2 border-slate-200/20 dark:border-white/10 rounded-full flex items-center justify-center backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-mv-cyan/40">
                                    <img 
                                        src="images/logo3.png" 
                                        alt="Lightning Bounties Hero" 
                                        className="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            const target = e.target as HTMLElement;
                                            target.style.display = 'none';
                                            const backup = target.nextElementSibling as HTMLElement;
                                            if(backup) backup.style.display = 'block';
                                        }}
                                    />
                                    <div style={{display: 'none'}} className="absolute">
                                        <Zap className="w-16 h-16 md:w-20 md:h-20 text-mv-cyan fill-current drop-shadow-[0_0_15px_rgba(6,182,212,1)]" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Live BTC Price Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-slate-500 dark:text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] font-display">LIVE BTC PRICE:</span>
                      <span className="text-slate-900 dark:text-white font-bold font-mono tracking-tighter text-lg">
                        {btcPrice > 0 ? `$${btcPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : <Loader2 className="animate-spin text-slate-400 dark:text-white/30 h-4 w-4" />}
                      </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-4 font-display uppercase leading-[0.9] italic text-shadow-sm">
                            LIGHTNING <br/>
                            BOUNTIES
                        </h1>

                        <h2 className="text-xl md:text-3xl font-light mb-8 tracking-[0.3em] font-display uppercase italic">
                           <span className="gradient-text">GITHUB BOUNTIES PAID IN BITCOIN</span>
                        </h2>
                        
                        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-white/60 mb-12 font-light leading-relaxed font-sans">
                            Reward open-source developers instantly in <span className="text-slate-900 dark:text-white font-medium">Bitcoin</span> for solving GitHub issues.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto mb-20 lg:mb-32">
                        <a 
                            href="https://app.lightningbounties.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-10 py-5 font-bold text-sm uppercase tracking-widest font-display text-white overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 text-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-mv-cyan to-mv-magenta transition-all duration-500 group-hover:scale-110"></div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center gap-3">
                            EXPLORE BOUNTIES <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                            </span>
                        </a>

                        <button 
                            onClick={() => navigateTo('how-it-works')}
                            className="group relative px-10 py-5 font-bold text-sm uppercase tracking-widest font-display text-slate-900 dark:text-white border border-slate-300 dark:border-white/20 hover:border-mv-magenta bg-white dark:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-mv-magenta/20 rounded-xl"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                            HOW IT WORKS <PlayCircle size={22} className="group-hover:text-mv-magenta transition-colors duration-300" strokeWidth={2} />
                            </span>
                        </button>
                        </div>
                    </motion.div>
                  </div>
                </section>

                {/* Live Metrics Grid */}
                <section className="relative z-10 py-20 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/10 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
                      {[
                          { icon: Database, color: 'text-mv-cyan', label: 'Open Bounties', val: getMetricValue('Open Bounties') || getMetricValue('openBounties') },
                          { icon: GitBranch, color: 'text-mv-magenta', label: 'Unique Repos', val: getMetricValue('Unique Repositories') || getMetricValue('uniqueRepos') },
                          { icon: CheckCircle, color: 'text-blue-600 dark:text-blue-400', label: 'Total Bounties', val: getMetricValue('Total Bounties') || getMetricValue('totalBounties') },
                          { icon: Users, color: 'text-emerald-600 dark:text-emerald-400', label: 'Total Developers', val: getMetricValue('Total Developers') || getMetricValue('totalDevelopers') },
                          { icon: Zap, color: 'text-yellow-600 dark:text-yellow-400', label: 'Sats Rewarded', val: getMetricValue('Total Sats Rewarded').toLocaleString() }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group cursor-default">
                            <div className={`w-12 h-12 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center mb-4 border border-slate-200 dark:border-white/10 group-hover:border-mv-cyan/50 transition-all group-hover:scale-110 shadow-sm`}>
                            <item.icon className={item.color} size={24} />
                            </div>
                            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-display min-h-[36px] flex items-center justify-center">
                            {isLoading ? <Loader2 className="animate-spin text-slate-400 dark:text-white/20" size={24} /> : item.val}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 group-hover:text-mv-cyan transition-colors">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
                  <section id="leaderboard" className="scroll-mt-24">
                     {isLoading ? (
                       <div className="w-full h-96 flex items-center justify-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm">
                          <Loader2 className="animate-spin text-mv-cyan" size={48} />
                       </div>
                     ) : (
                       <LeaderboardTable developers={developers} btcPrice={btcPrice} />
                     )}
                  </section>

                  <section id="bounties" className="scroll-mt-24">
                     {isLoading ? (
                        <div className="w-full h-96 flex items-center justify-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm">
                           <Loader2 className="animate-spin text-orange-500" size={48} />
                        </div>
                     ) : (
                       <OpenBountiesTable bounties={openBounties} btcPrice={btcPrice} />
                     )}
                  </section>

                  {/* Homepage Features Section */}
                  <section id="homepage-features" className="scroll-mt-24 py-12">
                     <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 font-display uppercase tracking-tight italic leading-[1.1]">
                            WHY DEVELOPERS & <br className="hidden md:block" /> 
                            ORGANIZATIONS CHOOSE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mv-cyan to-mv-magenta">LIGHTNING BOUNTIES</span>
                        </h2>
                        <p className="text-sm md:text-lg text-slate-500 dark:text-white/60 font-bold uppercase tracking-[0.3em]">
                            ZERO FRICTION. GLOBAL ACCESS. INSTANT REWARDS.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Ban, title: "No Setup Required", desc: "No plugins, no installations, no GitHub changes. Post a bounty in 5 clicks or claim one instantly. Just copy-paste a GitHub Issue URL and go." },
                            { icon: Zap, title: "Lightning-Fast Payments", desc: "Bitcoin payouts via Lightning Network arrive in seconds, not days. No invoices, no wire transfers, no waiting—just instant global payments." },
                            { icon: Globe, title: "Global Access", desc: "Bypass Stripe, PayPal, and region-locked payment processors. Bitcoin operates globally—anyone, anywhere can participate and earn." },
                            { icon: HeartHandshake, title: "Crowdfunding", desc: "Multiple contributors can fund a single bounty. Support issues on VSCode, Django, React—even if you're not the project owner." },
                            { icon: CameraOff, title: "Anonymous Bounty Posting", desc: "Contribute to bounties without revealing your identity. Perfect for those who value privacy." },
                            { icon: Lock, title: "Escrow Protection", desc: "Bounties are locked in escrow for a set time (e.g., 2 weeks). Developers know the reward is secured before they start working." }
                        ].map((f, i) => (
                            <div key={i} className="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/10 p-8 rounded-2xl transition-all duration-500 group shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgba(6,182,212,0.1)] dark:hover:shadow-[0_20px_40px_rgba(6,182,212,0.05)] hover:border-mv-cyan hover:-translate-y-2 hover:scale-[1.02]">
                                <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-white/10 group-hover:border-mv-cyan/50 group-hover:bg-mv-cyan/5 transition-all duration-300">
                                    <f.icon className="text-slate-600 dark:text-slate-400 group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan transition-colors duration-300">
                                    {f.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                  </section>
                </div>

                {/* Promotional Section - Lightning Issues - REDESIGNED TO MATCH ARCHITECT AI */}
                <div className="relative z-10 max-w-4xl mx-auto my-16 bg-white dark:bg-[#020305] border border-slate-200 dark:border-slate-800 rounded-3xl p-1 shadow-2xl transition-all duration-300 hover:ring-1 hover:ring-cyan-500/30 group/LI">
                    <div className="p-8 md:p-12 relative overflow-hidden bg-white dark:bg-[#020305] rounded-[22px]">
                        {/* Decorative background elements matching Architect style */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover/LI:scale-125 transition-transform duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover/LI:scale-125 transition-transform duration-700"></div>

                        <div className="relative z-10 text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-900/10 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 border border-cyan-500/20 dark:border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                <Sparkles size={14} />
                                <span>Automation Tool</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-tight leading-none italic">
                                INTRODUCING <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mv-cyan to-mv-purple group-hover/LI:brightness-125 transition-all">LIGHTNING ISSUES</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-sans font-medium">
                                Lightning Issues scans GitHub repositories and automatically creates professional GitHub Issues based on current codebase analysis, feature suggestions, and quality gaps.
                            </p>
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto text-center">
                            <a 
                                href="https://issues.lightningbounties.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex group/btn relative px-10 py-5 font-bold text-sm uppercase tracking-widest font-display text-white overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0 items-center justify-center gap-3"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-mv-cyan to-mv-purple transition-all duration-500 group-hover/btn:scale-110"></div>
                                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-white transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center gap-3">
                                    TRY LIGHTNING ISSUES 
                                    <ArrowRight size={22} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-32">
                    <BountyAssistant />
                </section>
                </>
              );
      }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white font-sans transition-colors duration-300 flex flex-col">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} onNavigate={navigateTo} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer darkMode={darkMode} toggleTheme={toggleTheme} onNavigate={navigateTo} />
    </div>
  );
};