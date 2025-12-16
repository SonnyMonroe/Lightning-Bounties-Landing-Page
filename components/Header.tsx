import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onNavigate: (view: 'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms' | 'about', anchor?: string) => {
    onNavigate(view);
    if (view === 'home' && anchor) {
        // Simple timeout to allow view to render before scrolling
        setTimeout(() => {
            const element = document.querySelector(anchor);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-mv-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-mv-border shadow-sm dark:shadow-none' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
            aria-label="Go to homepage"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-mv-cyan-dark dark:bg-mv-cyan blur-[10px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border p-2 rounded-lg shadow-sm group-hover:border-mv-cyan-dark/50 dark:group-hover:border-mv-cyan/50 transition-colors">
                <Zap className="h-6 w-6 text-mv-cyan-dark dark:text-mv-cyan fill-current" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-2xl tracking-wide leading-none text-slate-900 dark:text-white uppercase">
                Lightning
              </span>
              <span className="font-display font-bold text-lg tracking-[0.2em] leading-none text-mv-cyan-dark dark:text-mv-cyan uppercase">
                Bounties
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {['how-it-works', 'about'].map((item) => (
               <button 
                 key={item}
                 onClick={() => handleNavClick(item as any)} 
                 className="relative text-slate-600 dark:text-slate-300 hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-colors text-sm font-bold uppercase tracking-wider font-display focus:outline-none focus:text-mv-cyan-dark dark:focus:text-mv-cyan group"
               >
                 {item.replace(/-/g, ' ')}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mv-cyan-dark dark:bg-mv-cyan transition-all duration-300 group-hover:w-full"></span>
               </button>
            ))}
            <button onClick={() => handleNavClick('home', '#bounties')} className="relative text-slate-600 dark:text-slate-300 hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-colors text-sm font-bold uppercase tracking-wider font-display focus:outline-none focus:text-mv-cyan-dark dark:focus:text-mv-cyan group">
                Explore Bounties
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mv-cyan-dark dark:bg-mv-cyan transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => handleNavClick('home', '#features')} className="relative text-slate-600 dark:text-slate-300 hover:text-mv-cyan-dark dark:hover:text-mv-cyan transition-colors text-sm font-bold uppercase tracking-wider font-display focus:outline-none focus:text-mv-cyan-dark dark:focus:text-mv-cyan group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mv-cyan-dark dark:bg-mv-cyan transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="group relative p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-mv-cyan-dark dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
               <div className="absolute inset-0 rounded-full bg-mv-cyan-dark/10 dark:bg-mv-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {darkMode ? <Sun size={20} className="relative z-10" /> : <Moon size={20} className="relative z-10" />}
            </button>
            <button className="relative overflow-hidden group bg-transparent px-6 py-2.5 rounded-sm font-bold text-sm uppercase tracking-wider font-display text-white transition-all duration-300 shadow-md dark:shadow-none hover:shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-mv-dark">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-mv-cyan-dark to-mv-purple-dark dark:from-[#00f0ff] dark:to-[#bc13fe] opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2">Post a Bounty</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-slate-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded p-1" 
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white dark:bg-mv-dark border-b border-slate-200 dark:border-mv-border absolute w-full shadow-xl animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => { handleNavClick('how-it-works'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-bold uppercase text-slate-600 dark:text-slate-300 hover:text-mv-cyan-dark dark:hover:text-mv-cyan hover:bg-slate-50 dark:hover:bg-white/5 rounded-md font-display transition-colors">How it Works</button>
            <button onClick={() => { handleNavClick('home', '#bounties'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-bold uppercase text-slate-600 dark:text-slate-300 hover:text-mv-cyan-dark dark:hover:text-mv-cyan hover:bg-slate-50 dark:hover:bg-white/5 rounded-md font-display transition-colors">Explore Bounties</button>
            <button onClick={() => { handleNavClick('home', '#features'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-bold uppercase text-slate-600 dark:text-slate-300 hover:text-mv-cyan-dark dark:hover:text-mv-cyan hover:bg-slate-50 dark:hover:bg-white/5 rounded-md font-display transition-colors">Features</button>
            <button onClick={() => { handleNavClick('about'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-bold uppercase text-slate-600 dark:text-slate-300 hover:text-mv-cyan-dark dark:hover:text-mv-cyan hover:bg-slate-50 dark:hover:bg-white/5 rounded-md font-display transition-colors">About</button>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
              <button className="w-full bg-gradient-to-r from-mv-cyan-dark to-mv-purple-dark dark:from-mv-cyan dark:to-mv-purple text-white py-3 rounded-sm font-bold uppercase font-display shadow-lg">Post a Bounty</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};