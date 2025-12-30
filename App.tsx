import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

// Animated Connecting Dots Background for Data/Table Sections
const NexusBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const count = 40;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // High contrast colors for light mode
      const color = isDark ? '6, 182, 212' : '14, 116, 144';
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(${color}, 0.4)` : `rgba(${color}, 0.6)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = isDark ? 0.15 * (1 - dist / 220) : 0.25 * (1 - dist / 220);
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />;
};

// Moving Blurred Blobs for Promo Sections
const AuraBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30 dark:opacity-40" aria-hidden="true">
      <motion.div 
        animate={{ 
          x: [0, 150, 0], 
          y: [0, 100, 0],
          scale: [1, 1.3, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-mv-cyan/40 blur-[140px]" 
      />
      <motion.div 
        animate={{ 
          x: [0, -120, 0], 
          y: [0, -100, 0],
          scale: [1.2, 0.8, 1.2] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-mv-purple/40 blur-[140px]" 
      />
    </div>
  );
};

// Flowing Particle Network Background for Feature Section
const FlowingBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 50;
    const connectionDistance = 250;

    const resize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2.5 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = isDark ? '6, 182, 212' : '14, 116, 144';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(${color}, 0.5)` : `rgba(${color}, 0.7)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = isDark ? (1 - dist / connectionDistance) * 0.2 : (1 - dist / connectionDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-70" aria-hidden="true" />;
};

// Refined Particle Globe Background for Hero Section
const ParticleGlobe: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { theta: number; phi: number; radius: number; size: number; color: string; isGrid: boolean }[] = [];
    const numRandomParticles = 1000;
    
    // Dynamically adjust radius based on viewport
    const getRadius = () => Math.min(window.innerWidth * 0.4, 420);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const globeRadius = getRadius();
      
      // Use higher contrast colors for light mode
      const cyanColor = isDark ? '#06b6d4' : '#0e7490'; 
      const magentaColor = isDark ? '#d946ef' : '#a21caf'; 
      
      const latLines = 16;
      const lngLines = 24;

      for (let lat = 0; lat <= latLines; lat++) {
        const phi = (lat / latLines) * Math.PI;
        for (let lng = 0; lng < lngLines; lng++) {
          const theta = (lng / lngLines) * 2 * Math.PI;
          particles.push({
            theta,
            phi,
            radius: globeRadius,
            size: 2,
            color: cyanColor,
            isGrid: true
          });
        }
      }

      for (let i = 0; i < numRandomParticles; i++) {
        particles.push({
          theta: Math.random() * Math.PI * 2,
          phi: Math.acos(Math.random() * 2 - 1),
          radius: globeRadius,
          size: Math.random() * 2.5 + 0.5,
          color: i % 3 === 0 ? magentaColor : cyanColor,
          isGrid: false
        });
      }
    };

    let angleY = 0;
    let angleX = 0.2; 

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const globeRadius = getRadius();

      angleY += 0.003; 

      const renderedParticles = particles.map(p => {
        let x = p.radius * Math.sin(p.phi) * Math.cos(p.theta);
        let y = p.radius * Math.sin(p.phi) * Math.sin(p.theta);
        let z = p.radius * Math.cos(p.phi);

        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        let rx = x * cosY - z * sinY;
        let rz = x * sinY + z * cosY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        let ry = y * cosX - rz * sinX;
        let rzFinal = y * sinX + rz * cosX;

        return { x: rx, y: ry, z: rzFinal, size: p.size, color: p.color, isGrid: p.isGrid };
      });

      renderedParticles.sort((a, b) => b.z - a.z);

      // Sphere internal glow for better contrast
      const grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, globeRadius * 1.3);
      if (isDark) {
        grd.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
      } else {
        grd.addColorStop(0, 'rgba(14, 116, 144, 0.2)');
        grd.addColorStop(1, 'rgba(255,255,255,0)');
      }
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      renderedParticles.forEach(p => {
        const perspective = 1200;
        const scale = perspective / (perspective + p.z);
        const x2d = centerX + p.x * scale;
        const y2d = centerY + p.y * scale;
        
        const depthFactor = (p.z + globeRadius) / (globeRadius * 2);
        
        let opacity;
        if (isDark) {
            opacity = p.isGrid ? depthFactor * 0.85 : depthFactor * 0.6;
        } else {
            // Higher base opacity for light mode
            opacity = p.isGrid ? (depthFactor * 0.6) + 0.4 : (depthFactor * 0.4) + 0.3;
        }

        ctx.beginPath();
        ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(opacity, 1);
        ctx.fill();
        
        if (isDark && p.isGrid && p.z < 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000" 
      aria-hidden="true"
    />
  );
};

export const App: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [openBounties, setOpenBounties] = useState<UnclaimedIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState<'home' | 'faq' | 'how-it-works' | 'team' | 'privacy' | 'terms' | 'about' | 'features'>('home');

  const { scrollY } = useScroll();
  const globeY = useTransform(scrollY, [0, 1000], [0, -150]);
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);

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
          case 'faq': return <FaqPage onBack={() => navigateTo('home')} />;
          case 'how-it-works': return <HowItWorksPage onBack={() => navigateTo('home')} />;
          case 'team': return <TeamPage onBack={() => navigateTo('home')} />;
          case 'privacy': return <PrivacyPolicyPage onBack={() => navigateTo('home')} />;
          case 'terms': return <TermsOfServicePage onBack={() => navigateTo('home')} />;
          case 'about': return <AboutPage onBack={() => navigateTo('home')} />;
          case 'features': return <FeaturesPage onBack={() => navigateTo('home')} />;
          case 'home':
          default:
              return (
                <>
                {/* Hero Section */}
                <section className="relative min-h-[100vh] lg:min-h-[105vh] flex items-center justify-center pt-32 pb-32 overflow-hidden transition-colors duration-1000 dark:bg-[#020305] bg-white">
                  <div className="absolute inset-0 z-0">
                    <motion.div 
                      style={{ y: globeY }} 
                      className="absolute inset-x-0 top-[5%] bottom-[42%] lg:inset-0 flex items-center justify-center"
                    >
                        <ParticleGlobe isDark={darkMode} />
                    </motion.div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-mv-cyan/10 dark:bg-mv-cyan/20 rounded-full blur-[220px] pointer-events-none" aria-hidden="true" />
                  
                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
                      <motion.div 
                        style={{ y: contentY }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left z-20"
                      >
                        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-100/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl mb-8 shadow-xl">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-slate-600 dark:text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] font-display">BTC Index:</span>
                          <span className="text-slate-950 dark:text-white font-bold font-mono text-base tracking-tight">
                            {btcPrice > 0 ? `$${btcPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : <Loader2 className="animate-spin text-slate-400 dark:text-white/20 h-4 w-4" />}
                          </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight text-slate-950 dark:text-white mb-6 font-display uppercase leading-[0.85] italic text-shadow-sm dark:text-shadow-none">
                            <span className="inline-block pr-2">LIGHTNING</span> <br/>
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-mv-cyan dark:from-mv-cyan to-mv-purple dark:to-mv-purple pr-8 -mr-8">BOUNTIES</span>
                        </h1>

                        <motion.h2 
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.6
                              }
                            }
                          }}
                          className="text-lg md:text-2xl font-black mb-10 tracking-[0.2em] font-display uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-900 via-purple-900 to-fuchsia-900 dark:from-mv-cyan dark:via-mv-purple dark:to-mv-magenta"
                        >
                           {"GITHUB BOUNTIES PAID IN BITCOIN".split(" ").map((word, i) => (
                             <motion.span 
                                key={i}
                                variants={{
                                  hidden: { opacity: 0, y: 10 },
                                  visible: { opacity: 1, y: 0 }
                                }}
                                className="inline-block mr-3"
                             >
                               {word}
                             </motion.span>
                           ))}
                        </motion.h2>
                        
                        <p className="max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-slate-950 dark:text-white/60 mb-12 font-bold leading-relaxed font-sans">
                            Reward open-source developers instantly in <span className="text-cyan-900 dark:text-mv-cyan font-black">Bitcoin</span> for solving GitHub issues.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 w-full sm:w-auto">
                            <a 
                                href="https://app.lightningbounties.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-10 py-5 font-bold text-sm uppercase tracking-widest font-display text-white overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 text-center focus:ring-4 focus:ring-mv-cyan/50 focus:outline-none"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-mv-cyan to-mv-purple transition-all duration-500 group-hover:scale-110"></div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                EXPLORE BOUNTIES <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                                </span>
                            </a>
                            <button 
                                onClick={() => navigateTo('how-it-works')}
                                className="group relative px-10 py-5 font-bold text-sm uppercase tracking-widest font-display text-slate-950 dark:text-white border-2 border-slate-950 dark:border-white/20 hover:border-mv-magenta bg-white/50 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-mv-magenta/20 rounded-xl focus:ring-4 focus:ring-mv-magenta/50 focus:outline-none"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                HOW IT WORKS <PlayCircle size={22} className="group-hover:text-mv-magenta transition-colors duration-300" strokeWidth={2} />
                                </span>
                            </button>
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="flex-1 hidden lg:flex justify-end items-center perspective-1000 z-10"
                      >
                        <div className="relative w-[480px] h-[480px] flex items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-mv-cyan/30 dark:border-mv-cyan/10 border-dashed" />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-16 rounded-full border-2 border-slate-300 dark:border-white/5 border-dotted" />
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/80 p-3 rounded-xl border border-slate-200 dark:border-mv-cyan/40 shadow-xl backdrop-blur-md"><Cpu size={24} className="text-mv-cyan" /></div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/80 p-3 rounded-xl border border-slate-200 dark:border-mv-magenta/40 shadow-xl backdrop-blur-md"><Database size={24} className="text-mv-magenta" /></div>
                                <div className="absolute top-1/2 -left-3 -translate-y-1/2 bg-white/90 dark:bg-black/80 p-3 rounded-xl border border-slate-200 dark:border-mv-cyan/40 shadow-xl backdrop-blur-md"><GitBranch size={24} className="text-mv-cyan" /></div>
                                <div className="absolute top-1/2 -right-3 -translate-y-1/2 bg-white/90 dark:bg-black/80 p-3 rounded-xl border border-slate-200 dark:border-mv-magenta/40 shadow-xl backdrop-blur-md"><Zap size={24} className="text-mv-magenta" /></div>
                            </motion.div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px 0px rgba(6,182,212,0.1)", "0 0 50px 10px rgba(6,182,212,0.3)", "0 0 20px 0px rgba(6,182,212,0.1)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.1, rotate: 2 }} className="w-48 h-48 md:w-72 md:h-72 flex items-center justify-center relative group rounded-full">
                                    <div className="relative z-10 w-40 h-40 md:w-60 md:h-60 bg-white/20 dark:bg-black border border-slate-300 dark:border-white/10 rounded-full flex items-center justify-center backdrop-blur-3xl shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-mv-cyan/50">
                                        <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.3, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-tr from-mv-cyan/40 to-mv-magenta/40" />
                                        <img src="images/logo3.png" alt="Hero Logo" className="w-full h-full object-cover scale-[1.3] transition-transform duration-700 group-hover:scale-[1.5] drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
                                    </div>
                                    <motion.div animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-full border-2 border-mv-cyan/40" />
                                </motion.div>
                            </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Metrics Section */}
                <section className="relative z-20 py-24 bg-slate-50 dark:bg-black border-y border-slate-200 dark:border-white/5 transition-colors duration-1000 overflow-hidden">
                  <NexusBackground isDark={darkMode} />
                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                      {[
                          { icon: Database, color: 'text-mv-cyan', label: 'Open Bounties', val: getMetricValue('Open Bounties') || getMetricValue('openBounties') },
                          { icon: GitBranch, color: 'text-mv-magenta', label: 'Unique Repos', val: getMetricValue('Unique Repositories') || getMetricValue('uniqueRepos') },
                          { icon: CheckCircle, color: 'text-blue-600', label: 'Total Bounties', val: getMetricValue('Total Bounties') || getMetricValue('totalBounties') },
                          { icon: Users, color: 'text-emerald-600', label: 'Total Developers', val: getMetricValue('Total Developers') || getMetricValue('totalDevelopers') },
                          { icon: Zap, color: 'text-yellow-600', label: 'Sats Rewarded', val: getMetricValue('Total Sats Rewarded').toLocaleString() }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group cursor-default">
                            <div className={`w-12 h-12 bg-white/80 dark:bg-white/5 rounded-lg flex items-center justify-center mb-4 border border-slate-300 dark:border-white/10 group-hover:border-mv-cyan/50 transition-all group-hover:scale-110 shadow-md backdrop-blur-md`}>
                                <item.icon className={item.color} size={24} aria-hidden="true" />
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-display min-h-[36px] flex items-center justify-center">
                                {isLoading ? <Loader2 className="animate-spin text-slate-400 dark:text-white/20" size={20} /> : item.val}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-white/40 group-hover:text-mv-cyan transition-colors">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
                  <section id="leaderboard" className="scroll-mt-24 relative overflow-hidden p-1 rounded-2xl">
                     <div className="absolute inset-0 opacity-15 pointer-events-none">
                        <NexusBackground isDark={darkMode} />
                     </div>
                     {isLoading ? (
                       <div className="w-full h-96 flex items-center justify-center bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl shadow-sm">
                          <Loader2 className="animate-spin text-mv-cyan" size={48} aria-label="Loading leaderboard" />
                       </div>
                     ) : (
                       <LeaderboardTable developers={developers} btcPrice={btcPrice} />
                     )}
                  </section>

                  <section id="bounties" className="scroll-mt-24 relative overflow-hidden p-1 rounded-2xl">
                     <div className="absolute inset-0 opacity-15 pointer-events-none">
                        <NexusBackground isDark={darkMode} />
                     </div>
                     {isLoading ? (
                        <div className="w-full h-96 flex items-center justify-center bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl shadow-sm">
                           <Loader2 className="animate-spin text-orange-500" size={48} aria-label="Loading bounties" />
                        </div>
                     ) : (
                       <OpenBountiesTable bounties={openBounties} btcPrice={btcPrice} />
                     )}
                  </section>

                  {/* Homepage Features Section */}
                  <section id="homepage-features" className="scroll-mt-24 py-12 relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/5 p-8">
                     <FlowingBackground isDark={darkMode} />
                     
                     <div className="relative z-10 text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 font-display uppercase tracking-tight italic leading-[1.1]">
                            WHY DEVELOPERS & <br className="hidden md:block" /> 
                            ORGANIZATIONS CHOOSE <br />
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-mv-cyan to-mv-magenta pr-8 -mr-8">LIGHTNING BOUNTIES</span>
                        </h2>
                        <p className="text-sm md:text-lg text-slate-600 dark:text-white/60 font-bold uppercase tracking-[0.3em]">
                            ZERO FRICTION. GLOBAL ACCESS. INSTANT REWARDS.
                        </p>
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Ban, title: "No Setup Required", desc: "No plugins, no installations, no GitHub changes. Post a bounty in 5 clicks or claim one instantly. Just copy-paste a GitHub Issue URL and go." },
                            { icon: Zap, title: "Lightning-Fast Payments", desc: "Bitcoin payouts via Lightning Network arrive in seconds, not days. No invoices, no wire transfers, no waiting—just instant global payments." },
                            { icon: Globe, title: "Global Access", desc: "Bypass Stripe, PayPal, and region-locked payment processors. Bitcoin operates globally—anyone, anywhere can participate and earn." },
                            { icon: HeartHandshake, title: "Crowdfunding", desc: "Multiple contributors can fund a single bounty. Support issues on VSCode, Django, React—even if you're not the project owner." },
                            { icon: CameraOff, title: "Anonymous Bounty Posting", desc: "Contribute to bounties without revealing your identity. Perfect for those who value privacy." },
                            { icon: Lock, title: "Escrow Protection", desc: "Bounties are locked in escrow for a set time (e.g., 2 weeks). Developers know the reward is secured before they start working." }
                        ].map((f, i) => (
                            <div key={i} className="bg-white/90 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-2xl transition-all duration-500 group shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_20px_40px_rgba(6,182,212,0.12)] hover:border-mv-cyan hover:-translate-y-2 hover:scale-[1.02]">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-white/10 group-hover:border-mv-cyan/50 group-hover:bg-mv-cyan/5 transition-all duration-300">
                                    <f.icon className="text-slate-600 dark:text-slate-400 group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan transition-colors duration-300">
                                    {f.title}
                                </h3>
                                <p className="text-slate-700 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                  </section>
                </div>

                {/* Promotional Section */}
                <div className="relative z-10 max-w-4xl mx-auto my-16 bg-white dark:bg-[#020305] border border-slate-300 dark:border-slate-800 rounded-3xl p-1 shadow-2xl transition-all duration-300 hover:ring-1 hover:ring-cyan-500/30 group/LI overflow-hidden">
                    <AuraBackground isDark={darkMode} />
                    <div className="p-8 md:p-12 relative overflow-hidden bg-white/40 dark:bg-[#020305]/60 backdrop-blur-xl rounded-[22px]">
                        <div className="relative z-10 text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-900/10 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 border border-cyan-500/30 dark:border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                <Sparkles size={14} aria-hidden="true" />
                                <span>Automation Tool</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-tight leading-none italic">
                                <span className="inline-block pr-2">INTRODUCING</span> <br/>
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-mv-cyan to-mv-purple group-hover/LI:brightness-125 transition-all pr-8 -mr-8">LIGHTNING ISSUES</span>
                            </h2>
                            <p className="text-slate-700 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-sans font-medium">
                                Lightning Issues scans GitHub repositories and automatically creates professional GitHub Issues based on current codebase analysis, feature suggestions, and quality gaps.
                            </p>
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto text-center">
                            <a 
                                href="https://issues.lightningbounties.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex group/btn relative px-10 py-5 font-bold text-sm uppercase tracking-widest font-display text-white overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0 items-center justify-center gap-3 focus:ring-4 focus:ring-mv-cyan/50 focus:outline-none"
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
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white font-sans transition-colors duration-300 flex flex-col overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:text-mv-cyan focus:px-4 focus:py-2 focus:rounded-md focus:m-2 focus:ring-2 focus:ring-mv-cyan">
        Skip to main content
      </a>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} onNavigate={navigateTo} />
      
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        {renderContent()}
      </main>

      <Footer darkMode={darkMode} toggleTheme={toggleTheme} onNavigate={navigateTo} />
    </div>
  );
};