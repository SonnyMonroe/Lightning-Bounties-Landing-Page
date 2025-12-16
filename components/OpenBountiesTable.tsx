import React, { useState, useMemo } from 'react';
import { UnclaimedIssue } from '../types';
import { Zap, Github, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';

interface OpenBountiesTableProps {
  bounties: UnclaimedIssue[];
}

type SortKey = keyof UnclaimedIssue;
type SortDirection = 'asc' | 'desc';

export const OpenBountiesTable: React.FC<OpenBountiesTableProps> = ({ bounties }) => {
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);

  const sortedBounties = useMemo(() => {
    let sortableItems = [...bounties];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
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

  return (
    <div className="w-full bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border rounded-xl overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">
      <div className="p-6 border-b border-slate-200 dark:border-mv-border bg-slate-50 dark:bg-gradient-to-r dark:from-mv-card dark:to-mv-dark">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-2 font-display uppercase tracking-wide">
          Unsolved Bounties <span className="text-2xl drop-shadow-md grayscale opacity-80" role="img" aria-label="Money mouth face">🤑</span>
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Open Bounties available for YOU to solve!
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-full">
          <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-mv-border text-slate-600 dark:text-slate-400 uppercase text-xs font-bold tracking-widest font-display">
            <tr>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-mv-border w-12 sm:w-16" scope="col"></th>
              <th 
                scope="col"
                className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-mv-border group select-none"
                aria-sort={getAriaSort('title')}
              >
                <button 
                  className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:text-slate-900 dark:focus:text-white transition-colors w-full text-left"
                  onClick={() => requestSort('title')}
                >
                    Bounty Name
                    {getSortIcon('title')}
                </button>
              </th>
              <th 
                scope="col"
                className="hidden sm:table-cell px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-mv-border group select-none"
                aria-sort={getAriaSort('repository')}
              >
                <button 
                  className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:text-slate-900 dark:focus:text-white transition-colors w-full text-left"
                  onClick={() => requestSort('repository')}
                >
                    Repository
                    {getSortIcon('repository')}
                </button>
              </th>
              <th 
                scope="col"
                className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-mv-border text-right group select-none"
                aria-sort={getAriaSort('rewardInSats')}
              >
                 <button 
                  className="flex items-center justify-end gap-2 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:text-slate-900 dark:focus:text-white transition-colors w-full"
                  onClick={() => requestSort('rewardInSats')}
                >
                    Reward
                    {getSortIcon('rewardInSats')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-mv-border">
            {displayedBounties.map((bounty, index) => (
              <tr key={index} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow shrink-0" aria-hidden="true">
                    <span className="text-white font-bold text-sm">₿</span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-cyan-700 dark:group-hover:text-mv-cyan transition-colors font-display tracking-wide uppercase line-clamp-2">
                    {bounty.title}
                  </div>
                  {/* Show repository on mobile in same cell since we hide the column */}
                  <div className="flex sm:hidden items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-xs mt-1">
                    <Github size={12} aria-hidden="true" />
                    {bounty.repository}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 hidden sm:table-cell whitespace-nowrap">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-xs">
                    <Github size={14} aria-hidden="true" />
                    {bounty.repository}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1 font-mono font-bold text-cyan-700 dark:text-mv-cyan bg-cyan-50 dark:bg-mv-cyan/5 px-2 sm:px-3 py-1.5 rounded-sm border border-cyan-200 dark:border-mv-cyan/20 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.1)] text-sm sm:text-base">
                    <Zap size={14} className="fill-current" aria-hidden="true" />
                    {bounty.rewardInSats.toLocaleString()} Sats
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bounties.length > 5 && (
        <div className="p-4 border-t border-slate-200 dark:border-mv-border bg-white dark:bg-mv-card text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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