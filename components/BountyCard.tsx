import React from 'react';
import { Clock, Tag, ChevronRight, Zap } from 'lucide-react';
import { Bounty } from '../types';

interface BountyCardProps {
  bounty: Bounty;
}

export const BountyCard: React.FC<BountyCardProps> = ({ bounty }) => {
  return (
    <div className="group relative bg-white dark:bg-mv-card border border-slate-200 dark:border-mv-border hover:border-cyan-400 dark:hover:border-mv-cyan/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:-translate-y-1 overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 dark:via-mv-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 mb-2">
          {bounty.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-mv-dark text-slate-600 dark:text-slate-400 text-xs font-bold border border-slate-200 dark:border-mv-border uppercase tracking-wider">
              {tag}
            </span>
          ))}
          {bounty.tags.length > 2 && (
             <span className="px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-mv-dark text-slate-600 dark:text-slate-400 text-xs font-bold border border-slate-200 dark:border-mv-border">
              +{bounty.tags.length - 2}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-cyan-700 dark:text-mv-cyan font-mono font-bold bg-cyan-50 dark:bg-mv-cyan/5 px-3 py-1 rounded-sm border border-cyan-200 dark:border-mv-cyan/20 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.1)]">
          <Zap size={14} className="fill-current" />
          {bounty.rewardSats.toLocaleString()}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-700 dark:group-hover:text-mv-cyan transition-colors font-display tracking-wide uppercase">
        {bounty.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
        {bounty.description}
      </p>

      <div className="flex justify-between items-center border-t border-slate-100 dark:border-mv-border pt-4 mt-auto">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
          <Clock size={12} />
          <span>{bounty.createdAt}</span>
          <span className="mx-1 text-slate-300 dark:text-mv-border">|</span>
          <span className="text-slate-500 dark:text-slate-400">{bounty.postedBy}</span>
        </div>
        
        <button className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform group-hover:text-cyan-700 dark:group-hover:text-mv-cyan">
          View Details <ChevronRight size={14} className="text-cyan-600 dark:text-mv-cyan" />
        </button>
      </div>
    </div>
  );
};