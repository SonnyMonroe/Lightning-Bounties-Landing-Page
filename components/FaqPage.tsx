import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, ArrowLeft, Zap, Shield, Code, Sparkles, HelpCircle, AlertCircle } from 'lucide-react';

interface FaqPageProps {
  onBack: () => void;
}

type Category = 'General' | 'Hunters' | 'Posters' | 'Features';

interface FaqItem {
  id: string;
  category: Category;
  question: string;
  answer: React.ReactNode;
}

// Reusable formatting components for consistency and high contrast
const Strong: React.FC<{ children: React.ReactNode; colorClass?: string }> = ({ children, colorClass }) => (
  <strong className={`font-bold ${colorClass || 'text-black dark:text-white'}`}>
    {children}
  </strong>
);

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-blue-950 dark:text-cyan-300 hover:text-blue-800 dark:hover:text-cyan-100 underline decoration-2 underline-offset-2 font-bold transition-colors"
  >
    {children}
  </a>
);

const Badge: React.FC<{ children: React.ReactNode; variant: 'orange' | 'green' | 'purple' | 'cyan' }> = ({ children, variant }) => {
  // Using high contrast borders and text
  const styles = {
    orange: 'bg-orange-50 text-orange-950 border-orange-400 dark:bg-orange-900/60 dark:text-white dark:border-orange-500',
    green: 'bg-green-50 text-green-950 border-green-400 dark:bg-green-900/60 dark:text-white dark:border-green-500',
    purple: 'bg-purple-50 text-purple-950 border-purple-400 dark:bg-purple-900/60 dark:text-white dark:border-purple-500',
    cyan: 'bg-cyan-50 text-cyan-950 border-cyan-400 dark:bg-cyan-900/60 dark:text-white dark:border-cyan-500',
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded-md font-bold text-sm border ${styles[variant]} mx-1 align-middle`}>
      {children}
    </span>
  );
};

const Callout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-lg border border-black dark:border-white my-4 shadow-sm">
    <p className="font-bold text-black dark:text-white mb-2 uppercase text-xs tracking-wider flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-2">
      <AlertCircle size={14} className="text-black dark:text-white"/> {title}
    </p>
    <div className="text-black dark:text-white font-medium text-base leading-relaxed">
      {children}
    </div>
  </div>
);

const List: React.FC<{ items: React.ReactNode[]; type?: 'ul' | 'ol' }> = ({ items, type = 'ul' }) => {
  const Component = type;
  return (
    <Component className={`pl-6 space-y-2 my-3 ${type === 'ul' ? 'list-disc' : 'list-decimal'} marker:text-black dark:marker:text-white marker:font-bold`}>
      {items.map((item, idx) => (
        <li key={idx} className="text-black dark:text-white pl-2 font-medium">
          {item}
        </li>
      ))}
    </Component>
  );
};

// Data Definition
const FAQ_DATA: FaqItem[] = [
  // --- General ---
  {
    id: 'gen-1',
    category: 'General',
    question: "What's Lightning Bounties?",
    answer: (
      <>
        <p>Lightning Bounties is a Bitcoin-powered bug bounty platform that seamlessly integrates with GitHub’s familiar workflows, allowing developers to earn Bitcoin for fixing bugs and contributing to open-source projects.</p>
        <p className="mt-4">Getting started is simple—no installations or complicated setups required. Just visit <ExternalLink href="https://app.lightningbounties.com/">app.lightningbounties.com</ExternalLink>, log in with your GitHub account, and you’re ready to post or solve bounties instantly.</p>
      </>
    )
  },
  {
    id: 'gen-2',
    category: 'General',
    question: "Who Typically Uses Lightning Bounties?",
    answer: (
      <>
        <p>Lightning Bounties caters to two primary groups:</p>
        <div className="mt-4 space-y-3">
          <p><Badge variant="orange">Developers</Badge> can showcase their skills, earn Bitcoin, and contribute to the growth of open-source technology.</p>
          <p><Badge variant="green">Organizations</Badge> can tap into a talented pool of developers to improve the quality and security of their software projects.</p>
        </div>
      </>
    )
  },
  {
    id: 'gen-3',
    category: 'General',
    question: "Why Link My GitHub Account?",
    answer: (
      <>
         <p>Linking your GitHub account is essential for verifying your contributions. It allows us to track Pull Requests and Issues automatically via the GitHub API.</p>
         <Callout title="TL;DR">Linking your GitHub account streamlines bug hunting, promotes collaboration, and ensures proper reward distribution when your code is merged.</Callout>
         <p className="text-sm">See <ExternalLink href="https://docs.lightningbounties.com/">docs</ExternalLink> for more detailed info.</p>
      </>
    )
  },
  {
    id: 'gen-4',
    category: 'General',
    question: "Is there a Token?",
    answer: (
      <p><strong>Nope.</strong> Bitcoin is the best currency for Lightning Bounties because it’s decentralized, secure, and globally accessible. We use Bitcoin (specifically Satoshis) for all payments. No speculative tokens, just sound money.</p>
    )
  },

  // --- Hunters ---
  {
    id: 'hunter-1',
    category: 'Hunters',
    question: "How Do I Find Bounties?",
    answer: (
      <>
        <p>Visit <ExternalLink href="https://app.lightningbounties.com/">app.lightningbounties.com</ExternalLink> and browse the "Available Bounties" section. You can filter by:</p>
        <List items={[
          "Technology / Language",
          "Reward Amount",
          "Time Commitment",
          "Repository Popularity"
        ]} />
      </>
    )
  },
  {
    id: 'hunter-2',
    category: 'Hunters',
    question: "How Do I Submit a Solution?",
    answer: (
      <List type="ol" items={[
        "Fork the GitHub repository containing the issue",
        "Create a branch for your solution",
        "Make your changes and commit them",
        "Submit a Pull Request referencing the issue number (e.g. 'closes #123')",
        "Once merged by the maintainer, your reward is processed"
      ]} />
    )
  },
  {
    id: 'hunter-3',
    category: 'Hunters',
    question: "How Do I Withdraw Earnings?",
    answer: (
      <>
        <p>Withdrawals are instant via the Lightning Network:</p>
        <List type="ol" items={[
          "Go to your Account Dashboard",
          "Click 'Withdraw'",
          "Generate a Lightning invoice from your own wallet (e.g., Phoenix, Wallet of Satoshi)",
          "Paste the invoice",
          "Confirm to receive funds instantly"
        ]} />
      </>
    )
  },
  {
    id: 'hunter-4',
    category: 'Hunters',
    question: "What Wallets Can I Use?",
    answer: (
      <>
        <p>Any wallet supporting <Strong>Lightning Network (BOLT-11)</Strong> invoices works. Popular choices include:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {['Phoenix', 'Muun', 'Breez', 'Wallet of Satoshi', 'Blue Wallet', 'Cash App'].map(wallet => (
            <div key={wallet} className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] p-2 rounded border border-black/20 dark:border-white/20 shadow-sm text-sm font-bold text-black dark:text-white">
              <div className="w-2 h-2 rounded-full bg-cyan-500" /> {wallet}
            </div>
          ))}
        </div>
      </>
    )
  },

  // --- Posters ---
  {
    id: 'poster-1',
    category: 'Posters',
    question: "How Do I Post a Bounty?",
    answer: (
      <>
        <Callout title="Quick Start">
          Log in, paste the GitHub Issue URL, set a reward in Sats, and pay the invoice. That's it.
        </Callout>
        <List type="ol" items={[
          "Log in to Lightning Bounties",
          "Click 'Post a Bounty'",
          "Paste the GitHub Issue URL",
          "Set reward amount (sats) and lock-time",
          "Pay the invoice to fund the bounty escrow"
        ]} />
      </>
    )
  },
  {
    id: 'poster-2',
    category: 'Posters',
    question: "What is a Lock Time?",
    answer: (
      <>
        <p>A <Strong>lock time</Strong> guarantees that the reward remains available for a set period (e.g., two weeks). It gives developers confidence that the funds are actually there and won't be pulled while they are working.</p>
        <p className="mt-2 text-sm text-black dark:text-white">After the lock time expires, if the issue is unsolved, you can reclaim your funds.</p>
      </>
    )
  },
  {
    id: 'poster-3',
    category: 'Posters',
    question: "Can I Post for Any Repo?",
    answer: (
      <p>Yes! You can post bounties for <Strong>any</Strong> open-source project on GitHub, even if you are not the owner. This is great for prioritizing bugs in libraries you depend on.</p>
    )
  },

  // --- Features ---
  {
    id: 'feat-1',
    category: 'Features',
    question: "Anonymous Rewards",
    answer: (
      <p>Anonymous Rewards allows users to contribute sats to bounties privately. Your identity remains hidden on the public leaderboard, but you still support the open-source ecosystem.</p>
    )
  },
  {
    id: 'feat-2',
    category: 'Features',
    question: "Crowdfunding / Collaborative Funding",
    answer: (
      <p>Multiple users can contribute to a single bounty. If an issue is important to many people, they can all chip in to raise the reward amount, attracting better talent faster.</p>
    )
  },
  {
    id: 'feat-3',
    category: 'Features',
    question: "Add Without Login",
    answer: (
      <p>This feature enables anyone to contribute sats to existing bounties without creating an account. It leverages address verification for security, making it dead simple for drive-by contributors to support an issue.</p>
    )
  }
];

export const FaqPage: React.FC<FaqPageProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredData = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(search.toLowerCase()) || 
                            (typeof item.answer === 'string' && item.answer.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const categories: (Category | 'All')[] = ['All', 'General', 'Hunters', 'Posters', 'Features'];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 dark:bg-black text-black dark:text-white transition-colors duration-300 font-sans relative z-20">
      
      {/* --- Header Section --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-black dark:text-white hover:text-blue-900 dark:hover:text-cyan-400 transition-colors mb-8 group font-bold text-sm uppercase tracking-wider font-display bg-white dark:bg-white/10 py-2.5 px-5 rounded-full border border-black/20 dark:border-white/20 shadow-sm"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 text-black dark:text-white shadow-lg mb-4">
            <HelpCircle size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tight text-black dark:text-white drop-shadow-sm">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-purple-700 dark:from-cyan-400 dark:to-purple-400">Questions</span>
          </h1>
          <p className="text-lg md:text-xl text-black dark:text-white font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about earning Bitcoin for code, posting bounties, and our platform features.
          </p>
        </div>
      </div>

      {/* --- Controls Section (Search & Tabs) --- */}
      <div className="sticky top-20 z-30 bg-slate-50/95 dark:bg-black/95 backdrop-blur-md border-y border-black/10 dark:border-white/10 py-4 mb-12 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-6">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-black/50 dark:text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-black/20 dark:border-white/20 rounded-lg leading-5 bg-white dark:bg-[#111] text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all font-bold shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-1 md:pb-0 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider font-display transition-all border shadow-sm
                  ${activeCategory === cat 
                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-md transform scale-105' 
                    : 'bg-white text-black border-black/10 hover:border-black hover:bg-white dark:bg-[#111] dark:text-white dark:border-white/10 dark:hover:border-white'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- FAQ List --- */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {filteredData.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111] rounded-2xl border border-dashed border-black/20 dark:border-white/20 shadow-sm">
            <Search className="h-12 w-12 text-black/30 dark:text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black dark:text-white">No questions found</h3>
            <p className="text-black/60 dark:text-white/60 mt-2 font-medium">Try adjusting your search terms or category.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-6 text-black dark:text-white font-bold hover:underline uppercase tracking-wide text-sm">Clear Filters</button>
          </div>
        ) : (
          filteredData.map((item) => (
            <div 
              key={item.id} 
              className={`
                group bg-white dark:bg-[#111] rounded-xl border transition-all duration-200
                ${openItems[item.id] 
                  ? 'border-black dark:border-white shadow-xl ring-1 ring-black/5 dark:ring-white/10' 
                  : 'border-black/10 dark:border-white/10 hover:border-black/50 dark:hover:border-white/50 hover:shadow-md'}
              `}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={openItems[item.id]}
              >
                <div className="flex items-start gap-4 pr-4">
                  <div className={`
                    mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center border
                    ${openItems[item.id] 
                      ? 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-[#1a1a1a] dark:border-white/10 dark:text-white group-hover:border-black dark:group-hover:border-white transition-colors'}
                  `}>
                    {item.category === 'General' && <Zap size={16} />}
                    {item.category === 'Hunters' && <Code size={16} />}
                    {item.category === 'Posters' && <Shield size={16} />}
                    {item.category === 'Features' && <Sparkles size={16} />}
                  </div>
                  <span className={`text-lg md:text-xl font-bold font-display uppercase tracking-wide leading-tight text-black dark:text-white ${openItems[item.id] ? 'underline decoration-2 underline-offset-4' : ''}`}>
                    {item.question}
                  </span>
                </div>
                <ChevronDown 
                  className={`shrink-0 text-black/40 dark:text-white/40 transition-transform duration-200 ${openItems[item.id] ? 'rotate-180 text-black dark:text-white' : 'group-hover:text-black dark:group-hover:text-white'}`} 
                  size={24} 
                  strokeWidth={2.5}
                />
              </button>
              
              <div 
                className={`
                  grid transition-[grid-template-rows] duration-200 ease-out
                  ${openItems[item.id] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}
              >
                <div className="overflow-hidden">
                    <div className="p-6 pt-0 pl-[4.5rem] text-base md:text-lg text-black dark:text-white leading-relaxed font-medium">
                    {item.answer}
                    </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- Footer Hint --- */}
      <div className="max-w-2xl mx-auto text-center mt-16 px-4">
        <p className="text-black dark:text-white font-bold">
          Still have questions? Check out our <ExternalLink href="https://docs.lightningbounties.com">Documentation</ExternalLink> or join the <ExternalLink href="https://discord.gg/lightningbounties">Community</ExternalLink>.
        </p>
      </div>

    </div>
  );
};