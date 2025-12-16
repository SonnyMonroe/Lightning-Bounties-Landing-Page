import React, { useState, useMemo } from 'react';
import { Developer } from '../types';
import { Trophy, Award, ChevronDown, ChevronUp, ArrowUpDown, Bitcoin, DollarSign } from 'lucide-react';

interface LeaderboardTableProps {
  developers: Developer[];
  btcPrice: number;
}

type SortKey = keyof Developer;
type SortDirection = 'asc' | 'desc';
type Currency = 'SATS' | 'USD';

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ developers, btcPrice }) => {
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);
  const [currency, setCurrency] = useState<Currency>('SATS');

  const sortedDevelopers = useMemo(() => {
    let sortableItems = [...developers];
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
  }, [developers, sortConfig]);
  
  const displayedDevelopers = showAll ? sortedDevelopers : sortedDevelopers.slice(0, 5);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    
    // Default to descending for number based columns if checking for the first time
    if ((key === 'rewardsInSats' || key === 'claimedCount') && (!sortConfig || sortConfig.key !== key)) {
        direction = 'desc';
    } else if (sortConfig && sortConfig.key === key) {
        // Toggle direction if clicking same header
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

  const formatReward = (sats: number) => {
    if (currency === 'SATS') {
        return `${sats.toLocaleString()} Sats`;
    }
    const usdValue = (sats / 100_000_000) * btcPrice;
    return `$${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="w-full bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border rounded-xl overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">
      <div className="p-8 border-b border-slate-200 dark:border-mv-border bg-slate-50 dark:bg-gradient-to-r dark:from-mv-card dark:to-mv-dark flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3 mb-2 font-display uppercase tracking-widest leading-none">
            Bounty Hunter Leaderboard <Trophy size={32} className="text-yellow-500 drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" strokeWidth={1.5} />
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium max-w-lg mb-6">
            Top hunters earning Bitcoin. Solve issues, climb ranks, get paid.
            </p>
        </div>

        <div className="flex justify-center">
            <div className="bg-slate-200 dark:bg-white/5 p-1 rounded-lg flex items-center border border-slate-300 dark:border-white/10">
                <button
                    onClick={() => setCurrency('SATS')}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                        ${currency === 'SATS' 
                            ? 'bg-white dark:bg-mv-cyan/20 text-slate-900 dark:text-mv-cyan shadow-sm border border-slate-200 dark:border-mv-cyan/50' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
                    `}
                >
                   <Bitcoin size={14} /> Sats
                </button>
                <button
                    onClick={() => setCurrency('USD')}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                        ${currency === 'USD' 
                            ? 'bg-white dark:bg-green-500/20 text-slate-900 dark:text-green-400 shadow-sm border border-slate-200 dark:border-green-500/50' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
                    `}
                >
                   <DollarSign size={14} /> USD
                </button>
            </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[350px]">
          <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-mv-border text-slate-600 dark:text-slate-400 uppercase text-xs font-bold tracking-widest font-display">
            <tr>
              <th 
                scope="col"
                className="px-3 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-mv-border group select-none"
                aria-sort={getAriaSort('developer')}
              >
                <button 
                  className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:text-slate-900 dark:focus:text-white transition-colors w-full text-left"
                  onClick={() => requestSort('developer')}
                >
                    Developer
                    {getSortIcon('developer')}
                </button>
              </th>
              <th 
                scope="col"
                className="px-3 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-mv-border text-center group select-none"
                aria-sort={getAriaSort('claimedCount')}
              >
                <button 
                  className="flex items-center justify-center gap-2 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:text-slate-900 dark:focus:text-white transition-colors w-full"
                  onClick={() => requestSort('claimedCount')}
                >
                    Bounties Solved
                    {getSortIcon('claimedCount')}
                </button>
              </th>
              <th 
                scope="col"
                className="px-3 sm:px-6 py-4 sm:py-5 border-b border-slate-200 dark:border-mv-border text-right group select-none"
                aria-sort={getAriaSort('rewardsInSats')}
              >
                <button 
                  className="flex items-center justify-end gap-2 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:text-slate-900 dark:focus:text-white transition-colors w-full"
                  onClick={() => requestSort('rewardsInSats')}
                >
                    Total Rewards
                    {getSortIcon('rewardsInSats')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-mv-border">
            {displayedDevelopers.map((dev, index) => (
              <tr key={dev.developer} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200 group relative border-l-4 border-transparent hover:border-cyan-500 dark:hover:border-mv-cyan hover:shadow-md dark:hover:shadow-black/20">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="relative shrink-0">
                      <img 
                        src={dev.avatarUrl} 
                        alt={dev.developer} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 dark:border-mv-border object-cover group-hover:border-cyan-500 dark:group-hover:border-mv-cyan group-hover:ring-2 group-hover:ring-cyan-500/50 group-hover:scale-110 transition-all duration-300 shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${dev.developer}&background=random`;
                        }}
                      />
                      {/* Only show rank badge if not sorting or if sorting by rank-related metrics in proper order, 
                          but for simplicity we just hide rank when custom sort is active unless it matches default */}
                      {(!sortConfig || (sortConfig.key === 'rewardsInSats' && sortConfig.direction === 'desc')) && index < 3 && (
                        <div className={`absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-white dark:border-mv-card ${
                          index === 0 ? 'bg-yellow-500 text-black' : 
                          index === 1 ? 'bg-slate-300 text-black' : 
                          'bg-amber-700 text-white'
                        }`} aria-label={`Rank ${index + 1}`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <a 
                      href={`https://github.com/${dev.developer}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-mv-cyan transition-colors text-sm sm:text-base focus:outline-none focus:underline group-hover:translate-x-1 duration-200 inline-block"
                    >
                      {dev.developer}
                    </a>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-purple-50 dark:bg-mv-purple/10 border border-purple-200 dark:border-mv-purple/20 text-purple-700 dark:text-mv-purple text-xs font-bold group-hover:bg-purple-100 dark:group-hover:bg-mv-purple/20 transition-colors">
                    <Award size={12} className="sm:w-[14px] sm:h-[14px]" aria-hidden="true" />
                    {dev.claimedCount}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 text-right whitespace-nowrap">
                  <div className={`font-mono font-bold text-sm sm:text-base transition-colors group-hover:scale-105 origin-right duration-200 ${currency === 'SATS' ? 'text-cyan-700 dark:text-mv-cyan' : 'text-green-600 dark:text-green-400'}`}>
                    {formatReward(dev.rewardsInSats)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {developers.length > 5 && (
        <div className="p-4 border-t border-slate-200 dark:border-mv-border bg-white dark:bg-mv-card text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:scale-105 duration-200"
          >
            {showAll ? (
              <>Show Less <ChevronUp size={16} /></>
            ) : (
              <>View All Hunters <ChevronDown size={16} /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
};