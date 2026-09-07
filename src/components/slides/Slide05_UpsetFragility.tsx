import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_FIVE_MOVIES } from '../../data/movies';
import { LaTeX } from '../layout/LaTeX';
import { Shuffle, AlertOctagon, Trophy } from 'lucide-react';

export const Slide05_UpsetFragility: React.FC = () => {
  const favorite = HERO_FIVE_MOVIES[2]; // Maharaja (Latent score 8.9)
  const underdog = HERO_FIVE_MOVIES[4]; // GOAT (Latent score 8.4)

  const [simulationIndex, setSimulationIndex] = useState(1);
  const [hasUpset, setHasUpset] = useState(false);

  const runSimulation = () => {
    const nextIdx = simulationIndex + 1;
    setSimulationIndex(nextIdx);
    // Every 2nd or 3rd run simulates an upset
    const upsetOccurred = Math.random() < 0.45;
    setHasUpset(upsetOccurred);
  };

  // True Bradley-Terry probability
  // P(i > j) = 1 / (1 + exp(-(8.9 - 8.4))) = 1 / (1 + exp(-0.5)) = 0.622 (62%)
  const probFavoriteWins = 62;
  const probUnderdogWins = 38;

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 font-bold">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>TOURNAMENT FRAGILITY • STOCHASTIC PREFERENCES</span>
        </div>

        <button
          onClick={runSimulation}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs tracking-wider transition shadow-lg shadow-amber-500/20"
        >
          <Shuffle className="w-3.5 h-3.5" />
          SIMULATE REPLAY #{simulationIndex}
        </button>
      </div>

      {/* Center Math & Counterfactual Branching */}
      <div className="relative z-10 w-full max-w-5xl my-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: The Bradley-Terry Formula Card */}
        <div className="flex flex-col gap-4 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          <span className="text-xs font-mono text-amber-400 font-bold tracking-wider uppercase">
            The Bradley-Terry Preference Model
          </span>

          <div className="py-2 text-xl font-mono text-white">
            <LaTeX
              math="P(i \succ j \mid \theta) = \frac{e^{\theta_i}}{e^{\theta_i} + e^{\theta_j}} = \frac{1}{1 + e^{-(\theta_i - \theta_j)}}"
              display={true}
            />
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Even if Film <span className="text-amber-400 font-bold">i</span> has a higher latent skill than Film <span className="text-cyan-400 font-bold">j</span>,
            Film <span className="text-cyan-400 font-bold">j</span> still wins with probability <span className="text-red-400 font-bold font-mono">P(j \succ i) = {probUnderdogWins}%</span>!
          </p>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono flex items-center justify-between">
            <span>Maharaja (θ = 8.9): <strong className="text-amber-400">62%</strong></span>
            <span>vs</span>
            <span>GOAT (θ = 8.4): <strong className="text-cyan-400">38%</strong></span>
          </div>
        </div>

        {/* Right: Counterfactual Bracket Reality Card */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-center">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Replay Outcome #{simulationIndex}
          </span>

          <motion.div
            key={simulationIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
            className={`p-6 rounded-2xl border-2 w-full max-w-sm flex flex-col items-center ${
              hasUpset
                ? 'bg-red-950/30 border-red-500/60 shadow-xl shadow-red-500/20'
                : 'bg-amber-950/30 border-amber-500/60 shadow-xl shadow-amber-500/20'
            }`}
          >
            <Trophy className={`w-12 h-12 mb-3 ${hasUpset ? 'text-cyan-400' : 'text-amber-400'}`} />

            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-slate-400">
              {hasUpset ? 'UPSET EVENT OCCURRED!' : 'EXPECTED OUTCOME'}
            </span>

            <h3 className="text-2xl font-black font-display text-white mt-1">
              {hasUpset ? 'GOAT Wins The Trophy' : 'Maharaja Wins The Trophy'}
            </h3>

            <p className="text-xs text-slate-300 mt-2 font-sans">
              {hasUpset
                ? 'Maharaja had one bad off-day in the Quarterfinal and was permanently eliminated from the tournament!'
                : 'The #1 latent candidate survived and took the crown.'}
            </p>
          </motion.div>

          <p className="text-xs text-slate-400 italic mt-4 max-w-sm">
            “A single knockout tournament identifies the winner of one path, not necessarily the best overall candidate.”
          </p>
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>KNOCKOUTS ARE HIGH-VARIANCE ESTIMATORS</span>
        <span className="text-amber-400/80 font-semibold">Click 'Simulate Replay' to observe stochastic upsets</span>
      </div>
    </div>
  );
};
