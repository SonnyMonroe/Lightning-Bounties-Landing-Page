import React from 'react';
import { User, Shield, ArrowLeft, ExternalLink, GitPullRequest, Search, Zap, LogIn, PlusCircle, Wallet, CheckCircle } from 'lucide-react';

interface HowItWorksPageProps {
  onBack: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBack }) => {
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
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-[#111] rounded-full mb-6 border border-black/10 dark:border-white/10 shadow-sm">
            <Zap size={40} className="text-cyan-800 dark:text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tight mb-6 text-black dark:text-white">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-purple-700 dark:from-cyan-400 dark:to-purple-400">Works</span>
          </h1>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto font-bold">
            Whether you're coding for sats or sourcing talent, we've made the process seamless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Bounty Hunters Column */}
            <div className="flex flex-col space-y-6">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-400 mb-4 ring-1 ring-cyan-200 dark:ring-cyan-700/50 shadow-sm">
                        <User size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-black dark:text-white font-display uppercase tracking-wide">
                        For Bounty Hunters
                    </h2>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                    <StepCard 
                        number="1" 
                        title="Visit & Connect"
                        color="cyan"
                        icon={<LogIn size={20} />}
                    >
                        Visit the <a href="https://app.lightningbounties.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-800 dark:text-cyan-400 font-bold hover:underline inline-flex items-center gap-1 decoration-2 underline-offset-2">Lightning Bounties Platform <ExternalLink size={14}/></a> & Login with your GitHub account.
                    </StepCard>

                    <StepCard 
                        number="2" 
                        title="Browse Open Bounties"
                        color="cyan"
                        icon={<Search size={20} />}
                    >
                        Explore the live feed to find unsolved issues you can tackle. Filter by language, reward amount, or project to find the perfect match.
                    </StepCard>

                    <StepCard 
                        number="3" 
                        title="Fork, Fix & Submit"
                        color="cyan"
                        icon={<GitPullRequest size={20} />}
                    >
                        Fork the repo, solve the issue, and create a Pull Request. Include <code className="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-cyan-800 dark:text-cyan-300 font-mono text-xs font-bold border border-black/5 dark:border-white/5">close #&lt;issue-number&gt;</code> in your PR description.
                    </StepCard>

                    <StepCard 
                        number="4" 
                        title="Merge & Claim Reward"
                        color="cyan"
                        icon={<Wallet size={20} />}
                    >
                        Once your PR is merged, the bounty is yours. Go to your dashboard and claim your Sats instantly via Lightning Network.
                    </StepCard>
                </div>
            </div>

            {/* Bounty Posters Column */}
            <div className="flex flex-col space-y-6">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 mb-4 ring-1 ring-purple-200 dark:ring-purple-700/50 shadow-sm">
                        <Shield size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-black dark:text-white font-display uppercase tracking-wide">
                        For Bounty Posters
                    </h2>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                    <StepCard 
                        number="1" 
                        title="Login (Optional)"
                        color="purple"
                        icon={<LogIn size={20} />}
                    >
                        Log in with your GitHub account. You can browse without logging in, but posting requires authentication to manage your bounties.
                    </StepCard>

                    <StepCard 
                        number="2" 
                        title="Submit an Issue"
                        color="purple"
                        icon={<PlusCircle size={20} />}
                    >
                        Click "Post a Bounty" and paste the GitHub Issue URL. We'll automatically fetch details like title and description.
                    </StepCard>

                    <StepCard 
                        number="3" 
                        title="Fund the Bounty"
                        color="purple"
                        icon={<Zap size={20} />}
                    >
                        Set the reward amount in Sats and define a lock-time. Pay the generated Lightning invoice to escrow the funds securely.
                    </StepCard>

                    <StepCard 
                        number="4" 
                        title="Review & Merge"
                        color="purple"
                        icon={<CheckCircle size={20} />}
                    >
                        Review incoming Pull Requests on GitHub. Merging a PR automatically triggers the reward release to the developer.
                    </StepCard>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

// Helper Component for Steps
const StepCard = ({ number, title, children, color, icon }: { number: string, title: string, children: React.ReactNode, color: 'cyan' | 'purple', icon: React.ReactNode }) => {
    const isCyan = color === 'cyan';
    const borderColor = isCyan ? 'border-cyan-200 dark:border-cyan-800' : 'border-purple-200 dark:border-purple-800';
    const hoverBorderColor = isCyan ? 'group-hover:border-cyan-500 dark:group-hover:border-cyan-400' : 'group-hover:border-purple-500 dark:group-hover:border-purple-400';
    const numBg = isCyan ? 'bg-cyan-700 dark:bg-cyan-500' : 'bg-purple-700 dark:bg-purple-500';
    const iconColor = isCyan ? 'text-cyan-800 dark:text-cyan-400' : 'text-purple-800 dark:text-purple-400';
    const shadow = isCyan ? 'hover:shadow-cyan-500/20' : 'hover:shadow-purple-500/20';

    return (
        <div className={`group bg-white dark:bg-[#111] border ${borderColor} ${hoverBorderColor} p-6 rounded-xl shadow-md ${shadow} transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}>
            <div className="flex items-start gap-5 relative z-10">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${numBg} text-white flex items-center justify-center font-bold font-display text-lg shadow-lg`}>
                    {number}
                </div>
                <div>
                    <h4 className={`text-xl font-bold text-black dark:text-white uppercase mb-2 flex items-center gap-2 group-hover:${iconColor} transition-colors`}>
                        {title}
                    </h4>
                    <div className="text-black dark:text-white text-base leading-relaxed font-medium opacity-90">
                        {children}
                    </div>
                </div>
            </div>
            {/* Subtle background icon */}
            <div className={`absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity ${iconColor}`}>
               {React.cloneElement(icon as React.ReactElement<any>, { size: 120 })}
            </div>
        </div>
    );
}