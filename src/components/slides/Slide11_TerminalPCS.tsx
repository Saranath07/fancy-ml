import React from 'react';
import { motion } from 'framer-motion';
import { HERO_FIVE_MOVIES } from '../../data/movies';
import { PosterCard } from '../ui/PosterCard';
import { LaTeX } from '../layout/LaTeX';
import { Award, CheckCircle } from 'lucide-react';

export const Slide11_TerminalPCS: React.FC = () => {
  // Posterior Probability of Correct Selection (PCS) q_i
  const candidatesWithProb = [
    { movie: HERO_FIVE_MOVIES[0], q: 0.18 }, // Leo
    { movie: HERO_FIVE_MOVIES[1], q: 0.12 }, // Jailer
    { movie: HERO_FIVE_MOVIES[2], q: 0.44 }, // Maharaja (Top pick!)
    { movie: HERO_FIVE_MOVIES[3], q: 0.21 }, // Amaran
    { movie: HERO_FIVE_MOVIES[4], q: 0.05 }  // GOAT
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>TERMINAL OBJECTIVE • PROBABILITY OF CORRECT SELECTION (PCS)</span>
        </div>

        <div className="text-xs font-mono text-cyan-300">
          <LaTeX math="V_0(\pi) = \max_i q_i(\pi) = 44\%" />
        </div>
      </div>

      {/* Main Center Stage: Posters with Halo Podiums */}
      <div className="relative z-10 w-full max-w-5xl my-auto flex flex-col items-center gap-6">
        {/* Math definition card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center max-w-2xl">
          <LaTeX
            math="q_i(\pi) = \int \mathbf{1}\left\{i = \arg\max_k \theta_k\right\} \pi(\theta)\,d\theta \qquad V_0(\pi) = \max_i q_i(\pi)"
            display={true}
          />
          <p className="text-xs text-slate-400 mt-1 font-sans">
            q_i is the exact Bayesian posterior probability that film i is genuinely the best.
          </p>
        </div>

        {/* 5 Posters with Probability Halo Podiums */}
        <div className="flex justify-center items-end gap-6 w-full pt-4">
          {candidatesWithProb.map(({ movie, q }) => {
            const isChampion = q === 0.44;
            const pct = Math.round(q * 100);

            return (
              <div key={movie.id} className="flex flex-col items-center">
                <div className="relative">
                  <PosterCard
                    movie={movie}
                    size="md"
                    isWinner={isChampion}
                    showDetails={true}
                    className={isChampion ? 'glow-gold' : ''}
                  />

                  {isChampion && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-2.5 py-0.5 rounded-full font-extrabold text-[11px] font-mono shadow-lg flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      TOP PICK
                    </motion.div>
                  )}
                </div>

                {/* Probability Halo Bar / Pillar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${q * 160 + 30}px` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`w-28 mt-3 rounded-t-xl flex flex-col items-center justify-between p-2 border-t-2 border-x ${
                    isChampion
                      ? 'bg-gradient-to-t from-amber-500/30 to-amber-500/10 border-amber-400'
                      : 'bg-slate-900/60 border-slate-700/60'
                  }`}
                >
                  <span className={`text-base font-extrabold font-mono ${isChampion ? 'text-amber-400' : 'text-slate-300'}`}>
                    {pct}%
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase truncate">
                    {movie.title}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>V_0(π) MEASURES CONFIDENCE IN BEST RECOMMENDATION AT BUDGET 0</span>
        <span className="text-amber-400/80 font-semibold">Podium height reflects true posterior confidence</span>
      </div>
    </div>
  );
};
