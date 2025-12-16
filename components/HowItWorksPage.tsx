import React from 'react';
import { User, Shield, ArrowLeft } from 'lucide-react';

interface HowItWorksPageProps {
  onBack: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-mv-cyan transition-colors mb-8 group font-bold text-sm uppercase tracking-wider font-display"
        >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-display uppercase tracking-tight mb-6">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">Works</span>
          </h1>
          <p className="text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium">
            Whether you're coding for sats or sourcing talent, we've made the process seamless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 relative">
            {/* Divider for large screens */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent -translate-x-1/2"></div>

            {/* Bounty Hunters Column */}
            <div className="flex flex-col">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-none h-full relative overflow-hidden group">
                     {/* Header */}
                     <div className="relative z-10 mb-10 text-center">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 mb-4 ring-1 ring-cyan-200 dark:ring-cyan-700/50">
                            <User size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display uppercase tracking-wide border-b-4 border-cyan-500 dark:border-cyan-400 inline-block pb-2 mb-2">
                            For Bounty Hunters
                        </h2>
                        <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 font-display uppercase tracking-wider mb-4">
                            How It Works
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm font-medium">
                            Developers browse bounties, claim issues they can solve, and work on solutions. Submit your pull request on GitHub when ready—our platform tracks everything automatically.
                        </p>
                     </div>

                     {/* Steps */}
                     <div className="space-y-8 relative z-10">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center font-bold font-display shadow-lg shadow-cyan-500/30">1</div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase mb-1">
                                    Visit the <span className="text-cyan-600 dark:text-cyan-400 border-b border-cyan-500/50">Lightning Bounties Platform</span> & Login with your GitHub
                                </h4>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center font-bold font-display shadow-lg shadow-cyan-500/30">2</div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase mb-1">Browse Open Bounties</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Explore the live feed to find unsolved issues you can tackle. Each bounty shows the project name, issue description, reward in sats, and status (open vs claimed).
                                </p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center font-bold font-display shadow-lg shadow-cyan-500/30">3</div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase mb-1">Fork, Fix & Submit</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Fork the repo, work on the issue, then create a pull request. Make sure your PR description includes <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-cyan-600 dark:text-cyan-400 font-mono text-xs">close #&lt;issue-number&gt;</code> so the platform — via GitHub API — correctly detects the fix for payment.
                                </p>
                            </div>
                        </div>
                        {/* Step 4 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center font-bold font-display shadow-lg shadow-cyan-500/30">4</div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase mb-1">Merge & Claim Reward</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Once your PR is merged, go to your dashboard and click "Claim Reward." Payment in sats flows instantly via Lightning — no red tape, no delays.
                                </p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            {/* Bounty Posters Column */}
            <div className="flex flex-col">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-none h-full relative overflow-hidden group">
                     {/* Header */}
                     <div className="relative z-10 mb-10 text-center">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 mb-4 ring-1 ring-purple-200 dark:ring-purple-700/50">
                            <Shield size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display uppercase tracking-wide border-b-4 border-purple-500 dark:border-purple-400 inline-block pb-2 mb-2">
                            For Bounty Posters
                        </h2>
                        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 font-display uppercase tracking-wider mb-4">
                            How to Post a Bounty
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm font-medium">
                            Organizations and maintainers post GitHub issues with Bitcoin rewards. Set your bounty amount in sats, add requirements, and let the community see your need.
                        </p>
                     </div>

                     {/* Steps */}
                     <div className="space-y-8 relative z-10">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold font-display shadow-lg shadow-purple-500/30">1</div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase mb-1">
                                    (Optional) Log in with GitHub
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Just like devs — log in with your GitHub account and you're ready to go.
                                </p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold font-display shadow-lg shadow-purple-500/30">2</div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase mb-1">Click "Submit an Issue" & Paste Issue URL</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Drop in the GitHub issue URL you want resolved, set a reward amount in sats, and define a lock-time period (how long the bounty stays active).
                                </p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold font-display shadow-lg shadow-purple-500/30">3</div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase mb-1">Fund the Bounty</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Deposit sats into Lightning Bounties via a generated Lightning invoice. Funds go into escrow until someone claims and solves the issue.
                                </p>
                            </div>
                        </div>
                        {/* Step 4 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center font-bold font-display shadow-lg shadow-purple-500/30">4</div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase mb-1">Review Submitted Pull Requests on GitHub</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    When someone submits a PR for the issue, review the changes using GitHub's usual workflow. If it meets your standards, merge. Once merged, the platform automatically releases the sats to the solver.
                                </p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};