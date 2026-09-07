import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_FIVE_MOVIES } from '../../data/movies';
import { PosterCard } from '../ui/PosterCard';
import { LaTeX } from '../layout/LaTeX';
import { Swords, CheckCircle2 } from 'lucide-react';

export const Slide03_PairwiseDuel: React.FC = () => {
  const movieLeft = HERO_FIVE_MOVIES[0]; // Leo
  const movieRight = HERO_FIVE_MOVIES[1]; // Jailer

  const [votesLeft, setVotesLeft] = useState(54);
  const [votesRight, setVotesRight] = useState(46);
  const [selectedWinner, setSelectedWinner] = useState<'left' | 'right' | null>(null);

  const total = votesLeft + votesRight;
  const pctLeft = Math.round((votesLeft / total) * 100);
  const pctRight = 100 - pctLeft;

  const handleVote = (side: 'left' | 'right') => {
    setSelectedWinner(side);
    if (side === 'left') setVotesLeft(prev => prev + 1);
    else setVotesRight(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center select-none">
      {/* Top indicator */}
      <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
        <Swords className="w-3.5 h-3.5 animate-pulse" />
        <span>ATOMIC JUDGMENT • LOCAL RELATIVE PREFERENCE</span>
      </div>

      {/* Duel Arena */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-around my-auto">
        {/* Left Fighter: Leo */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <PosterCard
              movie={movieLeft}
              size="hero"
              votes={votesLeft}
              isSelected={selectedWinner === 'left'}
              highlightColor="#ef4444"
              onClick={() => handleVote('left')}
              showDetails={true}
            />
            {selectedWinner === 'left' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 -left-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            )}
          </div>

          <button
            onClick={() => handleVote('left')}
            className={`px-6 py-2 rounded-xl font-display font-bold text-sm tracking-wide transition border ${
              selectedWinner === 'left'
                ? 'bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/40'
                : 'bg-white/5 hover:bg-white/15 text-slate-200 border-white/10'
            }`}
          >
            VOTE LEO ({pctLeft}%)
          </button>
        </motion.div>

        {/* Center Versus Column & Math */}
        <div className="flex flex-col items-center gap-6 px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-16 h-16 rounded-full bg-slate-900/90 border-2 border-amber-500/60 flex items-center justify-center text-amber-400 font-extrabold font-display text-xl shadow-xl glow-gold"
          >
            VS
          </motion.div>

          <div className="px-6 py-3 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-xl md:text-2xl font-mono text-slate-100">
            <LaTeX math="i \succ j \quad \big| \quad j \succ i" />
          </div>

          {/* Live Preference Split Bar */}
          <div className="w-64 flex flex-col gap-1.5 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span className="text-red-400 font-bold">{pctLeft}%</span>
              <span>UNCERTAINTY</span>
              <span className="text-amber-400 font-bold">{pctRight}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
              <div
                style={{ width: `${pctLeft}%` }}
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
              />
              <div
                style={{ width: `${pctRight}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Fighter: Jailer */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <PosterCard
              movie={movieRight}
              size="hero"
              votes={votesRight}
              isSelected={selectedWinner === 'right'}
              highlightColor="#f59e0b"
              onClick={() => handleVote('right')}
              showDetails={true}
            />
            {selectedWinner === 'right' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 -right-3 bg-amber-500 text-black p-1.5 rounded-full shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            )}
          </div>

          <button
            onClick={() => handleVote('right')}
            className={`px-6 py-2 rounded-xl font-display font-bold text-sm tracking-wide transition border ${
              selectedWinner === 'right'
                ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/40'
                : 'bg-white/5 hover:bg-white/15 text-slate-200 border-white/10'
            }`}
          >
            VOTE JAILER ({pctRight}%)
          </button>
        </motion.div>
      </div>

      {/* Bottom Insights */}
      <div className="w-full flex items-center justify-between text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>RELATIVE PAIRWISE CHOICE: MINIMAL COGNITIVE FRICTION</span>
        <span className="text-cyan-400 font-semibold">Click poster or button to vote</span>
      </div>
    </div>
  );
};
