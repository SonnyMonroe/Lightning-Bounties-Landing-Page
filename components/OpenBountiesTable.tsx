import React, { useState, useMemo } from 'react';
import { UnclaimedIssue } from '../types';
import { Zap, Github, ChevronDown, ChevronUp, ArrowUpDown, ExternalLink, Bitcoin, DollarSign, Target } from 'lucide-react';

interface OpenBountiesTableProps {
  bounties: UnclaimedIssue[];
  btcPrice: number;
}

type SortKey = keyof UnclaimedIssue;
type SortDirection = 'asc' | 'desc';
type Currency = 'SATS' | 'USD';

export const OpenBountiesTable: React.FC<OpenBountiesTableProps> = ({ bounties, btcPrice }) => {
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);
  const [currency, setCurrency] = useState<Currency>('SATS');

  const sortedBounties = useMemo(() => {
    let sortableItems = [...bounties];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle potential undefined values for id/url if sorting by them (unlikely but safe)
        if (aValue === undefined || bValue === undefined) return 0;

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [bounties, sortConfig]);

  const displayedBounties = showAll ? sortedBounties : sortedBounties.slice(0, 5);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    
    // Default to descending for reward
    if (key === 'rewardInSats' && (!sortConfig || sortConfig.key !== key)) {
        direction = 'desc';
    } else if (sortConfig && sortConfig.key === key) {
        // Toggle
        direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKey) => {
      if (!sortConfig || sortConfig.key !== key) {
          return <ArrowUpDown size={14} className="opacity-30 group-hover:opacity-100 transition-opacity" />;
      }
      return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  const getAriaSort = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
        return 'none';
    }
    return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
  };

  const handleRowClick = (bounty: UnclaimedIssue) => {
    const appUrl = bounty.id ? `https://app.lightningbounties.com/issue/${bounty.id}` : 'https://app.lightningbounties.com/';
    window.open(appUrl, '_blank');
  };

  const formatReward = (sats: number) => {
    if (currency === 'SATS') {
        return `${sats.toLocaleString()} Sats`;
    }
    const usdValue = (sats / 100_000_000) * btcPrice;
    return `$${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="w-full bg-white dark:bg-mv-card border border-slate-300 dark:border-mv-border rounded-xl overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">
      <div className="p-8 border-b border-slate-300 dark:border-mv-border bg-slate-100/50 dark:bg-gradient-to-r dark:from-mv-card dark:to-mv-dark flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3 mb-2 font-display uppercase tracking-widest leading-none">
            Unsolved Bounties 
            <Target size={32} className="text-orange-500 drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" strokeWidth={1.5} />
            </h3>
            <p className="text-slate-700 dark:text-slate-400 text-sm md:text-base font-semibold max-w-lg mb-6">
            Open opportunities available for YOU to solve!
            </p>
        </div>

        <div className="flex justify-center">
            <div className="bg-slate-300/50 dark:bg-white/5 p-1 rounded-lg flex items-center border border-slate-300 dark:border-white/10 shadow-inner">
                <button
                    onClick={() => setCurrency('SATS')}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                        ${currency === 'SATS' 
                            ? 'bg-white dark:bg-mv-cyan/20 text-slate-900 dark:text-mv-cyan shadow-md border border-slate-300 dark:border-mv-cyan/50' 
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
                    `}
                >
                   <Bitcoin size={14} /> Sats
                </button>
                <button
                    onClick={() => setCurrency('USD')}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                        ${currency === 'USD' 
                            ? 'bg-white dark:bg-green-500/20 text-slate-900 dark:text-green-400 shadow-md border border-slate-300 dark:border-green-500/50' 
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
                    `}
                >
                   <DollarSign size={14} /> USD
                </button>
            </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-full">
          <thead className="bg-slate-200 dark:bg-white/5 border-b border-slate-300 dark:border-mv-border text-slate-900 dark:text-slate-400 uppercase text-xs font-black tracking-widest font-display">
            <tr>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-5 border-b border-slate-300 dark:border-mv-border w-12 sm:w-16" scope="col"></th>
              <th 
                scope="col"
                className="px-4 sm:px-6 py-5 border-b border-slate-300 dark:border-mv-border group select-none"
                aria-sort={getAriaSort('title')}
              >
                <button 
                  className="flex items-center gap-2 hover:text-black dark:hover:text-white focus:outline-none focus:text-black dark:focus:text-white transition-colors w-full text-left"
                  onClick={() => requestSort('title')}
                >
                    Bounty Name
                    {getSortIcon('title')}
                </button>
              </th>
              <th 
                scope="col"
                className="hidden sm:table-cell px-4 sm:px-6 py-5 border-b border-slate-300 dark:border-mv-border group select-none"
                aria-sort={getAriaSort('repository')}
              >
                <button 
                  className="flex items-center gap-2 hover:text-black dark:hover:text-white focus:outline-none focus:text-black dark:focus:text-white transition-colors w-full text-left"
                  onClick={() => requestSort('repository')}
                >
                    Repository
                    {getSortIcon('repository')}
                </button>
              </th>
              <th 
                scope="col"
                className="px-4 sm:px-6 py-5 border-b border-slate-300 dark:border-mv-border text-right group select-none"
                aria-sort={getAriaSort('rewardInSats')}
              >
                 <button 
                  className="flex items-center justify-end gap-2 hover:text-black dark:hover:text-white focus:outline-none focus:text-black dark:focus:text-white transition-colors w-full"
                  onClick={() => requestSort('rewardInSats')}
                >
                    Reward
                    {getSortIcon('rewardInSats')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300 dark:divide-mv-border">
            {displayedBounties.map((bounty, index) => {
              const githubUrl = bounty.url || `https://github.com/${bounty.repository}`;
              
              return (
                <tr 
                  key={index} 
                  onClick={() => handleRowClick(bounty)}
                  className="hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all duration-200 group cursor-pointer relative border-l-4 border-transparent hover:border-orange-500 dark:hover:border-orange-400"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleRowClick(bounty);
                    }
                  }}
                >
                  <td className="hidden sm:table-cell px-4 sm:px-6 py-5 whitespace-nowrap">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow shrink-0 group-hover:scale-110 duration-300" aria-hidden="true">
                      <span className="text-white font-bold text-sm">₿</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-5">
                    <div className="font-black text-slate-900 dark:text-white text-base group-hover:text-cyan-800 dark:group-hover:text-mv-cyan transition-colors font-display tracking-wide uppercase line-clamp-2 group-hover:translate-x-1 duration-200">
                      {bounty.title}
                    </div>
                    <div className="flex sm:hidden items-center gap-2 text-slate-700 dark:text-slate-400 font-mono text-xs mt-1">
                      <a 
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 hover:text-cyan-800 dark:hover:text-mv-cyan underline decoration-slate-400/50 font-bold"
                      >
                         <Github size={12} aria-hidden="true" />
                         {bounty.repository}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-5 hidden sm:table-cell whitespace-nowrap">
                    <a 
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-400 font-mono text-xs font-bold hover:text-cyan-800 dark:hover:text-mv-cyan transition-colors hover:underline decoration-cyan-500/30 underline-offset-4"
                    >
                      <Github size={14} aria-hidden="true" />
                      {bounty.repository}
                      <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </td>
                  <td className="px-4 sm:px-6 py-5 text-right whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1 font-mono font-black text-sm sm:text-base px-3 py-2 rounded-sm border shadow-sm transition-all duration-300 group-hover:scale-105 origin-right ${
                        currency === 'SATS' 
                            ? 'text-cyan-800 dark:text-mv-cyan bg-cyan-100/50 dark:bg-mv-cyan/5 border-cyan-300 dark:border-mv-cyan/20 shadow-[0_4px_10px_rgba(0,0,0,0.05)]' 
                            : 'text-green-800 dark:text-green-400 bg-green-100/50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                    }`}>
                      {currency === 'SATS' ? <Zap size={14} className="fill-current" aria-hidden="true" /> : <DollarSign size={14} aria-hidden="true" />}
                      {formatReward(bounty.rewardInSats)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {bounties.length > 5 && (
        <div className="p-5 border-t border-slate-300 dark:border-mv-border bg-slate-50 dark:bg-mv-card text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-slate-800 dark:text-slate-400 hover:text-black dark:hover:text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-lg border border-slate-300 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm hover:shadow-md"
          >
            {showAll ? (
              <>Show Less <ChevronUp size={16} /></>
            ) : (
              <>View All Bounties <ChevronDown size={16} /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
};