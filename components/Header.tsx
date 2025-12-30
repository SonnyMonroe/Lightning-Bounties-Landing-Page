
import React, { useState, useEffect, useCallback } from 'react';
// Added missing imports for motion and AnimatePresence
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, Sun, Moon, ExternalLink } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onNavigate: (view: 'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms' | 'about' | 'features') => void;
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

  const handleEscKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleEscKey);
    } else {
      window.removeEventListener('keydown', handleEscKey);
    }
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [mobileMenuOpen, handleEscKey]);

  const handleNavClick = (view: 'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms' | 'about' | 'features', anchor?: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    if (view === 'home' && anchor) {
        setTimeout(() => {
            const element = document.querySelector(anchor);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                (element as HTMLElement).focus();
            }
        }, 100);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo Section - Left Aligned */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-mv-cyan focus:ring-offset-2 dark:focus:ring-offset-black rounded-lg transition-all"
              aria-label="Lightning Bounties Homepage"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-mv-cyan blur-[12px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 bg-white dark:bg-black border-2 border-mv-cyan/20 dark:border-mv-cyan/30 rounded-xl group-hover:border-mv-cyan group-hover:scale-105 transition-all duration-500 flex items-center justify-center p-1.5 overflow-hidden shadow-sm ring-1 ring-transparent group-hover:ring-mv-cyan/30 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <img 
                    src="images/logo5.png" 
                    alt="Lightning Bounties Logo" 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    aria-hidden="true"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjEzIDIgMyAxNCAxMiAxNCAxMSAyMiAyMSAxMCAxMiAxMCAxMyAyIj48L3BvbHlsaW5lPjwvc3ZnPg==';
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-xl tracking-tighter leading-none text-slate-900 dark:text-white uppercase italic">
                  LIGHTNING
                </span>
                <span className="font-display font-bold text-[0.65rem] tracking-[0.3em] leading-none text-mv-cyan uppercase">
                  BOUNTIES
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav - Centered */}
          <nav className="hidden lg:flex items-center justify-center space-x-6 xl:space-x-10 px-4" aria-label="Primary Navigation">
             <button 
                onClick={() => handleNavClick('how-it-works')} 
                className="relative text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest font-display focus:outline-none focus:ring-2 focus:ring-mv-cyan focus:ring-offset-4 dark:focus:ring-offset-black rounded px-1 group whitespace-nowrap"
            >
                HOW IT WORKS
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mv-cyan transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
                onClick={() => handleNavClick('about')} 
                className="relative text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest font-display focus:outline-none focus:ring-2 focus:ring-mv-cyan focus:ring-offset-4 dark:focus:ring-offset-black rounded px-1 group whitespace-nowrap"
            >
                ABOUT
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mv-cyan transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
                onClick={() => handleNavClick('features')} 
                className="relative text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest font-display focus:outline-none focus:ring-2 focus:ring-mv-cyan focus:ring-offset-4 dark:focus:ring-offset-black rounded px-1 group whitespace-nowrap"
            >
                FEATURES
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mv-cyan transition-all duration-300 group-hover:w-full"></span>
            </button>
            <a 
                href="https://issues.lightningbounties.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest font-display focus:outline-none focus:ring-2 focus:ring-mv-cyan focus:ring-offset-4 dark:focus:ring-offset-black rounded px-1 group flex items-center gap-1.5 whitespace-nowrap"
            >
                LIGHTNING ISSUES
                <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mv-cyan transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* CTA & Theme Button - Right Aligned */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-white/50 hover:text-mv-cyan dark:hover:text-mv-cyan transition-all hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 focus:ring-2 focus:ring-mv-cyan focus:outline-none"
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a 
              href="https://app.lightningbounties.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex relative overflow-hidden group px-6 py-2.5 font-bold text-xs uppercase tracking-[0.15em] font-display text-white dark:text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:ring-4 focus:ring-mv-cyan/50 focus:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-mv-cyan to-mv-purple transition-all duration-500 group-hover:scale-110"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity"></div>
              <span className="relative z-10">EXPLORE BOUNTIES</span>
            </a>

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="lg:hidden text-slate-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-mv-cyan rounded p-1" 
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-menu" 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white dark:bg-black border-b border-slate-200 dark:border-white/10 absolute w-full shadow-2xl z-40"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => handleNavClick('how-it-works')} className="block w-full text-left px-3 py-3 text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-md font-display transition-colors focus:ring-2 focus:ring-mv-cyan focus:outline-none">How it Works</button>
              <button onClick={() => handleNavClick('about')} className="block w-full text-left px-3 py-3 text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-md font-display transition-colors focus:ring-2 focus:ring-mv-cyan focus:outline-none">About</button>
              <button onClick={() => handleNavClick('features')} className="block w-full text-left px-3 py-3 text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-md font-display transition-colors focus:ring-2 focus:ring-mv-cyan focus:outline-none">Features</button>
              <a href="https://issues.lightningbounties.com/" target="_blank" rel="noopener noreferrer" className="block w-full text-left px-3 py-3 text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-md font-display transition-colors focus:ring-2 focus:ring-mv-cyan focus:outline-none">Lightning Issues</a>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                <a href="https://app.lightningbounties.com/" target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-mv-cyan to-mv-purple text-white py-3 font-bold uppercase tracking-widest font-display text-center block rounded-lg shadow-lg focus:ring-4 focus:ring-mv-cyan/50 focus:outline-none">Explore Bounties</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
