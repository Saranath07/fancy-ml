import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LaTeX } from '../layout/LaTeX';
import { GitBranch, Eye } from 'lucide-react';

export const Slide10_BranchingWorlds: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<'both' | 'left' | 'right'>('both');

  const p_ij = 0.54; // probability Leo beats Jailer under current posterior
  const p_ji = 0.46;

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold">
          <GitBranch className="w-3.5 h-3.5" />
          <span>ONE QUESTION • TWO POSTERIOR WORLDS</span>
        </div>

        <div className="text-xs font-mono text-slate-400 flex gap-2">
          <button
            onClick={() => setActiveBranch('both')}
            className={`px-3 py-1 rounded transition ${activeBranch === 'both' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-900 hover:bg-slate-800'}`}
          >
            Show Both Futures
          </button>
          <button
            onClick={() => setActiveBranch('left')}
            className={`px-3 py-1 rounded transition ${activeBranch === 'left' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-slate-900 hover:bg-slate-800'}`}
          >
            Future 1 (i ≻ j)
          </button>
          <button
            onClick={() => setActiveBranch('right')}
            className={`px-3 py-1 rounded transition ${activeBranch === 'right' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-900 hover:bg-slate-800'}`}
          >
            Future 2 (j ≻ i)
          </button>
        </div>
      </div>

      {/* Main Branching Decision Tree */}
      <div className="relative z-10 w-full max-w-5xl my-auto flex flex-col items-center">
        {/* Root Node: Candidate Query (Leo vs Jailer) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-xl bg-slate-900 border-2 border-slate-700 shadow-xl flex items-center gap-4 text-center z-20"
        >
          <div className="text-xs font-mono text-slate-400 uppercase">Query Candidate (i, j)</div>
          <div className="text-lg font-bold text-white font-display px-3 py-1 rounded bg-black/50 border border-slate-800">
            Leo vs Jailer
          </div>
          <div className="text-xs font-mono text-cyan-400">Current Belief: π</div>
        </motion.div>

        {/* SVG Connector Branching Lines */}
        <div className="relative w-full max-w-2xl h-16 pointer-events-none">
          <svg viewBox="0 0 600 60" className="w-full h-full">
            {/* Left Branch */}
            <line
              x1="300" y1="0" x2="150" y2="60"
              stroke={activeBranch === 'right' ? '#334155' : '#ef4444'}
              strokeWidth="3"
              strokeDasharray={activeBranch === 'right' ? '4,4' : 'none'}
            />
            {/* Right Branch */}
            <line
              x1="300" y1="0" x2="450" y2="60"
              stroke={activeBranch === 'left' ? '#334155' : '#f59e0b'}
              strokeWidth="3"
              strokeDasharray={activeBranch === 'left' ? '4,4' : 'none'}
            />
          </svg>
        </div>

        {/* Two Future Worlds Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          {/* Branch 1: Leo beats Jailer */}
          <motion.div
            animate={{
              opacity: activeBranch === 'right' ? 0.35 : 1,
              scale: activeBranch === 'left' ? 1.03 : 1
            }}
            className="p-5 rounded-2xl bg-slate-950/90 border-2 border-red-500/40 shadow-xl flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-red-400 font-bold uppercase">OUTCOME: i ≻ j (LEO WINS)</span>
              <span className="text-xs font-mono bg-red-950/60 px-2 py-0.5 rounded text-red-300 border border-red-800/60">
                p_ij = {(p_ij * 100).toFixed(0)}%
              </span>
            </div>

            <h4 className="text-xl font-bold text-white font-mono">Updated Posterior: π^ij+</h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Leo's score distribution shifts right; Jailer's dips. If this branch happens,
              the optimal next question might be <strong>Leo vs Maharaja</strong>!
            </p>

            <div className="mt-2 text-xs font-mono text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
              <span>Expected Future Value:</span>
              <span className="text-red-400 font-bold">V_b-1(π^ij+)</span>
            </div>
          </motion.div>

          {/* Branch 2: Jailer beats Leo */}
          <motion.div
            animate={{
              opacity: activeBranch === 'left' ? 0.35 : 1,
              scale: activeBranch === 'right' ? 1.03 : 1
            }}
            className="p-5 rounded-2xl bg-slate-950/90 border-2 border-amber-500/40 shadow-xl flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">OUTCOME: j ≻ i (JAILER WINS)</span>
              <span className="text-xs font-mono bg-amber-950/60 px-2 py-0.5 rounded text-amber-300 border border-amber-800/60">
                p_ji = {(p_ji * 100).toFixed(0)}%
              </span>
            </div>

            <h4 className="text-xl font-bold text-white font-mono">Updated Posterior: π^ij-</h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Jailer's score distribution shifts right; Leo's dips. If this branch happens,
              the optimal next question might be <strong>Jailer vs Maharaja</strong>!
            </p>

            <div className="mt-2 text-xs font-mono text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
              <span>Expected Future Value:</span>
              <span className="text-amber-400 font-bold">V_b-1(π^ij-)</span>
            </div>
          </motion.div>
        </div>

        {/* Predictive Probability Integral */}
        <div className="mt-6 px-6 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-4">
          <Eye className="w-4 h-4 text-cyan-400" />
          <LaTeX math="p_{ij} = \int P(i \succ j \mid \theta)\,\pi(\theta)\,d\theta \qquad p_{ji} = 1 - p_{ij}" />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/60">
        <span>LOOKAHEAD CONSIDERS BOTH POSSIBLE OBSERVATIONS</span>
        <span className="text-amber-400/80 font-semibold">Adaptive policy updates query plan based on observed response</span>
      </div>
    </div>
  );
};
