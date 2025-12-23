import React from 'react';
import { ArrowLeft, Ban, Zap, Globe, HeartHandshake, CameraOff, Lock } from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onBack }) => {
  const features = [
    {
      icon: Ban,
      title: "No Setup Required",
      desc: "No plugins, no installations, no GitHub changes. Post a bounty in 5 clicks or claim one instantly. Just copy-paste a GitHub Issue URL and go."
    },
    {
      icon: Zap,
      title: "Lightning-Fast Payments",
      desc: "Bitcoin payouts via Lightning Network arrive in seconds, not days. No invoices, no wire transfers, no waiting—just instant global payments."
    },
    {
      icon: Globe,
      title: "Global Access",
      desc: "Bypass Stripe, PayPal, and region-locked payment processors. Bitcoin operates globally—anyone, anywhere can participate and earn."
    },
    {
      icon: HeartHandshake,
      title: "Crowdfunding",
      desc: "Multiple contributors can fund a single bounty. Support issues on VSCode, Django, React—even if you're not the project owner."
    },
    {
      icon: CameraOff,
      title: "Anonymous Bounty Posting",
      desc: "Contribute to bounties without revealing your identity. Perfect for those who value privacy."
    },
    {
      icon: Lock,
      title: "Escrow Protection",
      desc: "Bounties are locked in escrow for a set time (e.g., 2 weeks). Developers know the reward is secured before they start working."
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-black text-black dark:text-white transition-colors duration-300 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-black dark:text-white hover:text-blue-900 dark:hover:text-cyan-400 transition-colors mb-8 group font-bold text-sm uppercase tracking-wider font-display bg-white dark:bg-white/10 py-2.5 px-5 rounded-full border border-black/20 dark:border-white/20 shadow-sm"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>

        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tight mb-6 text-black dark:text-white leading-[1.1] italic">
            Why Developers & <br className="hidden md:block" /> 
            Organizations Choose <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mv-cyan to-mv-magenta">Lightning Bounties</span>
          </h1>
          <p className="text-lg text-black dark:text-white/60 font-bold uppercase tracking-[0.2em]">
            Zero friction. Global access. Instant rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white dark:bg-[#0a0a0f] border border-slate-200 dark:border-white/10 p-8 rounded-2xl transition-all duration-500 group shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgba(6,182,212,0.1)] dark:hover:shadow-[0_20px_40px_rgba(6,182,212,0.05)] hover:border-mv-cyan hover:-translate-y-2 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-white/10 group-hover:border-mv-cyan/50 group-hover:bg-mv-cyan/5 transition-all duration-300">
                    <f.icon className="text-slate-600 dark:text-slate-400 group-hover:text-mv-cyan transition-colors" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display uppercase tracking-wide group-hover:text-mv-cyan transition-colors duration-300">
                    {f.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {f.desc}
                </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};